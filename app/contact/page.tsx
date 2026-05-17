'use client'

import { useState } from 'react'
import Footer from '@/components/Footer'
import { Send, CheckCircle } from 'lucide-react'

const projectTypes = ['Site web vitrine', 'E-commerce', 'Application Android', 'Application web', 'Refonte de site', 'Autre']
const budgets = ['< 500€', '500€ – 1 000€', '1 000€ – 3 000€', '3 000€+', 'À définir']

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({
    name: '', email: '', company: '', phone: '', projectType: '', budget: '', message: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <>
      <div className="min-h-screen bg-white pt-28 pb-20">
        <div className="max-w-3xl mx-auto px-6 md:px-12">
          {/* Header */}
          <div className="text-center mb-12">
            <span className="inline-block bg-purple-100 text-purple-700 text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
              Devis gratuit
            </span>
            <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
              Parlons de votre projet
            </h1>
            <p className="text-lg text-gray-500">
              Remplissez ce formulaire et recevez votre devis sous 24h. Aucun engagement.
            </p>
          </div>

          {submitted ? (
            <div className="text-center py-20 bg-purple-50 rounded-3xl border border-purple-100">
              <CheckCircle className="w-16 h-16 text-purple-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Message reçu !</h2>
              <p className="text-gray-500">Nous vous répondrons dans les 24 heures. À très bientôt.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-white rounded-3xl border border-gray-100 shadow-xl p-8 md:p-10 space-y-6">
              {/* Name + Company */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Nom complet *</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Jean Dupont"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100 transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Entreprise</label>
                  <input
                    type="text"
                    value={form.company}
                    onChange={(e) => setForm({ ...form, company: e.target.value })}
                    placeholder="Mon Entreprise SARL"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100 transition"
                  />
                </div>
              </div>

              {/* Email + Phone */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Email *</label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="jean@monentreprise.fr"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100 transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Téléphone</label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="+33 6 00 00 00 00"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100 transition"
                  />
                </div>
              </div>

              {/* Project type */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Type de projet *</label>
                <div className="flex flex-wrap gap-2">
                  {projectTypes.map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setForm({ ...form, projectType: t })}
                      className={`px-4 py-2 rounded-xl text-sm font-medium border transition-all ${
                        form.projectType === t
                          ? 'bg-purple-700 text-white border-purple-700'
                          : 'bg-white text-gray-600 border-gray-200 hover:border-purple-300'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {/* Budget */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Budget estimé</label>
                <div className="flex flex-wrap gap-2">
                  {budgets.map((b) => (
                    <button
                      key={b}
                      type="button"
                      onClick={() => setForm({ ...form, budget: b })}
                      className={`px-4 py-2 rounded-xl text-sm font-medium border transition-all ${
                        form.budget === b
                          ? 'bg-purple-700 text-white border-purple-700'
                          : 'bg-white text-gray-600 border-gray-200 hover:border-purple-300'
                      }`}
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Décrivez votre projet *</label>
                <textarea
                  required
                  rows={4}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Dites-nous ce que vous voulez créer, votre secteur d'activité, vos objectifs..."
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100 transition resize-none"
                />
              </div>

              <button type="submit" className="btn-primary w-full flex items-center justify-center gap-2">
                Envoyer ma demande de devis <Send className="w-4 h-4" />
              </button>

              <p className="text-center text-xs text-gray-400">
                Réponse garantie sous 24h · Aucun engagement · 100% gratuit
              </p>
            </form>
          )}
        </div>
      </div>
      <Footer />
    </>
  )
}
