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
      <svg viewBox="0 0 24 24" className="w-16 h-16" fill="none" stroke="#4F5D75" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
        <motion.circle
          cx="12" cy="12" r="9"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ pathLength: { duration: 3, ease: "easeInOut" }, opacity: { duration: 0.5 } }}
        />
        <motion.path
          d="M12 6 L14 12 L12 18 L10 12 Z"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ pathLength: { duration: 3, ease: "easeInOut", delay: 0.1 }, opacity: { duration: 0.5, delay: 0.1 } }}
        />
        <motion.path
          d="M12 3 L12 5"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ pathLength: { duration: 3, ease: "easeInOut", delay: 0.2 }, opacity: { duration: 0.5, delay: 0.2 } }}
        />
        <motion.path
          d="M21 12 L19 12"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ pathLength: { duration: 3, ease: "easeInOut", delay: 0.3 }, opacity: { duration: 0.5, delay: 0.3 } }}
        />
        <motion.path
          d="M12 21 L12 19"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ pathLength: { duration: 3, ease: "easeInOut", delay: 0.4 }, opacity: { duration: 0.5, delay: 0.4 } }}
        />
        <motion.path
          d="M3 12 L5 12"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ pathLength: { duration: 3, ease: "easeInOut", delay: 0.5 }, opacity: { duration: 0.5, delay: 0.5 } }}
        />
      </svg>
    ),
  },
  community: {
    label: "Community",
    description:
      "But understanding alone isn't enough. Change happens when people find each other—people who want to do something, not just say something.",
    icon: (
      <svg viewBox="0 0 24 24" className="w-16 h-16" fill="none" stroke="#4F5D75" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
        <motion.circle
          cx="9" cy="12" r="5"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ pathLength: { duration: 3, ease: "easeInOut" }, opacity: { duration: 0.5 } }}
        />
        <motion.circle
          cx="15" cy="12" r="5"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ pathLength: { duration: 3, ease: "easeInOut", delay: 0.1 }, opacity: { duration: 0.5, delay: 0.1 } }}
        />
        <motion.circle
          cx="12" cy="8" r="4"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ pathLength: { duration: 3, ease: "easeInOut", delay: 0.2 }, opacity: { duration: 0.5, delay: 0.2 } }}
        />
      </svg>
    ),
  },
  empowerment: {
    label: "Empowerment",
    description:
      "If you want to do something, you need resources. Not just inspiration. Tools. Space. Support. A place to turn frustration into action, and ideas into something real.",
    icon: (
      <svg viewBox="0 0 24 24" className="w-16 h-16" fill="none" stroke="#4F5D75" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
        <motion.path
          d="M12 5 L14 6 L16 5 L18 7 L17 9 L18 11 L16 13 L14 12 L12 13 L10 12 L8 13 L6 11 L7 9 L6 7 L8 5 L10 6 Z"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ pathLength: { duration: 3, ease: "easeInOut" }, opacity: { duration: 0.5 } }}
        />
        <motion.circle
          cx="12" cy="10" r="2.5"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ pathLength: { duration: 3, ease: "easeInOut", delay: 0.1 }, opacity: { duration: 0.5, delay: 0.1 } }}
        />
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

      {/* Top Section: Logo and Description */}
      <div className="w-full flex flex-col items-center pt-12 md:pt-16 gap-6">
        {/* Ghosted Logo */}
        <motion.div
          className="w-28 md:w-32"
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

        {/* Madhaus Description */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: showAwakening ? (dimmed ? 0.5 : 0.8) : 0 }}
          transition={{ duration: 0.8, ease: "easeInOut", delay: 0.3 }}
          className="text-center max-w-2xl px-6"
        >
          <p className="text-body-sm opacity-70 leading-relaxed">
            A collective research lab and experimental studio building tools, systems, and ideas
            that challenge the status quo and reimagine what's possible.
          </p>
        </motion.div>
      </div>

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

    </div>
  );
};

export default Section2_KnowledgeCommunityEmpowerment;
