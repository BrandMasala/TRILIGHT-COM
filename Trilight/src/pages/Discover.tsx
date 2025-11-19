import { useEffect, useRef, useState } from "react";
import { Diamond, Users, PieChart } from "lucide-react";
import heroImage from "@/assets/hero-towers.jpg";
import PhilosophySection from "@/components/TrilightMeaning";
import Visionaries from "@/components/IntroStory";
import SignatureResidences from "@/components/SignatureResidences";

const Discover = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [progress, setProgress] = useState(0);
  const targetRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const tickingRef = useRef(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const onScroll = () => {
      const start = el.offsetTop;
      const end = start + el.offsetHeight - window.innerHeight;
      const s = window.scrollY;
      if (s <= start) {
        targetRef.current = 0;
      } else if (s >= end) {
        targetRef.current = 1;
      } else {
        targetRef.current = (s - start) / (end - start);
      }
      if (!tickingRef.current) {
        tickingRef.current = true;
        rafRef.current = requestAnimationFrame(() => {
          setProgress(targetRef.current);
          tickingRef.current = false;
        });
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const radius = 28 * (1 - progress);
  const widthVw = 60 + 40 * progress;
  const heightVh = 50 + 50 * progress;
  const overlayOpacity = 0.6 * (1 - progress);
  const insetPct = 18 * (1 - progress);

  return (
    <div>
      <section ref={sectionRef} className="relative min-h-[160vh] bg-background">
        <div className="sticky top-0 h-screen flex items-center justify-center">
          <div
            className="relative max-w-none overflow-hidden"
            style={{ width: `${widthVw}vw`, height: `${heightVh}vh`, borderRadius: `${radius}px`, boxShadow: `0 30px 60px rgba(0,0,0,${0.25 * (1 - progress)})`, clipPath: `inset(${insetPct}% round ${radius}px)` }}
          >
            <img src={heroImage} alt="Discover Hero" className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-dark-elegant/70 to-dark-elegant/35" style={{ opacity: overlayOpacity }} />
            <div className="absolute inset-0 flex items-center justify-between px-8 md:px-14">
              <div
                className="text-glass-white"
                style={{ opacity: Math.min(1, progress * 1.6), transform: `translateY(${20 * (1 - progress)}px)` }}
              >
                <div className="font-heading text-3xl md:text-5xl">50</div>
                <div className="font-body text-lg md:text-xl">years of</div>
                <div className="font-heading text-2xl md:text-3xl">Incredible Legacy</div>
              </div>
              <div
                className="glass rounded-2xl p-4 md:p-6 max-w-sm"
                style={{ opacity: Math.min(1, progress * 1.6), transform: `translateY(${20 * (1 - progress)}px)` }}
              >
                <p className="font-body text-neutral-cream/95 text-sm md:text-base">
                  Trilight rises from a heritage of craftsmanship and modern design, delivering elevated living shaped by meticulous detail and enduring vision.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid md:grid-cols-2 gap-10 mb-12">
            <h3 className="font-heading text-4xl md:text-5xl text-dark-elegant">Building Excellence for Generations</h3>
            <p className="font-body text-muted-foreground">
              We pride ourselves on uncompromising standards. Craftsmanship and detailing form our legacy across decades, where small refinements combine to create an extraordinary living experience.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center text-center">
            <div className="flex flex-col items-center gap-3">
              <div className="w-12 h-12 rounded-xl glass flex items-center justify-center">
                <Diamond className="w-6 h-6 text-luxury-gold" />
              </div>
              <div className="font-heading text-3xl text-dark-elegant">~8Mn</div>
              <div className="font-body text-sm text-muted-foreground">Square Feet Developed</div>
            </div>
            <div className="flex flex-col items-center gap-3 md:border-l md:border-border md:pl-8 md:ml-8">
              <div className="w-12 h-12 rounded-xl glass flex items-center justify-center">
                <Users className="w-6 h-6 text-luxury-gold" />
              </div>
              <div className="font-heading text-3xl text-dark-elegant">~3000</div>
              <div className="font-body text-sm text-muted-foreground">Employees as of 2024</div>
            </div>
            <div className="flex flex-col items-center gap-3 md:border-l md:border-border md:pl-8 md:ml-8">
              <div className="w-12 h-12 rounded-xl glass flex items-center justify-center">
                <PieChart className="w-6 h-6 text-luxury-gold" />
              </div>
              <div className="font-heading text-3xl text-dark-elegant">~10%</div>
              <div className="font-body text-sm text-muted-foreground">Market Share</div>
            </div>
          </div>
        </div>
      </section>
      <PhilosophySection />
      <Visionaries />
      <SignatureResidences />
    </div>
  );
};

export default Discover;