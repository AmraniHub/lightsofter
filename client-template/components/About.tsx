type Stat = { value: string; label: string }
type Props = { about: { title: string; paragraph1: string; paragraph2: string; stats: Stat[] } }

export default function About({ about }: Props) {
  return (
    <section id="about" className="py-24 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-[var(--color-primary)] font-semibold text-sm uppercase tracking-widest">À propos</span>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mt-3 mb-6">{about.title}</h2>
            <p className="text-gray-600 leading-relaxed mb-5">{about.paragraph1}</p>
            <p className="text-gray-600 leading-relaxed mb-8">{about.paragraph2}</p>
            <a href="#contact" className="btn-primary">Nous contacter →</a>
          </div>
          <div className="grid grid-cols-3 gap-6">
            {about.stats.map((s, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 text-center shadow-sm border border-gray-100">
                <p className="text-3xl font-black text-[var(--color-primary)]">{s.value}</p>
                <p className="text-gray-500 text-sm mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
