import { useEffect } from 'react'
import './NavigationOverlay.css'

export default function NavigationOverlay({ open = false, onClose }) {
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose?.() }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose])

  const go = (id) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    onClose?.()
  }

  return (
    <div className={`nav-overlay ${open ? 'is-open' : ''}`} aria-hidden={!open}>
      <div className="nav-overlay__panel">
        <button className="nav-overlay__close" aria-label="Close menu" onClick={onClose}>×</button>
        <ul className="nav-overlay__list">
          <li className="nav-item" onClick={() => go('home')}>HOME</li>
          <li className="nav-item active" onClick={() => go('the-trilight')}>THE TRILIGHT</li>
          <li className="nav-item" onClick={() => go('residences')}>RESIDENCES</li>
          <li className="nav-item" onClick={() => go('limited-editions')}>LIMITED EDITIONS</li>
          <li className="nav-item" onClick={() => go('clubhouses')}>CLUBHOUSES</li>
          <li className="nav-item" onClick={() => go('gallery')}>GALLERY</li>
          <li className="nav-item" onClick={() => go('floor-plans')}>FLOOR PLANS</li>
          <li className="nav-item" onClick={() => go('specifications')}>SPECIFICATIONS</li>
          <li className="nav-item" onClick={() => go('amenities')}>AMENITIES</li>
          <li className="nav-item" onClick={() => go('promoters')}>PROMOTERS</li>
          <li className="nav-item" onClick={() => go('newsletter')}>NEWSLETTER</li>
          <li className="nav-item" onClick={() => go('blog')}>BLOG</li>
          <li className="nav-item" onClick={() => go('construction-update')}>CONSTRUCTION UPDATE</li>
          <li className="nav-item" onClick={() => go('testimonials')}>TESTIMONIALS</li>
          <li className="nav-item" onClick={() => go('download')}>DOWNLOAD</li>
          <li className="nav-item" onClick={() => go('news')}>NEWS</li>
          <li className="nav-item" onClick={() => go('careers')}>CAREERS</li>
          <li className="nav-item" onClick={() => go('contact')}>CONTACT</li>
        </ul>
      </div>
    </div>
  )
}