import './SpecificationsSection.css'

export default function SpecificationsSection() {
  const rows = [
    {
      title: 'Structure & Super Structure',
      lines: [
        { label: 'Foundation & Framed structure', text: 'RCC foundation and RCC framed structure to withstand wind and seismic loads as per relevant IS codes.' },
        { label: 'Walls', text: 'Reinforced shear walls with Aluminum form work / cement concrete blocks.' },
        { label: 'Floor to Floor height', text: '3.45 meters (11 feet 4 inches).' },
      ],
    },
    {
      title: 'Doors & Windows',
      lines: [
        { label: 'Main Door', text: '8 feet factory made engineered wood frame with veneered flush shutter, finished with PU polish with premium hardware.' },
        { label: 'Internal Doors', text: '8 feet factory made engineered wood frame with veneered flush shutter, finished with PU polish with premium hardware.' },
        { label: 'Toilet/Utility Doors', text: 'Factory made engineered wood framed with one side veneer and the other side with laminate flush shutter with premium hardware.' },
        { label: 'Sliding Door', text: 'Aluminium powder coated double glazed sliding doors with performance glass and premium hardware as per design intent.' },
        { label: 'Windows', text: 'Aluminium powder coated double glazed sliding windows with performance glass with premium hardware as per design and provision for mosquito mesh track.' },
        { label: 'Biometric Lock', text: 'Yale / Hafele or equivalent make.' },
      ],
    },
    { title: 'Railing', lines: [
      { label: 'Railing', text: 'Glass railing as per design intent.' },
      { label: 'Utility', text: 'MS railing with enamel paint.' },
    ]},
    { title: 'Vaastu', lines: [ { label: 'Vaastu', text: '100% Vaastu compliance.' } ] },
    { title: 'Wall Finishes', lines: [
      { label: 'External', text: 'Textured / smooth finish with two coats of exterior emulsion paint of premium make.' },
      { label: 'Internal', text: 'Smooth gypsum finish with two coats of premium acrylic emulsion paint of premium make over a coat of primer.' },
    ]},
    { title: 'Ceiling Finishes', lines: [ { label: 'Toilet', text: 'Grid ceiling to cover service lines.' } ] },
    { title: 'Flooring', lines: [
      { label: 'Drawing, living, dining, bedrooms, multipurpose', text: "8'x4' vitrified tile of premium make." },
      { label: 'Kitchen', text: "8'x4' glazed vitrified tile of premium make." },
      { label: 'Bathrooms', text: "6'x4' ceramic / vitrified tiles of premium make." },
      { label: 'Staircase', text: 'Granite / Natural stone / Vitrified tiles.' },
      { label: 'Corridors', text: 'Vitrified tiles of premium make.' },
      { label: 'Balconies', text: "2'x2' anti skid ceramic / vitrified tiles of premium make." },
      { label: 'Utilities', text: "2'x2' anti skid ceramic / vitrified tiles of premium make." },
    ]},
    { title: 'Tile Cladding / Dadoing', lines: [
      { label: 'Bathrooms', text: "Dado up to false ceiling height using 6'x4' glazed ceramic / vitrified tiles of premium make." },
      { label: 'Utilities', text: 'Ceramic tiles dado up to 5 feet height.' },
    ]},
    { title: 'Kitchen', lines: [ { label: 'Gas', text: 'Piped LPG gas connection with gas meter, provision for water purifier.' } ] },
    { title: 'Bathrooms', lines: [
      { label: 'Countertop', text: 'Countertop washbasin with a single lever mixer of Hansgrohe or equivalent make.' },
      { label: 'EWC', text: 'EWC with flush valve of Villeroy & Boch or equivalent make.' },
      { label: 'Mixer', text: 'Single-lever wall mixer with spout and overhead shower of Hansgrohe or equivalent make.' },
      { label: 'Faucets', text: 'Chrome-plated faucets of Hansgrohe or equivalent make.' },
      { label: 'Geyser', text: 'Provision for geyser in all bathrooms.' },
      { label: 'Exhaust', text: 'Provision of exhaust fans for all bathrooms.' },
    ]},
    { title: 'Home Automation', lines: [ { label: 'Automation', text: 'Wireless semi-automation.' } ] },
    { title: 'Electrical', lines: [
      { label: 'Geyser points', text: 'Power outlets for geysers in all bathrooms.' },
      { label: 'Kitchen appliances', text: 'Power plugs for cooking range and appliances (chimney, refrigerator, microwave oven, mixers/grinders, geyser, and water purifier) in kitchen.' },
      { label: 'Washing & dishwasher', text: 'Power outlets in utility area.' },
      { label: 'Three-phase', text: 'Three-phase supply in each unit with individual prepaid meters.' },
      { label: 'MCB', text: 'Miniature circuit breakers (MCB) of premium brand for distribution boards.' },
      { label: 'Modular switches', text: 'Modular switches of premium brand.' },
    ]},
    { title: 'Power Backup', lines: [ { label: 'DG', text: '100% DG backup with acoustic enclosure and AMF.' } ] },
    { title: 'Air Conditioning', lines: [ { label: 'AC', text: 'Air cooled VRV / Water cooled VRV air conditioning system — additional cost applies.' } ] },
    { title: 'Telecom', lines: [ { label: 'Telephone', text: 'Telephone points in drawing and master bedroom for all apartments.' } ] },
    { title: 'DTH', lines: [ { label: 'DTH', text: 'Provision for DTH connection in drawing, living, and all bedrooms.' } ] },
    { title: 'Internet', lines: [ { label: 'Internet', text: 'Wi‑Fi internet provision for all apartments.' } ] },
    { title: 'Lifts', lines: [
      { label: 'Passenger lifts', text: 'High-speed automatic passenger lifts with rescue device and V3F for energy efficiency of Mitsubishi/Schindler/Toshiba or equivalent make.' },
      { label: 'Service lifts', text: 'Service lifts with V3F for energy efficiency, for each tower of Mitsubishi/Schindler/Toshiba or equivalent make.' },
      { label: 'Cladding', text: 'Marble/Granite/Tile cladding at lift entrance.' },
    ]},
    { title: 'Waste Management', lines: [ { label: 'Chute', text: 'Garbage-collection chute provided at every floor level and centrally collected for better disposal.' } ] },
    { title: 'WTP & STP', lines: [
      { label: 'Water', text: 'Treated water via exclusive water softening and purification plant (bore water), with a water meter for each unit.' },
      { label: 'Sewage', text: 'Sewage treatment plant of adequate capacity (as per rooms); treated sewage water used for landscaping / flushing.' },
    ]},
    { title: 'Security / BMS', lines: [
      { label: 'Security', text: 'Round-the-clock security system.' },
      { label: 'Lift safety', text: 'Panic button and intercom facility in lifts connected to security.' },
      { label: 'CCTV', text: 'Comprehensive security system with cameras at necessary locations; 100% IP-based CC cameras protection & security room monitoring for all areas from entry to main doors of all units & back to exits.' },
    ]},
    { title: 'Car Parking & Management', lines: [
      { label: 'Parking', text: 'Ample car parking space across 4 levels of basements with adequate visitor car parks.' },
      { label: 'EV', text: 'Each flat provided with one EV charging point in the allotted car park.' },
      { label: 'Design', text: 'Parking facilities designed with signage and equipment at strategic locations for ease of driving.' },
      { label: 'Wash', text: 'Provision of a car wash facility in the basement area.' },
    ]},
    { title: 'Fire & Safety', lines: [
      { label: 'Hydrant & sprinkler', text: 'Fire hydrant and fire sprinkler system on all floors and basements.' },
      { label: 'Alarms', text: 'Fire alarms and smoke detector system in all apartments.' },
      { label: 'PA system', text: 'Public address system in all floors and parking areas (basement); control panel at main security.' },
    ]},
    { title: 'Facilities for Differently Abled', lines: [ { label: 'Access', text: 'Access and non-slippery ramps at all entrances for the physically challenged; appropriately designed preferred car park, uniformity in floor level, and visual warning signages.' } ] },
  ]

  return (
    <section id="specifications" className="specs specs--table">
      <div className="specs__container">
        <header className="specs__header">
          <h2 className="specs__title">The Trilight Specifications</h2>
          <p className="specs__subtitle">For 2888, 3666, 3888, 4777 & 5777 sq.ft residences</p>
        </header>

        <div className="spec-table" role="table" aria-label="Specifications">
          {rows.map((row) => (
            <div className="spec-row" role="row" key={row.title}>
              <div className="spec-row__heading" role="cell">{row.title}</div>
              <div className="spec-row__content" role="cell">
                {row.lines.map((ln) => (
                  <div className="spec-line" key={ln.label + ln.text}>
                    <span className="spec-line__label">{ln.label}:</span>
                    <span className="spec-line__text">{ln.text}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="specs__note">
          Notes: Specifications reflect the latest indicative information available and may be updated. Final specifications will be as per the promoter’s release.
        </div>
      </div>
    </section>
  )
}