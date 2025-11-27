import { useEffect, useRef, useState } from "react"

type DiscoverHeroProps = {
  image: string
  leftTop?: string
  leftMiddle?: string
  leftBottom?: string
  rightText?: string
}

const DiscoverHero = ({
  image,
  leftTop = "50",
  leftMiddle = "years of",
  leftBottom = "Incredible Legacy",
  rightText = "Trilight rises from a heritage of craftsmanship and modern design, delivering elevated living shaped by meticulous detail and enduring vision.",
}: DiscoverHeroProps) => {
  const sectionRef = useRef<HTMLDivElement | null>(null)
  const [progress, setProgress] = useState(0)
  const targetRef = useRef(0)
  const rafRef = useRef<number | null>(null)
  const tickingRef = useRef(false)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const onScroll = () => {
      const start = el.offsetTop
      const end = start + el.offsetHeight - window.innerHeight
      const s = window.scrollY
      if (s <= start) targetRef.current = 0
      else if (s >= end) targetRef.current = 1
      else targetRef.current = (s - start) / (end - start)
      if (!tickingRef.current) {
        tickingRef.current = true
        rafRef.current = requestAnimationFrame(() => {
          setProgress(targetRef.current)
          tickingRef.current = false
        })
      }
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => {
      window.removeEventListener("scroll", onScroll)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  const radius = 28 * (1 - progress)
  const widthVw = 60 + 40 * progress
  const heightVh = 50 + 50 * progress
  const overlayOpacity = 0.6 * (1 - progress)
  const insetPct = 18 * (1 - progress)

  return (
    <section id="discover-hero" ref={sectionRef} className="relative min-h-[160vh] bg-background">
      <div className="sticky top-0 h-screen flex items-center justify-center">
        <div
          className="relative max-w-none overflow-hidden"
          style={{
            width: `${widthVw}vw`,
            height: `${heightVh}vh`,
            borderRadius: `${radius}px`,
            boxShadow: `0 30px 60px rgba(0,0,0,${0.25 * (1 - progress)})`,
            clipPath: `inset(${insetPct}% round ${radius}px)`,
          }}
        >
          <img src={image} alt="Discover Hero" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-dark-elegant/70 to-dark-elegant/35" style={{ opacity: overlayOpacity }} />
          <div className="absolute inset-0 flex items-center justify-between px-8 md:px-14">
            <div className="text-glass-white" style={{ opacity: Math.min(1, progress * 1.6), transform: `translateY(${20 * (1 - progress)}px)` }}>
              <div className="font-heading text-3xl md:text-5xl">{leftTop}</div>
              <div className="font-body text-lg md:text-xl">{leftMiddle}</div>
              <div className="font-heading text-2xl md:text-3xl">{leftBottom}</div>
            </div>
            <div className="glass rounded-2xl p-4 md:p-6 max-w-sm" style={{ opacity: Math.min(1, progress * 1.6), transform: `translateY(${20 * (1 - progress)}px)` }}>
              <p className="font-body text-neutral-cream/95 text-sm md:text-base">
                {rightText}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default DiscoverHero
