import cfg from '../site-config.json'
import Hero from '../components/Hero'
import Services from '../components/Services'
import About from '../components/About'
import Testimonials from '../components/Testimonials'
import FAQ from '../components/FAQ'
import CtaSection from '../components/CtaSection'
import ContactSection from '../components/ContactSection'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero hero={cfg.hero} business={cfg.business} />
      <Services services={cfg.services} />
      <About about={cfg.about} />
      <Testimonials testimonials={cfg.testimonials} />
      <FAQ faq={cfg.faq} />
      <CtaSection cta={cfg.cta} contact={cfg.contact} />
      <ContactSection contact={cfg.contact} />
      <Footer business={cfg.business} />
    </>
  )
}
