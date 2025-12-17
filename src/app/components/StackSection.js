"use client";

export default function StackSection({
  children,
  sectionNumber,
  className = "",
  backgroundColor = "bg-white",
  minHeight = false, // For sections that need to extend beyond 100vh
}) {
  return (
    <section
      className={`stack-section ${backgroundColor} ${className}`}
      data-section={sectionNumber}
      style={{
        zIndex: sectionNumber,
        minHeight: "100vh",
        height: minHeight ? "auto" : "100vh",
        display: "flex",
        flexDirection: "column"
      }}
    >
      <div className="stack-section-content w-full flex-1">
        {children}
      </div>
    </section>
  );
}
