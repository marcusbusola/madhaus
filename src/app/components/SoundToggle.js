"use client";

import { motion } from "framer-motion";
import { useTypewriterSound } from "../hooks/useTypewriterSound";
import { FaVolumeUp, FaVolumeMute } from "react-icons/fa";

/**
 * Sound Toggle Button Component
 * Allows users to enable/disable typewriter sound effects
 */
const SoundToggle = () => {
  const { soundEnabled, toggleSound, isReady } = useTypewriterSound();

  if (!isReady) return null; // Don't show until sounds are loaded

  return (
    <motion.button
      onClick={toggleSound}
      className="fixed top-6 right-6 z-50 bg-[#EDE7DE] text-black rounded-full w-12 h-12 flex items-center justify-center shadow-lg hover:bg-gray-200 transition-all duration-300"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1, duration: 0.5 }}
      aria-label={soundEnabled ? "Mute sounds" : "Enable sounds"}
    >
      {soundEnabled ? (
        <FaVolumeUp size={20} />
      ) : (
        <FaVolumeMute size={20} />
      )}
    </motion.button>
  );
};

export default SoundToggle;
