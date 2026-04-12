import Navbar from './components/Navbar'
import Header from './components/Header'
import BookingForm from './components/BookingForm'
import Footer from './components/Footer'

export default function App() {
  return (
    <>
      <div className="scroll-progress" id="scrollProgress" />
      <div className="wrapper">
        <div className="container">
          <Navbar />
          <Header />
          <main>
            <section className="intro-section">
              <h2>Miten varaus toimii?</h2>
              <p>
                Täytä alla oleva varauslomake huolellisesti. Saat meiltä vahvistuksen
                sähköpostitse 24 tunnin kuluessa. Vuokra-aika on 4 tuntia, ja hinnat
                vaihtelevat saunan mukaan. Kaikki saunamme ovat puulämmitteisiä ja
                sijaitsevat rauhallisissa luonnonympäristöissä.
              </p>
              <p>
                Varauksen vahvistuttua saat tarkat ohjeet saapumisesta ja avaimien noudosta.
              </p>
            </section>
            <BookingForm />
          </main>
          <Footer />
        </div>
      </div>
    </>
  )
}



