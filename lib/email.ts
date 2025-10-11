import nodemailer from 'nodemailer'
// Logger utility - simple console wrapper
const logger = {
  info: (message: string) => console.log(`[INFO] ${message}`),
  error: (message: string, error?: Error) => console.error(`[ERROR] ${message}`, error),
  warn: (message: string) => console.warn(`[WARN] ${message}`),
}

interface EmailOptions {
  to: string
  subject: string
  html: string
  text?: string
}

interface ContactFormData {
  name: string
  email: string
  subject: string
  message: string
}

interface OrderConfirmationData {
  customerEmail: string
  customerName: string
  orderNumber: string
  purchaseType: 'book' | 'coaching'
  amount: number
  itemName: string
  packageDetails?: {
    sessions?: number
    duration?: string
  }
}

// Email transporter configuration
const createTransporter = () => {
  const smtpHost = process.env.SMTP_HOST
  const smtpPort = process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT) : 587
  const smtpUser = process.env.SMTP_USER
  const smtpPass = process.env.SMTP_PASS

  if (!smtpHost || !smtpUser || !smtpPass) {
    logger.warn('Email configuration missing, emails will not be sent')
    return null
  }

  return nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: smtpPort === 465,
    auth: {
      user: smtpUser,
      pass: smtpPass,
    },
  })
}

// Send email function
export const sendEmail = async (options: EmailOptions): Promise<boolean> => {
  try {
    const transporter = createTransporter()

    if (!transporter) {
      logger.warn('Email not sent - no transporter configured')
      return false
    }

    const fromEmail = process.env.FROM_EMAIL || process.env.SMTP_USER || 'noreply@kanikabatra.com'

    const mailOptions = {
      from: `"Kanika Batra" <${fromEmail}>`,
      to: options.to,
      subject: options.subject,
      text: options.text || options.html.replace(/<[^>]*>/g, ''),
      html: options.html,
    }

    const info = await transporter.sendMail(mailOptions)
    logger.info(`Email sent successfully to ${options.to}: ${info.messageId}`)
    return true
  } catch (error) {
    logger.error('Failed to send email', error as Error)
    return false
  }
}

