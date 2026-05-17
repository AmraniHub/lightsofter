import Footer from '@/components/Footer'

export const metadata = {
  title: 'Politique de remboursement — Lightsofter',
  description: 'Conditions de remboursement et annulation pour les prestations Lightsofter.',
}

export default function PolitiqueRemboursementPage() {
  return (
    <>
      <div className="min-h-screen bg-white pt-28 pb-20">
        <div className="max-w-3xl mx-auto px-6 md:px-12">
          <h1 className="text-4xl font-black text-gray-900 mb-2">Politique de remboursement</h1>
          <p className="text-gray-400 text-sm mb-10">Dernière mise à jour : mai 2025</p>

          <div className="space-y-8 text-gray-600 text-sm leading-relaxed">

            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-3">1. Principe général</h2>
              <p>
                Chez Lightsofter, nous nous engageons à livrer des sites web et applications conformes
                au cahier des charges validé par le client. Notre politique de remboursement est
                conçue pour être équitable et transparente.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-3">2. Acompte de démarrage</h2>
              <p>
                Un acompte de <strong className="text-gray-900">50% du montant total</strong> est requis avant le début du projet.
                Cet acompte couvre le travail de conception, de planification et les ressources
                mobilisées au démarrage.
              </p>
              <ul className="mt-3 space-y-2 list-disc list-inside text-gray-500">
                <li>
                  <strong className="text-gray-700">Annulation avant démarrage (dans les 24h)</strong> : remboursement intégral de l&apos;acompte.
                </li>
                <li>
                  <strong className="text-gray-700">Annulation après démarrage</strong> : l&apos;acompte n&apos;est pas remboursable car le travail a été engagé.
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-3">3. Solde final (50%)</h2>
              <p>
                Le solde est dû à la livraison du projet. Il n&apos;est pas remboursable une fois la
                livraison effectuée et validée par le client. En cas de litige sur la conformité
                du livrable, voir l&apos;article 5.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-3">4. Retard de livraison imputable à Lightsofter</h2>
              <p>
                Si Lightsofter ne respecte pas le délai de livraison contractuel sans raison valable
                (hors force majeure ou retard dû au client), le client peut :
              </p>
              <ul className="mt-3 space-y-2 list-disc list-inside text-gray-500">
                <li>Demander une réduction de 10% sur le solde restant dû, ou</li>
                <li>Annuler la commande et obtenir le remboursement intégral de l&apos;acompte versé.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-3">5. Non-conformité du livrable</h2>
              <p>
                Si le livrable ne correspond pas aux spécifications convenues dans le brief validé,
                Lightsofter s&apos;engage à corriger les points de non-conformité sans frais
                supplémentaires dans un délai de <strong className="text-gray-900">7 jours ouvrés</strong>.
              </p>
              <p className="mt-2">
                Si les corrections ne sont pas satisfaisantes après deux tentatives, un remboursement
                partiel peut être négocié en fonction de l&apos;avancement des travaux.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-3">6. Cas exclus du remboursement</h2>
              <ul className="space-y-2 list-disc list-inside text-gray-500">
                <li>Changements de direction ou de scope demandés par le client après démarrage.</li>
                <li>Retards causés par l&apos;absence de fourniture de contenus (textes, images, accès) par le client.</li>
                <li>Insatisfaction subjective non liée au cahier des charges validé.</li>
                <li>Services d&apos;hébergement ou de nom de domaine souscrits pour le compte du client.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-3">7. Procédure de demande de remboursement</h2>
              <p>Pour toute demande, contactez-nous :</p>
              <ul className="mt-3 space-y-2 list-disc list-inside text-gray-500">
                <li>
                  Par email à{' '}
                  <a href="mailto:amrani4online@gmail.com" className="text-purple-700 hover:underline font-medium">
                    amrani4online@gmail.com
                  </a>{' '}
                  avec l&apos;objet <em>"Demande de remboursement — [votre nom]"</em>
                </li>
                <li>
                  Par WhatsApp au{' '}
                  <a href="https://wa.me/212627716149" target="_blank" rel="noopener noreferrer" className="text-purple-700 hover:underline font-medium">
                    +212 627 716 149
                  </a>
                </li>
              </ul>
              <p className="mt-3">
                Nous nous engageons à répondre dans les <strong className="text-gray-900">48 heures ouvrées</strong> et
                à traiter les remboursements éligibles sous <strong className="text-gray-900">5 à 10 jours ouvrés</strong> via
                le même moyen de paiement utilisé lors de la commande.
              </p>
            </div>

            <div className="bg-purple-50 border border-purple-100 rounded-2xl p-6">
              <p className="text-purple-800 font-semibold mb-1">Un problème ? Contactez-nous d&apos;abord.</p>
              <p className="text-purple-600 text-xs">
                La grande majorité des situations se règlent à l&apos;amiable rapidement.
                Nous sommes disponibles par WhatsApp, email et appel vidéo pour trouver la meilleure solution.
              </p>
            </div>

          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
