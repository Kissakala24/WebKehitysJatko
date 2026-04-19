import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function MainPage() {
  useEffect(() => {
    const bar = document.getElementById('scrollProgress')
    const onScroll = () => {
      const total = document.documentElement.scrollHeight - document.documentElement.clientHeight
      if (total > 0) bar.style.width = (window.scrollY / total * 100) + '%'
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.style.opacity = '1'
          e.target.style.transform = 'translateY(0)'
        }
      }),
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    )
    document.querySelectorAll('.benefit-item').forEach((item, i) => {
      item.style.opacity = '0'
      item.style.transform = 'translateY(30px)'
      item.style.transition = `all 0.6s ease ${i * 0.1}s`
      observer.observe(item)
    })
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <div className="scroll-progress" id="scrollProgress" />
      <div className="wrapper">
        <div className="container">
          <Navbar />
          <header>
            <h1>Saunojen Vuokraus</h1>
            <p className="tagline">Autenttinen puusaunakokemus Suomen luonnossa</p>
          </header>
          <div className="special-offer">
            <h2>Talvitarjous</h2>
            <p>Varaa savusauna tammikuussa ja saat 20% alennuksen!</p>
            <p className="price">Vain 64€ / 4h</p>
            <p>Tarjous voimassa 31.1.2025 asti</p>
          </div>
          <main>
            <section className="intro-text">
              <h2>Tervetuloa vuokraamaan saunojamme</h2>
              <p>Tarjoamme ainutlaatuisia saunakokemuksia rauhallisissa luonnonympäristöissä. Kaikki saunamme ovat perinteisesti puulämmitteisiä, ja ne sijaitsevat kauniilla paikoilla järvien ja metsien äärellä.</p>
              <p>Saunominen on suomalaisen kulttuurin ydin, ja haluamme tarjota sinulle autenttisen kokemuksen, jossa voit rentoutua ja nauttia luonnon rauhasta.</p>
            </section>
            <div className="benefits">
              <h2>Miksi valita meidät?</h2>
              <div className="benefit-list">
                <div className="benefit-item">
                  <strong>Puulämmitteiset</strong>
                  <p>Kaikki saunamme lämmitetään perinteisesti puulla autenttisen kokemuksen takaamiseksi.</p>
                </div>
                <div className="benefit-item">
                  <strong>Upeat sijainnit</strong>
                  <p>Rauhallisissa maisemissa, etäällä kaupungin hälinästä, järvien ja metsien äärellä.</p>
                </div>
                <div className="benefit-item">
                  <strong>Helppo varaus</strong>
                  <p>Yksinkertainen varausprosessi verkossa. Saat vahvistuksen 24 tunnin kuluessa.</p>
                </div>
                <div className="benefit-item">
                  <strong>Puhtaus</strong>
                  <p>Kaikki saunat puhdistetaan ja huolletaan huolellisesti jokaisen käytön jälkeen.</p>
                </div>
              </div>
            </div>
            <div className="cta-section">
              <Link to="/form" className="cta-button">Ota yhteyttä</Link>
            </div>
          </main>
          <Footer />
        </div>
      </div>
    </>
  )
}



