type Business = { name: string; email: string; phone: string; country: string }

export default function Footer({ business }: { business: Business }) {
  const year = new Date().getFullYear()
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        <div>
          <p className="font-black text-xl mb-1">{business.name}</p>
          <p className="text-gray-400 text-sm">{business.email}</p>
        </div>
        <div className="flex gap-8 text-sm text-gray-400">
          <a href="#services" className="hover:text-white transition-colors">Services</a>
          <a href="#about" className="hover:text-white transition-colors">À propos</a>
          <a href="#contact" className="hover:text-white transition-colors">Contact</a>
        </div>
        <p className="text-gray-500 text-sm">© {year} {business.name}</p>
      </div>
    </footer>
  )
}
