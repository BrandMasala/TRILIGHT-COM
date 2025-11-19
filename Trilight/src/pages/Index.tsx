import HeroSection from "@/components/HeroSection";
import IntroStory from "@/components/IntroStory";
import TrilightMeaning from "@/components/TrilightMeaning";
import TowerWonders from "@/components/TowerWonders";
import FeatureCards from "@/components/FeatureCards";
import SignatureResidences from "@/components/SignatureResidences";
import SkyClub from "@/components/SkyClub";
import ContactSection from "@/components/ContactSection";
import MobileFooter from "@/components/MobileFooter";
import TrilightLanding from "@/components/About";



const Index = () => {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <TrilightLanding />
      <TowerWonders />
      <SkyClub />
      <FeatureCards />
      <ContactSection />
    </div>
  );
};

export default Index;
