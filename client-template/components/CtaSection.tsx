type Props = {
  cta: { headline: string; subtext: string; buttonText: string }
  contact: { phone: string }
}

export default function CtaSection({ cta, contact }: Props) {
  return (
    <section className="py-24 text-white text-center"
      style={{ background: 'linear-gradient(135deg, var(--color-primary) 0%, #1e1b4b 100%)' }}>
      <div className="max-w-3xl mx-auto px-6">
        <h2 className="text-3xl md:text-5xl font-black mb-5">{cta.headline}</h2>
        <p className="text-white/70 text-lg mb-10">{cta.subtext}</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="#contact" className="btn-primary bg-white !text-[var(--color-primary)] hover:bg-white/90 text-base py-4 px-10">
            {cta.buttonText}
          </a>
          {contact.phone && (
            <a href={`tel:${contact.phone}`} className="btn-outline border-white !text-white hover:!bg-white hover:!text-[var(--color-primary)] text-base py-4 px-10">
              {contact.phone}
            </a>
          )}
        </div>
      </div>
    </section>
  )
}
