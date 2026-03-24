"use client";

import { motion } from "framer-motion";
import { trackLearnMoreClick } from '../../utils/analytics';

const Section5_Opportunity = ({ onNavigate }) => {
  const handleLearnMore = () => {
    trackLearnMoreClick('section5_why_now');
    if (onNavigate) {
      onNavigate(6); // Navigate to contact section
    }
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center px-8 bg-black text-white relative">
      {/* Section Indicator */}
      <div className="absolute top-8 right-8 text-caption opacity-40">
        05 / 05
      </div>

      <div className="max-w-4xl text-center space-y-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-body-sm"
        >
          Why now.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-h3 font-light max-w-3xl mx-auto"
          style={{ fontFamily: "var(--font-manrope)" }}
        >
          By 2050, 1 in 4 humans will be African.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-body-lg opacity-80 max-w-2xl mx-auto"
        >
          That's a quarter of humanity.
          The systems that shaped our last century
          weren't designed here. The ones that shape the next should be.

        </motion.p>

        {/* Expand Button */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0.6, 1, 0.6],
            textShadow: [
              "0 0 0px rgba(255, 255, 255, 0)",
              "0 0 10px rgba(255, 255, 255, 0.8)",
              "0 0 0px rgba(255, 255, 255, 0)",
            ],
          }}
          transition={{
            opacity: { duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.25 },
            textShadow: { duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.25 },
          }}
          onClick={handleLearnMore}
          className="mt-8 text-caption hover:opacity-100 transition-opacity"
        >
          + Learn more
        </motion.button>
      </div>
    </div>
  );
};

export default Section5_Opportunity;
