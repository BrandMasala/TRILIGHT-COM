import './LocationSection.css'

function LocationSection() {
  const locations = [
    { name: 'International Airport', time: '02 Minutes' },
    { name: 'Bannerghata Road', time: '02 Minutes' },
    { name: 'Electronic city', time: '02 Minutes' },
    { name: 'Sarjapur Road', time: '02 Minutes' },
    { name: 'Whitefield', time: '02 Minutes' },
    { name: 'HSR Layout', time: '02 Minutes' },
    { name: 'Koramangala', time: '02 Minutes' },
    { name: 'Indiranagar', time: '02 Minutes' }
  ]

  return (
    <section className="location-section">
      <div className="location-container">
        <h2 className="location-title">The Best Part Of Location</h2>
        
        <div className="location-content">
          <div className="location-list">
            {locations.map((location, index) => (
              <div key={index} className="location-item">
                <div className="location-name">{location.name}</div>
                <div className="location-time">{location.time}</div>
              </div>
            ))}
          </div>

          <div className="location-map">
            {/* Map placeholder */}
            <div className="map-placeholder"></div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default LocationSection
