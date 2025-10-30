import { useEffect, useRef, useState } from 'react'
import './HeroSection.css'

export default function HeroSection({
  title = 'TRILIGHT',
}) {
  const [scroll, setScroll] = useState(0)
  const sectionRef = useRef(null)
  const headerRef = useRef(null)
  const titleRef = useRef(null)

  useEffect(() => {
    const onScroll = () => {
      const s = window.scrollY || document.documentElement.scrollTop
      setScroll(s)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    // Entrance animations
    const header = headerRef.current
    const titleEl = titleRef.current
    if (header) header.classList.add('enter')
    if (titleEl) titleEl.classList.add('enter')
  }, [])

  const parallaxVideoStyle = {
    transform: `translateY(${scroll * 0.1}px) scale(${1 + Math.min(scroll / 4000, 0.08)})`,
  }

  const parallaxTitleStyle = {
    transform: `translate3d(0, ${Math.max(-40, 40 - scroll * 0.1)}px, 0)`,
    opacity: Math.max(0, 1 - scroll / 600),
  }

  return (
    <section className="hero" ref={sectionRef}>
      <header className="hero__header" ref={headerRef}>
        <div className="brand">
          <span className="brand__logo" aria-hidden>
            {/* Simple brand mark substitute */}
            <svg width="24" height="16" viewBox="0 0 24 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2 14L8 2L14 14L22 2" stroke="white" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </span>
          <span className="brand__name">TRILIGHT</span>
        </div>
        <div className="header__actions">
          <button className="icon-btn" aria-label="Search">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="11" cy="11" r="7" stroke="white" strokeWidth="2"/>
              <path d="M20 20L17 17" stroke="white" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
          <button className="icon-btn" aria-label="Menu">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 6H20M4 12H20M4 18H20" stroke="white" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>
      </header>

      <div className="hero__media" style={parallaxVideoStyle}>
        {/* Video placeholder - replace with your own video */}
        <div className="hero__vignette" />
      </div>

      <div className="hero__content">
        <h1 className="hero__title" style={parallaxTitleStyle} ref={titleRef}>
          {title}
        </h1>
        <div className="scroll-indicator">
          <span className="scroll-indicator__line" />
        </div>
      </div>
    </section>
  )
}