// Contact form notification
export const sendContactNotification = async (data: ContactFormData): Promise<boolean> => {
  const adminEmail = process.env.ADMIN_EMAIL || 'Kanika@kanikarose.com'

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: linear-gradient(135deg, #1a0d11 0%, #0a1628 100%); padding: 30px; border-radius: 10px 10px 0 0;">
        <h1 style="color: #d4af37; margin: 0; font-size: 24px;">New Contact Form Submission</h1>
      </div>
      <div style="background: #050511; padding: 30px; border: 1px solid #d4af37; border-top: none;">
        <h2 style="color: #f5f0ed; margin-top: 0;">Contact Details</h2>
        <div style="background: #0a0a0a; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
          <p style="color: #94a3b8; margin: 10px 0;"><strong style="color: #d4af37;">Name:</strong> ${data.name}</p>
          <p style="color: #94a3b8; margin: 10px 0;"><strong style="color: #d4af37;">Email:</strong> ${data.email}</p>
          <p style="color: #94a3b8; margin: 10px 0;"><strong style="color: #d4af37;">Subject:</strong> ${data.subject}</p>
        </div>
        <h3 style="color: #f5f0ed;">Message:</h3>
        <div style="background: #0a0a0a; padding: 20px; border-radius: 8px;">
          <p style="color: #94a3b8; line-height: 1.6; white-space: pre-wrap;">${data.message}</p>
        </div>
        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #333;">
          <p style="color: #666; font-size: 12px; margin: 0;">
            This email was sent from the contact form on kanikabatra.com
          </p>
        </div>
      </div>
    </div>
  `

  // Send to admin
  await sendEmail({
    to: adminEmail,
    subject: `[Contact Form] ${data.subject} - from ${data.name}`,
    html,
  })

  // Send confirmation to user
  const userHtml = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: linear-gradient(135deg, #1a0d11 0%, #0a1628 100%); padding: 30px; border-radius: 10px 10px 0 0;">
        <h1 style="color: #d4af37; margin: 0; font-size: 24px;">Message Received</h1>
      </div>
      <div style="background: #050511; padding: 30px; border: 1px solid #d4af37; border-top: none;">
        <p style="color: #f5f0ed; font-size: 16px; line-height: 1.6;">
          Dear ${data.name},
        </p>
        <p style="color: #94a3b8; line-height: 1.6;">
          Thank you for reaching out. I've received your message and will respond within 24-48 hours.
        </p>
        <p style="color: #94a3b8; line-height: 1.6;">
          If your inquiry is urgent, please mention "PRIORITY" in your next message.
        </p>
        <div style="background: #0a0a0a; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <p style="color: #666; margin: 5px 0;"><strong>Your Message:</strong></p>
          <p style="color: #94a3b8; white-space: pre-wrap;">${data.message.substring(0, 500)}${data.message.length > 500 ? '...' : ''}</p>
        </div>
        <p style="color: #d4af37; font-style: italic; margin-top: 30px;">
          - Kanika Batra<br>
          The Beautiful Sociopath
        </p>
      </div>
    </div>
  `

  return await sendEmail({
    to: data.email,
    subject: 'Message Received - Kanika Batra',
    html: userHtml,
  })
}

// Order confirmation email
export const sendOrderConfirmation = async (data: OrderConfirmationData): Promise<boolean> => {
  const isBook = data.purchaseType === 'book'

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: linear-gradient(135deg, #1a0d11 0%, #0a1628 100%); padding: 30px; border-radius: 10px 10px 0 0;">
        <h1 style="color: #d4af37; margin: 0; font-size: 24px;">Order Confirmation</h1>
      </div>
      <div style="background: #050511; padding: 30px; border: 1px solid #d4af37; border-top: none;">
        <p style="color: #f5f0ed; font-size: 16px; line-height: 1.6;">
          Dear ${data.customerName},
        </p>
        <p style="color: #94a3b8; line-height: 1.6;">
          Your payment has been successfully processed.
        </p>

        <div style="background: #0a0a0a; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #d4af37; margin-top: 0;">Order Details</h3>
          <p style="color: #94a3b8; margin: 10px 0;"><strong>Order ID:</strong> ${data.orderNumber}</p>
          <p style="color: #94a3b8; margin: 10px 0;"><strong>Item:</strong> ${data.itemName}</p>
          <p style="color: #94a3b8; margin: 10px 0;"><strong>Amount:</strong> $${data.amount.toFixed(2)}</p>
        </div>

        ${isBook ? `
          <div style="background: #1a0d11; padding: 20px; border-radius: 8px; margin: 20px 0; border: 1px solid #d4af37;">
            <h3 style="color: #d4af37; margin-top: 0;">📚 Your Book is Ready!</h3>
            <p style="color: #94a3b8; line-height: 1.6;">
              Your copy of "Sociopathic Dating Bible" will be sent to you in a separate email within the next 5 minutes.
            </p>
            <p style="color: #94a3b8; line-height: 1.6;">
              The download link will be valid for 30 days. Please save your copy locally.
            </p>
          </div>
        ` : `
          <div style="background: #1a0d11; padding: 20px; border-radius: 8px; margin: 20px 0; border: 1px solid #d4af37;">
            <h3 style="color: #d4af37; margin-top: 0;">🎯 Next Steps</h3>
            <p style="color: #94a3b8; line-height: 1.6;">
              You'll receive a separate email with instructions to schedule your coaching session.
            </p>
            <p style="color: #94a3b8; line-height: 1.6;">
              Please complete the pre-session questionnaire to make the most of our time together.
            </p>
          </div>
        `}

        <div style="margin-top: 30px; padding: 20px; background: #0a0a0a; border-radius: 8px;">
          <h3 style="color: #d4af37; margin-top: 0;">Need Help?</h3>
          <p style="color: #94a3b8;">
            If you have any questions or issues, please reply to this email or contact us at:
            <br><a href="mailto:support@kanikabatra.com" style="color: #d4af37;">support@kanikabatra.com</a>
          </p>
        </div>

        <p style="color: #d4af37; font-style: italic; margin-top: 30px;">
          Welcome to the dark side,<br>
          Kanika Batra
        </p>
      </div>
    </div>
  `

  return await sendEmail({
    to: data.customerEmail,
    subject: `Order Confirmation #${data.orderNumber} - Kanika Batra`,
    html,
  })
}

