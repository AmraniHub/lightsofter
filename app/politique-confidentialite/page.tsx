import Footer from '@/components/Footer'

export default function PolitiqueConfidentialitePage() {
  return (
    <>
      <div className="min-h-screen bg-white pt-28 pb-20">
        <div className="max-w-3xl mx-auto px-6 md:px-12">
          <h1 className="text-4xl font-black text-gray-900 mb-8">Politique de confidentialité</h1>
          <div className="space-y-6 text-gray-600 text-sm leading-relaxed">
            <p>
              Lightsofter s&apos;engage à protéger vos données personnelles conformément au Règlement
              Général sur la Protection des Données (RGPD).
            </p>
            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-2">Données collectées</h2>
              <p>
                Nous collectons les données que vous nous communiquez via le formulaire de contact :
                nom, email, téléphone, informations sur votre projet. Ces données sont utilisées
                uniquement pour traiter votre demande.
              </p>
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-2">Conservation</h2>
              <p>
                Vos données sont conservées pendant la durée nécessaire au traitement de votre
                demande et pendant 3 ans à des fins de gestion de la relation client.
              </p>
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-2">Vos droits</h2>
              <p>
                Vous disposez d&apos;un droit d&apos;accès, de rectification, d&apos;effacement et de portabilité
                de vos données. Pour exercer ces droits, contactez-nous à contact@lightsofter.com.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
