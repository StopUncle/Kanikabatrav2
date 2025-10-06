/**
 * Test the actual book delivery email template
 */

require('dotenv').config({ path: '.env' })

async function testBookEmail() {
  // Import the email function
  const { sendBookDelivery } = require('./lib/email')

  console.log('\n📧 Sending test book delivery email...\n')

  // Test data
  const testDownloadUrl = 'https://kanikabatra.com/api/download?token=test-token-12345'
  const expiresAt = new Date()
  expiresAt.setHours(expiresAt.getHours() + 24)

  try {
    // Send Premium version email
    console.log('Sending Premium Edition email to:', process.env.ADMIN_EMAIL)
    await sendBookDelivery(
      process.env.ADMIN_EMAIL,
      'Kanika', // Your name
      testDownloadUrl,
      'PREMIUM', // Premium edition
      expiresAt
    )

    console.log('\n✅ Premium Edition email sent successfully!')
    console.log('\nCheck your inbox at:', process.env.ADMIN_EMAIL)
    console.log('Subject: 📚 Download Your Book - Sociopathic Dating Bible (Premium Edition)')
    console.log('\nThis is the ACTUAL email customers will receive!\n')

  } catch (error) {
    console.error('\n❌ Error sending email:', error.message)
  }
}

testBookEmail()
