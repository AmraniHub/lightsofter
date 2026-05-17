import Footer from '@/components/Footer'

export default function CGVPage() {
  return (
    <>
      <div className="min-h-screen bg-white pt-28 pb-20">
        <div className="max-w-3xl mx-auto px-6 md:px-12">
          <h1 className="text-4xl font-black text-gray-900 mb-8">Conditions Générales de Vente</h1>
          <div className="space-y-6 text-gray-600 text-sm leading-relaxed">
            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-2">1. Objet</h2>
              <p>
                Les présentes CGV régissent les relations contractuelles entre Lightsofter et ses
                clients dans le cadre de la création de sites web et d&apos;applications.
              </p>
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-2">2. Commande et paiement</h2>
              <p>
                Un acompte de 50% est requis au démarrage du projet. Le solde de 50% est dû à la
                livraison. Le paiement s&apos;effectue par virement bancaire ou Wise.
              </p>
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-2">3. Délais de livraison</h2>
              <p>
                Les délais indiqués sont donnés à titre indicatif et courent à partir de la réception
                du brief complet et de l&apos;acompte. Lightsofter s&apos;engage à respecter ces délais sauf
                cas de force majeure ou retard dû au client.
              </p>
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-2">4. Révisions</h2>
              <p>
                Le nombre de révisions incluses est précisé dans chaque offre. Les révisions
                supplémentaires sont facturées à 50€/heure.
              </p>
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-2">5. Propriété intellectuelle</h2>
              <p>
                Les droits sur le site/application sont transférés au client dès le paiement intégral
                de la prestation. Lightsofter conserve le droit de mentionner le projet dans son portfolio.
              </p>
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-2">6. Contact</h2>
              <p>Pour toute question : contact@lightsofter.com</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
