import { Newspaper, ExternalLink, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

const FeatureCards = () => {
  const releases = [
    {
      title: "Trilight unveils Sky Club trilogy for urban living",
      source: "Business Standard",
      date: "Oct 02, 2025",
      excerpt:
        "A three-tier club experience brings curated leisure, wellness and social spaces to residents.",
      url: "#",
    },
    {
      title: "Architectural Digest features Trilight’s 47th-floor infinity pool",
      source: "Architectural Digest India",
      date: "Sep 18, 2025",
      excerpt:
        "Elevated design and engineering deliver panoramic views and resort-style serenity in the sky.",
      url: "#",
    },
    {
      title: "Trilight announces smart living suites with automation",
      source: "Economic Times",
      date: "Aug 30, 2025",
      excerpt:
        "Integrated home systems enhance convenience, security and energy efficiency across residences.",
      url: "#",
    },
    {
      title: "European balcony craftsmanship showcased at Trilight",
      source: "Times of India",
      date: "Aug 12, 2025",
      excerpt:
        "Attention to materiality and detailing brings continental elegance to everyday life.",
      url: "#",
    },
    {
      title: "Trilight partners with leading hospitality designers",
      source: "Mint",
      date: "Jul 20, 2025",
      excerpt:
        "Collaborations elevate amenities and lifestyle programming with signature quality standards.",
      url: "#",
    },
    {
      title: "Launch of Rise With 9 urban sky residences",
      source: "The Hindu BusinessLine",
      date: "Jun 25, 2025",
      excerpt:
        "New tower release focuses on privacy-first layouts and single-loaded corridors.",
      url: "#",
    },
  ];

  return (
    <section className="py-24 bg-gradient-elegant relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-heading text-5xl md:text-6xl text-glass-white mb-6 animate-fade-up">
            Press Releases
          </h2>
          <p className="font-body text-xl text-neutral-cream max-w-3xl mx-auto animate-fade-up" style={{ animationDelay: '0.2s' }}>
            Latest news and media coverage about Trilight
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {releases.map((item, index) => (
            <div
              key={item.title}
              className="group animate-scale-in hover:scale-105 transition-all duration-500"
              style={{ animationDelay: `${0.3 + index * 0.1}s` }}
            >
              <div className="glass rounded-2xl p-8 h-full hover:shadow-luxury transition-all duration-500 border-luxury-gold/10 hover:border-luxury-gold/30">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Newspaper className="w-5 h-5 text-glass-white" />
                    <span className="font-body text-neutral-cream/90">{item.source}</span>
                  </div>
                  <div className="flex items-center gap-2 text-neutral-cream/70">
                    <Calendar className="w-4 h-4" />
                    <span className="font-body text-sm">{item.date}</span>
                  </div>
                </div>

                <h3 className="font-heading text-xl text-glass-white mb-3 group-hover:text-luxury-gold transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="font-body text-neutral-cream opacity-90 leading-relaxed mb-6">
                  {item.excerpt}
                </p>

                <div className="flex items-center justify-between">
                  <Button
                    variant="outline"
                    className="border-luxury-gold text-luxury-gold"
                    asChild
                  >
                    <a href={item.url} target="_blank" rel="noopener noreferrer">
                      Read Article
                      <ExternalLink className="w-4 h-4 ml-2" />
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center animate-fade-up" style={{ animationDelay: '1.5s' }}>
          <Button className="btn-luxury">View All Press</Button>
        </div>
      </div>
    </section>
  );
};

export default FeatureCards;
