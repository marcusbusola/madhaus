"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import Image from "next/image";

const PHASES = {
  KNOWLEDGE_CENTER: 0,
  KNOWLEDGE_PILLAR: 1,
  COMMUNITY_CENTER: 2,
  COMMUNITY_PILLAR: 3,
  EMPOWERMENT_CENTER: 4,
  EMPOWERMENT_PILLAR: 5,
  AWAKENING: 6,
  FINAL: 7,
};

const PILLARS = {
  knowledge: {
    label: "Knowledge",
    description:
      "To change systems, you need to understand them. Not in abstract language. You deserve information that is truthful, scientific, and grounded in lived reality—explained in ways that actually make sense.",
    icon: (
      <svg viewBox="0 0 48 48" className="w-12 h-12" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="24" cy="24" r="18" />
        <path d="M24 12 L28 24 L24 36 L20 24 Z" />
        <path d="M24 6 L24 10" />
        <path d="M42 24 L38 24" />
        <path d="M24 42 L24 38" />
        <path d="M6 24 L10 24" />
      </svg>
    ),
  },
  community: {
    label: "Community",
    description:
      "But understanding alone isn't enough. Change happens when people find each other—people who want to do something, not just say something.",
    icon: (
      <svg viewBox="0 0 48 48" className="w-12 h-12" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="18" cy="24" r="10" />
        <circle cx="30" cy="24" r="10" />
        <circle cx="24" cy="16" r="6" />
      </svg>
    ),
  },
  empowerment: {
    label: "Empowerment",
    description:
      "If you want to do something, you need resources. Not just inspiration. Tools. Space. Support. A place to turn frustration into action, and ideas into something real.",
    icon: (
      <svg viewBox="0 0 48 48" className="w-12 h-12" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M24 10 L28 12 L32 10 L36 14 L34 18 L36 22 L32 26 L28 24 L24 26 L20 24 L16 26 L12 22 L14 18 L12 14 L16 10 L20 12 Z" />
        <circle cx="24" cy="20" r="5" />
      </svg>
    ),
  },
};

