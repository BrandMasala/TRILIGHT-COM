import './TheTrilightSection.css'

export default function TheTrilightSection() {
  return (
    <section id="the-trilight" className="the-trilight">
      <div className="the-trilight__container">
        <header className="the-trilight__header">
          <h2 className="the-trilight__title">The Trilight</h2>
          <p className="the-trilight__subtitle">A whole new culture in concept living</p>
        </header>

        <div className="the-trilight__content">
          <p>
            THE TRILIGHT is an enchanting world where sapphire blue skies serve as a backdrop to exquisite moments, where light and large open spaces become a gallery for your daily pursuits, and where design extends beyond the visible and becomes a way of life.
          </p>
          <p>
            Three sprawling skyscrapers named after the brightest stars in the sky — Canopus, Vega and Rigel — stand out in opulence through a one-of-a-kind structural design, offering unmatched amenities that are beyond experience.
          </p>
          <p>
            Situated at Golden Mile, Kokapet - Hyderabad, immediate connectivity to the ORR toll gate at the Financial District makes it a perfect destination for connoisseurs of success.
          </p>
        </div>

        <div className="the-trilight__facts">
          <div className="fact"><div className="fact__label">RERA No</div><div className="fact__value">PO24OOOO539O</div></div>
          <div className="fact"><div className="fact__label">Residences</div><div className="fact__value">462 Homes</div></div>
          <div className="fact"><div className="fact__label">Formats</div><div className="fact__value">3, 4, 5 Bedroom</div></div>
          <div className="fact"><div className="fact__label">Sizes</div><div className="fact__value">2888 – 5777 sq.ft</div></div>
          <div className="fact"><div className="fact__label">Limited Editions</div><div className="fact__value">10,111 & 11,333 sq.ft</div></div>
        </div>
      </div>
    </section>
  )
}