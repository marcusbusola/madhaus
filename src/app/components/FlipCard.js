"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";

// Flip Card Component
const FlipCard = () => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.2 });

  const handleHover = (index) => {
    setHoveredCard(index);
  };

  const handleLeave = () => {
    setHoveredCard(null);
  };

  // Define the card data with expanded dummy content
  const cards = [
    {
      id: 0,
      bgColor: "bg-black",
      textColor: "text-white",
      title: "Living in Lagos Study",
      content: (
        <div className="min-h-[400px]">
          <div className="flex flex-col md:flex-row">
            {/* Left Text Section */}
            <div className="w-full md:w-1/2 pr-0 md:pr-8 mb-8 md:mb-0">
              <h2 className="text-5xl font-bold mb-8 mt-8 leading-tight">
                Living in
                <br />
                Lagos Study
              </h2>
              <div className="w-full h-[1px] bg-gray-600 mb-8"></div>
              <p className="text-base mb-6 leading-relaxed">
                Our comprehensive research into urban life in Africa&apos;s
                largest metropolis examines the tensions between opportunity and
                inequality, innovation and infrastructure limitations.
              </p>
              <p className="text-base mb-6 leading-relaxed">
                Through interviews with over 1,000 residents across
                socioeconomic backgrounds, we&apos;ve captured insights that
                reveal the complexity of navigating Lagos as a resident,
                entrepreneur, or policymaker.
              </p>
            </div>

            {/* Vertical Line (visible only on desktop) */}
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-[1px] h-full bg-gray-600"></div>

            {/* Right Text Section */}
            <div className="w-full md:w-1/2 pl-0 md:pl-8">
              <p className="text-base mb-6 leading-relaxed mt-0 md:mt-20">
                Our findings highlight five key areas requiring urgent
                intervention: transportation, housing affordability, digital
                access, environmental resilience, and governance systems.
              </p>
              <p className="text-base mb-6 leading-relaxed">
                This study moves beyond problem identification to explore
                potential innovations and policy approaches that could transform
                Lagos into a more equitable, sustainable, and vibrant urban
                center for all its inhabitants.
              </p>
              <p className="text-base mb-10 leading-relaxed">
                The Living in Lagos Study serves as a foundational resource for
                policymakers, social entrepreneurs, and community leaders
                working to address the city&apos;s complex challenges through
                collaborative, systems-based approaches.
              </p>
            </div>
          </div>

          {/* Blog Link */}
          <div className="flex justify-end items-center gap-4 mb-8">
            <span className="text-base">Our Blog</span>
            <Link
              href="https://madhaus.substack.com/"
              className="flex items-center gap-2 bg-[#f2ece3] py-2 px-4 md:py-3 md:px-6 rounded-md"
            >
              <motion.span
                className="text-black"
                animate={{ x: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 1 }}
              >
                →
              </motion.span>
            </Link>
          </div>
        </div>
      ),
    },
    {
      id: 1,
      bgColor: "bg-[#f2ece3]",
      textColor: "text-black",
      title: "Design Thinking",
      previewText:
        "Our design philosophy centers on creating solutions that are both human-centered and systems-aware...",
      content: (
        <div className="min-h-[400px] flex flex-col justify-between">
          <div>
            <h2 className="text-4xl font-bold mb-8 mt-8">Design for Impact</h2>
            <div className="w-full h-[1px] bg-gray-600 mb-8"></div>
            <p className="text-base mb-6 leading-relaxed">
              Our design philosophy centers on creating solutions that are both
              human-centered and systems-aware. We combine ethnographic research
              with innovation methodologies to address complex challenges.
            </p>
            <p className="text-base mb-6 leading-relaxed">
              From community workshops in Lagos to policy co-creation sessions
              with government agencies, our approach emphasizes collaboration,
              iteration, and contextual understanding that leads to meaningful
              outcomes.
            </p>
          </div>
          <div className="flex justify-end">
            <Link
              href="/design"
              className="flex items-center gap-2 bg-black text-white py-2 px-4 md:py-3 md:px-6 rounded-md"
            >
              <motion.span
                animate={{ x: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 1 }}
              >
                →
              </motion.span>
            </Link>
          </div>
        </div>
      ),
    },
    {
      id: 2,
      bgColor: "bg-black",
      textColor: "text-white",
      title: "Media Innovation",
      previewText:
        "At Madhaus, we're reimagining African media through a lens of social innovation and systems thinking...",
      content: (
        <div className="min-h-[400px] flex flex-col justify-between">
          <div>
            <h2 className="text-4xl font-bold mb-8 mt-8">Media That Matters</h2>
            <div className="w-full h-[1px] bg-gray-600 mb-8"></div>
            <p className="text-base mb-6 leading-relaxed">
              At Madhaus, we&apos;re reimagining African media through a lens of
              social innovation and systems thinking. Our content goes beyond
              entertainment to foster understanding and catalyze change.
            </p>
            <p className="text-base mb-6 leading-relaxed">
              Our productions range from documentary series examining urban
              challenges to podcasts featuring thought leaders across the
              continent. We believe in the power of storytelling to shift
              paradigms and inspire action.
            </p>
          </div>
          <div className="flex justify-end items-center gap-4 mb-8">
            <span>Our Media</span>
            <Link
              href="/media"
              className="flex items-center gap-2 bg-[#f2ece3] py-2 px-4 md:py-3 md:px-6 rounded-md"
            >
              <motion.span
                className="text-black"
                animate={{ x: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 1 }}
              >
                →
              </motion.span>
            </Link>
          </div>
        </div>
      ),
    },
  ];

  return (
    <motion.section
      ref={containerRef}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8, delay: 0.3 }}
      className="relative mb-32 flex flex-col items-center"
    >
      {/* Render cards in reverse order for proper stacking */}
      {cards
        .slice()
        .reverse()
        .map((card, reversedIndex) => {
          const index = cards.length - 1 - reversedIndex; // Convert back to original index

          // Calculate width based on the original index - Lagos (index 0) should be largest
          const widthPercentage = index === 0 ? 90 : 90 - index * 3; // Lagos: 90%, Design: 87%, Media: 84%

          return (
            <motion.div
              key={card.id}
              className={`relative ${card.bgColor} ${card.textColor} rounded-lg overflow-hidden shadow-lg p-10 mt-[-50px]`}
              style={{
                zIndex: hoveredCard === index ? 30 : 10 + reversedIndex, // Higher z-index for cards rendered earlier
                width: `${widthPercentage}%`,
                marginLeft: `${index * 1.5}%`,
                marginRight: `${index * 1.5}%`,
              }}
              onHoverStart={() => handleHover(index)}
              onHoverEnd={handleLeave}
              animate={{
                y: hoveredCard === index ? -30 : 0, // Lift the card less high
                scale: hoveredCard === index ? 1.03 : 1, // Scale the card less
                height:
                  hoveredCard === index
                    ? "auto"
                    : index === 0
                    ? "auto"
                    : "120px", // Top card always shows full content
              }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
            >
              {index === 0 ? (
                // First card always shows full content
                card.content
              ) : (
                <>
                  {/* For cards 1 and 2, show preview or full content based on hover state */}
                  {hoveredCard === index ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {card.content}
                    </motion.div>
                  ) : (
                    <motion.div className="flex flex-col h-full justify-center">
                      <h3 className="text-2xl font-bold mb-2">{card.title}</h3>
                      <p className="text-sm opacity-80 line-clamp-2">
                        {card.previewText}
                      </p>
                    </motion.div>
                  )}
                </>
              )}
            </motion.div>
          );
        })}
    </motion.section>
  );
};

export default FlipCard;
