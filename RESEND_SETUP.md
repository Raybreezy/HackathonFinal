# 🔧 Resend Email Setup for Supabase

## 📍 **Step 1: Get Your Resend API Key**

1. **Visit**: [resend.com](https://resend.com)
2. **Sign up/Login** to your account
3. **Go to**: API Keys section
4. **Copy your API key** (starts with `re_`)

## ⚙️ **Step 2: Configure Supabase Edge Function**

### **Navigate to Supabase Dashboard:**
1. **Go to**: [Supabase Dashboard](https://supabase.com/dashboard/project/pazpexlbeoeytroxqqkv)
2. **Click**: Settings (gear icon) in the left sidebar
3. **Click**: Edge Functions

### **Add Environment Variables:**
Click "Add Environment Variable" and add these one by one:

| Variable Name | Value | Description |
|---------------|-------|-------------|
| `SMTP_HOST` | `smtp.resend.com` | Resend SMTP server |
| `SMTP_PORT` | `587` | Resend SMTP port |
| `SMTP_USERNAME` | `your_resend_api_key_here` | Your Resend API key |
| `SMTP_PASSWORD` | `(leave empty)` | Not needed for Resend |
| `FROM_EMAIL` | `noreply@yourdomain.com` | Your sender email |

### **Example Values:**
```
SMTP_HOST=smtp.resend.com
SMTP_PORT=587
SMTP_USERNAME=re_123456789abcdef...
SMTP_PASSWORD=
FROM_EMAIL=noreply@yourhackathon.com
```

## 🧪 **Step 3: Test the Email Function**

### **Test with a Sample Application:**
1. **Go to your application form**
2. **Submit a test application** with your email
3. **Check your inbox** for the confirmation email

### **Check Function Logs:**
1. **In Supabase Dashboard**: Go to Edge Functions
2. **Click on**: `send-application-email`
3. **Check**: Logs tab for any errors

## 🎯 **Expected Email Content:**

Your applicants will receive:
- **Subject**: "Welcome to Hackathon 2024 - Application Confirmed! 🎉"
- **Professional HTML template** with hackathon branding
- **Personalized details** (name, university, track, skills)
- **Next steps timeline** and contact information
- **Mobile-responsive design**

## 🚨 **Troubleshooting:**

### **Common Issues:**

#### 1. "Function not found" Error
- **Solution**: Function is already deployed ✅
- **Check**: Verify in Supabase Dashboard → Edge Functions

#### 2. "SMTP connection failed" Error
- **Solution**: Check SMTP_HOST and SMTP_PORT values
- **Verify**: `smtp.resend.com:587`

#### 3. "Authentication failed" Error
- **Solution**: Verify your Resend API key
- **Check**: API key starts with `re_` and is active

#### 4. "Email not sending" Error
- **Solution**: Check FROM_EMAIL domain verification
- **Verify**: Domain is verified in Resend dashboard

### **Debug Steps:**
1. **Check Supabase Edge Function logs**
2. **Verify environment variables** are set correctly
3. **Test Resend API key** in their dashboard
4. **Check email delivery** in Resend analytics

## 📱 **Integration Status:**

- ✅ **Email Function**: Deployed to Supabase
- ✅ **Project Linked**: Connected to your database
- ⏳ **Resend Credentials**: Need to be configured
- ⏳ **Email Testing**: Ready after credentials setup

## 🎉 **After Setup:**

Once configured:
- **Automatic emails** sent to all successful applicants
- **Professional appearance** for your hackathon
- **Better user experience** with clear next steps
- **Reduced support questions** about applications

---

## 🚀 **Quick Test Command:**

After setting up credentials, test with:
```bash
curl -X POST https://pazpexlbeoeytroxqqkv.supabase.co/functions/v1/send-application-email \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ANON_KEY" \
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

**Replace `YOUR_ANON_KEY` with your actual anon key from Supabase Dashboard → Settings → API**
