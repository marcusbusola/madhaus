"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Section3_KnowledgeCommunityEmpowerment = () => {
  const [stage, setStage] = useState(0); // 0: knowledge, 1: community, 2: empowerment, 3: resolve
  const [showKnowledgeSubtext, setShowKnowledgeSubtext] = useState(false);
  const [showCommunitySubtext, setShowCommunitySubtext] = useState(false);
  const [showEmpowermentSubtext, setShowEmpowermentSubtext] = useState(false);

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

    return () => {
      clearTimeout(knowledgeSubtextTimer);
      clearTimeout(communityTimer);
      clearTimeout(communitySubtextTimer);
      clearTimeout(empowermentTimer);
      clearTimeout(empowermentSubtextTimer);
      clearTimeout(resolveTimer);
    };
  }, []);

  const pillars = [
    {
      id: "knowledge",
      title: "KNOWLEDGE",
      headline: "To change systems, you need to understand them.",
      subtext: (
        <>
          Not in abstract language.
          <br />
          You deserve information that is truthful, scientific,
          <br />
          and grounded in lived reality —
          <br />
          explained in ways that actually make sense.
        </>
      ),
      show: stage >= 0,
      showSubtext: showKnowledgeSubtext,
    },
    {
      id: "community",
      title: "COMMUNITY",
      headline: "But understanding alone isn't enough.",
      subtext: (
        <>
          Change happens when people find each other —
          <br />
          people who want to do something,
          <br />
          not just say something.
        </>
      ),
      show: stage >= 1,
      showSubtext: showCommunitySubtext,
    },
    {
      id: "empowerment",
      title: "EMPOWERMENT",
      headline: "If you want to do something, you need resources.",
      subtext: (
        <>
          Not just inspiration. Tools. Space. Support.
          <br />
          A place to turn frustration into action,
          <br />
          and ideas into something real.
        </>
      ),
      show: stage >= 2,
      showSubtext: showEmpowermentSubtext,
    },
  ];

  const visiblePillars = pillars.filter((p) => p.show);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center px-8 bg-black text-white relative">
      {/* Section Indicator */}
      <div className="absolute top-8 right-8 text-caption opacity-40">
        02 / 06
      </div>

      <div className="w-full max-w-7xl">
        {/* Triptych Container */}
        <div
          className={`grid gap-12 mb-16 ${
            stage === 0
              ? "grid-cols-1 place-items-center"
              : stage === 1
              ? "grid-cols-2 md:grid-cols-2"
              : "grid-cols-1 md:grid-cols-3"
          }`}
        >
          {visiblePillars.map((pillar, index) => (
            <motion.div
              key={pillar.id}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="flex flex-col space-y-6"
            >
              {/* Pillar Title */}
              <h2
                className="text-[clamp(2rem,5vw,4rem)] font-bold tracking-wider"
                style={{ fontFamily: "var(--font-montserrat)" }}
              >
                {pillar.title}
              </h2>

              {/* Headline */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                className="text-[clamp(1.25rem,3vw,2rem)] leading-relaxed"
                style={{ fontFamily: "var(--font-montserrat)" }}
              >
                {pillar.headline}
              </motion.p>

              {/* Subtext */}
              <AnimatePresence>
                {pillar.showSubtext && (
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-body leading-relaxed opacity-60 max-w-md"
                  >
                    {pillar.subtext}
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Resolve Line */}
        <AnimatePresence>
          {stage === 3 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-center"
            >
              <p
                className="text-[clamp(1.5rem,4vw,2.5rem)] font-semibold"
                style={{ fontFamily: "var(--font-montserrat)" }}
              >
                This is what Madhaus builds.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Section3_KnowledgeCommunityEmpowerment;
