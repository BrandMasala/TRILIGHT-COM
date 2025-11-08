import { useState } from 'react'
import './DownloadSection.css'

const DOWNLOAD_URL = 'https://thetrilight.com/download/'

export default function DownloadSection() {
  const [countryCode, setCountryCode] = useState('+91')
  const handleSubmit = (e) => {
    e.preventDefault()
    const form = e.currentTarget
    if (!form.checkValidity()) {
      form.reportValidity()
      return
    }
    window.open(DOWNLOAD_URL, '_blank', 'noopener,noreferrer')
  }

  return (
    <section id="download" className="download">
      <div className="download__container">
        <header className="download__header">
          <h2 className="download__title">Kindly fill in the details to download the e‑brochure</h2>
        </header>

        <form className="download__form" onSubmit={handleSubmit} noValidate>
          <label className="visually-hidden" htmlFor="dl-name">Full Name</label>
          <input id="dl-name" name="name" type="text" placeholder="Full Name" required minLength={2} className="download__input" />

          <div className="download__phone-row">
            <label className="visually-hidden" htmlFor="dl-cc">Country Code</label>
            <select id="dl-cc" className="download__cc" value={countryCode} onChange={(e) => setCountryCode(e.target.value)} aria-label="Country code">
              <option value="+91">+91 (India)</option>
              <option value="+971">+971 (UAE)</option>
              <option value="+1">+1 (USA)</option>
              <option value="+44">+44 (UK)</option>
              <option value="+61">+61 (Australia)</option>
              <option value="+65">+65 (Singapore)</option>
            </select>

            <label className="visually-hidden" htmlFor="dl-phone">Contact Number</label>
            <input id="dl-phone" name="phone" type="tel" placeholder="Contact Number" required pattern="[+0-9\-()\s]{7,20}" className="download__input" />
          </div>

          <label className="visually-hidden" htmlFor="dl-email">Email</label>
          <input id="dl-email" name="email" type="email" placeholder="Email" required className="download__input" />

          <label className="visually-hidden" htmlFor="dl-message">Message</label>
          <textarea id="dl-message" name="message" placeholder="Message" rows={4} className="download__textarea" />

          <button type="submit" className="download__submit">Submit</button>
        </form>
      </div>
    </section>
  )
}