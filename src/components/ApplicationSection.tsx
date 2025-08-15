"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { ApplicationForm } from "./ApplicationForm";
import { AdminDashboard } from "./AdminDashboard";
import { Badge } from "./ui/badge";
import { Calendar, Users, Trophy, Zap } from "lucide-react";

export function ApplicationSection() {
  const [showForm, setShowForm] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);

  // Check if user is admin (you can implement proper authentication later)
  const isAdmin = window.location.search.includes('admin=true');

  if (showAdmin && isAdmin) {
    return <AdminDashboard />;
  }

  if (showForm) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <Button
              variant="outline"
              onClick={() => setShowForm(false)}
              className="mb-4"
            >
              ← Back to Hackathon Info
            </Button>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Apply for the Hackathon
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Ready to showcase your skills and build something amazing? 
              Fill out the application below to join our exciting hackathon!
            </p>
          </div>
          <ApplicationForm />
        </div>
      </div>
    );
  }

  return (
    <section id="apply" className="py-20 bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Ready to Build the Future?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Join hundreds of talented developers, designers, and innovators 
            in our biggest hackathon yet. Build, learn, and win amazing prizes!
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <Badge variant="secondary" className="text-lg px-4 py-2">
              <Users className="h-4 w-4 mr-2" />
              500+ Participants
            </Badge>
            <Badge variant="secondary" className="text-lg px-4 py-2">
              <Trophy className="h-4 w-4 mr-2" />
              $50K+ in Prizes
            </Badge>
            <Badge variant="secondary" className="text-lg px-4 py-2">
              <Zap className="h-4 w-4 mr-2" />
              48 Hours
            </Badge>
          </div>

          <Button
            size="lg"
            onClick={() => setShowForm(true)}
            className="text-lg px-8 py-4 h-auto"
          >
            Apply Now - It's Free!
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <Card className="text-center">
            <CardHeader>
              <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <Calendar className="h-8 w-8 text-blue-600" />
              </div>
              <CardTitle className="text-xl">Quick & Easy</CardTitle>
              <CardDescription>
                Complete your application in just a few minutes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Our streamlined application process takes only 5-10 minutes to complete. 
                No lengthy essays or complicated forms!
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <Users className="h-8 w-8 text-green-600" />
              </div>
              <CardTitle className="text-xl">Build Your Network</CardTitle>
              <CardDescription>
                Connect with fellow developers and industry experts
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Meet like-minded developers, learn from mentors, and build 
                connections that could last a lifetime.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <div className="mx-auto w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                <Trophy className="h-8 w-8 text-purple-600" />
              </div>
              <CardTitle className="text-xl">Win Amazing Prizes</CardTitle>
              <CardDescription>
                Compete for cash prizes, tech gadgets, and opportunities
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Show off your skills and compete for incredible prizes including 
                cash rewards, cutting-edge technology, and career opportunities.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mt-16">
          <h3 className="text-2xl font-semibold text-gray-900 mb-4">
            What You'll Need
          </h3>
          <div className="flex flex-wrap justify-center gap-4 text-gray-600">
            <span>• Laptop & charger</span>
            <span>• Enthusiasm to learn</span>
            <span>• Team spirit</span>
            <span>• Creative ideas</span>
          </div>
        </div>

        {isAdmin && (
          <div className="text-center mt-8">
            <Button
              variant="outline"
              onClick={() => setShowAdmin(true)}
              className="text-sm"
            >
              Admin Dashboard
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
