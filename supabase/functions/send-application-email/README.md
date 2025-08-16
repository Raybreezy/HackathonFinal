# Send Application Email - Supabase Edge Function

This Edge Function automatically sends confirmation emails to successful hackathon applicants.

## 🚀 Features

- **Automatic email sending** after successful application submission
- **Professional HTML email template** with hackathon branding
- **Personalized content** including applicant details and track selection
- **Next steps information** and timeline
- **Contact information** for questions

## 📧 Email Content

The email includes:
- ✅ Application confirmation
- ✅ Personal details (name, university, track, team preference)
- ✅ Skills summary
- ✅ Next steps timeline
- ✅ Contact information
- ✅ Professional styling and branding

## 🛠️ Setup Instructions

### 1. Install Supabase CLI
```bash
npm install -g supabase
```

### 2. Login to Supabase
```bash
supabase login
```

### 3. Link to your project
```bash
supabase link --project-ref YOUR_PROJECT_REF
```

### 4. Set environment variables
```bash
# Copy the example file
cp env.example .env

# Edit .env with your email service credentials
nano .env
```

### 5. Deploy the function
```bash
supabase functions deploy send-application-email
```

### 6. Set environment variables in Supabase Dashboard
Go to your Supabase project dashboard → Settings → Edge Functions and add:
- `SMTP_HOST`
- `SMTP_PORT` 
- `SMTP_USERNAME` (or `RESEND_API_KEY`)
- `SMTP_PASSWORD`
- `FROM_EMAIL`

## 📧 Email Service Options

### Option 1: Resend (Recommended - Free Tier)
- **Sign up**: [resend.com](https://resend.com)
- **Free tier**: 3,000 emails/month
- **Setup**: Use API key as username, leave password empty

### Option 2: SendGrid
- **Sign up**: [sendgrid.com](https://sendgrid.com)
- **Free tier**: 100 emails/day
- **Setup**: Use API key as password

### Option 3: Mailgun
- **Sign up**: [mailgun.com](https://mailgun.com)
- **Free tier**: 5,000 emails/month for 3 months
- **Setup**: Use API key as password

## 🔧 Configuration

### Environment Variables
```bash
# Required
SMTP_HOST=smtp.resend.com
SMTP_PORT=587
SMTP_USERNAME=your_api_key
FROM_EMAIL=noreply@yourhackathon.com

# Optional (for some services)
SMTP_PASSWORD=your_password
RESEND_API_KEY=your_resend_key
```

### Customization
- **Email template**: Edit the `createEmailContent()` function
- **Styling**: Modify the CSS in the HTML template
- **Content**: Update text, links, and branding
- **Timeline**: Adjust the next steps information

## 🧪 Testing

### Local Testing
```bash
# Start the function locally
supabase functions serve send-application-email

# Test with curl
curl -X POST http://localhost:54321/functions/v1/send-application-email \
  -H "Content-Type: application/json" \
  -d '{
    "applicant": {
      "full_name": "John Doe",
      "email": "test@example.com",
      "university": "Test University",
      "track_selection": "beginner",
      "skills": ["JavaScript", "React"],
      "experience": "Beginner",
      "motivation": "Learn new skills",
      "team_preference": "team"
    }
  }'
```

### Production Testing
After deployment, test with your actual application form.

## 📱 Integration

The function is called automatically when:
1. User submits application form
2. Form data is saved to Supabase
3. Edge Function is triggered with applicant data
4. Confirmation email is sent
5. User receives professional confirmation email

## 🎨 Customization

### Update Email Template
- **Hackathon name**: Change "Hackathon 2024" throughout
- **Contact info**: Update email, Discord, website links
- **Timeline**: Modify the next steps schedule
- **Branding**: Update colors, logos, and styling

### Modify Email Content
- **Subject line**: Change the email subject
- **Body content**: Update welcome message and details
- **Styling**: Modify CSS for different look and feel
- **Language**: Translate to other languages if needed

## 🚨 Troubleshooting

### Common Issues
1. **SMTP connection failed**: Check hostname, port, and credentials
2. **Authentication error**: Verify username/password or API key
3. **Email not sending**: Check FROM_EMAIL domain verification
4. **Function deployment failed**: Ensure Supabase CLI is up to date

### Debug Steps
1. Check Supabase Edge Function logs
2. Verify environment variables are set
3. Test SMTP connection locally
4. Check email service dashboard for errors

## 📚 Resources

- [Supabase Edge Functions Documentation](https://supabase.com/docs/guides/functions)
- [Resend Email Service](https://resend.com)
- [SendGrid Documentation](https://sendgrid.com/docs)
- [Mailgun Documentation](https://documentation.mailgun.com)

## 🤝 Support

If you encounter issues:
1. Check the Supabase Edge Function logs
2. Verify your email service configuration
3. Test the function locally first
4. Check the troubleshooting section above
