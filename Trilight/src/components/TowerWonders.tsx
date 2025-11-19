import { Button } from "@/components/ui/button";
import { ArrowRight, Building, Users, Home } from "lucide-react";
import heroImage from "@/assets/hero-towers.jpg";
import craftsmanshipImg from "@/assets/luxury-interior.jpg";
import atelierImg from "@/assets/clubhouse-interior.jpg";
import signatureImg from "@/assets/infinity-pool.jpg";

const TowerWonders = () => {
  

  return (
    <section className="py-24 bg-neutral-cream relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-heading text-5xl md:text-6xl text-dark-elegant mb-6 animate-fade-up">
            The <span className="text-gradient">TRILIGHT</span> Legacy
          </h2>
          <p className="font-body text-2xl text-dark-elegant mb-8 animate-fade-up" style={{ animationDelay: '0.2s' }}>
            From Vision to Masterpiece: Defining Our Pillars.        
          </p>
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
                <h3 className="font-heading text-2xl text-dark-elegant">Craftsmanship</h3>
                <p className="font-body text-muted-foreground">Timeless detail and precision</p>
              </figcaption>
            </figure>
            <div className="mt-6 md:pr-10 md:border-r md:border-neutral-300 transition-transform duration-500 md:-translate-y-10 text-center">
              <p className="font-body text-dark-elegant/80 leading-relaxed">
                When building a house, attention to detail is essential. We recognise this, and pay attention to every detail, whether it’s the quality of the materials, textures and finishes, door hinges, doors, floor tiling, bathroom flooring, fittings or window size. A true craftsman for a harmonious life.
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
                <h3 className="font-heading text-2xl text-dark-elegant">Thoughtful Design</h3>
                <p className="font-body text-muted-foreground">Ideas shaped into form</p>
              </figcaption>
            </figure>
            <div className="mt-6 md:px-10 md:border-r md:border-neutral-300 transition-transform duration-500 md:translate-y-2 text-center">
              <p className="font-body text-dark-elegant/80 leading-relaxed">
                Home design is not just a structure; it’s a beautiful piece of art. Homes are spacious with well‑utilised spaces. The design is carefully considered and subjected to quality inspections. We consider every stage of construction to ensure a thoughtful design.
              </p>
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
                <h3 className="font-heading text-2xl text-dark-elegant">Signature Quality</h3>
                <p className="font-body text-muted-foreground">Elevated standards, every day</p>
              </figcaption>
            </figure>
            <div className="mt-6 md:pl-10 transition-transform duration-500 md:translate-y-10 text-center">
              <p className="font-body text-dark-elegant/80 leading-relaxed">
                We are involved in every stage of the process, from material sourcing to building homes. Every home we build is subjected to material quality inspection. Items used in construction are manufactured by us, allowing complete control over the quality of the products utilised.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TowerWonders;