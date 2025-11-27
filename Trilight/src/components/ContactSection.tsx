import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Download, MapPin, MessageCircle } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import heroImage from "@/assets/hero-towers.jpg";

const ContactSection = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Thank you for your interest!",
      description: "Our team will contact you within 24 hours.",
    });
    setFormData({ name: '', phone: '', email: '', message: '' });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [progress, setProgress] = useState(0);
  const targetRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const [revealForm, setRevealForm] = useState(false);
  const [revealInterest, setRevealInterest] = useState(false);
  const [coverStage, setCoverStage] = useState<0 | 1 | 2>(0);
  const [showCover, setShowCover] = useState(true);
  const startedRef = useRef(false);
  const timersRef = useRef<number[]>([]);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const onScroll = () => {
      const start = el.offsetTop;
      const end = start + el.offsetHeight - window.innerHeight;
      const s = window.scrollY;
      if (s <= start) targetRef.current = 0;
      else if (s >= end) targetRef.current = 1;
      else targetRef.current = (s - start) / (end - start);
      setProgress(targetRef.current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const startSequence = () => {
      if (startedRef.current) return;
      startedRef.current = true;
      setCoverStage(1);
      timersRef.current.push(
        window.setTimeout(() => {
          setRevealInterest(true);
          setRevealForm(true);
        }, 3000)
      );
      timersRef.current.push(
        window.setTimeout(() => {
          setCoverStage(2);
          setShowCover(false);
        }, 3000)
      );
    };

    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0];
      if (entry.isIntersecting) startSequence();
    }, { threshold: 0.2 });
    observer.observe(el);
    return () => {
      observer.disconnect();
      timersRef.current.forEach((id) => clearTimeout(id));
    };
  }, []);

  const headlineOpacity = 1;
  const leftOpacity = revealInterest ? 1 : 0;
  const rightOpacity = revealForm ? 1 : 0;
  const panelTranslate = (revealInterest || revealForm) ? 0 : 30;
  const overlayOpacity = 0.5 + 0.5 * progress;

  return (
    <section id="contact" ref={sectionRef} className="relative min-h-screen bg-background overflow-hidden">
      <div className="sticky top-0 h-screen">
        <img src={heroImage} alt="Contact" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-black/10" style={{ opacity: overlayOpacity }} />
        <div className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none">
          <div className="text-center" style={{ opacity: showCover ? headlineOpacity : 0, transition: 'opacity 800ms ease' }}>
            <h2 className="font-heading text-6xl md:text-7xl text-glass-white mb-4">CONNECT WITH</h2>
            <div className="font-heading text-6xl md:text-7xl text-glass-white">TRILIGHT</div>
          </div>
        </div>
        <div className="absolute inset-y-0 right-0 z-20 pointer-events-none">
          <div
            style={{
              width: '100vw',
              height: '100%',
              background: 'rgba(0,0,0,0.65)',
              backdropFilter: 'blur(12px)',
              transform:
                coverStage === 0
                  ? 'translateX(120%)'
                  : coverStage === 1
                  ? 'translateX(0%)'
                  : 'translateX(-130%)',
              opacity: showCover ? 1 : 0,
              transition: 'transform 3200ms cubic-bezier(0.4, 0, 0.2, 1), opacity 800ms ease',
              willChange: 'transform, opacity',
            }}
          />
        </div>
        <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 z-30 w-[92%] md:w-[80%]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="glass rounded-2xl p-6 md:p-8 flex flex-col items-center justify-center text-center" style={{ opacity: leftOpacity, transform: `translateY(${panelTranslate}px)`, transition: 'opacity 2500ms ease, transform 3200ms ease' }}>
              <div className="space-y-3 text-glass-white/90">
                <div className="font-heading text-3xl md:text-4xl">EXPRESS YOUR INTEREST</div>
                <div className="mt-6 grid grid-cols-2 gap-3 mx-auto">
                  <Button variant="outline" className="glass border-luxury-gold text-luxury-gold"><Phone className="mr-2 w-4 h-4" /> Call Back</Button>
                  <Button variant="outline" className="glass border-luxury-gold text-luxury-gold"><MessageCircle className="mr-2 w-4 h-4" /> WhatsApp</Button>
                  <Button variant="outline" className="glass border-luxury-gold text-luxury-gold"><Download className="mr-2 w-4 h-4" /> Brochure</Button>
                  <Button variant="outline" className="glass border-luxury-gold text-luxury-gold"><MapPin className="mr-2 w-4 h-4" /> Visit</Button>
                </div>
              </div>
            </div>
            <div className="glass rounded-2xl p-6 md:p-8" style={{ opacity: rightOpacity, transform: `translateY(${panelTranslate}px)`, transition: 'opacity 2500ms ease, transform 5200ms ease' }}>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input name="name" placeholder="Name" value={formData.name} onChange={handleInputChange} className="h-12 bg-glass-white/40" required />
                  <Input name="phone" placeholder="Mobile" value={formData.phone} onChange={handleInputChange} className="h-12 bg-glass-white/40" required />
                </div>
                <Input name="email" type="email" placeholder="Email" value={formData.email} onChange={handleInputChange} className="h-12 bg-glass-white/40" required />
                <Textarea name="message" placeholder="Message" value={formData.message} onChange={handleInputChange} rows={4} className="bg-glass-white/40 resize-none" />
                <Button type="submit" size="lg" className="btn-luxury w-full py-4 text-lg">Meet TRILIGHT</Button>
              </form>
            </div>
          </div>
        </div>
        
      </div>
    </section>
  );
};

export default ContactSection;
