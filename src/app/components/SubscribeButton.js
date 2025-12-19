"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const SubscribeButton = () => {
  const [isFlashing, setIsFlashing] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsFlashing((prev) => !prev);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full max-w-md mt-5">
      <div className="flex items-center rounded-full border border-[#EDE7DE] overflow-hidden">
        <input
          type="email"
          className="w-full bg-transparent py-2 px-8 text-[#EDE7DE] placeholder-[#EDE7DE] focus:outline-none text-sm"
          placeholder="Enter your email"
        />
        <motion.button
          className={`rounded-full ${
            isFlashing ? "bg-white" : "bg-[#EDE7DE]"
          } text-black py-0.5 px-4 text-sm mx-1 hover:bg-gray-300 transition-colors duration-300`}
          animate={{
            backgroundColor: isFlashing
              ? ["#EDE7DE", "#FFFFFF", "#EDE7DE"]
              : "#EDE7DE",
            scale: isFlashing ? [1, 1.05, 1] : 1,
          }}
          transition={{
            duration: 1,
            ease: "easeInOut",
          }}
        >
          Subscribe
        </motion.button>
      </div>
    </div>
  );
};

export default SubscribeButton;
