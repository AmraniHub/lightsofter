'use client'
import Footer from '@/components/Footer'
import { useT } from '@/components/LangProvider'

const content = {
  fr: {
    title: 'Conditions Générales de Vente',
    sections: [
      { h: '1. Objet', p: "Les présentes CGV régissent les relations contractuelles entre Lightsofter et ses clients dans le cadre de la création de sites web et d'applications." },
      { h: '2. Commande et paiement', p: "Un acompte de 50% est requis au démarrage du projet. Le solde de 50% est dû à la livraison. Le paiement s'effectue par virement bancaire ou Wise." },
      { h: '3. Délais de livraison', p: "Les délais indiqués sont donnés à titre indicatif et courent à partir de la réception du brief complet et de l'acompte. Lightsofter s'engage à respecter ces délais sauf cas de force majeure ou retard dû au client." },
      { h: '4. Révisions', p: "Le nombre de révisions incluses est précisé dans chaque offre. Les révisions supplémentaires sont facturées à 50€/heure." },
      { h: '5. Propriété intellectuelle', p: "Les droits sur le site/application sont transférés au client dès le paiement intégral de la prestation. Lightsofter conserve le droit de mentionner le projet dans son portfolio." },
      { h: '6. Contact', p: 'Pour toute question : amrani4online@gmail.com' },
    ],
  },
  en: {
    title: 'General Terms and Conditions of Sale',
    sections: [
      { h: '1. Purpose', p: 'These terms govern the contractual relationship between Lightsofter and its clients for website and application development services.' },
      { h: '2. Order and payment', p: 'A 50% deposit is required at project start. The remaining 50% is due upon delivery. Payment is made by bank transfer or Wise.' },
      { h: '3. Delivery timelines', p: 'Stated timelines are indicative and begin upon receipt of the complete brief and deposit. Lightsofter commits to meeting these deadlines except in cases of force majeure or client-caused delays.' },
      { h: '4. Revisions', p: 'The number of revisions included is specified in each offer. Additional revisions are billed at €50/hour.' },
      { h: '5. Intellectual property', p: 'Rights to the site/application are transferred to the client upon full payment. Lightsofter retains the right to reference the project in its portfolio.' },
      { h: '6. Contact', p: 'For any questions: amrani4online@gmail.com' },
    ],
  },
}

export default function CGVPage() {
  const { locale } = useT()
  const c = content[locale as 'fr' | 'en'] ?? content.fr
  return (
    <>
      <div className="min-h-screen bg-white pt-28 pb-20">
        <div className="max-w-3xl mx-auto px-6 md:px-12">
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
