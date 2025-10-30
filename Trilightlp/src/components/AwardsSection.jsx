import './AwardsSection.css'

export default function AwardsSection({ title = 'Awards & Recognitions', awards = [], logos = [] }) {
  const repeatedLogos = [...logos, ...logos]

  return (
    <section className="awards">
      <div className="awards__header">
        <h2 className="awards__title">{title}</h2>
      </div>

      {/* Marquee of award logos */}
      <div className="marquee" aria-label="Awards logos">
        <div className="marquee__track">
          {repeatedLogos.map((src, i) => (
            <img className="marquee__logo" src={src} alt="" key={`logo-${i}`} />
          ))}
        </div>
      </div>

      {/* Awards cards */}
      <div className="awards__grid">
        {awards.map((a) => (
          <article className="award" key={a.id}>
            <div className="award__year">{a.year}</div>
            <div className="award__info">
              <div className="award__title">{a.title}</div>
              <div className="award__body">{a.body}</div>
            </div>
            {a.logo && <img className="award__badge" src={a.logo} alt="" />}
          </article>
        ))}
      </div>
    </section>
  )
}