"use client";

import { motion } from "framer-motion";

const Section1_Vision = ({ onOpenDrawer }) => {
  const drawerContent = (
    <div className="space-y-6">
      <p className="text-body-lg">
        Madhaus is a social innovation lab disguised as a media company. We
        investigate broken systems, design experiments to fix them, and publish
        everything we learn — building a generation of Africans equipped to
        remake their own institutions.
      </p>
      <p className="text-body">
        We don't just report on problems. We map them, test solutions, and
        share what works.
      </p>
      <p className="text-body-lg font-semibold">Launching 2025.</p>
    </div>
  );

  return (
    <div className="w-full h-full flex flex-col items-center justify-center px-8 bg-black text-white">
      <div className="max-w-4xl text-center space-y-8">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-display"
        >
          MADHAUS
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-h3 font-light max-w-3xl mx-auto"
          style={{ fontFamily: "var(--font-manrope)" }}
        >
          Africa's engine room for turning questions into systems that work.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-body-lg opacity-80 max-w-2xl mx-auto"
        >
          A social innovation lab. A media company. A builder of what's next.
        </motion.p>

        {/* Expand Button */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          onClick={() => onOpenDrawer(drawerContent)}
          className="mt-8 text-caption opacity-60 hover:opacity-100 transition-opacity"
        >
          + LEARN MORE
        </motion.button>
      </div>
    </div>
  );
};

export default Section1_Vision;
