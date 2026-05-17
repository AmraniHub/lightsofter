'use client'

import Link from 'next/link'
import Footer from '@/components/Footer'
import { ArrowRight, Zap, Users, Globe, Clock } from 'lucide-react'
import { useT } from '@/components/LangProvider'

export default function AboutPage() {
  const { t } = useT()
  const a = t.about

  const values = [
    { icon: Clock,  title: a.v1_title, description: a.v1_desc },
    { icon: Globe,  title: a.v2_title, description: a.v2_desc },
    { icon: Users,  title: a.v3_title, description: a.v3_desc },
    { icon: Zap,    title: a.v4_title, description: a.v4_desc },
  ]

  return (
    <>
      <div className="min-h-screen bg-white pt-28 pb-0">
        {/* Hero */}
        <div className="max-w-5xl mx-auto px-6 md:px-12 py-16 text-center">
          <span className="inline-block bg-purple-100 text-purple-700 text-sm font-semibold px-4 py-1.5 rounded-full mb-6">
            {a.badge}
          </span>
          <h1 className="text-5xl md:text-6xl font-black text-gray-900 mb-6">
            {a.h1}<br />
            <span className="text-gradient">{a.h1b}</span>
          </h1>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">{a.sub}</p>
        </div>

        {/* Story */}
        <div className="bg-purple-50 py-20">
          <div className="max-w-3xl mx-auto px-6 md:px-12">
            <h2 className="text-3xl font-black text-gray-900 mb-6">{a.story_title}</h2>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>{a.story_p1}</p>
              <p>{a.story_p2}</p>
              <p>{a.story_p3}</p>
            </div>
          </div>
        </div>

        {/* Values */}
        <div className="max-w-5xl mx-auto px-6 md:px-12 py-20">
          <h2 className="text-3xl font-black text-gray-900 mb-12 text-center">{a.values_title}</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {values.map((v) => (
              <div key={v.title} className="flex gap-5">
                <div className="w-12 h-12 bg-purple-100 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <v.icon className="w-6 h-6 text-purple-700" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">{v.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{v.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-purple-700 py-16">
          <div className="max-w-3xl mx-auto px-6 text-center">
            <h2 className="text-3xl font-black text-white mb-4">{a.cta_title}</h2>
            <p className="text-purple-200 mb-8">{a.cta_sub}</p>
            <Link href="/contact" className="inline-flex items-center gap-2 bg-white text-purple-700 font-bold px-8 py-4 rounded-2xl hover:bg-purple-50 transition-all">
              {a.cta_btn} <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
