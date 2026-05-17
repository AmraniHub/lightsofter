import Link from 'next/link'
import Image from 'next/image'
import { getAllPosts } from '@/lib/blog'
import Footer from '@/components/Footer'
import type { Metadata } from 'next'
import { ArrowRight, Clock } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Blog — Conseils Web & Digital pour PME | Lightsofter',
  description: 'Articles, guides et conseils pour les PME françaises et belges sur la création de sites web, applications mobiles et transformation digitale.',
  alternates: { canonical: 'https://lightsofter.vercel.app/blog' },
}

const categoryColors: Record<string, string> = {
  Guide: 'bg-purple-100 text-purple-700',
  SEO: 'bg-blue-100 text-blue-700',
  'E-commerce': 'bg-green-100 text-green-700',
  Android: 'bg-orange-100 text-orange-700',
  Tendances: 'bg-pink-100 text-pink-700',
  Web: 'bg-gray-100 text-gray-600',
}

const categoryGradients: Record<string, string> = {
  Guide: 'from-purple-600 to-violet-500',
  SEO: 'from-blue-600 to-cyan-500',
  'E-commerce': 'from-green-600 to-emerald-500',
  Android: 'from-orange-500 to-amber-400',
  Tendances: 'from-pink-600 to-rose-500',
  Web: 'from-gray-600 to-slate-500',
}

export default function BlogPage() {
  const posts = getAllPosts()

  return (
    <>
      <div className="min-h-screen bg-white">
        {/* Header */}
        <div className="bg-gradient-to-br from-[#0d0720] to-purple-900 pt-32 pb-20 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-block bg-purple-500/20 border border-purple-400/30 text-purple-300 text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
              Blog
            </span>
            <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
              Conseils Web & Digital
            </h1>
            <p className="text-purple-200 text-lg max-w-xl mx-auto">
              Guides pratiques pour les PME qui veulent une présence digitale efficace, sans se ruiner ni attendre des mois.
            </p>
          </div>
        </div>

        {/* Posts grid */}
        <div className="max-w-6xl mx-auto px-6 md:px-12 py-16">
          {posts.length === 0 ? (
            <p className="text-center text-gray-400 py-20">Articles en cours de génération…</p>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map(post => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group bg-white rounded-3xl border border-gray-100 shadow-sm hover:-translate-y-1 hover:shadow-xl hover:shadow-purple-500/10 transition-all duration-300 overflow-hidden flex flex-col"
                >
                  {/* Thumbnail */}
                  <div className="relative h-48 overflow-hidden bg-gray-100 flex-shrink-0">
                    {post.image ? (
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    ) : (
                      <div className={`w-full h-full bg-gradient-to-br ${categoryGradients[post.category] ?? 'from-purple-600 to-violet-500'} flex items-center justify-center`}>
                        <span className="text-white/30 text-5xl font-black">{post.category[0]}</span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                  </div>

                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center gap-2 mb-3">
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${categoryColors[post.category] ?? 'bg-gray-100 text-gray-600'}`}>
                        {post.category}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-gray-400">
                        <Clock className="w-3 h-3" /> {post.readTime} min
                      </span>
                    </div>
                    <h2 className="font-bold text-gray-900 text-base leading-snug mb-3 flex-1 group-hover:text-purple-700 transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-2">{post.description}</p>
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <span className="text-xs text-gray-400">
                        {new Date(post.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
                      </span>
                      <span className="flex items-center gap-1 text-purple-700 text-xs font-semibold group-hover:gap-2 transition-all">
                        Lire <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  )
}
