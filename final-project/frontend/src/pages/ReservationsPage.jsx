import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function ReservationsPage() {
  const [reservations, setReservations] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchReservations() {
      try {
        const res = await fetch('/api/reservations')
        if (!res.ok) throw new Error('Tietojen haku epäonnistui')
        const data = await res.json()
        setReservations(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchReservations()
  }, [])

  return (
    <>
      <div className="wrapper">
        <div className="container">
          <Navbar />

          <header>
            <h1>Varaukset</h1>
            <p className="tagline">Tietokantaan tallennetut varaukset</p>
          </header>

          <main>
            <section className="intro-section">
              <h2>Kaikki varaukset</h2>
              <p>Alla näkyvät kaikki lomakkeella lähetetyt ja tietokantaan tallennetut varaukset.</p>
            </section>

            {loading && <p className="loading-msg">Ladataan varauksia...</p>}

            {error && (
              <div className="response-box">
                <p className="error-msg">❌ {error}</p>
              </div>
            )}

            {!loading && !error && reservations.length === 0 && (
              <div className="response-box">
                <p>Ei varauksia vielä. <Link to="/form" className="cta-button" style={{ display: 'inline-block', marginTop: '1rem' }}>Tee ensimmäinen varaus</Link></p>
              </div>
            )}

            {!loading && reservations.length > 0 && (
              <div className="reservations-table-wrapper">
                <table className="reservations-table">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Nimi</th>
                      <th>Sähköposti</th>
                      <th>Puhelin</th>
                      <th>Päivämäärä</th>
                      <th>Henkilöitä</th>
                      <th>Viesti</th>
                      <th>Uutiskirje</th>
                      <th>Luotu</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reservations.map((r) => (
                      <tr key={r.id}>
                        <td>{r.id}</td>
                        <td>{r.name}</td>
                        <td>{r.email}</td>
                        <td>{r.phone}</td>
                        <td>{r.date}</td>
                        <td>{r.guests}</td>
                        <td>{r.message || '—'}</td>
                        <td>{r.newsletter ? '✓' : '—'}</td>
                        <td>{new Date(r.created_at).toLocaleString('fi-FI')}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            <div className="cta-section" style={{ marginTop: '2rem' }}>
              <Link to="/form" className="cta-button">Tee uusi varaus</Link>
            </div>
          </main>

          <Footer />
        </div>
      </div>
    </>
  )
}



