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
        position: "sticky",
        top: 0,
        height: minHeight ? "auto" : "100vh",
        minHeight: minHeight ? "100vh" : "auto",
      }}
    >
      <div className="stack-section-content h-full overflow-y-auto">
        {children}
      </div>
    </section>
  );
}
