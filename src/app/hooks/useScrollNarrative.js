"use client";

import { useState, useEffect } from "react";
import { useScroll } from "framer-motion";

/**
 * Custom hook for tracking scroll position and managing narrative sections
 *
 * @returns {Object} Scroll state object
 * @returns {boolean} heroFixed - Whether hero+marquee should be fixed
 * @returns {number} currentSection - Current active section (0-3)
 * @returns {number} scrollProgress - Progress within narrative section (0-1)
 */
export const useScrollNarrative = () => {
  const { scrollY } = useScroll();
  const [heroFixed, setHeroFixed] = useState(false);
  const [currentSection, setCurrentSection] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Scroll zone thresholds
  const HERO_FIXING_THRESHOLD = 100; // Hero becomes fixed after 100px scroll
  const NARRATIVE_SECTION_START = 200; // Narrative section starts at 200px
  const NARRATIVE_SECTION_HEIGHT = 1800; // Height of the narrative section in pixels

  useEffect(() => {
    const unsubscribe = scrollY.on("change", (latest) => {
      // Determine if hero should be fixed
      setHeroFixed(latest > HERO_FIXING_THRESHOLD);

      // Calculate scroll progress within narrative section
      if (latest >= NARRATIVE_SECTION_START) {
        const scrollIntoSection = latest - NARRATIVE_SECTION_START;
        const progress = Math.min(
          scrollIntoSection / NARRATIVE_SECTION_HEIGHT,
          1
        );
        setScrollProgress(progress);

        // Determine current section based on progress
        // 4 sections: 0-25%, 25-50%, 50-75%, 75-100%
        if (progress < 0.25) {
          setCurrentSection(0);
        } else if (progress < 0.5) {
          setCurrentSection(1);
        } else if (progress < 0.75) {
          setCurrentSection(2);
        } else {
          setCurrentSection(3);
        }
      } else {
        setScrollProgress(0);
        setCurrentSection(0);
      }
    });

    return () => unsubscribe();
  }, [scrollY]);

  return {
    heroFixed,
    currentSection,
    scrollProgress,
  };
};
