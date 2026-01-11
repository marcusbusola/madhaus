"use client";

const ProgressIndicator = ({ currentSection, onNavigate }) => {
  // Don't show on Section 0 (title card) or Section 6 (contact - hidden section)
  if (currentSection === 0 || currentSection === 6) {
    return null;
  }

  // Format counter: "01/05" through "05/05"
  const formattedCurrent = String(currentSection).padStart(2, "0");

  return (
    <div className="fixed right-8 top-1/2 -translate-y-1/2 z-50 flex flex-col items-center gap-6">
      {/* Counter */}
      <div className="text-white text-caption opacity-60">
        {formattedCurrent} / 05
      </div>

      {/* Dots navigation - only show sections 0-5, hide section 6 */}
      <div className="flex flex-col gap-3">
        {[0, 1, 2, 3, 4, 5].map((index) => (
          <button
            key={index}
            onClick={() => onNavigate(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/60 focus:ring-offset-2 focus:ring-offset-black ${
              currentSection === index
                ? "bg-white scale-125"
                : "bg-white/30 hover:bg-white/50"
            }`}
            aria-label={`Go to section ${index}`}
          />
        ))}
      </div>
    </div>
  );
};

export default ProgressIndicator;
