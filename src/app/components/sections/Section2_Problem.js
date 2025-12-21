"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Section2_Problem = ({ onOpenDrawer }) => {
  const [stage, setStage] = useState("grid"); // grid, selected, drawer
  const [hoveredIssue, setHoveredIssue] = useState(null);
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [showSocialProof, setShowSocialProof] = useState(false);
  const [showReframe, setShowReframe] = useState(false);
  const [showProvocation, setShowProvocation] = useState(false);
  const [showHow, setShowHow] = useState(false);
  const [showLearnMore, setShowLearnMore] = useState(false);

  const issues = [
    {
      id: "security",
      label: "Security",
      icon: "shield",
      stat: "Over 40% report feeling unsafe in daily life.",
      percentage: Math.floor(Math.random() * (35 - 18 + 1)) + 18,
      provocation: {
        line1: "Most security conversations end at policing —",
        line2: "more officers, more patrols, more force.",
        line3: "",
        line4: "Fewer ask what produces insecurity in the first place:",
        line5: "unemployment, inequality, broken trust,",
        line6: "or why some neighborhoods are protected and others aren't.",
      },
      drawer: {
        content: (
          <div className="space-y-6">
            <p className="text-body-lg">
              Security isn't just a policing problem. It's a systems problem — shaped by urban design, economic opportunity, historical neglect, and who gets to feel protected.
            </p>
            <p className="text-body">
              We have plenty of opinions on crime. Fewer spaces to understand why it concentrates where it does, or to design interventions that address root causes instead of symptoms.
            </p>
            <p className="text-body font-semibold">
              Madhaus exists to be that space.
            </p>
            <p className="text-body">
              A living room for the questions no one's asking — and the ideas that might actually change something.
            </p>
          </div>
        ),
      },
    },
    {
      id: "poverty",
      label: "Poverty",
      icon: "coin",
      stat: "Nearly half the population lives on less than $2 a day.",
      percentage: Math.floor(Math.random() * (35 - 18 + 1)) + 18,
      provocation: {
        line1: "Poverty discourse is dominated by charity and aid —",
        line2: "give more, distribute more, intervene more.",
        line3: "",
        line4: "Fewer ask why wealth concentrates where it does,",
        line5: "how policy creates scarcity,",
        line6: "or why the same communities stay poor across generations.",
      },
      drawer: {
        content: (
          <div className="space-y-6">
            <p className="text-body-lg">
              Poverty isn't a lack of resources. It's a system that allocates resources unevenly — through land policy, credit access, taxation, and who gets to accumulate wealth.
            </p>
            <p className="text-body">
              We're not short on sympathy for the poor. We're short on understanding of the mechanisms that keep people poor.
            </p>
            <p className="text-body font-semibold">
              Madhaus exists to map those mechanisms — and to find the leverage points where things could actually shift.
            </p>
          </div>
        ),
      },
    },
    {
      id: "health",
      label: "Health",
      icon: "heart",
      stat: "1 in 10 deaths is linked to lack of basic care.",
      percentage: Math.floor(Math.random() * (35 - 18 + 1)) + 18,
      provocation: {
        line1: "Health conversations focus on hospitals and drugs —",
        line2: "more supply, more access.",
        line3: "",
        line4: "Fewer ask why your postcode determines your health,",
        line5: "why prevention is underfunded,",
        line6: "or how food, housing, and pollution shape who gets sick.",
      },
      drawer: {
        content: (
          <div className="space-y-6">
            <p className="text-body-lg">
              Health isn't made in hospitals. It's made in homes, neighborhoods, and policy rooms — by decisions about water, sanitation, food, and whether your community is seen as worth investing in.
            </p>
            <p className="text-body">
              We have health ministries. We don't have enough people asking why the system keeps producing the same outcomes.
            </p>
            <p className="text-body font-semibold">
              That's the work. Madhaus is the room where that work can happen.
            </p>
          </div>
        ),
      },
    },
    {
      id: "employment",
      label: "Employment",
      icon: "briefcase",
      stat: "Over 60% of young people work informally or are underemployed.",
      percentage: Math.floor(Math.random() * (35 - 18 + 1)) + 18,
      provocation: {
        line1: "Employment talk centers on skills and jobs —",
        line2: "train more people, create more positions.",
        line3: "",
        line4: "Fewer ask why formal work keeps shrinking,",
        line5: "who the informal economy actually serves,",
        line6: "or why a degree doesn't guarantee dignity.",
      },
      drawer: {
        content: (
          <div className="space-y-6">
            <p className="text-body-lg">
              The future of work in Africa won't look like the past — and that's not necessarily bad. But we're not designing for what's coming.
            </p>
            <p className="text-body">
              We have job programs. We don't have enough spaces to reimagine what work could look like in economies where the old playbook doesn't apply.
            </p>
            <p className="text-body font-semibold">
              Madhaus is that space. A room for ideas that don't fit the template.
            </p>
          </div>
        ),
      },
    },
    {
      id: "housing",
      label: "Housing",
      icon: "house",
      stat: "Over 50% of urban residents live in informal housing.",
      percentage: Math.floor(Math.random() * (35 - 18 + 1)) + 18,
      provocation: {
        line1: "Housing conversations focus on units —",
        line2: "how many, how fast, how cheap.",
        line3: "",
        line4: "Fewer ask who housing is actually for,",
        line5: "how land, finance, and policy interact,",
        line6: "or why informal solutions keep filling the gap.",
      },
      drawer: {
        content: (
          <div className="space-y-6">
            <p className="text-body-lg">
              The housing crisis isn't a shortage of buildings. It's a system where land is speculation, finance excludes most people, and policy serves developers over residents.
            </p>
            <p className="text-body">
              We have housing ministries. We don't have enough young people asking why the system keeps failing — or designing alternatives.
            </p>
            <p className="text-body font-semibold">
              That's why Madhaus exists. A living room for the ideas that could actually change how we build.
            </p>
          </div>
        ),
      },
    },
    {
      id: "energy",
      label: "Energy",
      icon: "bolt",
      stat: "Almost half the population lacks reliable electricity.",
      percentage: Math.floor(Math.random() * (35 - 18 + 1)) + 18,
      provocation: {
        line1: "Energy debates are about megawatts and grids —",
        line2: "more generation, more infrastructure.",
        line3: "",
        line4: "Fewer ask who energy systems are designed for,",
        line5: "why off-grid innovations stay marginal,",
        line6: "or how energy access shapes every other opportunity.",
      },
      drawer: {
        content: (
          <div className="space-y-6">
            <p className="text-body-lg">
              Electricity isn't just power — it's possibility. Education, healthcare, business, safety — all depend on it. And the current system decides who gets access.
            </p>
            <p className="text-body">
              We talk about renewable transitions. We don't talk enough about energy justice — who's included in the future we're building.
            </p>
            <p className="text-body font-semibold">
              Madhaus is where those conversations can happen. A space for bold ideas about who the grid should serve.
            </p>
          </div>
        ),
      },
    },
  ];

  // Handle selection with staged reveals
  const handleSelect = (issue) => {
    setSelectedIssue(issue);
    setStage("selected");

    // Staged reveals
    setTimeout(() => setShowSocialProof(true), 600);
    setTimeout(() => setShowReframe(true), 2100);
    setTimeout(() => setShowProvocation(true), 3100);
    setTimeout(() => setShowHow(true), 3600);
    setTimeout(() => setShowLearnMore(true), 4100);
  };

  const handleLearnMore = () => {
    const selectedData = issues.find((i) => i.id === selectedIssue);
    if (selectedData) {
      const drawerContent = (
        <div className="space-y-6">
          {selectedData.drawer.content}
          <p className="text-body opacity-60 mt-8">
            This is one of many questions we're exploring.
          </p>
        </div>
      );
      onOpenDrawer(drawerContent);
    }
  };

  // Icon components
  const IssueIcon = ({ type, className = "" }) => {
    const iconProps = {
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: 2,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `w-16 h-16 ${className}`,
    };

    const icons = {
      shield: (
        <svg {...iconProps}>
          <motion.path
            d="M12 3 L22 7 L22 13 C22 18 17 22 12 24 C7 22 2 18 2 13 L2 7 Z"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />
        </svg>
      ),
      coin: (
        <svg {...iconProps}>
          <motion.circle
            cx="12"
            cy="12"
            r="10"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />
          <motion.line
            x1="2"
            y1="12"
            x2="22"
            y2="12"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, ease: "easeInOut", delay: 0.3 }}
          />
        </svg>
      ),
      heart: (
        <svg {...iconProps}>
          <motion.path
            d="M12 21 C12 21 3 14 3 8 C3 5 6 3 9 3 C10.5 3 12 4 12 6 C12 4 13.5 3 15 3 C18 3 21 5 21 8 C21 14 12 21 12 21 Z"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />
        </svg>
      ),
      briefcase: (
        <svg {...iconProps}>
          <motion.rect
            x="2"
            y="8"
            width="20"
            height="12"
            rx="2"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />
          <motion.path
            d="M8 8 L8 5 C8 4 9 3 10 3 L14 3 C15 3 16 4 16 5 L16 8"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, ease: "easeInOut", delay: 0.3 }}
          />
        </svg>
      ),
      house: (
        <svg {...iconProps}>
          <motion.path
            d="M3 12 L12 3 L21 12"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />
          <motion.rect
            x="5"
            y="12"
            width="14"
            height="10"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, ease: "easeInOut", delay: 0.3 }}
          />
        </svg>
      ),
      bolt: (
        <svg {...iconProps}>
          <motion.path
            d="M13 2 L4 14 L11 14 L10 22 L20 10 L13 10 Z"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />
        </svg>
      ),
    };

    return icons[type] || null;
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center px-8 bg-black text-white relative">
      {/* Section Indicator */}
      <div className="absolute top-8 right-8 text-caption opacity-40">
        01 / 06
      </div>

      <div className="max-w-6xl w-full">
        {/* STAGE 1 & 2: Grid View */}
        {stage === "grid" && (
          <div className="space-y-12">
            {/* Headline */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-h1 text-center"
            >
              What keeps you up at night?
            </motion.h2>

            {/* Grid */}
            <div className="grid grid-cols-3 gap-8">
              {issues.map((issue, index) => (
                <motion.div
                  key={issue.id}
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: hoveredIssue && hoveredIssue !== issue.id ? 0.4 : 1,
                    scale: hoveredIssue === issue.id ? 1.05 : 1,
                  }}
                  transition={{ duration: 0.3 }}
                  onMouseEnter={() => setHoveredIssue(issue.id)}
                  onMouseLeave={() => setHoveredIssue(null)}
                  onClick={() => handleSelect(issue.id)}
                  className="flex flex-col items-center justify-center p-6 cursor-pointer group"
                >
                  {/* Icon */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <IssueIcon type={issue.icon} />
                  </motion.div>

                  {/* Label */}
                  <h3 className="text-h3 mt-4 mb-2">{issue.label}</h3>

                  {/* Stat (appears on hover) */}
                  <AnimatePresence>
                    {hoveredIssue === issue.id && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="text-body text-center opacity-80"
                      >
                        {issue.stat}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* STAGE 3: Selected View with Provocation */}
        {stage === "selected" && (
          <div className="flex flex-col items-center justify-center space-y-8 max-w-3xl mx-auto">
            {/* Selected Icon */}
            <motion.div
              initial={{ scale: 1, y: 0 }}
              animate={{ scale: 1.2, y: -50 }}
              transition={{ duration: 0.6 }}
            >
              <IssueIcon
                type={issues.find((i) => i.id === selectedIssue)?.icon}
              />
            </motion.div>

            {/* Social Proof */}
            <AnimatePresence>
              {showSocialProof && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="text-body opacity-60"
                >
                  You and {issues.find((i) => i.id === selectedIssue)?.percentage}% of visitors started here.
                </motion.p>
              )}
            </AnimatePresence>

            {/* Reframe */}
            <AnimatePresence>
              {showReframe && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="text-h3 text-center"
                >
                  But here's the harder question...
                </motion.p>
              )}
            </AnimatePresence>

            {/* Provocation */}
            <AnimatePresence>
              {showProvocation && selectedIssue && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="text-body-lg text-center space-y-4 max-w-2xl"
                >
                  {Object.entries(issues.find((i) => i.id === selectedIssue)?.provocation || {}).map(
                    ([key, line]) =>
                      line && (
                        <p key={key} className={key === "line3" ? "h-4" : ""}>
                          {line}
                        </p>
                      )
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* How? */}
            <AnimatePresence>
              {showHow && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="text-h2 font-semibold"
                >
                  How?
                </motion.p>
              )}
            </AnimatePresence>

            {/* Learn More Button */}
            <AnimatePresence>
              {showLearnMore && (
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
                    opacity: { duration: 2, repeat: Infinity, ease: "easeInOut" },
                    textShadow: { duration: 2, repeat: Infinity, ease: "easeInOut" },
                  }}
                  onClick={handleLearnMore}
                  className="mt-8 text-caption hover:opacity-100 transition-opacity"
                >
                  + LEARN MORE
                </motion.button>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
};

export default Section2_Problem;
