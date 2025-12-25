"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Section2_KnowledgeCommunityEmpowerment = ({ onNavigate, currentSection, onOpenDrawer }) => {
  const [stage, setStage] = useState(0); // 0: knowledge, 1: community, 2: empowerment, 3: resolve
  const [showKnowledgeSubtext, setShowKnowledgeSubtext] = useState(false);
  const [showCommunitySubtext, setShowCommunitySubtext] = useState(false);
  const [showEmpowermentSubtext, setShowEmpowermentSubtext] = useState(false);
  const resolveTimersRef = useRef([]);
  const hasStartedResolveRef = useRef(false);

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

    return () => {
      clearTimeout(knowledgeSubtextTimer);
      clearTimeout(communityTimer);
      clearTimeout(communitySubtextTimer);
      clearTimeout(empowermentTimer);
      clearTimeout(empowermentSubtextTimer);
    };
  }, [onNavigate, currentSection]);

  useEffect(() => {
    if (stage !== 2 || hasStartedResolveRef.current) {
      return;
    }
    hasStartedResolveRef.current = true;
    resolveTimersRef.current.push(
      setTimeout(() => {
        setStage(3); // Show resolve line
      }, 4000)
    );
    resolveTimersRef.current.push(
      setTimeout(() => {
        if (onNavigate) {
          onNavigate(currentSection + 1);
        }
      }, 6000)
    );
    return () => {
      resolveTimersRef.current.forEach((timerId) => clearTimeout(timerId));
      resolveTimersRef.current = [];
    };
  }, [stage, onNavigate, currentSection]);

  const isResolve = stage === 3;

  return (
    <div className="w-full h-full flex flex-col items-center justify-center px-6 md:px-10 bg-black text-white relative">
      {/* Section Indicator */}
      <div className="absolute top-8 right-8 text-caption opacity-40">
        02 / 06
      </div>

      <div className="w-full max-w-6xl mx-auto">
        {/* Triptych Container */}
        <div
          className={`relative flex flex-col md:flex-row items-center gap-10 md:gap-12 ${
            isResolve ? "md:justify-between" : "md:justify-center"
          }`}
        >
          <motion.div
            className="w-full md:max-w-4xl"
            animate={{ x: isResolve ? -60 : 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 items-start">
              {/* Knowledge Pillar */}
              {stage >= 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  className="flex flex-col space-y-3 w-full max-w-[260px] mx-auto"
                >
                  {/* Pillar Title */}
                  <h2
                    className="text-[clamp(1.5rem,3.5vw,2.6rem)] font-semibold"
                    style={{ fontFamily: "var(--font-montserrat)" }}
                  >
                    Knowledge
                  </h2>

                  {/* Headline */}
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6, duration: 0.6 }}
                    className="text-[clamp(1rem,2.2vw,1.4rem)] leading-relaxed"
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
                        className="text-body-sm leading-relaxed"
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
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  className="flex flex-col space-y-3 w-full max-w-[260px] mx-auto"
                >
                  {/* Pillar Title */}
                  <h2
                    className="text-[clamp(1.5rem,3.5vw,2.6rem)] font-semibold"
                    style={{ fontFamily: "var(--font-montserrat)" }}
                  >
                    Community
                  </h2>

                  {/* Headline */}
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6, duration: 0.6 }}
                    className="text-[clamp(1rem,2.2vw,1.4rem)] leading-relaxed"
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
                        className="text-body-sm leading-relaxed"
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
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  className="flex flex-col space-y-3 w-full max-w-[260px] mx-auto"
                >
                  {/* Pillar Title */}
                  <h2
                    className="text-[clamp(1.5rem,3.5vw,2.6rem)] font-semibold"
                    style={{ fontFamily: "var(--font-montserrat)" }}
                  >
                    Empowerment
                  </h2>

                  {/* Headline */}
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6, duration: 0.6 }}
                    className="text-[clamp(1rem,2.2vw,1.4rem)] leading-relaxed"
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
                        className="text-body-sm leading-relaxed"
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
          </motion.div>

          {/* Resolve Line */}
          <AnimatePresence>
            {stage === 3 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="flex flex-col items-center justify-center text-center space-y-6 border border-white/20 p-6 w-full max-w-[240px] md:max-w-[260px]"
                style={{ aspectRatio: "1 / 1" }}
              >
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
                  className="px-6 py-2 text-caption uppercase tracking-wider border border-white/40 hover:border-white hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-white/60 transition"
                >
                  Learn more
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Section2_KnowledgeCommunityEmpowerment;
