import { Star, Quote } from 'lucide-react'

const testimonials = [
  {
    name: 'Marie Lefebvre',
    role: 'Gérante, Restaurant Le Provençal',
    city: 'Paris',
    flag: '🇫🇷',
    text: 'Site livré en 4 jours, exactement comme demandé. Depuis, nos réservations en ligne ont explosé. Je recommande sans hésiter — équipe réactive et professionnelle.',
    rating: 5,
    initial: 'M',
  },
  {
    name: 'Thomas Dubois',
    role: 'Directeur, Pharmacie Dubois',
    city: 'Bruxelles',
    flag: '🇧🇪',
    text: 'Notre application Android a transformé notre gestion des ordonnances. Le délai annoncé a été respecté, le résultat dépasse nos attentes. Excellent travail !',
    rating: 5,
    initial: 'T',
  },
  {
    name: 'Sophie Martin',
    role: 'Notaire associée',
    city: 'Lyon',
    flag: '🇫🇷',
    text: 'Très professionnel. Le brief a été bien compris du premier coup, les révisions étaient rapides. Notre cabinet a enfin une présence web digne de ce nom.',
    rating: 5,
    initial: 'S',
  },
]

export default function Testimonials() {
  return (
    <section className="section-padding bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block bg-purple-100 text-purple-700 text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
            Témoignages
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
            Ce que disent nos clients
          </h2>
          <p className="text-lg text-gray-500">
            Des entrepreneurs réels, des résultats concrets.
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="card-hover bg-white rounded-3xl border border-gray-100 shadow-sm p-8 flex flex-col"
            >
              {/* Quote icon */}
              <Quote className="w-8 h-8 text-purple-200 mb-4" />

              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              {/* Text */}
              <p className="text-gray-600 text-sm leading-relaxed flex-1 mb-6 italic">
                &ldquo;{t.text}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                <div className="w-10 h-10 rounded-full bg-purple-700 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                  {t.initial}
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-sm">{t.name}</p>
                  <p className="text-gray-400 text-xs">
                    {t.role} · {t.flag} {t.city}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
