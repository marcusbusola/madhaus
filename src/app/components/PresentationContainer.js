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

const PresentationContainer = () => {
  const [currentSection, setCurrentSection] = useState(0);
  const [previousSection, setPreviousSection] = useState(0);
  const [direction, setDirection] = useState(1);
  const [progressPercentage, setProgressPercentage] = useState(0);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [drawerContent, setDrawerContent] = useState(null);

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


  // Calculate static progress based on section position (for visual indicators)
  useEffect(() => {
    // Map section to progress percentage: 0% to 100%
    // Section 0 (title): 0%
    // Sections 1-5: 20%, 40%, 60%, 80%, 100%
    // Section 6 (hidden): stays at 100%
    let sectionProgress = 0;
    if (currentSection === 0) {
      sectionProgress = 0;
    } else if (currentSection >= 1 && currentSection <= 5) {
      sectionProgress = (currentSection / 5) * 100;
    } else if (currentSection === 6) {
      sectionProgress = 100; // Section 6 is hidden, keep at 100%
    }
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
    const baseSectionProps = {
      onNavigate: navigateToSection,
      currentSection,
    };

    // Only Section4 (PODS) uses the drawer
    const podsProps = {
      ...baseSectionProps,
      onOpenDrawer: handleOpenDrawer,
      onCloseDrawer: handleCloseDrawer,
    };

    switch (currentSection) {
      case 0:
        return <Section0_TitleCard {...baseSectionProps} />;
      case 1:
        return <Section1_Problem {...baseSectionProps} />;
      case 2:
        return <Section2_KnowledgeCommunityEmpowerment {...baseSectionProps} />;
      case 3:
        return <Section3_Spiral {...baseSectionProps} />;
      case 4:
        return <Section4_PODS {...podsProps} />;
      case 5:
        return <Section5_Opportunity {...baseSectionProps} />;
      case 6:
        return <Section6_Close {...baseSectionProps} />;
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
