"use client";
import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/all";
import PhilosophySection from '@/components/TrilightMeaning';

gsap.registerPlugin(ScrollTrigger);
console.log("GSAP loaded:", gsap);

export default function TrilightLanding() {
  const root = useRef<HTMLDivElement | null>(null);
  const heroBg = useRef<HTMLDivElement | null>(null);
  const heroText = useRef<HTMLDivElement | null>(null);
  const card = useRef<HTMLElement | null>(null);
  const textBlock = useRef<HTMLDivElement | null>(null);
  const imageBlock = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // scope all selectors to this component only
    const ctx = gsap.context(() => {
      // 1) subtle hero zoom + fade
      gsap.fromTo(
        heroBg.current,
        { scale: 1, opacity: 0.85 },
        { scale: 1.12, opacity: 1, duration: 2.4, ease: "power2.out" }
      );

      // 1b) parallax on scroll
      gsap.to(heroBg.current, {
        y: -60,
        ease: "none",
        scrollTrigger: {
          trigger: heroBg.current!,
          start: "top top",
          end: "bottom top",
          scrub: true,
          // markers: true,
        },
      });

      // 2) hero text fade-up
      gsap.from(heroText.current, {
        y: 28,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        delay: 0.15,
      });

      // 3) spotlight reveal: card expands from a small dot (clip-path)
      gsap.fromTo(
        card.current,
        { clipPath: "circle(6% at 50% 50%)", opacity: 0.92 },
        {
          clipPath: "circle(140% at 50% 50%)",
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: card.current!,
            start: "top 85%",
            end: "top 35%",
            scrub: true,
            // markers: true,
          },
        }
      );

      // 4) inside card: text + image fade-in only (no translate)
      gsap.from([textBlock.current, imageBlock.current], {
        opacity: 0,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: {
          trigger: card.current!,
          start: "top 80%",
          end: "top 50%",
          scrub: true,
        },
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={root} style={{ background: "#fff" }}>
      {/* HERO */}
      <section
        id="hero"
        style={{
          position: "relative",
          minHeight: "100vh",
          display: "grid",
          placeItems: "center",
          overflow: "hidden",
        }}
      >
        <div
          ref={heroBg}
          style={{
            position: "absolute",
            inset: 0,
            overflow: "hidden",
            transformOrigin: "center",
            willChange: "transform, opacity",
          }}
        >
          <img
            src="/trilight-hero.jpg"
            onError={(e) => {
              e.currentTarget.src =
                "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1600&auto=format&fit=crop";
            }}
            alt="Trilight skyline"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>
        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            background:
              "linear-gradient(180deg, rgba(0,0,0,.18), rgba(0,0,0,0) 35%, rgba(0,0,0,.25) 100%)",
          }}
        />
        <div
          ref={heroText}
          style={{
            position: "relative",
            color: "#fff",
            textAlign: "center",
            padding: "0 20px",
            textShadow: "0 10px 30px rgba(0,0,0,.45)",
          }}
        >
          <div
            style={{
              letterSpacing: ".18em",
              fontSize: 12,
              textTransform: "uppercase",
              opacity: 0.9,
            }}
          >
            Trilight
          </div>
          
          
          
        </div>  
        </section>

      {/* CURVED REVEAL CARD */}
      <section
        id="detail"
        ref={card}
        style={{
          position: "relative",
          margin: "-90px auto 0",
          width: "min(1900px,100vw)",
          background: "#fff",
          borderRadius: 36,
          boxShadow: "0 30px 60px rgba(0,0,0,.08)",
          overflow: "hidden",
          willChange: "transform, opacity",
          transformOrigin: "center center",
          clipPath: "circle(6% at 50% 50%)",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1.2fr",
            gap: "min(5vw, 48px)",
            padding: "clamp(28px, 5vw, 64px)",
            alignItems: "center",
          }}
        >
          <div
            ref={imageBlock}
            style={{
              gridColumn: 1,
              textAlign: "left",
            }}
          >
            <h2
              style={{
                fontSize: "clamp(52px,4.6vw,60px)",
                margin: "0 0 16px",
                color: "#111",
                letterSpacing: "-0.02em",
                fontWeight: 600,
              }}
            >
              <span>Our</span> <br/>Philosophy
            </h2>
          </div>
          <div
            ref={textBlock}
            style={{
              gridColumn: 2,
              textAlign: "right",
            }}
          >
            <p style={{ color: "#333", lineHeight: 1.7, margin: "0 0 18px" }}>
              "Constellations are stories between stars.
              Homes are stories between moments."
            </p>
            <p style={{ color: "#333", lineHeight: 1.7, margin: "0 0 18px" }}>
              At Trilight, we turn those moments into a constellation of living that tollows human rhythm

            </p>
            <Link
              to="/discover"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-block",
                padding: "12px 18px",
                border: "1px solid #111",
                borderRadius: 999,
                color: "#111",
                textDecoration: "none",
              }}
            >
              Discover More
            </Link>
          </div>

         
        </div>
      </section>
      {/* removed extra spacer to avoid large bottom whitespace */}
    </div>
  );
}
