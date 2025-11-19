import { useState } from "react";
import heroTowersImage from "@/assets/hero-towers.jpg";
import clubhouseImage from "@/assets/clubhouse-interior.jpg";
import luxuryInteriorImage from "@/assets/luxury-interior.jpg";
import infinityPoolImage from "@/assets/infinity-pool.jpg";

const SignatureResidences = () => {
  

  const milestones = [
    {
      year: "2022",
      title: "Concept & Masterplan",
      description:
        "TRILIGHT vision established and masterplan defined with luxury-first design principles.",
      image: heroTowersImage,
    },
    {
      year: "2023",
      title: "Phase Infrastructure",
      description:
        "Core groundworks and services completed to enable vertical rise across the site.",
      image: clubhouseImage,
    },
    {
      year: "2024",
      title: "Rise With 9",
      description:
        "Urban sky residences introduced with privacy-first layouts and single-loaded corridors.",
      image: luxuryInteriorImage,
    },
    {
      year: "2025",
      title: "Signature Residences",
      description:
        "Canopus tower signature release featuring curated amenities and bespoke interiors.",
      image: infinityPoolImage,
    },
  ];

  const [active, setActive] = useState<number>(0);

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="font-heading text-5xl md:text-6xl text-dark-elegant mb-4">A Journey Through the Times</h2>
          <p className="font-body text-lg text-muted-foreground">Hover over a year to reveal the story</p>
        </div>

        <div className="max-w-7xl mx-auto">
          <div className="flex gap-3">
            {milestones.map((m, i) => (
              <div
                key={m.year}
                className="group relative rounded-2xl overflow-hidden shadow-elegant transition-all duration-500 cursor-pointer h-[260px] md:h-[360px]"
                style={{ flex: active === i ? '3 1 0%' : '1 1 0%', minWidth: 180 }}
                onMouseEnter={() => setActive(i)}
                onMouseLeave={() => setActive(active)}
              >
                <img
                  src={m.image}
                  alt={m.title}
                  className="absolute inset-0 w-full h-full object-cover"
                  style={{ filter: active === i ? 'grayscale(0)' : 'grayscale(100%)', transform: active === i ? 'scale(1.02)' : 'scale(1)', transition: 'var(--transition-smooth)' }}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/55 to-black/20" style={{ opacity: active === i ? 0.85 : 0.6 }} />

                {active === i ? (
                  <div className="absolute inset-0 p-6 md:p-8 flex items-center">
                    <div className="text-glass-white">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="font-heading text-3xl md:text-4xl">{m.year}</span>
                        <span className="font-heading text-xl md:text-2xl">— {m.title}</span>
                      </div>
                      <p className="font-body text-neutral-cream/95 max-w-md">
                        {m.description}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="font-heading text-2xl md:text-3xl text-glass-white">{m.year}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignatureResidences;