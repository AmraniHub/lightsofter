'use client'

import { Star, Quote } from 'lucide-react'
import { useT } from './LangProvider'

export default function Testimonials() {
  const { t } = useT()

  const testimonials = [
    { name: t.testimonials.t1_name, role: t.testimonials.t1_role, city: t.testimonials.t1_city, flag: '🇫🇷', text: t.testimonials.t1_text, initial: 'M' },
    { name: t.testimonials.t2_name, role: t.testimonials.t2_role, city: t.testimonials.t2_city, flag: '🇧🇪', text: t.testimonials.t2_text, initial: 'T' },
    { name: t.testimonials.t3_name, role: t.testimonials.t3_role, city: t.testimonials.t3_city, flag: '🇫🇷', text: t.testimonials.t3_text, initial: 'S' },
  ]

  return (
    <section className="section-padding bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block bg-purple-100 text-purple-700 text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
            {t.testimonials.badge}
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">{t.testimonials.title}</h2>
          <p className="text-lg text-gray-500">{t.testimonials.sub}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((item) => (
            <div key={item.name} className="card-hover bg-white rounded-3xl border border-gray-100 shadow-sm p-8 flex flex-col">
              <Quote className="w-8 h-8 text-purple-200 mb-4" />
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-gray-600 text-sm leading-relaxed flex-1 mb-6 italic">&ldquo;{item.text}&rdquo;</p>
              <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                <div className="w-10 h-10 rounded-full bg-purple-700 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                  {item.initial}
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-sm">{item.name}</p>
                  <p className="text-gray-400 text-xs">{item.role} · {item.flag} {item.city}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
