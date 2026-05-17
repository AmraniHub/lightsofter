import Link from 'next/link'
import Footer from '@/components/Footer'
import { ArrowRight, Zap, Users, Globe, Clock } from 'lucide-react'

const values = [
  { icon: Clock, title: 'Rapidité', description: 'On livre en jours, pas en semaines. Notre système de templates nous permet d\'aller 2× plus vite qu\'une agence classique.' },
  { icon: Globe, title: 'Transparence', description: 'Prix fixes, délais annoncés, pas de mauvaises surprises. Vous savez exactement ce que vous payez et quand vous livrons.' },
  { icon: Users, title: 'Proximité', description: 'Une équipe disponible par WhatsApp, email ou appel vidéo. Toujours réactif, toujours humain.' },
  { icon: Zap, title: 'Résultats', description: 'On ne livre pas juste du code — on livre des outils qui aident votre business à croître. Chaque projet a un objectif mesurable.' },
]

export default function AboutPage() {
  return (
    <>
      <div className="min-h-screen bg-white pt-28 pb-0">
        {/* Hero */}
        <div className="max-w-5xl mx-auto px-6 md:px-12 py-16 text-center">
          <span className="inline-block bg-purple-100 text-purple-700 text-sm font-semibold px-4 py-1.5 rounded-full mb-6">
            À propos
          </span>
          <h1 className="text-5xl md:text-6xl font-black text-gray-900 mb-6">
            On crée des outils digitaux
            <br />
            <span className="text-gradient">qui travaillent pour vous</span>
          </h1>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
            Lightsofter est une agence digitale spécialisée dans la création rapide de sites web et
            applications pour les PME en France et Belgique.
          </p>
        </div>

        {/* Story */}
        <div className="bg-purple-50 py-20">
          <div className="max-w-3xl mx-auto px-6 md:px-12">
            <h2 className="text-3xl font-black text-gray-900 mb-6">Notre histoire</h2>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                Lightsofter est né d&apos;un constat simple : trop de petites entreprises en France et
                Belgique n&apos;ont pas de présence digitale professionnelle, soit parce que c&apos;est trop
                cher, soit parce que c&apos;est trop lent.
              </p>
              <p>
                On a construit un système de templates et d&apos;automatisation qui nous permet de
                livrer des sites web de qualité en 2-3 jours, à des prix accessibles aux PME.
                Pas de compromis sur la qualité — juste moins de temps perdu.
              </p>
              <p>
                Depuis, nous avons accompagné plus de 50 entreprises en France et Belgique :
                restaurants, pharmacies, cabinets professionnels, boutiques, garages...
                Chaque projet est unique, chaque livraison est une fierté.
              </p>
            </div>
          </div>
        </div>

        {/* Values */}
        <div className="max-w-5xl mx-auto px-6 md:px-12 py-20">
          <h2 className="text-3xl font-black text-gray-900 mb-12 text-center">Ce qu&apos;on défend</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {values.map((v) => (
              <div key={v.title} className="flex gap-5">
                <div className="w-12 h-12 bg-purple-100 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <v.icon className="w-6 h-6 text-purple-700" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">{v.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{v.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-purple-700 py-16">
          <div className="max-w-3xl mx-auto px-6 text-center">
            <h2 className="text-3xl font-black text-white mb-4">Travaillons ensemble</h2>
            <p className="text-purple-200 mb-8">Devis gratuit · Réponse en 24h · Sans engagement</p>
            <Link href="/contact" className="inline-flex items-center gap-2 bg-white text-purple-700 font-bold px-8 py-4 rounded-2xl hover:bg-purple-50 transition-all">
              Démarrer mon projet <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
