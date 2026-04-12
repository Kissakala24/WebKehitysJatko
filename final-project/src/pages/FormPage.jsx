import { useState } from 'react'
import { z } from 'zod'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

// Zod-validointikaava
const schema = z.object({
  name: z.string().min(2, 'Nimi on liian lyhyt (vähintään 2 merkkiä)'),
  email: z.string().email('Sähköpostiosoite ei ole kelvollinen'),
  phone: z.string().regex(/^[0-9\s\+\-]{6,}$/, 'Puhelinnumero ei ole kelvollinen'),
  date: z.string().min(1, 'Valitse päivämäärä'),
  guests: z.coerce.number().min(1, 'Vähintään 1 henkilö').max(12, 'Enintään 12 henkilöä'),
   terms: z.literal(true).refine(val => val === true, { message: 'Hyväksy ehdot jatkaaksesi' })
})

const today = new Date().toISOString().split('T')[0]

export default function FormPage() {
  const [form, setForm] = useState({
    name: '', email: '', phone: '',
    date: '', guests: 2,
    message: '', newsletter: false, terms: false
  })
  const [errors, setErrors] = useState({})
  const [response, setResponse] = useState(null)
  const [loading, setLoading] = useState(false)

  function handleChange(e) {
    const { name, value, type, checked } = e.target
    setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: undefined }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
console.log("KLIKKI");
	  console.log("data: ", form);

    const result = schema.safeParse({ ...form, guests: Number(form.guests) })
    if (!result.success) {
      const fieldErrors = {}
      result.error.issues.forEach(err => {
        fieldErrors[err.path[0]] = err.message
      })
      setErrors(fieldErrors)
      return
    }

    setLoading(true)
    setResponse(null)

    try {
      const res = await fetch('https://httpbin.org/post', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          date: form.date,
          guests: form.guests,
          message: form.message,
          newsletter: form.newsletter
        })
      })
      const data = await res.json()
      setResponse(data)
    } catch {
      setResponse({ error: 'Verkkovirhe — tarkista internetyhteys.' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <div className="wrapper">
        <div className="container">
          <Navbar />

          <header>
            <h1>Yhteydenotto</h1>
            <p className="tagline">Lähetä meille viesti tai tiedustelu</p>
          </header>

          <main>
            <section className="intro-section">
              <h2>Ota yhteyttä</h2>
              <p>Täytä lomake ja lähetä meille viesti. Vastaamme sähköpostitse mahdollisimman pian.</p>
            </section>

            <form className="order-form" onSubmit={handleSubmit} noValidate>

              {/* Kenttäryhmä 1: Henkilötiedot */}
              <fieldset className="visible">
                <legend>Henkilötiedot</legend>

                <div className="form-group">
                  <label htmlFor="name">Nimi <span className="required">*</span></label>
                  <input
                    type="text" id="name" name="name"
                    placeholder="Etunimi Sukunimi"
                    value={form.name} onChange={handleChange}
                    className={errors.name ? 'field-error' : ''}
                  />
                  {errors.name && <span className="error-msg">{errors.name}</span>}
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="email">Sähköposti <span className="required">*</span></label>
                    <input
                      type="email" id="email" name="email"
                      placeholder="nimi@example.com"
                      value={form.email} onChange={handleChange}
                      className={errors.email ? 'field-error' : ''}
                    />
                    {errors.email && <span className="error-msg">{errors.email}</span>}
                  </div>
                  <div className="form-group">
                    <label htmlFor="phone">Puhelinnumero <span className="required">*</span></label>
                    <input
                      type="tel" id="phone" name="phone"
                      placeholder="040 123 4567"
                      value={form.phone} onChange={handleChange}
                      className={errors.phone ? 'field-error' : ''}
                    />
                    {errors.phone && <span className="error-msg">{errors.phone}</span>}
                  </div>
                </div>
              </fieldset>

              {/* Kenttäryhmä 2: Varauksen tiedot */}
              <fieldset className="visible">
                <legend>Varauksen tiedot</legend>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="date">Toivottu päivämäärä <span className="required">*</span></label>
                    <input
                      type="date" id="date" name="date"
                      min={today} value={form.date} onChange={handleChange}
                      className={errors.date ? 'field-error' : ''}
                    />
                    {errors.date && <span className="error-msg">{errors.date}</span>}
                  </div>
                  <div className="form-group">
                    <label htmlFor="guests">Henkilömäärä <span className="required">*</span></label>
                    <input
                      type="number" id="guests" name="guests"
                      min="1" max="12"
                      value={form.guests} onChange={handleChange}
                      className={errors.guests ? 'field-error' : ''}
                    />
                    {errors.guests && <span className="error-msg">{errors.guests}</span>}
                  </div>
                </div>
              </fieldset>

              {/* Kenttäryhmä 3: Lisätiedot */}
              <fieldset className="visible">
                <legend>Lisätiedot</legend>

                <div className="form-group">
                  <label htmlFor="message">Viesti</label>
                  <textarea
                    id="message" name="message"
                    placeholder="Kirjoita viestisi tai kysymyksesi tähän..."
                    value={form.message} onChange={handleChange}
                  />
                </div>

                <div className="checkbox-group">
                  <input type="checkbox" id="newsletter" name="newsletter"
                    checked={form.newsletter} onChange={handleChange} />
                  <label htmlFor="newsletter">Haluan vastaanottaa uutiskirjeen</label>
                </div>

                <div className="checkbox-group">
                  <input type="checkbox" id="terms" name="terms"
                    checked={form.terms} onChange={handleChange} />
                  <label htmlFor="terms">
                    Hyväksyn käyttöehdot <span className="required">*</span>
                  </label>
                </div>
                {errors.terms && <span className="error-msg">{errors.terms}</span>}
              </fieldset>

              <button type="submit" className="submit-button" disabled={loading}>
                {loading ? 'Lähetetään...' : 'Lähetä viesti'}
              </button>
            </form>

            {/* Httpbin-vastaus */}
            {response && (
              <div className="response-box">
                <h2>Palvelimen vastaus</h2>
                {response.error ? (
                  <p className="error-msg">{response.error}</p>
                ) : (
                  <>
                    <p className="response-success">✓ Viesti lähetetty onnistuneesti!</p>
                    <p className="response-label">Lähetetty data:</p>
                    <pre className="response-pre">
                      {JSON.stringify(response.json, null, 2)}
                    </pre>
                  </>
                )}
              </div>
            )}
          </main>

          <Footer />
        </div>
      </div>
    </>
  )
}



