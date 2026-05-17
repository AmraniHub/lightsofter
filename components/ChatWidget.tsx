'use client'
import { useState, useRef, useEffect, useCallback } from 'react'
import { MessageCircle, X, Send, Loader2, ArrowRight, Zap } from 'lucide-react'
import { useT } from './LangProvider'

interface Message {
  role: 'user' | 'assistant'
  content: string
  action?: { type: 'scroll' | 'navigate'; target: string; label: string }
}

const ACTION_RE = /\[ACTION:(scroll|navigate):([^\]]+)\]/g

const ACTION_LABELS: Record<string, Record<string, string>> = {
  fr: {
    'scroll:devis': 'Obtenir un devis gratuit',
    'scroll:realisations': 'Voir nos réalisations',
    'scroll:tarifs': 'Voir les tarifs',
    'scroll:temoignages': 'Lire les témoignages',
    'navigate:/blog': 'Lire le blog',
    'navigate:/contact': 'Nous contacter',
  },
  en: {
    'scroll:devis': 'Get a free quote',
    'scroll:realisations': 'See our work',
    'scroll:tarifs': 'View pricing',
    'scroll:temoignages': 'Read testimonials',
    'navigate:/blog': 'Read the blog',
    'navigate:/contact': 'Contact us',
  },
}

const SUGGESTIONS = {
  fr: ['Combien coûte un site ?', 'Délai de livraison ?', 'Voir les réalisations'],
  en: ['How much does a website cost?', 'What are the delivery times?', 'See your work'],
}

const WELCOME_TEXT = {
  fr: 'Bonjour 👋 Je suis l\'assistant Lightsofter. Comment puis-je vous aider ? Devis, tarifs, réalisations...',
  en: 'Hello 👋 I\'m the Lightsofter assistant. How can I help you? Quote, pricing, portfolio...',
}

const ONLINE_TEXT = { fr: 'En ligne', en: 'Online' }
const PLACEHOLDER_TEXT = { fr: 'Votre message...', en: 'Your message...' }
const NUDGE_TEXT = { fr: 'Une question sur votre projet ? 💬', en: 'A question about your project? 💬' }
const ERROR_TEXT = { fr: 'Désolé, une erreur est survenue. Réessayez.', en: 'Sorry, an error occurred. Please try again.' }

function parseReply(text: string, locale: string): { content: string; action?: Message['action'] } {
  const labels = ACTION_LABELS[locale] ?? ACTION_LABELS.fr
  const actions: Message['action'][] = []
  const content = text
    .replace(ACTION_RE, (_, type, target) => {
      const key = `${type}:${target}`
      actions.push({ type: type as 'scroll' | 'navigate', target, label: labels[key] ?? target })
      return ''
    })
    .trim()
  return { content, action: actions[0] }
}

