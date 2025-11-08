import './NewsSection.css'

const NEWS_URL = 'https://thetrilight.com/news/'

const newsItems = [
  {
    id: 'n1',
    title: 'Project Launch',
    body:
      'Presenting The Trilight, a majestic architectural marvel of three opulent highrise towers and multi-level clubhouses at Kokapet, Hyderabad.',
    href: NEWS_URL,
  },
  {
    id: 'n2',
    title: "Doctor’s Day",
    body:
      'A grand evening celebrating the saviours of society — meticulously orchestrated to honour those dedicated to the service of humanity.',
    href: NEWS_URL,
  },
]

export default function NewsSection() {
  return (
    <section id="news" className="news">
      <div className="news__container">
        <header className="news__header">
          <h2 className="news__title">News & Updates</h2>
          <p className="news__subtitle">Latest stories and announcements from The Trilight</p>
        </header>

        <div className="news__grid">
          {newsItems.map((n) => (
            <article className="news__card" key={n.id}>
              <div className="news__card-body">
                <h3 className="news__card-title">{n.title}</h3>
                <p className="news__card-text">{n.body}</p>
              </div>
              <a className="news__card-link" href={n.href} target="_blank" rel="noopener noreferrer" aria-label={`Read more: ${n.title}`}>
                Read More
              </a>
            </article>
          ))}
        </div>

        <div className="news__cta">
          <a className="btn btn--primary news__cta-btn" href={NEWS_URL} target="_blank" rel="noopener noreferrer">
            View All News
          </a>
        </div>
      </div>
    </section>
  )
}