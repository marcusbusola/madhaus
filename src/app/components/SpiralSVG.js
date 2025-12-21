"use client";

import { motion } from "framer-motion";

const SpiralSVG = () => {
  // Spiral path - Archimedean spiral
  const spiralPath = `
    M 250 250
    C 250 200, 300 200, 300 250
    C 300 300, 200 300, 200 250
    C 200 150, 350 150, 350 250
    C 350 350, 150 350, 150 250
    C 150 100, 400 100, 400 250
    C 400 400, 100 400, 100 250
    C 100 50, 450 50, 450 250
  `;

  return (
    <div className="flex items-center justify-center w-full h-64 md:h-96">
      <svg
        viewBox="0 0 500 500"
        className="w-full h-full max-w-md"
        xmlns="http://www.w3.org/2000/svg"
      >
        <motion.path
          d={spiralPath}
          stroke="white"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{
            pathLength: { duration: 3, ease: "easeInOut" },
            opacity: { duration: 0.5 },
          }}
        />
      </svg>
    </div>
  );
};

export default SpiralSVG;
