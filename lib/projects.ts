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
}

export const projects: Project[] = [
  {
    slug: 'restaurant-provencal',
    emoji: '🍽️',
    name: 'Restaurant Le Provençal',
    type: 'Site Web',
    city: 'Paris',
    country: 'France',
    flag: '🇫🇷',
    result: '+40% réservations en ligne',
    color: 'from-orange-400 to-red-500',
    tagline: 'Un restaurant parisien qui doublait ses réservations grâce au digital.',
    challenge:
      'Le Provençal perdait des clients au profit de concurrents mieux référencés en ligne. Pas de site, pas de présence Google Maps optimisée, zéro réservation numérique.',
    solution:
      'Site vitrine premium avec système de réservation en ligne intégré, galerie photos du restaurant et des plats, menu digitalisé et fiche Google My Business optimisée. Livré en 4 jours.',
    stack: ['Next.js', 'Tailwind CSS', 'Calendly API', 'Vercel'],
    metrics: [
      { label: 'Réservations en ligne', value: '+40%' },
      { label: 'Délai de livraison', value: '4 jours' },
      { label: 'Position Google', value: 'Top 3' },
    ],
    duration: '4 jours',
    year: '2024',
  },
  {
    slug: 'pharmacie-dubois',
    emoji: '💊',
    name: 'Pharmacie Dubois',
    type: 'App Android',
    city: 'Bruxelles',
    country: 'Belgique',
    flag: '🇧🇪',
    result: '100% ordonnances numérisées',
    color: 'from-green-400 to-teal-500',
    tagline: 'Une pharmacie belge qui a totalement digitalisé la gestion des ordonnances.',
    challenge:
      'Gestion manuelle des ordonnances, files d\'attente longues, erreurs de stock. La pharmacie Dubois cherchait un outil simple pour ses clients et son équipe.',
    solution:
      'Application Android permettant aux clients d\'envoyer leurs ordonnances en photo, de suivre leur commande en temps réel et de recevoir une notification quand c\'est prêt. Interface admin pour la pharmacie.',
    stack: ['React Native', 'Node.js', 'Firebase', 'Google Cloud'],
    metrics: [
      { label: 'Ordonnances numérisées', value: '100%' },
      { label: 'Temps d\'attente', value: '-60%' },
      { label: 'Satisfaction clients', value: '4.8/5' },
    ],
    duration: '12 jours',
    year: '2024',
  },
  {
    slug: 'boutique-elegance',
    emoji: '👗',
    name: 'Boutique Mode Élégance',
    type: 'E-commerce',
    city: 'Bordeaux',
    country: 'France',
    flag: '🇫🇷',
    result: 'E-commerce lancé en 2-3 jours',
    color: 'from-pink-400 to-rose-500',
    tagline: 'Une boutique de mode bordelaise qui vend désormais dans toute la France.',
    challenge:
      'Boutique 100% physique, aucune vente en ligne. La propriétaire souhaitait toucher des clients au-delà de Bordeaux sans gérer une plateforme complexe.',
    solution:
      'Boutique e-commerce complète avec catalogue 120 produits, paiement Stripe, gestion des stocks et livraison Colissimo intégrée. Interface admin ultra-simple pour gérer les commandes.',
    stack: ['Next.js', 'Stripe', 'Tailwind CSS', 'Vercel'],
    metrics: [
      { label: 'Lancement', value: '2-3 jours' },
      { label: 'Premières ventes', value: 'J+2' },
      { label: 'Taux conversion', value: '3.2%' },
    ],
    duration: '2-3 jours',
    year: '2024',
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
      'Plateforme web avec moteur de recherche avancé, fiches propriétés détaillées, espace agent pour gérer les biens, et formulaire de contact automatisé par type de bien.',
    stack: ['React', 'Node.js', 'PostgreSQL', 'AWS'],
    metrics: [
      { label: 'Biens en ligne', value: '500+' },
      { label: 'Temps de recherche', value: '-70%' },
      { label: 'Leads générés', value: '+85%' },
    ],
    duration: '14 jours',
    year: '2024',
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
    stack: ['Next.js', 'Tailwind CSS', 'Notion CMS', 'Vercel'],
    metrics: [
      { label: 'Contacts entrants', value: '+60%' },
      { label: 'Position Google', value: 'Top 5' },
      { label: 'Délai livraison', value: '2-3 jours' },
    ],
    duration: '2-3 jours',
    year: '2024',
  },
  {
    slug: 'garage-peugeot',
    emoji: '🚗',
    name: 'Garage Automobile Peugeot+',
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
      'Application web de prise de RDV en ligne avec sélection du service (vidange, pneus, révision...), envoi automatique de rappels SMS et dashboard de gestion pour l\'équipe.',
    stack: ['React', 'Twilio SMS', 'Supabase', 'Vercel'],
    metrics: [
      { label: 'RDV automatisés', value: '100%' },
      { label: 'No-show clients', value: '-45%' },
      { label: 'Temps secrétariat', value: '-80%' },
    ],
    duration: '10 jours',
    year: '2024',
  },
]
