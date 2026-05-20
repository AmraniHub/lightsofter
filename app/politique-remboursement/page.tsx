'use client'
import Footer from '@/components/Footer'
import { useT } from '@/components/LangProvider'

const content = {
  fr: {
    title: 'Politique de remboursement',
    updated: 'Dernière mise à jour : mai 2025',
    sections: [
      {
        h: '1. Principe général',
        p: "Chez Lightsofter, nous nous engageons à livrer des sites web et applications conformes au cahier des charges validé par le client. Notre politique de remboursement est conçue pour être équitable et transparente.",
      },
      {
        h: '2. Acompte de démarrage',
        p: "Un acompte de 50% du montant total est requis avant le début du projet. Cet acompte couvre le travail de conception, de planification et les ressources mobilisées au démarrage.",
        bullets: [
          "Annulation avant démarrage (dans les 24h) : remboursement intégral de l'acompte.",
          "Annulation après démarrage : l'acompte n'est pas remboursable car le travail a été engagé.",
        ],
      },
      {
        h: '3. Solde final (50%)',
        p: "Le solde est dû à la livraison du projet. Il n'est pas remboursable une fois la livraison effectuée et validée par le client.",
      },
      {
        h: '4. Retard de livraison imputable à Lightsofter',
        p: "Si Lightsofter ne respecte pas le délai de livraison contractuel sans raison valable, le client peut :",
        bullets: [
          'Demander une réduction de 10% sur le solde restant dû, ou',
          "Annuler la commande et obtenir le remboursement intégral de l'acompte versé.",
        ],
      },
      {
        h: '5. Non-conformité du livrable',
        p: "Si le livrable ne correspond pas aux spécifications convenues, Lightsofter s'engage à corriger les points de non-conformité sans frais supplémentaires dans un délai de 7 jours ouvrés. Si les corrections ne sont pas satisfaisantes après deux tentatives, un remboursement partiel peut être négocié.",
      },
      {
        h: '6. Cas exclus du remboursement',
        bullets: [
          "Changements de direction ou de scope demandés par le client après démarrage.",
          "Retards causés par l'absence de fourniture de contenus (textes, images, accès) par le client.",
          "Insatisfaction subjective non liée au cahier des charges validé.",
          "Services d'hébergement ou de nom de domaine souscrits pour le compte du client.",
        ],
      },
      {
        h: '7. Procédure de remboursement',
        p: "Contactez-nous via le formulaire sur lightsofter.vercel.app/contact avec l'objet \"Demande de remboursement — [votre nom]\". Nous répondons sous 48h ouvrées et traitons les remboursements éligibles sous 5 à 10 jours ouvrés.",
      },
    ],
    cta_title: 'Un problème ? Contactez-nous d\'abord.',
    cta_sub: 'La grande majorité des situations se règlent à l\'amiable rapidement. Nous sommes disponibles par WhatsApp, email et appel vidéo.',
  },
  en: {
    title: 'Refund Policy',
    updated: 'Last updated: May 2025',
    sections: [
      {
        h: '1. General principle',
        p: 'Lightsofter is committed to delivering websites and applications that meet the agreed specifications. Our refund policy is designed to be fair and transparent.',
      },
      {
        h: '2. Initial deposit',
        p: 'A 50% deposit of the total amount is required before the project begins. This deposit covers design, planning and resources mobilised at the start.',
        bullets: [
          'Cancellation before start (within 24h): full refund of the deposit.',
          'Cancellation after start: the deposit is non-refundable as work has been engaged.',
        ],
      },
      {
        h: '3. Final balance (50%)',
        p: 'The balance is due upon delivery. It is non-refundable once delivery has been completed and validated by the client.',
      },
      {
        h: '4. Late delivery attributable to Lightsofter',
        p: 'If Lightsofter fails to meet the contractual delivery deadline without valid reason, the client may:',
        bullets: [
          'Request a 10% reduction on the remaining balance, or',
          'Cancel the order and receive a full refund of the deposit paid.',
        ],
      },
      {
        h: '5. Non-conformity of deliverable',
        p: "If the deliverable does not match the agreed specifications, Lightsofter will correct the non-conformities at no extra cost within 7 business days. If corrections are not satisfactory after two attempts, a partial refund may be negotiated.",
      },
      {
        h: '6. Cases excluded from refunds',
        bullets: [
          'Direction or scope changes requested by the client after project start.',
          'Delays caused by the client failing to provide content (text, images, access).',
          'Subjective dissatisfaction not linked to the agreed specifications.',
          'Hosting or domain name services subscribed on behalf of the client.',
        ],
      },
      {
        h: '7. Refund procedure',
        p: 'Contact us via the form at lightsofter.vercel.app/contact with the subject "Refund request — [your name]". We respond within 48 business hours and process eligible refunds within 5–10 business days.',
      },
    ],
    cta_title: 'Have an issue? Contact us first.',
    cta_sub: 'The vast majority of situations are resolved quickly and amicably. We are available via WhatsApp, email and video call.',
  },
}

export default function PolitiqueRemboursementPage() {
  const { locale } = useT()
  const c = content[locale as 'fr' | 'en'] ?? content.fr
  return (
    <>
      <div className="min-h-screen bg-white pt-28 pb-20">
        <div className="max-w-3xl mx-auto px-6 md:px-12">
          <h1 className="text-4xl font-black text-gray-900 mb-2">{c.title}</h1>
          <p className="text-gray-400 text-sm mb-10">{c.updated}</p>
          <div className="space-y-8 text-gray-600 text-sm leading-relaxed">
            {c.sections.map(s => (
              <div key={s.h}>
                <h2 className="text-lg font-bold text-gray-900 mb-3">{s.h}</h2>
                {s.p && <p>{s.p}</p>}
                {s.bullets && (
                  <ul className="mt-3 space-y-2 list-disc list-inside text-gray-500">
                    {s.bullets.map(b => <li key={b}>{b}</li>)}
                  </ul>
                )}
              </div>
            ))}
            <div className="bg-purple-50 border border-purple-100 rounded-2xl p-6">
              <p className="text-purple-800 font-semibold mb-1">{c.cta_title}</p>
              <p className="text-purple-600 text-xs">{c.cta_sub}</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
