/**
 * Manual Book Download Link Sender
 *
 * Use this to manually send download links to customers who:
 * - Didn't receive their email
 * - Expired link
 * - Need a fresh link
 *
 * Usage: node send-download-link.js <email> [customer-name]
 */

require('dotenv').config({ path: '.env.local' })
const { PrismaClient } = require('@prisma/client')
const nodemailer = require('nodemailer')
const crypto = require('crypto')

const prisma = new PrismaClient()

async function sendFreshDownloadLink(customerEmail, customerName) {
  try {
    console.log('\n🔍 Looking up purchase for:', customerEmail)

    // Find the most recent book purchase for this email
    const purchase = await prisma.purchase.findFirst({
      where: {
        customerEmail: customerEmail,
        type: 'BOOK',
        status: 'COMPLETED',
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    if (!purchase) {
      console.error('❌ No completed book purchase found for:', customerEmail)
      console.log('\nTip: Make sure the email matches exactly what they used for purchase')
      process.exit(1)
    }

    console.log('✅ Found purchase:', {
      id: purchase.id,
      variant: purchase.productVariant || 'Standard',
      amount: `$${purchase.amount}`,
      date: purchase.createdAt.toLocaleDateString(),
      downloads: `${purchase.downloadCount}/${purchase.maxDownloads}`
    })

    // Generate new download token and extend expiry
    const newToken = crypto.randomBytes(32).toString('hex')
    const newExpiry = new Date()
    newExpiry.setDate(newExpiry.getDate() + 30)

    // Update purchase with new token and expiry
    await prisma.purchase.update({
      where: { id: purchase.id },
      data: {
        downloadToken: newToken,
        expiresAt: newExpiry,
        // Optionally reset download count (uncomment if you want to give them fresh downloads)
        // downloadCount: 0,
      }
    })

    console.log('✅ Generated new download token (expires:', newExpiry.toLocaleDateString(), ')')

    // Build email
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://kanikabatra.com'
    const pdfUrl = `${baseUrl}/api/download?token=${newToken}&format=pdf`
    const epubUrl = `${baseUrl}/api/download?token=${newToken}&format=epub`
    const name = customerName || purchase.customerName || 'Customer'
    const isPremium = purchase.productVariant === 'PREMIUM'

    const expiryDate = newExpiry.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    })

    const premiumBonuses = isPremium ? `
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background: linear-gradient(135deg, #1a0d11 0%, #2a1a1f 100%); border-radius: 10px; margin: 0 0 25px 0; border: 2px solid #d4af37;">
        <tr>
          <td style="padding: 25px;">
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

                <!-- Header -->
                <tr>
                  <td style="background: linear-gradient(135deg, #720921 0%, #0a1628 100%); padding: 40px 30px; text-align: center;">
                    <h1 style="color: #d4af37; margin: 0; font-size: 28px; font-weight: 300; letter-spacing: 2px;">
                      YOUR DOWNLOAD LINK
                    </h1>
                    <p style="color: #94a3b8; margin: 10px 0 0 0; font-size: 14px;">
                      Fresh link - expires ${expiryDate}
                    </p>
                  </td>
                </tr>

                <!-- Content -->
                <tr>
                  <td style="padding: 40px 30px; border: 1px solid #d4af37; border-top: none;">

                    <p style="color: #f5f0ed; font-size: 18px; margin: 0 0 20px 0;">
                      ${name},
                    </p>

                    <p style="color: #94a3b8; line-height: 1.8; margin: 0 0 30px 0;">
                      Here's your fresh download link for <strong style="color: #d4af37;">Sociopathic Dating Bible${isPremium ? ' (Premium Edition)' : ''}</strong>.
                    </p>

                    <!-- Download Buttons -->
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

                    <!-- Important Info -->
                    <table width="100%" cellspacing="0" cellpadding="0" style="background: #0a0a0a; border-radius: 8px; margin: 0 0 25px 0; border: 1px solid #333; padding: 20px;">
                      <tr>
                        <td>
                          <h3 style="color: #d4af37; margin: 0 0 15px 0; font-size: 16px;">
                            Important Information
                          </h3>
                          <p style="color: #94a3b8; font-size: 14px; margin: 8px 0;">
                            ✓ Link expires: <strong style="color: #d4af37;">${expiryDate}</strong>
                          </p>
                          <p style="color: #94a3b8; font-size: 14px; margin: 8px 0;">
                            ✓ Downloads used: <strong style="color: #d4af37;">${purchase.downloadCount}/${purchase.maxDownloads}</strong>
                          </p>
                          <p style="color: #94a3b8; font-size: 14px; margin: 8px 0;">
                            ✓ Save the file locally for permanent access
                          </p>
                        </td>
                      </tr>
                    </table>

                    ${premiumBonuses}

                    <p style="color: #d4af37; font-style: italic; margin-top: 30px; text-align: center;">
                      Embrace your power,<br>
                      <strong>Kanika Batra</strong>
                    </p>

                    <div style="margin-top: 30px; padding: 20px; background: #1a0d11; border-radius: 8px; text-align: center;">
                      <p style="color: #94a3b8; margin: 0; font-size: 13px;">
                        Issues? Contact <a href="mailto:Kanika@kanikarose.com" style="color: #d4af37;">Kanika@kanikarose.com</a>
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

    // Send email
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
      to: customerEmail,
      subject: `Your Book Download Link - Sociopathic Dating Bible${isPremium ? ' (Premium)' : ''}`,
      html: html,
    })

    console.log('\n✅ SUCCESS! Email sent to:', customerEmail)
    console.log('\n📊 Link Details:')
    console.log('   PDF:', pdfUrl)
    console.log('   EPUB:', epubUrl)
    console.log('   Expires:', expiryDate)
    console.log('   Downloads:', `${purchase.downloadCount}/${purchase.maxDownloads}`)
    console.log('\n💡 Tip: Customer can download each format multiple times (5 total across both)\n')

  } catch (error) {
    console.error('\n❌ Error:', error.message)
    if (error.message.includes('SMTP')) {
      console.log('\n💡 SMTP not configured. Configure in .env.local:')
      console.log('   SMTP_HOST=smtp.gmail.com')
      console.log('   SMTP_PORT=587')
      console.log('   SMTP_USER=your_email@gmail.com')
      console.log('   SMTP_PASS=your_app_password\n')
    }
  } finally {
    await prisma.$disconnect()
  }
}

// Get email from command line
const customerEmail = process.argv[2]
const customerName = process.argv[3]

if (!customerEmail) {
  console.log('\n📖 Usage: node send-download-link.js <email> [name]')
  console.log('\nExamples:')
  console.log('   node send-download-link.js customer@example.com')
  console.log('   node send-download-link.js customer@example.com "John Smith"')
  console.log('\nThis will:')
  console.log('   ✓ Find their purchase')
  console.log('   ✓ Generate a fresh 30-day download token')
  console.log('   ✓ Send them an email with PDF & EPUB links')
  console.log('   ✓ Show current download count\n')
  process.exit(0)
}

sendFreshDownloadLink(customerEmail, customerName)
