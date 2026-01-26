import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Project } from "../types";
import messImage from "./mess.png";
import eegImage from "./eegImage.jpeg";
import wevolveImage from "./wevolveImage.png";
import electionImage from "./election.jpg";

gsap.registerPlugin(ScrollTrigger);

// --- Extended Project Interface ---
interface ExtendedProject extends Project {
  demo?: string; // Optional Live Demo link
}

const projects: ExtendedProject[] = [
  {
    id: 1,
    title: "Mess Management System",
    category: "Mobile Application",
    image: messImage,
    description:
      "A Flutter-based mess management application that streamlines student meal management, daily menu updates, attendance tracking, and monthly billing with a clean and user-friendly interface.",
    tags: ["Flutter", "Firebase", "Dart"],
    github: "https://github.com/Samal2005/SmartMess",
    demo: "https://smartmess-2f85c.web.app/", 
  },
  {
    id: 2,
    title: "EEG Signal Analysis",
    category: "Research Project",
    image: eegImage,
    description:
      "I am currently working under the guidance of a Professor at NIT Rourkela on this research project. We are focusing on the classification of EEG signals using advanced Machine Learning techniques, preprocessing raw dataset signals to extract meaningful features for accurate pattern recognition.",
    tags: ["Python", "ML", "Signal Processing"],
  },
  {
    id: 3,
    title: "Wevolve Job Matcher",
    category: "Web Application",
    image: wevolveImage,
    description:
      "A smart job matching platform that connects candidates with suitable job opportunities based on skills, preferences, and experience using structured matching logic.",
    tags: ["React", "GSAP", "FASTAPI"],
    github:
      "https://github.com/sanskarKothari/-wevolve-ps1-3-4-5-8-SanskarKothari",
    demo: "https://wevolve-ps1-3-4-5-8-sanskar-kothari.vercel.app/",
  },
  {
    id: 4,
    title: "Online Election Platform",
    category: "Web Application",
    image: electionImage,
    description:
      "A secure online election platform with role-based authentication. Features include candidate registration, voter verification, real-time vote counting, and result analytics.",
    tags: ["React", "Firebase", "Tailwind"],
    github: "https://github.com/sanskarKothari/electsecure-final",
    demo: "https://electsecure-final.vercel.app/",
  },
];

interface ProjectsProps {
  onCursorChange: (type: "default" | "pointer" | "view") => void;
}

