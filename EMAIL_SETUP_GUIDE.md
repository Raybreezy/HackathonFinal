# 🎉 Email Confirmation Setup Guide

This guide will help you set up automatic email confirmations for your hackathon applicants.

## 🚀 Quick Start (5 minutes)

### 1. Sign up for Resend (Free Email Service)
- Go to [resend.com](https://resend.com)
- Sign up for a free account
- Get your API key from the dashboard
- **Free tier**: 3,000 emails/month

### 2. Install Supabase CLI
```bash
npm install -g supabase
```

### 3. Login and Link Project
```bash
# Login to Supabase
supabase login

# Link to your project (replace with your project ref)
supabase link --project-ref pazpexlbeoeytroxqqkv
```

### 4. Deploy Email Function
```bash
# Run the deployment script
./deploy-email-function.sh
```

### 5. Set Environment Variables
- Go to your Supabase dashboard
- Navigate to **Settings** → **Edge Functions**
- Add these environment variables:
  ```
  SMTP_HOST=smtp.resend.com
  SMTP_PORT=587
  SMTP_USERNAME=your_resend_api_key_here
  FROM_EMAIL=noreply@yourdomain.com
  ```

### 6. Test the Function
Submit a test application and check if the confirmation email is received!

## 📧 What Applicants Will Receive

### Email Features:
- ✅ **Professional HTML template** with hackathon branding
- ✅ **Personalized content** (name, university, track selection)
- ✅ **Application details** (skills, team preference)
- ✅ **Next steps timeline** (what happens next)
- ✅ **Contact information** for questions
- ✅ **Mobile-responsive design**

### Email Content:
- **Subject**: "Welcome to Hackathon 2024 - Application Confirmed! 🎉"
- **Header**: Hackathon branding with confirmation badge
- **Personal Details**: Name, university, track, team preference
- **Skills Summary**: List of submitted skills
- **Timeline**: Next steps and important dates
- **Contact Info**: Email, Discord, website
- **Professional Footer**: Branded and styled

## 🛠️ Alternative Email Services

### Option 1: SendGrid
- **Free tier**: 100 emails/day
- **Setup**: Use API key as password
- **SMTP**: smtp.sendgrid.net:587

### Option 2: Mailgun
- **Free tier**: 5,000 emails/month for 3 months
- **Setup**: Use API key as password
- **SMTP**: smtp.mailgun.org:587

### Option 3: Gmail (Limited)
- **Free tier**: 500 emails/day
- **Setup**: Use app password
- **SMTP**: smtp.gmail.com:587

## 🔧 Customization Options

### Update Email Template
- **Hackathon name**: Change "Hackathon 2024" throughout
- **Contact info**: Update email, Discord, website
- **Timeline**: Modify next steps schedule
- **Branding**: Update colors and styling

### Modify Content
- **Subject line**: Change email subject
- **Welcome message**: Update greeting and details
- **Timeline**: Adjust the schedule
- **Styling**: Change colors and layout

## 🧪 Testing Your Setup

### Local Testing
```bash
# Start function locally
supabase functions serve send-application-email

# Test with sample data
curl -X POST http://localhost:54321/functions/v1/send-application-email \
  -H "Content-Type: application/json" \
  -d '{
    "applicant": {
      "full_name": "Test User",
      "email": "your-email@example.com",
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
1. Submit a real application through your form
2. Check if confirmation email is received
3. Verify email content and styling
4. Test with different track selections

## 🚨 Troubleshooting

### Common Issues:

#### 1. "Function not found" Error
- **Solution**: Deploy the function first using `./deploy-email-function.sh`
- **Check**: Verify function exists in Supabase dashboard

#### 2. "SMTP connection failed" Error
- **Solution**: Check SMTP credentials and hostname
- **Check**: Verify API key is correct and active

#### 3. "Authentication failed" Error
- **Solution**: Verify username/password or API key
- **Check**: Ensure email service account is active

#### 4. "Email not sending" Error
- **Solution**: Check FROM_EMAIL domain verification
- **Check**: Verify email service quotas and limits

### Debug Steps:
1. Check Supabase Edge Function logs
2. Verify environment variables are set correctly
3. Test SMTP connection with email service
4. Check email service dashboard for errors
5. Verify function deployment status

## 📱 Integration Details

### How It Works:
1. **User submits form** → Data saved to Supabase
2. **Form success** → Edge Function called with applicant data
3. **Email sent** → Professional confirmation email delivered
4. **User notified** → Receives confirmation with next steps
5. **Form redirects** → User returns to landing page

### Error Handling:
- **Email failures** don't break form submission
- **Graceful degradation** if email service is down
- **Logging** for debugging and monitoring
- **User experience** remains smooth

## 🎨 Branding Customization

### Update These Elements:
- **Hackathon name** and year
- **Color scheme** and styling
- **Logo and branding** elements
- **Contact information** and links
- **Timeline and schedule** details
- **Footer and legal** information

### CSS Customization:
- **Primary colors**: Update blue (#2563eb) to your brand
- **Secondary colors**: Modify accent colors
- **Typography**: Change fonts and sizes
- **Layout**: Adjust spacing and margins
- **Responsiveness**: Ensure mobile compatibility

## 📊 Monitoring and Analytics

### Track Email Performance:
- **Delivery rates**: Monitor successful sends
- **Open rates**: Track email engagement
- **Bounce rates**: Identify invalid emails
- **Spam reports**: Monitor deliverability

### Email Service Dashboards:
- **Resend**: Built-in analytics and monitoring
- **SendGrid**: Comprehensive email insights
- **Mailgun**: Delivery tracking and logs

## 🔒 Security Considerations

### Best Practices:
- **API keys**: Keep secure and rotate regularly
- **Rate limiting**: Prevent abuse and spam
- **Domain verification**: Verify sender domains
- **SPF/DKIM**: Improve email deliverability
- **Monitoring**: Watch for unusual activity

### Privacy:
- **Data handling**: Only send necessary information
- **GDPR compliance**: Respect user privacy
- **Unsubscribe**: Provide opt-out options
- **Data retention**: Follow privacy policies

## 🚀 Production Deployment

### Before Going Live:
1. **Test thoroughly** with real data
2. **Verify email delivery** to major providers
3. **Check spam filters** and deliverability
4. **Monitor performance** and error rates
5. **Set up alerts** for failures

### Scaling Considerations:
- **Email quotas**: Monitor service limits
- **Rate limiting**: Respect API constraints
- **Error handling**: Graceful degradation
- **Monitoring**: Track success rates

## 🎯 Success Metrics

### Track These KPIs:
- **Email delivery rate**: Should be >95%
- **Form completion rate**: Monitor conversion
- **User satisfaction**: Feedback on emails
- **Support requests**: Questions about confirmations
- **Brand perception**: Professional appearance

## 🤝 Support and Help

### If You Need Help:
1. **Check logs**: Supabase Edge Function logs
2. **Verify setup**: Follow this guide step by step
3. **Test locally**: Use the local testing commands
4. **Check documentation**: Email service docs
5. **Community support**: Supabase Discord/forums

### Resources:
- [Supabase Edge Functions](https://supabase.com/docs/guides/functions)
- [Resend Documentation](https://resend.com/docs)
- [SendGrid Guides](https://sendgrid.com/docs)
- [Mailgun API](https://documentation.mailgun.com)

---

## 🎉 You're All Set!

Once you complete this setup:
- ✅ Applicants get professional confirmation emails
- ✅ Your hackathon looks more professional
- ✅ Users know what happens next
- ✅ Reduced support questions
- ✅ Better user experience

**Happy hacking! 🚀**
