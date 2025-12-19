import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

// Validate admin access
function validateAdminAccess(request: NextRequest): boolean {
  const adminSecret = process.env.ADMIN_SECRET
  if (!adminSecret) {
    console.error('ADMIN_SECRET not configured')
    return false
  }
  const providedSecret = request.headers.get('x-admin-secret')
  return providedSecret === adminSecret
}

export async function POST(request: NextRequest) {
  // Require admin authentication
  if (!validateAdminAccess(request)) {
    return NextResponse.json(
      { error: 'Unauthorized - admin credentials required' },
      { status: 401 }
    )
  }

  try {
    const body = await request.json()
    const { to } = body

    if (!to) {
      return NextResponse.json({ error: 'Email address required' }, { status: 400 })
    }

    // Create test transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_PORT === '465',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })

    // Send test email
    const info = await transporter.sendMail({
      from: process.env.FROM_EMAIL || '"Kanika Batra" <noreply@kanikarose.com>',
      to: to,
      subject: 'Test Email from Kanika Batra Website',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body {
              font-family: Georgia, serif;
              background-color: #0a0a0a;
              color: #e5e5e5;
              padding: 40px 20px;
              margin: 0;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              background: linear-gradient(135deg, #1a0a0a 0%, #2a1520 100%);
              border: 1px solid #d4af37;
              border-radius: 8px;
              padding: 40px;
            }
            h1 {
              color: #d4af37;
              font-size: 28px;
              margin-bottom: 20px;
              text-align: center;
            }
            p {
              line-height: 1.6;
              margin-bottom: 15px;
            }
            .highlight {
              color: #d4af37;
              font-weight: bold;
            }
            .footer {
              margin-top: 30px;
              padding-top: 20px;
              border-top: 1px solid #d4af37;
              text-align: center;
              font-size: 12px;
              color: #a0a0a0;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>Email System Test</h1>
            <p>Hello,</p>
            <p>This is a <span class="highlight">test email</span> from the Kanika Batra website email system.</p>
            <p>If you're receiving this, it means:</p>
            <ul>
              <li>✅ SMTP configuration is working correctly</li>
              <li>✅ Email delivery is functional</li>
              <li>✅ Book download emails will work</li>
              <li>✅ Coaching confirmation emails will work</li>
            </ul>
            <p>Your email system is ready for production!</p>
            <div class="footer">
              <p>Kanika Batra • kanikarose.com</p>
              <p>For those who don't believe in love... only power.</p>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `
Email System Test

This is a test email from the Kanika Batra website email system.

If you're receiving this, it means:
✅ SMTP configuration is working correctly
✅ Email delivery is functional
✅ Book download emails will work
✅ Coaching confirmation emails will work

Your email system is ready for production!

Kanika Batra • kanikarose.com
For those who don't believe in love... only power.
      `,
    })

    return NextResponse.json({
      success: true,
      message: 'Test email sent successfully',
      messageId: info.messageId,
    })
  } catch (error) {
    console.error('Test email error:', error)
    return NextResponse.json(
      {
        error: 'Failed to send test email',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}
