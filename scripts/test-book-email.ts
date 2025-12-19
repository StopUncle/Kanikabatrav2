import * as dotenv from 'dotenv'
import * as path from 'path'
import nodemailer from 'nodemailer'

// Load .env file from project root FIRST
const envPath = path.resolve(__dirname, '..', '.env')
console.log('Loading env from:', envPath)
dotenv.config({ path: envPath })

async function testBookEmail() {
  console.log('Testing book delivery email...')
  console.log('='.repeat(50))
  console.log('SMTP Config:')
  console.log('  Host:', process.env.SMTP_HOST)
  console.log('  User:', process.env.SMTP_USER)
  console.log('  Pass:', process.env.SMTP_PASS ? '****' + process.env.SMTP_PASS.slice(-4) : 'NOT SET')
  console.log('  From:', process.env.FROM_EMAIL)
  console.log('='.repeat(50))

  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.error('❌ SMTP credentials not found in .env file')
    return
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '587', 10),
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  })

  // Test token and expiry
  const testToken = 'test-token-' + Date.now()
  const expiresAt = new Date()
  expiresAt.setDate(expiresAt.getDate() + 30)

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://kanikarose.com'
  const epubDownloadUrl = `${baseUrl}/api/download?token=${testToken}&format=epub`
  const expiryDate = expiresAt.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  })

  const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Your Book Purchase - Kanika Batra</title>
    </head>
    <body style="margin: 0; padding: 0; background-color: #0a0a0a; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #0a0a0a;">
        <tr>
          <td align="center" style="padding: 40px 20px;">
            <table role="presentation" width="600" cellspacing="0" cellpadding="0" border="0" style="max-width: 600px; width: 100%; background-color: #050511; border-radius: 12px; overflow: hidden; box-shadow: 0 10px 40px rgba(212, 175, 55, 0.15);">

              <!-- Header -->
              <tr>
                <td style="background: linear-gradient(135deg, #720921 0%, #0a1628 100%); padding: 40px 30px; text-align: center;">
                  <h1 style="color: #d4af37; margin: 0 0 10px 0; font-size: 28px; font-weight: 300; letter-spacing: 2px; text-transform: uppercase;">
                    Thank You For Your Purchase
                  </h1>
                  <p style="color: #94a3b8; margin: 0; font-size: 14px; letter-spacing: 1px;">
                    Your download is ready
                  </p>
                </td>
              </tr>

              <!-- Main Content -->
              <tr>
                <td style="padding: 40px 30px; border-left: 1px solid #d4af37; border-right: 1px solid #d4af37; border-bottom: 1px solid #d4af37;">

                  <p style="color: #f5f0ed; font-size: 18px; margin: 0 0 20px 0; line-height: 1.6;">
                    Dear Test User,
                  </p>

                  <p style="color: #94a3b8; line-height: 1.8; margin: 0 0 30px 0; font-size: 15px;">
                    Your payment has been successfully processed. You now have instant access to:
                  </p>

                  <div style="background: linear-gradient(135deg, #1a0d11 0%, #0f0a0f 100%); padding: 25px; border-radius: 10px; margin: 0 0 30px 0; border: 1px solid #d4af37;">
                    <h2 style="color: #d4af37; margin: 0 0 15px 0; font-size: 20px; font-weight: 600;">
                      Sociopathic Dating Bible: A Cure For Empathy (Premium Edition)
                    </h2>
                    <p style="color: #94a3b8; margin: 0; font-size: 14px; line-height: 1.6;">
                      70,000 words of strategic dating psychology from a diagnosed sociopath
                    </p>
                  </div>

                  <!-- Download Button -->
                  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin: 0 0 30px 0;">
                    <tr>
                      <td align="center">
                        <h3 style="color: #d4af37; margin: 0 0 10px 0; font-size: 18px; font-weight: 700; text-transform: uppercase; letter-spacing: 2px;">
                          Download Your Book
                        </h3>
                        <p style="color: #94a3b8; margin: 0 0 25px 0; font-size: 13px; font-style: italic;">
                          EPUB format optimized for all e-readers and mobile devices
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td align="center" style="padding-bottom: 20px;">
                        <a href="${epubDownloadUrl}" style="display: inline-block; background-color: #d4af37; color: #050511; padding: 22px 60px; text-decoration: none; font-weight: 700; font-size: 18px; letter-spacing: 1.5px; text-transform: uppercase; mso-padding-alt: 22px 60px;">
                          📱 Download EPUB
                        </a>
                      </td>
                    </tr>
                  </table>

                  <!-- Important Information -->
                  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background: #0a0a0a; border-radius: 8px; margin: 0 0 25px 0; border: 1px solid #333;">
                    <tr>
                      <td style="padding: 20px;">
                        <h3 style="color: #d4af37; margin: 0 0 15px 0; font-size: 16px; font-weight: 600;">
                          Important Download Information
                        </h3>
                        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                          <tr>
                            <td style="padding: 8px 0; color: #94a3b8; font-size: 14px; line-height: 1.6;">
                              ✓ Link expires: <strong style="color: #d4af37;">${expiryDate}</strong>
                            </td>
                          </tr>
                          <tr>
                            <td style="padding: 8px 0; color: #94a3b8; font-size: 14px; line-height: 1.6;">
                              ✓ Maximum downloads: <strong style="color: #d4af37;">5 times total</strong>
                            </td>
                          </tr>
                          <tr>
                            <td style="padding: 8px 0; color: #94a3b8; font-size: 14px; line-height: 1.6;">
                              ✓ EPUB format works on all devices and e-readers
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>

                  <!-- Premium Bonuses -->
                  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background: linear-gradient(135deg, #1a0d11 0%, #2a1a1f 100%); border-radius: 10px; margin: 0 0 25px 0; border: 2px solid #d4af37; box-shadow: 0 4px 15px rgba(212, 175, 55, 0.2);">
                    <tr>
                      <td style="padding: 25px;">
                        <h3 style="color: #d4af37; margin: 0 0 20px 0; font-size: 18px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; text-align: center;">
                          Your Premium Edition Bonuses
                        </h3>
                        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                          <tr>
                            <td style="padding: 12px 0; color: #f5f0ed; font-size: 14px; line-height: 1.6; border-bottom: 1px solid rgba(212, 175, 55, 0.2);">
                              <strong style="color: #d4af37;">Bonus Chapter:</strong> Advanced Dark Triad Tactics
                            </td>
                          </tr>
                          <tr>
                            <td style="padding: 12px 0; color: #f5f0ed; font-size: 14px; line-height: 1.6; border-bottom: 1px solid rgba(212, 175, 55, 0.2);">
                              <strong style="color: #d4af37;">Private Telegram Community:</strong> Lifetime Access to Exclusive Group
                            </td>
                          </tr>
                          <tr>
                            <td style="padding: 12px 0; color: #f5f0ed; font-size: 14px; line-height: 1.6;">
                              <strong style="color: #d4af37;">$100 Discount:</strong> On your first 1-on-1 consultation
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>

                  <!-- Footer -->
                  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin: 30px 0 0 0; padding: 25px 0 0 0; border-top: 1px solid #333;">
                    <tr>
                      <td style="text-align: center;">
                        <p style="color: #d4af37; margin: 0 0 5px 0; font-size: 16px; font-style: italic; font-weight: 500;">
                          Embrace your power,
                        </p>
                        <p style="color: #d4af37; margin: 0; font-size: 18px; font-weight: 600; letter-spacing: 1px;">
                          Kanika Batra
                        </p>
                        <p style="color: #666; margin: 5px 0 0 0; font-size: 12px; letter-spacing: 0.5px;">
                          The Beautiful Sociopath
                        </p>
                      </td>
                    </tr>
                  </table>

                  <!-- Support Note -->
                  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin: 25px 0 0 0;">
                    <tr>
                      <td style="text-align: center; padding: 20px; background: #1a0d11; border-radius: 8px;">
                        <p style="color: #94a3b8; margin: 0; font-size: 13px; line-height: 1.6;">
                          Issues with your download? Contact <a href="mailto:Kanika@kanikarose.com" style="color: #d4af37; text-decoration: none; font-weight: 600;">Kanika@kanikarose.com</a>
                        </p>
                      </td>
                    </tr>
                  </table>

                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `

  try {
    const info = await transporter.sendMail({
      from: process.env.FROM_EMAIL || 'test@test.com',
      to: 'sdmatheson@outlook.com',
      subject: 'Download Your Book - Sociopathic Dating Bible (Premium Edition)',
      html,
    })

    console.log('✅ Book delivery email sent successfully!')
    console.log('📧 Message ID:', info.messageId)
    console.log('')
    console.log('Check your Outlook inbox (and spam folder) for:')
    console.log('   Subject: Download Your Book - Sociopathic Dating Bible (Premium Edition)')
  } catch (error) {
    console.error('❌ Failed to send email:', error)
  }
}

testBookEmail()
