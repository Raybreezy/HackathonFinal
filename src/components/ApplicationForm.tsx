"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Checkbox } from "./ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Progress } from "./ui/progress";
import { Badge } from "./ui/badge";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { supabase } from "../lib/supabase";
import { Applicant } from "../lib/supabase";
import { Popup } from "./ui/popup";

const skillOptions = [
  "JavaScript", "Python", "Java", "C++", "C#", "Go", "Rust", "Swift", "Kotlin",
  "React", "Vue", "Angular", "Node.js", "Express", "Django", "Flask", "Spring",
  "HTML/CSS", "TypeScript", "PHP", "Ruby", "Scala", "Elixir", "Haskell",
  "Machine Learning", "Data Science", "DevOps", "Cloud Computing", "Mobile Development",
  "Game Development", "Cybersecurity", "Blockchain", "IoT", "AR/VR"
];

const steps = [
  { id: 1, title: "Personal Info" },
  { id: 2, title: "Academic & Skills" },
  { id: 3, title: "Experience & Motivation" },
  { id: 4, title: "Additional Info" },
  { id: 5, title: "Review & Submit" }
];

export function ApplicationForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Popup states
  const [popup, setPopup] = useState<{
    isOpen: boolean;
    type: "success" | "error" | "info";
    title: string;
    message: string;
  }>({
    isOpen: false,
    type: "info",
    title: "",
    message: ""
  });

  const showPopup = (type: "success" | "error" | "info", title: string, message: string) => {
    setPopup({
      isOpen: true,
      type,
      title,
      message
    });
  };

  const hidePopup = () => {
    setPopup(prev => ({ ...prev, isOpen: false }));
  };

  const {
    register,
    handleSubmit,
    control,
    watch,
    reset,
    formState: { errors, isValid }
  } = useForm<Applicant>({
    defaultValues: {
      full_name: "",
      email: "",
      university: "",
      track_selection: undefined,
      skills: [],
      experience: "",
      motivation: "",
      github_url: "",
      linkedin_url: "",
      portfolio_url: "",
      team_preference: undefined
    },
    mode: "onChange"
  });

  const watchedValues = watch();

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const onSubmit = async (data: Applicant) => {
    setIsSubmitting(true);
    console.log('Form data being submitted:', data);
    console.log('Supabase client:', supabase);
    
    try {
      console.log('Checking for existing email...');
      
      // First, check if email already exists
      const { data: existingApplicant, error: checkError } = await supabase
        .from('applicants')
        .select('email')
        .eq('email', data.email)
        .single();

      if (checkError && checkError.code !== 'PGRST116') { // PGRST116 = no rows returned
        console.error('Error checking email:', checkError);
        throw checkError;
      }

      if (existingApplicant) {
        showPopup("error", "Email Already Exists", "An application with this email address already exists. Please use a different email.");
        return;
      }

      console.log('Email is unique, proceeding with submission...');
      console.log('Attempting to insert into Supabase...');
      
      const { data: result, error } = await supabase
        .from('applicants')
        .insert([data])
        .select();
    
      console.log('Supabase response:', { result, error });
    
      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }
    
      console.log('Success! Data inserted:', result);
      showPopup("success", "Application Submitted", "Application submitted successfully! 🎉");
      reset();
      setCurrentStep(1);
    } catch (error) {
      console.error('Error submitting application:', error);
      showPopup("error", "Submission Failed", `Failed to submit application: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const progress = (currentStep / steps.length) * 100;

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">Hackathon Application</h2>
          <span className="text-sm text-muted-foreground">
            Step {currentStep} of {steps.length}
          </span>
        </div>
        <Progress value={progress} className="h-2" />
        <div className="flex justify-between mt-2 text-xs text-muted-foreground">
          {steps.map((step) => (
            <span
              key={step.id}
              className={`${
                step.id <= currentStep ? "text-primary font-medium" : ""
              }`}
            >
              {step.title}
            </span>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Step 1: Personal Information */}
        {currentStep === 1 && (
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>
                Tell us about yourself
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="full_name">Full Name *</Label>
                  <Input
                    id="full_name"
                    {...register("full_name", { required: "Full name is required" })}
                    placeholder="John Doe"
                  />
                  {errors.full_name && (
                    <p className="text-sm text-destructive mt-1">{errors.full_name.message}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    {...register("email", { 
                      required: "Email is required",
                      pattern: {
                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                        message: "Please enter a valid email address"
                      },
                      validate: {
                        noSpaces: (value) => !/\s/.test(value) || "Email cannot contain spaces",
                        validDomain: (value) => {
                          const domain = value.split('@')[1];
                          return domain && domain.includes('.') || "Please enter a valid email domain";
                        },
                        notDisposable: (value) => {
                          const domain = value.split('@')[1]?.toLowerCase();
                          const disposableDomains = ['tempmail.com', '10minutemail.com', 'guerrillamail.com', 'mailinator.com'];
                          return !disposableDomains.includes(domain) || "Please use a permanent email address";
                        }
                      }
                    })}
                    placeholder="john@example.com"
                  />
                  {errors.email && (
                    <p className="text-sm text-destructive mt-1">{errors.email.message}</p>
                  )}
                  <p className="text-xs text-muted-foreground mt-1">
                    Use a valid, permanent email address. No disposable emails allowed.
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Each email address can only submit one application.
                  </p>
                  
                </div>

              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 2: Academic & Skills */}
        {currentStep === 2 && (
          <Card>
            <CardHeader>
              <CardTitle>Academic & Skills</CardTitle>
              <CardDescription>
                Your educational background and technical skills
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="university">University/Institution *</Label>
                  <Input
                    id="university"
                    {...register("university", { required: "University is required" })}
                    placeholder="Stanford University"
                  />
                  {errors.university && (
                    <p className="text-sm text-destructive mt-1">{errors.university.message}</p>
                  )}
                </div>
                <div>
                  <Label>Track Selection *</Label>
                  <div className="space-y-3 mt-2">
                    <div className="flex items-center space-x-2">
                      <Controller
                        name="track_selection"
                        control={control}
                        render={({ field }) => (
                          <Checkbox
                            id="beginner_track"
                            checked={field.value === 'beginner'}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                field.onChange('beginner');
                              }
                            }}
                          />
                        )}
                      />
                      <Label htmlFor="beginner_track" className="text-sm">Beginner Track</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Controller
                        name="track_selection"
                        control={control}
                        render={({ field }) => (
                          <Checkbox
                            id="advanced_track"
                            checked={field.value === 'advanced'}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                field.onChange('advanced');
                              }
                            }}
                          />
                        )}
                      />
                      <Label htmlFor="advanced_track" className="text-sm">Advanced Track</Label>
                    </div>
                  </div>
                  {errors.track_selection && (
                    <p className="text-sm text-destructive mt-1">Please select a track</p>
                  )}
                </div>
              </div>
              
              <div>
                <Label>Technical Skills *</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                  {skillOptions.map((skill) => (
                    <div key={skill} className="flex items-center space-x-2">
                      <Controller
                        name="skills"
                        control={control}
                        render={({ field }) => (
                          <Checkbox
                            id={skill}
                            checked={field.value?.includes(skill)}
                            onCheckedChange={(checked) => {
                              const currentSkills = field.value || [];
                              if (checked) {
                                field.onChange([...currentSkills, skill]);
                              } else {
                                field.onChange(currentSkills.filter(s => s !== skill));
                              }
                            }}
                          />
                        )}
                      />
                      <Label htmlFor={skill} className="text-sm">{skill}</Label>
                    </div>
                  ))}
                </div>
                {errors.skills && (
                  <p className="text-sm text-destructive mt-1">Please select at least one skill</p>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 3: Experience & Motivation */}
        {currentStep === 3 && (
          <Card>
            <CardHeader>
              <CardTitle>Experience & Motivation</CardTitle>
              <CardDescription>
                Tell us about your experience and why you want to join
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="experience">Relevant Experience *</Label>
                <Textarea
                  id="experience"
                  {...register("experience", { required: "Experience description is required" })}
                  placeholder="Describe your relevant projects, internships, or work experience..."
                  rows={4}
                />
                {errors.experience && (
                  <p className="text-sm text-destructive mt-1">{errors.experience.message}</p>
                )}
              </div>
              
              <div>
                <Label htmlFor="motivation">Why do you want to join this hackathon? *</Label>
                <Textarea
                  id="motivation"
                  {...register("motivation", { required: "Motivation is required" })}
                  placeholder="Share your passion, goals, and what you hope to achieve..."
                  rows={4}
                />
                {errors.motivation && (
                  <p className="text-sm text-destructive mt-1">{errors.motivation.message}</p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="github_url">GitHub Profile</Label>
                  <Input
                    id="github_url"
                    {...register("github_url")}
                    placeholder="https://github.com/username"
                  />
                </div>
                <div>
                  <Label htmlFor="linkedin_url">LinkedIn Profile</Label>
                  <Input
                    id="linkedin_url"
                    {...register("linkedin_url")}
                    placeholder="https://linkedin.com/in/username"
                  />
                </div>
                <div>
                  <Label htmlFor="portfolio_url">Portfolio Website</Label>
                  <Input
                    id="portfolio_url"
                    {...register("portfolio_url")}
                    placeholder="https://yourportfolio.com"
                  />
                </div>
              </div>


            </CardContent>
          </Card>
        )}

        {/* Step 4: Additional Information */}
        {currentStep === 4 && (
          <Card>
            <CardHeader>
              <CardTitle>Additional Information</CardTitle>
              <CardDescription>
                Preferences and special requirements
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="team_preference">Team Preference *</Label>
                <Controller
                  name="team_preference"
                  control={control}
                  rules={{ required: "Team preference is required" }}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select preference" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="individual">Work individually</SelectItem>
                        <SelectItem value="team">Join a team</SelectItem>
                        <SelectItem value="no_preference">No preference</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.team_preference && (
                  <p className="text-sm text-destructive mt-1">{errors.team_preference.message}</p>
                )}
              </div>




            </CardContent>
          </Card>
        )}

        {/* Step 5: Review & Submit */}
        {currentStep === 5 && (
          <Card>
            <CardHeader>
              <CardTitle>Review Your Application</CardTitle>
              <CardDescription>
                Please review all information before submitting
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="font-medium">Personal Information</Label>
                  <div className="mt-2 space-y-1 text-sm">
                    <p><span className="font-medium">Name:</span> {watchedValues.full_name}</p>
                    <p><span className="font-medium">Email:</span> {watchedValues.email}</p>
                  </div>
                </div>
                <div>
                  <Label className="font-medium">Academic Information</Label>
                  <div className="mt-2 space-y-1 text-sm">
                    <p><span className="font-medium">University:</span> {watchedValues.university}</p>
                    <p><span className="font-medium">Track:</span> {watchedValues.track_selection === 'beginner' ? 'Beginner Track' : watchedValues.track_selection === 'advanced' ? 'Advanced Track' : 'Not selected'}</p>
                  </div>
                </div>
              </div>

              <div>
                <Label className="font-medium">Skills</Label>
                <div className="mt-2 flex flex-wrap gap-2">
                  {watchedValues.skills?.map((skill) => (
                    <Badge key={skill} variant="secondary">{skill}</Badge>
                  ))}
                </div>
              </div>

              <div>
                <Label className="font-medium">Experience</Label>
                <p className="mt-2 text-sm text-muted-foreground">{watchedValues.experience}</p>
              </div>

              <div>
                <Label className="font-medium">Motivation</Label>
                <p className="mt-2 text-sm text-muted-foreground">{watchedValues.motivation}</p>
              </div>

              <div>
                <Label className="font-medium">Team Preference</Label>
                <p className="mt-2 text-sm text-muted-foreground">
                  {watchedValues.team_preference === 'individual' ? 'Work individually' : 
                   watchedValues.team_preference === 'team' ? 'Join a team' : 
                   watchedValues.team_preference === 'no_preference' ? 'No preference' : 'Not selected'}
                </p>
              </div>


            </CardContent>
          </Card>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between">
          <Button
            type="button"
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 1}
            className="flex items-center space-x-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Previous
          </Button>

          {currentStep < steps.length ? (
            <Button
              type="button"
              onClick={nextStep}
              className="flex items-center space-x-2"
            >
              Next
              <ArrowRight className="h-4 w-4" />
            </Button>
          ) : (
            <Button
              type="submit"
              disabled={isSubmitting || !isValid}
              className="flex items-center space-x-2"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Submitting...
                </>
              ) : (
                <>
                  <Check className="h-4 w-4" />
                  Submit Application
                </>
              )}
            </Button>
          )}
        </div>
      </form>
      
      {/* Custom Popup */}
      <Popup
        isOpen={popup.isOpen}
        onClose={hidePopup}
        type={popup.type}
        title={popup.title}
        message={popup.message}
        autoClose={popup.type === "success"}
        autoCloseDelay={4000}
      />
    </div>
  );
}
