"use client";

import { motion } from "framer-motion";

const Section = ({ children, currentSection, direction, onClick }) => {
  const sectionVariants = {
    enter: (direction) => ({
      opacity: 0,
      y: direction > 0 ? 100 : -100,
    }),
    center: {
      opacity: 1,
      y: 0,
    },
    exit: (direction) => ({
      opacity: 0,
      y: direction > 0 ? -100 : 100,
    }),
  };

  return (
    <motion.div
      custom={direction}
      variants={sectionVariants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{
        duration: 0.7,
        ease: [0.43, 0.13, 0.23, 0.96],
      }}
      className="full-screen-section"
      onClick={onClick}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      {children}
    </motion.div>
  );
};

export default Section;
