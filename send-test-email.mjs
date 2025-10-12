import nodemailer from 'nodemailer'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const testEmail = 'sdmatheson@outlook.com'
const testToken = 'test-token-12345-abc-def-ghi'
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
const pdfDownloadUrl = `${baseUrl}/api/download?token=${testToken}&format=pdf`
const epubDownloadUrl = `${baseUrl}/api/download?token=${testToken}&format=epub`

const expiryDate = new Date()
expiryDate.setDate(expiryDate.getDate() + 30)
const formattedDate = expiryDate.toLocaleDateString('en-US', {
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

              <!-- Download Buttons -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin: 0 0 30px 0;">
                <tr>
                  <td align="center">
                    <h3 style="color: #d4af37; margin: 0 0 20px 0; font-size: 16px; font-weight: 600;">
                      Choose Your Format
                    </h3>
                  </td>
                </tr>
                <tr>
                  <td align="center" style="padding-bottom: 15px;">
                    <a href="${pdfDownloadUrl}" style="display: inline-block; background: linear-gradient(135deg, #d4af37 0%, #b8941f 100%); color: #050511; padding: 18px 50px; text-decoration: none; border-radius: 50px; font-weight: 700; font-size: 16px; letter-spacing: 1px; text-transform: uppercase; box-shadow: 0 4px 15px rgba(212, 175, 55, 0.4); transition: all 0.3s ease;">
                      📄 Download PDF
                    </a>
                  </td>
                </tr>
                <tr>
                  <td align="center">
                    <a href="${epubDownloadUrl}" style="display: inline-block; background: linear-gradient(135deg, #722139 0%, #4a1426 100%); color: #d4af37; padding: 18px 50px; text-decoration: none; border-radius: 50px; font-weight: 700; font-size: 16px; letter-spacing: 1px; text-transform: uppercase; box-shadow: 0 4px 15px rgba(114, 33, 57, 0.4); border: 2px solid #d4af37; transition: all 0.3s ease;">
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
                          ✓ Link expires: <strong style="color: #d4af37;">${formattedDate}</strong>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0; color: #94a3b8; font-size: 14px; line-height: 1.6;">
                          ✓ Maximum downloads: <strong style="color: #d4af37;">5 times total</strong> (across both formats)
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0; color: #94a3b8; font-size: 14px; line-height: 1.6;">
                          ✓ Both PDF &amp; EPUB formats available
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0; color: #94a3b8; font-size: 14px; line-height: 1.6;">
                          ✓ Save locally for permanent access
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0; color: #94a3b8; font-size: 14px; line-height: 1.6;">
                          ✓ This link is unique to your purchase
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
                          <strong style="color: #d4af37;">Video Masterclass:</strong> Reading Micro-expressions & Body Language
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 12px 0; color: #f5f0ed; font-size: 14px; line-height: 1.6; border-bottom: 1px solid rgba(212, 175, 55, 0.2);">
                          <strong style="color: #d4af37;">Email Templates:</strong> Psychological Warfare in Modern Dating
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 12px 0; color: #f5f0ed; font-size: 14px; line-height: 1.6;">
                          <strong style="color: #d4af37;">$100 Discount:</strong> On your first 1-on-1 consultation
                        </td>
                      </tr>
                    </table>
                    <p style="color: #d4af37; margin: 20px 0 0 0; font-size: 13px; font-style: italic; text-align: center; line-height: 1.6;">
                      Access instructions for all bonuses have been sent in separate emails. Check your inbox!
                    </p>
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
                    <p style="color: #94a3b8; margin: 0 0 10px 0; font-size: 13px; line-height: 1.6;">
                      <strong style="color: #d4af37;">Important:</strong> If you don't see this email, please check your junk/spam folder.
                    </p>
                    <p style="color: #94a3b8; margin: 0; font-size: 13px; line-height: 1.6;">
                      Issues with your purchase? Contact us at <a href="mailto:Kanika@kanikarose.com" style="color: #d4af37; text-decoration: none; font-weight: 600;">Kanika@kanikarose.com</a>
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

async function sendTestEmail() {
  console.log('\n📧 Sending test book delivery email...\n')

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: parseInt(process.env.SMTP_PORT || '587') === 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  })

  try {
    const info = await transporter.sendMail({
      from: `"Kanika Batra" <${process.env.SMTP_USER}>`,
      to: testEmail,
      subject: 'Download Your Book - Sociopathic Dating Bible (Premium Edition)',
      html: html,
    })

    console.log('✅ Email sent successfully!')
    console.log('Message ID:', info.messageId)
    console.log('\nCheck your inbox at:', testEmail)
    console.log('\nThis email includes:')
    console.log('  - 📄 PDF download button')
    console.log('  - 📱 EPUB download button')
    console.log('  - Premium edition bonuses section')
    console.log('  - 5-download limit notice (shared across formats)')
    console.log('  - 30-day expiration date\n')
    console.log('Note: Download links use a test token and will not work')
  } catch (error) {
    console.error('❌ Error sending email:', error.message)
  }
}

sendTestEmail()
