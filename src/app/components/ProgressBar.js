"use client";

const ProgressBar = ({ progress, isPaused, currentSection }) => {
  // Don't show progress bar on Section 0 (title) or Section 6 (end)
  if (currentSection === 0 || currentSection === 6) {
    return null;
  }

  // Static progress based on section position (0-5 visible sections)
  const sectionProgress = (currentSection / 5) * 100;

  return (
    <div
      className="fixed top-0 left-0 w-full h-[2px] bg-white/10 z-50"
      style={{ pointerEvents: "none" }}
    >
      <div
        className="h-full bg-white transition-all duration-500 ease-out"
        style={{ width: `${sectionProgress}%` }}
      />
    </div>
  );
};

export default ProgressBar;
