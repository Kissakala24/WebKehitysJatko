import { useState, useEffect, useRef } from 'react'

const today = new Date().toISOString().split('T')[0]

export default function BookingForm() {
  const [form, setForm] = useState({
    fullname: '', email: '', phone: '',
    sauna: '', date: '', quantity: 4, time: '',
    message: '', terms: false, newsletter: false
  })

  const [fieldStatus, setFieldStatus] = useState({})
  const fieldsetRefs = useRef([])

  // Scroll progress bar
  useEffect(() => {
    const bar = document.getElementById('scrollProgress')
    const onScroll = () => {
      const total = document.documentElement.scrollHeight - document.documentElement.clientHeight
      bar.style.width = (window.scrollY / total * 100) + '%'
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Fade-in animation for fieldsets
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }),
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    )
    fieldsetRefs.current.forEach(el => el && observer.observe(el))
    return () => observer.disconnect()
  }, [])

  function handleChange(e) {
    const { name, value, type, checked } = e.target
    setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
  }

  function handleBlur(e) {
    const { name, validity, value } = e.target
    if (!value) return
    setFieldStatus(prev => ({ ...prev, [name]: validity.valid ? 'valid' : 'invalid' }))
  }

  function handleFocus(e) {
    setFieldStatus(prev => ({ ...prev, [e.target.name]: '' }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (!form.terms) {
      alert('Sinun täytyy hyväksyä vuokrausehdot jatkaaksesi.')
      return
    }
    alert('Varaus lähetetty! Saat vahvistuksen sähköpostitse 24h kuluessa.')
  }

  function getClass(name) {
    return fieldStatus[name] || ''
  }

  return (
    <form className="order-form" onSubmit={handleSubmit}>

      {/* Fieldset 1: Asiakastiedot */}
      <fieldset ref={el => fieldsetRefs.current[0] = el}>
        <legend>Asiakastiedot</legend>

        <div className="form-group">
          <label htmlFor="fullname">Koko nimi <span className="required">*</span></label>
          <input
            type="text" id="fullname" name="fullname" required
            placeholder="Etunimi Sukunimi"
            value={form.fullname}
            onChange={handleChange} onBlur={handleBlur} onFocus={handleFocus}
            className={getClass('fullname')}
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="email">Sähköposti <span className="required">*</span></label>
            <input
              type="email" id="email" name="email" required
              placeholder="nimi@example.com"
              value={form.email}
              onChange={handleChange} onBlur={handleBlur} onFocus={handleFocus}
              className={getClass('email')}
            />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Puhelinnumero <span className="required">*</span></label>
            <input
              type="tel" id="phone" name="phone" required
              pattern="[0-9\s\+\-]+" placeholder="040 123 4567"
              value={form.phone}
              onChange={handleChange} onBlur={handleBlur} onFocus={handleFocus}
              className={getClass('phone')}
            />
          </div>
        </div>
      </fieldset>

      {/* Fieldset 2: Vuokratiedot */}
      <fieldset ref={el => fieldsetRefs.current[1] = el}>
        <legend>Vuokratiedot</legend>

        <div className="form-group">
          <label htmlFor="sauna">Valitse sauna <span className="required">*</span></label>
          <select id="sauna" name="sauna" required value={form.sauna} onChange={handleChange}>
            <option value="">-- Valitse sauna --</option>
            <option value="savusauna">Perinteinen Savusauna (80€)</option>
            <option value="jarvensauna">Järvensauna (100€)</option>
            <option value="tynnyrisauna">Tynnyrisauna (120€)</option>
          </select>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="date">Aloituspäivä <span className="required">*</span></label>
            <input
              type="date" id="date" name="date" required
              min={today} value={form.date}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="quantity">Henkilömäärä <span className="required">*</span></label>
            <input
              type="number" id="quantity" name="quantity" required
              min="1" max="12"
              value={form.quantity}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="time">Toivottu aloitusaika <span className="required">*</span></label>
          <select id="time" name="time" required value={form.time} onChange={handleChange}>
            <option value="">-- Valitse aika --</option>
            <option value="morning">Aamupäivä (9:00–13:00)</option>
            <option value="afternoon">Iltapäivä (13:00–17:00)</option>
            <option value="evening">Ilta (17:00–21:00)</option>
          </select>
        </div>
      </fieldset>

      {/* Fieldset 3: Lisätiedot */}
      <fieldset ref={el => fieldsetRefs.current[2] = el}>
        <legend>Lisätiedot</legend>

        <div className="form-group">
          <label htmlFor="message">Viesti tai erityistoiveet</label>
          <textarea
            id="message" name="message"
            placeholder="Kerro meille mahdollisista erityistoiveista tai kysymyksistä..."
            value={form.message} onChange={handleChange}
          />
        </div>

        <div className="checkbox-group">
          <input type="checkbox" id="terms" name="terms" required
            checked={form.terms} onChange={handleChange} />
          <label htmlFor="terms">
            Hyväksyn vuokrausehdot ja tietosuojakäytännön <span className="required">*</span>
          </label>
        </div>

        <div className="checkbox-group">
          <input type="checkbox" id="newsletter" name="newsletter"
            checked={form.newsletter} onChange={handleChange} />
          <label htmlFor="newsletter">Haluan vastaanottaa uutiskirjeen ja erikoistarjouksia</label>
        </div>
      </fieldset>

      <button type="submit" className="submit-button">Lähetä varaus</button>
    </form>
  )
}



