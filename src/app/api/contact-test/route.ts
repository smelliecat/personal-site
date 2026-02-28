/**
 * Quick smoke-test for your Resend config.
 * Visit http://localhost:3000/api/contact-test in the browser while dev is running.
 * DELETE THIS FILE before deploying to production.
 */
import { NextResponse } from 'next/server'
import { Resend } from 'resend'

export async function GET() {
  const apiKey    = process.env.RESEND_API_KEY
  const toEmail   = process.env.CONTACT_TO_EMAIL
  const fromEmail = process.env.CONTACT_FROM_EMAIL

  // 1. Check env vars are loaded
  if (!apiKey || apiKey === 're_PASTE_YOUR_KEY_HERE') {
    return NextResponse.json({
      ok: false,
      step: 'env',
      message: 'RESEND_API_KEY is missing or still set to the placeholder. Did you restart the dev server after editing .env.local?',
    }, { status: 500 })
  }

  // 2. Try sending a test email
  const resend = new Resend(apiKey)
  const { data, error } = await resend.emails.send({
    from:    fromEmail ?? 'onboarding@resend.dev',
    to:      [toEmail ?? 'kcobbina@umd.edu'],
    subject: '[Test] Contact form smoke test',
    text:    'If you received this, the contact form email setup is working correctly.',
  })

  if (error) {
    return NextResponse.json({
      ok:      false,
      step:    'resend',
      message: error.message,
      hint:    'onboarding@resend.dev can only deliver to the email you signed up to Resend with. If that email differs from CONTACT_TO_EMAIL, verify a custom domain in Resend.',
      error,
    }, { status: 500 })
  }

  return NextResponse.json({
    ok:      true,
    message: `Test email sent to ${toEmail}. Check your inbox (and spam folder).`,
    id:      data?.id,
  })
}
