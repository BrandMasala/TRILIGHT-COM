import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import heroTowersImage from "@/assets/hero-towers.jpg";
import clubhouseImage from "@/assets/clubhouse-interior.jpg";
import luxuryInteriorImage from "@/assets/luxury-interior.jpg";
import infinityPoolImage from "@/assets/infinity-pool.jpg";

type UpdateItem = {
  year: string;
  title: string;
  description: string;
  image: string;
  link: string;
  videoUrl?: string;
  embedUrl?: string;
}

const SignatureResidences = () => {
  const milestones = [
    {
      year: "2022",
      title: "TheTrilight",
      description:
        "TRILIGHT vision established and masterplan defined with luxury-first design principles.",
      image: heroTowersImage,
    },
    {
      year: "2023",
      title: "Rise With 9",
      description:
        "Core groundworks and services completed to enable vertical rise across the site.",
      image: clubhouseImage,
    },
    // {
    //   year: "2024",
    //   title: "Trise",
    //   description:
    //     "Urban sky residences introduced with privacy-first layouts and single-loaded corridors.",
    //   image: luxuryInteriorImage,
    // },
    // {
    //   year: "2025",
    //   title: "Kompally",
    //   description:
    //     "Canopus tower signature release featuring curated amenities and bespoke interiors.",
    //   image: infinityPoolImage,
    // },
  ];

  const constructionUpdatesTrilight: UpdateItem[] = [
    {
      year: "Dec 2024",
      title: "Construction Update",
      description:
        "In just two years, we’ve achieved 50% construction across Canopus, Vega, and Rigel towers, from excavation to floor slabs and towering structures.",
      image: heroTowersImage,
      link: "https://thetrilight.com/construction-updates/",
    },
    {
      year: "Jun 2024",
      title: "Construction Update",
      description:
        "Project advancing smoothly with meticulous planning and execution. We remain steadfast in timely completion.",
      image: clubhouseImage,
      link: "https://thetrilight.com/construction-updates/",
    },
    {
      year: "May 2024",
      title: "Construction Update",
      description:
        "Transforming your dream home into reality with precision and care. Exceptional progress continues.",
      image: luxuryInteriorImage,
      link: "https://thetrilight.com/construction-updates/",
    },
    {
      year: "Feb 2024",
      title: "Construction Update",
      description:
        "Construction is advancing smoothly and remains on schedule for timely delivery.",
      image: infinityPoolImage,
      link: "https://thetrilight.com/construction-updates/",
    },
    {
      year: "Dec 2023",
      title: "Construction Update",
      description:
        "Everything is advancing seamlessly, assuring the timely delivery of your dream home.",
      image: heroTowersImage,
      link: "https://thetrilight.com/construction-updates/",
    },
    {
      year: "Sep 2023",
      title: "Construction Update",
      description:
        "Progress moving ahead without a hitch; confidently on track for timely delivery.",
      image: clubhouseImage,
      link: "https://thetrilight.com/construction-updates/",
    },
    {
      year: "Jul 2023",
      title: "Construction Update",
      description:
        "Project progressing seamlessly while upholding stringent quality standards.",
      image: luxuryInteriorImage,
      link: "https://thetrilight.com/construction-updates/",
    },
    {
      year: "May 2023",
      title: "Construction Update",
      description:
        "On track and making excellent progress toward completion.",
      image: infinityPoolImage,
      link: "https://thetrilight.com/construction-updates/",
    },
    {
      year: "Apr 2023",
      title: "Construction Update",
      description:
        "Working tirelessly to deliver on schedule; updated progress available.",
      image: heroTowersImage,
      link: "https://thetrilight.com/construction-updates/",
    },
    {
      year: "Mar 2023",
      title: "Construction Update",
      description:
        "Advancing smoothly with highest quality standards; on-time delivery expected.",
      image: clubhouseImage,
      link: "https://thetrilight.com/construction-updates/",
    },
    {
      year: "Feb 2023",
      title: "Construction Update",
      description:
        "Progressing smoothly; construction remains on schedule and of high quality.",
      image: luxuryInteriorImage,
      link: "https://thetrilight.com/construction-updates/",
    },
  ];

  const constructionUpdatesRiseWith9: UpdateItem[] = [
    {
      year: "Q2 2024",
      title: "Rise With 9 Update",
      description:
        "Co and privacy-first layouts progressing with structure and services across urban sky residences.",
      image: clubhouseImage,
      link: "https://thetrilight.com/construction-updates/",
    },
    {
      year: "Q3 2024",
      title: "Rise With 9 Update",
      description:
        "MEP rough-ins and superstructure advances; finishing mock-ups under review for single-loaded corridor design.",
      image: luxuryInteriorImage,
      link: "https://thetrilight.com/construction-updates/",
    },
    {
      year: "Q4 2024",
      title: "Rise With 9 Update",
      description:
        "Façade installation planning and interior frameworks aligned to privacy-first residences.",
      image: heroTowersImage,
      link: "https://thetrilight.com/construction-updates/",
    },
    {
      year: "Q1 2025",
      title: "Rise With 9 Update",
      description:
        "Commissioning sequence prepared; amenity integration and final QA tracking for phased handover.",
      image: infinityPoolImage,
      link: "https://thetrilight.com/construction-updates/",
    },
  ];

  const updatesByMilestone: Record<string, UpdateItem[]> = {
    "Rise With 9": constructionUpdatesRiseWith9,
  };

  const [active, setActive] = useState<number>(0);
  const [showConstruction, setShowConstruction] = useState(false);
  const [activeConstruction, setActiveConstruction] = useState<number>(0);
  const [selectedMilestone, setSelectedMilestone] = useState<number>(0);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const constructionSectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (showConstruction && constructionSectionRef.current) {
      const rectTop = constructionSectionRef.current.getBoundingClientRect().top + window.scrollY;
      const offset = 140;
      window.scrollTo({ top: rectTop - offset, behavior: "smooth" });
    }
  }, [showConstruction]);

  return (
    <>
    <section id="timeline" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="font-heading text-5xl md:text-6xl text-dark-elegant mb-4">A Journey Through the Times</h2>
          <p className="font-body text-lg text-muted-foreground">Hover over a year to reveal the story</p>
        </div>

        <div className="max-w-7xl mx-auto">
          <div className="flex gap-3">
            {milestones.map((m, i) => (
              <div
                key={m.year}
                className="group relative rounded-2xl overflow-hidden shadow-elegant transition-all duration-500 cursor-pointer h-[260px] md:h-[360px]"
                style={{ flex: active === i ? '3 1 0%' : '1 1 0%', minWidth: 180 }}
                onMouseEnter={() => setActive(i)}
                onMouseLeave={() => setActive(active)}
                onClick={() => { setSelectedMilestone(i); setActiveConstruction(0); setShowConstruction(true); }}
              >
                <img
                  src={m.image}
                  alt={m.title}
                  className="absolute inset-0 w-full h-full object-cover"
                  style={{ filter: active === i ? 'grayscale(0)' : 'grayscale(100%)', transform: active === i ? 'scale(1.02)' : 'scale(1)', transition: 'var(--transition-smooth)' }}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/55 to-black/20" style={{ opacity: active === i ? 0.85 : 0.6 }} />

                {active === i ? (
                  <div className="absolute inset-0 p-6 md:p-8 flex items-center">
                    <div className="text-glass-white">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="font-heading text-3xl md:text-4xl">{m.year}</span>
                        <span className="font-heading text-xl md:text-2xl">— {m.title}</span>
                      </div>
                      <p className="font-body text-neutral-cream/95 max-w-md">
                        {m.description}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="font-heading text-2xl md:text-3xl text-glass-white">{m.year}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
    {showConstruction && (
      <section id="construction" ref={constructionSectionRef} className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="font-heading text-5xl md:text-6xl text-dark-elegant mb-4">Construction Update — {milestones[selectedMilestone].title}</h2>
            <p className="font-body text-lg text-muted-foreground">Hover over a phase to reveal the update</p>
          </div>
          <div className="max-w-7xl mx-auto relative">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {(updatesByMilestone[milestones[selectedMilestone].title] ?? constructionUpdatesTrilight).map((m, i) => (
                <div
                  key={m.year}
                  className="group relative rounded-2xl overflow-hidden shadow-elegant transition-all duration-500 cursor-pointer h-[260px] md:h-[360px]"
                  onMouseEnter={() => { setActiveConstruction(i); }}
                  onMouseLeave={() => { setActiveConstruction(activeConstruction); }}
                  onClick={() => setExpandedIndex(i)}
                >
                  <div
                    className="absolute inset-0"
                    style={{ transform: activeConstruction === i ? 'scale(1.02)' : 'scale(1)', transition: 'var(--transition-smooth)' }}
                  >
                    {m.embedUrl ? (
                      <iframe
                        src={m.embedUrl}
                        className="w-full h-full"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                        loading="lazy"
                        title={`${m.title} ${m.year}`}
                      />
                    ) : m.videoUrl ? (
                      <video
                        src={m.videoUrl}
                        className="w-full h-full object-cover"
                        autoPlay
                        muted
                        loop
                        playsInline
                        poster={m.image}
                      />
                    ) : (
                      <img
                        src={m.image}
                        alt={m.title}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-r from-black/55 to-black/20" style={{ opacity: activeConstruction === i ? 0.85 : 0.6 }} />
                  {activeConstruction === i ? (
                    <div className="absolute inset-0 p-6 md:p-8 flex items-center">
                      <div className="text-glass-white">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="font-heading text-3xl md:text-4xl">{m.year}</span>
                          <span className="font-heading text-xl md:text-2xl whitespace-nowrap">— {m.title}</span>
                        </div>
                        <p className="font-body text-neutral-cream/95 max-w-md">
                          {m.description}
                        </p>
                        <a href={m.link} target="_blank" rel="noopener noreferrer" className="font-body underline text-neutral-cream/95">Read More</a>
                      </div>
                    </div>
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="font-heading text-2xl md:text-3xl text-glass-white">{m.year}</span>
                    </div>
                  )}
                </div>
              ))}
              {expandedIndex !== null && (
                <div className="fixed inset-0 z-[2000]">
                  <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setExpandedIndex(null)} />
                  <div className="absolute inset-0 flex items-center justify-center p-6 md:p-10" onClick={(e) => e.stopPropagation()}>
                    {(() => {
                      const data = (updatesByMilestone[milestones[selectedMilestone].title] ?? constructionUpdatesTrilight)[expandedIndex!]
                      return (
                        <div className="glass rounded-2xl overflow-hidden shadow-elegant max-w-5xl w-full">
                          <div className="relative h-[60vh]">
                            <button className="absolute top-4 right-4 z-10 rounded-full bg-black/50 text-white p-2 hover:bg-black/70 transition" onClick={() => setExpandedIndex(null)}>
                              <X className="w-5 h-5" />
                            </button>
                            {data.embedUrl ? (
                              <iframe
                                src={data.embedUrl}
                                className="absolute inset-0 w-full h-full"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                allowFullScreen
                                title={`${data.title} ${data.year}`}
                              />
                            ) : data.videoUrl ? (
                              <video
                                src={data.videoUrl}
                                className="absolute inset-0 w-full h-full object-cover"
                                autoPlay
                                muted
                                loop
                                playsInline
                                controls
                                poster={data.image}
                              />
                            ) : (
                              <img src={data.image} alt={data.title} className="absolute inset-0 w-full h-full object-cover" />
                            )}
                            <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30" />
                            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                              <div className="text-glass-white">
                                <div className="flex items-center gap-3 mb-2">
                                  <span className="font-heading text-3xl md:text-4xl">{data.year}</span>
                                  <span className="font-heading text-xl md:text-2xl whitespace-nowrap">— {data.title}</span>
                                </div>
                                <p className="font-body text-neutral-cream/95 max-w-3xl mb-4">
                                  {data.description}
                                </p>
                                <a href={data.link} target="_blank" rel="noopener noreferrer" className="font-body underline text-neutral-cream/95">Read More</a>
                              </div>
                            </div>
                          </div>
                        </div>
                      )
                    })()}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    )}
    </>
  );
};

export default SignatureResidences;
