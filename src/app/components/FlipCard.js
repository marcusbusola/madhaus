"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";

// Flip Card Component
const FlipCard = () => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [cardOrder, setCardOrder] = useState([0, 1, 2]); // Track current card order
  const [isAnimating, setIsAnimating] = useState(false);  // Prevent multiple simultaneous animations
  const [supportsHover, setSupportsHover] = useState(true);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.2 });

  // Detect devices that don't support hover and fall back to stacked layout
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mediaQuery = window.matchMedia("(hover: none)");
    const handleChange = (event) => setSupportsHover(!event.matches);
    handleChange(mediaQuery);
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const handleHover = (index) => {
    setHoveredCard(index);
  };

  const handleLeave = () => {
    setHoveredCard(null);
  };

  const handleCardClick = (clickedIndex) => {
    if (isAnimating) return; // Prevent multiple clicks during animation

    const currentPosition = cardOrder.indexOf(clickedIndex);

    // Only shuffle if card is not already on top (position 0)
    if (currentPosition !== 0) {
      setIsAnimating(true);

      // Reorder: move clicked card to front
      const newOrder = [clickedIndex, ...cardOrder.filter(i => i !== clickedIndex)];
      setCardOrder(newOrder);

      // Reset animation lock after animation completes (3.5s)
      setTimeout(() => {
        setIsAnimating(false);
      }, 3500);
    }
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
    <div
      ref={containerRef}
      className={`relative ${supportsHover ? 'flex items-center' : 'flex flex-col items-center gap-12'} w-full max-w-6xl`}
      style={{
        perspective: "2000px", // Enable 3D transforms
        perspectiveOrigin: "center", // Center vanishing point
        minHeight: supportsHover ? "800px" : "auto",
      }}
    >
      {/* Render cards based on cardOrder for proper stacking */}
      {cardOrder.map((cardId, stackPosition) => {
        const card = cards[cardId];
        const index = cardId; // Original card index for data access
        const isTopCard = stackPosition === 0;
        const shouldShowFull = !supportsHover || hoveredCard === index || isTopCard;

        return (
          <motion.div
            key={card.id}
            className={`${card.bgColor} ${card.textColor} rounded-lg overflow-hidden shadow-lg p-6 md:p-10 cursor-pointer w-full max-w-4xl`}
            style={{
              position: supportsHover ? "absolute" : "relative",
              top: supportsHover ? `${stackPosition * 48}px` : "auto",
              left: supportsHover ? "0" : 0,
              zIndex: hoveredCard === index ? 30 : (cardOrder.length - stackPosition) * 10,
            }}
            onClick={() => handleCardClick(index)}
            onHoverStart={supportsHover ? () => handleHover(index) : undefined}
            onHoverEnd={supportsHover ? handleLeave : undefined}
            initial={false}
            animate={{
              // 3D Flip Animation
              rotateY: supportsHover ? (isTopCard ? 0 : 8 * stackPosition) : 0,
              y: supportsHover ? (hoveredCard === index ? -30 : 0) : 0,
              scale: supportsHover && hoveredCard === index ? 1.03 : 1,
              height: shouldShowFull ? "auto" : "220px",
            }}
            transition={{
              type: "spring",
              stiffness: 60,
              damping: 25,
              duration: supportsHover ? 3.5 : 0.8,
            }}
          >
            {shouldShowFull ? (
              card.content
            ) : (
              <motion.div className="flex flex-col h-full justify-center">
                <h3 className="text-2xl font-bold mb-2">{card.title}</h3>
                <p className="text-sm opacity-80 line-clamp-3">
                  {card.previewText}
                </p>
              </motion.div>
            )}
          </motion.div>
        );
      })}
    </div>
  );
};

export default FlipCard;
