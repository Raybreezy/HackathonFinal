import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { SmtpClient } from "https://deno.land/x/smtp@v0.7.0/mod.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface Applicant {
  full_name: string
  email: string
  university: string
  track_selection: 'beginner' | 'advanced'
  skills: string[]
  experience: string
  motivation: string
  github_url?: string
  linkedin_url?: string
  portfolio_url?: string
  team_preference: 'individual' | 'team' | 'no_preference'
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { applicant }: { applicant: Applicant } = await req.json()

    // Validate required fields
    if (!applicant.email || !applicant.full_name) {
      throw new Error('Missing required applicant information')
    }

    console.log(`📧 Attempting to send email to: ${applicant.email}`)

    // Get environment variables
    const smtpHost = Deno.env.get('SMTP_HOST') || 'smtp.resend.com'
    const smtpPort = parseInt(Deno.env.get('SMTP_PORT') || '587')
    const smtpUsername = Deno.env.get('SMTP_USERNAME') || ''
    const smtpPassword = Deno.env.get('SMTP_PASSWORD') || ''
    const fromEmail = Deno.env.get('FROM_EMAIL') || 'noreply@yourhackathon.com'

    console.log(`🔧 SMTP Config: ${smtpHost}:${smtpPort}, User: ${smtpUsername ? 'Set' : 'Not Set'}`)

    // Email configuration optimized for Resend
    const client = new SmtpClient()
    
    try {
      console.log('🔌 Connecting to SMTP server...')
      
      // Resend SMTP configuration with better error handling
      await client.connectTLS({
        hostname: smtpHost,
        port: smtpPort,
        username: smtpUsername,
        password: smtpPassword,
      })

      console.log('✅ SMTP connection established')

      // Create email content
      const emailContent = createEmailContent(applicant)
      
      console.log('📝 Sending email...')
      
      // Send email with Resend-optimized settings
      await client.send({
        from: fromEmail,
        to: applicant.email,
        subject: `Welcome to Hackathon 2024 - Application Confirmed! 🎉`,
        content: emailContent,
        html: emailContent,
      })

      console.log(`✅ Email sent successfully to ${applicant.email}`)

    } catch (smtpError) {
      console.error('❌ SMTP Error:', smtpError)
      throw new Error(`SMTP Error: ${smtpError.message}`)
    } finally {
      await client.close()
      console.log('🔌 SMTP connection closed')
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Confirmation email sent successfully',
        recipient: applicant.email
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    )

  } catch (error) {
    console.error('❌ Function Error:', error)
    
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message,
        timestamp: new Date().toISOString(),
        details: error.stack
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    )
  }
})

function createEmailContent(applicant: Applicant): string {
  const trackEmoji = applicant.track_selection === 'advanced' ? '🚀' : '🌟'
  const teamEmoji = applicant.team_preference === 'individual' ? '👤' : 
                   applicant.team_preference === 'team' ? '👥' : '🤝'
  
  return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Hackathon Application Confirmed</title>
    <style>
        body { 
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; 
            line-height: 1.6; 
            color: #333; 
            max-width: 600px; 
            margin: 0 auto; 
            padding: 20px;
            background-color: #f8f9fa;
        }
        .container { 
            background: white; 
            padding: 30px; 
            border-radius: 12px; 
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        }
        .header { 
            text-align: center; 
            margin-bottom: 30px; 
            padding-bottom: 20px; 
            border-bottom: 2px solid #e9ecef;
        }
        .header h1 { 
            color: #2563eb; 
            margin: 0; 
            font-size: 28px;
        }
        .success-badge { 
            background: #dcfce7; 
            color: #166534; 
            padding: 8px 16px; 
            border-radius: 20px; 
            display: inline-block; 
            font-weight: 600;
            margin: 10px 0;
        }
        .details { 
            background: #f8f9fa; 
            padding: 20px; 
            border-radius: 8px; 
            margin: 20px 0;
        }
        .detail-row { 
            display: flex; 
            justify-content: space-between; 
            margin: 10px 0; 
            padding: 8px 0;
        }
        .detail-label { 
            font-weight: 600; 
            color: #6b7280;
        }
        .detail-value { 
            color: #374151;
        }
        .next-steps { 
            background: #eff6ff; 
            padding: 20px; 
            border-radius: 8px; 
            margin: 20px 0;
            border-left: 4px solid #2563eb;
        }
        .next-steps h3 { 
            color: #2563eb; 
            margin-top: 0;
        }
        .timeline { 
            margin: 15px 0;
        }
        .timeline-item { 
            margin: 10px 0; 
            padding-left: 20px; 
            position: relative;
        }
        .timeline-item:before { 
            content: "•"; 
            color: #2563eb; 
            font-weight: bold; 
            position: absolute; 
            left: 0;
        }
        .footer { 
            text-align: center; 
            margin-top: 30px; 
            padding-top: 20px; 
            border-top: 1px solid #e9ecef;
            color: #6b7280;
            font-size: 14px;
        }
        .contact { 
            background: #fef3c7; 
            padding: 15px; 
            border-radius: 8px; 
            margin: 20px 0;
            border-left: 4px solid #f59e0b;
        }
        .contact h4 { 
            color: #92400e; 
            margin-top: 0;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🎉 Hackathon 2024</h1>
            <div class="success-badge">Application Confirmed!</div>
            <p>Welcome to the most exciting hackathon of the year!</p>
        </div>

        <p>Hi <strong>${applicant.full_name}</strong>,</p>
        
        <p>Congratulations! Your application for <strong>Hackathon 2024</strong> has been successfully submitted and confirmed. We're excited to have you join us for this incredible event!</p>

        <div class="details">
            <h3>📋 Application Details</h3>
            <div class="detail-row">
                <span class="detail-label">Name:</span>
                <span class="detail-value">${applicant.full_name}</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">University:</span>
                <span class="detail-value">${applicant.university}</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Track Selection:</span>
                <span class="detail-value">${trackEmoji} ${applicant.track_selection.charAt(0).toUpperCase() + applicant.track_selection.slice(1)} Track</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Team Preference:</span>
                <span class="detail-value">${teamEmoji} ${applicant.team_preference.charAt(0).toUpperCase() + applicant.team_preference.slice(1).replace('_', ' ')}</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Skills:</span>
                <span class="detail-value">${applicant.skills.join(', ')}</span>
            </div>
        </div>

        <div class="next-steps">
            <h3>📅 What Happens Next?</h3>
            <div class="timeline">
                <div class="timeline-item">Within 24 hours: You'll receive your participant packet with event details</div>
                <div class="timeline-item">1 week before: Final event schedule and logistics information</div>
                <div class="timeline-item">Event day: Check-in opens 1 hour before the hackathon begins</div>
            </div>
        </div>

        <div class="contact">
            <h4>❓ Questions?</h4>
            <p>If you have any questions about your application or the event, please don't hesitate to reach out:</p>
            <ul>
                <li>Email: hackathon@youruniversity.edu</li>
                <li>Discord: Join our #hackathon-2024 channel</li>
                <li>Website: yourhackathon.com</li>
            </ul>
        </div>

        <p><strong>Get ready to build something amazing!</strong> 🚀</p>
        
        <p>Best regards,<br>The Hackathon 2024 Team</p>

        <div class="footer">
            <p>This email was sent to confirm your hackathon application. Please keep it for your records.</p>
        </div>
    </div>
</body>
</html>
  `
}
