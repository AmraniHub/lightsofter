import Footer from '@/components/Footer'

export default function MentionsLegalesPage() {
  return (
    <>
      <div className="min-h-screen bg-white pt-28 pb-20">
        <div className="max-w-3xl mx-auto px-6 md:px-12 prose prose-gray">
          <h1 className="text-4xl font-black text-gray-900 mb-8">Mentions légales</h1>
          <div className="space-y-6 text-gray-600 text-sm leading-relaxed">
            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-2">Éditeur du site</h2>
              <p>Lightsofter — amrani4online@gmail.com</p>
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-2">Hébergement</h2>
              <p>Ce site est hébergé par Vercel Inc., 340 Pine Street, San Francisco, CA 94104, USA.</p>
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-2">Propriété intellectuelle</h2>
              <p>
                L&apos;ensemble des contenus présents sur ce site (textes, images, logos) sont la propriété
                exclusive de Lightsofter et sont protégés par les lois françaises et internationales
                relatives à la propriété intellectuelle.
              </p>
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-2">Données personnelles</h2>
              <p>
                Les informations collectées via le formulaire de contact sont utilisées uniquement
                pour répondre à vos demandes. Elles ne sont pas transmises à des tiers.
                Conformément au RGPD, vous pouvez exercer votre droit d&apos;accès, de rectification
                ou de suppression en contactant amrani4online@gmail.com.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
