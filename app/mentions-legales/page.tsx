'use client'
import Footer from '@/components/Footer'
import { useT } from '@/components/LangProvider'

const content = {
  fr: {
    title: 'Mentions légales',
    sections: [
      { h: 'Éditeur du site', p: 'Lightsofter — lightsofter.vercel.app' },
      { h: 'Hébergement', p: 'Ce site est hébergé par Vercel Inc., 340 Pine Street, San Francisco, CA 94104, USA.' },
      { h: 'Propriété intellectuelle', p: "L'ensemble des contenus présents sur ce site (textes, images, logos) sont la propriété exclusive de Lightsofter et sont protégés par les lois françaises et internationales relatives à la propriété intellectuelle." },
      { h: 'Données personnelles', p: "Les informations collectées via le formulaire de contact sont utilisées uniquement pour répondre à vos demandes. Elles ne sont pas transmises à des tiers. Conformément au RGPD, vous pouvez exercer votre droit d'accès, de rectification ou de suppression via notre formulaire de contact." },
    ],
  },
  en: {
    title: 'Legal Notice',
    sections: [
      { h: 'Publisher', p: 'Lightsofter — lightsofter.vercel.app' },
      { h: 'Hosting', p: 'This website is hosted by Vercel Inc., 340 Pine Street, San Francisco, CA 94104, USA.' },
      { h: 'Intellectual Property', p: 'All content on this website (text, images, logos) is the exclusive property of Lightsofter and is protected by French and international intellectual property laws.' },
      { h: 'Personal Data', p: 'Information collected via the contact form is used solely to respond to your requests. It is not shared with third parties. In accordance with GDPR, you may exercise your rights of access, rectification or deletion via our contact form.' },
    ],
  },
}

export default function MentionsLegalesPage() {
  const { locale } = useT()
  const c = content[locale as 'fr' | 'en'] ?? content.fr
  return (
    <>
      <div className="min-h-screen bg-white pt-28 pb-20">
        <div className="max-w-3xl mx-auto px-6 md:px-12 prose prose-gray">
          <h1 className="text-4xl font-black text-gray-900 mb-8">{c.title}</h1>
          <div className="space-y-6 text-gray-600 text-sm leading-relaxed">
            {c.sections.map(s => (
              <div key={s.h}>
                <h2 className="text-lg font-bold text-gray-900 mb-2">{s.h}</h2>
                <p>{s.p}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
