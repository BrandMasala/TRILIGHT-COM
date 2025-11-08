import './KeyHighlights.css'

function KeyHighlights() {
  const highlights = [
    { number: "3", label: "Towers", subtitle: "Canopus, Vega & Rigel" },
    { number: "462", label: "Limited Edition Homes", subtitle: "Exclusive Residences" },
    { number: "4.23", label: "Acres", subtitle: "Premium Land Area" },
    { number: "78%", label: "Open Area", subtitle: "Green & Open Spaces" },
    { number: "360°", label: "View from Central Courtyard", subtitle: "Panoramic Experience" },
    { number: "100%", label: "Vastu Compliant", subtitle: "Traditional Harmony" }
  ]

  return (
    <section className="key-highlights">
      <div className="key-highlights-header">
        <h2 className="key-highlights-title">Key Highlights</h2>
        <p className="key-highlights-description">
          THE TRILIGHT project will be a timeless modern 3 highrise towers namely Canopus 56 floors, Vega 46 floors and Rigel 49 floors offering 462 high quality built luxury residences spread across 4.23 acres with generous open light-filled spaces and grand outdoor living areas that create a lavish yet relaxed lifestyle for the owners.
        </p>
        <button className="kh-cta" type="button">Know More</button>
      </div>
      
      <div className="highlights-grid">
        {highlights.map((highlight, index) => (
          <div key={index} className="highlight-card">
            <div className="highlight-number">{highlight.number}</div>
            <div className="highlight-label">{highlight.label}</div>
            <div className="highlight-subtitle">{highlight.subtitle}</div>
          </div>
        ))}
      </div>
      
      <div className="key-highlights-features">
        <div className="feature-item">
          <h3>Single Loaded Corridors</h3>
          <p>Enhanced privacy and natural ventilation</p>
        </div>
        <div className="feature-item">
          <h3>TATA Projects Construction</h3>
          <p>Trusted construction management</p>
        </div>
        <div className="feature-item">
          <h3>Premium Location</h3>
          <p>Kokapet - Hyderabad's fastest growing zone</p>
        </div>
      </div>
    </section>
  )
}

export default KeyHighlights
