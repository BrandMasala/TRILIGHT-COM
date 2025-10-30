import './ClubhousesSection.css'

function ClubhousesSection() {
  return (
    <section className="clubhouses">
      <div className="clubhouses-container">
        <h3 className="clubhouses-subtitle">One of a Kind 3 clubhouses</h3>
        
        <div className="clubhouses-titles">
          <h2 className="clubhouses-title">The White Gloves</h2>
          <h2 className="clubhouses-title">Up & Above</h2>
          <h2 className="clubhouses-title">Thousands of Stars</h2>
        </div>

        <div className="clubhouses-grid">
          <div className="clubhouses-amenities">
            <p className="amenities-text">
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod
            </p>
            <div className="amenities-badge">
              <span>A plethora of Amenities</span>
            </div>
          </div>

          <div className="clubhouses-empty-panels">
            <div className="panel"></div>
            <div className="panel"></div>
            <div className="panel"></div>
            <div className="panel"></div>
          </div>
        </div>

        <div className="walkthrough-video">
          <button className="walkthrough-btn">
            <span>Walkthrough video</span>
          </button>
        </div>
      </div>
    </section>
  )
}

export default ClubhousesSection
