"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const Section0_TitleCard = ({ onNavigate }) => {
  const [phase, setPhase] = useState("marquee"); // marquee, empty, question, button

  const problems = [
    "broken systems",
    "housing scarcity",
    "burnout culture",
    "inaccessible cities",
    "stagnant economies",
    "failing infrastructure",
    "education gaps",
    "healthcare crisis",
    "political gridlock",
    "environmental decay",
    "disconnected communities",
    "wasted potential",
  ];

  useEffect(() => {
    // Show marquee for 4 seconds
    const marqueeTimer = setTimeout(() => {
      setPhase("empty");
    }, 4000);

    // Show empty space briefly (0.8s)
    const emptyTimer = setTimeout(() => {
      setPhase("question");
    }, 4800);

    // Show button after question appears (1.5s later)
    const buttonTimer = setTimeout(() => {
      setPhase("button");
    }, 6300);

    return () => {
      clearTimeout(marqueeTimer);
      clearTimeout(emptyTimer);
      clearTimeout(buttonTimer);
    };
  }, []);

  const handleBegin = () => {
    onNavigate(1); // Navigate to Section 1
  };

  return (
    <div className="w-full h-full flex flex-col px-8 bg-black text-white relative overflow-hidden">
      {/* Logo - Top Left */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="absolute top-8 left-8 z-10"
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
      <div className="flex-1 flex flex-col items-center justify-center max-w-4xl mx-auto w-full">
        <AnimatePresence mode="wait">
          {/* Marquee Phase */}
          {phase === "marquee" && (
            <motion.div
              key="marquee"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="w-full overflow-hidden"
            >
              <motion.div
                className="flex gap-8 whitespace-nowrap text-h3 opacity-60"
                animate={{
                  x: [0, -2000],
                }}
                transition={{
                  x: {
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                  },
                }}
              >
                {/* Repeat problems array multiple times for seamless loop */}
                {[...problems, ...problems, ...problems].map((problem, index) => (
                  <span key={index} className="inline-block">
                    {problem}
                  </span>
                ))}
              </motion.div>
            </motion.div>
          )}

          {/* Empty Phase */}
          {phase === "empty" && (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="w-full h-32"
            />
          )}

          {/* Question Phase */}
          {(phase === "question" || phase === "button") && (
            <motion.div
              key="question"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-center space-y-12"
            >
              <h1 className="text-h1 max-w-3xl">
                What would you do if we had a blank slate?
              </h1>

              {/* Button appears after question */}
              {phase === "button" && (
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
                  lets begin
                </motion.button>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Section0_TitleCard;
