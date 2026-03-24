"use client";

import { motion } from "framer-motion";
import { useRef } from "react";
import SpiralSVG from "../SpiralSVG";

const Section3_Spiral = ({ onNavigate, currentSection }) => {
  const steps = ["Question", "Investigate", "Translate", "Experiment", "Evaluate", "Repeat"];
  const pulseDuration = 0.8;
  const stepDelay = 0.7;
  const sequenceStartDelay = 0.8;
  const learnMoreDelay = sequenceStartDelay + steps.length * stepDelay + 0.4;

  const scrollContainerRef = useRef(null);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center px-8 bg-black text-white relative">
      {/* Section Indicator */}
      <div className="absolute top-8 right-8 text-caption opacity-40">
        03 / 05
      </div>

      <div className="max-w-5xl w-full space-y-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-h3 text-center"
        >
          bold ideas in black and white
        </motion.h2>

        {/* Animated Spiral */}
        <div className="my-8">
          <SpiralSVG />
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-body-sm text-center opacity-70"
        >
          it starts with a
        </motion.p>

        {/* Desktop: All steps in one line */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="hidden md:block text-body-lg text-center opacity-90 max-w-3xl mx-auto"
        >
          {steps.map((step, index) => (
            <span key={step} className="inline-flex items-center">
              <motion.span
                animate={{ opacity: [0.6, 1, 0.6], scale: [1, 1.06, 1] }}
                transition={{
                  duration: pulseDuration,
                  ease: "easeInOut",
                  delay: sequenceStartDelay + index * stepDelay,
                }}
                className="inline-block"
              >
                {step}
              </motion.span>
              {index < steps.length - 1 && (
                <span className="mx-2 opacity-50">→</span>
              )}
            </span>
          ))}
        </motion.p>

        {/* Mobile: Scrollable steps - one at a time */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="md:hidden w-full overflow-hidden"
        >
          <div
            ref={scrollContainerRef}
            className="flex gap-8 overflow-x-auto snap-x snap-mandatory scrollbar-hide px-8 -mx-8"
            style={{
              scrollSnapType: 'x mandatory',
              scrollBehavior: 'smooth',
            }}
          >
            {steps.map((step, index) => (
              <div
                key={step}
                className="flex-shrink-0 snap-center flex items-center justify-center"
                style={{
                  width: 'calc(100vw - 4rem)', // Full viewport width minus padding
                }}
              >
                <motion.span
                  animate={{ opacity: [0.6, 1, 0.6], scale: [1, 1.06, 1] }}
                  transition={{
                    duration: pulseDuration,
                    ease: "easeInOut",
                    delay: sequenceStartDelay + index * stepDelay,
                  }}
                  className="text-body-lg text-center opacity-90"
                >
                  {step}
                  {index < steps.length - 1 && (
                    <span className="ml-2 opacity-50">→</span>
                  )}
                </motion.span>
              </div>
            ))}
          </div>

          {/* Scroll indicator dots (mobile only) */}
          {autoScrollComplete && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="flex justify-center gap-2 mt-4"
            >
              {steps.map((_, index) => (
                <div
                  key={index}
                  className="w-1.5 h-1.5 rounded-full bg-white/30"
                />
              ))}
            </motion.div>
          )}
        </motion.div>

        {/* Expand Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
          className="text-center"
        >
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
              opacity: { duration: 2, repeat: Infinity, ease: "easeInOut", delay: learnMoreDelay },
              textShadow: { duration: 2, repeat: Infinity, ease: "easeInOut", delay: learnMoreDelay },
            }}
            onClick={() => {
              if (onNavigate) {
                onNavigate(4); // Navigate to Section 4 (PODS)
              }
            }}
            className="mt-8 text-caption hover:opacity-100 transition-opacity cursor-pointer"
          >
            + Learn more
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default Section3_Spiral;
