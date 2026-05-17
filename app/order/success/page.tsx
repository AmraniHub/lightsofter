'use client'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'

function SuccessContent() {
  const params = useSearchParams()
  const sessionId = params.get('session_id')

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-sm border border-gray-100 p-10 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h1 className="text-2xl font-black text-gray-900 mb-3">Commande confirmée !</h1>
        <p className="text-gray-500 mb-6">
          Votre paiement a bien été reçu. Nous allons commencer la création de votre site immédiatement.
        </p>

        <div className="bg-purple-50 rounded-xl p-5 text-left space-y-2 mb-8">
          <p className="text-sm font-semibold text-purple-900">Prochaines étapes :</p>
          <p className="text-sm text-purple-700">✓ Vous recevrez un email de confirmation</p>
          <p className="text-sm text-purple-700">✓ Nous vous contactons sous 2h pour valider les détails</p>
          <p className="text-sm text-purple-700">✓ Votre site sera livré en 2-3 jours ouvrés</p>
        </div>

        {sessionId && (
          <p className="text-xs text-gray-400 mb-6">Référence : {sessionId.slice(-12).toUpperCase()}</p>
        )}

        <Link href="/"
          className="inline-block px-8 py-3 bg-purple-600 text-white font-semibold rounded-xl hover:bg-purple-700 transition">
          Retour à l'accueil
        </Link>
      </div>
    </main>
  )
}

export default function SuccessPage() {
  return (
    <Suspense>
      <SuccessContent />
    </Suspense>
  )
}
