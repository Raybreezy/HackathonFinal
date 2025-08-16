#!/bin/bash

# Deploy Email Function Script
# This script deploys the send-application-email Edge Function to Supabase

echo "🚀 Deploying Email Function to Supabase..."

# Check if Supabase CLI is installed
if ! command -v supabase &> /dev/null; then
    echo "❌ Supabase CLI not found. Please install it first:"
    echo "   npm install -g supabase"
    exit 1
fi

# Check if user is logged in
if ! supabase status &> /dev/null; then
    echo "❌ Not logged in to Supabase. Please login first:"
    echo "   supabase login"
    exit 1
fi

# Check if project is linked
if ! supabase status | grep -q "Linked to"; then
    echo "❌ Project not linked. Please link your project first:"
    echo "   supabase link --project-ref YOUR_PROJECT_REF"
    exit 1
fi

echo "✅ Supabase CLI ready"
echo "📁 Deploying send-application-email function..."

# Deploy the function
supabase functions deploy send-application-email

if [ $? -eq 0 ]; then
    echo "✅ Email function deployed successfully!"
    echo ""
    echo "📧 Next steps:"
    echo "1. Go to your Supabase dashboard"
    echo "2. Navigate to Settings → Edge Functions"
    echo "3. Set the following environment variables:"
    echo "   - SMTP_HOST (e.g., smtp.resend.com)"
    echo "   - SMTP_PORT (e.g., 587)"
    echo "   - SMTP_USERNAME (your API key)"
    echo "   - FROM_EMAIL (e.g., noreply@yourhackathon.com)"
    echo ""
    echo "4. Test the function with your application form"
    echo ""
    echo "🎉 Your applicants will now receive confirmation emails!"
else
    echo "❌ Failed to deploy email function"
    exit 1
fi
