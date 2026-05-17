import Link from 'next/link'
import { Globe, Smartphone, LayoutDashboard, ArrowRight } from 'lucide-react'

const services = [
  {
    icon: Globe,
    title: 'Site Web Professionnel',
    description:
      'Site vitrine, e-commerce ou blog. Design moderne, rapide, optimisé SEO. Livré en 5 jours grâce à notre système de templates.',
    features: ['Design personnalisé', 'Mobile-first', 'SEO optimisé', 'Hébergement inclus 1 an'],
    delay: '3–5 jours',
    color: 'from-purple-500 to-purple-700',
    bg: 'bg-purple-50',
    border: 'border-purple-100',
  },
  {
    icon: Smartphone,
    title: 'Application Android',
    description:
      'Application mobile native Android pour votre business. De la prise de commande à la gestion client, on développe votre outil.',
    features: ['Android natif', 'Interface intuitive', 'Notifications push', 'Publication Play Store'],
    delay: '10–15 jours',
    color: 'from-violet-500 to-purple-600',
    bg: 'bg-violet-50',
    border: 'border-violet-100',
  },
  {
    icon: LayoutDashboard,
    title: 'Application Web',
    description:
      'Plateforme web sur mesure : dashboard, CRM, outil interne, SaaS. Interface moderne et logique métier adaptée à vos besoins.',
    features: ['Interface admin', 'Base de données', 'API intégrée', 'Accès multi-utilisateurs'],
    delay: '7–14 jours',
    color: 'from-fuchsia-500 to-purple-600',
    bg: 'bg-fuchsia-50',
    border: 'border-fuchsia-100',
  },
]

export default function Services() {
  return (
    <section id="services" className="section-padding bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block bg-purple-100 text-purple-700 text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
            Nos services
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
            Ce qu&apos;on crée pour vous
          </h2>
          <p className="text-lg text-gray-500">
            Des solutions digitales complètes pour votre entreprise, livrées rapidement et sans prise de tête.
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {services.map((s) => (
            <div
              key={s.title}
              className={`card-hover rounded-3xl border ${s.border} ${s.bg} p-8 flex flex-col`}
            >
              {/* Icon */}
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${s.color} flex items-center justify-center mb-6 shadow-lg`}>
                <s.icon className="w-7 h-7 text-white" />
              </div>

              {/* Badge */}
              <span className="inline-block text-xs font-semibold text-purple-700 bg-white border border-purple-200 rounded-full px-3 py-1 mb-4 w-fit">
                Délai : {s.delay}
              </span>

              <h3 className="text-xl font-bold text-gray-900 mb-3">{s.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-6 flex-1">{s.description}</p>

              {/* Features */}
              <ul className="space-y-2 mb-8">
                {s.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-gray-600">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-500 flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>

              <Link
                href="/contact"
                className="flex items-center gap-2 text-purple-700 font-semibold text-sm hover:gap-3 transition-all"
              >
                Demander un devis <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
