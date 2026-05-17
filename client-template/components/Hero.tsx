type Props = {
  hero: { headline: string; subheadline: string; ctaText: string; ctaSecondaryText: string }
  business: { name: string; phone: string }
}

export default function Hero({ hero, business }: Props) {
  return (
    <section className="relative min-h-screen flex items-center justify-center text-white overflow-hidden"
      style={{ background: 'linear-gradient(135deg, var(--color-primary) 0%, #1e1b4b 100%)' }}>
      <div className="absolute inset-0 opacity-10"
        style={{ backgroundImage: 'radial-gradient(circle at 25% 25%, white 1px, transparent 1px), radial-gradient(circle at 75% 75%, white 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-8">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className="text-sm font-medium">{business.name}</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-black leading-tight mb-6">
          {hero.headline}
        </h1>
        <p className="text-xl md:text-2xl text-white/75 mb-10 max-w-2xl mx-auto">
          {hero.subheadline}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="#contact" className="btn-primary bg-white !text-[var(--color-primary)] hover:bg-white/90 text-base py-4 px-8">
            {hero.ctaText}
          </a>
          <a href="#services" className="btn-outline border-white !text-white hover:!bg-white hover:!text-[var(--color-primary)] text-base py-4 px-8">
            {hero.ctaSecondaryText}
          </a>
        </div>
        {business.phone && (
          <p className="mt-10 text-white/50 text-sm">
            Ou appelez-nous : <a href={`tel:${business.phone}`} className="text-white font-medium hover:underline">{business.phone}</a>
          </p>
        )}
      </div>
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <svg className="w-6 h-6 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
      </div>
    </section>
  )
}
