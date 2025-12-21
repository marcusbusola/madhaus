"use client";

import { motion } from "framer-motion";
import SpiralSVG from "../SpiralSVG";

const Section3_Spiral = ({ onOpenDrawer }) => {
  const drawerContent = (
    <div className="space-y-8">
      <p className="text-h3 font-semibold">Every Madhaus project follows the same cycle:</p>

      <div className="space-y-6">
        <div>
          <h4 className="text-body-lg font-semibold mb-2">01 QUESTION</h4>
          <p className="text-body">
            We start with what others won't ask. Why does this keep happening?
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

  return (
    <div className="w-full h-full flex flex-col items-center justify-center px-8 bg-black text-white">
      <div className="max-w-5xl w-full space-y-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-h1 text-center"
        >
          The Madhaus Spiral
        </motion.h2>

        {/* Animated Spiral */}
        <div className="my-8">
          <SpiralSVG />
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-body-lg text-center opacity-80 max-w-3xl mx-auto"
        >
          Question → Investigate → Translate → Experiment → Evaluate → Repeat
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-h3 text-center font-light"
          style={{ fontFamily: "var(--font-manrope)" }}
        >
          From bold questions to systems that last.
        </motion.p>

        {/* Expand Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
          className="text-center"
        >
          <motion.button
            animate={{
              opacity: [0.6, 1, 0.6],
              textShadow: [
                "0 0 0px rgba(255, 255, 255, 0)",
                "0 0 10px rgba(255, 255, 255, 0.8)",
                "0 0 0px rgba(255, 255, 255, 0)",
              ],
            }}
            transition={{
              opacity: { duration: 2, repeat: Infinity, ease: "easeInOut", delay: 1 },
              textShadow: { duration: 2, repeat: Infinity, ease: "easeInOut", delay: 1 },
            }}
            onClick={() => onOpenDrawer(drawerContent)}
            className="mt-4 text-caption hover:opacity-100 transition-opacity"
          >
            + LEARN MORE
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default Section3_Spiral;
