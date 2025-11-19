import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";
import heroImage from "@/assets/hero-towers.jpg";

const HeroSection = () => {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Video/Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${heroImage})`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-dark-elegant/80 to-dark-elegant/40" />
      </div>
      
      {/* Floating particles animation */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-luxury-gold rounded-full animate-float opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 6}s`,
              animationDuration: `${6 + Math.random() * 4}s`
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-5xl mx-auto px-6 animate-fade-up">
        <h1 className="font-heading text-6xl md:text-8xl text-glass-white mb-6 leading-none">
          There's a Difference Between
          <span className="text-gradient block mt-4">
            Living and Living Artfully
          </span>
        </h1>
        
        <p className="font-body text-xl md:text-2xl text-neutral-cream mb-4 opacity-90">
          Luxury Residences | Golden Mile, Kokapet
        </p>
        
        <p className="font-body text-lg text-neutral-warm mb-12 max-w-2xl mx-auto">
          Where sapphire blue skies are your backdrop. Where sunlight becomes a gallery. 
          Where flawless design becomes a lifestyle.
        </p>

        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <Button 
            size="lg" 
            className="btn-luxury px-8 py-4 text-lg font-body-medium hover:scale-105 transition-all duration-300"
          >
            Explore Residences
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
          
          <Button 
            variant="outline" 
            size="lg"
            className="glass border-luxury-gold text-luxury-gold hover:bg-luxury-gold hover:text-dark-elegant px-8 py-4 text-lg font-body-medium transition-all duration-300"
          >
            <Play className="mr-2 w-5 h-5" />
            Book Experience Tour
          </Button>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-luxury-gold rounded-full p-1">
            <div className="w-1 h-3 bg-luxury-gold rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;