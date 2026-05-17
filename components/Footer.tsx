import Link from 'next/link'
import { Zap, Mail, MapPin } from 'lucide-react'

const navLinks = [
  { href: '/#services', label: 'Services' },
  { href: '/#portfolio', label: 'Portfolio' },
  { href: '/#pricing', label: 'Tarifs' },
  { href: '/about', label: 'À propos' },
  { href: '/contact', label: 'Contact' },
]

const legalLinks = [
  { href: '/mentions-legales', label: 'Mentions légales' },
  { href: '/politique-confidentialite', label: 'Confidentialité' },
  { href: '/cgv', label: 'CGV' },
]

export default function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-400">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 py-16">
        <div className="grid md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2 w-fit">
              <div className="w-9 h-9 bg-purple-700 rounded-xl flex items-center justify-center">
                <Zap className="w-5 h-5 text-white fill-white" />
              </div>
              <span className="font-bold text-xl text-white">
                light<span className="text-purple-400">softer</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed max-w-sm">
              Création de sites web et applications mobiles pour les PME en France et Belgique.
              Livraison rapide, qualité professionnelle.
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <Mail className="w-4 h-4 text-purple-400" />
                <a href="mailto:contact@lightsofter.com" className="hover:text-white transition-colors">
                  contact@lightsofter.com
                </a>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="w-4 h-4 text-purple-400" />
                <span>France · Belgique · À distance</span>
              </div>
            </div>
          </div>

          {/* Nav */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Navigation</h4>
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
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Services</h4>
            <ul className="space-y-2 text-sm">
              <li>Site web vitrine</li>
              <li>E-commerce</li>
              <li>Application Android</li>
              <li>Application web</li>
              <li>Refonte de site</li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs">
            © {new Date().getFullYear()} Lightsofter. Tous droits réservés.
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
