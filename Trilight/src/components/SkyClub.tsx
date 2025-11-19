import { Button } from "@/components/ui/button";
import { ArrowRight, Waves, Wine, Gamepad2, Sailboat, Leaf, Puzzle, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import clubhouseImage from "@/assets/clubhouse-interior.jpg";
import infinityPoolImage from "@/assets/infinity-pool.jpg";
import heroTowersImage from "@/assets/hero-towers.jpg";
import luxuryInteriorImage from "@/assets/luxury-interior.jpg";

const SkyClub = () => {
  const projects = [
    {
      title: "THE TRILIGHT",
      subtitle: "Luxury Residences",
      image: heroTowersImage,
      features: [
        { label: "Infinity Swimming Pool", icon: Waves },
        { label: "Children's Play Areas", icon: Puzzle },
        { label: "Landscaped Courtyards", icon: Leaf },
        { label: "Yacht Club", icon: Sailboat },
      ],
    },
    {
      title: "RISE WITH 9",
      subtitle: "Urban Sky Living",
      image: clubhouseImage,
      features: [
        { label: "Infinity Swimming Pool", icon: Waves },
        { label: "Children's Play Areas", icon: Puzzle },
        { label: "Landscaped Courtyards", icon: Leaf },
        { label: "Yacht Club", icon: Sailboat },
      ],
    },
    {
      title: "TRISE",
      subtitle: "Timeless Interiors",
      image: luxuryInteriorImage,
      features: [
        { label: "Infinity Swimming Pool", icon: Waves },
        { label: "Children's Play Areas", icon: Puzzle },
        { label: "Landscaped Courtyards", icon: Leaf },
        { label: "Yacht Club", icon: Sailboat },
      ],
    },
  ];
  const [active, setActive] = useState(0);
  const slideCount = projects.length;

  const next = () => setActive((a) => (a + 1) % slideCount);
  const prev = () => setActive((a) => (a - 1 + slideCount) % slideCount);

  

  return (
    <section className="pt-24 pb-0 bg-gradient-elegant">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-heading text-5xl md:text-6xl text-glass-white mb-6 animate-fade-up">
            The Sky Club <span className="text-gradient">Trilogy</span>
          </h2>
          <p className="font-body text-xl text-neutral-cream max-w-3xl mx-auto animate-fade-up" style={{ animationDelay: '0.2s' }}>
            Three levels of extraordinary experiences, each crafted for different moments of your life
          </p>
        </div>

      </div>

      {/* Manual carousel */}
      <div className="relative">
        <div className="sticky top-0 h-screen">
          <div
            className="relative overflow-hidden h-full"
          >
            <div
              className="flex h-full transition-transform duration-700"
              style={{ transform: `translateX(-${active * 100}%)` }}
            >
          {projects.map((project, idx) => {
            const isActive = idx === active;
            const ease = isActive ? 1 : 0;
            const imgScale = 1 + 0.07 * ease;
            const baseOpacity = 0.75;
            const imgOpacity = baseOpacity + (1 - baseOpacity) * ease;
            const panelOpacity = baseOpacity + (1 - baseOpacity) * ease;
            const panelTranslateY = 24 * (1 - ease);

            return (
            <div key={project.title} className="relative min-h-screen w-screen flex-shrink-0">
              <img
                src={project.image}
                alt={project.title}
                className={`absolute inset-0 w-full h-full object-cover`}
                style={{ opacity: imgOpacity, transform: `scale(${imgScale})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark-elegant/60 to-transparent" style={{ opacity: ease }} />
              <div className="absolute bottom-8 left-1/2 w-[95%] md:w-[85%] glass rounded-2xl p-6 md:p-8 backdrop-blur-xl"
                   style={{ opacity: panelOpacity, transform: `translate(-50%, ${panelTranslateY}px)` }}>
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                  <div className="text-center md:text-left">
                    <h3 className="font-heading text-2xl md:text-3xl text-glass-white">{project.title}</h3>
                    <p className="font-body text-glass-white/80">{project.subtitle}</p>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full md:w-auto">
                    {project.features.map((feature, i) => {
                      const Icon = feature.icon;
                      const withBorders = i === 1 || i === 2 ? 'md:border-x md:border-white/20' : '';
                      return (
                        <div key={feature.label} className={`flex items-center gap-3 px-3 ${withBorders}`}>
                          <div className="w-10 h-10 rounded-xl glass flex items-center justify-center">
                            <Icon className="w-5 h-5 text-glass-white" />
                          </div>
                          <span className="font-body text-sm text-glass-white">{feature.label}</span>
                        </div>
                      );
                    })}
                  </div>
                  <div className="flex items-center gap-3">
                    <Button className="btn-luxury">Walkthrough</Button>
                    <Button variant="outline" className="border-luxury-gold text-luxury-gold">Call Back</Button>
                    <Button variant="outline" className="border-luxury-gold text-luxury-gold">WhatsApp</Button>
                  </div>
                </div>
              </div>
            </div>
            );
          })}
            </div>
            {/* Navigation */}
            <button
              aria-label="Previous"
              onClick={prev}
              className="absolute top-1/2 left-4 -translate-y-1/2 glass rounded-full p-3 hover:scale-105 transition"
            >
              <ChevronLeft className="w-6 h-6 text-glass-white" />
            </button>
            <button
              aria-label="Next"
              onClick={next}
              className="absolute top-1/2 right-4 -translate-y-1/2 glass rounded-full p-3 hover:scale-105 transition"
            >
              <ChevronRight className="w-6 h-6 text-glass-white" />
            </button>

            {/* Dots */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2">
              {projects.map((_, i) => (
                <button
                  key={i}
                  aria-label={`Go to slide ${i + 1}`}
                  onClick={() => setActive(i)}
                  className={`w-2.5 h-2.5 rounded-full ${active === i ? 'bg-glass-white' : 'bg-glass-white/40'}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkyClub;
