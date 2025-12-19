import nodemailer from 'nodemailer'
import * as dotenv from 'dotenv'

// Load .env file
dotenv.config()

async function testEmail() {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '587', 10),
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  })

  console.log('Testing email with:')
  console.log('  Host:', process.env.SMTP_HOST)
  console.log('  User:', process.env.SMTP_USER)
  console.log('  From:', process.env.FROM_EMAIL)

  try {
    const info = await transporter.sendMail({
      from: process.env.FROM_EMAIL || 'test@test.com',
      to: 'sdmatheson@outlook.com',
      subject: 'Test Email from Kanika Batra Website',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0a0a0a; padding: 30px; border-radius: 10px;">
          <h1 style="color: #d4af37; margin: 0 0 20px;">Email Test Successful!</h1>
          <p style="color: #f5f0ed;">This is a test email from the Kanika Batra website using Gmail SMTP to an Outlook address.</p>
          <p style="color: #94a3b8;">If you received this, nodemailer is working correctly for Microsoft email addresses.</p>
          <p style="color: #d4af37; margin-top: 30px;">- Kanika Batra</p>
        </div>
      `,
    })

    console.log('✅ Email sent successfully!')
    console.log('Message ID:', info.messageId)
  } catch (error) {
    console.error('❌ Failed to send email:', error)
  }
}

testEmail()
