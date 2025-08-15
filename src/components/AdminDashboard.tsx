"use client";

import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { supabase, type Applicant } from "../lib/supabase";
import { toast } from "sonner";
import { Download, Search, Eye, Mail, Calendar, MapPin, Users } from "lucide-react";

export function AdminDashboard() {
  const [applicants, setApplicants] = useState<Applicant[]>([]);
  const [filteredApplicants, setFilteredApplicants] = useState<Applicant[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [skillFilter, setSkillFilter] = useState<string>("");
  const [teamFilter, setTeamFilter] = useState<string>("");
  const [selectedApplicant, setSelectedApplicant] = useState<Applicant | null>(null);

  useEffect(() => {
    fetchApplicants();
  }, []);

  useEffect(() => {
    filterApplicants();
  }, [applicants, searchTerm, skillFilter, teamFilter]);

  const fetchApplicants = async () => {
    try {
      const { data, error } = await supabase
        .from('applicants')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setApplicants(data || []);
    } catch (error) {
      console.error('Error fetching applicants:', error);
      toast.error("Failed to fetch applicants");
    } finally {
      setLoading(false);
    }
  };

  const filterApplicants = () => {
    let filtered = applicants;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(applicant =>
        applicant.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        applicant.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        applicant.university.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Skill filter
    if (skillFilter) {
      filtered = filtered.filter(applicant =>
        applicant.skills?.includes(skillFilter)
      );
    }

    // Team preference filter
    if (teamFilter) {
      filtered = filtered.filter(applicant =>
        applicant.team_preference === teamFilter
      );
    }

    setFilteredApplicants(filtered);
  };

  const exportToCSV = () => {
    const headers = [
      'Name', 'Email', 'University', 'Track', 'Skills', 'Team Preference', 'Created At'
    ];

    const csvContent = [
      headers.join(','),
      ...filteredApplicants.map(applicant => [
        applicant.full_name,
        applicant.email,
        applicant.university,
        applicant.track_selection,
        applicant.skills?.join('; ') || '',
        applicant.team_preference,
        new Date(applicant.created_at || '').toLocaleDateString()
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `hackathon-applicants-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const getSkillOptions = () => {
    const allSkills = applicants.flatMap(applicant => applicant.skills || []);
    return [...new Set(allSkills)].sort();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Hackathon Applications Dashboard</h1>
        <p className="text-muted-foreground">
          Manage and review all hackathon applications
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Applications</p>
                <p className="text-2xl font-bold">{applicants.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-green-500" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">This Week</p>
                <p className="text-2xl font-bold">
                  {applicants.filter(app => {
                    const weekAgo = new Date();
                    weekAgo.setDate(weekAgo.getDate() - 7);
                    return new Date(app.created_at || '') > weekAgo;
                  }).length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <MapPin className="h-5 w-5 text-blue-500" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Universities</p>
                <p className="text-2xl font-bold">
                  {new Set(applicants.map(app => app.university)).size}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-purple-500" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Advanced Track</p>
                <p className="text-2xl font-bold">
                  {applicants.filter(app => app.track_selection === 'advanced').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Actions */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Filters & Actions</CardTitle>
          <CardDescription>
            Search, filter, and export applications
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <Label htmlFor="search">Search</Label>
              <div className="relative mt-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="search"
                  placeholder="Name, email, university..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="skill-filter">Filter by Skill</Label>
              <Select value={skillFilter} onValueChange={setSkillFilter}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="All skills" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All skills</SelectItem>
                  {getSkillOptions().map((skill) => (
                    <SelectItem key={skill} value={skill}>{skill}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="team-filter">Team Preference</Label>
              <Select value={teamFilter} onValueChange={setTeamFilter}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="All preferences" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All preferences</SelectItem>
                  <SelectItem value="individual">Individual</SelectItem>
                  <SelectItem value="team">Team</SelectItem>
                  <SelectItem value="no_preference">No preference</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-end">
              <Button onClick={exportToCSV} className="w-full">
                <Download className="h-4 w-4 mr-2" />
                Export CSV
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results Count */}
      <div className="mb-4">
        <p className="text-sm text-muted-foreground">
          Showing {filteredApplicants.length} of {applicants.length} applications
        </p>
      </div>

      {/* Applications Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Applicant</TableHead>
                <TableHead>University</TableHead>
                <TableHead>Skills</TableHead>
                <TableHead>Team Preference</TableHead>

                <TableHead>Applied</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredApplicants.map((applicant) => (
                <TableRow key={applicant.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{applicant.full_name}</p>
                      <p className="text-sm text-muted-foreground">{applicant.email}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{applicant.university}</p>
                      <p className="text-sm text-muted-foreground">Track: {applicant.track_selection === 'beginner' ? 'Beginner' : 'Advanced'}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {applicant.skills?.slice(0, 3).map((skill) => (
                        <Badge key={skill} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                      {applicant.skills && applicant.skills.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{applicant.skills.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={
                      applicant.team_preference === 'individual' ? 'default' :
                      applicant.team_preference === 'team' ? 'secondary' : 'outline'
                    }>
                      {applicant.team_preference?.replace('_', ' ')}
                    </Badge>
                  </TableCell>

                  <TableCell>
                    <span className="text-sm text-muted-foreground">
                      {new Date(applicant.created_at || '').toLocaleDateString()}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedApplicant(applicant)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => window.open(`mailto:${applicant.email}`, '_blank')}
                      >
                        <Mail className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Applicant Detail Modal */}
      {selectedApplicant && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Application Details</CardTitle>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedApplicant(null)}
                >
                  ×
                </Button>
              </div>
              <CardDescription>
                {selectedApplicant.full_name} - {selectedApplicant.email}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="font-medium">University</Label>
                  <p className="text-sm">{selectedApplicant.university}</p>
                </div>
                <div>
                  <Label className="font-medium">Track</Label>
                  <p className="text-sm">{selectedApplicant.track_selection === 'beginner' ? 'Beginner Track' : 'Advanced Track'}</p>
                </div>
              </div>

              <div>
                <Label className="font-medium">Skills</Label>
                <div className="flex flex-wrap gap-1 mt-1">
                  {selectedApplicant.skills?.map((skill) => (
                    <Badge key={skill} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <Label className="font-medium">Experience</Label>
                <p className="text-sm text-muted-foreground mt-1">
                  {selectedApplicant.experience}
                </p>
              </div>

              <div>
                <Label className="font-medium">Motivation</Label>
                <p className="text-sm text-muted-foreground mt-1">
                  {selectedApplicant.motivation}
                </p>
              </div>

              <div>
                <Label className="font-medium">Team Preference</Label>
                <p className="text-sm">{selectedApplicant.team_preference}</p>
              </div>

              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  onClick={() => window.open(`mailto:${selectedApplicant.email}`, '_blank')}
                >
                  <Mail className="h-4 w-4 mr-2" />
                  Send Email
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
