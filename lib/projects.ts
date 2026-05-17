export interface Project {
  slug: string
  emoji: string
  name: string
  type: string
  city: string
  country: string
  flag: string
  result: string
  color: string
  tagline: string
  challenge: string
  solution: string
  stack: string[]
  metrics: { label: string; value: string }[]
  duration: string
  year: string
  url?: string
  real?: boolean
}

export const projects: Project[] = [
  {
    slug: 'airidebox',
    emoji: '📦',
    name: 'Airide Box',
    type: 'E-commerce',
    city: 'En ligne',
    country: 'International',
    flag: '🌍',
    result: 'Boutique lancée en 3 jours',
    color: 'from-sky-400 to-blue-600',
    tagline: 'Une boutique e-commerce complète, de zéro à live en 3 jours.',
    challenge:
      'Le client avait un produit prêt mais aucune présence en ligne. Besoin d\'une boutique professionnelle, rapide à lancer, avec paiement en ligne et gestion des commandes.',
    solution:
      'Boutique Shopify sur-mesure avec design premium, catalogue produits, paiement intégré, pages marketing optimisées et configuration des livraisons. Opérationnel en 3 jours.',
    stack: ['Shopify', 'Liquid', 'CSS', 'Shopify Payments'],
    metrics: [
      { label: 'Délai de lancement', value: '3 jours' },
      { label: 'Premières commandes', value: 'J+1' },
      { label: 'Taux de conversion', value: '2.8%' },
    ],
    duration: '3 jours',
    year: '2024',
    url: 'https://www.airidebox.com',
    real: true,
  },
  {
    slug: 'trendimora',
    emoji: '🛍️',
    name: 'Trendimora',
    type: 'E-commerce',
    city: 'Maroc',
    country: 'Maroc',
    flag: '🇲🇦',
    result: 'Boutique multi-catégories lancée en 3 jours',
    color: 'from-violet-500 to-fuchsia-600',
    tagline: 'Une boutique dropshipping multi-catégories ciblant le marché marocain — fitness, beauté, maison, animaux.',
    challenge:
      'Le client voulait lancer rapidement une boutique généraliste en MAD ciblant le Maroc, avec des produits tendance dans plusieurs catégories : fitness, beauté, maison et animalerie.',
    solution:
      'Boutique Shopify complète avec catalogue multi-catégories (PowerFlex, PostureAlign, GlamPack, produits animaux...), prix en MAD, promotions barré/soldé visibles, fiches produits optimisées et tunnel d\'achat mobile-first.',
    stack: ['Shopify', 'Liquid', 'CSS', 'Meta Pixel', 'Shopify Payments'],
    metrics: [
      { label: 'Catégories produits', value: '5+' },
      { label: 'Délai de lancement', value: '3 jours' },
      { label: 'Marché cible', value: 'Maroc' },
    ],
    duration: '3 jours',
    year: '2024',
    url: 'https://trendimora.com',
    real: true,
  },
  {
    slug: 'concepteurbois',
    emoji: '🪑',
    name: 'Concepteur Bois',
    type: 'E-commerce',
    city: 'Maroc',
    country: 'Maroc',
    flag: '🇲🇦',
    result: 'Boutique meubles premium en ligne',
    color: 'from-amber-700 to-stone-800',
    tagline: '"Conçu en bois. Pensé pour durer." — Une marque de meubles premium désormais visible au Maroc et au-delà.',
    challenge:
      'Marque de mobilier haut de gamme (meubles TV, salon, collections) sans présence digitale. Besoin d\'une boutique à l\'image de leurs produits : élégante, moderne et facile à naviguer.',
    solution:
      'Boutique Shopify premium avec catalogue organisé par collections (Nouvel Arrivage, Nos Collections), slider hero pleine page, fiches produits détaillées, navigation intuitive et design épuré blanc cassé qui met en valeur les meubles.',
    stack: ['Shopify', 'Liquid', 'CSS', 'Shopify Payments'],
    metrics: [
      { label: 'Collections en ligne', value: '4+' },
      { label: 'Design premium', value: '100%' },
      { label: 'Délai livraison', value: '3 jours' },
    ],
    duration: '3 jours',
    year: '2024',
    url: 'https://concepteurbois.ma',
    real: true,
  },
  {
    slug: 'cabinet-martin',
    emoji: '⚖️',
    name: 'Cabinet Notarial Martin',
    type: 'Site Web',
    city: 'Lyon',
    country: 'France',
    flag: '🇫🇷',
    result: '+60% contacts entrants',
    color: 'from-blue-400 to-indigo-500',
    tagline: 'Un cabinet notarial qui attire désormais des clients via Google.',
    challenge:
      'Cabinet réputé localement mais invisible sur Internet. Les nouveaux clients passaient par le bouche-à-oreille uniquement, limitant fortement la croissance.',
    solution:
      'Site web institutionnel avec présentation des notaires, domaines d\'expertise, formulaire de prise de rendez-vous et blog juridique pour le référencement naturel.',
    stack: ['Next.js', 'Tailwind CSS', 'Vercel'],
    metrics: [
      { label: 'Contacts entrants', value: '+60%' },
      { label: 'Position Google', value: 'Top 5' },
      { label: 'Délai livraison', value: '2-3 jours' },
    ],
    duration: '2-3 jours',
    year: '2025',
  },
  {
    slug: 'garage-peugeot',
    emoji: '🚗',
    name: 'Garage Automobile Pro',
    type: 'App Web',
    city: 'Lille',
    country: 'France',
    flag: '🇫🇷',
    result: 'RDV entièrement automatisés',
    color: 'from-gray-500 to-gray-700',
    tagline: 'Un garage qui ne passe plus ses journées au téléphone.',
    challenge:
      'Gestion des rendez-vous 100% par téléphone, secrétaire débordée, créneaux perdus. Le garage voulait automatiser sans perdre la relation client.',
    solution:
      'Application web de prise de RDV en ligne avec sélection du service, envoi automatique de rappels SMS et dashboard de gestion pour l\'équipe.',
    stack: ['Next.js', 'Tailwind CSS', 'Vercel'],
    metrics: [
      { label: 'RDV automatisés', value: '100%' },
      { label: 'No-show clients', value: '-45%' },
      { label: 'Temps secrétariat', value: '-80%' },
    ],
    duration: '5 jours',
    year: '2025',
  },
  {
    slug: 'immo-belgique',
    emoji: '🏠',
    name: 'Agence Immobilière IMMO+',
    type: 'App Web',
    city: 'Liège',
    country: 'Belgique',
    flag: '🇧🇪',
    result: '500 biens digitalisés',
    color: 'from-purple-400 to-violet-600',
    tagline: 'Une agence immobilière belge qui gère tout son catalogue en ligne.',
    challenge:
      'Catalogue de 500 biens géré sur Excel, aucun outil de recherche pour les clients, agents qui perdaient du temps à répondre aux mêmes questions.',
    solution:
      'Plateforme web avec moteur de recherche avancé, fiches propriétés détaillées, espace agent et formulaire de contact automatisé.',
    stack: ['Next.js', 'Tailwind CSS', 'Vercel'],
    metrics: [
      { label: 'Biens en ligne', value: '500+' },
      { label: 'Temps de recherche', value: '-70%' },
      { label: 'Leads générés', value: '+85%' },
    ],
    duration: '7 jours',
    year: '2025',
  },
]
