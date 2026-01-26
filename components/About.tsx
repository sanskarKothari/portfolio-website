import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Skill, Experience } from "../types";

gsap.registerPlugin(ScrollTrigger);

const skills: Skill[] = [
  { name: "Frontend (React, Tailwind)", level: 90 },
  { name: "Data Structures (DSA)", level: 85 },
  { name: "AI & ML (Python)", level: 50 },
  { name: "Backend (Node.js)", level: 65 },
  { name: "Animations (GSAP)", level: 50 },
];

const experiences: Experience[] = [
  {
    id: 1,
    role: "Portfolio Projects",
    company: "Personal Work",
    period: "2026 - Present",
    description:
      "Building responsive, interactive websites using React, Tailwind, and Firebase to showcase projects and learn full-stack development.",
  },
  {
    id: 2,
    role: "AI & ML Projects",
    company: "College Hackathons",
    period: "2025 - Present",
    description:
      "Experimenting with Python-based ML models for predictive analytics and small automation projects during college events.",
  },
  {
    id: 3,
    role: "DSA & Coding",
    company: "LeetCode / Codeforces",
    period: "2025 - Present",
    description:
      "Solved 300+ problems across platforms to strengthen algorithmic thinking and problem-solving skills.",
  },
  {
    id: 4,
    role: "Electrical Engineering",
    company: "NIT Rourkela",
    period: "2024 - Present",
    description:
      "Exploring fundamental Electrical Engineering concepts alongside coding, bridging the gap between hardware and software.",
  },
];

interface AboutProps {
  onCursorChange: (type: "default" | "pointer") => void;
}

const About: React.FC<AboutProps> = ({ onCursorChange }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const title = document.querySelector(".about-title");
      if (title) {
        gsap.fromTo(
          title.children,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.1,
            duration: 1,
            scrollTrigger: {
              trigger: title,
              start: "top 80%",
            },
          }
        );
      }

      gsap.fromTo(
        ".skill-bar-fill",
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.5,
          ease: "power2.out",
          stagger: 0.1,
          scrollTrigger: {
            trigger: ".skills-container",
            start: "top 75%",
          },
        }
      );

      if (lineRef.current) {
        gsap.fromTo(
          lineRef.current,
          { height: "0%" },
          {
            height: "100%",
            ease: "none",
            scrollTrigger: {
              trigger: ".experience-container",
              start: "top 60%",
              end: "bottom 80%",
              scrub: 1,
            },
          }
        );
      }

      gsap.fromTo(
        ".timeline-item",
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          stagger: 0.2,
          scrollTrigger: {
            trigger: ".experience-container",
            start: "top 70%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-24 md:py-40 px-6 md:px-12 bg-zinc-950 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 relative z-10">
        <div>
          <h2 className="about-title text-4xl md:text-6xl font-bold mb-10 tracking-tight text-white">
            <span className="block">I build</span>
            <span className="block text-indigo-500">interactive web</span>
            <span className="block">experiences.</span>
          </h2>

          <p className="text-xl text-white/60 mb-12 leading-relaxed max-w-lg">
            I'm a 2nd-year BTech Electrical student at{" "}
            <strong className="text-white">NIT Rourkela</strong>, passionate
            about bridging the gap between Core Engineering and Software. I
            specialize in React, DSA, and exploring AI/ML landscapes.
          </p>

          <div className="skills-container space-y-8 mt-16">
            <h3 className="text-sm uppercase tracking-widest text-indigo-400 font-bold mb-6">
              Technical Arsenal
            </h3>
            {skills.map((skill) => (
              <div key={skill.name} className="space-y-2 group">
                <div className="flex justify-between text-sm font-medium">
                  <span className="text-white/80 group-hover:text-white transition-colors">
                    {skill.name}
                  </span>
                  <span className="text-indigo-400">{skill.level}%</span>
                </div>
                <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                  <div
                    className="skill-bar-fill h-full bg-gradient-to-r from-indigo-600 to-purple-500 origin-left"
                    style={{ width: `${skill.level}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="experience-container">
          <h3 className="text-sm uppercase tracking-widest text-indigo-400 font-bold mb-12">
            Journey So Far
          </h3>

          <div className="relative pl-10 space-y-12">
            <div className="absolute left-[7px] top-2 bottom-0 w-[2px] bg-white/10">
              <div
                ref={lineRef}
                className="w-full bg-indigo-500 shadow-[0_0_10px_#6366f1]"
              />
            </div>

            {experiences.map((exp) => (
              <div key={exp.id} className="timeline-item relative group">
                <div className="absolute -left-[41px] top-1.5 w-4 h-4 rounded-full bg-zinc-950 border-2 border-white/20 group-hover:border-indigo-500 group-hover:scale-125 transition-all duration-300 z-10" />

                <span className="text-xs font-bold uppercase tracking-wider text-white/30 mb-1 block">
                  {exp.period}
                </span>
                <h4 className="text-xl font-bold text-white group-hover:text-indigo-400 transition-colors">
                  {exp.role}
                </h4>
                <div className="text-sm font-medium text-white/50 mb-3">
                  {exp.company}
                </div>
                <p className="text-white/60 leading-relaxed text-sm max-w-md">
                  {exp.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
