import './BuildingShowcase.css'

function BuildingShowcase() {
  return (
    <section id="amenities" className="building-showcase">
      <div className="building-showcase-grid">
        <div className="building-showcase-image">
          {/* Building image placeholder (kept as is) */}
          <div className="building-image-placeholder">
            {/* Optional: Inserted caption without changing layout */}
            <div className="building-caption">Signature Towers: Canopus · Vega · Rigel</div>
          </div>
        </div>
        
        <div className="building-showcase-panels">
          {/* Insert content into existing panels without altering layout */}
          <div className="showcase-panel">
            <div className="panel-content">
              <h3 className="panel-title">Amenities Highlights</h3>
              <ul className="panel-list">
                <li>Infinity Pool & Sky Lounges</li>
                <li>Fully Equipped Gym & Spa</li>
                <li>Clubhouses at 3 Levels</li>
              </ul>
            </div>
          </div>
          <div className="showcase-panel">
            <div className="panel-content">
              <h3 className="panel-title">Specifications</h3>
              <ul className="panel-list">
                <li>Single-loaded Corridors</li>
                <li>Vastu-compliant Homes</li>
                <li>Constructed by TATA Projects</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default BuildingShowcase
