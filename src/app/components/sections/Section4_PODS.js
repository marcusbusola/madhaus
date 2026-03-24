"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const Section4_PODS = ({ onOpenDrawer, onNavigate }) => {

  const drawerContent = (
    <div className="space-y-6">
      <div className="w-full">
        <div className="w-full aspect-video rounded-2xl overflow-hidden bg-black">
          <iframe
            className="w-full h-full"
            src="https://www.youtube.com/embed/424cdlcWfKo?autoplay=1&mute=1&rel=0"
            title="PODS Video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
      </div>
      <p className="text-body-lg">
        Every year, NYSC deploys over 300,000 graduates for national service.
        mismatched to roles, disconnected
        from impact.
      </p>
      <p className="text-body">
        PODS is our experiment to fix this.         We&apos;re building a deployment layer
        that matches corps members to high-impact projects in their communities.
      </p>

      <div className="space-y-4">
        <h4 className="text-h3 font-semibold">WHY START HERE?</h4>
        <ul className="text-body space-y-2">
          <li>— Built on existing NYSC infrastructure</li>
          <li>— Solves a problem everyone feels</li>
          <li>— Delivers value immediately to youth, communities, and partners</li>
          <li>— Proves the Madhaus method in a live environment</li>
        </ul>
      </div>

      <p className="text-body">
        If it works, PODS becomes Africa&apos;s largest talent-to-impact pipeline. If
        it doesn&apos;t, we&apos;ll learn why — and design something better.
      </p>

    </div>
  );

  return (
    <div className="w-full h-full flex flex-col items-center justify-center px-8 bg-white text-black relative">
      {/* Section Indicator */}
      <div className="absolute top-8 right-8 text-caption opacity-40 text-black">
        04 / 05
      </div>

      <div className="max-w-4xl text-center space-y-8">
        {/* PODS Logo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="flex justify-center"
        >
          <Image
            src="/podlogo.svg"
            alt="PODS Logo"
            width={200}
            height={80}
            className="w-48 md:w-56 h-auto"
          />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-h3 font-light"
          style={{ fontFamily: "var(--font-manrope)" }}
        >
          Our first experiment.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-body-lg max-w-2xl mx-auto"
        >
          <button 
            onClick={() => onOpenDrawer(drawerContent)}
            className="text-black font-bold underline decoration-1 underline-offset-4 hover:opacity-70 transition-opacity cursor-pointer inline-block"
          >
            Redesigning
          </button>
          <span className="opacity-80">
            {" "}how Nigeria deploys 300,000 graduates through national
            service.
          </span>
        </motion.p>

        {/* Learn More Button */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0.6, 1, 0.6],
            textShadow: [
              "0 0 0px rgba(0, 0, 0, 0)",
              "0 0 10px rgba(0, 0, 0, 0.2)",
              "0 0 0px rgba(0, 0, 0, 0)",
            ],
          }}
          transition={{
            opacity: { duration: 2, repeat: Infinity, ease: "easeInOut", delay: 1 },
            textShadow: { duration: 2, repeat: Infinity, ease: "easeInOut", delay: 1 },
          }}
          onClick={() => {
            if (onNavigate) {
              onNavigate(5); // Navigate to Section 5 (Opportunity)
            }
          }}
          className="mt-12 text-caption hover:opacity-100 transition-opacity cursor-pointer text-black"
        >
          + Learn more
        </motion.button>
      </div>
    </div>
  );
};

export default Section4_PODS;
