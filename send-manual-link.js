/**
 * Send Manual Download Link (No Database Check)
 *
 * Use this when you need to send someone a link quickly
 * without creating a database record.
 *
 * Usage: node send-manual-link.js <email> <name> [premium]
 */

require('dotenv').config({ path: '.env' })
require('dotenv').config({ path: '.env.local' })
const nodemailer = require('nodemailer')
const crypto = require('crypto')

async function sendManualLink(email, name, isPremium) {
  try {
    // Generate token
    const token = crypto.randomBytes(32).toString('hex')
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://kanikabatra.com'
    const pdfUrl = `${baseUrl}/api/download?token=${token}&format=pdf`
    const epubUrl = `${baseUrl}/api/download?token=${token}&format=epub`

    const expiryDate = new Date()
    expiryDate.setDate(expiryDate.getDate() + 30)
    const formattedExpiry = expiryDate.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    })

    const premiumBonuses = isPremium ? `
      <table width="100%" cellspacing="0" cellpadding="0" style="background: linear-gradient(135deg, #1a0d11 0%, #2a1a1f 100%); border-radius: 10px; margin: 0 0 25px 0; border: 2px solid #d4af37; padding: 25px;">
        <tr>
          <td>
            <h3 style="color: #d4af37; margin: 0 0 20px 0; font-size: 18px; text-align: center;">
              Your Premium Edition Bonuses
            </h3>
            <div style="color: #f5f0ed; font-size: 14px;">
              <p style="margin: 10px 0;">✓ <strong style="color: #d4af37;">Bonus Chapter:</strong> Advanced Dark Triad Tactics</p>
              <p style="margin: 10px 0;">✓ <strong style="color: #d4af37;">Video Masterclass:</strong> Reading Micro-expressions</p>
              <p style="margin: 10px 0;">✓ <strong style="color: #d4af37;">Email Templates:</strong> Psychological Warfare in Dating</p>
              <p style="margin: 10px 0;">✓ <strong style="color: #d4af37;">$100 Discount:</strong> On your first consultation</p>
            </div>
          </td>
        </tr>
      </table>
    ` : ''

    const html = `
      <!DOCTYPE html>
      <html>
      <head><meta charset="UTF-8"></head>
      <body style="margin: 0; padding: 0; background-color: #0a0a0a; font-family: Arial, sans-serif;">
        <table width="100%" cellspacing="0" cellpadding="0" style="background-color: #0a0a0a;">
          <tr>
            <td align="center" style="padding: 40px 20px;">
              <table width="600" cellspacing="0" cellpadding="0" style="max-width: 600px; background-color: #050511; border-radius: 12px;">

                <tr>
                  <td style="background: linear-gradient(135deg, #720921 0%, #0a1628 100%); padding: 40px 30px; text-align: center;">
                    <h1 style="color: #d4af37; margin: 0; font-size: 28px; font-weight: 300; letter-spacing: 2px; text-transform: uppercase;">
                      Thank You For Your Purchase
                    </h1>
                    <p style="color: #94a3b8; margin: 10px 0 0 0; font-size: 14px;">
                      Your download is ready
                    </p>
                  </td>
                </tr>

                <tr>
                  <td style="padding: 40px 30px; border: 1px solid #d4af37; border-top: none;">

                    <p style="color: #f5f0ed; font-size: 18px; margin: 0 0 20px 0;">
                      Dear ${name},
                    </p>

                    <p style="color: #94a3b8; line-height: 1.8; margin: 0 0 30px 0;">
                      Your payment has been successfully processed. You now have instant access to:
                    </p>

                    <div style="background: linear-gradient(135deg, #1a0d11 0%, #0f0a0f 100%); padding: 25px; border-radius: 10px; margin: 0 0 30px 0; border: 1px solid #d4af37;">
                      <h2 style="color: #d4af37; margin: 0 0 15px 0; font-size: 20px; font-weight: 600;">
                        Sociopathic Dating Bible: A Cure For Empathy${isPremium ? ' (Premium Edition)' : ''}
                      </h2>
                      <p style="color: #94a3b8; margin: 0; font-size: 14px;">
                        70,000 words of strategic dating psychology from a diagnosed sociopath
                      </p>
                    </div>

                    <table width="100%" cellspacing="0" cellpadding="0" style="margin: 0 0 30px 0;">
                      <tr>
                        <td align="center">
                          <h3 style="color: #d4af37; margin: 0 0 20px 0; font-size: 16px;">
                            Choose Your Format
                          </h3>
                        </td>
                      </tr>
                      <tr>
                        <td align="center" style="padding-bottom: 15px;">
                          <a href="${pdfUrl}" style="display: inline-block; background: linear-gradient(135deg, #d4af37 0%, #b8941f 100%); color: #050511; padding: 18px 50px; text-decoration: none; border-radius: 50px; font-weight: 700; font-size: 16px; letter-spacing: 1px; text-transform: uppercase;">
                            📄 Download PDF
                          </a>
                        </td>
                      </tr>
                      <tr>
                        <td align="center">
                          <a href="${epubUrl}" style="display: inline-block; background: linear-gradient(135deg, #722139 0%, #4a1426 100%); color: #d4af37; padding: 18px 50px; text-decoration: none; border-radius: 50px; font-weight: 700; font-size: 16px; letter-spacing: 1px; text-transform: uppercase; border: 2px solid #d4af37;">
                            📱 Download EPUB
                          </a>
                        </td>
                      </tr>
                    </table>

                    <table width="100%" cellspacing="0" cellpadding="0" style="background: #0a0a0a; border-radius: 8px; margin: 0 0 25px 0; border: 1px solid #333; padding: 20px;">
                      <tr>
                        <td>
                          <h3 style="color: #d4af37; margin: 0 0 15px 0; font-size: 16px;">
                            Important Download Information
                          </h3>
                          <p style="color: #94a3b8; font-size: 14px; margin: 8px 0;">
                            ✓ Link expires: <strong style="color: #d4af37;">${formattedExpiry}</strong>
                          </p>
                          <p style="color: #94a3b8; font-size: 14px; margin: 8px 0;">
                            ✓ Maximum downloads: <strong style="color: #d4af37;">5 times total</strong> (across both formats)
                          </p>
                          <p style="color: #94a3b8; font-size: 14px; margin: 8px 0;">
                            ✓ Both PDF &amp; EPUB formats available
                          </p>
                          <p style="color: #94a3b8; font-size: 14px; margin: 8px 0;">
                            ✓ Save locally for permanent access
                          </p>
                        </td>
                      </tr>
                    </table>

                    ${premiumBonuses}

                    <p style="color: #d4af37; font-style: italic; margin-top: 30px; text-align: center;">
                      Embrace your power,<br>
                      <strong>Kanika Batra</strong><br>
                      <span style="color: #666; font-size: 12px;">The Beautiful Sociopath</span>
                    </p>

                    <div style="margin-top: 30px; padding: 20px; background: #1a0d11; border-radius: 8px; text-align: center;">
                      <p style="color: #94a3b8; margin: 0; font-size: 13px;">
                        Issues with your purchase? Contact <a href="mailto:Kanika@kanikarose.com" style="color: #d4af37; text-decoration: none;">Kanika@kanikarose.com</a>
                      </p>
                    </div>

                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `

    console.log('\n📧 Sending manual download link...')
    console.log('   To:', email)
    console.log('   Name:', name)
    console.log('   Type:', isPremium ? 'Premium Edition' : 'Standard Edition')

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: parseInt(process.env.SMTP_PORT || '587') === 465,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })

    await transporter.sendMail({
      from: `"Kanika Batra" <${process.env.SMTP_USER}>`,
      to: email,
      subject: `Download Your Book - Sociopathic Dating Bible${isPremium ? ' (Premium Edition)' : ''}`,
      html: html,
    })

    console.log('\n✅ SUCCESS! Email sent')
    console.log('\n📊 Download Links:')
    console.log('   PDF:', pdfUrl)
    console.log('   EPUB:', epubUrl)
    console.log('   Expires:', formattedExpiry)
    console.log('\n⚠️  Note: This token is NOT in the database, so download tracking will not work.')
    console.log('    The links will work but downloads won\'t be counted.\n')

  } catch (error) {
    console.error('\n❌ Error:', error.message)
    if (error.message.includes('SMTP') || error.message.includes('ECONNREFUSED')) {
      console.log('\n💡 SMTP not configured. Edit .env.local:')
      console.log('   SMTP_HOST=smtp.gmail.com')
      console.log('   SMTP_PORT=587')
      console.log('   SMTP_USER=your_email@gmail.com')
      console.log('   SMTP_PASS=your_app_password\n')
    }
  }
}

const email = process.argv[2]
const name = process.argv[3]
const isPremium = process.argv[4] === 'premium'

if (!email || !name) {
  console.log('\n📖 Usage: node send-manual-link.js <email> <name> [premium]')
  console.log('\nExamples:')
  console.log('   node send-manual-link.js customer@example.com "John Smith"')
  console.log('   node send-manual-link.js customer@example.com "Jane Doe" premium')
  console.log('\n⚠️  Warning: This bypasses the database and won\'t track downloads.\n')
  process.exit(0)
}

sendManualLink(email, name, isPremium)