function triggerAction(action: Message['action']) {
  if (!action) return
  if (action.type === 'navigate') {
    window.location.href = action.target
  } else {
    const el = document.getElementById(action.target)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

function ga(event: string, params?: Record<string, string>) {
  if (typeof window !== 'undefined' && (window as unknown as Record<string, unknown>).gtag) {
    ;(window as unknown as Record<string, (...args: unknown[]) => void>).gtag('event', event, params)
  }
}

export default function ChatWidget() {
  const { locale } = useT()
  const loc = (locale === 'en' ? 'en' : 'fr') as 'fr' | 'en'

  const makeWelcome = (l: 'fr' | 'en'): Message => ({
    role: 'assistant',
    content: WELCOME_TEXT[l],
  })

  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([makeWelcome(loc)])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [firstMsg, setFirstMsg] = useState(true)
  const [nudge, setNudge] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // When locale changes and no conversation started yet, update welcome message
  useEffect(() => {
    if (firstMsg) setMessages([makeWelcome(loc)])
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loc])

  // Nudge after 25s
  useEffect(() => {
    const t = setTimeout(() => { if (!open) setNudge(true) }, 25000)
    return () => clearTimeout(t)
  }, [open])

  useEffect(() => {
    if (open) { setNudge(false); setTimeout(() => inputRef.current?.focus(), 100) }
  }, [open])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  const send = useCallback(async () => {
    const text = input.trim()
    if (!text || loading) return

    if (firstMsg) {
      ga('chat_first_message', { source: 'chatbot' })
      setFirstMsg(false)
    }

    const userMsg: Message = { role: 'user', content: text }
    setMessages(prev => [...prev, userMsg])
    setInput('')
    setLoading(true)

    try {
      const history = messages.map(m => ({ role: m.role, content: m.content }))
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, history, locale: loc }),
      })
      const data = await res.json()
      const { content, action } = parseReply(data.reply || '', loc)

      if (action) ga('chat_action', { action: `${action.type}:${action.target}` })
      if (/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/.test(text) ||
          /(?:\+?[\d][\d\s\-().]{6,}[\d])/.test(text)) {
        ga('chat_lead_captured', { source: 'chatbot' })
      }

      setMessages(prev => [...prev, { role: 'assistant', content, action }])
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', content: ERROR_TEXT[loc] }])
    } finally {
      setLoading(false)
    }
  }, [input, loading, messages, firstMsg, loc])

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send() }
  }

  return (
    <>
      {/* Nudge bubble */}
      {nudge && !open && (
        <div onClick={() => setOpen(true)}
          className="fixed bottom-24 right-6 z-40 bg-white border border-purple-100 shadow-xl rounded-2xl px-4 py-3 max-w-[220px] cursor-pointer">
          <p className="text-gray-800 text-sm font-medium leading-snug">{NUDGE_TEXT[loc]}</p>
          <button onClick={e => { e.stopPropagation(); setNudge(false) }}
            className="absolute -top-2 -right-2 w-5 h-5 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 hover:bg-gray-300 text-xs">×</button>
        </div>
      )}

      {/* Chat window */}
      {open && (
        <div className="fixed bottom-24 right-4 z-50 w-[360px] max-w-[calc(100vw-2rem)] flex flex-col rounded-3xl shadow-2xl overflow-hidden border border-white/10"
          style={{ height: '480px' }}>

          {/* Header */}
          <div className="bg-gradient-to-r from-[#1a0b2e] to-purple-900 px-5 py-4 flex items-center gap-3 flex-shrink-0">
            <div className="w-9 h-9 rounded-xl bg-purple-500/30 border border-purple-400/30 flex items-center justify-center flex-shrink-0">
              <Zap className="w-4 h-4 text-purple-300" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white font-bold text-sm leading-none">Lightsofter</p>
              <div className="flex items-center gap-1.5 mt-1">
                <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                <span className="text-green-400 text-xs">{ONLINE_TEXT[loc]}</span>
              </div>
            </div>
            <button onClick={() => setOpen(false)}
              className="w-8 h-8 rounded-xl hover:bg-white/10 flex items-center justify-center text-white/60 hover:text-white transition-colors">
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages — flex-col so content anchors to bottom */}
          <div className="flex-1 overflow-y-auto bg-[#0f0a1e] px-4 py-4 flex flex-col">
            <div className="flex-1" />
            <div className="space-y-3">
              {messages.map((msg, i) => (
                <div key={i} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                  <div
                    className={`max-w-[84%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed whitespace-pre-wrap ${
                      msg.role === 'user'
                        ? 'bg-purple-600 text-white rounded-br-sm'
                        : 'text-white/90 border border-white/10 rounded-bl-sm'
                    }`}
                    style={{ background: msg.role === 'assistant' ? 'rgba(255,255,255,0.08)' : undefined }}
                  >
                    {msg.content}
                  </div>
                  {msg.action && (
                    <button
                      onClick={() => { triggerAction(msg.action); setOpen(false) }}
                      className="mt-2 flex items-center gap-1.5 text-xs text-purple-400 hover:text-purple-300 border border-purple-500/30 hover:border-purple-400/50 rounded-xl px-3 py-1.5 transition-all bg-purple-500/10 hover:bg-purple-500/20"
                    >
                      {msg.action.label} <ArrowRight className="w-3 h-3" />
                    </button>
                  )}
                </div>
              ))}

              {loading && (
                <div className="flex items-start">
                  <div className="rounded-2xl rounded-bl-sm px-4 py-3 border border-white/10" style={{ background: 'rgba(255,255,255,0.08)' }}>
                    <div className="flex gap-1 items-center h-4">
                      <span className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>
          </div>

          {/* Quick suggestions */}
          {firstMsg && (
            <div className="bg-[#0f0a1e] px-4 pb-2 flex gap-2 overflow-x-auto flex-shrink-0" style={{ scrollbarWidth: 'none' }}>
              {SUGGESTIONS[loc].map(s => (
                <button key={s}
                  onClick={() => { setInput(s); setTimeout(() => inputRef.current?.focus(), 50) }}
                  className="flex-shrink-0 text-xs text-purple-300 border border-purple-500/30 rounded-full px-3 py-1.5 hover:bg-purple-500/20 hover:border-purple-400/50 transition-all whitespace-nowrap">
                  {s}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div className="bg-[#0f0a1e] border-t border-white/8 px-4 py-3 flex gap-2 flex-shrink-0">
            <input ref={inputRef} value={input} onChange={e => setInput(e.target.value)} onKeyDown={handleKey}
              placeholder={PLACEHOLDER_TEXT[loc]} maxLength={500}
              className="flex-1 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm placeholder-white/30 focus:outline-none focus:border-purple-500/50 transition-all"
              style={{ background: 'rgba(255,255,255,0.07)' }} />
            <button onClick={send} disabled={!input.trim() || loading}
              className="w-10 h-10 rounded-xl bg-purple-600 hover:bg-purple-500 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center transition-all flex-shrink-0">
              {loading ? <Loader2 className="w-4 h-4 text-white animate-spin" /> : <Send className="w-4 h-4 text-white" />}
            </button>
          </div>
        </div>
      )}

      {/* Trigger button */}
      <button onClick={() => setOpen(prev => !prev)} aria-label="Chat"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-600 to-violet-700 shadow-2xl shadow-purple-900/60 flex items-center justify-center hover:scale-105 active:scale-95 transition-all">
        {open ? <X className="w-6 h-6 text-white" /> : <MessageCircle className="w-6 h-6 text-white" />}
        {!open && nudge && (
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white animate-pulse" />
        )}
      </button>
    </>
  )
}
