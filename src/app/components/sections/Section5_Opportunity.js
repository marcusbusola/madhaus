"use client";

import { motion } from "framer-motion";

const Section5_Opportunity = ({ onOpenDrawer }) => {
  const drawerContent = (
    <div className="space-y-6">
      <div>
        <h4 className="text-h3 font-semibold mb-3">AFRICA'S YOUTH EXPLOSION</h4>
        <p className="text-body">
          The continent's median age is 19. By 2050, Africa will have the
          world's largest workforce. But current institutions — education,
          healthcare, governance, infrastructure — are already failing at
          current scale.
        </p>
      </div>

      <div>
        <h4 className="text-h3 font-semibold mb-3">THE MEDIA GAP</h4>
        <p className="text-body">
          African media is 90% reactive news cycles, 10% solutions. There's no
          African equivalent of Vox, Bloomberg, or IDEO — institutions that
          translate complexity into understanding and action.
        </p>
      </div>

      <div>
        <h4 className="text-h3 font-semibold mb-3">THE TALENT SURPLUS</h4>
        <p className="text-body">
          Africa doesn't lack ideas or builders. It lacks infrastructure to
          connect talent to problems worth solving, and content that equips
          citizens to understand the systems shaping their lives.
        </p>
      </div>

      <p className="text-body-lg font-semibold mt-8">
        Madhaus is building that infrastructure.
      </p>
    </div>
  );

  return (
    <div className="w-full h-full flex flex-col items-center justify-center px-8 bg-black text-white">
      <div className="max-w-4xl text-center space-y-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-h1"
        >
          Why now.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-h3 font-light max-w-3xl mx-auto"
          style={{ fontFamily: "var(--font-manrope)" }}
        >
          By 2050, 1 in 4 humans will be African.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-body-lg opacity-80 max-w-2xl mx-auto"
        >
          The systems built for 50 million won't hold 500 million.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-h3 font-semibold"
          style={{ fontFamily: "var(--font-montserrat)" }}
        >
          This is the decade to design what comes next.
        </motion.p>

        {/* Expand Button */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
          onClick={() => onOpenDrawer(drawerContent)}
          className="mt-8 text-caption opacity-60 hover:opacity-100 transition-opacity"
        >
          + LEARN MORE
        </motion.button>
      </div>
    </div>
  );
};

export default Section5_Opportunity;
