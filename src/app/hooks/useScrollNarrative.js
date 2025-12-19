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

  // Batch all scroll state into single object to avoid triple re-renders
  const [scrollState, setScrollState] = useState({
    heroFixed: false,
    currentSection: 0,
    scrollProgress: 0,
  });

  // Scroll zone thresholds
  const HERO_FIXING_THRESHOLD = 100; // Hero becomes fixed after 100px scroll
  const NARRATIVE_SECTION_START = 200; // Narrative section starts at 200px
  const NARRATIVE_SECTION_HEIGHT = 1800; // Height of the narrative section in pixels

  useEffect(() => {
    let rafId = null;

    const unsubscribe = scrollY.on("change", (latest) => {
      // Cancel previous RAF if still pending to prevent buildup
      if (rafId) cancelAnimationFrame(rafId);

      // Batch all state updates in single RAF for 60fps performance
      rafId = requestAnimationFrame(() => {
        const newHeroFixed = latest > HERO_FIXING_THRESHOLD;
        let newProgress = 0;
        let newSection = 0;

        // Calculate scroll progress within narrative section
        if (latest >= NARRATIVE_SECTION_START) {
          const scrollIntoSection = latest - NARRATIVE_SECTION_START;
          newProgress = Math.min(scrollIntoSection / NARRATIVE_SECTION_HEIGHT, 1);

          // Determine current section based on progress
          // 4 sections: 0-25%, 25-50%, 50-75%, 75-100%
          if (newProgress < 0.25) {
            newSection = 0;
          } else if (newProgress < 0.5) {
            newSection = 1;
          } else if (newProgress < 0.75) {
            newSection = 2;
          } else {
            newSection = 3;
          }
        }

        // Single batched state update instead of 3 separate setStates
        setScrollState({
          heroFixed: newHeroFixed,
          scrollProgress: newProgress,
          currentSection: newSection,
        });
      });
    });

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      unsubscribe();
    };
  }, [scrollY]);

  return {
    heroFixed: scrollState.heroFixed,
    currentSection: scrollState.currentSection,
    scrollProgress: scrollState.scrollProgress,
  };
};
