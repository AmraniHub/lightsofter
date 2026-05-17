'use client'
import { useState } from 'react'

type Item = { q: string; a: string }

export default function FAQ({ faq }: { faq: Item[] }) {
  const [open, setOpen] = useState<number | null>(null)
  return (
    <section id="faq" className="py-24 bg-gray-50">
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-[var(--color-primary)] font-semibold text-sm uppercase tracking-widest">FAQ</span>
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 mt-3">Questions fréquentes</h2>
        </div>
        <div className="space-y-3">
          {faq.map((item, i) => (
            <div key={i} className="bg-white rounded-xl border border-gray-100 overflow-hidden">
              <button onClick={() => setOpen(open === i ? null : i)}
                className="w-full text-left px-6 py-5 flex justify-between items-center font-semibold text-gray-900 hover:text-[var(--color-primary)] transition-colors">
                {item.q}
                <span className={`text-xl transition-transform ${open === i ? 'rotate-45' : ''} text-[var(--color-primary)]`}>+</span>
              </button>
              {open === i && (
                <div className="px-6 pb-5 text-gray-600 leading-relaxed border-t border-gray-50 pt-4">
                  {item.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
