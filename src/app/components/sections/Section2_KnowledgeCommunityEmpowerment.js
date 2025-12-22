"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Section2_KnowledgeCommunityEmpowerment = ({ onNavigate, currentSection, onOpenDrawer }) => {
  const [stage, setStage] = useState(0); // 0: knowledge, 1: community, 2: empowerment, 3: resolve
  const [showKnowledgeSubtext, setShowKnowledgeSubtext] = useState(false);
  const [showCommunitySubtext, setShowCommunitySubtext] = useState(false);
  const [showEmpowermentSubtext, setShowEmpowermentSubtext] = useState(false);

  // Drawer content with detailed pillar descriptions
  const drawerContent = (
    <div className="space-y-8">
      <p className="text-h3 font-semibold">Madhaus is built on three pillars:</p>

      <div className="space-y-4">
        <h4 className="text-h4 font-semibold tracking-wider">KNOWLEDGE</h4>
        <p className="text-body">
          We produce research, explainers, and content that makes complex systems understandable.
          Not academic papers — clear, visual, honest breakdowns of how things actually work.
        </p>
      </div>

      <div className="space-y-4">
        <h4 className="text-h4 font-semibold tracking-wider">COMMUNITY</h4>
        <p className="text-body">
          We connect thinkers, builders, and questioners across the continent.
          People who are tired of complaining and ready to collaborate.
        </p>
      </div>

      <div className="space-y-4">
        <h4 className="text-h4 font-semibold tracking-wider">EMPOWERMENT</h4>
        <p className="text-body">
          We provide the resources to act — from grants and mentorship to lab space and partnerships.
          Ideas deserve more than a tweet. They deserve a real shot.
        </p>
      </div>
    </div>
  );

  useEffect(() => {
    // Stage 1: Knowledge (0s - 4s)
    const knowledgeSubtextTimer = setTimeout(() => {
      setShowKnowledgeSubtext(true);
    }, 1500);

    const communityTimer = setTimeout(() => {
      setStage(1); // Move to Community stage
    }, 4000);

    // Stage 2: Community (4s - 8s)
    const communitySubtextTimer = setTimeout(() => {
      setShowCommunitySubtext(true);
    }, 5500); // 4s + 1.5s

    const empowermentTimer = setTimeout(() => {
      setStage(2); // Move to Empowerment stage
    }, 8000);

    // Stage 3: Empowerment (8s - 12s)
    const empowermentSubtextTimer = setTimeout(() => {
      setShowEmpowermentSubtext(true);
    }, 9500); // 8s + 1.5s

    const resolveTimer = setTimeout(() => {
      setStage(3); // Show resolve line
    }, 12000);

    // Auto-advance to next section at 14s
    const autoAdvanceTimer = setTimeout(() => {
      if (onNavigate) {
        onNavigate(currentSection + 1);
      }
    }, 14000);

    return () => {
      clearTimeout(knowledgeSubtextTimer);
      clearTimeout(communityTimer);
      clearTimeout(communitySubtextTimer);
      clearTimeout(empowermentTimer);
      clearTimeout(empowermentSubtextTimer);
      clearTimeout(resolveTimer);
      clearTimeout(autoAdvanceTimer);
    };
  }, [onNavigate, currentSection]);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center px-8 bg-black text-white relative">
      {/* Section Indicator */}
      <div className="absolute top-8 right-8 text-caption opacity-40">
        02 / 06
      </div>

      <div className="w-full max-w-7xl">
        {/* Triptych Container */}
        <div className="relative flex flex-col md:flex-row justify-center items-start gap-12 mb-16 min-h-[500px] md:min-h-[600px]">
          {/* Knowledge Pillar */}
          {stage >= 0 && (
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{
                opacity: 1,
                x: [0, "-30vw", "-35vw"][Math.min(stage, 2)],
              }}
              transition={{
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="flex flex-col space-y-6 w-full md:w-auto md:max-w-sm md:translate-x-0"
            >
              {/* Pillar Title */}
              <h2
                className="text-[clamp(2rem,5vw,4rem)] font-bold tracking-wider"
                style={{ fontFamily: "var(--font-montserrat)" }}
              >
                KNOWLEDGE
              </h2>

              {/* Headline */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                className="text-[clamp(1.25rem,3vw,2rem)] leading-relaxed"
                style={{ fontFamily: "var(--font-montserrat)" }}
              >
                To change systems, you need to understand them.
              </motion.p>

              {/* Subtext */}
              <AnimatePresence>
                {showKnowledgeSubtext && (
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-body leading-relaxed max-w-md"
                    style={{ color: "#888888" }}
                  >
                    Not in abstract language.
                    <br />
                    You deserve information that is truthful, scientific,
                    <br />
                    and grounded in lived reality —
                    <br />
                    explained in ways that actually make sense.
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>
          )}

          {/* Community Pillar */}
          {stage >= 1 && (
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{
                opacity: 1,
                x: stage === 1 ? 0 : "-5vw",
              }}
              transition={{
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="flex flex-col space-y-6 w-full md:w-auto md:max-w-sm md:translate-x-0"
            >
              {/* Pillar Title */}
              <h2
                className="text-[clamp(2rem,5vw,4rem)] font-bold tracking-wider"
                style={{ fontFamily: "var(--font-montserrat)" }}
              >
                COMMUNITY
              </h2>

              {/* Headline */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                className="text-[clamp(1.25rem,3vw,2rem)] leading-relaxed"
                style={{ fontFamily: "var(--font-montserrat)" }}
              >
                But understanding alone isn&apos;t enough.
              </motion.p>

              {/* Subtext */}
              <AnimatePresence>
                {showCommunitySubtext && (
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-body leading-relaxed max-w-md"
                    style={{ color: "#888888" }}
                  >
                    Change happens when people find each other —
                    <br />
                    people who want to do something,
                    <br />
                    not just say something.
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>
          )}

          {/* Empowerment Pillar */}
          {stage >= 2 && (
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="flex flex-col space-y-6 w-full md:w-auto md:max-w-sm"
            >
              {/* Pillar Title */}
              <h2
                className="text-[clamp(2rem,5vw,4rem)] font-bold tracking-wider"
                style={{ fontFamily: "var(--font-montserrat)" }}
              >
                EMPOWERMENT
              </h2>

              {/* Headline */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                className="text-[clamp(1.25rem,3vw,2rem)] leading-relaxed"
                style={{ fontFamily: "var(--font-montserrat)" }}
              >
                If you want to do something, you need resources.
              </motion.p>

              {/* Subtext */}
              <AnimatePresence>
                {showEmpowermentSubtext && (
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-body leading-relaxed max-w-md"
                    style={{ color: "#888888" }}
                  >
                    Not just inspiration. Tools. Space. Support.
                    <br />
                    A place to turn frustration into action,
                    <br />
                    and ideas into something real.
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </div>

        {/* Resolve Line */}
        <AnimatePresence>
          {stage === 3 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-center space-y-8"
            >
              <p
                className="text-[clamp(1.5rem,4vw,2.5rem)] font-semibold"
                style={{ fontFamily: "var(--font-montserrat)" }}
              >
                This is what Madhaus builds.
              </p>

              {/* Learn More Button */}
              <motion.button
                initial={{ opacity: 0 }}
                animate={{
                  opacity: [0.6, 1, 0.6],
                  textShadow: [
                    "0 0 0px rgba(255, 255, 255, 0)",
                    "0 0 10px rgba(255, 255, 255, 0.8)",
                    "0 0 0px rgba(255, 255, 255, 0)",
                  ],
                }}
                transition={{
                  opacity: { duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.5 },
                  textShadow: { duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.5 },
                }}
                onClick={() => onOpenDrawer && onOpenDrawer(drawerContent)}
                className="mt-4 text-caption hover:opacity-100 transition-opacity"
              >
                + LEARN MORE
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Section2_KnowledgeCommunityEmpowerment;
