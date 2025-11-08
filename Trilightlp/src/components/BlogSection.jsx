import { useState, useEffect } from 'react'
import './BlogSection.css'

export default function BlogSection() {
  const posts = [
    {
      id: 'land-reforms',
      title: 'Land Reforms in India: How Policy Changes Are Shaping the Real Estate Market',
      excerpt:
        'How evolving land policies influence India’s urban and rural real estate landscape.',
      href: 'https://thetrilight.com/blog/',
      image: '/gallery/g1.svg',
    },
    {
      id: 'hyderabad-trends-2024',
      title: 'The Future of Hyderabad Real Estate: Trends to Watch in 2024',
      excerpt:
        'Key trends driving Hyderabad’s growth and opportunities for buyers and investors.',
      href: 'https://thetrilight.com/blog/',
      image: '/gallery/g2.svg',
    },
    {
      id: 'location-key',
      title: 'Why Location is Key for Investing in Gated Community Apartments',
      excerpt:
        'Kokapet’s rise and why location selection defines long-term residential value.',
      href: 'https://thetrilight.com/blog/',
      image: '/gallery/g3.svg',
    },
    {
      id: 'homeownership-benefits',
      title: 'The Benefits of Homeownership: Why Owning a Home is More Than Just an Investment',
      excerpt:
        'Ownership offers security, stability, and community impact beyond pure returns.',
      href: 'https://thetrilight.com/blog/',
      image: '/gallery/g4.svg',
    },
    {
      id: 'eco-friendly-homes',
      title: 'Embracing Eco-Friendly Homes: A Sustainable Revolution',
      excerpt:
        'The shift toward greener design and construction to nurture people and planet.',
      href: 'https://thetrilight.com/blog/',
      image: '/gallery/g5.svg',
    },
  ]

  const [index, setIndex] = useState(0)
  const count = posts.length
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
  const resolvePublic = (path) => {
    const base = import.meta.env.BASE_URL || '/'
    const cleaned = String(path || '').replace(/^\//, '')
    return base + cleaned
  }

  return (
    <section id="blog" className="blog">
      <div className="blog__header">
        <h2 className="blog__title">BLOG</h2>
        <div className="blog__divider" />
      </div>

      <div className="blog-carousel">
        <button className="blog-carousel__ctrl left" aria-label="Previous" onClick={() => setIndex((i) => safeIndex(i - 1))}>
          ‹
        </button>

        <div className="blog-carousel__viewport">
          <div className="blog-carousel__track" style={{ transform: `translate3d(${offset}%, 0, 0)` }}>
            {posts.map((p, i) => (
              <article className={'blog-slide' + (i === index ? ' is-active' : '')} key={p.id}>
                <div className="blog-listing">
                  <div className="blog-thumb">
                    <img
                      src={resolvePublic(p.image)}
                      alt={p.title}
                      loading="lazy"
                      decoding="async"
                      onError={(e) => {
                        e.currentTarget.onerror = null
                        e.currentTarget.src = resolvePublic('/projects/p1.svg')
                      }}
                    />
                  </div>
                  <div className="blog-body">
                    <h3 className="blog-listing__title">
                      <a href={p.href} target="_blank" rel="noopener noreferrer">{p.title}</a>
                    </h3>
                    <p className="blog-listing__excerpt">{p.excerpt}</p>
                    <a className="blog-listing__read" href={p.href} target="_blank" rel="noopener noreferrer">
                      Read More
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        <button className="blog-carousel__ctrl right" aria-label="Next" onClick={() => setIndex((i) => safeIndex(i + 1))}>
          ›
        </button>
      </div>

      <div className="blog-carousel__dots" role="tablist" aria-label="Blog selection">
        {posts.map((p, i) => (
          <button
            key={p.id}
            role="tab"
            className={'blog-dot' + (i === index ? ' is-active' : '')}
            aria-selected={i === index}
            onClick={() => setIndex(i)}
          />
        ))}
      </div>

      <div className="blog__cta">
        <a className="blog__btn" href="https://thetrilight.com/blog/" target="_blank" rel="noopener noreferrer">
          View All Articles
        </a>
      </div>
    </section>
  )
}