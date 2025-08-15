"use client";


import { Button } from "./ui/button";
import { ApplicationForm } from "./ApplicationForm";
import { ArrowLeft } from "lucide-react";

export function ApplicationPage() {
  const handleBackToMain = () => {
    window.location.hash = '#/';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <Button
            variant="outline"
            onClick={handleBackToMain}
            className="flex items-center space-x-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Hackathon
          </Button>
        </div>
      </div>

      {/* Application Form */}
      <div className="container mx-auto px-4 py-8">
        <ApplicationForm />
      </div>
    </div>
  );
}
