"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const LetterScramble = ({ onComplete }) => {
  const text1 = "Bold ideas in black and white.";
  const text2 = "What would you build if the system was blank?";
  const [displayText, setDisplayText] = useState(text1);
  const [isScrambling, setIsScrambling] = useState(false);

  useEffect(() => {
    // Wait 2 seconds, then start scrambling
    const timer = setTimeout(() => {
      setIsScrambling(true);
      scrambleText();
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const scrambleText = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()";
    const scrambleDuration = 600; // 0.6s scramble out
    const holdDuration = 300; // 0.3s chaos
    const reformDuration = 600; // 0.6s reform

    let frame = 0;
    const totalFrames = 30;

    // Phase 1: Scramble out
    const scrambleInterval = setInterval(() => {
      if (frame < totalFrames / 3) {
        setDisplayText(
          text1
            .split("")
            .map(() => chars[Math.floor(Math.random() * chars.length)])
            .join("")
        );
      }
      // Phase 2: Hold chaos
      else if (frame < (totalFrames * 2) / 3) {
        setDisplayText(
          text2
            .split("")
            .map(() => chars[Math.floor(Math.random() * chars.length)])
            .join("")
        );
      }
      // Phase 3: Reform to text2
      else {
        const progress = (frame - (totalFrames * 2) / 3) / (totalFrames / 3);
        const revealCount = Math.floor(text2.length * progress);

        setDisplayText(
          text2
            .split("")
            .map((char, i) => {
              if (i < revealCount) return char;
              return chars[Math.floor(Math.random() * chars.length)];
            })
            .join("")
        );
      }

      frame++;
      if (frame >= totalFrames) {
        clearInterval(scrambleInterval);
        setDisplayText(text2);
        setIsScrambling(false);
        setTimeout(() => {
          if (onComplete) onComplete();
        }, 500);
      }
    }, (scrambleDuration + holdDuration + reformDuration) / totalFrames);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="text-center"
    >
      <p
        className={`text-h2 text-white ${
          isScrambling ? "font-mono" : "font-serif"
        } transition-all duration-300`}
        style={{ fontFamily: isScrambling ? "monospace" : "var(--font-montserrat)" }}
      >
        {displayText}
      </p>
    </motion.div>
  );
};

export default LetterScramble;
