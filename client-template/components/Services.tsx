type Service = { icon: string; title: string; description: string; price: string }

export default function Services({ services }: { services: Service[] }) {
  return (
    <section id="services" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-[var(--color-primary)] font-semibold text-sm uppercase tracking-widest">Nos services</span>
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 mt-3">Ce que nous proposons</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((s, i) => (
            <div key={i} className="group p-8 rounded-2xl border border-gray-100 hover:border-[var(--color-primary)] hover:shadow-xl transition-all duration-300">
              <div className="text-4xl mb-5">{s.icon}</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{s.title}</h3>
              <p className="text-gray-500 mb-5 leading-relaxed">{s.description}</p>
              {s.price && (
                <span className="inline-block bg-[var(--color-primary)]/10 text-[var(--color-primary)] font-semibold text-sm px-3 py-1 rounded-full">
                  {s.price}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
