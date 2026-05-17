'use client'
import { useState } from 'react'

type Contact = { title: string; subtitle: string; phone: string; email: string; address: string; hours: string }

export default function ContactSection({ contact }: { contact: Contact }) {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
    setSent(true)
  }

  return (
    <section id="contact" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <span className="text-[var(--color-primary)] font-semibold text-sm uppercase tracking-widest">Contact</span>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mt-3 mb-4">{contact.title}</h2>
            <p className="text-gray-500 mb-10">{contact.subtitle}</p>
            <div className="space-y-5">
              {contact.phone && (
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[var(--color-primary)]/10 flex items-center justify-center text-xl">📞</div>
                  <div><p className="text-xs text-gray-400 uppercase tracking-wide">Téléphone</p><a href={`tel:${contact.phone}`} className="font-semibold text-gray-900 hover:text-[var(--color-primary)]">{contact.phone}</a></div>
                </div>
              )}
              {contact.email && (
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[var(--color-primary)]/10 flex items-center justify-center text-xl">✉️</div>
                  <div><p className="text-xs text-gray-400 uppercase tracking-wide">Email</p><a href={`mailto:${contact.email}`} className="font-semibold text-gray-900 hover:text-[var(--color-primary)]">{contact.email}</a></div>
                </div>
              )}
              {contact.address && (
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[var(--color-primary)]/10 flex items-center justify-center text-xl">📍</div>
                  <div><p className="text-xs text-gray-400 uppercase tracking-wide">Adresse</p><p className="font-semibold text-gray-900">{contact.address}</p></div>
                </div>
              )}
              {contact.hours && (
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[var(--color-primary)]/10 flex items-center justify-center text-xl">🕐</div>
                  <div><p className="text-xs text-gray-400 uppercase tracking-wide">Horaires</p><p className="font-semibold text-gray-900">{contact.hours}</p></div>
                </div>
              )}
            </div>
          </div>

          <div className="bg-gray-50 rounded-2xl p-8">
            {sent ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-3xl mb-4">✅</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Message envoyé !</h3>
                <p className="text-gray-500">Nous vous répondrons sous 24h.</p>
              </div>
            ) : (
              <form onSubmit={submit} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nom complet</label>
                  <input required value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    placeholder="Jean Dupont" className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input required type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                    placeholder="jean@exemple.com" className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                  <textarea required rows={5} value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                    placeholder="Décrivez votre projet ou posez votre question..."
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] resize-none" />
                </div>
                <button type="submit" className="btn-primary w-full justify-center py-4">
                  Envoyer le message →
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
