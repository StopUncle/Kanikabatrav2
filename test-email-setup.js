/**
 * Email Configuration Test Script
 * Tests SMTP connection and email sending functionality
 */

require('dotenv').config({ path: '.env' })
const nodemailer = require('nodemailer')

const COLORS = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m'
}

function log(msg, color = 'reset') {
  console.log(`${COLORS[color]}${msg}${COLORS.reset}`)
}

function logSection(title) {
  console.log('\n' + '='.repeat(60))
  log(title, 'cyan')
  console.log('='.repeat(60) + '\n')
}

function logSuccess(msg) {
  log(`✅ ${msg}`, 'green')
}

function logError(msg) {
  log(`❌ ${msg}`, 'red')
}

function logWarning(msg) {
  log(`⚠️  ${msg}`, 'yellow')
}

function logInfo(msg) {
  log(`ℹ️  ${msg}`, 'blue')
}

async function testEmailSetup() {
  logSection('EMAIL CONFIGURATION TEST')

  const results = {
    passed: 0,
    failed: 0,
    warnings: 0
  }

  // Test 1: Check environment variables
  logSection('Test 1: Environment Variables')

  const requiredVars = [
    { name: 'SMTP_HOST', value: process.env.SMTP_HOST },
    { name: 'SMTP_PORT', value: process.env.SMTP_PORT },
    { name: 'SMTP_USER', value: process.env.SMTP_USER },
    { name: 'SMTP_PASS', value: process.env.SMTP_PASS },
    { name: 'FROM_EMAIL', value: process.env.FROM_EMAIL },
    { name: 'ADMIN_EMAIL', value: process.env.ADMIN_EMAIL }
  ]

  let allConfigured = true
  for (const { name, value } of requiredVars) {
    if (!value || value.includes('your-') || value.includes('replace-me')) {
      logError(`${name} is not configured`)
      allConfigured = false
      results.failed++
    } else {
      logSuccess(`${name}: ${name.includes('PASS') ? '****** (hidden)' : value}`)
      results.passed++
    }
  }

  if (!allConfigured) {
    logError('\nPlease configure all email variables in .env file')
    logInfo('\nTo generate Gmail App Password:')
    logInfo('1. Go to https://myaccount.google.com/apppasswords')
    logInfo('2. Select Mail → Other → Type "Kanika Website"')
    logInfo('3. Click Generate and copy the 16-character password')
    logInfo('4. Update SMTP_PASS in .env file')
    return
  }

  // Test 2: SMTP Connection
  logSection('Test 2: SMTP Connection')

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })

    logInfo('Connecting to SMTP server...')
    await transporter.verify()
    logSuccess('SMTP connection successful!')
    results.passed++

  } catch (error) {
    logError('SMTP connection failed')
    logError(`Error: ${error.message}`)
    results.failed++

    if (error.message.includes('Invalid login')) {
      logWarning('\nThis usually means:')
      logInfo('1. You are using your regular Gmail password (wrong!)')
      logInfo('2. You need to use an App Password instead')
      logInfo('3. Generate one at: https://myaccount.google.com/apppasswords')
    }

    return
  }

  // Test 3: Send Test Email to Admin
  logSection('Test 3: Send Test Email')

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })

    const testEmailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #720921 0%, #0a1628 100%); padding: 30px; border-radius: 10px 10px 0 0;">
          <h1 style="color: #d4af37; margin: 0; font-size: 24px;">✅ Email Test Successful!</h1>
        </div>
        <div style="background: #050511; padding: 30px; border: 1px solid #d4af37; border-top: none;">
          <p style="color: #f5f0ed; font-size: 16px; line-height: 1.6;">
            Congratulations!
          </p>
          <p style="color: #94a3b8; line-height: 1.6;">
            Your email system is configured correctly and ready to send:
          </p>

          <div style="background: #0a0a0a; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #d4af37; margin-top: 0;">Email Configuration:</h3>
            <p style="color: #94a3b8; margin: 10px 0;"><strong style="color: #d4af37;">SMTP Host:</strong> ${process.env.SMTP_HOST}</p>
            <p style="color: #94a3b8; margin: 10px 0;"><strong style="color: #d4af37;">Sending From:</strong> ${process.env.FROM_EMAIL}</p>
            <p style="color: #94a3b8; margin: 10px 0;"><strong style="color: #d4af37;">Admin Email:</strong> ${process.env.ADMIN_EMAIL}</p>
          </div>

          <div style="background: #1a0d11; padding: 20px; border-radius: 8px; margin: 20px 0; border: 1px solid #d4af37;">
            <h3 style="color: #d4af37; margin-top: 0;">✅ What This Means:</h3>
            <ul style="color: #94a3b8; line-height: 1.8;">
              <li>Book purchase emails will be sent successfully</li>
              <li>Download links will reach customers automatically</li>
              <li>Contact form submissions will arrive in your inbox</li>
              <li>Payment confirmations will be delivered</li>
            </ul>
          </div>

          <p style="color: #d4af37; font-style: italic; margin-top: 30px;">
            Your email system is production-ready! 🎉<br>
            <span style="color: #666; font-size: 12px;">Kanika Batra - Sociopathic Dating Bible</span>
          </p>
        </div>
      </div>
    `

    logInfo(`Sending test email to ${process.env.ADMIN_EMAIL}...`)

    const info = await transporter.sendMail({
      from: process.env.FROM_EMAIL,
      to: process.env.ADMIN_EMAIL,
      subject: '✅ Email System Test - Kanika Batra Website',
      html: testEmailHtml,
    })

    logSuccess('Test email sent successfully!')
    logInfo(`Message ID: ${info.messageId}`)
    logInfo(`Check your inbox at: ${process.env.ADMIN_EMAIL}`)
    results.passed++

  } catch (error) {
    logError('Failed to send test email')
    logError(`Error: ${error.message}`)
    results.failed++
  }

  // Test 4: Simulate Book Purchase Email
  logSection('Test 4: Book Purchase Email Preview')

  const downloadUrl = `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/download?token=test123`
  const expiryDate = new Date()
  expiryDate.setHours(expiryDate.getHours() + 24)

  logInfo('This is what customers will receive after purchasing:')
  console.log('\n' + '─'.repeat(60))
  log('FROM:', 'bright')
  console.log(`  ${process.env.FROM_EMAIL}`)
  log('\nTO:', 'bright')
  console.log('  customer@email.com')
  log('\nSUBJECT:', 'bright')
  console.log('  📚 Download Your Book - Sociopathic Dating Bible (Premium Edition)')
  log('\nCONTENT:', 'bright')
  console.log('  • Personalized greeting with customer name')
  console.log('  • Download button with secure link')
  console.log(`  • Link expires: ${expiryDate.toLocaleDateString()}`)
  console.log('  • Max 5 downloads allowed')
  console.log('  • Premium bonuses listed (if Premium edition)')
  console.log('─'.repeat(60))

  // Summary
  logSection('TEST SUMMARY')

  const total = results.passed + results.failed
  const passRate = ((results.passed / total) * 100).toFixed(1)

  log(`Total Tests: ${total}`, 'bright')
  logSuccess(`Passed: ${results.passed}`)
  if (results.failed > 0) {
    logError(`Failed: ${results.failed}`)
  }
  log(`Pass Rate: ${passRate}%`, passRate >= 90 ? 'green' : 'red')

  if (passRate >= 90) {
    logSection('🎉 SUCCESS!')
    logSuccess('Your email system is fully operational and production-ready!')
    console.log('\n✅ You can now:')
    console.log('  • Accept real book purchases')
    console.log('  • Customers will receive download links automatically')
    console.log('  • Contact forms will reach your inbox')
    console.log('\n📧 Check your email at:', process.env.ADMIN_EMAIL)
    console.log('   You should have received a test email just now!\n')
  } else {
    logSection('⚠️  ACTION REQUIRED')
    logError('Email system needs configuration')
    console.log('\nPlease fix the failed tests above before going live.\n')
  }
}

// Run the test
async function main() {
  log('\n🧪 EMAIL SYSTEM TEST SUITE', 'bright')
  log('Testing email configuration and delivery\n', 'cyan')

  try {
    await testEmailSetup()
  } catch (error) {
    logError(`Fatal error: ${error.message}`)
    console.error(error)
    process.exit(1)
  }
}

main()
