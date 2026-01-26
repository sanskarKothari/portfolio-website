import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface FooterProps {
  onCursorChange: (type: "default" | "pointer") => void;
}

const Footer: React.FC<FooterProps> = ({ onCursorChange }) => {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.fromTo(
      footerRef.current,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 100%",
        },
      }
    );
  }, []);

  const links = [
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/sanskar-sachin-kothari-548a08240/",
    },
    { name: "GitHub", url: "https://github.com/sanskarKothari" },
    {
      name: "Instagram",
      url: "https://www.instagram.com/saint.in.btech?utm_source=qr",
    },
    { name: "Twitter", url: "https://x.com/sanskarsk11" },
  ];

  return (
    <footer
      ref={footerRef}
      className="py-12 px-6 md:px-12 bg-[#050505] border-t border-white/5 relative z-20"
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        {/* Brand */}
        <div className="flex flex-col items-center md:items-start group">
          <div className="text-xl font-bold tracking-tighter mb-2 flex items-center gap-2 text-white">
            <span className="w-6 h-6 bg-indigo-600 rounded-full flex items-center justify-center text-[10px] group-hover:rotate-180 transition-transform duration-500">
              S
            </span>
            Sanskar Kothari
          </div>
          <p className="text-white/40 text-sm">
            © {new Date().getFullYear()} — Made with passion & GSAP.
          </p>
        </div>

        {/* Social Links */}
        <div className="flex gap-8">
          {links.map((item) => (
            <a
              key={item.name}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs uppercase tracking-widest font-bold text-white/60 hover:text-indigo-400 hover:-translate-y-1 transition-all duration-300"
              onMouseEnter={() => onCursorChange("pointer")}
              onMouseLeave={() => onCursorChange("default")}
            >
              {item.name}
            </a>
          ))}
        </div>

        {/* Status */}
        <div className="flex items-center gap-3 px-4 py-2 bg-white/5 rounded-full border border-white/5">
          <div className="relative w-2 h-2">
            <div className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-75"></div>
            <div className="relative w-2 h-2 bg-green-500 rounded-full"></div>
          </div>
          <span className="text-[10px] uppercase font-bold tracking-widest text-white/60">
            Available for hire
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
