'use client'

import { useState } from 'react'
import {
  Globe, Smartphone, LayoutDashboard, ShoppingCart,
  RefreshCw, ArrowRight, ArrowLeft, CheckCircle,
  Euro, Clock, Target, User, MessageCircle
} from 'lucide-react'

/* ─── Step data ──────────────────────────────────────────────────── */

const steps = [
  {
    id: 'type',
    question: 'Quel type de projet souhaitez-vous ?',
    subtitle: 'Choisissez ce qui correspond le mieux à votre besoin.',
    type: 'cards',
    options: [
      { value: 'site-vitrine', label: 'Site vitrine', icon: Globe, desc: 'Présenter votre activité en ligne' },
      { value: 'ecommerce', label: 'E-commerce', icon: ShoppingCart, desc: 'Vendre vos produits sur internet' },
      { value: 'app-android', label: 'App Android', icon: Smartphone, desc: 'Application mobile pour vos clients' },
      { value: 'app-web', label: 'Application web', icon: LayoutDashboard, desc: 'Outil interne ou SaaS en ligne' },
      { value: 'refonte', label: 'Refonte de site', icon: RefreshCw, desc: 'Moderniser votre site existant' },
    ],
  },
  {
    id: 'budget',
    question: 'Quel est votre budget pour ce projet ?',
    subtitle: 'Pas de bonne ou mauvaise réponse — cela nous aide à vous proposer la meilleure solution.',
    type: 'cards',
    options: [
      { value: 'moins-500', label: 'Moins de 500€', icon: Euro, desc: 'Solution rapide et efficace' },
      { value: '500-1000', label: '500€ – 1 000€', icon: Euro, desc: 'Notre formule Starter' },
      { value: '1000-3000', label: '1 000€ – 3 000€', icon: Euro, desc: 'Notre formule Pro' },
      { value: '3000-plus', label: '3 000€ et plus', icon: Euro, desc: 'Projet sur-mesure avancé' },
    ],
  },
  {
    id: 'deadline',
    question: 'Quand avez-vous besoin de votre projet ?',
    subtitle: 'Votre délai nous aide à planifier et prioriser votre demande.',
    type: 'cards',
    options: [
      { value: 'urgent', label: 'Le plus vite possible', icon: Clock, desc: 'Urgent — dans la semaine' },
      { value: 'mois', label: 'Ce mois-ci', icon: Clock, desc: 'Sous 2 à 4 semaines' },
      { value: 'trimestre', label: 'Ce trimestre', icon: Clock, desc: 'Dans les 3 prochains mois' },
      { value: 'flexible', label: 'Pas de contrainte', icon: Clock, desc: 'Quand c\'est prêt' },
    ],
  },
  {
    id: 'goal',
    question: 'Quel est votre objectif principal ?',
    subtitle: 'Cela nous permet de vous proposer une solution vraiment adaptée.',
    type: 'cards',
    options: [
      { value: 'visibilite', label: 'Gagner en visibilité', icon: Target, desc: 'Être trouvé sur Google' },
      { value: 'clients', label: 'Attirer des clients', icon: Target, desc: 'Générer des leads & contacts' },
      { value: 'ventes', label: 'Augmenter les ventes', icon: Target, desc: 'Vendre plus en ligne' },
      { value: 'image', label: 'Soigner mon image', icon: Target, desc: 'Paraître professionnel et moderne' },
      { value: 'automatiser', label: 'Automatiser mon business', icon: Target, desc: 'Gagner du temps avec un outil' },
    ],
  },
  {
    id: 'contact',
    question: 'Presque terminé ! Où vous envoyons-nous votre devis ?',
    subtitle: 'Réponse garantie sous 24h. Aucun engagement, aucun démarchage.',
    type: 'contact',
  },
]

/* ─── Types ───────────────────────────────────────────────────────── */

type Answers = Record<string, string>

interface ContactData {
  name: string
  email: string
  phone: string
  message: string
}

/* ─── Progress bar ───────────────────────────────────────────────── */

