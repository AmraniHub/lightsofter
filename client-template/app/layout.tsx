import type { Metadata } from 'next'
import './globals.css'
import cfg from '../site-config.json'

export const metadata: Metadata = {
  title: cfg.meta.title,
  description: cfg.meta.description,
  keywords: cfg.meta.keywords,
  openGraph: {
    title: cfg.meta.title,
    description: cfg.meta.description,
    type: 'website',
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang={cfg.business.country === 'FR' || cfg.business.country === 'BE' ? 'fr' : 'en'}>
      <head>
        <style>{`
          :root {
            --color-primary: ${cfg.design.primaryColor};
            --color-accent: ${cfg.design.accentColor};
          }
        `}</style>
      </head>
      <body className="antialiased text-gray-900">{children}</body>
    </html>
  )
}
