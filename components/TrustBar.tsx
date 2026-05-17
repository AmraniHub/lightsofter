const stats = [
  { value: '50+', label: 'Clients satisfaits' },
  { value: '3j', label: 'Délai moyen' },
  { value: '2', label: 'Pays (FR & BE)' },
  { value: '98%', label: 'Satisfaction client' },
]

export default function TrustBar() {
  return (
    <section className="bg-purple-700 py-14">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <p className="text-4xl md:text-5xl font-black text-white">{s.value}</p>
              <p className="text-purple-200 text-sm font-medium mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
