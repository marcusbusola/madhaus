/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useCallback, useRef, useState, useEffect } from "react";

const SOUND_FILES = [
  "/sounds/keyboard-click-1.mp3",
  "/sounds/keyboard-click-2.mp3",
  "/sounds/keyboard-click-3.mp3",
  "/sounds/keyboard-click-4.mp3",
];

/**
 * Custom hook for managing typewriter sound effects
 * Preloads multiple sound variations and plays them randomly
 * Respects user preferences and browser autoplay policies
 *
 * @returns {Object} Sound control object
 * @returns {Function} playSound - Function to play a random keyboard sound
 * @returns {boolean} soundEnabled - Whether sound is currently enabled
 * @returns {Function} toggleSound - Function to toggle sound on/off
 */
export const useTypewriterSound = () => {
  const audioRefs = useRef([]);
  const [soundEnabled, setSoundEnabled] = useState(false); // Start disabled to respect autoplay
  const [isReady, setIsReady] = useState(false);

  // Preload sounds on mount
  useEffect(() => {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      setSoundEnabled(false);
      setIsReady(true);
      return;
    }

    // Try to load saved preference from localStorage
    try {
      const savedPreference = localStorage.getItem("typewriterSoundEnabled");
      if (savedPreference !== null) {
        setSoundEnabled(savedPreference === "true");
      }
    } catch (error) {
      console.debug("Could not access localStorage:", error);
    }

    // Preload all sound files
    const loadSounds = async () => {
      try {
        audioRefs.current = SOUND_FILES.map((src) => {
          const audio = new Audio(src);
          audio.preload = "auto";
          audio.volume = 0.3; // 30% volume for subtlety
          return audio;
        });
        setIsReady(true);
      } catch (error) {
        console.debug("Could not preload sounds:", error);
        setIsReady(false);
      }
    };

    loadSounds();
  }, []);

  /**
   * Play a random keyboard click sound
   * Clones the audio element to allow overlapping sounds
   */
  const playSound = useCallback(() => {
    if (!soundEnabled || !isReady || audioRefs.current.length === 0) {
      return;
    }

    try {
      // Random sound selection for variety
      const randomIndex = Math.floor(Math.random() * audioRefs.current.length);
      const audio = audioRefs.current[randomIndex];

      // Clone and play to allow overlapping sounds
      const soundClone = audio.cloneNode();
      soundClone.volume = 0.3;

      // Play sound with error handling for autoplay restrictions
      soundClone.play().catch((err) => {
        // Silently fail if autoplay is blocked by browser
        console.debug("Sound playback prevented:", err);
      });
    } catch (error) {
      console.debug("Error playing sound:", error);
    }
  }, [soundEnabled, isReady]);

  /**
   * Toggle sound on/off and persist to localStorage
   */
  const toggleSound = useCallback(() => {
    setSoundEnabled((prev) => {
      const newValue = !prev;
      // Save preference to localStorage
      try {
        localStorage.setItem("typewriterSoundEnabled", String(newValue));
      } catch (error) {
        console.debug("Could not save sound preference:", error);
      }
      return newValue;
    });
  }, []);

  return {
    playSound,
    soundEnabled,
    toggleSound,
    isReady,
  };
};
