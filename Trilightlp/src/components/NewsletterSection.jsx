import './NewsletterSection.css'

export default function NewsletterSection() {
  const editions = [
    {
      title: "August Edition '24",
      excerpt:
        "Latest community news, exclusive events, and insider updates on residences.",
      href: 'https://thetrilight.com/newsletter-page/',
    },
    {
      title: "July Edition '24",
      excerpt:
        "Honored with two Golden Brick Awards: Innovative Concept & Emerging Developer.",
      href: 'https://thetrilight.com/newsletter-page/',
    },
    {
      title: "January Edition '24",
      excerpt:
        "Construction progressing on time and to the highest quality standards.",
      href: 'https://thetrilight.com/newsletter-page/',
    },
    {
      title: 'September Edition',
      excerpt:
        'Trilight Towers contribute to Kokapet’s flourishing community; construction on course.',
      href: 'https://thetrilight.com/newsletter-page/',
    },
    {
      title: 'July Edition',
      excerpt:
        'Construction progress remains steady and on track to realize your vision.',
      href: 'https://thetrilight.com/newsletter-page/',
    },
    {
      title: 'May Edition',
      excerpt:
        'Construction procedure continues on schedule, matching expectations for quality.',
      href: 'https://thetrilight.com/newsletter-page/',
    },
    {
      title: 'April Edition',
      excerpt:
        'Work is progressing smoothly; we remain on track to deliver on time.',
      href: 'https://thetrilight.com/newsletter-page/',
    },
    {
      title: 'March Edition',
      excerpt:
        'Tireless efforts to complete the project on time with top quality.',
      href: 'https://thetrilight.com/newsletter-page/',
    },
    {
      title: 'February Edition',
      excerpt:
        'Kokapet rapidly becomes the gold standard; Trilight adds to the grandeur.',
      href: 'https://thetrilight.com/newsletter-page/',
    },
  ]

  return (
    <section id="newsletter" className="newsletter">
      <div className="newsletter__container">
        <header className="newsletter__header">
          <h2 className="newsletter__title">NEWSLETTER</h2>
          <div className="newsletter__divider" />
          <p className="newsletter__tagline">
            Stay updated with the latest from The Trilight — where luxury living
            meets unparalleled exclusivity.
          </p>
        </header>

        <div className="newsletter__grid">
          {editions.map((n) => (
            <article key={n.title} className="newsletter-card">
              <h3 className="newsletter-card__title">{n.title}</h3>
              <p className="newsletter-card__excerpt">{n.excerpt}</p>
              <a
                className="newsletter-card__link"
                href={n.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                Read More
              </a>
            </article>
          ))}
        </div>

        <div className="newsletter__cta">
          <a
            className="newsletter__btn"
            href="https://thetrilight.com/newsletter-page/"
            target="_blank"
            rel="noopener noreferrer"
          >
            View All Editions
          </a>
        </div>
      </div>
    </section>
  )
}