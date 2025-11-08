import './LimitedEditionsSection.css'

export default function LimitedEditionsSection() {
  const specs = [
    { label: 'Tower', value: 'Canopus (High Floors)' },
    { label: 'Sizes', value: '10,111 & 11,333 sq.ft' },
    { label: 'Bedrooms', value: '5 Super-sized Bedrooms' },
    { label: 'Suites', value: 'Master Suite with Separate Sleeping & Lounge' },
  ]

  const features = [
    'His & Her walk-in closets',
    'Grand living lounge',
    'Large decks with limitless views of ORR and skyline',
    'Curated luxury with masterful craftsmanship',
    'Beauty found in every detail for lasting memories',
  ]

  return (
    <section id="limited-editions" className="limited">
      <div className="limited__container">
        <header className="limited__header">
          <h2 className="limited__title">Limited Editions</h2>
          <p className="limited__subtitle">Grandeur living high above, crafted to perfection</p>
        </header>

        <div className="limited__intro">
          <p>
            Welcome to Grandeur living at THE TRILIGHT. Spanning sizes 10,111 sq.ft and 11,333 sq.ft, these limited edition residences are placed high up at the Canopus tower. A master suite with separate sleeping and lounge areas, and his & her walk-in closets set the tone for a life beyond luxury.
          </p>
          <p>
            Consisting of five super-sized bedrooms for the master and family, the grand living lounge and large decks offer limitless views of the earth touching the sky and the outer ring roads — a prized possession in every sense.
          </p>
        </div>

        <div className="limited__specs">
          {specs.map((s) => (
            <div className="spec" key={s.label}>
              <div className="spec__label">{s.label}</div>
              <div className="spec__value">{s.value}</div>
            </div>
          ))}
        </div>

        <div className="limited__grid">
          {features.map((f) => (
            <article className="limited-card" key={f}>
              <h3 className="limited-card__title">{f}</h3>
            </article>
          ))}
        </div>

        <div className="limited__note">
          Enjoy an entirely new luxury residential experience where masterful craftsmanship touches every detail — curated luxury living.
        </div>
      </div>
    </section>
  )
}