function ProgressBar({ current, total }: { current: number; total: number }) {
  return (
    <div className="w-full">
      <div className="flex justify-between text-xs text-gray-400 mb-2">
        <span>Étape {current} sur {total}</span>
        <span>{Math.round((current / total) * 100)}%</span>
      </div>
      <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-purple-600 to-purple-400 rounded-full transition-all duration-500"
          style={{ width: `${(current / total) * 100}%` }}
        />
      </div>
    </div>
  )
}

/* ─── Option card ─────────────────────────────────────────────────── */

function OptionCard({
  option, selected, onClick,
}: {
  option: { value: string; label: string; icon: React.ElementType; desc: string }
  selected: boolean
  onClick: () => void
}) {
  const Icon = option.icon
  return (
    <button
      onClick={onClick}
      className={`w-full text-left px-5 py-4 rounded-2xl border-2 transition-all duration-200 flex items-center gap-4 group
        ${selected
          ? 'border-purple-600 bg-purple-50 shadow-lg shadow-purple-100'
          : 'border-gray-200 bg-white hover:border-purple-300 hover:bg-purple-50/40'
        }`}
    >
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors
        ${selected ? 'bg-purple-600' : 'bg-gray-100 group-hover:bg-purple-100'}`}>
        <Icon className={`w-5 h-5 ${selected ? 'text-white' : 'text-gray-500 group-hover:text-purple-600'}`} />
      </div>
      <div className="flex-1 min-w-0">
        <p className={`font-semibold text-sm ${selected ? 'text-purple-700' : 'text-gray-800'}`}>{option.label}</p>
        <p className="text-xs text-gray-400 mt-0.5 truncate">{option.desc}</p>
      </div>
      <div className={`w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-all
        ${selected ? 'border-purple-600 bg-purple-600' : 'border-gray-300'}`}>
        {selected && <div className="w-2 h-2 rounded-full bg-white" />}
      </div>
    </button>
  )
}

/* ─── Main component ──────────────────────────────────────────────── */

export default function SmartForm() {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<Answers>({})
  const [contact, setContact] = useState<ContactData>({ name: '', email: '', phone: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const current = steps[step]
  const isLastStep = step === steps.length - 1
  const isContactStep = current.type === 'contact'
  const canProceed = isContactStep
    ? contact.name.trim() && contact.email.trim()
    : Boolean(answers[current.id])

  function selectOption(value: string) {
    setAnswers(prev => ({ ...prev, [current.id]: value }))
  }

  function next() {
    if (!canProceed) return
    if (isLastStep) {
      handleSubmit()
    } else {
      setStep(s => s + 1)
    }
  }

  function back() {
    if (step > 0) setStep(s => s - 1)
  }

  function handleSubmit() {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setSubmitted(true)
    }, 1200)
  }

  /* Success screen */
  if (submitted) {
    return (
      <div className="text-center py-10 px-6">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-10 h-10 text-green-500" />
        </div>
        <h3 className="text-2xl font-black text-gray-900 mb-2">Demande envoyée !</h3>
        <p className="text-gray-500 mb-2">
          Merci <span className="font-semibold text-gray-700">{contact.name.split(' ')[0]}</span> — votre devis arrive sous <span className="font-semibold text-purple-700">24h maximum</span>.
        </p>
        <p className="text-sm text-gray-400 mb-8">Vérifiez votre boîte mail : {contact.email}</p>

        <a
          href={`https://wa.me/212600000000?text=Bonjour%2C%20je%20suis%20${encodeURIComponent(contact.name)}%20et%20j%27ai%20rempli%20votre%20formulaire.%20Je%20souhaite%20discuter%20de%20mon%20projet.`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 bg-[#25d366] text-white font-bold px-8 py-4 rounded-2xl hover:bg-[#1fb855] transition-colors shadow-lg"
        >
          <MessageCircle className="w-5 h-5" />
          Discuter sur WhatsApp maintenant
        </a>
        <p className="text-xs text-gray-400 mt-4">Pour une réponse encore plus rapide</p>
      </div>
    )
  }

  return (
    <div className="w-full">
      {/* Progress */}
      <div className="mb-8">
        <ProgressBar current={step + 1} total={steps.length} />
      </div>

      {/* Question */}
      <div className="mb-6">
        <h3 className="text-xl md:text-2xl font-black text-gray-900 mb-1">{current.question}</h3>
        <p className="text-sm text-gray-400">{current.subtitle}</p>
      </div>

      {/* Options */}
      {current.type === 'cards' && current.options && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
          {current.options.map(opt => (
            <OptionCard
              key={opt.value}
              option={opt}
              selected={answers[current.id] === opt.value}
              onClick={() => selectOption(opt.value)}
            />
          ))}
        </div>
      )}

      {/* Contact fields */}
      {current.type === 'contact' && (
        <div className="space-y-4 mb-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                Votre prénom &amp; nom *
              </label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  required
                  value={contact.name}
                  onChange={e => setContact(c => ({ ...c, name: e.target.value }))}
                  placeholder="Jean Dupont"
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100 transition"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                Email professionnel *
              </label>
              <div className="relative">
                <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                <input
                  type="email"
                  required
                  value={contact.email}
                  onChange={e => setContact(c => ({ ...c, email: e.target.value }))}
                  placeholder="jean@monentreprise.fr"
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100 transition"
                />
              </div>
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Téléphone / WhatsApp
              <span className="text-gray-400 font-normal ml-1">(optionnel)</span>
            </label>
            <div className="relative">
              <MessageCircle className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="tel"
                value={contact.phone}
                onChange={e => setContact(c => ({ ...c, phone: e.target.value }))}
                placeholder="+33 6 00 00 00 00"
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100 transition"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Décrivez votre projet en quelques mots
              <span className="text-gray-400 font-normal ml-1">(optionnel)</span>
            </label>
            <textarea
              rows={3}
              value={contact.message}
              onChange={e => setContact(c => ({ ...c, message: e.target.value }))}
              placeholder="Ex : Je gère un restaurant à Paris, j'ai besoin d'un site pour les réservations en ligne..."
              className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100 transition resize-none"
            />
          </div>

          {/* Summary of answers */}
          <div className="bg-purple-50 border border-purple-100 rounded-2xl p-4">
            <p className="text-xs font-semibold text-purple-700 mb-2 uppercase tracking-wide">Récapitulatif de votre projet</p>
            <div className="grid grid-cols-2 gap-2">
              {Object.entries(answers).map(([key, val]) => {
                const stepData = steps.find(s => s.id === key)
                const option = stepData?.options?.find(o => o.value === val)
                return (
                  <div key={key} className="flex items-center gap-1.5 text-xs text-gray-600">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-400 flex-shrink-0" />
                    {option?.label ?? val}
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="flex items-center justify-between gap-4">
        {step > 0 ? (
          <button
            onClick={back}
            className="flex items-center gap-2 text-gray-500 hover:text-gray-700 font-medium text-sm transition-colors px-4 py-3"
          >
            <ArrowLeft className="w-4 h-4" /> Retour
          </button>
        ) : (
          <div />
        )}

        <button
          onClick={next}
          disabled={!canProceed || loading}
          className={`flex items-center gap-2 font-bold px-8 py-3.5 rounded-2xl transition-all duration-200 text-sm
            ${canProceed && !loading
              ? 'bg-purple-700 hover:bg-purple-800 text-white shadow-lg shadow-purple-500/30 hover:-translate-y-0.5'
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
        >
          {loading ? (
            <>
              <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
              </svg>
              Envoi en cours...
            </>
          ) : isLastStep ? (
            <>Recevoir mon devis gratuit <CheckCircle className="w-4 h-4" /></>
          ) : (
            <>Continuer <ArrowRight className="w-4 h-4" /></>
          )}
        </button>
      </div>

      {/* Trust line */}
      {!isContactStep && (
        <p className="text-center text-xs text-gray-400 mt-5">
          🔒 Aucun engagement · Devis gratuit · Réponse en 24h
        </p>
      )}
    </div>
  )
}