// Book delivery email
export const sendBookDelivery = async (
  customerEmail: string,
  customerName: string,
  downloadToken: string,
  variant: string | null,
  expiresAt: Date
): Promise<boolean> => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://kanikabatra.com'
  const pdfDownloadUrl = `${baseUrl}/api/download?token=${downloadToken}&format=pdf`
  const epubDownloadUrl = `${baseUrl}/api/download?token=${downloadToken}&format=epub`
  const isPremium = variant === 'PREMIUM'
  const bookTitle = isPremium
    ? 'Sociopathic Dating Bible: A Cure For Empathy (Premium Edition)'
    : 'Sociopathic Dating Bible: A Cure For Empathy'

  const premiumBonuses = isPremium ? `
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
  ` : ''

  const expiryDate = new Date(expiresAt).toLocaleDateString('en-US', {
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
                    Dear ${customerName},
                  </p>

                  <p style="color: #94a3b8; line-height: 1.8; margin: 0 0 30px 0; font-size: 15px;">
                    Your payment has been successfully processed. You now have instant access to:
                  </p>

                  <div style="background: linear-gradient(135deg, #1a0d11 0%, #0f0a0f 100%); padding: 25px; border-radius: 10px; margin: 0 0 30px 0; border: 1px solid #d4af37;">
                    <h2 style="color: #d4af37; margin: 0 0 15px 0; font-size: 20px; font-weight: 600;">
                      ${bookTitle}
                    </h2>
                    <p style="color: #94a3b8; margin: 0; font-size: 14px; line-height: 1.6;">
                      70,000 words of strategic dating psychology from a diagnosed sociopath
                    </p>
                  </div>

                  <!-- Download Buttons -->
                  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin: 0 0 30px 0;">
                    <tr>
                      <td align="center">
                        <h3 style="color: #d4af37; margin: 0 0 10px 0; font-size: 18px; font-weight: 700; text-transform: uppercase; letter-spacing: 2px;">
                          Download Your Book
                        </h3>
                        <p style="color: #94a3b8; margin: 0 0 25px 0; font-size: 13px; font-style: italic;">
                          EPUB format is recommended for the best mobile reading experience
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td align="center" style="padding-bottom: 20px;">
                        <a href="${epubDownloadUrl}" style="display: inline-block; background-color: #d4af37; color: #050511; padding: 22px 60px; text-decoration: none; font-weight: 700; font-size: 18px; letter-spacing: 1.5px; text-transform: uppercase; mso-padding-alt: 22px 60px;">
                          📱 Download EPUB (Recommended)
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td align="right" style="padding: 0 20px 0 0;">
                        <a href="${pdfDownloadUrl}" style="display: inline-block; background-color: #1a1a1a; color: #94a3b8; padding: 8px 16px; text-decoration: none; font-weight: 500; font-size: 11px; letter-spacing: 0.5px; border: 1px solid #333; mso-padding-alt: 8px 16px;">
                          📄 PDF Version
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

                  ${premiumBonuses}

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

  return await sendEmail({
    to: customerEmail,
    subject: `Download Your Book - Sociopathic Dating Bible ${isPremium ? '(Premium Edition)' : ''}`,
    html,
  })
}

// Coaching questionnaire submission
export const sendCoachingQuestionnaire = async (data: {
  packageName: string
  customerName: string
  customerEmail: string
  orderId: string
  questionnaire: {
    preferredName: string
    age: string
    timezone: string
    availability: string[]
    urgency: string
    currentSituation: string
    primaryChallenges: string
    previousTherapy: string
    mentalHealthHistory: string
    currentMedication: string
    suicidalThoughts: string
    substanceUse: string
    traumaHistory: string
    specificGoals: string
    successMeasures: string
    psychologyInterest: string
    manipulationExperience: string
    timeCommitment: string
    expectations: string
    ethicalUse: string
    additionalInfo?: string
  }
}): Promise<boolean> => {
  const adminEmail = process.env.ADMIN_EMAIL || 'Kanika@kanikarose.com'

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto;">
      <div style="background: linear-gradient(135deg, #1a0d11 0%, #0a1628 100%); padding: 30px; border-radius: 10px 10px 0 0;">
        <h1 style="color: #d4af37; margin: 0; font-size: 24px;">New Coaching Questionnaire Submitted</h1>
      </div>
      <div style="background: #050511; padding: 30px; border: 1px solid #d4af37; border-top: none;">

        <div style="background: #0a0a0a; padding: 20px; border-radius: 8px; margin-bottom: 30px;">
          <h2 style="color: #d4af37; margin-top: 0;">Client Overview</h2>
          <p style="color: #94a3b8; margin: 10px 0;"><strong style="color: #d4af37;">Name:</strong> ${data.customerName}</p>
          <p style="color: #94a3b8; margin: 10px 0;"><strong style="color: #d4af37;">Email:</strong> ${data.customerEmail}</p>
          <p style="color: #94a3b8; margin: 10px 0;"><strong style="color: #d4af37;">Package:</strong> ${data.packageName}</p>
          <p style="color: #94a3b8; margin: 10px 0;"><strong style="color: #d4af37;">Order ID:</strong> ${data.orderId}</p>
          <p style="color: #94a3b8; margin: 10px 0;"><strong style="color: #d4af37;">Urgency:</strong> ${data.questionnaire.urgency}</p>
        </div>

        <div style="background: #0a0a0a; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
          <h3 style="color: #d4af37; margin-top: 0;">Basic Information</h3>
          <p style="color: #94a3b8;"><strong>Preferred Name:</strong> ${data.questionnaire.preferredName}</p>
          <p style="color: #94a3b8;"><strong>Age:</strong> ${data.questionnaire.age}</p>
          <p style="color: #94a3b8;"><strong>Timezone:</strong> ${data.questionnaire.timezone}</p>
          <p style="color: #94a3b8;"><strong>Available Times:</strong> ${data.questionnaire.availability.join(', ')}</p>
        </div>

        <div style="background: #0a0a0a; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
          <h3 style="color: #d4af37; margin-top: 0;">Current Situation & Challenges</h3>
          <div style="margin-bottom: 15px;">
            <strong style="color: #d4af37;">Current Situation:</strong>
            <p style="color: #94a3b8; margin: 5px 0; padding: 10px; background: #1a1a1a; border-radius: 4px;">${data.questionnaire.currentSituation}</p>
          </div>
          <div style="margin-bottom: 15px;">
            <strong style="color: #d4af37;">Primary Challenges:</strong>
            <p style="color: #94a3b8; margin: 5px 0; padding: 10px; background: #1a1a1a; border-radius: 4px;">${data.questionnaire.primaryChallenges}</p>
          </div>
          <div>
            <strong style="color: #d4af37;">Previous Therapy/Coaching:</strong>
            <p style="color: #94a3b8; margin: 5px 0; padding: 10px; background: #1a1a1a; border-radius: 4px;">${data.questionnaire.previousTherapy}</p>
          </div>
        </div>

        ${data.questionnaire.suicidalThoughts !== 'Never' || data.questionnaire.traumaHistory !== 'None' ? `
        <div style="background: #2d1b1b; padding: 20px; border-radius: 8px; margin-bottom: 20px; border: 1px solid #8b0000;">
          <h3 style="color: #ff6b6b; margin-top: 0;">⚠️ Mental Health Screening - ATTENTION REQUIRED</h3>
          <p style="color: #ffccd5;"><strong>Mental Health History:</strong> ${data.questionnaire.mentalHealthHistory}</p>
          <p style="color: #ffccd5;"><strong>Current Medication:</strong> ${data.questionnaire.currentMedication}</p>
          <p style="color: #ffccd5;"><strong>Suicidal Thoughts:</strong> <span style="color: ${data.questionnaire.suicidalThoughts === 'Currently' ? '#ff4757' : '#ff6b6b'};">${data.questionnaire.suicidalThoughts}</span></p>
          <p style="color: #ffccd5;"><strong>Substance Use:</strong> ${data.questionnaire.substanceUse}</p>
          <p style="color: #ffccd5;"><strong>Trauma History:</strong> ${data.questionnaire.traumaHistory}</p>
        </div>
        ` : `
        <div style="background: #0a0a0a; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
          <h3 style="color: #d4af37; margin-top: 0;">Mental Health Screening</h3>
          <p style="color: #94a3b8;"><strong>Mental Health History:</strong> ${data.questionnaire.mentalHealthHistory}</p>
          <p style="color: #94a3b8;"><strong>Current Medication:</strong> ${data.questionnaire.currentMedication}</p>
          <p style="color: #94a3b8;"><strong>Suicidal Thoughts:</strong> ${data.questionnaire.suicidalThoughts}</p>
          <p style="color: #94a3b8;"><strong>Substance Use:</strong> ${data.questionnaire.substanceUse}</p>
          <p style="color: #94a3b8;"><strong>Trauma History:</strong> ${data.questionnaire.traumaHistory}</p>
        </div>
        `}

        <div style="background: #0a0a0a; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
          <h3 style="color: #d4af37; margin-top: 0;">Goals & Psychology Interest</h3>
          <div style="margin-bottom: 15px;">
            <strong style="color: #d4af37;">Specific Goals:</strong>
            <p style="color: #94a3b8; margin: 5px 0; padding: 10px; background: #1a1a1a; border-radius: 4px;">${data.questionnaire.specificGoals}</p>
          </div>
          <div style="margin-bottom: 15px;">
            <strong style="color: #d4af37;">Success Measures:</strong>
            <p style="color: #94a3b8; margin: 5px 0; padding: 10px; background: #1a1a1a; border-radius: 4px;">${data.questionnaire.successMeasures}</p>
          </div>
          <div style="margin-bottom: 15px;">
            <strong style="color: #d4af37;">Dark Psychology Interest:</strong>
            <p style="color: #94a3b8; margin: 5px 0; padding: 10px; background: #1a1a1a; border-radius: 4px;">${data.questionnaire.psychologyInterest}</p>
          </div>
          <div>
            <strong style="color: #d4af37;">Manipulation Experience:</strong>
            <p style="color: #94a3b8; margin: 5px 0; padding: 10px; background: #1a1a1a; border-radius: 4px;">${data.questionnaire.manipulationExperience}</p>
          </div>
        </div>

        <div style="background: #0a0a0a; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
          <h3 style="color: #d4af37; margin-top: 0;">Expectations & Commitment</h3>
          <p style="color: #94a3b8;"><strong>Time Commitment:</strong> ${data.questionnaire.timeCommitment}</p>
          <div style="margin: 15px 0;">
            <strong style="color: #d4af37;">Expectations from You:</strong>
            <p style="color: #94a3b8; margin: 5px 0; padding: 10px; background: #1a1a1a; border-radius: 4px;">${data.questionnaire.expectations}</p>
          </div>
          <div>
            <strong style="color: #d4af37;">Ethical Use Commitment:</strong>
            <p style="color: #94a3b8; margin: 5px 0; padding: 10px; background: #1a1a1a; border-radius: 4px;">${data.questionnaire.ethicalUse}</p>
          </div>
        </div>

        ${data.questionnaire.additionalInfo ? `
        <div style="background: #0a0a0a; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
          <h3 style="color: #d4af37; margin-top: 0;">Additional Information</h3>
          <p style="color: #94a3b8; padding: 10px; background: #1a1a1a; border-radius: 4px;">${data.questionnaire.additionalInfo}</p>
        </div>
        ` : ''}

        <div style="background: #1a0d11; padding: 20px; border-radius: 8px; border: 1px solid #d4af37;">
          <h3 style="color: #d4af37; margin-top: 0;">Next Steps</h3>
          <p style="color: #94a3b8;">
            1. Review the client's mental health screening carefully<br>
            2. Send scheduling link for their ${data.packageName} session<br>
            3. Consider any special preparation based on their responses<br>
            4. ${data.questionnaire.urgency === 'ASAP' ? '<strong style="color: #ff6b6b;">Priority scheduling requested</strong>' : 'Standard scheduling timeline'}
          </p>
        </div>

        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #333;">
          <p style="color: #666; font-size: 12px; margin: 0;">
            Questionnaire submitted: ${new Date().toLocaleString()}<br>
            This is an automated notification from the coaching booking system.
          </p>
        </div>
      </div>
    </div>
  `

  return await sendEmail({
    to: adminEmail,
    subject: `🎯 New ${data.packageName} Questionnaire - ${data.customerName} [${data.questionnaire.urgency}]`,
    html,
  })
}

// Coaching session scheduling email
export const sendCoachingScheduling = async (
  customerEmail: string,
  customerName: string,
  packageName: string,
  schedulingUrl: string
): Promise<boolean> => {
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: linear-gradient(135deg, #720921 0%, #6366f1 100%); padding: 30px; border-radius: 10px 10px 0 0;">
        <h1 style="color: #d4af37; margin: 0; font-size: 24px;">🎯 Schedule Your Transformation</h1>
      </div>
      <div style="background: #050511; padding: 30px; border: 1px solid #d4af37; border-top: none;">
        <p style="color: #f5f0ed; font-size: 16px; line-height: 1.6;">
          ${customerName},
        </p>
        <p style="color: #94a3b8; line-height: 1.6;">
          Your <strong style="color: #d4af37;">${packageName}</strong> session is ready to be scheduled.
        </p>

        <div style="text-align: center; margin: 30px 0;">
          <a href="${schedulingUrl}" style="display: inline-block; background: linear-gradient(135deg, #d4af37, #b8941f); color: #050511; padding: 15px 40px; text-decoration: none; border-radius: 30px; font-weight: bold; font-size: 16px;">
            Schedule Your Session
          </a>
        </div>

        <div style="background: #0a0a0a; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #d4af37; margin-top: 0;">📋 Pre-Session Preparation</h3>
          <p style="color: #94a3b8; line-height: 1.6;">
            To maximize our time together, please:
          </p>
          <ul style="color: #94a3b8; line-height: 1.8;">
            <li>Complete the attached questionnaire</li>
            <li>Prepare specific situations you want to discuss</li>
            <li>Be ready to confront uncomfortable truths</li>
            <li>Come with an open mind to transformation</li>
          </ul>
        </div>

        <div style="background: #1a0d11; padding: 20px; border-radius: 8px; margin: 20px 0; border: 1px solid #720921;">
          <h3 style="color: #d4af37; margin-top: 0;">Session Guidelines</h3>
          <ul style="color: #94a3b8; line-height: 1.8;">
            <li><strong>Duration:</strong> 90 minutes of focused transformation</li>
            <li><strong>Format:</strong> One-on-one video session</li>
            <li><strong>Rescheduling:</strong> 24 hours notice required</li>
            <li><strong>Recording:</strong> Sessions can be recorded for your review</li>
          </ul>
        </div>

        <div style="margin-top: 30px; padding: 20px; background: #0a0a0a; border-radius: 8px;">
          <p style="color: #94a3b8; font-style: italic; text-align: center;">
            "I don't teach you to hide your darkness—I teach you to weaponize it."
          </p>
        </div>

        <p style="color: #d4af37; font-style: italic; margin-top: 30px;">
          Ready to transform,<br>
          Kanika Batra<br>
          <span style="color: #666; font-size: 12px;">Master of Manipulation</span>
        </p>
      </div>
    </div>
  `

  return await sendEmail({
    to: customerEmail,
    subject: `🎯 Schedule Your ${packageName} Session - Kanika Batra`,
    html,
  })
}