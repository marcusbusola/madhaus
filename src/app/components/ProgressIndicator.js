"use client";

const ProgressIndicator = ({ currentSection, onNavigate }) => {
  // Don't show on Section 0 (title card)
  if (currentSection === 0) {
    return null;
  }

  // Format counter: "01/06" through "06/06"
  const formattedCurrent = String(currentSection).padStart(2, "0");

  return (
    <div className="fixed right-8 top-1/2 -translate-y-1/2 z-50 flex flex-col items-center gap-6">
      {/* Counter */}
      <div className="text-white text-caption opacity-60">
        {formattedCurrent} / 06
      </div>

      {/* Dots navigation */}
      <div className="flex flex-col gap-3">
        {[0, 1, 2, 3, 4, 5, 6].map((index) => (
          <button
            key={index}
            onClick={() => onNavigate(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
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
