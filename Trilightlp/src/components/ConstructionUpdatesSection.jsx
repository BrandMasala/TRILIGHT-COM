import './ConstructionUpdatesSection.css'

export default function ConstructionUpdatesSection() {
  const url = 'https://thetrilight.com/construction-updates/'

  // Optional teaser entries; all link to the main page.
  const teasers = [
    { id: 'dec-2024', title: 'Construction Update — December 2024' },
    { id: 'jun-2024', title: 'June Construction Update 2024' },
    { id: 'may-2024', title: 'May Construction Update 2024' },
  ]

  return (
    <section id="construction-update" className="construction">
      <div className="construction__container">
        <header className="construction__header">
          <h2 className="construction__title">Construction Update</h2>
          <div className="construction__divider" />
          <p className="construction__tagline">
            Follow monthly progress across Canopus, Vega, and Rigel towers.
          </p>
        </header>

        <div className="construction__list" aria-label="Latest construction updates">
          {teasers.map((t) => (
            <a
              key={t.id}
              className="construction__item"
              href={url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="construction__item-title">{t.title}</span>
              <span className="construction__item-read">Read More</span>
            </a>
          ))}
        </div>

        <div className="construction__cta">
          <a
            className="construction__btn"
            href={url}
            target="_blank"
            rel="noopener noreferrer"
          >
            View All Updates
          </a>
        </div>
      </div>
    </section>
  )
}