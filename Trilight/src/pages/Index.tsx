import TowerWonders from "@/components/TowerWonders";
import FeatureCards from "@/components/PressRelases";
import SkyClub from "@/components/StoriesWehaveBuild";
import ContactSection from "@/components/ContactSection";
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
