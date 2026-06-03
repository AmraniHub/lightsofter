import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'

// ── City data ─────────────────────────────────────────────────────────────────
export const CITIES: Record<string, {
  name: string; region: string; country: string
  lat: string; lng: string; flag: string
  intro: string; testimonial: { name: string; role: string; text: string }
}> = {
  paris: {
    name: 'Paris', region: 'Île-de-France', country: 'FR', flag: '🇫🇷',
    lat: '48.8566', lng: '2.3522',
    intro: 'Dans la capitale, chaque PME mérite une présence digitale à la hauteur. Nous créons des sites web professionnels pour les entrepreneurs parisiens — livrés en 24h, à partir de 490€.',
    testimonial: { name: 'Marie L.', role: 'Restauratrice, Paris 11e', text: 'Site livré en moins de 24h. Nos réservations en ligne ont explosé. Équipe ultra réactive.' },
  },
  lyon: {
    name: 'Lyon', region: 'Auvergne-Rhône-Alpes', country: 'FR', flag: '🇫🇷',
    lat: '45.7640', lng: '4.8357',
    intro: 'Lyon, capitale économique de la région Auvergne-Rhône-Alpes. Nous aidons les entreprises lyonnaises à se démarquer en ligne avec des sites livrés en 24h.',
    testimonial: { name: 'Sophie M.', role: 'Notaire, Lyon 6e', text: 'Brief compris du premier coup. Notre cabinet a enfin une présence web professionnelle.' },
  },
  marseille: {
    name: 'Marseille', region: 'Provence-Alpes-Côte d\'Azur', country: 'FR', flag: '🇫🇷',
    lat: '43.2965', lng: '5.3698',
    intro: 'Marseille bouge vite. Votre site web aussi. Nous créons des sites professionnels pour les entrepreneurs marseillais avec une livraison garantie en 24h.',
    testimonial: { name: 'Karim B.', role: 'Artisan plombier, Marseille', text: 'Avant j\'avais aucune présence en ligne. Maintenant je reçois des demandes chaque semaine.' },
  },
  bordeaux: {
    name: 'Bordeaux', region: 'Nouvelle-Aquitaine', country: 'FR', flag: '🇫🇷',
    lat: '44.8378', lng: '-0.5792',
    intro: 'Bordeaux attire entrepreneurs et touristes. Un site professionnel vous met en avant dès le premier clic — livré en 24h à partir de 490€.',
    testimonial: { name: 'Claire D.', role: 'Coach professionnelle, Bordeaux', text: 'Mon site reflète parfaitement mon image. Livré en 24h comme promis, impeccable.' },
  },
  toulouse: {
    name: 'Toulouse', region: 'Occitanie', country: 'FR', flag: '🇫🇷',
    lat: '43.6047', lng: '1.4442',
    intro: 'La Ville Rose rayonne. Votre entreprise aussi. Sites web professionnels pour les PME toulousaines, livrés en 24h, prix transparent dès 490€.',
    testimonial: { name: 'Pierre V.', role: 'Consultant IT, Toulouse', text: 'Rapport qualité-prix imbattable. Mon site est aussi bien que ceux d\'agences 3x plus chères.' },
  },
  nice: {
    name: 'Nice', region: 'Provence-Alpes-Côte d\'Azur', country: 'FR', flag: '🇫🇷',
    lat: '43.7102', lng: '7.2620',
    intro: 'Nice et la Côte d\'Azur attirent une clientèle exigeante. Donnez à votre entreprise un site à la hauteur — livré en 24h, à partir de 490€.',
    testimonial: { name: 'Isabelle C.', role: 'Gérante boutique, Nice', text: 'Design élégant, adapté à notre clientèle haut de gamme. Livré en 2 jours, impeccable.' },
  },
  nantes: {
    name: 'Nantes', region: 'Pays de la Loire', country: 'FR', flag: '🇫🇷',
    lat: '47.2184', lng: '-1.5536',
    intro: 'Nantes, ville dynamique et innovante. Nous accompagnons les PME nantaises avec des sites web modernes livrés en 24h à partir de 490€.',
    testimonial: { name: 'Thomas R.', role: 'Gérant restaurant, Nantes', text: 'Notre nouveau site a doublé les réservations en ligne en moins d\'un mois.' },
  },
  strasbourg: {
    name: 'Strasbourg', region: 'Grand Est', country: 'FR', flag: '🇫🇷',
    lat: '48.5734', lng: '7.7521',
    intro: 'Strasbourg, au carrefour de l\'Europe. Sites web professionnels pour les entreprises strasbourgeoises, livrés en 24h, 490€ tout inclus.',
    testimonial: { name: 'Marc F.', role: 'Avocat, Strasbourg', text: 'Un site professionnel en 24h. Excellent rapport qualité-prix, je recommande.' },
  },
  montpellier: {
    name: 'Montpellier', region: 'Occitanie', country: 'FR', flag: '🇫🇷',
    lat: '43.6119', lng: '3.8772',
    intro: 'Montpellier croît vite. Votre visibilité en ligne aussi. Sites web professionnels pour les entrepreneurs montpelliérains — 24h, 490€.',
    testimonial: { name: 'Julie P.', role: 'Kiné, Montpellier', text: 'Mon agenda en ligne a changé ma vie. Plus de temps perdu au téléphone.' },
  },
  lille: {
    name: 'Lille', region: 'Hauts-de-France', country: 'FR', flag: '🇫🇷',
    lat: '50.6292', lng: '3.0573',
    intro: 'Lille, capitale des Hauts-de-France. Nous créons des sites web professionnels pour les PME lillois — livrés en 24h, à partir de 490€.',
    testimonial: { name: 'Rémi G.', role: 'Electricien, Lille', text: 'Grâce à mon site, je reçois des demandes de toute la métropole lilloise.' },
  },
  bruxelles: {
    name: 'Bruxelles', region: 'Bruxelles-Capitale', country: 'BE', flag: '🇧🇪',
    lat: '50.8503', lng: '4.3517',
    intro: 'Bruxelles, cœur de l\'Europe. Sites web professionnels pour les entreprises bruxelloises — livraison en 24h, à partir de 490€, devis gratuit.',
    testimonial: { name: 'Thomas D.', role: 'Pharmacien, Bruxelles', text: 'Notre app Android a transformé notre gestion. Résultat bien au-delà de nos attentes.' },
  },
  geneve: {
    name: 'Genève', region: 'Canton de Genève', country: 'CH', flag: '🇨🇭',
    lat: '46.2044', lng: '6.1432',
    intro: 'Genève exige le meilleur. Sites web haut de gamme pour les entreprises genevoises — livraison en 24h, devis gratuit, prix transparent dès 490€.',
    testimonial: { name: 'Nicolas R.', role: 'Conseiller financier, Genève', text: 'Résultat premium, prix transparent. Mes clients ont immédiatement fait confiance au nouveau site.' },
  },
  monaco: {
    name: 'Monaco', region: 'Principauté de Monaco', country: 'MC', flag: '🇲🇨',
    lat: '43.7384', lng: '7.4246',
    intro: 'Monaco incarne le luxe et l\'excellence. Votre site web doit être à la même hauteur — design premium, livré en 24h, à partir de 490€.',
    testimonial: { name: 'Isabelle C.', role: 'Boutique luxe, Monaco', text: 'Design élégant parfaitement adapté à notre clientèle monégasque. Livré en 2 jours, impeccable.' },
  },
}

