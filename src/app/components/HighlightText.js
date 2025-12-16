"use client";

import { motion } from "framer-motion";
import { useTypewriterSound } from "../hooks/useTypewriterSound";

// Highlight Words Component
const HighlightText = () => {
  const words = ["Bold", "ideas", "in", "black", "and", "white."];
  const { playSound } = useTypewriterSound();

  return (
    <div className="w-full flex items-center justify-center md:justify-end text-center md:text-right min-h-[50vh]">
      <h1 className="font-light leading-tight text-2xl md:text-3xl">
        {words.map((word, index) => (
          <motion.span
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: index * 0.2, duration: 0.5 }} // Faster animation
            onAnimationStart={() => playSound()}
            style={{ display: "inline-block", marginRight: "0.25em" }}
          >
            {word}
          </motion.span>
        ))}
      </h1>
    </div>
  );
};

export default HighlightText;
