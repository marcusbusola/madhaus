"use client";

const ProgressBar = ({ progress, isPaused, currentSection }) => {
  // Don't show progress bar on Section 0 (title) or Section 6 (end)
  if (currentSection === 0 || currentSection === 6) {
    return null;
  }

  // Static progress based on section position (0-5 visible sections)
  const sectionProgress = (currentSection / 5) * 100;

  // Use black progress bar on Section 4 (PODS - white background)
  const isWhiteSection = currentSection === 4;

  return (
    <div
      className={`fixed top-0 left-0 w-full h-[2px] z-50 ${
        isWhiteSection ? "bg-black/10" : "bg-white/10"
      }`}
      style={{ pointerEvents: "none" }}
    >
      <div
        className={`h-full transition-all duration-500 ease-out ${
          isWhiteSection ? "bg-black" : "bg-white"
        }`}
        style={{ width: `${sectionProgress}%` }}
      />
    </div>
  );
};

export default ProgressBar;
