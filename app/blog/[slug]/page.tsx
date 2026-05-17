import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getAllPosts, getPostBySlug } from '@/lib/blog'
import Footer from '@/components/Footer'
import type { Metadata } from 'next'
import { marked } from 'marked'
import { ArrowLeft, Clock, Calendar, Tag, ArrowRight } from 'lucide-react'

interface Props { params: { slug: string } }

export async function generateStaticParams() {
  return getAllPosts().map(p => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getPostBySlug(params.slug)
  if (!post) return {}
  return {
    title: `${post.title} | Lightsofter Blog`,
    description: post.description,
    keywords: post.keywords,
    alternates: { canonical: `https://lightsofter.vercel.app/blog/${params.slug}` },
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
      authors: ['Lightsofter'],
    },
  }
}

export default function BlogPostPage({ params }: Props) {
  const post = getPostBySlug(params.slug)
  if (!post) notFound()

  const html = marked(post.content) as string

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    author: { '@type': 'Organization', name: 'Lightsofter', url: 'https://lightsofter.vercel.app' },
    publisher: { '@type': 'Organization', name: 'Lightsofter', logo: { '@type': 'ImageObject', url: 'https://lightsofter.vercel.app/logo.png' } },
    datePublished: post.date,
    dateModified: post.date,
    mainEntityOfPage: { '@type': 'WebPage', '@id': `https://lightsofter.vercel.app/blog/${post.slug}` },
    keywords: post.keywords,
  }

  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Accueil', item: 'https://lightsofter.vercel.app' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://lightsofter.vercel.app/blog' },
      { '@type': 'ListItem', position: 3, name: post.title, item: `https://lightsofter.vercel.app/blog/${post.slug}` },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />

      <div className="min-h-screen bg-white">
        {/* Hero */}
        <div className="bg-gradient-to-br from-[#0d0720] to-purple-900 pt-32 pb-16 px-6">
          <div className="max-w-3xl mx-auto">
            <Link href="/blog" className="inline-flex items-center gap-2 text-purple-300 hover:text-white text-sm mb-6 transition-colors">
              <ArrowLeft className="w-4 h-4" /> Retour au blog
            </Link>
            <span className="inline-block bg-purple-500/20 border border-purple-400/30 text-purple-300 text-xs font-semibold px-3 py-1 rounded-full mb-4">
              {post.category}
            </span>
            <h1 className="text-3xl md:text-4xl font-black text-white leading-tight mb-4">{post.title}</h1>
            <p className="text-purple-200 text-base mb-6">{post.description}</p>
            <div className="flex flex-wrap items-center gap-4 text-purple-300 text-sm">
              <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" />
                {new Date(post.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
              </span>
              <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> {post.readTime} min de lecture</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-3xl mx-auto px-6 py-12">
          <article
            className="prose prose-gray prose-headings:font-black prose-h2:text-2xl prose-h3:text-xl prose-a:text-purple-700 prose-a:no-underline hover:prose-a:underline prose-strong:text-gray-900 prose-li:text-gray-600 max-w-none"
            dangerouslySetInnerHTML={{ __html: html }}
          />

          {/* CTA */}
          <div className="mt-16 bg-gradient-to-br from-purple-900 to-violet-800 rounded-3xl p-8 text-center">
            <h3 className="text-2xl font-black text-white mb-2">Prêt à lancer votre projet ?</h3>
            <p className="text-purple-200 mb-6">Devis gratuit en 24h. Livraison en 5 jours.</p>
            <Link href="/#devis" className="inline-flex items-center gap-2 bg-white text-purple-700 font-bold px-7 py-3.5 rounded-2xl hover:bg-purple-50 transition-all shadow-lg">
              Obtenir un devis gratuit <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
