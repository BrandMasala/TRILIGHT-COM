import { useEffect, useRef } from 'react'
import './GallerySection.css'

const FALLBACK_VIDEO = 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4'

function GalleryTile({ item }) {
  const videoRef = useRef(null)
  const tileRef = useRef(null)

  useEffect(() => {
    const el = tileRef.current
    const vid = videoRef.current
    if (!el || !vid) return
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          vid.play().catch(() => {})
        } else {
          vid.pause()
        }
      })
    }, { threshold: 0.2 })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <figure ref={tileRef} className="tile">
      <video
        ref={videoRef}
        className="tile__video"
        src={item.video || FALLBACK_VIDEO}
        autoPlay
        muted
        loop
        playsInline
      />
      <img className="tile__image" src={item.image} alt={item.alt || item.name} />
      <figcaption className="tile__caption">
        <div className="tile__name">{item.name}</div>
        {item.location && <div className="tile__meta">{item.location}</div>}
      </figcaption>
    </figure>
  )
}

export default function GallerySection({ title = 'Gallery', items = [] }) {
  return (
    <section className="gallery">
      <div className="gallery__header">
        <h2 className="gallery__title">{title}</h2>
      </div>
      <div className="gallery__grid">
        {items.map((item) => (
          <GalleryTile key={item.id} item={item} />
        ))}
      </div>
    </section>
  )
}