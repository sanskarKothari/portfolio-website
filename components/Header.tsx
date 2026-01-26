import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import cv from "./Sanskar_Kothari_CV.pdf";

interface HeaderProps {
  onCursorChange: (type: "default" | "pointer") => void;
}

const Header: React.FC<HeaderProps> = ({ onCursorChange }) => {
  const headerRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);

 
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      tl.fromTo(
        headerRef.current,
        { y: -100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power4.out" }
      ).fromTo(
        ".nav-item",
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: "power2.out" },
        "-=0.5"
      );
    });

    return () => ctx.revert();
  }, []);

  
  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

     
      setHasScrolled(currentScrollY > 50);

      
      if (currentScrollY > lastScrollY && currentScrollY > 100 && !isMenuOpen) {
        
        gsap.to(headerRef.current, {
          y: "-100%",
          duration: 0.3,
          ease: "power2.inOut",
        });
      } else {
       
        gsap.to(headerRef.current, {
          y: "0%",
          duration: 0.3,
          ease: "power2.inOut",
        });
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMenuOpen]);

  
  useEffect(() => {
    if (isMenuOpen) {
     
      gsap.to(menuRef.current, { y: "0%", duration: 0.6, ease: "expo.inOut" });
      gsap.fromTo(
        ".mobile-link",
        { y: 100, opacity: 0, rotate: 5 },
        {
          y: 0,
          opacity: 1,
          rotate: 0,
          duration: 0.5,
          stagger: 0.1,
          delay: 0.2,
          ease: "back.out(1.7)",
        }
      );
    } else {
     
      gsap.to(menuRef.current, {
        y: "-100%",
        duration: 0.6,
        ease: "expo.inOut",
      });
    }
  }, [isMenuOpen]);

  const navLinks = [
    { name: "About", href: "#about" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <>
      <header
        ref={headerRef}
        className={`fixed top-0 left-0 w-full z-[100] px-6 py-4 md:px-12 md:py-6 flex justify-between items-center transition-colors duration-300 ${
          hasScrolled
            ? "bg-black/80 backdrop-blur-md border-b border-white/5"
            : "bg-transparent"
        }`}
      >
        
        <div
          className="nav-item text-xl font-bold tracking-tighter group flex items-center gap-2 cursor-pointer"
          onMouseEnter={() => {
            onCursorChange("pointer");
            gsap.to(".logo-box", { rotate: 90, scale: 1.1, duration: 0.4 });
          }}
          onMouseLeave={() => {
            onCursorChange("default");
            gsap.to(".logo-box", { rotate: 0, scale: 1, duration: 0.4 });
          }}
        >
          <span className="logo-box w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-sm text-white shadow-lg shadow-indigo-500/30">
            S
          </span>
          <span className="hidden md:inline text-white">Sanskar Kothari</span>
        </div>

     
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="nav-item text-sm font-medium text-white/60 hover:text-white transition-colors relative group overflow-hidden py-1"
              onMouseEnter={() => onCursorChange("pointer")}
              onMouseLeave={() => onCursorChange("default")}
            >
              <span className="relative z-10">{link.name}</span>
              <span className="absolute bottom-0 left-0 w-full h-[1px] bg-indigo-500 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out" />
            </a>
          ))}

         
          <div className="flex items-center gap-4">
           
            <a
              href={cv}
              download
              className="nav-item relative px-6 py-2 rounded-full overflow-hidden group border border-white/20 hover:border-indigo-500 transition-colors"
              onMouseEnter={() => onCursorChange("pointer")}
              onMouseLeave={() => onCursorChange("default")}
            >
              <div className="absolute inset-0 bg-indigo-600 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
              <span className="relative text-sm font-bold text-white group-hover:text-white transition-colors">
                Resume
              </span>
            </a>

        
            <a
              href="#contact"
              className="nav-item relative px-6 py-2 bg-white rounded-full overflow-hidden group"
              onMouseEnter={() => onCursorChange("pointer")}
              onMouseLeave={() => onCursorChange("default")}
            >
              <div className="absolute inset-0 bg-indigo-500 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
              <span className="relative text-sm font-bold text-black group-hover:text-white transition-colors">
                Let's talk
              </span>
            </a>
          </div>
        </nav>

       
        <button
          className="md:hidden z-[102] relative w-10 h-10 flex flex-col justify-center items-center gap-1.5 nav-item"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          onMouseEnter={() => onCursorChange("pointer")}
          onMouseLeave={() => onCursorChange("default")}
        >
          <span
            className={`w-6 h-0.5 bg-white transition-all duration-300 ${
              isMenuOpen ? "rotate-45 translate-y-2" : ""
            }`}
          />
          <span
            className={`w-6 h-0.5 bg-white transition-all duration-300 ${
              isMenuOpen ? "opacity-0 translate-x-4" : ""
            }`}
          />
          <span
            className={`w-4 h-0.5 bg-white transition-all duration-300 self-end mr-2 ${
              isMenuOpen ? "-rotate-45 -translate-y-2 w-6 mr-0" : ""
            }`}
          />
        </button>
      </header>

      <div
        ref={menuRef}
        className="fixed inset-0 bg-[#0a0a0a] z-[101] flex flex-col items-center justify-center gap-8 -translate-y-full"
      >
       
        <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none" />

        {navLinks.map((link) => (
          <a
            key={link.name}
            href={link.href}
            onClick={() => setIsMenuOpen(false)}
            className="mobile-link text-5xl font-bold text-white/40 hover:text-white hover:scale-110 transition-all duration-300 font-playfair"
            onMouseEnter={() => onCursorChange("pointer")}
            onMouseLeave={() => onCursorChange("default")}
          >
            {link.name}
          </a>
        ))}

      
        <a
          href={cv}
          download
          className="mobile-link mt-8 px-8 py-3 border border-white/20 rounded-full text-white hover:bg-white hover:text-black transition-colors"
          onClick={() => setIsMenuOpen(false)}
        >
          Download Resume
        </a>
      </div>
    </>
  );
};

export default Header;
