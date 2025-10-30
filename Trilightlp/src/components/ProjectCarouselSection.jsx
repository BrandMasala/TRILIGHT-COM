import { useEffect, useRef, useState } from 'react'
import './ProjectCarouselSection.css'

export default function ProjectCarouselSection({ title = 'Branded Luxury Collection', projects = [] }) {
  const [index, setIndex] = useState(0)
  const trackRef = useRef(null)

  const count = projects.length
  const safeIndex = (i) => (i + count) % count

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowRight') setIndex((i) => safeIndex(i + 1))
      if (e.key === 'ArrowLeft') setIndex((i) => safeIndex(i - 1))
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [count])

  const offset = -index * 100

  return (
    <section className="projects">
      <div className="projects__header">
        <h2 className="projects__title">{title}</h2>
      </div>

      <div className="carousel">
        <button className="carousel__ctrl left" aria-label="Previous" onClick={() => setIndex((i) => safeIndex(i - 1))}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15 6L9 12L15 18" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>

        <div className="carousel__viewport">
          <div className="carousel__track" ref={trackRef} style={{ transform: `translate3d(${offset}%, 0, 0)` }}>
            {projects.map((p, i) => (
              <article className={"slide" + (i === index ? ' is-active' : '')} key={p.id}>
                <figure className="slide__media" style={{ backgroundImage: `url(${p.image})` }}>
                  <figcaption className="slide__caption">
                    <div className="slide__kicker">{p.kicker}</div>
                    <div className="slide__name">{p.name}</div>
                    {p.location && <div className="slide__meta">{p.location}</div>}
                  </figcaption>
                </figure>
              </article>
            ))}
          </div>
        </div>

        <button className="carousel__ctrl right" aria-label="Next" onClick={() => setIndex((i) => safeIndex(i + 1))}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 6L15 12L9 18" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
      </div>

      <div className="carousel__dots" role="tablist" aria-label="Project selection">
        {projects.map((p, i) => (
          <button
            key={p.id}
            role="tab"
            className={"dot" + (i === index ? ' is-active' : '')}
            aria-selected={i === index}
            aria-controls={`slide-${p.id}`}
            onClick={() => setIndex(i)}
          />
        ))}
      </div>
    </section>
  )
}