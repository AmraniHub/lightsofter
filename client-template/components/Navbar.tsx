'use client'
import { useState, useEffect } from 'react'
import cfg from '../site-config.json'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const links = [
    { href: '#services', label: 'Services' },
    { href: '#about', label: 'À propos' },
    { href: '#faq', label: 'FAQ' },
    { href: '#contact', label: 'Contact' },
  ]

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-sm border-b border-gray-100' : 'bg-transparent'}`}>
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#" className={`font-black text-xl ${scrolled ? 'text-gray-900' : 'text-white'}`}>
          {cfg.business.name}
        </a>
        <nav className="hidden md:flex items-center gap-8">
          {links.map(l => (
            <a key={l.href} href={l.href} className={`text-sm font-medium transition-colors ${scrolled ? 'text-gray-600 hover:text-[var(--color-primary)]' : 'text-white/80 hover:text-white'}`}>
              {l.label}
            </a>
          ))}
        </nav>
        <a href="#contact" className="hidden md:inline-flex btn-primary text-sm py-2.5 px-5">
          Nous contacter
        </a>
        <button className="md:hidden p-2" onClick={() => setOpen(!open)}>
          <span className={`block w-5 h-0.5 mb-1 transition-all ${scrolled ? 'bg-gray-800' : 'bg-white'}`} />
          <span className={`block w-5 h-0.5 mb-1 ${scrolled ? 'bg-gray-800' : 'bg-white'}`} />
          <span className={`block w-5 h-0.5 ${scrolled ? 'bg-gray-800' : 'bg-white'}`} />
        </button>
      </div>
      {open && (
        <div className="md:hidden bg-white border-t px-6 py-4 flex flex-col gap-4">
          {links.map(l => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="text-gray-700 font-medium py-1">{l.label}</a>
          ))}
          <a href="#contact" onClick={() => setOpen(false)} className="btn-primary text-sm text-center mt-2">Nous contacter</a>
        </div>
      )}
    </header>
  )
}
