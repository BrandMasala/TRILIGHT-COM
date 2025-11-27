import { Button } from "@/components/ui/button";
import { ArrowRight, Building, Users, Home } from "lucide-react";
import heroImage from "@/assets/hero-towers.jpg";
import craftsmanshipImg from "@/assets/luxury-interior.jpg";
import atelierImg from "@/assets/clubhouse-interior.jpg";
import signatureImg from "@/assets/infinity-pool.jpg";

const TowerWonders = () => {
  

  return (
    <section id="design-ethos" className="py-24 bg-neutral-cream relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-heading text-5xl md:text-6xl text-dark-elegant mb-6 animate-fade-up">
            The <span className="text-gradient">Design</span> Ethos
          </h2>
          {/* <p className="font-body text-2xl text-dark-elegant mb-8 animate-fade-up" style={{ animationDelay: '0.2s' }}>
            From Vision to Masterpiece: Defining Our Pillars.        
          </p> */}
        </div>

        {/* Combined columns: image + caption + text for perfect alignment */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 animate-fade-up" style={{ animationDelay: '0.3s' }}>
          {/* Left column */}
          <div className="flex flex-col">
            <figure className="group transition-transform duration-500 md:-translate-y-10">
              <div className="relative rounded-xl overflow-hidden shadow-elegant h-[360px] md:h-[420px]">
                <img
                  src={craftsmanshipImg}
                  alt="Craftsmanship"
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              </div>
              <figcaption className="mt-4 text-center">
                <h3 className="font-heading text-2xl text-dark-elegant">Constellations of Clarity</h3>
                {/* <p className="font-body text-muted-foreground">Timeless detail and precision</p> */}
              </figcaption>
            </figure>
            <div className="mt-6 md:pr-10 md:border-r md:border-neutral-300 transition-transform duration-500 md:-translate-y-10 text-center">
              <p className="font-body text-dark-elegant/80 leading-relaxed">
              Craftsmanship at Trilight is rooted in quiet precision. Every detail is considered: materials, textures, finishes, hinges, tiling, fittings, and proportions. Nothing is overlooked.
              </p>
            </div>
          </div>

          {/* Middle column */}
          <div className="flex flex-col">
            <figure className="group transition-transform duration-500 md:translate-y-2">
              <div className="relative rounded-xl overflow-hidden shadow-elegant h-[360px] md:h-[420px]">
                <img
                  src={atelierImg}
                  alt="Design Studio"
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              </div>
              <figcaption className="mt-4 text-center">
                <h3 className="font-heading text-2xl text-dark-elegant">Constellations of Flow</h3>
                {/* <p className="font-body text-muted-foreground">Ideas shaped into form</p> */}
              </figcaption>
            </figure>
            <div className="mt-6 md:px-10 md:border-r md:border-neutral-300 transition-transform duration-500 md:translate-y-2 text-center">
              <p className="font-body text-dark-elegant/80 leading-relaxed">
                Every Trilight space is shaped for effortless movement. With meticulous planning and strict quality checks, ideas become spacious, well-utilised homes that move in rhythm with everyday life.              </p>
            </div>
          </div>

          {/* Right column */}
          <div className="flex flex-col">
            <figure className="group transition-transform duration-500 md:translate-y-10">
              <div className="relative rounded-xl overflow-hidden shadow-elegant h-[360px] md:h-[420px]">
                <img
                  src={signatureImg}
                  alt="Signature Quality"
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              </div>
              <figcaption className="mt-4 text-center">
                <h3 className="font-heading text-2xl text-dark-elegant">Constellations of Belonging</h3>
                {/* <p className="font-body text-muted-foreground">Elevated standards, every day</p> */}
              </figcaption>
            </figure>
            <div className="mt-6 md:pl-10 transition-transform duration-500 md:translate-y-10 text-center">
              <p className="font-body text-dark-elegant/80 leading-relaxed">
                Belonging emerges through c rafted social spaces that spark everday connection & with full material control & strict inspections, every space is built with uncompromising quality.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TowerWonders;
