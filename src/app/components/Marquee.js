"use client";

import { motion } from "framer-motion";

const Marquee = () => {
  const keywords = [
    "Systems Thinking",
    "African Innovation",
    "Social Impact",
    "Urban Research",
    "Design for Change",
    "Media Innovation",
    "Community Solutions",
    "Bold Ideas",
  ];

  // Duplicate the keywords array to create seamless loop
  const duplicatedKeywords = [...keywords, ...keywords];

  return (
    <div className="relative w-full overflow-hidden bg-black border-y border-white/20 py-6">
      <motion.div
        className="flex whitespace-nowrap"
        animate={{
          x: [0, -50 + "%"],
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 20,
            ease: "linear",
          },
        }}
      >
        {duplicatedKeywords.map((keyword, index) => (
          <div
            key={index}
            className="flex items-center mx-8 text-white text-xl md:text-2xl font-light"
          >
            <span>{keyword}</span>
            <span className="mx-8 text-white/40">•</span>
          </div>
        ))}
      </motion.div>

      {/* Gradient overlays for fade effect on edges */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black to-transparent pointer-events-none z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black to-transparent pointer-events-none z-10" />
    </div>
  );
};

export default Marquee;
