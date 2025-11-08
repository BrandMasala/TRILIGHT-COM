import './TestimonialsSection.css'

const TESTIMONIAL_URL = 'https://thetrilight.com/customer-testimonials/'

const items = [
  { id: 't1', title: 'Customer Video 1' },
  { id: 't2', title: 'Customer Video 2' },
  { id: 't3', title: 'Customer Video 3' },
  { id: 't4', title: 'Customer Video 4' },
  { id: 't5', title: 'Customer Video 5' },
  { id: 't6', title: 'Customer Video 6' },
]

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="testimonials">
      <div className="testimonials__header">
        <h2 className="testimonials__title">Customer Testimonials</h2>
        <p className="testimonials__subtitle">
          Watch what our customers say about The Trilight.
        </p>
      </div>

      <div className="testimonials__grid">
        {items.map((item) => (
          <a
            key={item.id}
            className="tcard"
            href={TESTIMONIAL_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${item.title} — opens in new tab`}
          >
            <div className="tcard__media" aria-hidden="true" />
            <div className="tcard__overlay">
              <div className="tcard__play" aria-hidden="true">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 5v14l11-7-11-7z" fill="currentColor"/>
                </svg>
              </div>
              <div className="tcard__caption">
                <div className="tcard__name">{item.title}</div>
                <div className="tcard__meta">Video testimonial</div>
              </div>
            </div>
          </a>
        ))}
      </div>

      <div className="testimonials__cta">
        <a className="testimonials__cta-btn" href={TESTIMONIAL_URL} target="_blank" rel="noopener noreferrer">
          View All Testimonials
        </a>
      </div>
    </section>
  )
}