// --- Project Modal Component ---
const ProjectModal: React.FC<{
  project: ExtendedProject;
  onClose: () => void;
}> = ({ project, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    const ctx = gsap.context(() => {
      gsap.fromTo(
        modalRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.4 }
      );
      gsap.fromTo(
        contentRef.current,
        { y: 100, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.5,
          ease: "power3.out",
          delay: 0.1,
        }
      );
    });

    return () => {
      document.body.style.overflow = "unset";
      ctx.revert();
    };
  }, []);

  const handleClose = () => {
    gsap.to(modalRef.current, { opacity: 0, duration: 0.3 });
    gsap.to(contentRef.current, {
      y: 50,
      opacity: 0,
      duration: 0.3,
      onComplete: onClose,
    });
  };

  return (
    <div
      ref={modalRef}
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8 bg-black/80 backdrop-blur-md"
      onClick={handleClose}
    >
      <div
        ref={contentRef}
        className="relative w-full max-w-4xl bg-[#0a0a0a] border border-white/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-10 p-2 bg-black/50 rounded-full text-white/60 hover:text-white hover:bg-black transition-all"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        {/* Image Section */}
        <div className="w-full md:w-1/2 h-64 md:h-auto bg-zinc-900 relative">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent md:bg-gradient-to-r" />
        </div>

        {/* Content Section */}
        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col overflow-y-auto">
          <span className="text-indigo-500 font-bold uppercase tracking-widest text-xs mb-4">
            {project.category}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            {project.title}
          </h2>

          <div className="flex flex-wrap gap-2 mb-8">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-medium text-white/60"
              >
                {tag}
              </span>
            ))}
          </div>

          <p className="text-white/70 leading-relaxed text-lg mb-8 flex-grow">
            {project.description}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mt-auto pt-8 border-t border-white/10">
            {/* GitHub Button (Only if github link exists) */}
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-white text-black font-bold hover:bg-indigo-500 hover:text-white transition-all duration-300"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                </svg>
                Source Code
              </a>
            )}

            {/* Live Demo Button (Only if demo link exists) */}
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-white/20 text-white font-bold hover:bg-white hover:text-black transition-all duration-300"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
                Live Demo
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Project Card (Tile) ---
const ProjectCard: React.FC<{
  project: ExtendedProject;
  index: number;
  onCursorChange: any;
  onClick: () => void;
}> = ({ project, index, onCursorChange, onClick }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || !imageRef.current) return;
    const { left, top, width, height } =
      cardRef.current.getBoundingClientRect();
    const x = (e.clientX - left - width / 2) / (width / 2);
    const y = (e.clientY - top - height / 2) / (height / 2);

    gsap.to(cardRef.current, {
      rotationY: x * 5,
      rotationX: -y * 5,
      transformPerspective: 1000,
      ease: "power1.out",
      duration: 0.4,
    });

    gsap.to(imageRef.current, {
      x: x * 10,
      y: y * 10,
      scale: 1.1,
      duration: 0.4,
    });
  };

  const handleMouseLeave = () => {
    onCursorChange("default");
    if (!cardRef.current || !imageRef.current) return;
    gsap.to(cardRef.current, {
      rotationY: 0,
      rotationX: 0,
      ease: "power3.out",
      duration: 0.8,
    });
    gsap.to(imageRef.current, { x: 0, y: 0, scale: 1, duration: 0.8 });
  };

  return (
    <div
      ref={cardRef}
      onClick={onClick}
      className="project-card group relative w-full cursor-pointer"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => onCursorChange("view")}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-zinc-900/50 border border-white/5 backdrop-blur-sm">
        <img
          ref={imageRef}
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700 will-change-transform"
        />
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500" />
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
          <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 transform scale-50 group-hover:scale-100 transition-transform duration-500">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2"
            >
              <path d="M7 17L17 7M17 7H7M17 7V17" />
            </svg>
          </div>
        </div>
      </div>

      <div className="mt-6 flex justify-between items-start">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-indigo-500 block"></span>
            <span className="text-xs uppercase tracking-widest text-white/40 font-medium">
              {project.category}
            </span>
          </div>
          <h3 className="text-2xl font-bold text-white group-hover:text-indigo-400 transition-colors duration-300">
            {project.title}
          </h3>
        </div>

        <div className="flex flex-wrap gap-2 justify-end max-w-[40%]">
          {project.tags.map((tag, i) => (
            <span
              key={tag}
              className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] uppercase font-bold text-white/60 group-hover:bg-white/10 group-hover:text-white transition-all duration-300"
              style={{ transitionDelay: `${i * 50}ms` }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
      <div className="absolute -bottom-6 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-out" />
    </div>
  );
};

// --- Main Projects Component ---
const Projects: React.FC<ProjectsProps> = ({ onCursorChange }) => {
  const containerRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const [selectedProject, setSelectedProject] =
    useState<ExtendedProject | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title Animation
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 80%",
        },
      });

      tl.fromTo(
        ".section-title-char",
        { y: 100, opacity: 0, rotateX: -45 },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          stagger: 0.05,
          duration: 1,
          ease: "power4.out",
        }
      ).fromTo(
        ".section-subtitle",
        { x: -20, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8 },
        "-=0.5"
      );

      // Project Cards Staggered Entry
      gsap.fromTo(
        ".project-card",
        { opacity: 0, y: 100, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.2,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".projects-grid",
            start: "top 75%",
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      id="projects"
      className="relative py-32 md:py-48 px-6 md:px-12 bg-[#050505] overflow-hidden"
    >
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div
          ref={titleRef}
          className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-8"
        >
          <div>
            <span className="section-subtitle flex items-center gap-2 text-indigo-500 font-bold uppercase tracking-widest text-xs mb-4">
              <span className="w-10 h-[1px] bg-indigo-500"></span>
              Featured Work
            </span>
            <h2 className="text-5xl md:text-8xl font-bold tracking-tighter text-white overflow-hidden">
              {"Selected Projects".split(" ").map((word, i) => (
                <span key={i} className="inline-block mr-4">
                  {word.split("").map((char, j) => (
                    <span key={j} className="section-title-char inline-block">
                      {char}
                    </span>
                  ))}
                </span>
              ))}
            </h2>
          </div>
          <p className="section-subtitle max-w-md text-white/40 text-lg leading-relaxed text-right md:text-left">
            A curated selection of projects where engineering meets creativity
            to solve real-world problems.
          </p>
        </div>

        <div className="projects-grid grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-24">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className={index % 2 !== 0 ? "md:translate-y-24" : ""}
            >
              <ProjectCard
                project={project}
                index={index}
                onCursorChange={onCursorChange}
                onClick={() => setSelectedProject(project)}
              />
            </div>
          ))}
        </div>

        <div className="mt-40 text-center">
          <button
            onClick={() => window.open("https://github.com/sanskarKothari?tab=repositories", "_blank")}
            className="group relative inline-flex items-center gap-3 px-10 py-5 bg-transparent border border-white/10 rounded-full overflow-hidden transition-all hover:border-indigo-500/50 hover:px-14 duration-300"
            onMouseEnter={() => onCursorChange("pointer")}
            onMouseLeave={() => onCursorChange("default")}
          >
            <span className="relative z-10 text-lg font-medium text-white group-hover:text-black transition-colors duration-300">
              View Entire Archive
            </span>
            <div className="absolute inset-0 bg-white origin-left scale-x-0 transition-transform duration-500 ease-out group-hover:scale-x-100" />
            <span className="relative z-10 text-white group-hover:text-black transition-colors duration-300">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </span>
          </button>
        </div>
      </div>

      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
};

export default Projects;