export function generateStaticParams() {
  return Object.keys(CITIES).map(city => ({ city }))
}

export function generateMetadata({ params }: { params: { city: string } }): Metadata {
  const city = CITIES[params.city]
  if (!city) return {}
  return {
    title: `Agence web ${city.name} — Site web professionnel livré en 24h | Lightsofter`,
    description: `Création de site web professionnel à ${city.name} à partir de 490€, livré en 24h. Devis gratuit sous 24h. Agence web spécialisée PME en ${city.region}.`,
    keywords: `agence web ${city.name}, création site web ${city.name}, site internet ${city.name}, développement web ${city.name}, site vitrine ${city.name}`,
    alternates: { canonical: `https://lightsofter.vercel.app/agence-web/${params.city}` },
    openGraph: {
      title: `Agence web ${city.name} — Sites web en 24h | Lightsofter`,
      description: `Site web professionnel à ${city.name} livré en 24h à partir de 490€.`,
      url: `https://lightsofter.vercel.app/agence-web/${params.city}`,
    },
    other: {
      'geo.region':    `${city.country}-${city.region.substring(0, 2).toUpperCase()}`,
      'geo.placename': city.name,
      'geo.position':  `${city.lat};${city.lng}`,
      'ICBM':          `${city.lat}, ${city.lng}`,
    },
  }
}

