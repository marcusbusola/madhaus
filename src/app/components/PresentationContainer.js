"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { AnimatePresence } from "framer-motion";
import Section from "./Section";
import ProgressBar from "./ProgressBar";
import ProgressIndicator from "./ProgressIndicator";
import NoiseOverlay from "./NoiseOverlay";
import LightBeamOverlay from "./LightBeamOverlay";
import ExpandDrawer from "./ExpandDrawer";

// Import section components
import Section0_TitleCard from "./sections/Section0_TitleCard";
import Section1_Problem from "./sections/Section1_Problem";
import Section2_KnowledgeCommunityEmpowerment from "./sections/Section2_KnowledgeCommunityEmpowerment";
import Section3_Spiral from "./sections/Section3_Spiral";
import Section4_PODS from "./sections/Section4_PODS";
import Section5_Opportunity from "./sections/Section5_Opportunity";
import Section6_Close from "./sections/Section6_Close";

const SECTION_DURATION = 15000; // 15 seconds
const SECTION_DURATIONS = {
  2: 22000,
};

const PresentationContainer = () => {
  const [currentSection, setCurrentSection] = useState(0);
  const [previousSection, setPreviousSection] = useState(0);
  const [direction, setDirection] = useState(1);
  const [progressPercentage, setProgressPercentage] = useState(0);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [drawerContent, setDrawerContent] = useState(null);
  const timerRef = useRef(null);

  // Navigation function
  const navigateToSection = useCallback((targetSection) => {
    if (targetSection >= 0 && targetSection <= 6 && targetSection !== currentSection) {
      setDirection(targetSection > currentSection ? 1 : -1);
      setPreviousSection(currentSection);
      setCurrentSection(targetSection);
      setProgressPercentage(0);
      setIsDrawerOpen(false);
    }
  }, [currentSection]);

  // Advance to next section
  const advanceSection = useCallback(() => {
    if (currentSection < 6) {
      navigateToSection(currentSection + 1);
    }
  }, [currentSection, navigateToSection]);

  // Calculate static progress based on section position (for visual indicators)
  useEffect(() => {
    // Map section to progress percentage: 0% to 100%
    // Sections 0-5 visible in progress indicators
    const sectionProgress = currentSection === 0 ? 0 : (currentSection / 5) * 100;
    setProgressPercentage(sectionProgress);
  }, [currentSection]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        e.preventDefault();
        navigateToSection(currentSection + 1);
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();
        navigateToSection(currentSection - 1);
      } else if (e.key === "Escape" && isDrawerOpen) {
        setIsDrawerOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [currentSection, isDrawerOpen, navigateToSection]);

  // Touch/Swipe navigation for mobile
  useEffect(() => {
    let touchStartX = 0;
    let touchStartY = 0;
    let touchEndX = 0;
    let touchEndY = 0;

    const minSwipeDistance = 50; // Minimum distance for a swipe (in pixels)

    const handleTouchStart = (e) => {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchMove = (e) => {
      touchEndX = e.touches[0].clientX;
      touchEndY = e.touches[0].clientY;
    };

    const handleTouchEnd = () => {
      // Don't navigate if drawer is open or on interactive elements
      if (isDrawerOpen) return;

      const deltaX = touchStartX - touchEndX;
      const deltaY = touchStartY - touchEndY;

      // Determine if swipe is more horizontal or vertical
      const isHorizontalSwipe = Math.abs(deltaX) > Math.abs(deltaY);

      if (isHorizontalSwipe) {
        // Horizontal swipe: left swipe = next, right swipe = previous
        if (Math.abs(deltaX) > minSwipeDistance) {
          if (deltaX > 0) {
            // Swiped left (next section)
            navigateToSection(currentSection + 1);
          } else {
            // Swiped right (previous section)
            navigateToSection(currentSection - 1);
          }
        }
      } else {
        // Vertical swipe: up swipe = next, down swipe = previous
        if (Math.abs(deltaY) > minSwipeDistance) {
          if (deltaY > 0) {
            // Swiped up (next section)
            navigateToSection(currentSection + 1);
          } else {
            // Swiped down (previous section)
            navigateToSection(currentSection - 1);
          }
        }
      }

      // Reset values
      touchStartX = 0;
      touchStartY = 0;
      touchEndX = 0;
      touchEndY = 0;
    };

    window.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("touchmove", handleTouchMove);
    window.addEventListener("touchend", handleTouchEnd);

    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [currentSection, isDrawerOpen, navigateToSection]);

  // Click-anywhere to advance (except on interactive elements)
  // Disabled on mobile/touch devices to allow button interactions
  const handleSectionClick = (e) => {
    // Skip on touch devices (mobile) - use swipe navigation instead
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
      return;
    }

    // Ignore clicks on buttons, links, inputs, or drawer
    if (
      e.target.closest("button, a, input, .drawer-content, .cursor-pointer, [role='button']") ||
      isDrawerOpen
    ) {
      return;
    }

    // Don't advance on Section 0 or 6
    if (currentSection !== 0 && currentSection < 6) {
      advanceSection();
    }
  };

  // Open drawer with content
  const handleOpenDrawer = (content) => {
    setDrawerContent(content);
    setIsDrawerOpen(true);
  };
  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
  };

  // Render current section
  const renderCurrentSection = () => {
    const sectionProps = {
      onNavigate: navigateToSection,
      onOpenDrawer: handleOpenDrawer,
      onCloseDrawer: handleCloseDrawer,
      currentSection,
    };

    switch (currentSection) {
      case 0:
        return <Section0_TitleCard {...sectionProps} />;
      case 1:
        return <Section1_Problem {...sectionProps} />;
      case 2:
        return <Section2_KnowledgeCommunityEmpowerment {...sectionProps} />;
      case 3:
        return <Section3_Spiral {...sectionProps} />;
      case 4:
        return <Section4_PODS {...sectionProps} />;
      case 5:
        return <Section5_Opportunity {...sectionProps} />;
      case 6:
        return <Section6_Close {...sectionProps} />;
      default:
        return null;
    }
  };

  return (
    <div className="w-full h-screen overflow-hidden bg-black">
      {/* Grain Overlay */}
      <NoiseOverlay />

      {/* Light Beam Sweep */}
      <LightBeamOverlay
        progress={progressPercentage}
        currentSection={currentSection}
        isDrawerOpen={isDrawerOpen}
      />

      {/* Progress Bar */}
      <ProgressBar
        progress={progressPercentage}
        isPaused={isDrawerOpen}
        currentSection={currentSection}
      />

      {/* Progress Indicator (Dots + Counter) */}
      <ProgressIndicator
        currentSection={currentSection}
        onNavigate={navigateToSection}
      />

      {/* Section Content */}
      <AnimatePresence mode="wait" custom={direction}>
        <Section
          key={currentSection}
          currentSection={currentSection}
          direction={direction}
          onClick={handleSectionClick}
        >
          {renderCurrentSection()}
        </Section>
      </AnimatePresence>

      {/* Expand Drawer */}
      <ExpandDrawer
        isOpen={isDrawerOpen}
        onClose={handleCloseDrawer}
        content={drawerContent}
      />
    </div>
  );
};

export default PresentationContainer;
