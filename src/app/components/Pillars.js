"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

const Pillars = () => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [clickedCard, setClickedCard] = useState(null); // For mobile tap interaction
  const [sneakPeekIndex, setSneakPeekIndex] = useState(-1);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.2 });

  useEffect(() => {
    if (isInView && sneakPeekIndex === -1) {
      // Trigger staggered sneak peek
      setSneakPeekIndex(0);

      const timer1 = setTimeout(() => setSneakPeekIndex(1), 800);
      const timer2 = setTimeout(() => setSneakPeekIndex(2), 1600);
      const timer3 = setTimeout(() => setSneakPeekIndex(-1), 4000);

      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
        clearTimeout(timer3);
      };
    }
  }, [isInView, sneakPeekIndex]);

  const pillarsData = [
    {
      id: 1,
      number: "01",
      name: "Systems Media",
      what: "Documentary content, YouTube series, white papers, data visualizations",
      why: "Making complex problems accessible and actionable",
      focus: '"Living in Lagos Study" - our first deep dive',
      status: "Launching Q1 2025"
    },
    {
      id: 2,
      number: "02",
      name: "Research Lab",
      what: "Ethnographic research, policy analysis, urban studies, community interviews",
      why: "Going beyond headlines to understand root systems",
      focus: "1,000+ Lagos resident interviews on urban life",
      methodology: "Human-centered research + systems mapping"
    },
    {
      id: 3,
      number: "03",
      name: "Community Studio",
      what: "Convenings, workshops, fellowships, collaborative projects (coming soon)",
      why: "Ideas need community to become movements",
      vision: "Building a network of African systems thinkers",
      status: "Building our first cohort - get early access"
    }
  ];

  // Animation variants for container
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  // Animation variants for individual cards
  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  // Handle card click for mobile
  const handleCardClick = (index) => {
    if (clickedCard === index) {
      setClickedCard(null);
    } else {
      setClickedCard(index);
    }
  };

  // Calculate animation delay for staggered wave effect
  const getAnimationDelay = (index) => {
    return `${index * 0.66}s`;
  };

  return (
    <motion.section
      ref={containerRef}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
      className="max-w-6xl mx-auto py-20 px-8"
    >
      {/* Section Header */}
      <h2 className="text-3xl font-bold mb-12">How We Work</h2>

      {/* Pillars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {pillarsData.map((pillar, index) => {
          const isRevealed = hoveredCard === index || clickedCard === index;
          const showSneakPeek = sneakPeekIndex === index;

          return (
            <motion.div
              key={pillar.id}
              variants={cardVariants}
              onHoverStart={() => setHoveredCard(index)}
              onHoverEnd={() => setHoveredCard(null)}
              onClick={() => handleCardClick(index)}
              animate={{
                scale: isRevealed ? 1.05 : 1,
                y: isRevealed ? -10 : 0,
              }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
              className={`pillar-card stained-glass-border rounded-2xl p-8 md:p-12 min-h-[300px] cursor-pointer bg-white ${
                showSneakPeek ? 'sneak-peek-glow' : ''
              }`}
              style={{
                animationDelay: getAnimationDelay(index)
              }}
            >
              {/* Default State: Number + Name */}
              <div className="mb-6">
                <p className="text-sm font-light opacity-60 mb-2">{pillar.number} —</p>
                <h3 className="text-2xl md:text-3xl font-bold">{pillar.name}</h3>
              </div>

              {/* Hidden Content with Sneak Reveal */}
              <div className={`sneak-content ${isRevealed ? 'opacity-100 fully-revealed' : ''} ${showSneakPeek ? 'sneak-peek-active' : ''}`}>
                <AnimatePresence>
                  {isRevealed && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                      className="space-y-4"
                    >
                      {/* What */}
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wide opacity-70 mb-1">What</p>
                        <p className="text-sm leading-relaxed">{pillar.what}</p>
                      </div>

                      {/* Why */}
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wide opacity-70 mb-1">Why</p>
                        <p className="text-sm leading-relaxed">{pillar.why}</p>
                      </div>

                      {/* Current Focus */}
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wide opacity-70 mb-1">Current Focus</p>
                        <p className="text-sm leading-relaxed">{pillar.focus}</p>
                      </div>

                      {/* Status/Methodology/Vision */}
                      {pillar.status && (
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-wide opacity-70 mb-1">Status</p>
                          <p className="text-sm leading-relaxed">{pillar.status}</p>
                        </div>
                      )}

                      {pillar.methodology && (
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-wide opacity-70 mb-1">Methodology</p>
                          <p className="text-sm leading-relaxed">{pillar.methodology}</p>
                        </div>
                      )}

                      {pillar.vision && (
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-wide opacity-70 mb-1">Vision</p>
                          <p className="text-sm leading-relaxed">{pillar.vision}</p>
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.section>
  );
};

export default Pillars;
