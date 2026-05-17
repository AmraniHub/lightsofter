'use client'
import Footer from '@/components/Footer'
import { useT } from '@/components/LangProvider'

const content = {
  fr: {
    title: 'Politique de confidentialité',
    intro: "Lightsofter s'engage à protéger vos données personnelles conformément au Règlement Général sur la Protection des Données (RGPD).",
    sections: [
      { h: 'Données collectées', p: "Nous collectons les données que vous nous communiquez via le formulaire de contact : nom, email, téléphone, informations sur votre projet. Ces données sont utilisées uniquement pour traiter votre demande." },
      { h: 'Conservation', p: "Vos données sont conservées pendant la durée nécessaire au traitement de votre demande et pendant 3 ans à des fins de gestion de la relation client." },
      { h: 'Vos droits', p: "Vous disposez d'un droit d'accès, de rectification, d'effacement et de portabilité de vos données. Pour exercer ces droits, contactez-nous à amrani4online@gmail.com." },
      { h: 'Cookies', p: "Ce site utilise des cookies analytiques (Google Analytics 4) pour mesurer l'audience. Vous pouvez les refuser en utilisant les paramètres de votre navigateur." },
    ],
  },
  en: {
    title: 'Privacy Policy',
    intro: 'Lightsofter is committed to protecting your personal data in accordance with the General Data Protection Regulation (GDPR).',
    sections: [
      { h: 'Data collected', p: 'We collect data you provide via the contact form: name, email, phone, project details. This data is used solely to process your request.' },
      { h: 'Retention', p: 'Your data is retained for as long as necessary to handle your request and for 3 years for client relationship management purposes.' },
      { h: 'Your rights', p: 'You have the right to access, correct, delete and export your data. To exercise these rights, contact us at amrani4online@gmail.com.' },
      { h: 'Cookies', p: 'This site uses analytical cookies (Google Analytics 4) to measure audience. You can refuse them via your browser settings.' },
    ],
  },
}

export default function PolitiqueConfidentialitePage() {
  const { locale } = useT()
  const c = content[locale as 'fr' | 'en'] ?? content.fr
  return (
    <>
      <div className="min-h-screen bg-white pt-28 pb-20">
        <div className="max-w-3xl mx-auto px-6 md:px-12">
          <h1 className="text-4xl font-black text-gray-900 mb-8">{c.title}</h1>
          <div className="space-y-6 text-gray-600 text-sm leading-relaxed">
            <p>{c.intro}</p>
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
