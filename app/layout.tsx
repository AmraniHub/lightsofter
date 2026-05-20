import type { Metadata } from 'next'
import Script from 'next/script'
import './globals.css'
import Navbar from '@/components/Navbar'
import WhatsAppButton from '@/components/WhatsAppButton'
import ScrollToTopButton from '@/components/ScrollToTopButton'
import ChatWidget from '@/components/ChatWidget'
import { LangProvider } from '@/components/LangProvider'

export const metadata: Metadata = {
  title: 'Lightsofter — Sites Web & Applications Mobiles | France & Belgique',
  description: 'Création de sites web professionnels et applications mobiles pour les PME en France et Belgique. Livraison en 2-3 jours, prix transparent, devis gratuit en 24h.',
  keywords: 'création site web PME France, agence web Belgique, application Android, développement web rapide, site vitrine professionnel',
  metadataBase: new URL('https://lightsofter.vercel.app'),
  alternates: { canonical: 'https://lightsofter.vercel.app' },
  openGraph: {
    title: 'Lightsofter — Sites Web & Apps en 2-3 jours',
    description: 'Votre site web professionnel livré en 2-3 jours. Sites, apps Android, web apps pour PME françaises et belges.',
    type: 'website',
    url: 'https://lightsofter.vercel.app',
    siteName: 'Lightsofter',
    images: [{ url: '/logo.png', width: 800, height: 800, alt: 'Lightsofter' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Lightsofter — Sites Web & Apps en 2-3 jours',
    description: 'Votre site web professionnel livré en 2-3 jours.',
    images: ['/logo.png'],
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
  icons: { icon: '/logo.png', apple: '/logo.png' },
}

const GA_ID = process.env.NEXT_PUBLIC_GA_ID

const schemaOrg = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': 'https://lightsofter.vercel.app/#organization',
      name: 'Lightsofter',
      url: 'https://lightsofter.vercel.app',
      logo: { '@type': 'ImageObject', url: 'https://lightsofter.vercel.app/logo.png' },
      description: 'Agence de création de sites web et applications mobiles pour les PME en France et Belgique.',
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+212627716149',
        contactType: 'customer service',
        availableLanguage: ['French', 'English'],
      },
      areaServed: ['FR', 'BE'],
      sameAs: ['https://github.com/AmraniHub'],
    },
    {
      '@type': 'WebSite',
      '@id': 'https://lightsofter.vercel.app/#website',
      url: 'https://lightsofter.vercel.app',
      name: 'Lightsofter',
      publisher: { '@id': 'https://lightsofter.vercel.app/#organization' },
      potentialAction: {
        '@type': 'SearchAction',
        target: { '@type': 'EntryPoint', urlTemplate: 'https://lightsofter.vercel.app/blog?q={search_term_string}' },
        'query-input': 'required name=search_term_string',
      },
    },
    {
      '@type': 'ProfessionalService',
      '@id': 'https://lightsofter.vercel.app/#service',
      name: 'Lightsofter — Création de sites web',
      image: 'https://lightsofter.vercel.app/logo.png',
      priceRange: '€€',
      areaServed: [{ '@type': 'Country', name: 'France' }, { '@type': 'Country', name: 'Belgium' }],
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Services de développement web',
        itemListElement: [
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Site Web Professionnel' }, price: '490', priceCurrency: 'EUR' },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Application Android' }, price: '990', priceCurrency: 'EUR' },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Application Web' }, price: '790', priceCurrency: 'EUR' },
        ],
      },
    },
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }}
        />
        {GA_ID && (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
            <Script id="ga4" strategy="afterInteractive">{`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_ID}', { page_path: window.location.pathname });
            `}</Script>
          </>
        )}
      </head>
      <body>
        <LangProvider>
          <Navbar />
          <main>{children}</main>
          <WhatsAppButton />
          <ScrollToTopButton />
          <ChatWidget />
        </LangProvider>
      </body>
    </html>
  )
}
