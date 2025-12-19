"use client";

import { useState, useEffect, useRef } from 'react';

/**
 * Custom hook to pause infinite animations when off-screen
 * Uses Intersection Observer API for efficient visibility detection
 *
 * @param {number} threshold - Intersection ratio threshold (0-1) for triggering visibility
 * @returns {Object} - { isVisible: boolean, elementRef: RefObject }
 *
 * @example
 * const { isVisible, elementRef } = useInfiniteAnimation(0.2);
 *
 * return (
 *   <div ref={elementRef}>
 *     <motion.div animate={isVisible ? { x: [0, 100] } : { x: 0 }} />
 *   </div>
 * );
 */
export const useInfiniteAnimation = (threshold = 0.2) => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        threshold,
        rootMargin: '50px' // Start animation slightly before element enters viewport
      }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [threshold]);

  return { isVisible, elementRef };
};
