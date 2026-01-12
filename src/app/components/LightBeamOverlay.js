"use client";

import { motion } from "framer-motion";

const LightBeamOverlay = ({ progress, currentSection, isDrawerOpen }) => {
  // Hide on sections without auto-advance (0, 1, 6)
  if (currentSection === 0 || currentSection === 1 || currentSection === 6) {
    return null;
  }

  // Static position based on section (0-100% across viewport)
  const sectionPosition = (currentSection / 5) * 100;
  const beamPosition = (sectionPosition / 100) * 200 - 100; // -100% to 100%

  // Adapt beam style for white background (Section 4 - PODS)
  const isDarkSection = currentSection === 4;

  const beamStyle = isDarkSection
    ? {
        // Dark beam for white background
        background: `linear-gradient(
          90deg,
          transparent 0%,
          rgba(0, 0, 0, 0.02) 35%,
          rgba(0, 0, 0, 0.05) 50%,
          rgba(0, 0, 0, 0.02) 65%,
          transparent 100%
        )`,
      }
    : {
        // Light beam for dark backgrounds
        background: `linear-gradient(
          90deg,
          transparent 0%,
          rgba(255, 255, 255, 0.02) 35%,
          rgba(237, 231, 222, 0.04) 50%,
          rgba(255, 255, 255, 0.02) 65%,
          transparent 100%
        )`,
      };

  return (
    <div
      className="fixed inset-0 w-full h-full z-[2] overflow-hidden"
      style={{ pointerEvents: "none" }}
      aria-hidden="true"
    >
      <motion.div
        className="absolute top-0 left-0 h-full"
        style={{
          width: "30vw",
          ...beamStyle,
          filter: "blur(50px)",
        }}
        animate={{
          x: `${beamPosition}%`,
          opacity: isDrawerOpen ? 0.15 : 0.35,
        }}
        transition={{
          x: { duration: 0.6, ease: "easeOut" },
          opacity: { duration: 0.3, ease: "easeInOut" },
        }}
      />
    </div>
  );
};

export default LightBeamOverlay;
