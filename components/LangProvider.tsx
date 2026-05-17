'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { translations, type Locale, type Translations } from '@/lib/i18n'

interface LangCtx {
  locale: Locale
  t: Translations
  setLocale: (l: Locale) => void
}

const LangContext = createContext<LangCtx>({
  locale: 'fr',
  t: translations.fr,
  setLocale: () => {},
})

function detectLocale(): Locale {
  if (typeof window === 'undefined') return 'fr'
  const saved = localStorage.getItem('lang') as Locale | null
  if (saved === 'fr' || saved === 'en') return saved
  const lang = navigator.language.toLowerCase()
  return lang.startsWith('fr') ? 'fr' : 'en'
}

export function LangProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('fr')

  useEffect(() => {
    setLocaleState(detectLocale())
  }, [])

  function setLocale(l: Locale) {
    setLocaleState(l)
    localStorage.setItem('lang', l)
  }

  return (
    <LangContext.Provider value={{ locale, t: translations[locale], setLocale }}>
      {children}
    </LangContext.Provider>
  )
}

export function useT() {
  return useContext(LangContext)
}
