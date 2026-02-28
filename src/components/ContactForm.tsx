'use client'

import { useState } from 'react'

type FormState = 'idle' | 'loading' | 'success' | 'error'

export function ContactForm() {
  const [state, setState] = useState<FormState>('idle')
  const [message, setMessage] = useState('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setState('loading')

    const form = e.currentTarget
    const data = {
      name:    (form.elements.namedItem('name')    as HTMLInputElement).value,
      email:   (form.elements.namedItem('email')   as HTMLInputElement).value,
      subject: (form.elements.namedItem('subject') as HTMLInputElement).value,
      body:    (form.elements.namedItem('body')    as HTMLTextAreaElement).value,
    }

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      const json = await res.json() as { success: boolean; message?: string }
      if (json.success) {
        setState('success')
        setMessage(json.message ?? 'Message sent!')
        form.reset()
      } else {
        throw new Error('Submission failed')
      }
    } catch {
      setState('error')
      setMessage('Something went wrong. Please try again or email me directly.')
    }
  }

  const inputClass =
    'w-full rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm text-slate-900 dark:text-slate-100 px-3 py-2 placeholder:text-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors'

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-xl" noValidate>
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="contact-name" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
            Name
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            required
            autoComplete="name"
            placeholder="Your name"
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="contact-email" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
            Email
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="you@example.com"
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label htmlFor="contact-subject" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
          Subject
        </label>
        <input
          id="contact-subject"
          name="subject"
          type="text"
          required
          placeholder="Re: collaboration opportunity"
          className={inputClass}
        />
      </div>

      <div>
        <label htmlFor="contact-body" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
          Message
        </label>
        <textarea
          id="contact-body"
          name="body"
          rows={5}
          required
          placeholder="Your message…"
          className={`${inputClass} resize-y min-h-[120px]`}
        />
      </div>

      {/* Status messages */}
      {state === 'success' && (
        <p role="status" className="text-sm text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-950 rounded-md px-3 py-2">
          ✓ {message}
        </p>
      )}
      {state === 'error' && (
        <p role="alert" className="text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950 rounded-md px-3 py-2">
          {message}
        </p>
      )}

      <button
        type="submit"
        disabled={state === 'loading'}
        className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-400 text-white text-sm font-medium rounded-md px-5 py-2.5 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {state === 'loading' ? (
          <>
            <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" aria-hidden="true" />
            Sending…
          </>
        ) : (
          'Send Message'
        )}
      </button>
    </form>
  )
}
