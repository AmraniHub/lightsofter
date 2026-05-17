'use client'

import { useState } from 'react'
import { Globe, Smartphone, LayoutDashboard, ShoppingCart, RefreshCw, ArrowRight, ArrowLeft, CheckCircle, Euro, Clock, Target, User, MessageCircle } from 'lucide-react'
import { useT } from './LangProvider'

type Answers = Record<string, string>
interface ContactData { name: string; email: string; phone: string; message: string }

function ProgressBar({ current, total, stepOf }: { current: number; total: number; stepOf: string }) {
  return (
    <div className="w-full">
      <div className="flex justify-between text-xs text-gray-400 mb-2">
        <span>{current} {stepOf} {total}</span>
        <span>{Math.round((current / total) * 100)}%</span>
      </div>
      <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
        <div className="h-full bg-gradient-to-r from-purple-600 to-purple-400 rounded-full transition-all duration-500" style={{ width: `${(current / total) * 100}%` }} />
      </div>
    </div>
  )
}

function OptionCard({ option, selected, onClick }: { option: { value: string; label: string; icon: React.ElementType; desc: string }; selected: boolean; onClick: () => void }) {
  const Icon = option.icon
  return (
    <button onClick={onClick} className={`w-full text-left px-5 py-4 rounded-2xl border-2 transition-all duration-200 flex items-center gap-4 group ${selected ? 'border-purple-600 bg-purple-50 shadow-lg shadow-purple-100' : 'border-gray-200 bg-white hover:border-purple-300 hover:bg-purple-50/40'}`}>
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors ${selected ? 'bg-purple-600' : 'bg-gray-100 group-hover:bg-purple-100'}`}>
        <Icon className={`w-5 h-5 ${selected ? 'text-white' : 'text-gray-500 group-hover:text-purple-600'}`} />
      </div>
      <div className="flex-1 min-w-0">
        <p className={`font-semibold text-sm ${selected ? 'text-purple-700' : 'text-gray-800'}`}>{option.label}</p>
        <p className="text-xs text-gray-400 mt-0.5 truncate">{option.desc}</p>
      </div>
      <div className={`w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-all ${selected ? 'border-purple-600 bg-purple-600' : 'border-gray-300'}`}>
        {selected && <div className="w-2 h-2 rounded-full bg-white" />}
      </div>
    </button>
  )
}

export default function SmartForm() {
  const { t } = useT()
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<Answers>({})
  const [contact, setContact] = useState<ContactData>({ name: '', email: '', phone: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const steps = [
    {
      id: 'type', question: t.form.step1_q, subtitle: t.form.step1_sub, type: 'cards',
      options: [
        { value: 'site-vitrine', label: t.form.type_vitrine, icon: Globe, desc: t.form.type_vitrine_desc },
        { value: 'ecommerce', label: t.form.type_ecom, icon: ShoppingCart, desc: t.form.type_ecom_desc },
        { value: 'app-android', label: t.form.type_android, icon: Smartphone, desc: t.form.type_android_desc },
        { value: 'app-web', label: t.form.type_webapp, icon: LayoutDashboard, desc: t.form.type_webapp_desc },
        { value: 'refonte', label: t.form.type_refonte, icon: RefreshCw, desc: t.form.type_refonte_desc },
      ],
    },
    {
      id: 'budget', question: t.form.step2_q, subtitle: t.form.step2_sub, type: 'cards',
      options: [
        { value: 'moins-500', label: t.form.budget1, icon: Euro, desc: t.form.budget1_desc },
        { value: '500-1000', label: t.form.budget2, icon: Euro, desc: t.form.budget2_desc },
        { value: '1000-3000', label: t.form.budget3, icon: Euro, desc: t.form.budget3_desc },
        { value: '3000-plus', label: t.form.budget4, icon: Euro, desc: t.form.budget4_desc },
      ],
    },
    {
      id: 'deadline', question: t.form.step3_q, subtitle: t.form.step3_sub, type: 'cards',
      options: [
        { value: 'urgent', label: t.form.delay1, icon: Clock, desc: t.form.delay1_desc },
        { value: 'mois', label: t.form.delay2, icon: Clock, desc: t.form.delay2_desc },
        { value: 'trimestre', label: t.form.delay3, icon: Clock, desc: t.form.delay3_desc },
        { value: 'flexible', label: t.form.delay4, icon: Clock, desc: t.form.delay4_desc },
      ],
    },
    {
      id: 'goal', question: t.form.step4_q, subtitle: t.form.step4_sub, type: 'cards',
      options: [
        { value: 'visibilite', label: t.form.goal1, icon: Target, desc: t.form.goal1_desc },
        { value: 'clients', label: t.form.goal2, icon: Target, desc: t.form.goal2_desc },
        { value: 'ventes', label: t.form.goal3, icon: Target, desc: t.form.goal3_desc },
        { value: 'image', label: t.form.goal4, icon: Target, desc: t.form.goal4_desc },
        { value: 'automatiser', label: t.form.goal5, icon: Target, desc: t.form.goal5_desc },
      ],
    },
    { id: 'contact', question: t.form.step5_q, subtitle: t.form.step5_sub, type: 'contact' },
  ]

  const current = steps[step]
  const isLastStep = step === steps.length - 1
  const isContactStep = current.type === 'contact'
  const canProceed = isContactStep ? contact.name.trim() !== '' && contact.email.trim() !== '' : Boolean(answers[current.id])

  function selectOption(value: string) { setAnswers(prev => ({ ...prev, [current.id]: value })) }
  function next() { if (!canProceed) return; if (isLastStep) handleSubmit(); else setStep(s => s + 1) }
  function back() { if (step > 0) setStep(s => s - 1) }
  function handleSubmit() { setLoading(true); setTimeout(() => { setLoading(false); setSubmitted(true) }, 1200) }

  if (submitted) {
    return (
      <div className="text-center py-10 px-6">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-10 h-10 text-green-500" />
        </div>
        <h3 className="text-2xl font-black text-gray-900 mb-2">{t.form.success_title}</h3>
        <p className="text-gray-500 mb-2">
          {contact.name.split(' ')[0]} — {t.form.success_sub} <span className="font-semibold text-purple-700">{t.form.success_hours}</span>.
        </p>
        <p className="text-sm text-gray-400 mb-8">{t.form.success_check} {contact.email}</p>
        <a
          href={`https://wa.me/212627716149?text=${encodeURIComponent(contact.name)}`}
          target="_blank" rel="noopener noreferrer"
          className="inline-flex items-center gap-3 bg-[#25d366] text-white font-bold px-8 py-4 rounded-2xl hover:bg-[#1fb855] transition-colors shadow-lg"
        >
          <MessageCircle className="w-5 h-5" />
          {t.form.success_wa}
        </a>
        <p className="text-xs text-gray-400 mt-4">{t.form.success_wa_sub}</p>
      </div>
    )
  }

  return (
    <div className="w-full">
      <div className="mb-8">
        <ProgressBar current={step + 1} total={steps.length} stepOf={t.form.step_of} />
      </div>
      <div className="mb-6">
        <h3 className="text-xl md:text-2xl font-black text-gray-900 mb-1">{current.question}</h3>
        <p className="text-sm text-gray-400">{current.subtitle}</p>
      </div>

      {current.type === 'cards' && current.options && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
          {current.options.map(opt => (
            <OptionCard key={opt.value} option={opt} selected={answers[current.id] === opt.value} onClick={() => selectOption(opt.value)} />
          ))}
        </div>
      )}

      {current.type === 'contact' && (
        <div className="space-y-4 mb-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">{t.form.name_label} *</label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input type="text" required value={contact.name} onChange={e => setContact(c => ({ ...c, name: e.target.value }))} placeholder={t.form.name_placeholder} className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100 transition" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">{t.form.email_label} *</label>
              <div className="relative">
                <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                <input type="email" required value={contact.email} onChange={e => setContact(c => ({ ...c, email: e.target.value }))} placeholder={t.form.email_placeholder} className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100 transition" />
              </div>
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">{t.form.phone_label} <span className="text-gray-400 font-normal">{t.form.phone_optional}</span></label>
            <div className="relative">
              <MessageCircle className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input type="tel" value={contact.phone} onChange={e => setContact(c => ({ ...c, phone: e.target.value }))} placeholder={t.form.phone_placeholder} className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100 transition" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">{t.form.message_label} <span className="text-gray-400 font-normal">{t.form.message_optional}</span></label>
            <textarea rows={3} value={contact.message} onChange={e => setContact(c => ({ ...c, message: e.target.value }))} placeholder={t.form.message_placeholder} className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100 transition resize-none" />
          </div>
          <div className="bg-purple-50 border border-purple-100 rounded-2xl p-4">
            <p className="text-xs font-semibold text-purple-700 mb-2 uppercase tracking-wide">{t.form.summary_title}</p>
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

      <div className="flex items-center justify-between gap-4">
        {step > 0 ? (
          <button onClick={back} className="flex items-center gap-2 text-gray-500 hover:text-gray-700 font-medium text-sm transition-colors px-4 py-3">
            <ArrowLeft className="w-4 h-4" /> {t.form.btn_back}
          </button>
        ) : <div />}
        <button
          onClick={next}
          disabled={!canProceed || loading}
          className={`flex items-center gap-2 font-bold px-8 py-3.5 rounded-2xl transition-all duration-200 text-sm ${canProceed && !loading ? 'bg-purple-700 hover:bg-purple-800 text-white shadow-lg shadow-purple-500/30 hover:-translate-y-0.5' : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}
        >
          {loading ? (
            <><svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" /></svg>{t.form.btn_sending}</>
          ) : isLastStep ? (
            <>{t.form.btn_submit} <CheckCircle className="w-4 h-4" /></>
          ) : (
            <>{t.form.btn_next} <ArrowRight className="w-4 h-4" /></>
          )}
        </button>
      </div>
      {!isContactStep && <p className="text-center text-xs text-gray-400 mt-5">{t.form.trust_line}</p>}
    </div>
  )
}
