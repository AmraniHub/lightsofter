'use client'
import { useState, useRef, useEffect, useCallback } from 'react'
import { MessageCircle, X, Send, Loader2, ArrowRight, Zap } from 'lucide-react'

interface Message {
  role: 'user' | 'assistant'
  content: string
  action?: { type: 'scroll' | 'navigate'; target: string; label: string }
}

const ACTION_RE = /\[ACTION:(scroll|navigate):([^\]]+)\]/g

const ACTION_LABELS: Record<string, string> = {
  'scroll:devis': 'Obtenir un devis gratuit',
  'scroll:realisations': 'Voir nos réalisations',
  'scroll:tarifs': 'Voir les tarifs',
  'scroll:temoignages': 'Lire les témoignages',
  'navigate:/blog': 'Lire le blog',
  'navigate:/contact': 'Nous contacter',
}

function parseReply(text: string): { content: string; action?: Message['action'] } {
  const actions: Message['action'][] = []
  const content = text
    .replace(ACTION_RE, (_, type, target) => {
      const key = `${type}:${target}`
      actions.push({
        type: type as 'scroll' | 'navigate',
        target,
        label: ACTION_LABELS[key] ?? target,
      })
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

const WELCOME: Message = {
  role: 'assistant',
  content: 'Bonjour 👋 Je suis l\'assistant Lightsofter. Comment puis-je vous aider ? Devis, tarifs, réalisations...',
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([WELCOME])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [firstMsg, setFirstMsg] = useState(true)
  const [nudge, setNudge] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Show nudge bubble after 25s if chat was never opened
  useEffect(() => {
    const t = setTimeout(() => {
      if (!open) setNudge(true)
    }, 25000)
    return () => clearTimeout(t)
  }, [open])

  useEffect(() => {
    if (open) {
      setNudge(false)
      setTimeout(() => inputRef.current?.focus(), 100)
    }
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
        body: JSON.stringify({ message: text, history }),
      })
      const data = await res.json()
      const { content, action } = parseReply(data.reply || '')

      if (action) ga('chat_action', { action: `${action.type}:${action.target}` })

      // Detect lead in user message
      if (/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/.test(text) ||
          /(?:\+?[\d][\d\s\-().]{6,}[\d])/.test(text)) {
        ga('chat_lead_captured', { source: 'chatbot' })
      }

      setMessages(prev => [...prev, { role: 'assistant', content, action }])
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Désolé, une erreur est survenue. Réessayez.' }])
    } finally {
      setLoading(false)
    }
  }, [input, loading, messages, firstMsg])

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      send()
    }
  }

  return (
    <>
      {/* Nudge bubble */}
      {nudge && !open && (
        <div
          onClick={() => setOpen(true)}
          className="fixed bottom-24 right-6 z-40 bg-white border border-purple-100 shadow-xl rounded-2xl px-4 py-3 max-w-[220px] cursor-pointer animate-fade-in"
        >
          <p className="text-gray-800 text-sm font-medium leading-snug">Une question sur votre projet ? 💬</p>
          <button
            onClick={e => { e.stopPropagation(); setNudge(false) }}
            className="absolute -top-2 -right-2 w-5 h-5 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 hover:bg-gray-300 text-xs"
          >×</button>
        </div>
      )}

      {/* Chat window */}
      {open && (
        <div className="fixed bottom-24 right-4 z-50 w-[360px] max-w-[calc(100vw-2rem)] flex flex-col rounded-3xl shadow-2xl overflow-hidden border border-white/10"
          style={{ height: '520px' }}>

          {/* Header */}
          <div className="bg-gradient-to-r from-[#1a0b2e] to-purple-900 px-5 py-4 flex items-center gap-3 flex-shrink-0">
            <div className="w-9 h-9 rounded-xl bg-purple-500/30 border border-purple-400/30 flex items-center justify-center flex-shrink-0">
              <Zap className="w-4 h-4 text-purple-300" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white font-bold text-sm leading-none">Assistant Lightsofter</p>
              <div className="flex items-center gap-1.5 mt-1">
                <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                <span className="text-green-400 text-xs">En ligne</span>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="w-8 h-8 rounded-xl hover:bg-white/10 flex items-center justify-center text-white/60 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto bg-[#0f0a1e] px-4 py-4 space-y-3">
            {messages.map((msg, i) => (
              <div key={i} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                <div className={`max-w-[82%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-purple-600 text-white rounded-br-sm'
                    : 'bg-white/8 text-white/90 border border-white/8 rounded-bl-sm'
                }`}
                  style={{ background: msg.role === 'assistant' ? 'rgba(255,255,255,0.07)' : undefined }}
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
                <div className="bg-white/7 border border-white/8 rounded-2xl rounded-bl-sm px-4 py-3"
                  style={{ background: 'rgba(255,255,255,0.07)' }}>
                  <div className="flex gap-1 items-center">
                    <span className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Quick suggestions — only shown before first user message */}
          {firstMsg && (
            <div className="bg-[#0f0a1e] px-4 pb-2 flex gap-2 overflow-x-auto scrollbar-hide flex-shrink-0">
              {['Combien coûte un site ?', 'Délais de livraison ?', 'Voir les réalisations'].map(s => (
                <button
                  key={s}
                  onClick={() => { setInput(s); setTimeout(() => inputRef.current?.focus(), 50) }}
                  className="flex-shrink-0 text-xs text-purple-300 border border-purple-500/30 rounded-full px-3 py-1.5 hover:bg-purple-500/20 hover:border-purple-400/50 transition-all whitespace-nowrap"
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div className="bg-[#0f0a1e] border-t border-white/8 px-4 py-3 flex gap-2 flex-shrink-0">
            <input
              ref={inputRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder="Votre message..."
              maxLength={500}
              className="flex-1 bg-white/8 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm placeholder-white/30 focus:outline-none focus:border-purple-500/50 focus:bg-white/10 transition-all"
              style={{ background: 'rgba(255,255,255,0.07)' }}
            />
            <button
              onClick={send}
              disabled={!input.trim() || loading}
              className="w-10 h-10 rounded-xl bg-purple-600 hover:bg-purple-500 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center transition-all flex-shrink-0"
            >
              {loading ? <Loader2 className="w-4 h-4 text-white animate-spin" /> : <Send className="w-4 h-4 text-white" />}
            </button>
          </div>
        </div>
      )}

      {/* Trigger button */}
      <button
        onClick={() => setOpen(prev => !prev)}
        aria-label="Ouvrir le chat"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-600 to-violet-700 shadow-2xl shadow-purple-900/60 flex items-center justify-center hover:scale-105 active:scale-95 transition-all"
      >
        {open
          ? <X className="w-6 h-6 text-white" />
          : <MessageCircle className="w-6 h-6 text-white" />
        }
        {!open && nudge && (
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white animate-pulse" />
        )}
      </button>
    </>
  )
}
