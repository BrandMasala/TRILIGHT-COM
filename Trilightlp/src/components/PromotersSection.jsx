import './PromotersSection.css'

export default function PromotersSection() {
  const blocks = [
    {
      name: 'De BlueOak Constructions',
      tagline: 'Quality & Luxury First',
      cols: [
        [
          "Suvarna Durga’s first steps were taken by its founder in 1978, with a vision to consolidate efforts of innumerable proud, hardworking entrepreneurs.",
          'The mainstream business then was in trading of paper — a self‑help initiative that perfected sourcing and distribution for the bottle trading supply chain.',
          'Thereafter, in 2010, Suvarna Durga Group entered Kraft Paper manufacturing to supply quality product to corrugated box manufacturers.',
          'The capacity has increased more than six‑fold to cater to demand, making Suvarna Durga one of South India’s largest kraft paper manufacturers.'
        ],
        [
          'The real estate opportunities in the early years of this decade saw Suvarna Durga Group step into construction and development under the banners — De BlueOak and Suvarna Durga.',
          'With lakhs of square feet of commercial and residential projects undertaken and completed in record time, the Group also ventured into constructing high street retail, A‑Grade office spaces, and residential development.',
          'The Group so far has 55 lakhs square feet of projects under construction.',
          'With Suvarna Durga Group, every customer can be assured of greater appreciation and uber quality lifestyle — be it residences or commercial spaces.'
        ]
      ]
    },
    {
      name: 'P Mangatram Developers',
      tagline: 'Welcome to Innovative Indulgence',
      cols: [
        [
          'With roots connected to the jewellery industry for over two decades, the quest for innovation design and customer relationships has always been at the forefront.',
          'The management’s philosophy of “Growth never stops” led to a venture in real estate, delivering professional management, international design concepts, execution, and the best of services.',
          'The vision is to be the region’s leading provider in conceptual and innovative real estate spaces — “Work with the Best” and “Deliver on Promise” form the core essence.',
          'Under construction and advanced stages are two flagship projects measuring 30 lakh square feet at premium locations, with additional projects planned across Hyderabad.'
        ],
        [
          'The group is dedicated to creating collaborative partnerships based on openness and mutual trust, and to creating employment as it expands across locations.',
          'A committed workforce supports the Group’s mission of bringing luxury and togetherness through subtle tones, bold textures, and rich materials with intricate detailing.',
          'The Trilight by P. Mangatram Developers is influenced by European aesthetics and assures a living experience of refined sophistication in the city.',
          'As the Group grows, it continues to deliver unique developments with innovation and excellence.'
        ]
      ]
    }
  ]

  return (
    <section id="promoters" className="promoters">
      <div className="promoters__container">
        <header className="promoters__header">
          <h2 className="promoters__title">Promoters</h2>
          <p className="promoters__subtitle">Partnerships rooted in quality, innovation, and trust</p>
        </header>

        {blocks.map((b) => (
          <div className="promoter-block" key={b.name}>
            <div className="promoter-block__head">
              <div className="promoter-block__name">{b.name}</div>
              <div className="promoter-block__tagline">{b.tagline}</div>
              <div className="promoter-block__rule" />
            </div>
            <div className="promoter-block__grid">
              <div className="promoter-col">
                {b.cols[0].map((p, i) => (
                  <p key={`l-${i}`}>{p}</p>
                ))}
              </div>
              <div className="promoter-col">
                {b.cols[1].map((p, i) => (
                  <p key={`r-${i}`}>{p}</p>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}