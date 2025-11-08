import './ResidencesSection.css'

export default function ResidencesSection() {
  const features = [
    {
      title: 'Open Floor Plan',
      body: 'Living, dining and kitchen merge into one great room that spills into an expansive balcony — a true outdoor living room.',
    },
    {
      title: 'Large Balconies',
      body: 'Designed with entertainment in mind, keeping the focal point on breathtaking views with ample space for multiple seating areas.',
    },
    {
      title: 'Master Suites',
      body: 'Generous proportions with his-and-her bathrooms, open-plan walk-in closets and sharp modern design with European flair.',
    },
    {
      title: 'Vitrified Bathrooms',
      body: 'High-cladded vitrified tiled rest rooms and powder rooms that look more opulent than ever.',
    },
    {
      title: 'Chef-Friendly Kitchens',
      body: 'Clean, modern cabinetry with spacious dry and wet kitchen areas for daily cooking, prepping, and celebrations.',
    },
  ]

  const facts = [
    { label: 'Heights', value: 'Up to ~200m' },
    { label: 'Sizes', value: '2888 – 5777 sq.ft' },
    { label: 'Formats', value: '3, 4 & 5 BHK' },
    { label: 'Limited Editions', value: '10,111 & 11,333 sq.ft' },
  ]

  return (
    <section id="residences" className="residences">
      <div className="residences__container">
        <header className="residences__header">
          <h2 className="residences__title">Residences</h2>
          <p className="residences__subtitle">Fuel creativity and re-imagine living with precisely curated homes</p>
        </header>

        <div className="residences__intro">
          <p>
            Rising a splendid 200 meters above the earth at Golden Mile, homes at THE TRILIGHT ignite your mind and provide inspiration. Residences ranging from 2888 sq.ft to 5777 sq.ft feature expansive open floor plans that blend living, dining and kitchen spaces seamlessly.
          </p>
          <p>
            These modern homes spill into generous balconies that become true outdoor living rooms — perfect for dining with family or hosting friends while taking in breathtaking views.
          </p>
        </div>

        <div className="residences__facts">
          {facts.map((f) => (
            <div className="res-fact" key={f.label}>
              <div className="res-fact__label">{f.label}</div>
              <div className="res-fact__value">{f.value}</div>
            </div>
          ))}
        </div>

        <div className="residences__grid">
          {features.map((item) => (
            <article className="res-card" key={item.title}>
              <h3 className="res-card__title">{item.title}</h3>
              <p className="res-card__body">{item.body}</p>
            </article>
          ))}
        </div>

        <div className="residences__note">Limited edition formats of 10,111 sq.ft and 11,333 sq.ft are also available.</div>
      </div>
    </section>
  )
}