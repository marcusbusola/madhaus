"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";

// Icon components
const IssueIcon = ({ type, className = "", drawDelay = 0, animateDraw = true }) => {
  const iconProps = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    className: `w-16 h-16 ${className}`,
  };

  const drawProps = animateDraw
    ? {
        initial: { pathLength: 0, opacity: 0 },
        animate: { pathLength: 1, opacity: 1 },
        transition: {
          pathLength: { duration: 3, ease: "easeInOut", delay: drawDelay },
          opacity: { duration: 0.5, delay: drawDelay },
        },
      }
    : {
        initial: false,
        animate: { pathLength: 1, opacity: 1 },
      };

  const icons = {
    shield: (
      <svg {...iconProps}>
          <motion.path
            d="M12 3 C15 4.2 18.2 5.4 21 6.7 C21.2 9 21 11 21 13.2 C21 17.8 16.4 21.4 12 23.1 C7.6 21.4 3 17.8 3 13.1 C3 11 2.8 8.8 3.1 6.7 C6 5.4 9 4.1 12 3 Z"
            stroke="currentColor"
            {...drawProps}
          />
        </svg>
      ),
      coin: (
        <svg {...iconProps}>
          <motion.circle
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            {...drawProps}
          />
          <motion.path
            d="M3 12.2 C7.5 11.8 16.5 12.6 21 12.1"
            stroke="currentColor"
            {...drawProps}
          />
        </svg>
      ),
      heart: (
        <svg {...iconProps}>
          <motion.path
            d="M12 20.5 C11 20 6.5 16 4.5 12.5 C3.2 10.3 4.5 6.8 7.4 6.1 C9.4 5.6 11.4 6.6 12 8.3 C12.6 6.6 14.6 5.6 16.6 6.1 C19.5 6.8 20.8 10.3 19.5 12.5 C17.5 16 13 20 12 20.5 Z"
            stroke="currentColor"
            {...drawProps}
          />
        </svg>
      ),
      briefcase: (
        <svg {...iconProps}>
          <motion.path
            d="M4 8.2 C4.2 7.4 5 6.8 6 6.9 L18 7 C19.2 7.1 20 7.8 20 8.8 L20 18.2 C20 19.3 19.2 20.1 18.1 20.1 L6 20 C4.8 20 4.1 19.3 4 18.2 Z"
            stroke="currentColor"
            {...drawProps}
          />
          <motion.path
            d="M9 7.1 C9 5.4 9.6 4.8 10.8 4.8 L13.2 4.8 C14.4 4.8 15 5.4 15 7.1"
            stroke="currentColor"
            {...drawProps}
          />
        </svg>
      ),
      house: (
        <svg {...iconProps}>
          <motion.path
            d="M3.5 12.2 C6.5 9 9 6.4 12 4.2 C15 6.4 17.5 9 20.5 12.2"
            stroke="currentColor"
            {...drawProps}
          />
          <motion.path
            d="M6 12.2 C5.5 15.5 5.8 18 6 20 C10 20.4 14 20.4 18 20 C18.3 18 18.5 15.5 18 12.2"
            stroke="currentColor"
            {...drawProps}
          />
        </svg>
      ),
      bolt: (
        <svg {...iconProps}>
          <motion.path
            d="M13.2 2.5 C10.5 6 8.2 8.8 5 12.8 C7.8 12.6 9.8 12.7 12 12.6 C11 15.7 10.6 18.2 10 21.5 C13.5 17.5 16.2 14.5 19.5 10.5 C17 10.6 15 10.6 12.8 10.7 Z"
            stroke="currentColor"
            {...drawProps}
          />
        </svg>
      ),
      book: (
        <svg {...iconProps}>
          <motion.path
            d="M2.5 4.5 C5.5 4 9 5.2 12 6.6 C15 5.2 18.5 4 21.5 4.5 C21.8 8.5 21.6 12.5 21.4 19.5 C18.2 19.2 15.2 20.2 12 21.5 C8.8 20.2 5.8 19.2 2.6 19.5 C2.4 12.5 2.2 8.5 2.5 4.5"
            stroke="currentColor"
            {...drawProps}
          />
          <motion.path
            d="M12 6.6 C12.1 10.5 12 14.5 12 21.5"
            stroke="currentColor"
            {...drawProps}
          />
        </svg>
      ),
      road: (
        <svg {...iconProps}>
          <motion.path
            d="M8.5 21.5 C9.5 15 10.2 8.5 11.2 2.5 M15.5 21.5 C14.5 15 13.8 8.5 12.8 2.5 M12 9.5 C12.1 10.3 11.9 11 12 11.8 M12 14.5 C12.1 15.3 11.9 16 12 16.8 M12 19.3 C12.1 20.1 11.9 20.8 12 21.6"
            stroke="currentColor"
            {...drawProps}
          />
        </svg>
      ),
  };

  return icons[type] || null;
};

