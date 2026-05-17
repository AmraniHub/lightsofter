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
  image?: string
  real?: boolean
}

export const projects: Project[] = [
  {
    slug: 'airidebox',
    emoji: '🚗',
    name: 'AiRideBox',
    type: 'E-commerce',
    city: 'International',
    country: 'International',
    flag: '🌍',
    result: 'Produit tech lancé sur marché international',
    color: 'from-cyan-500 to-blue-700',
    tagline: '"Upgrade Your Drive with Smart AI Car Technology" — Une boutique produit unique vendue à l\'international.',
    challenge:
      'Un produit tech innovant (box AI pour divertissement en voiture : Netflix, YouTube, streaming depuis le tableau de bord) avec zéro présence en ligne. Besoin d\'une boutique qui explique, convainc et vend.',
    solution:
      'Boutique Shopify one-product avec hero vidéo immersif, sections "See it in Action" et "How it works", barre d\'annonces urgence (stock limité, -10% auto), chat WhatsApp et page de suivi de commande. Design tech bleu/blanc.',
    stack: ['Shopify', 'Liquid', 'CSS', 'WhatsApp', 'Shopify Payments'],
    metrics: [
      { label: 'Marché', value: 'Global' },
      { label: 'Délai lancement', value: '3 jours' },
      { label: 'Remise auto', value: '10%' },
    ],
    duration: '3 jours',
    year: '2024',
    url: 'https://www.airidebox.com',
    image: 'https://image.thum.io/get/width/800/crop/450/https://www.airidebox.com/',
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
    image: 'https://image.thum.io/get/width/800/crop/450/https://trendimora.com/',
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
    image: 'https://image.thum.io/get/width/800/crop/450/https://concepteurbois.ma/',
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
    image: 'https://image.pollinations.ai/prompt/professional%20law%20firm%20website%20screenshot%20mockup%2C%20blue%20indigo%20gradient%2C%20clean%20modern%20UI%2C%20notary%20office%2C%20French%20website%2C%20desktop%20browser%20view%2C%20no%20text?width=800&height=450&seed=101&model=flux&nologo=true',
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
    image: 'https://image.pollinations.ai/prompt/modern%20car%20garage%20booking%20app%20website%20mockup%2C%20dark%20gray%20automotive%20design%2C%20appointment%20scheduling%20UI%2C%20clean%20professional%2C%20desktop%20browser%20view%2C%20no%20text?width=800&height=450&seed=202&model=flux&nologo=true',
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
    image: 'https://image.pollinations.ai/prompt/real%20estate%20agency%20website%20mockup%2C%20purple%20violet%20gradient%2C%20property%20listings%20grid%2C%20modern%20Belgian%20real%20estate%2C%20clean%20UI%2C%20desktop%20browser%20view%2C%20no%20text?width=800&height=450&seed=303&model=flux&nologo=true',
  },
]
