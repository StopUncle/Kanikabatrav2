import { NextRequest, NextResponse } from 'next/server'
import { sendContactNotification } from '@/lib/email'

interface ContactFormData {
  name: string
  email: string
  subject: string
  message: string
}

export async function POST(request: NextRequest) {
  try {
    const body: ContactFormData = await request.json()

    // Validate input
    if (!body.name || !body.email || !body.subject || !body.message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Validate subject - allow empty string as it means "Select a subject"
    const validSubjects = ['', 'coaching', 'book', 'media', 'collaboration', 'other']
    if (body.subject && !validSubjects.includes(body.subject)) {
      return NextResponse.json(
        { error: 'Invalid subject' },
        { status: 400 }
      )
    }

    // If subject is empty, set it to 'other'
    if (!body.subject || body.subject === '') {
      body.subject = 'other'
    }

    // Basic spam protection
    if (body.message.length < 10) {
      return NextResponse.json(
        { error: 'Message too short' },
        { status: 400 }
      )
    }

    if (body.message.length > 5000) {
      return NextResponse.json(
        { error: 'Message too long' },
        { status: 400 }
      )
    }

    // In a real application, you would:
    // 1. Save to database
    // 2. Send email notification
    // 3. Add to CRM system
    // 4. Implement rate limiting

    // For now, we'll just log the contact request
    console.log('Contact form submission:', {
      name: body.name,
      email: body.email,
      subject: body.subject,
      message: body.message.substring(0, 100) + '...',
      timestamp: new Date().toISOString(),
      ip: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown'
    })

    // Send email notification (async, don't block response)
    sendContactNotification(body).catch(error => {
      console.error('Failed to send contact notification:', error)
    })

    return NextResponse.json({
      success: true,
      message: 'Message sent successfully. We\'ll get back to you within 24-48 hours.'
    }, { status: 200 })

  } catch (error: unknown) {
    console.error('Contact form error:', error)

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// Handle OPTIONS request for CORS
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  })
}