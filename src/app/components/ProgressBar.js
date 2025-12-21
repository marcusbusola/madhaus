"use client";

import { motion } from "framer-motion";

const ProgressBar = ({ progress, isPaused, currentSection }) => {
  // Don't show progress bar on Section 0 (title) or Section 6 (end)
  if (currentSection === 0 || currentSection === 6) {
    return null;
  }

  return (
    <div
      className="fixed top-0 left-0 w-full h-[2px] bg-white/10 z-50"
      style={{ pointerEvents: "none" }}
    >
      <motion.div
        className="h-full bg-white"
        initial={{ width: "0%" }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.1, ease: "linear" }}
      />
    </div>
  );
};

export default ProgressBar;
