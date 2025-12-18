"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useScroll, AnimatePresence } from "framer-motion";

const StickyScrollSection = () => {
  // Scroll container and active block tracking
  const scrollContainerRef = useRef(null);
  const [activeBlockIndex, setActiveBlockIndex] = useState(0);
  const [scrollHeight] = useState(3000); // Total scroll distance
  const [hoveredItem, setHoveredItem] = useState(null);

  // Sticky unpin logic
  const [isSticky, setIsSticky] = useState(true);

  // Track visited sections for subtitle
  const [visitedSections, setVisitedSections] = useState([]);
  const [activeSectionIndex, setActiveSectionIndex] = useState(-1);

  // Content data structure
  const contentBlocks = [
    {
      id: "who",
      title: "Who We Are",
      type: "paragraphs",
      paragraphs: [
        "Most African media treats social problems like news cycles—report the crisis, move on, repeat. Meanwhile, the same systems keep producing the same outcomes: broken infrastructure, inequality, governance failures.",
        "Madhaus is a media company meets social innovation lab. We use systems thinking to help Africans understand not just what's broken, but why it's broken—and more importantly, how to fix it."
      ]
    },
    {
      id: "what",
      title: "What We Do",
      type: "list",
      subtitle: "Three ways we help Africa understand and solve systemic challenges.",
      items: [
        { number: "01", title: "Systems Media", subtitle: "See the whole picture, not just the headlines." },
        { number: "02", title: "Research Lab", subtitle: "Data-driven insights for real-world impact." },
        { number: "03", title: "Community Studio", subtitle: "Solutions built with people, not for them." }
      ]
    },
    {
      id: "why",
      title: "Why We Do It",
      type: "paragraphs",
      paragraphs: [
        "Because Africa doesn't need more hot takes. It needs understanding. The continent's challenges—from urban congestion to governance failures—aren't random. They're the predictable outputs of interconnected systems. When you see the system, you can change it. That's what Madhaus exists to do."
      ]
    }
  ];

  // Framer Motion scroll tracking
  const { scrollYProgress } = useScroll({
    container: scrollContainerRef,
    offset: ["start start", "end end"]
  });

  // Map scroll progress to active block
  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (progress) => {
      let newBlockIndex;

      if (progress < 0.28) {
        newBlockIndex = 0;
      } else if (progress < 0.62) {
        newBlockIndex = 1;
      } else {
        newBlockIndex = 2;
      }

      if (newBlockIndex !== activeBlockIndex) {
        setActiveBlockIndex(newBlockIndex);
        setActiveSectionIndex(newBlockIndex);
      }
    });

    return () => unsubscribe();
  }, [scrollYProgress, activeBlockIndex]);

  // Build visited list based on active section index (progressive down, clears when moving up)
  useEffect(() => {
    if (activeSectionIndex === -1) {
      setVisitedSections([]);
    } else {
      setVisitedSections(contentBlocks.slice(0, activeSectionIndex + 1));
    }
  }, [activeSectionIndex]);

  // Function to render content block
  const renderContentBlock = (block) => (
    <>
      <h3 className="text-2xl font-bold mb-4">{block.title}</h3>

      {block.subtitle && (
        <p className="text-base font-light text-black/60 mb-6">{block.subtitle}</p>
      )}

      {block.type === "list" ? (
        <div className="relative space-y-2">
          {block.items.map((item, idx) => {
            const isHovered = hoveredItem === idx;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                onHoverStart={() => setHoveredItem(idx)}
                onHoverEnd={() => setHoveredItem(null)}
                className={`relative flex items-center gap-6 py-5 px-5 rounded-xl cursor-pointer z-10 overflow-hidden ${
                  isHovered ? 'border border-black/15' : 'border-b border-black/15'
                }`}
              >
                {isHovered && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute inset-0 bg-black/85 pointer-events-none z-0 rounded-xl"
                  />
                )}
                <span className={`text-sm font-light min-w-[52px] relative z-10 ${
                  isHovered ? 'text-white opacity-90' : 'opacity-60'
                }`}>
                  {item.number} —
                </span>
                <div className="flex-1 flex items-center gap-3 relative z-10">
                  <div className="flex-1">
                    <h4
                      className={`font-bold mb-1 transition-all duration-300 ${
                        isHovered ? 'text-white' : ''
                      }`}
                      style={{
                        transform: isHovered ? 'translateX(10px) scale(1.05)' : 'translateX(0) scale(1)',
                        fontSize: isHovered ? '1.4rem' : '1.25rem'
                      }}
                    >
                      {item.title}
                    </h4>
                    <p
                      className={`text-base font-light transition-all duration-300 ${
                        isHovered ? 'text-white opacity-90' : 'opacity-70'
                      }`}
                      style={{ transform: isHovered ? 'translateX(10px)' : 'translateX(0)' }}
                    >
                      {item.subtitle}
                    </p>
                  </div>
                  {isHovered && (
                    <motion.span
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-xl font-bold text-white"
                    >
                      →
                    </motion.span>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      ) : (
        <div className="space-y-6">
          {block.paragraphs.map((paragraph, idx) => (
            <motion.p
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.2, duration: 0.6 }}
              className="text-base leading-relaxed"
            >
              {paragraph}
            </motion.p>
          ))}
        </div>
      )}
    </>
  );

  // Function to scroll to a specific section
  const scrollToSection = (sectionId) => {
    const index = contentBlocks.findIndex(block => block.id === sectionId);
    if (index !== -1 && scrollContainerRef.current) {
      const targetProgress = index === 0 ? 0.15 : index === 1 ? 0.45 : 0.8;
      const targetScroll = targetProgress * scrollHeight;

      scrollContainerRef.current.scrollTo({
        top: targetScroll,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="relative py-12">
      <div className="max-w-7xl mx-auto px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">

          {/* LEFT COLUMN: Sticky Heading */}
          <div className={`${isSticky ? 'lg:sticky' : ''} lg:top-24 lg:h-[calc(100vh-6rem)] flex items-center`}>
            <div>
              <motion.h2
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="text-4xl lg:text-5xl font-bold leading-tight"
              >
                We&apos;re early, and that&apos;s exciting
              </motion.h2>

              {/* Dynamic Subtitle List */}
              {visitedSections.length > 0 && (
                <div className="mt-4 flex flex-col gap-2">
                  {visitedSections.map((section, index) => (
                    <motion.button
                      key={section.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      onClick={() => scrollToSection(section.id)}
                      className="text-left text-lg font-light text-black/60 hover:text-black transition-colors duration-300 cursor-pointer"
                    >
                      {section.title}
                    </motion.button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* RIGHT COLUMN: Scroll-triggered content transition */}
          <div className="relative lg:h-[calc(100vh-6rem)] h-[80vh] overflow-hidden">
            {/* Invisible Scroll Track */}
            <div
              ref={scrollContainerRef}
              className="absolute inset-0 overflow-y-scroll"
              role="region"
              aria-label="Content navigation"
              style={{
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
                WebkitOverflowScrolling: 'touch',
                overscrollBehavior: 'contain',
                touchAction: 'pan-y'
              }}
            >
              <div style={{ height: `${scrollHeight}px` }} aria-hidden="true" />
            </div>

            {/* Fixed Content Display */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-full max-w-3xl px-4 md:px-8">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeBlockIndex}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="bg-white p-8 lg:p-10 pointer-events-auto rounded-lg shadow-lg"
                  >
                    {renderContentBlock(contentBlocks[activeBlockIndex])}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Hide scrollbar */}
            <style jsx>{`
              div::-webkit-scrollbar {
                display: none;
              }
            `}</style>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StickyScrollSection;
