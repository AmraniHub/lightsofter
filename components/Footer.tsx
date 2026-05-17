'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Mail, MapPin } from 'lucide-react'
import { useT } from './LangProvider'

export default function Footer() {
  const { t } = useT()

  const navLinks = [
    { href: '/#services', label: t.nav.services },
    { href: '/#realisations', label: t.nav.portfolio },
    { href: '/#pricing', label: t.nav.pricing },
  ]

  const legalLinks = [
    { href: '/mentions-legales', label: t.footer.legal },
    { href: '/politique-confidentialite', label: t.footer.privacy },
    { href: '/cgv', label: t.footer.terms },
    { href: '/politique-remboursement', label: t.footer.refund },
  ]

  return (
    <footer className="bg-gray-950 text-gray-400">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 py-16">
        <div className="grid md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2.5 w-fit">
              <Image src="/logo.png" alt="Lightsofter" width={34} height={34} className="rounded-xl opacity-90" />
              <span className="font-bold text-xl text-white">
                light<span className="text-purple-400">softer</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed max-w-sm">{t.footer.tagline}</p>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <Mail className="w-4 h-4 text-purple-400" />
                <a href="mailto:amrani4online@gmail.com" className="hover:text-white transition-colors">
                  amrani4online@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="w-4 h-4 text-purple-400" />
                <span>{t.footer.location}</span>
              </div>
            </div>
          </div>

          {/* Nav */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">{t.footer.nav_title}</h4>
            <ul className="space-y-2">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm hover:text-white transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">{t.footer.services_title}</h4>
            <ul className="space-y-2 text-sm">
              <li>{t.footer.s1}</li>
              <li>{t.footer.s2}</li>
              <li>{t.footer.s3}</li>
              <li>{t.footer.s4}</li>
              <li>{t.footer.s5}</li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs">
            © {new Date().getFullYear()} Lightsofter. {t.footer.rights}
          </p>
          <div className="flex gap-6">
            {legalLinks.map((l) => (
              <Link key={l.href} href={l.href} className="text-xs hover:text-white transition-colors">
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
