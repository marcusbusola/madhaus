"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import LetterScramble from "../LetterScramble";

const Section0_TitleCard = ({ onNavigate }) => {
  const [showButton, setShowButton] = useState(false);

  const handleScrambleComplete = () => {
    setShowButton(true);
  };

  const handleBegin = () => {
    onNavigate(1); // Navigate to Section 1
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center px-8 bg-black text-white">
      {/* Logo */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="mb-12"
      >
        <Image
          src="/MH.svg"
          alt="Madhaus Logo"
          width={120}
          height={60}
          className="w-24 md:w-32 h-auto"
          priority
        />
      </motion.div>

      {/* Letter Scramble Animation */}
      <div className="max-w-4xl mb-12">
        <LetterScramble onComplete={handleScrambleComplete} />
      </div>

      {/* Begin Button */}
      {showButton && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          onClick={handleBegin}
          className="px-8 py-3 border border-white text-white text-body-sm uppercase tracking-wider hover:bg-white hover:text-black transition-all duration-300"
        >
          Begin →
        </motion.button>
      )}
    </div>
  );
};

export default Section0_TitleCard;
