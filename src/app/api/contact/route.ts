import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

interface ContactPayload {
  name:    string
  email:   string
  subject: string
  body:    string
}

export async function POST(request: NextRequest) {
  try {
    const data = (await request.json()) as ContactPayload

    // Basic validation
    if (!data.name || !data.email || !data.subject || !data.body) {
      return NextResponse.json(
        { success: false, message: 'All fields are required.' },
        { status: 400 }
      )
    }

    const apiKey    = process.env.RESEND_API_KEY
    const toEmail   = process.env.CONTACT_TO_EMAIL   ?? 'kcobbina@umd.edu'
    const fromEmail = process.env.CONTACT_FROM_EMAIL ?? 'onboarding@resend.dev'

    if (!apiKey || apiKey === 're_PASTE_YOUR_KEY_HERE') {
      // Dev fallback — no key configured
      console.log('[Contact form — no API key] Would have sent:', {
        to: toEmail, from: fromEmail, subject: data.subject,
      })
      return NextResponse.json({
        success: true,
        message: 'Thanks for reaching out! I will get back to you soon.',
      })
    }

    const resend = new Resend(apiKey)

    const { data: sent, error } = await resend.emails.send({
      from:     fromEmail,
      to:       [toEmail],
      reply_to: data.email,
      subject:  `[Contact] ${data.subject}`,
      text:     `Name: ${data.name}\nEmail: ${data.email}\n\n${data.body}`,
      html: `
        <table style="font-family:sans-serif;font-size:14px;color:#374151;max-width:600px">
          <tr><td><strong>From:</strong> ${data.name} &lt;${data.email}&gt;</td></tr>
          <tr><td><strong>Subject:</strong> ${data.subject}</td></tr>
          <tr><td style="padding-top:16px;border-top:1px solid #e5e7eb;white-space:pre-wrap">${data.body}</td></tr>
        </table>
      `,
    })

    if (error) {
      // Surface the actual Resend error so you can debug it
      console.error('[Resend error]', error)
      return NextResponse.json(
        { success: false, message: `Email error: ${error.message}` },
        { status: 500 }
      )
    }

    console.log('[Resend] Email sent, id:', sent?.id)
    return NextResponse.json({
      success: true,
      message: 'Thanks for reaching out! I will get back to you soon.',
    })

  } catch (err) {
    console.error('[Contact route error]', err)
    return NextResponse.json(
      { success: false, message: 'Server error. Please try again.' },
      { status: 500 }
    )
  }
}