const Section1_Problem = ({ onOpenDrawer, onNavigate, onCloseDrawer, currentSection }) => {
  const [stage, setStage] = useState("grid"); // grid, selected, drawer
  const [hoveredIssue, setHoveredIssue] = useState(null);
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [showSocialProof, setShowSocialProof] = useState(false);
  const [showReframe, setShowReframe] = useState(false);
  const [showHow, setShowHow] = useState(false);
  const [showLearnMore, setShowLearnMore] = useState(false);
  const [hasOpenedDrawer, setHasOpenedDrawer] = useState(false);
  const [isCollapsing, setIsCollapsing] = useState(false);
  const selectionTimersRef = useRef([]);
  const autoAdvanceTimerRef = useRef(null);

  // Memoize percentages so they don't change on re-render
  const [stablePercentages] = useState(() => ({
    security: Math.floor(Math.random() * (35 - 18 + 1)) + 18,
    poverty: Math.floor(Math.random() * (35 - 18 + 1)) + 18,
    health: Math.floor(Math.random() * (35 - 18 + 1)) + 18,
    employment: Math.floor(Math.random() * (35 - 18 + 1)) + 18,
    housing: Math.floor(Math.random() * (35 - 18 + 1)) + 18,
    energy: Math.floor(Math.random() * (35 - 18 + 1)) + 18,
    education: Math.floor(Math.random() * (35 - 18 + 1)) + 18,
    transportation: Math.floor(Math.random() * (35 - 18 + 1)) + 18,
  }));

  const issues = [
    {
      id: "security",
      label: "Security",
      icon: "shield",
      stat: "Over 40% report feeling unsafe in daily life.",
      percentage: stablePercentages.security,
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
              Security isn&apos;t just a policing problem. It&apos;s a systems problem — shaped by urban design, economic opportunity, historical neglect, and who gets to feel protected.
            </p>
            <p className="text-body">
              We have plenty of opinions on crime. Fewer spaces to understand why it concentrates where it does, or to design interventions that address root causes instead of symptoms.
            </p>
            <p className="text-body font-semibold">
              Madhaus exists to be that space.
            </p>
            <p className="text-body">
              A living room for the questions no one&apos;s asking — and the ideas that might actually change something.
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
      percentage: stablePercentages.poverty,
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
              Poverty isn&apos;t a lack of resources. It&apos;s a system that allocates resources unevenly — through land policy, credit access, taxation, and who gets to accumulate wealth.
            </p>
            <p className="text-body">
              We&apos;re not short on sympathy for the poor. We&apos;re short on understanding of the mechanisms that keep people poor.
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
      percentage: stablePercentages.health,
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
              Health isn&apos;t made in hospitals. It&apos;s made in homes, neighborhoods, and policy rooms — by decisions about water, sanitation, food, and whether your community is seen as worth investing in.
            </p>
            <p className="text-body">
              We have health ministries. We don&apos;t have enough people asking why the system keeps producing the same outcomes.
            </p>
            <p className="text-body font-semibold">
              That&apos;s the work. Madhaus is the room where that work can happen.
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
      percentage: stablePercentages.employment,
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
              The future of work in Africa won&apos;t look like the past — and that&apos;s not necessarily bad. But we&apos;re not designing for what&apos;s coming.
            </p>
            <p className="text-body">
              We have job programs. We don&apos;t have enough spaces to reimagine what work could look like in economies where the old playbook doesn&apos;t apply.
            </p>
            <p className="text-body font-semibold">
              Madhaus is that space. A room for ideas that don&apos;t fit the template.
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
      percentage: stablePercentages.housing,
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
              The housing crisis isn&apos;t a shortage of buildings. It&apos;s a system where land is speculation, finance excludes most people, and policy serves developers over residents.
            </p>
            <p className="text-body">
              We have housing ministries. We don&apos;t have enough young people asking why the system keeps failing — or designing alternatives.
            </p>
            <p className="text-body font-semibold">
              That&apos;s why Madhaus exists. A living room for the ideas that could actually change how we build.
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
      percentage: stablePercentages.energy,
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
              Electricity isn&apos;t just power — it&apos;s possibility. Education, healthcare, business, safety — all depend on it. And the current system decides who gets access.
            </p>
            <p className="text-body">
              We talk about renewable transitions. We don&apos;t talk enough about energy justice — who&apos;s included in the future we&apos;re building.
            </p>
            <p className="text-body font-semibold">
              Madhaus is where those conversations can happen. A space for bold ideas about who the grid should serve.
            </p>
          </div>
        ),
      },
    },
    {
      id: "education",
      label: "Education",
      icon: "book",
      stat: "Over 20 million children are out of school. Millions more learn almost nothing.",
      percentage: stablePercentages.education,
      provocation: {
        line1: "Education conversations focus on access —",
        line2: "more schools, more enrollment, more seats.",
        line3: "",
        line4: "Fewer ask what's actually being taught,",
        line5: "why graduates can't find work,",
        line6: "or whether the system prepares anyone for the world that exists.",
      },
      drawer: {
        content: (
          <div className="space-y-6">
            <p className="text-body-lg">
              Education isn't just about classrooms. It's a system — shaped by curriculum politics, teacher economics, colonial inheritance, and what society decides is worth knowing.
            </p>
            <p className="text-body">
              We have enrollment targets. We don't have enough people asking what education is actually for, or why the current model keeps producing the same outcomes.
            </p>
            <p className="text-body font-semibold">
              Madhaus exists to ask those questions. A space where we can reimagine what learning could look like — not just more of what isn't working.
            </p>
          </div>
        ),
      },
    },
    {
      id: "transportation",
      label: "Transportation",
      icon: "road",
      stat: "The average Lagos commuter spends 4+ hours in traffic daily.",
      percentage: stablePercentages.transportation,
      provocation: {
        line1: "Transportation debates are about roads and vehicles —",
        line2: "more lanes, more buses, more infrastructure.",
        line3: "",
        line4: "Fewer ask why cities are designed this way,",
        line5: "who benefits from the current layout,",
        line6: "or why public systems keep losing to private alternatives.",
      },
      drawer: {
        content: (
          <div className="space-y-6">
            <p className="text-body-lg">
              Transportation isn't a traffic problem. It's an urban design problem — shaped by where housing is built, where jobs are located, who owns land, and decades of decisions that prioritized cars over people.
            </p>
            <p className="text-body">
              We have road projects. We don't have enough spaces to ask why the city moves the way it does, or to imagine alternatives that don't require everyone to own a vehicle.
            </p>
            <p className="text-body font-semibold">
              Madhaus is that space. Where we can think about mobility as a system — and design for cities that actually work for the people living in them.
            </p>
          </div>
        ),
      },
    },
  ];

  const clearSelectionTimers = () => {
    selectionTimersRef.current.forEach((timerId) => clearTimeout(timerId));
    selectionTimersRef.current = [];
  };

  const clearAutoAdvanceTimer = () => {
    if (autoAdvanceTimerRef.current) {
      clearTimeout(autoAdvanceTimerRef.current);
      autoAdvanceTimerRef.current = null;
    }
  };

  // Handle selection with staged reveals
  const handleSelect = (issue) => {
    clearSelectionTimers();
    clearAutoAdvanceTimer();
    setHasOpenedDrawer(false);
    setHoveredIssue(null);
    setIsCollapsing(true);
    setShowSocialProof(false);
    setShowReframe(false);
    setShowHow(false);
    setShowLearnMore(false);
    setSelectedIssue(issue);
    setStage("selected");

    // Staged reveals
    selectionTimersRef.current.push(setTimeout(() => setIsCollapsing(false), 600));
    selectionTimersRef.current.push(setTimeout(() => setShowSocialProof(true), 1100));
    selectionTimersRef.current.push(setTimeout(() => setShowReframe(true), 2600));
    selectionTimersRef.current.push(setTimeout(() => setShowHow(true), 3600));
    selectionTimersRef.current.push(setTimeout(() => setShowLearnMore(true), 4200));
  };

  const handleLearnMore = () => {
    const selectedData = issues.find((i) => i.id === selectedIssue);
    if (selectedData) {
      setHasOpenedDrawer(true);
      clearAutoAdvanceTimer();
      const handleContinue = () => {
        if (onCloseDrawer) {
          onCloseDrawer();
        }
        if (onNavigate) {
          onNavigate(currentSection + 1);
        }
      };
      const drawerContent = (
        <div className="space-y-6">
          {selectedData.drawer.content}
          <div className="pt-6 border-t border-black/10 space-y-4">
            <p className="text-body opacity-60">
              This is one of many questions we&apos;re exploring.
            </p>
            <button
              onClick={handleContinue}
              className="text-caption hover:opacity-70 transition-opacity"
            >
              Continue →
            </button>
          </div>
        </div>
      );
      onOpenDrawer(drawerContent);
    }
  };

  useEffect(() => {
    if (!showLearnMore || stage !== "selected" || hasOpenedDrawer) {
      clearAutoAdvanceTimer();
      return;
    }
    if (!autoAdvanceTimerRef.current) {
      autoAdvanceTimerRef.current = setTimeout(() => {
        if (onNavigate) {
          onNavigate(currentSection + 1);
        }
      }, 6000);
    }
    return clearAutoAdvanceTimer;
  }, [showLearnMore, stage, hasOpenedDrawer, onNavigate, currentSection]);

  useEffect(() => () => {
    clearSelectionTimers();
    clearAutoAdvanceTimer();
  }, []);

  // Development logging to verify state updates
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      console.log('Section1 State:', { stage, selectedIssue, showLearnMore, showSocialProof, showReframe, showHow });
    }
  }, [stage, selectedIssue, showLearnMore, showSocialProof, showReframe, showHow]);

  const showGrid = stage === "grid" || isCollapsing;

  return (
    <div className="w-full h-full flex flex-col items-center justify-center px-8 bg-black text-white relative">
      {/* Section Indicator */}
      <div className="absolute top-8 right-8 text-caption opacity-40">
        02 / 06
      </div>

      <LayoutGroup>
        <div className="max-w-6xl w-full">
          {/* STAGE 1 & 2: Grid View */}
          <AnimatePresence>
            {showGrid && (
              <motion.div
                key="grid"
                className="space-y-12"
              >
                {/* Headline */}
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="text-h2 text-center"
                >
                  Where would you start?
                </motion.h2>

                {/* Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                  {issues.map((issue, index) => {
                    const isHovered = hoveredIssue === issue.id;
                    const isDimmed = hoveredIssue && hoveredIssue !== issue.id;
                    const isSelected = selectedIssue === issue.id;
                    const isFadingOut = stage === "selected" && !isSelected;
                    const shouldPulse = stage === "grid" && isHovered;
                    return (
                      <motion.div
                        key={issue.id}
                        initial={{ opacity: 0 }}
                        animate={{
                          opacity: isFadingOut ? 0 : isDimmed ? 0.4 : 1,
                          scale: isFadingOut ? 0.95 : 1,
                        }}
                        transition={{ duration: 0.3 }}
                        onMouseEnter={() => setHoveredIssue(issue.id)}
                        onMouseLeave={() => setHoveredIssue(null)}
                        onClick={() => handleSelect(issue.id)}
                        role="button"
                        tabIndex={0}
                        aria-label={`Select ${issue.label} issue`}
                        onKeyPress={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            handleSelect(issue.id);
                          }
                        }}
                        className="flex flex-col items-center justify-center p-6 cursor-pointer group relative z-10"
                      >
                        {/* Icon */}
                        <motion.div
                          layoutId={`issue-icon-${issue.id}`}
                          className="relative flex items-center justify-center overflow-visible"
                          animate={
                            shouldPulse || isSelected
                              ? { scale: [1, 1.05, 1], opacity: 1 }
                              : { scale: 1, opacity: 0.9 }
                          }
                          transition={
                            shouldPulse || isSelected
                              ? { duration: 2.8, repeat: Infinity, ease: "easeInOut" }
                              : { duration: 0.2 }
                          }
                        >
                          <motion.span
                            className="absolute inset-0 z-0 rounded-full pointer-events-none"
                            style={{
                              background:
                                "radial-gradient(circle, rgba(255, 255, 255, 0.55) 0%, rgba(255, 255, 255, 0) 75%)",
                              filter: "blur(16px)",
                            }}
                            animate={
                              shouldPulse || isSelected
                                ? { opacity: [0.25, 0.85, 0.25], scale: [1, 1.45, 1] }
                                : { opacity: 0, scale: 1 }
                            }
                            transition={
                              shouldPulse || isSelected
                                ? { duration: 3.6, repeat: Infinity, ease: "easeInOut" }
                                : { duration: 0.2 }
                            }
                          />
                          <span className="relative z-10">
                            <IssueIcon
                              type={issue.icon}
                              drawDelay={index * 0.1}
                              animateDraw={stage === "grid"}
                            />
                          </span>
                        </motion.div>

                        {/* Label */}
                        <h3 className="text-body-lg font-semibold mt-4 mb-2 text-white">{issue.label}</h3>

                        {/* Stat (appears on hover) */}
                        <AnimatePresence>
                          {isHovered && (
                            <motion.p
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.3 }}
                              className="text-body text-center opacity-80 text-white"
                            >
                              {issue.stat}
                            </motion.p>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* STAGE 3: Selected View with Provocation */}
          <AnimatePresence>
            {stage === "selected" && !showGrid && (
              <motion.div
                key="selected"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
                className="flex flex-col items-center justify-center space-y-8 max-w-3xl mx-auto"
              >
                {/* Selected Icon */}
                {selectedIssue && (
                  <motion.div
                    layoutId={`issue-icon-${selectedIssue}`}
                    className="relative flex items-center justify-center overflow-visible"
                    animate={{ opacity: 1 }}
                  >
                    <motion.span
                      className="absolute inset-0 z-0 rounded-full pointer-events-none"
                      style={{
                        background:
                          "radial-gradient(circle, rgba(255, 255, 255, 0.55) 0%, rgba(255, 255, 255, 0) 75%)",
                        filter: "blur(16px)",
                      }}
                      animate={{ opacity: [0.25, 0.85, 0.25], scale: [1, 1.45, 1] }}
                      transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut" }}
                    />
                    <span className="relative z-10">
                      <IssueIcon
                        type={issues.find((i) => i.id === selectedIssue)?.icon}
                        animateDraw={false}
                      />
                    </span>
                  </motion.div>
                )}

                <div className="flex flex-col items-center space-y-6 min-h-[200px]">
                  {/* Social Proof */}
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: showSocialProof ? 1 : 0, y: showSocialProof ? 0 : 10 }}
                    transition={{ duration: 0.5 }}
                    className="text-body opacity-60 text-white"
                    aria-hidden={!showSocialProof}
                  >
                    You chose {issues.find((i) => i.id === selectedIssue)?.label}. So did {issues.find((i) => i.id === selectedIssue)?.percentage}% of people.
                  </motion.p>

                  {/* Reframe */}
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: showReframe ? 1 : 0, y: showReframe ? 0 : 10 }}
                    transition={{ duration: 0.5 }}
                    className="text-h3 text-center"
                    aria-hidden={!showReframe}
                  >
                    But the harder question is...
                  </motion.p>

                  {/* How? */}
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: showHow ? 1 : 0, y: showHow ? 0 : 10 }}
                    transition={{ duration: 0.5 }}
                    className="text-h2 font-semibold"
                    aria-hidden={!showHow}
                  >
                    How?
                  </motion.p>

                  {/* Learn More Button */}
                  <motion.button
                    initial={{ opacity: 0 }}
                    animate={
                      showLearnMore
                        ? {
                            opacity: [0.7, 1, 0.7],
                            textShadow: [
                              "0 0 0px rgba(255, 255, 255, 0)",
                              "0 0 12px rgba(255, 255, 255, 0.9)",
                              "0 0 0px rgba(255, 255, 255, 0)",
                            ],
                            filter: [
                              "drop-shadow(0 0 0px rgba(255, 255, 255, 0))",
                              "drop-shadow(0 0 16px rgba(255, 255, 255, 0.7))",
                              "drop-shadow(0 0 0px rgba(255, 255, 255, 0))",
                            ],
                          }
                        : { opacity: 0 }
                    }
                    transition={{
                      opacity: { duration: 2.4, repeat: showLearnMore ? Infinity : 0, ease: "easeInOut" },
                      textShadow: { duration: 2.4, repeat: showLearnMore ? Infinity : 0, ease: "easeInOut" },
                      filter: { duration: 2.4, repeat: showLearnMore ? Infinity : 0, ease: "easeInOut" },
                    }}
                    onClick={handleLearnMore}
                    className="mt-2 text-caption hover:opacity-100 transition-opacity cursor-pointer relative z-10"
                    style={{ pointerEvents: showLearnMore ? "auto" : "none" }}
                    aria-hidden={!showLearnMore}
                  >
                    + LEARN MORE
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </LayoutGroup>
    </div>
  );
};

export default Section1_Problem;
