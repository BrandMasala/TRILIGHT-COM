import './ClubhousesSection.css'

function ClubhousesSection() {
  const clubhouses = [
    {
      name: "The White Gloves",
      floors: "Ground - 6th Floors",
      indoorArea: "46,506 sq.ft",
      openArea: "4,694 sq.ft",
      description: "Experience luxury at ground level with premium amenities and services designed for comfort and elegance."
    },
    {
      name: "Up & Above", 
      floors: "14th - 16th Floors",
      indoorArea: "11,404 sq.ft",
      openArea: "2,666 sq.ft", 
      description: "Elevated luxury with breathtaking views and exclusive facilities for the discerning resident."
    },
    {
      name: "Thousands of Stars",
      floors: "47th - 48th Floors", 
      indoorArea: "17,232 sq.ft",
      openArea: "17,157 sq.ft",
      description: "Sky-high luxury with panoramic views and the ultimate in exclusive amenities and open-air experiences."
    }
  ]

  return (
    <section id="clubhouses" className="clubhouses">
      <div className="clubhouses-container">
        <div className="clubhouses-header">
          <h3 className="clubhouses-subtitle">Clubhouses</h3>
          <h2 className="clubhouses-main-title">Three Levels of Luxury Living</h2>
          <p className="clubhouses-description">
            Experience unparalleled luxury across three distinctive clubhouses, each offering unique amenities and breathtaking views at different elevations.
          </p>
        </div>

        <div className="clubhouses-grid">
          {clubhouses.map((clubhouse, index) => (
            <div key={index} className="clubhouse-card">
              <div className="clubhouse-header">
                <h3 className="clubhouse-name">{clubhouse.name}</h3>
                <p className="clubhouse-floors">{clubhouse.floors}</p>
              </div>
              
              <div className="clubhouse-details">
                <div className="area-details">
                  <div className="area-item">
                    <span className="area-value">{clubhouse.indoorArea}</span>
                    <span className="area-label">Indoor Area</span>
                  </div>
                  <div className="area-item">
                    <span className="area-value">{clubhouse.openArea}</span>
                    <span className="area-label">Open to Sky Area</span>
                  </div>
                </div>
                
                <p className="clubhouse-description">{clubhouse.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="clubhouses-cta">
          <button className="walkthrough-btn">
            <span>Explore 360° View</span>
          </button>
          <button className="walkthrough-btn secondary">
            <span>4BHK Walkthrough</span>
          </button>
        </div>
      </div>
    </section>
  )
}

export default ClubhousesSection
