"use client";

import { motion } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import SpiralSVG from "../SpiralSVG";

const Section3_Spiral = ({ onOpenDrawer, onNavigate, currentSection }) => {
  const drawerContent = (
    <div className="space-y-8">
      <p className="text-h3 font-semibold">Every Madhaus project follows the same cycle:</p>

      <div className="space-y-6">
        <div>
          <h4 className="text-body-lg font-semibold mb-2">01 QUESTION</h4>
          <p className="text-body">
            We start with what others won&apos;t ask. Why does this keep happening?
            Who benefits from it staying broken?
          </p>
        </div>

        <div>
          <h4 className="text-body-lg font-semibold mb-2">02 INVESTIGATE</h4>
          <p className="text-body">
            Using systems thinking, we map how problems connect — the policies,
            incentives, actors, and history that keep cycles spinning.
          </p>
        </div>

        <div>
          <h4 className="text-body-lg font-semibold mb-2">03 TRANSLATE</h4>
          <p className="text-body">
            Insights are useless in PDFs. We turn findings into content that
            reaches millions — video, essays, visualizations that make systems
            legible.
          </p>
        </div>

        <div>
          <h4 className="text-body-lg font-semibold mb-2">04 EXPERIMENT</h4>
          <p className="text-body">
            We design real-world tests — pilots, prototypes, programs — to see
            what actually shifts the system.
          </p>
        </div>

        <div>
          <h4 className="text-body-lg font-semibold mb-2">05 EVALUATE</h4>
          <p className="text-body">
            Did it work? Can it scale? Should it become a venture, a policy, a
            campaign? Or did we just find a better question?
          </p>
        </div>
      </div>

      <p className="text-body-lg font-semibold italic">The spiral continues.</p>
    </div>
  );

  const steps = ["Question", "Investigate", "Translate", "Experiment", "Evaluate", "Repeat"];
  const pulseDuration = 0.8;
  const stepDelay = 0.7;
  const sequenceStartDelay = 0.8;
  const learnMoreDelay = sequenceStartDelay + steps.length * stepDelay + 0.4;

  const scrollContainerRef = useRef(null);
  const [autoScrollComplete, setAutoScrollComplete] = useState(false);

  // Auto-scroll on mobile as each step pulses
  useEffect(() => {
    if (typeof window === 'undefined' || window.innerWidth >= 768) return; // Desktop - no auto-scroll

    const scrollToStep = (stepIndex) => {
      if (scrollContainerRef.current) {
        const stepElement = scrollContainerRef.current.children[stepIndex];
        if (stepElement) {
          stepElement.scrollIntoView({
            behavior: 'smooth',
            block: 'nearest',
            inline: 'center'
          });
        }
      }
    };

    // Create timers for each step to scroll as it pulses
    const timers = steps.map((_, index) => {
      const delay = sequenceStartDelay + index * stepDelay;
      return setTimeout(() => scrollToStep(index), delay * 1000);
    });

    // Mark auto-scroll complete after all steps shown
    const completeTimer = setTimeout(() => {
      setAutoScrollComplete(true);
    }, (sequenceStartDelay + steps.length * stepDelay + 0.5) * 1000);

    return () => {
      timers.forEach(timer => clearTimeout(timer));
      clearTimeout(completeTimer);
    };
  }, [steps.length, sequenceStartDelay, stepDelay]);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center px-8 bg-black text-white">
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
            className="mt-4 text-caption hover:opacity-100 transition-opacity cursor-pointer"
          >
            + LEARN MORE
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default Section3_Spiral;
