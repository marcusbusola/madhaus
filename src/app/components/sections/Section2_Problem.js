"use client";

import { motion } from "framer-motion";

const Section2_Problem = ({ onOpenDrawer }) => {
  const drawerContent = (
    <div className="space-y-6">
      <p className="text-body-lg">
        Every week, millions of Africans consume news about the same recurring
        crises — traffic, flooding, power cuts, corruption. The coverage is
        reactive: what happened, who's affected, what officials say.
      </p>
      <p className="text-body">
        But the systems producing these outcomes remain invisible. Who benefits
        from the dysfunction? What policies sustain it? Where are the leverage
        points?
      </p>
      <p className="text-body">
        Without this understanding, public attention becomes a pressure valve —
        releasing frustration without creating change.
      </p>
      <p className="text-body-lg font-semibold">
        Madhaus exists to make systems legible. Because you can't fix what you
        can't see.
      </p>
    </div>
  );

  return (
    <div className="w-full h-full flex flex-col items-center justify-center px-8 bg-white text-black">
      <div className="max-w-4xl text-center space-y-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-h1"
        >
          The same satisfying headlines.
          <br />
          The same broken systems.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-body-lg opacity-80 max-w-2xl mx-auto"
        >
          African media treats symptoms. The infrastructure fails, the story
          runs, attention fades. Repeat.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-h3 font-semibold"
          style={{ fontFamily: "var(--font-cormorant)" }}
        >
          Nothing changes because nobody maps why.
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

export default Section2_Problem;
