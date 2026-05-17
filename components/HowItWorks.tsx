import { FileText, Paintbrush, Rocket } from 'lucide-react'

const steps = [
  {
    number: '01',
    icon: FileText,
    title: 'Vous remplissez le brief',
    description:
      'Un formulaire simple en 5 minutes : votre secteur, vos couleurs, vos contenus, vos objectifs. Pas besoin d\'être expert.',
    color: 'bg-purple-100 text-purple-700',
  },
  {
    number: '02',
    icon: Paintbrush,
    title: 'On crée votre design',
    description:
      'Notre équipe génère une maquette en 24–48h grâce à notre système de templates. Vous validez, on ajuste.',
    color: 'bg-violet-100 text-violet-700',
  },
  {
    number: '03',
    icon: Rocket,
    title: 'On livre et on publie',
    description:
      'Votre site ou app est livré, testé et mis en ligne. Vous recevez accès complet. On reste disponibles pour le support.',
    color: 'bg-fuchsia-100 text-fuchsia-700',
  },
]

export default function HowItWorks() {
  return (
    <section className="section-padding bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block bg-purple-100 text-purple-700 text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
            Comment ça marche
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
            Simple comme bonjour
          </h2>
          <p className="text-lg text-gray-500">
            3 étapes, pas plus. Vous n&apos;avez pas besoin de connaissances techniques.
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connector line */}
          <div className="hidden md:block absolute top-20 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-purple-200 via-violet-300 to-fuchsia-200" />

          <div className="grid md:grid-cols-3 gap-10">
            {steps.map((s, i) => (
              <div key={s.title} className="relative flex flex-col items-center text-center">
                {/* Step number badge */}
                <div className="relative mb-6">
                  <div className={`w-16 h-16 rounded-2xl ${s.color} flex items-center justify-center shadow-md`}>
                    <s.icon className="w-8 h-8" />
                  </div>
                  <span className="absolute -top-2 -right-2 w-6 h-6 bg-purple-700 text-white rounded-full text-xs font-bold flex items-center justify-center">
                    {i + 1}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-3">{s.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed max-w-xs">{s.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Speed callout */}
        <div className="mt-16 bg-purple-700 rounded-3xl p-8 md:p-12 text-center text-white">
          <p className="text-lg font-medium text-purple-200 mb-2">Notre avantage clé</p>
          <h3 className="text-3xl md:text-4xl font-black mb-4">
            Grâce à notre système de templates, votre site est prêt en{' '}
            <span className="text-yellow-300">2× plus vite</span> qu&apos;une agence classique.
          </h3>
          <p className="text-purple-200 max-w-xl mx-auto">
            Pas de longues réunions, pas d&apos;attente. On a automatisé ce qui peut l&apos;être pour vous
            livrer plus vite, sans sacrifier la qualité.
          </p>
        </div>
      </div>
    </section>
  )
}