export default function CityPage({ params }: { params: { city: string } }) {
  const city = CITIES[params.city]
  if (!city) notFound()

  const schemaOrg = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: `Lightsofter — Agence web ${city.name}`,
    description: `Création de sites web professionnels à ${city.name}`,
    url: `https://lightsofter.vercel.app/agence-web/${params.city}`,
    telephone: '+212627716149',
    areaServed: { '@type': 'City', name: city.name },
    priceRange: '€€',
    openingHours: 'Mo-Su 08:00-20:00',
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: `Services web à ${city.name}`,
      itemListElement: [
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: `Site vitrine à ${city.name}` }, price: '490', priceCurrency: 'EUR' },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: `Site e-commerce à ${city.name}` }, price: '890', priceCurrency: 'EUR' },
      ],
    },
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }} />

      <main className="min-h-screen bg-gray-950 text-white">

        {/* ── HERO ─────────────────────────────────────────────────── */}
        <section className="max-w-5xl mx-auto px-6 pt-20 pb-16 text-center">
          <div className="inline-flex items-center gap-2 bg-purple-900/40 border border-purple-700/30 rounded-full px-4 py-1.5 text-purple-300 text-sm font-medium mb-6">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            {city.flag} Disponible à {city.name}
          </div>

          <h1 className="text-4xl md:text-5xl font-black leading-tight mb-5">
            Agence web à {city.name}<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-violet-300">
              Site livré en 24h — 490€
            </span>
          </h1>

          <p className="text-gray-400 text-lg leading-relaxed max-w-2xl mx-auto mb-8">
            {city.intro}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/order"
              className="bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-500 hover:to-violet-500 text-white font-bold px-8 py-4 rounded-xl text-base transition shadow-lg shadow-purple-900/30">
              Commencer mon site — 490€ →
            </Link>
            <a href="https://wa.me/212627716149"
              className="border border-gray-700 hover:border-gray-500 text-gray-300 hover:text-white font-semibold px-8 py-4 rounded-xl text-base transition">
              Devis gratuit WhatsApp
            </a>
          </div>
        </section>

        {/* ── SERVICES ─────────────────────────────────────────────── */}
        <section className="max-w-5xl mx-auto px-6 pb-16">
          <h2 className="text-2xl font-black text-center mb-8">
            Nos services à {city.name}
          </h2>
          <div className="grid md:grid-cols-3 gap-5">
            {[
              { icon: '🏠', title: 'Site vitrine', price: 'dès 490€', desc: `Site professionnel 5 pages pour votre activité à ${city.name}. SEO local inclus.` },
              { icon: '🛒', title: 'E-commerce', price: 'dès 890€', desc: 'Boutique en ligne avec paiement sécurisé. Vendez partout en France et en Europe.' },
              { icon: '📱', title: 'App Android', price: 'dès 990€', desc: 'Application mobile sur mesure pour votre entreprise. Disponible sur le Play Store.' },
            ].map(s => (
              <div key={s.title} className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
                <div className="text-3xl mb-3">{s.icon}</div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-black text-white">{s.title}</h3>
                  <span className="text-purple-400 font-bold text-sm">{s.price}</span>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── WHY US ───────────────────────────────────────────────── */}
        <section className="max-w-5xl mx-auto px-6 pb-16">
          <h2 className="text-2xl font-black text-center mb-8">
            Pourquoi choisir Lightsofter à {city.name} ?
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { icon: '⚡', title: 'Livraison en 24h', desc: 'Votre site est en ligne le lendemain. Pas de délais de 3 mois.' },
              { icon: '💶', title: 'Prix fixe 490€', desc: 'Pas de surprises. Le prix annoncé est le prix final.' },
              { icon: '🔍', title: 'SEO local inclus', desc: `Votre site optimisé pour les recherches à ${city.name} dès le départ.` },
              { icon: '💬', title: 'Support WhatsApp', desc: '30 jours de support inclus après livraison. Réponse en moins d\'1h.' },
            ].map(f => (
              <div key={f.title} className="flex items-start gap-4 bg-gray-900 border border-gray-800 rounded-2xl p-5">
                <span className="text-2xl shrink-0">{f.icon}</span>
                <div>
                  <h3 className="font-bold text-white mb-1">{f.title}</h3>
                  <p className="text-gray-400 text-sm">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── TESTIMONIAL ──────────────────────────────────────────── */}
        <section className="max-w-3xl mx-auto px-6 pb-16">
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 text-center">
            <div className="flex justify-center gap-1 mb-4">
              {[...Array(5)].map((_, i) => <span key={i} className="text-yellow-400">★</span>)}
            </div>
            <p className="text-gray-300 text-lg leading-relaxed mb-4 italic">
              &ldquo;{city.testimonial.text}&rdquo;
            </p>
            <p className="text-white font-bold">{city.testimonial.name}</p>
            <p className="text-gray-500 text-sm">{city.testimonial.role}</p>
          </div>
        </section>

        {/* ── FAQ LOCAL ────────────────────────────────────────────── */}
        <section className="max-w-3xl mx-auto px-6 pb-16">
          <h2 className="text-2xl font-black text-center mb-8">
            Questions fréquentes — {city.name}
          </h2>
          <div className="space-y-4">
            {[
              {
                q: `Combien coûte un site web à ${city.name} ?`,
                a: `Chez Lightsofter, un site vitrine professionnel à ${city.name} coûte à partir de 490€ tout inclus (design, hébergement 1 an, SEO de base). Pas de frais cachés.`,
              },
              {
                q: `En combien de temps est livré mon site à ${city.name} ?`,
                a: `Livraison garantie en 24h après validation du brief et du paiement. C'est notre engagement pour tous nos clients en ${city.region}.`,
              },
              {
                q: `Faites-vous du SEO local pour ${city.name} ?`,
                a: `Oui. Chaque site est optimisé pour les recherches locales à ${city.name} : balises meta, schema.org, Google My Business, mots-clés géolocalisés.`,
              },
            ].map(faq => (
              <div key={faq.q} className="bg-gray-900 border border-gray-800 rounded-xl p-5">
                <h3 className="font-bold text-white mb-2">{faq.q}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── CTA ──────────────────────────────────────────────────── */}
        <section className="max-w-3xl mx-auto px-6 pb-20 text-center">
          <div className="bg-gradient-to-br from-purple-900/40 to-violet-900/20 border border-purple-800/30 rounded-3xl p-10">
            <h2 className="text-3xl font-black mb-3">
              Prêt à lancer votre site à {city.name} ?
            </h2>
            <p className="text-gray-400 mb-6">Devis gratuit en moins de 24h. Site en ligne dans les 24h suivantes.</p>
            <Link href="/order"
              className="inline-block bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-500 hover:to-violet-500 text-white font-black px-10 py-4 rounded-xl text-base transition shadow-lg shadow-purple-900/40">
              Démarrer pour 490€ →
            </Link>
          </div>
        </section>

      </main>
    </>
  )
}
