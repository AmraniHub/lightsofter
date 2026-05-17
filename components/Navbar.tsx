'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { useT } from './LangProvider'
import LangSwitcher from './LangSwitcher'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { t } = useT()
  const pathname = usePathname()
  const isHome = pathname === '/'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // On non-home pages always use the dark/scrolled style
  const dark = !isHome || scrolled

  const links = [
    { href: '/#services', label: t.nav.services },
    { href: '/#realisations', label: t.nav.portfolio },
    { href: '/#pricing', label: t.nav.pricing },
    { href: '/blog', label: t.nav.blog },
    { href: '/about', label: t.nav.about },
  ]

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      dark ? 'bg-white/95 backdrop-blur-sm shadow-sm border-b border-purple-100' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 h-18 flex items-center justify-between py-4">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <Image src="/logo.png" alt="Lightsofter logo" width={36} height={36} className="rounded-xl shadow-md group-hover:opacity-90 transition-opacity" priority />
          <span className={`font-bold text-xl transition-colors duration-300 ${dark ? 'text-gray-900' : 'text-white'}`}>
            light<span className={dark ? 'text-purple-700' : 'text-purple-400'}>softer</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map(l => (
            <Link key={l.href} href={l.href} className={`font-medium transition-colors text-sm ${dark ? 'text-gray-600 hover:text-purple-700' : 'text-white/70 hover:text-white'}`}>
              {l.label}
            </Link>
          ))}
        </nav>

        {/* Right: lang + CTA */}
        <div className="hidden md:flex items-center gap-3">
          <LangSwitcher />
          <Link href="/contact" className={`text-sm font-medium transition-colors ${dark ? 'text-gray-600 hover:text-purple-700' : 'text-white/70 hover:text-white'}`}>
            {t.nav.cta}
          </Link>
          <Link href="/order" className="btn-primary text-sm py-3 px-6">
            Commander →
          </Link>
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden p-2 rounded-lg transition-colors" onClick={() => setOpen(!open)} aria-label="Menu">
          {open ? <X className={`w-5 h-5 ${dark ? 'text-gray-700' : 'text-white'}`} /> : <Menu className={`w-5 h-5 ${dark ? 'text-gray-700' : 'text-white'}`} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-white border-t border-purple-100 px-6 py-6 flex flex-col gap-4 shadow-lg">
          {links.map(l => (
            <Link key={l.href} href={l.href} onClick={() => setOpen(false)} className="text-gray-700 hover:text-purple-700 font-medium py-2 border-b border-gray-100 transition-colors">
              {l.label}
            </Link>
          ))}
          <div className="flex items-center justify-between mt-2">
            <LangSwitcher />
            <div className="flex gap-2">
              <Link href="/contact" onClick={() => setOpen(false)} className="text-sm font-medium text-gray-600 hover:text-purple-700 py-3 px-4 transition-colors">
                {t.nav.cta}
              </Link>
              <Link href="/order" onClick={() => setOpen(false)} className="btn-primary text-sm py-3 px-5">
                Commander →
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
