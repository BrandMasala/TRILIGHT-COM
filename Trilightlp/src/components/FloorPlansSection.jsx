import './FloorPlansSection.css'

export default function FloorPlansSection() {
  const plans = [
    {
      type: '3 BHK',
      area: '2,400 – 2,600 sq.ft',
      highlights: ['Vastu Compliant', 'Central Courtyard Views', 'Single-loaded Corridors'],
      status: 'Limited Availability',
    },
    {
      type: '4 BHK',
      area: '3,200 – 3,600 sq.ft',
      highlights: ['Expansive Living Spaces', 'Premium Finishes', 'Corner Layout Options'],
      status: 'Most Popular',
    },
    {
      type: '5 BHK',
      area: '4,200 – 4,800 sq.ft',
      highlights: ['Sky Lounge Access', 'Private Deck Options', 'Exclusive Floor Plates'],
      status: 'Signature Residences',
    },
  ]

  return (
    <section id="floor-plans" className="floor-plans">
      <div className="floor-plans__container">
        <header className="floor-plans__header">
          <h2 className="floor-plans__title">Floor Plans</h2>
          <p className="floor-plans__subtitle">Thoughtfully designed residences across 3, 4 and 5 BHK configurations</p>
        </header>

        <div className="floor-plans__grid">
          {plans.map((p) => (
            <article className="plan" key={p.type}>
              <div className="plan__badge">{p.status}</div>
              <div className="plan__header">
                <h3 className="plan__type">{p.type}</h3>
                <div className="plan__area">{p.area}</div>
              </div>

              <ul className="plan__features">
                {p.highlights.map((h) => (
                  <li className="plan__feature" key={h}>
                    <span className="plan__check">✓</span>
                    {h}
                  </li>
                ))}
              </ul>

              <div className="plan__cta">
                <button className="plan__btn plan__btn--primary">Download Floor Plan</button>
                <button className="plan__btn plan__btn--secondary">Enquire Now</button>
              </div>
            </article>
          ))}
        </div>

        <div className="floor-plans__note">Pricing available on request. Dimensions and plans are indicative.</div>
      </div>
    </section>
  )
}