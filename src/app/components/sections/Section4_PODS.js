"use client";

import { motion } from "framer-motion";

const Section4_PODS = ({ onOpenDrawer }) => {
  const drawerContent = (
    <div className="space-y-6">
      <p className="text-body-lg">
        Every year, NYSC deploys over 300,000 graduates for national service.
        Most spend 12 months underutilized — mismatched to roles, disconnected
        from impact.
      </p>
      <p className="text-body">
        PODS is our experiment to fix this. We're building a deployment layer
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
        If it works, PODS becomes Africa's largest talent-to-impact pipeline. If
        it doesn't, we'll learn why — and design something better.
      </p>

      <p className="text-body-lg font-semibold">Proof-of-concept launching 2025.</p>
    </div>
  );

  return (
    <div className="w-full h-full flex flex-col items-center justify-center px-8 bg-white text-black">
      <div className="max-w-4xl text-center space-y-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-display"
        >
          PODS
        </motion.h2>

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
          className="text-body-lg opacity-80 max-w-2xl mx-auto"
        >
          Redesigning how Nigeria deploys 300,000 graduates through national
          service.
        </motion.p>

        {/* Expand Button */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          onClick={() => onOpenDrawer(drawerContent)}
          className="mt-8 text-caption opacity-60 hover:opacity-100 transition-opacity"
        >
          + LEARN MORE
        </motion.button>
      </div>
    </div>
  );
};

export default Section4_PODS;
