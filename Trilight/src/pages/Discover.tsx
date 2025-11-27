import { Diamond, Users, PieChart } from "lucide-react";
import heroImage from "@/assets/hero-towers.jpg";
import PhilosophySection from "@/components/TrilightMeaning";
import Visionaries from "@/components/IntroStory";
import SignatureResidences from "@/components/TimeLine";
import DiscoverHero from "@/components/DiscoverHero";
import DiscoverStats from "@/components/DiscoverStats";

const Discover = () => {
  const stats = [
    {
      icon: <Diamond className="w-6 h-6 text-luxury-gold" />,
      value: "~8Mn",
      label: "Square Feet Developed",
    },
    {
      icon: <Users className="w-6 h-6 text-luxury-gold" />,
      value: "~3000",
      label: "Employees as of 2024",
    },
    {
      icon: <PieChart className="w-6 h-6 text-luxury-gold" />,
      value: "~10%",
      label: "Market Share",
    },
  ]

  

  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <div>
      <DiscoverHero image={heroImage} />
      
      <DiscoverStats
        heading="Building Excellence for Generations"
        description="We pride ourselves on uncompromising standards. Craftsmanship and detailing form our legacy across decades, where small refinements combine to create an extraordinary living experience."
        stats={stats}
      />
      <PhilosophySection />
      <Visionaries />
      <SignatureResidences />
    </div>
  )
};

export default Discover;
