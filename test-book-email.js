/**
 * Test the actual book delivery email template
 */

require('dotenv').config({ path: '.env' })

async function testBookEmail() {
  // Import the email function
  const { sendBookDelivery } = require('./lib/email')

  console.log('\n📧 Sending test book delivery email...\n')

  // Test data
  const testDownloadToken = 'test-token-12345-abc-def-ghi'
  const testEmail = 'sdmatheson@outlook.com'
  const expiresAt = new Date()
  expiresAt.setDate(expiresAt.getDate() + 30)

  try {
    // Send Premium version email with both PDF and EPUB download links
    console.log('Sending Premium Edition email to:', testEmail)
    await sendBookDelivery(
      testEmail,
      'Test User',
      testDownloadToken,
      'PREMIUM', // Premium edition
      expiresAt
    )

    console.log('\n✅ Premium Edition email sent successfully!')
    console.log('\nCheck your inbox at:', testEmail)
    console.log('Subject: Download Your Book - Sociopathic Dating Bible (Premium Edition)')
    console.log('\nThis email includes both PDF and EPUB download buttons!')
    console.log('Note: Links will show "file not found" - this is just a test token\n')

  } catch (error) {
    console.error('\n❌ Error sending email:', error.message)
  }
}

testBookEmail()
