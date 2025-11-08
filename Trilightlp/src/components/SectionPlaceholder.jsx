import './SectionPlaceholder.css'

export default function SectionPlaceholder({ id, title }) {
  return (
    <section id={id} className="section-placeholder">
      <div className="section-placeholder__container">
        <h2 className="section-placeholder__title">{title}</h2>
        <p className="section-placeholder__body">Content coming soon.</p>
      </div>
    </section>
  )
}