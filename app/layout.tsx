import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/Navbar'
import WhatsAppButton from '@/components/WhatsAppButton'

export const metadata: Metadata = {
  title: 'Lightsofter — Sites Web & Applications Mobiles',
  description: 'Création de sites web professionnels et applications mobiles pour les PME en France et Belgique. Livraison rapide, prix transparent.',
  keywords: 'création site web, application mobile, développement web, France, Belgique, PME',
  icons: {
    icon: '/logo.png',
    apple: '/logo.png',
  },
  openGraph: {
    title: 'Lightsofter — Sites Web & Apps en 5 jours',
    description: 'Votre site web professionnel livré en 5 jours. Sites, apps Android, web apps pour PME françaises et belges.',
    type: 'website',
    images: [{ url: '/logo.png' }],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body>
        <Navbar />
        <main>{children}</main>
        <WhatsAppButton />
      </body>
    </html>
  )
}
