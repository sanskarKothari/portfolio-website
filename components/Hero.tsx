import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { useMagnetic } from "../hooks/useMagnetic";
import profileImg from "./profile.jpeg";

interface HeroProps {
  onCursorChange: (type: "default" | "pointer" | "text") => void;
}

const Hero: React.FC<HeroProps> = ({ onCursorChange }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const btnRef = useMagnetic();
  const spotlightRef = useRef<HTMLDivElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();
    const ctx = gsap.context(() => {
      // 1. Text Reveal
      if (textRef.current) {
        const chars = textRef.current.innerText.split("");
        textRef.current.innerHTML = chars
          .map(
            (c) =>
              `<span class="inline-block opacity-0 translate-y-20 will-change-transform">${
                c === " " ? "&nbsp;" : c
              }</span>`
          )
          .join("");

        tl.to(textRef.current.children, {
          opacity: 1,
          y: 0,
          stagger: 0.05,
          duration: 1.2,
          ease: "expo.out",
        });
      }

      // 2. Subtitle Animation
      tl.fromTo(
        subtitleRef.current,
        { opacity: 0, x: -50 },
        { opacity: 1, x: 0, duration: 1, ease: "power3.out" },
        "-=0.8"
      );

      // 3. Image Entry (Zoom In)
      gsap.fromTo(
        ".hero-scanner-box",
        { scale: 0.8, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1.2,
          ease: "expo.out",
          delay: 0.2,
        }
      );

      // 4. Scanner Beam Animation (Continuous Loop)
      gsap.to(".scanner-beam", {
        top: "100%",
        duration: 2.5,
        repeat: -1,
        ease: "linear",
        yoyo: true,
      });

      // 5. Background Tech Elements
      gsap.to(".tech-orb", {
        y: "random(-30, 30)",
        x: "random(-20, 20)",
        scale: "random(0.8, 1.2)",
        duration: "random(3, 5)",
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: { amount: 1, from: "random" },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Mouse Move Handler (Parallax Only)
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current || !spotlightRef.current) return;

    const { clientX, clientY } = e;
    const { width, height } = containerRef.current.getBoundingClientRect();

    // Parallax
    const x = (clientX / width - 0.5) * 30;
    const y = (clientY / height - 0.5) * 30;

    gsap.to(".parallax-layer", { x: x, y: y, duration: 1, ease: "power2.out" });

    // Spotlight Background
    gsap.to(spotlightRef.current, {
      background: `radial-gradient(600px circle at ${clientX}px ${clientY}px, rgba(99, 102, 241, 0.15), transparent 40%)`,
      duration: 0.4,
      ease: "power2.out",
    });
  };

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-24 md:pt-0 overflow-hidden bg-[#050505]"
    >
      {/* Background Ambience */}
      <div
        ref={spotlightRef}
        className="absolute inset-0 pointer-events-none z-0 transition-opacity duration-500"
      />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none z-0" />

      {/* Floating Background Orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="tech-orb absolute top-1/4 left-1/4 w-64 h-64 bg-indigo-500/20 rounded-full blur-[80px]" />
        <div className="tech-orb absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-500/20 rounded-full blur-[80px]" />
      </div>

      {/* --- Main Content Grid --- */}
      <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        {/* LEFT COLUMN: Text */}
        <div className="text-center lg:text-left order-2 lg:order-1 parallax-layer">
          {/* Badge */}
          <div
            ref={subtitleRef}
            className="inline-flex items-center gap-3 px-4 py-2 mb-6 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm shadow-lg mx-auto lg:mx-0"
          >
            <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
            <span className="text-xs md:text-sm font-bold tracking-[0.2em] uppercase text-indigo-200">
              Electrical Engineer & Software Enthusiast
            </span>
          </div>

          {/* Main Title */}
          <h1
            ref={textRef}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-playfair font-black tracking-tighter leading-[0.9] mb-8 text-white mix-blend-overlay whitespace-nowrap"
            onMouseEnter={() => onCursorChange("text")}
            onMouseLeave={() => onCursorChange("default")}
          >
            Sanskar Kothari
          </h1>

          <p className="text-lg text-white/60 mb-10 max-w-lg mx-auto lg:mx-0 leading-relaxed">
            Fusing high-voltage creativity with code to build{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 font-bold">
              digital masterpieces
            </span>
            .
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6">
            <div ref={btnRef as any}>
              <a
                href="#projects"
                className="group relative inline-flex items-center justify-center h-14 px-8 overflow-hidden font-bold text-white rounded-full border border-white/20 bg-transparent transition-all duration-300 hover:border-indigo-500 hover:shadow-[0_0_30px_rgba(99,102,241,0.5)]"
                onMouseEnter={() => onCursorChange("pointer")}
                onMouseLeave={() => onCursorChange("default")}
              >
                <span className="absolute inset-0 h-full w-full scale-0 rounded-full bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 transition-all duration-500 ease-out group-hover:scale-110" />
                <div className="relative flex flex-col items-center overflow-hidden h-6">
                  <span className="group-hover:-translate-y-full transition-transform duration-500 ease-in-out block">
                    View Projects
                  </span>
                  <span className="absolute top-full group-hover:-translate-y-full transition-transform duration-500 ease-in-out flex items-center gap-2">
                    Explore Work
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      className="mb-[2px]"
                    >
                      <path
                        d="M5 12h14M12 5l7 7-7 7"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </div>
              </a>
            </div>

            <button
              onClick={() =>
                document
                  .getElementById("about")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="group flex items-center gap-2 text-white/70 hover:text-white transition-all"
              onMouseEnter={() => onCursorChange("pointer")}
              onMouseLeave={() => onCursorChange("default")}
            >
              <span className="font-medium tracking-wide">About Me</span>
              <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M5 12H19M19 12L12 5M19 12L12 19" />
                </svg>
              </div>
            </button>
          </div>
        </div>

        {/* RIGHT COLUMN: SOLID SCANNER PHOTO */}
        <div
          ref={imageContainerRef}
          className="order-1 lg:order-2 flex justify-center lg:justify-end relative"
        >
          {/* The Container */}
          <div className="hero-scanner-box relative w-[300px] h-[350px] md:w-[380px] md:h-[450px] group">
            {/* 1. Pulsing Ring Behind */}
            <div
              className="absolute inset-0 -m-4 border-2 border-dashed border-indigo-500/30 rounded-2xl animate-spin-slow"
              style={{ animationDuration: "20s" }}
            />

            {/* 2. Main Image Card */}
            <div className="relative w-full h-full rounded-xl overflow-hidden border border-white/10 shadow-[0_0_50px_rgba(79,70,229,0.3)] bg-[#0a0a0a]">
              {/* Image */}
              <img
                src={profileImg}
                alt="Sanskar Kothari"
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-out"
              />

              {/* Scanner Beam */}
              <div className="scanner-beam absolute left-0 w-full h-[3px] bg-indigo-400 shadow-[0_0_20px_rgba(99,102,241,0.8)] z-20 pointer-events-none opacity-80" />

              {/* Grid Overlay on Image */}
              <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.5)_50%)] bg-[size:100%_4px] opacity-10 pointer-events-none z-10" />
            </div>

            {/* 3. Tech Corners */}
            <div className="absolute -top-2 -left-2 w-8 h-8 border-t-4 border-l-4 border-indigo-500 rounded-tl-lg" />
            <div className="absolute -bottom-2 -right-2 w-8 h-8 border-b-4 border-r-4 border-purple-500 rounded-br-lg" />

            {/* 4. Status Badge */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-black/80 backdrop-blur border border-white/20 rounded-full flex items-center gap-2 shadow-xl z-30">
              <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
              <span className="text-[10px] font-mono text-white tracking-widest uppercase">
                Target Locked
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 opacity-30">
        <div className="w-[1px] h-12 bg-gradient-to-b from-white to-transparent" />
      </div>
    </section>
  );
};

export default Hero;