const Section2_KnowledgeCommunityEmpowerment = ({ onNavigate, currentSection, onOpenDrawer }) => {
  const prefersReducedMotion = useReducedMotion();
  const containerRef = useRef(null);
  const centerTextRef = useRef(null);
  const lastFocusedPillarRef = useRef(null);
  const [hasStarted, setHasStarted] = useState(false);
  const [phase, setPhase] = useState(PHASES.KNOWLEDGE_CENTER);
  const [activePillar, setActivePillar] = useState(null);
  const [hoveredPillar, setHoveredPillar] = useState(null);

  const phaseDurations = useMemo(
    () => ({
      [PHASES.KNOWLEDGE_CENTER]: 3500,
      [PHASES.KNOWLEDGE_PILLAR]: 500,
      [PHASES.COMMUNITY_CENTER]: 3500,
      [PHASES.COMMUNITY_PILLAR]: 500,
      [PHASES.EMPOWERMENT_CENTER]: 3500,
      [PHASES.EMPOWERMENT_PILLAR]: 500,
      [PHASES.AWAKENING]: 1200,
    }),
    []
  );

  useEffect(() => {
    if (prefersReducedMotion) {
      setHasStarted(true);
      setPhase(PHASES.FINAL);
      return;
    }

    const node = containerRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasStarted(true);
        }
      },
      { threshold: 0.4 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (!hasStarted || prefersReducedMotion) return;
    if (phase >= PHASES.FINAL) return;

    const duration = phaseDurations[phase];
    const timer = setTimeout(() => {
      setPhase((prev) => Math.min(prev + 1, PHASES.FINAL));
    }, duration);

    return () => clearTimeout(timer);
  }, [hasStarted, phase, phaseDurations, prefersReducedMotion]);

  useEffect(() => {
    if (activePillar && centerTextRef.current) {
      centerTextRef.current.focus();
    }
  }, [activePillar]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape" && activePillar) {
        setActivePillar(null);
        if (lastFocusedPillarRef.current) {
          lastFocusedPillarRef.current.focus();
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activePillar]);

  const handleAdvance = () => {
    if (!hasStarted || prefersReducedMotion) return;
    if (activePillar) return;
    setPhase((prev) => Math.min(prev + 1, PHASES.FINAL));
  };

  const handleContainerClick = (event) => {
    if (!hasStarted) return;

    if (activePillar) {
      if (centerTextRef.current && centerTextRef.current.contains(event.target)) {
        return;
      }
      setActivePillar(null);
      if (lastFocusedPillarRef.current) {
        lastFocusedPillarRef.current.focus();
      }
      return;
    }

    if (phase < PHASES.FINAL) {
      handleAdvance();
    }
  };

  const handlePillarClick = (key, event) => {
    event.stopPropagation();

    if (phase < PHASES.FINAL) {
      handleAdvance();
      return;
    }

    if (activePillar === key) {
      setActivePillar(null);
    } else {
      setActivePillar(key);
      lastFocusedPillarRef.current = event.currentTarget;
    }
  };

  const centerTextKey = (() => {
    if (activePillar) return `active-${activePillar}`;
    if (!hasStarted) return null;
    if (phase === PHASES.KNOWLEDGE_CENTER) return "knowledge";
    if (phase === PHASES.COMMUNITY_CENTER) return "community";
    if (phase === PHASES.EMPOWERMENT_CENTER) return "empowerment";
    return null;
  })();

  const centerText = (() => {
    if (activePillar) return PILLARS[activePillar].description;
    if (phase === PHASES.KNOWLEDGE_CENTER) return PILLARS.knowledge.description;
    if (phase === PHASES.COMMUNITY_CENTER) return PILLARS.community.description;
    if (phase === PHASES.EMPOWERMENT_CENTER) return PILLARS.empowerment.description;
    return null;
  })();

  const showKnowledge = phase >= PHASES.KNOWLEDGE_PILLAR || phase === PHASES.FINAL;
  const showCommunity = phase >= PHASES.COMMUNITY_PILLAR || phase === PHASES.FINAL;
  const showEmpowerment = phase >= PHASES.EMPOWERMENT_PILLAR || phase === PHASES.FINAL;
  const showAwakening = phase >= PHASES.AWAKENING;
  const showFinal = phase >= PHASES.FINAL || prefersReducedMotion;
  const showLearnMore = showFinal && !activePillar;

  const dimmed = Boolean(activePillar);
  const baseLogoOpacity = showAwakening ? 1 : 0.08;
  const logoOpacity = dimmed ? 0.25 : baseLogoOpacity;

  return (
    <div
      ref={containerRef}
      className="w-full h-full flex flex-col items-center justify-between px-6 md:px-10 bg-black text-white relative overflow-hidden"
      onClick={handleContainerClick}
    >
      {/* Section Indicator */}
      <div className="absolute top-8 right-8 text-caption opacity-40">
        02 / 06
      </div>

      {/* Ghosted Logo */}
      <motion.div
        className="absolute top-16 md:top-20 left-1/2 -translate-x-1/2 w-28 md:w-32"
        animate={{ opacity: logoOpacity }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      >
        <Image
          src="/MH.svg"
          alt="Madhaus Logo"
          width={160}
          height={80}
          className="w-full h-auto"
        />
      </motion.div>

      {/* How Heading */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: hasStarted ? (dimmed ? 0.7 : 1) : 0 }}
        transition={{ duration: 0.6 }}
        className="absolute top-6 md:top-8 left-1/2 -translate-x-1/2 text-center"
      >
        <p className="text-h2 font-semibold">How?</p>
      </motion.div>

      {/* Center-stage text */}
      <AnimatePresence mode="wait">
        {centerText && (
          <motion.div
            key={centerTextKey}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 flex items-center justify-center px-6 md:px-16"
          >
            <p
              ref={centerTextRef}
              tabIndex={-1}
              role="status"
              aria-live="polite"
              className="text-center text-[clamp(1rem,2.2vw,1.2rem)] leading-relaxed max-w-3xl"
            >
              {centerText}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Pillars */}
      <div className="w-full max-w-6xl mt-auto pb-6 md:pb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12 items-start">
          {showKnowledge && (
            <button
              type="button"
              onClick={(event) => handlePillarClick("knowledge", event)}
              onMouseEnter={() => setHoveredPillar("knowledge")}
              onMouseLeave={() => setHoveredPillar(null)}
              className="relative flex flex-col items-center gap-3 focus:outline-none focus:ring-2 focus:ring-white/60"
              style={{ opacity: dimmed && activePillar !== "knowledge" ? 0.25 : 1 }}
              aria-label="Knowledge pillar"
            >
              <motion.span
                className="absolute -inset-2 rounded-full"
                style={{
                  background:
                    "radial-gradient(circle, rgba(255, 255, 255, 0.35) 0%, rgba(255, 255, 255, 0) 70%)",
                  filter: "blur(8px)",
                  opacity: 0,
                }}
                animate={{
                  opacity: hoveredPillar === "knowledge" ? 1 : 0,
                }}
                transition={{ duration: 0.2 }}
              />
              <span className="relative z-10">{PILLARS.knowledge.icon}</span>
              <span className="text-body-sm uppercase tracking-wider relative z-10">
                {PILLARS.knowledge.label}
              </span>
            </button>
          )}

          {showCommunity && (
            <button
              type="button"
              onClick={(event) => handlePillarClick("community", event)}
              onMouseEnter={() => setHoveredPillar("community")}
              onMouseLeave={() => setHoveredPillar(null)}
              className="relative flex flex-col items-center gap-3 focus:outline-none focus:ring-2 focus:ring-white/60"
              style={{ opacity: dimmed && activePillar !== "community" ? 0.25 : 1 }}
              aria-label="Community pillar"
            >
              <motion.span
                className="absolute -inset-2 rounded-full"
                style={{
                  background:
                    "radial-gradient(circle, rgba(255, 255, 255, 0.35) 0%, rgba(255, 255, 255, 0) 70%)",
                  filter: "blur(8px)",
                  opacity: 0,
                }}
                animate={{
                  opacity: hoveredPillar === "community" ? 1 : 0,
                }}
                transition={{ duration: 0.2 }}
              />
              <span className="relative z-10">{PILLARS.community.icon}</span>
              <span className="text-body-sm uppercase tracking-wider relative z-10">
                {PILLARS.community.label}
              </span>
            </button>
          )}

          {showEmpowerment && (
            <button
              type="button"
              onClick={(event) => handlePillarClick("empowerment", event)}
              onMouseEnter={() => setHoveredPillar("empowerment")}
              onMouseLeave={() => setHoveredPillar(null)}
              className="relative flex flex-col items-center gap-3 focus:outline-none focus:ring-2 focus:ring-white/60"
              style={{ opacity: dimmed && activePillar !== "empowerment" ? 0.25 : 1 }}
              aria-label="Empowerment pillar"
            >
              <motion.span
                className="absolute -inset-2 rounded-full"
                style={{
                  background:
                    "radial-gradient(circle, rgba(255, 255, 255, 0.35) 0%, rgba(255, 255, 255, 0) 70%)",
                  filter: "blur(8px)",
                  opacity: 0,
                }}
                animate={{
                  opacity: hoveredPillar === "empowerment" ? 1 : 0,
                }}
                transition={{ duration: 0.2 }}
              />
              <span className="relative z-10">{PILLARS.empowerment.icon}</span>
              <span className="text-body-sm uppercase tracking-wider relative z-10">
                {PILLARS.empowerment.label}
              </span>
            </button>
          )}
        </div>
      </div>

      {/* Learn More */}
      <AnimatePresence>
        {showLearnMore && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full flex items-center justify-center pb-10 md:pb-12"
          >
            <motion.button
              initial={{ opacity: 0 }}
              animate={{
                opacity: [0.6, 1, 0.6],
                textShadow: [
                  "0 0 0px rgba(255, 255, 255, 0)",
                  "0 0 10px rgba(255, 255, 255, 0.8)",
                  "0 0 0px rgba(255, 255, 255, 0)",
                ],
              }}
              transition={{
                opacity: { duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.5 },
                textShadow: { duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.5 },
              }}
              onClick={(event) => {
                event.stopPropagation();
                if (onOpenDrawer) {
                  onOpenDrawer(
                    <div className="space-y-8">
                      <p className="text-h3 font-semibold">Madhaus is built on three pillars:</p>
                      <div className="space-y-4">
                        <h4 className="text-h4 font-semibold tracking-wider">KNOWLEDGE</h4>
                        <p className="text-body">
                          We produce research, explainers, and content that makes complex systems understandable.
                          Not academic papers — clear, visual, honest breakdowns of how things actually work.
                        </p>
                      </div>
                      <div className="space-y-4">
                        <h4 className="text-h4 font-semibold tracking-wider">COMMUNITY</h4>
                        <p className="text-body">
                          We connect thinkers, builders, and questioners across the continent.
                          People who are tired of complaining and ready to collaborate.
                        </p>
                      </div>
                      <div className="space-y-4">
                        <h4 className="text-h4 font-semibold tracking-wider">EMPOWERMENT</h4>
                        <p className="text-body">
                          We provide the resources to act — from grants and mentorship to lab space and partnerships.
                          Ideas deserve more than a tweet. They deserve a real shot.
                        </p>
                      </div>
                    </div>
                  );
                }
              }}
              className="light-border px-8 py-3 border border-white text-white text-body-sm uppercase tracking-wider hover:bg-white hover:text-black transition-all duration-300"
            >
              + LEARN MORE
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Connection Lines */}
      <AnimatePresence>
        {showAwakening && !prefersReducedMotion && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: dimmed ? 0.25 : 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 hidden md:block pointer-events-none"
          >
            <svg
              viewBox="0 0 1000 600"
              className="w-full h-full"
              preserveAspectRatio="none"
            >
              <motion.path
                d="M250 470 L500 170"
                stroke="white"
                strokeWidth="1.5"
                fill="none"
                style={{ filter: "drop-shadow(0 0 6px rgba(255,255,255,0.5))" }}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1.4, ease: "easeInOut" }}
              />
              <motion.path
                d="M500 470 L500 170"
                stroke="white"
                strokeWidth="1.5"
                fill="none"
                style={{ filter: "drop-shadow(0 0 6px rgba(255,255,255,0.5))" }}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1.4, ease: "easeInOut", delay: 0.1 }}
              />
              <motion.path
                d="M750 470 L500 170"
                stroke="white"
                strokeWidth="1.5"
                fill="none"
                style={{ filter: "drop-shadow(0 0 6px rgba(255,255,255,0.5))" }}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1.4, ease: "easeInOut", delay: 0.2 }}
              />
            </svg>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Section2_KnowledgeCommunityEmpowerment;
