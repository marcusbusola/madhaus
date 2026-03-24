"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FocusTrap from "focus-trap-react";

const ExpandDrawer = ({ isOpen, onClose, content }) => {
  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  const backdropVariants = {
    closed: { opacity: 0 },
    open: { opacity: 1 },
  };

  const drawerVariants = {
    closed: {
      opacity: 1,
      y: "100%",
      transition: {
        duration: 0.35,
        ease: [0.43, 0.13, 0.23, 0.96],
      },
    },
    open: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.45,
        ease: [0.43, 0.13, 0.23, 0.96],
      },
    },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            variants={backdropVariants}
            initial="closed"
            animate="open"
            exit="closed"
            onClick={onClose}
            className="fixed inset-0 bg-black/90 z-[100] cursor-pointer"
          />

          {/* Full-height drawer rising from the bottom */}
          <motion.div
            variants={drawerVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="drawer-content fixed inset-x-0 bottom-0 z-[101] flex items-end justify-center"
            role="dialog"
            aria-modal="true"
          >
            <FocusTrap
              active={isOpen}
              focusTrapOptions={{
                clickOutsideDeactivates: true,
                onDeactivate: onClose,
              }}
            >
              <div className="bg-white text-black w-full h-[90vh] max-w-5xl overflow-y-auto rounded-t-2xl shadow-2xl relative">
                {/* Close Button */}
                <button
                  onClick={onClose}
                  className="sticky top-6 right-6 ml-auto mr-6 w-10 h-10 flex items-center justify-center rounded-full bg-black/5 hover:bg-black/10 transition-colors z-10"
                  aria-label="Close modal"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>

                {/* Content */}
                <div className="px-8 md:px-16 pb-12 max-w-4xl mx-auto">
                  {content}
                </div>
              </div>
            </FocusTrap>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ExpandDrawer;
