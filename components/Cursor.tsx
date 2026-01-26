import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

interface CursorProps {
  type: "default" | "pointer" | "text" | "view";
}

const Cursor: React.FC<CursorProps> = ({ type }) => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const cursor = cursorRef.current;
    const ring = ringRef.current;

    if (!cursor || !ring) return;

    const xTo = gsap.quickTo(cursor, "x", { duration: 0.1 });
    const yTo = gsap.quickTo(cursor, "y", { duration: 0.1 });

    const ringXTo = gsap.quickTo(ring, "x", { duration: 0.4 });
    const ringYTo = gsap.quickTo(ring, "y", { duration: 0.4 });

    const handleMouseMove = (e: MouseEvent) => {
      if (!isVisible) setIsVisible(true);
      xTo(e.clientX);
      yTo(e.clientY);
      ringXTo(e.clientX);
      ringYTo(e.clientY);
    };

    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [isVisible]);

  const getRingStyles = () => {
    switch (type) {
      case "pointer":
        return "scale-150 bg-white/10 border-white/40";
      case "view":
        return "scale-[2.5] bg-white border-transparent";
      case "text":
        return "scale-x-[0.2] scale-y-[1.5] border-white/80";
      default:
        return "scale-100 border-white/30";
    }
  };

  return (
    <div
      className={`fixed inset-0 pointer-events-none z-[9999] transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0"
      } hidden lg:block`}
    >
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-2 h-2 bg-indigo-500 rounded-full -translate-x-1/2 -translate-y-1/2 z-50"
      />
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 w-10 h-10 border rounded-full -translate-x-1/2 -translate-y-1/2 transition-all duration-300 flex items-center justify-center ${getRingStyles()}`}
      >
        {type === "view" && (
          <span className="text-[6px] font-bold text-black tracking-tighter uppercase">
            View
          </span>
        )}
      </div>
    </div>
  );
};

export default Cursor;
