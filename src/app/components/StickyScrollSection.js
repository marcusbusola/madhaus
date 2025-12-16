"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

const StickyScrollSection = () => {
  // State for visibility tracking
  const blockRefs = [useRef(null), useRef(null), useRef(null)];
  const [visibleBlocks, setVisibleBlocks] = useState([false, false, false]);
  const [hoveredItem, setHoveredItem] = useState(null);

  // Sticky unpin logic
  const lastBlockRef = useRef(null);
  const [isSticky, setIsSticky] = useState(true);

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

  // Animation variants
  const blockVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  const listItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: { delay: i * 0.1, duration: 0.5 }
    })
  };

  // Intersection Observer for content block fade-ins
  useEffect(() => {
    const observers = blockRefs.map((ref, index) => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisibleBlocks(prev => {
              const newState = [...prev];
              newState[index] = true;
              return newState;
            });
          }
        },
        { threshold: 0.3, rootMargin: '-100px' }
      );

      if (ref.current) observer.observe(ref.current);
      return observer;
    });

    return () => observers.forEach(obs => obs.disconnect());
  }, []);

  // Sticky unpin logic - unpin heading after last block scrolls past
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Keep sticky while last block is visible or below viewport
        setIsSticky(entry.isIntersecting || entry.boundingClientRect.top > 0);
      },
      {
        threshold: 0,
        rootMargin: '0px 0px -90% 0px'
      }
    );

    if (lastBlockRef.current) observer.observe(lastBlockRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="relative bg-white text-black py-20">
      <div className="max-w-7xl mx-auto px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">

          {/* LEFT COLUMN: Sticky Heading */}
          <div className={`${isSticky ? 'lg:sticky' : ''} lg:top-24 lg:h-screen flex items-center`}>
            <motion.h2
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-4xl lg:text-5xl font-bold leading-tight"
            >
              We&apos;re early, and that&apos;s exciting
            </motion.h2>
          </div>

          {/* RIGHT COLUMN: Scrolling Content */}
          <div className="relative py-24">

            {contentBlocks.map((block, blockIndex) => {
              const isLastBlock = blockIndex === contentBlocks.length - 1;

              return (
                <motion.div
                  key={block.id}
                  ref={isLastBlock ? lastBlockRef : blockRefs[blockIndex]}
                  initial="hidden"
                  animate={visibleBlocks[blockIndex] ? "visible" : "hidden"}
                  variants={blockVariants}
                  className="sticky top-[50vh] min-h-[100vh] flex flex-col justify-center bg-white"
                  style={{
                    zIndex: blockIndex + 1,
                    marginBottom: blockIndex === contentBlocks.length - 1 ? 0 : '100vh'
                  }}
                >
                  {/* Block Title */}
                  <h3 className="text-2xl font-bold mb-2">{block.title}</h3>

                  {/* Subtitle for WHAT WE DO */}
                  {block.subtitle && (
                    <p className="text-base font-light opacity-70 mb-8">{block.subtitle}</p>
                  )}

                  {!block.subtitle && <div className="mb-8" />}

                  {/* Conditional Content Rendering */}
                  {block.type === "list" ? (
                    // LIST LAYOUT (What We Do)
                    <div className="relative space-y-2">
                      {/* Black overlay that appears on hover */}
                      {hoveredItem !== null && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="absolute inset-0 bg-black/85 pointer-events-none z-0"
                          style={{
                            clipPath: `polygon(
                              0 0,
                              100% 0,
                              100% ${(hoveredItem % 10) * 33.33}%,
                              0 ${(hoveredItem % 10) * 33.33}%,
                              0 ${((hoveredItem % 10) + 1) * 33.33}%,
                              100% ${((hoveredItem % 10) + 1) * 33.33}%,
                              100% 100%,
                              0 100%
                            )`
                          }}
                        />
                      )}

                      {block.items.map((item, idx) => {
                        const isHovered = hoveredItem === (blockIndex * 10 + idx);

                        return (
                          <motion.div
                            key={idx}
                            custom={idx}
                            initial="hidden"
                            animate={visibleBlocks[blockIndex] ? "visible" : "hidden"}
                            variants={listItemVariants}
                            onHoverStart={() => setHoveredItem(blockIndex * 10 + idx)}
                            onHoverEnd={() => setHoveredItem(null)}
                            className="relative flex gap-6 py-4 border-b border-black/10 cursor-pointer z-10"
                            style={{
                              transition: 'all 0.3s ease'
                            }}
                          >
                            <span className="text-sm font-light opacity-60 w-12">
                              {item.number} —
                            </span>
                            <div className="flex-1 flex items-center gap-3">
                              {/* Animated Arrow */}
                              {isHovered && (
                                <motion.span
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{
                                    opacity: 1,
                                    x: 0
                                  }}
                                  className="text-xl font-bold arrow-pulse"
                                >
                                  →
                                </motion.span>
                              )}

                              <div className="flex-1">
                                <h4
                                  className="font-bold mb-1 transition-all duration-300"
                                  style={{
                                    transform: isHovered ? 'translateX(15px) scale(1.05)' : 'translateX(0) scale(1)',
                                    fontSize: isHovered ? '1.4rem' : '1.25rem'
                                  }}
                                >
                                  {item.title}
                                </h4>
                                <p
                                  className="text-base font-light opacity-70 transition-transform duration-300"
                                  style={{
                                    transform: isHovered ? 'translateX(15px)' : 'translateX(0)'
                                  }}
                                >
                                  {item.subtitle}
                                </p>
                              </div>
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                  ) : (
                    // PARAGRAPH LAYOUT (Who We Are / Why We Do It)
                    <div className="space-y-6">
                      {block.paragraphs.map((paragraph, idx) => (
                        <motion.p
                          key={idx}
                          initial={{ opacity: 0, y: 20 }}
                          animate={visibleBlocks[blockIndex] ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                          transition={{ delay: idx * 0.2, duration: 0.6 }}
                          className="text-base leading-relaxed"
                        >
                          {paragraph}
                        </motion.p>
                      ))}
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default StickyScrollSection;
