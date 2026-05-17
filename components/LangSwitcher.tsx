'use client'

import { useT } from './LangProvider'

export default function LangSwitcher() {
  const { locale, setLocale } = useT()

  return (
    <div className="flex items-center gap-1 bg-gray-100 rounded-full p-1">
      <button
        onClick={() => setLocale('fr')}
        className={`text-xs font-bold px-3 py-1.5 rounded-full transition-all duration-200 ${
          locale === 'fr'
            ? 'bg-white text-purple-700 shadow-sm'
            : 'text-gray-500 hover:text-gray-700'
        }`}
        aria-label="Français"
      >
        FR
      </button>
      <button
        onClick={() => setLocale('en')}
        className={`text-xs font-bold px-3 py-1.5 rounded-full transition-all duration-200 ${
          locale === 'en'
            ? 'bg-white text-purple-700 shadow-sm'
            : 'text-gray-500 hover:text-gray-700'
        }`}
        aria-label="English"
      >
        EN
      </button>
    </div>
  )
}
