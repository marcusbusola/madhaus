"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const Section0_TitleCard = ({ onNavigate }) => {
  const [phase, setPhase] = useState("marquee"); // marquee, slowing, empty, question, button

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
    // Show marquee for 3 seconds, then start slowdown
    const slowingTimer = setTimeout(() => {
      setPhase("slowing");
    }, 3000);

    // Complete slowdown after 2s, then show empty
    const emptyTimer = setTimeout(() => {
      setPhase("empty");
    }, 5000);

    // Show question after brief pause
    const questionTimer = setTimeout(() => {
      setPhase("question");
    }, 5400);

    // Show button after question fully appears + pause for reflection
    // Question starts at 5.4s, takes ~2.1s to complete, then 0.8s pause
    const buttonTimer = setTimeout(() => {
      setPhase("button");
    }, 8300);

    return () => {
      clearTimeout(slowingTimer);
      clearTimeout(emptyTimer);
      clearTimeout(questionTimer);
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
          {(phase === "marquee" || phase === "slowing") && (
            <motion.div
              key="marquee"
              initial={{ opacity: 0 }}
              animate={{ opacity: phase === "slowing" ? 0 : 1 }}
              exit={{ opacity: 0 }}
              transition={{
                opacity: { duration: 2, ease: "easeOut" }
              }}
              className="w-full overflow-hidden space-y-6"
            >
              {/* First line - moving left */}
              <motion.div
                className="flex gap-8 whitespace-nowrap text-h3"
                style={{ opacity: 0.4 }}
                animate={{
                  x: [0, -2000],
                }}
                transition={{
                  x: {
                    duration: phase === "slowing" ? 60 : 20,
                    repeat: Infinity,
                    ease: phase === "slowing" ? "easeOut" : "linear",
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

              {/* Second line - moving right */}
              <motion.div
                className="flex gap-8 whitespace-nowrap text-h3"
                style={{ opacity: 0.4 }}
                animate={{
                  x: [-2000, 0],
                }}
                transition={{
                  x: {
                    duration: phase === "slowing" ? 60 : 20,
                    repeat: Infinity,
                    ease: phase === "slowing" ? "easeOut" : "linear",
                  },
                }}
              >
                {/* Repeat problems array multiple times for seamless loop */}
                {[...problems, ...problems, ...problems].map((problem, index) => (
                  <span key={`reverse-${index}`} className="inline-block">
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
              className="text-center space-y-16"
            >
              <h1 className="text-h2 max-w-3xl relative">
                <span className="invisible block" aria-hidden="true">
                  What if we could start over?
                </span>
                <span className="absolute inset-0 text-center" aria-hidden="true">
                  {/* All words rendered from start to prevent layout shift */}
                  {["What", "if", "we", "could", "start", "over?"].map((word, index) => (
                    <motion.span
                      key={index}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3, delay: index * 0.15 }}
                      className="inline-block mr-2"
                    >
                      {word}
                    </motion.span>
                  ))}
                </span>
                <span className="sr-only">What if we could start over?</span>
              </h1>

              {/* Button appears after question */}
              <div className="min-h-[56px] flex items-center justify-center">
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: phase === "button" ? 1 : 0,
                    boxShadow:
                      phase === "button"
                        ? [
                            "0 0 0px rgba(255, 255, 255, 0)",
                            "0 0 20px rgba(255, 255, 255, 0.8)",
                            "0 0 40px rgba(255, 255, 255, 1)",
                            "0 0 20px rgba(255, 255, 255, 0.8)",
                            "0 0 0px rgba(255, 255, 255, 0)",
                          ]
                        : "none",
                  }}
                  transition={{
                    opacity: { duration: 1, ease: "easeIn" },
                    boxShadow: {
                      duration: 2,
                      repeat: phase === "button" ? Infinity : 0,
                      ease: "easeInOut",
                    },
                  }}
                  onClick={handleBegin}
                  className="light-border relative px-8 py-3 border border-white text-white text-body-sm uppercase tracking-wider hover:bg-white hover:text-black transition-all duration-300 overflow-hidden"
                  style={{ pointerEvents: phase === "button" ? "auto" : "none" }}
                  aria-hidden={phase !== "button"}
                >
                  lets begin
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Section0_TitleCard;
