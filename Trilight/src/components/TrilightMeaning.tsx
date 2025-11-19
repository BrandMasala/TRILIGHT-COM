import React from "react";
import { Card } from "@/components/ui/card";
import T1 from "@/assets/images/amenities/T1.webp";
import T2 from "@/assets/images/amenities/T2.webp";
import T3 from "@/assets/images/amenities/T3.webp";
import T10 from "@/assets/images/amenities/T10.webp";
import T12 from "@/assets/images/amenities/T12.webp";
import T13 from "@/assets/images/amenities/T13.jpg";

import { useIsMobile } from "@/hooks/use-mobile";

const PhilosophySection = () => {
  const isMobile = useIsMobile();
  const CARDS = [
    {
      key: "team",
      img: isMobile ? T13 : T3,
      title: "TEAM",
      subtitle: "OUR FOUNDATION",
      text:
        "Greatness isn't built in solitude. At The Trilight Residences, every brick is a byproduct of minds in harmony.",
    },
    {
      key: "trust",
      img: isMobile ? T12 : T2,
      title: "TRUST",
      subtitle: "OUR FOUNDATION",
      text:
        "Before the steel, comes belief. What we build isn't just towers—it's conviction.",
    },
    {
      key: "thrive",
      img: isMobile ? T10 : T1,
      title: "THRIVE",
      subtitle: "OUR FOUNDATION",
      text:
        "At The Trilight Residences, we design evolution, where ambitions rise, families thrive, and life ascends.",
    },
  ];
  return (
    <section
      id="philosophy"
      className="py-10 px-6"
    >
      <div className="max-w-6xl mx-auto text-center">
        <div className="text-center mb-16">
          <h2 className="font-heading text-5xl md:text-6xl text-dark-elegant mb-6 animate-fade-up">
            The Name <span className="text-gradient">Trilight</span>
          </h2>
          <p className="font-body text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-up" style={{ animationDelay: '0.2s' }}>
            What It Means
          </p>
        </div>


        <div className="reveal-up" style={{ transitionDelay: '0.3s' }}>
          {/* Mobile: simple vertical cards with overlayed content */}
          <div className="md:hidden grid gap-6 max-w-xl mx-auto">
            {CARDS.map((card, i) => (
              <div key={card.key} className="relative group">
                <Card className="overflow-hidden rounded-xl shadow-2xl border-primary/20 h-64 group">
                  <img src={card.img} alt={`Philosophy card ${i + 1}`} className="w-full h-full object-cover" loading="lazy" decoding="async" />
                  <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-end p-4 pb-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    <p className="text-white/90 text-sm leading-snug max-w-md text-center">{card.text}</p>
                  </div>
                </Card>
              </div>
            ))}
          </div>

          {/* Desktop: animated card stack with group hover overlay */}
          <div className="hidden md:block">
            <div className="relative w-full max-w-4xl h-[440px] mx-auto group">
              {/* Left card (Team) */}
              <Card className="absolute top-6 left-6 w-72 h-[400px] rounded-xl overflow-hidden shadow-2xl border-primary/20 bg-card/75 backdrop-blur-sm transition-transform duration-500 ease-out z-20 group-hover:-rotate-6 group-hover:-translate-x-4 group-hover:-translate-y-2 group">
                <img src={isMobile ? T13 : T3} alt="Philosophy card 1" className="w-full h-full object-cover" loading="lazy" decoding="async" />
                <div className="absolute inset-0 bg-black/35 flex flex-col items-center justify-end p-6 pb-10 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <p className="text-white/90 text-sm leading-snug">Greatness isn't built in solitude. At The Trilight Residences, every brick is a byproduct of minds in harmony.</p>
                </div>
              </Card>

              {/* Center card (Trust) */}
              <Card className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-[440px] rounded-xl overflow-hidden shadow-2xl border-primary/20 bg-card/75 backdrop-blur-sm transition-transform duration-500 ease-out z-30 group-hover:-translate-y-3 group">
                <img src={isMobile ? T12 : T2} alt="Philosophy card 2" className="w-full h-full object-cover" loading="lazy" decoding="async" />
                <div className="absolute inset-0 bg-black/35 flex flex-col items-center justify-end p-6 pb-10 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <p className="text-white/90 text-sm leading-snug">Before the steel, comes belief. What we build isn't just towers—it's conviction.</p>
                </div>
              </Card>

              {/* Right card (Thrive) */}
              <Card className="absolute top-6 right-6 w-72 h-[400px] rounded-xl overflow-hidden shadow-2xl border-primary/20 bg-card/80 backdrop-blur-md transition-transform duration-500 ease-out z-10 group-hover:rotate-6 group-hover:translate-x-4 group-hover:-translate-y-2 group">
                <img src={isMobile ? T10 : T1} alt="Philosophy card 3" className="w-full h-full object-cover" loading="lazy" decoding="async" />
                <div className="absolute inset-0 bg-black/35 flex flex-col items-center justify-end p-6 pb-10 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <p className="text-white/90 text-sm leading-snug">At The Trilight Residences, we design evolution, where ambitions rise, families thrive, and life ascends.</p>
                </div>
              </Card>

            </div>
          </div>
        </div>
        
        <div className="section-divider"></div>
      
      </div>
    </section>
  );
};

export default PhilosophySection;