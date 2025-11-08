import { useRef, useState } from 'react'
import './CareersSection.css'

const CAREER_URL = 'https://thetrilight.com/career/'

export default function CareersSection() {
  const fileInputRef = useRef(null)
  const [fileName, setFileName] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const triggerFilePicker = () => {
    if (fileInputRef.current) fileInputRef.current.click()
  }

  const onFileChange = (e) => {
    const f = e.target.files?.[0]
    setFileName(f ? f.name : '')
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const form = e.currentTarget
    if (!form.checkValidity()) {
      form.reportValidity()
      return
    }
    // Simulate submit success; optionally open official careers page
    setSubmitted(true)
  }

  return (
    <section id="careers" className="careers">
      <div className="careers__container">
        <div className="careers__panel">
          {/* Left: Contact info */}
          <aside className="careers__contact">
            <h3 className="careers__contact-title">You can reach us at</h3>
            <div className="careers__contact-item">
              <span className="careers__icon" aria-hidden>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                  <path d="M8 9c1.2 2.6 4.4 5 6 6l2-2c.4-.4 1-.5 1.5-.3 1 .3 1.8.7 2.5 1.3.4.4.4 1 0 1.5-1.6 1.8-3.2 2.7-5 3-2.6-.3-5.7-2.3-8-4.6S5.3 9.6 5 7c.3-1.8 1.2-3.4 3-5 .5-.4 1.1-.4 1.5 0 .6.7 1 1.5 1.3 2.5.2.5.1 1.1-.3 1.5L8 9z" fill="currentColor" />
                </svg>
              </span>
              <div>
                <div className="careers__label">Phone</div>
                <a className="careers__value" href="tel:6309030303">6309030303</a>
              </div>
            </div>
            <div className="careers__contact-item">
              <span className="careers__icon" aria-hidden>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                  <path d="M4 8l8 5 8-5v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8z" fill="currentColor" />
                </svg>
              </span>
              <div>
                <div className="careers__label">Email</div>
                <a className="careers__value" href="mailto:hr@thetrilight.com">hr@thetrilight.com</a>
              </div>
            </div>
          </aside>

          {/* Right: Apply form */}
          <div className="careers__form-wrap">
            <h3 className="careers__form-title">Apply Online</h3>
            {submitted ? (
              <div className="careers__success" role="status">
                Thank you! Your application details have been noted. We will contact you soon.
                <div className="careers__success-links">
                  <a href={CAREER_URL} target="_blank" rel="noopener noreferrer">Go to Careers page</a>
                </div>
              </div>
            ) : (
              <form className="careers__form" onSubmit={handleSubmit} noValidate>
                <input className="careers__input" type="text" name="name" placeholder="Full Name" required minLength={2} aria-label="Full Name" />
                <input className="careers__input" type="email" name="email" placeholder="Email" required aria-label="Email" />

                <select className="careers__input" name="experience" required aria-label="Total Experience" defaultValue="">
                  <option value="" disabled>Total Experience</option>
                  <option value="Fresher">Fresher</option>
                  <option value="1-2 years">1–2 years</option>
                  <option value="3-5 years">3–5 years</option>
                  <option value="6-10 years">6–10 years</option>
                  <option value="10+ years">10+ years</option>
                </select>

                <div className="careers__file">
                  <input ref={fileInputRef} className="careers__file-input" type="file" name="cv" accept=".pdf,.doc,.docx" onChange={onFileChange} aria-label="Upload CV" />
                  <button type="button" className="careers__upload-btn" onClick={triggerFilePicker}>Upload CV</button>
                  {fileName && <span className="careers__file-name" title={fileName}>{fileName}</span>}
                </div>

                <textarea className="careers__textarea" name="skills" placeholder="Key Skills" rows={3} aria-label="Key Skills" />

                <button type="submit" className="careers__submit">Submit</button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}