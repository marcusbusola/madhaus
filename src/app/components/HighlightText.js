"use client";

import { motion } from "framer-motion";

// Highlight Words Component
const HighlightText = () => {
  const words = ["Bold", "ideas", "in", "black", "and", "white."];

  return (
    <div className="w-full flex items-center justify-end max-w-4xl ml-auto text-right min-h-[80vh]">
      <h1 className="font-light leading-tight text-[30px]">
        {words.map((word, index) => (
          <motion.span
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: index * 0.2, duration: 0.5 }} // Faster animation
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
