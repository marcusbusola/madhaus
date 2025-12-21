"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const Section0_TitleCard = ({ onNavigate }) => {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    // Show button after 1 second
    const timer = setTimeout(() => {
      setShowButton(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleBegin = () => {
    onNavigate(1); // Navigate to Section 1
  };

  return (
    <div className="w-full h-full flex flex-col px-8 bg-black text-white relative">
      {/* Logo - Top Left */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="absolute top-8 left-8"
      >
        <Image
          src="/MH.svg"
          alt="Madhaus Logo"
          width={120}
          height={60}
          className="w-20 md:w-24 h-auto"
          priority
        />
      </motion.div>

      {/* Centered Content */}
      <div className="flex-1 flex flex-col items-center justify-center max-w-4xl mx-auto">
        {/* Main Text */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-h1 text-center mb-6"
        >
          Bold ideas in black and white.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-body-lg text-center opacity-80 max-w-2xl mb-12"
        >
          What would you build if the system was blank?
        </motion.p>

        {/* Begin Button with Light Effect */}
        {showButton && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: 1,
              y: 0,
              boxShadow: [
                "0 0 0px rgba(255, 255, 255, 0)",
                "0 0 20px rgba(255, 255, 255, 0.8)",
                "0 0 40px rgba(255, 255, 255, 1)",
                "0 0 20px rgba(255, 255, 255, 0.8)",
                "0 0 0px rgba(255, 255, 255, 0)",
              ],
            }}
            transition={{
              opacity: { duration: 0.5 },
              y: { duration: 0.5 },
              boxShadow: {
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              },
            }}
            onClick={handleBegin}
            className="light-border relative px-8 py-3 border border-white text-white text-body-sm uppercase tracking-wider hover:bg-white hover:text-black transition-all duration-300 overflow-hidden"
          >
            Begin →
          </motion.button>
        )}
      </div>
    </div>
  );
};

export default Section0_TitleCard;
