"use client";

import { useState, useEffect, useRef } from "react";
import { AnimatePresence } from "framer-motion";
import Section from "./Section";
import ProgressBar from "./ProgressBar";
import ProgressIndicator from "./ProgressIndicator";
import NoiseOverlay from "./NoiseOverlay";
import ExpandDrawer from "./ExpandDrawer";

// Import section components
import Section0_TitleCard from "./sections/Section0_TitleCard";
import Section1_Problem from "./sections/Section2_Problem";
import Section2_KnowledgeCommunityEmpowerment from "./sections/Section3_KnowledgeCommunityEmpowerment";
import Section3_Spiral from "./sections/Section3_Spiral";
import Section4_PODS from "./sections/Section4_PODS";
import Section5_Opportunity from "./sections/Section5_Opportunity";
import Section6_Close from "./sections/Section6_Close";

const SECTION_DURATION = 8000; // 8 seconds

const PresentationContainer = () => {
  const [currentSection, setCurrentSection] = useState(0);
  const [previousSection, setPreviousSection] = useState(0);
  const [direction, setDirection] = useState(1);
  const [progressPercentage, setProgressPercentage] = useState(0);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [drawerContent, setDrawerContent] = useState(null);
  const timerRef = useRef(null);

  // Navigation function
  const navigateToSection = (targetSection) => {
    if (targetSection >= 0 && targetSection <= 6 && targetSection !== currentSection) {
      setDirection(targetSection > currentSection ? 1 : -1);
      setPreviousSection(currentSection);
      setCurrentSection(targetSection);
      setProgressPercentage(0);
      setIsDrawerOpen(false);
    }
  };

  // Advance to next section
  const advanceSection = () => {
    if (currentSection < 6) {
      navigateToSection(currentSection + 1);
    }
  };

  // Auto-advance timer using requestAnimationFrame
  useEffect(() => {
    // No auto-advance on Section 0 (title), Section 6 (end), or when drawer is open
    if (currentSection === 0 || currentSection === 6 || isDrawerOpen) {
      setProgressPercentage(0);
      return;
    }

    let startTime = Date.now();
    let animationFrameId;

    const tick = () => {
      const elapsed = Date.now() - startTime;
      const progress = (elapsed / SECTION_DURATION) * 100;
      setProgressPercentage(Math.min(progress, 100));

      if (elapsed >= SECTION_DURATION) {
        advanceSection();
      } else {
        animationFrameId = requestAnimationFrame(tick);
      }
    };

    animationFrameId = requestAnimationFrame(tick);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [currentSection, isDrawerOpen]);

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
  }, [currentSection, isDrawerOpen]);

  // Click-anywhere to advance (except on interactive elements)
  const handleSectionClick = (e) => {
    // Ignore clicks on buttons, links, inputs, or drawer
    if (
      e.target.closest("button, a, input, .drawer-content") ||
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

  // Render current section
  const renderCurrentSection = () => {
    const sectionProps = {
      onNavigate: navigateToSection,
      onOpenDrawer: handleOpenDrawer,
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
        onClose={() => setIsDrawerOpen(false)}
        content={drawerContent}
      />
    </div>
  );
};

export default PresentationContainer;
