import { Button } from "@/components/ui/button";
import { Phone, Download, MapPin } from "lucide-react";

const MobileFooter = () => {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 glass border-t border-luxury-gold/20 p-4">
      <div className="flex space-x-2">
        <Button 
          size="sm" 
          className="flex-1 bg-luxury-gold hover:bg-luxury-gold-dark text-glass-white"
        >
          <Phone className="w-4 h-4 mr-1" />
          Call
        </Button>
        <Button 
          size="sm" 
          variant="outline"
          className="flex-1 border-luxury-gold text-luxury-gold hover:bg-luxury-gold hover:text-glass-white"
        >
          <Download className="w-4 h-4 mr-1" />
          Brochure
        </Button>
        <Button 
          size="sm" 
          variant="outline"
          className="flex-1 border-luxury-gold text-luxury-gold hover:bg-luxury-gold hover:text-glass-white"
        >
          <MapPin className="w-4 h-4 mr-1" />
          Visit
        </Button>
      </div>
    </div>
  );
};

export default MobileFooter;