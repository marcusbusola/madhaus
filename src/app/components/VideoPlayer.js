"use client";
import { motion } from "framer-motion";
import { useState } from "react";

const VideoPlayer = ({ src, poster, className = "" }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`relative w-full ${className}`}
    >
      {/* 16:9 Aspect Ratio Container */}
      <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
        {/* Loading State */}
        {isLoading && (
          <div className="absolute inset-0 bg-gray-100 rounded-lg flex items-center justify-center">
            <div className="text-body text-gray-400">Loading video...</div>
          </div>
        )}

        {/* Error State */}
        {hasError && (
          <div className="absolute inset-0 bg-gray-50 rounded-lg flex items-center justify-center p-6 text-center">
            <div>
              <p className="text-body text-gray-600 mb-2">Video unavailable</p>
              <p className="text-body-sm text-gray-400">Please try again later</p>
            </div>
          </div>
        )}

        {/* Video Element */}
        {!hasError && (
          <video
            className="absolute top-0 left-0 w-full h-full rounded-lg border border-gray-200"
            controls
            controlsList="nodownload"
            preload="metadata"
            poster={poster}
            onLoadedMetadata={() => setIsLoading(false)}
            onError={() => {
              setIsLoading(false);
              setHasError(true);
            }}
            aria-label="PODS introduction video"
          >
            <source src={src} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        )}
      </div>
    </motion.div>
  );
};

export default VideoPlayer;
