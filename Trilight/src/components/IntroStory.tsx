import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import "./Visionaries.css";
import Sanjay from "@/assets/images/amenities/24 copy.webp";
import Sanjeev from "@/assets/images/amenities/23 copy.webp";

const Visionaries = () => {
  const titleRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const [titleVisible, setTitleVisible] = useState(false);
  const [cardsVisible, setCardsVisible] = useState(false);
  const [titleAnimated, setTitleAnimated] = useState(false);
  const [cardsAnimated, setCardsAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target === titleRef.current && entry.isIntersecting && !titleAnimated) {
            setTitleVisible(true);
            setTitleAnimated(true);
          }
          if (entry.target === cardsRef.current && entry.isIntersecting && !cardsAnimated) {
            setCardsVisible(true);
            setCardsAnimated(true);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (titleRef.current) observer.observe(titleRef.current);
    if (cardsRef.current) observer.observe(cardsRef.current);

    return () => observer.disconnect();
  }, [titleAnimated, cardsAnimated]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  };

  const titleVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8
      }
    }
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8, rotateY: -180 },
    visible: {
      opacity: 1,
      scale: 1,
      rotateY: 0,
      transition: {
        duration: 1
      }
    }
  };

  const quoteVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: 0.3
      }
    }
  };

  return (
    <section className="visionaries section section-light" id="gallery">
      <div className="container">
        <motion.div 
          className="visionaries-content"
          variants={containerVariants}
          initial="hidden"
          animate={titleVisible ? "visible" : "hidden"}
        >
          <motion.h3
            ref={titleRef}
            className="visionaries-title"
            initial={{ opacity: 0, y: 20 }}
            animate={titleVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            VISIONARIES
          </motion.h3>
          
          <motion.div 
            ref={cardsRef}
            className="visionaries-profiles"
            variants={containerVariants}
            initial="hidden"
            animate={cardsVisible ? "visible" : "hidden"}
          >
            <motion.div 
              className="visionary-profile"
              variants={cardVariants}
            >
              <motion.div 
                className="profile-image"
                variants={imageVariants}
              >
                <img 
                  src={Sanjeev} 
                  alt="Sanjeeva Reddy" 
                  className="profile-img"
                  loading="lazy"
                  decoding="async"
                />
              </motion.div>
              <motion.div 
                className="profile-content"
                variants={quoteVariants}
              >
                <motion.blockquote 
                  className="profile-quote"
                  whileHover={{ 
                    color: "#ceb173",
                    scale: 1.02
                  }}
                >
                  "The Trilight Residences isn't in the business of mere square foot; we're sculpting the very horizon of aspiration."
                </motion.blockquote>
              </motion.div>
              <div className="profile-separator"></div>
              <motion.div 
                className="profile-name"
                whileHover={{ color: "#ceb173" }}
                style={{
                  textAlign: "right",
                  paddingRight: "2rem",
                  justifyContent: "flex-end"
                }}
              >J Sanjeeva Reddy</motion.div>
            </motion.div>
            
            <motion.div 
              className="visionary-profile"
              variants={cardVariants}
            >
              <motion.div 
                className="profile-image"
                variants={imageVariants}
              >
                <img 
                  src={Sanjay} 
                  alt="Sanjay Mangatram" 
                  className="profile-img"
                  loading="lazy"
                  decoding="async"
                />
              </motion.div>
              <motion.div 
                className="profile-content"
                variants={quoteVariants}
              >
                <motion.blockquote 
                  className="profile-quote"
                  whileHover={{ 
                    color: "#ceb173",
                    scale: 1.02
                  }}
                >
                  "Born from a lineage that refused to settle for enough, we are the visionaries who burn the blueprints of convention."
                </motion.blockquote>
              </motion.div>
              <div className="profile-separator"></div>
              <motion.div 
                className="profile-name"
                whileHover={{ color: "#ceb173" }}
                style={{
                  textAlign: "right",
                  paddingRight: "0.5rem",
                  justifyContent: "flex-end"
                }}
              >Sanjay Mangatram</motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Visionaries;
