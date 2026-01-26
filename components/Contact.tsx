import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import emailjs from "@emailjs/browser"; // npm install @emailjs/browser

gsap.registerPlugin(ScrollTrigger);

const Contact: React.FC = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (titleRef.current) {
        const chars = titleRef.current.innerText.split("");

        titleRef.current.innerHTML = chars
          .map(
            (c) =>
              `<span class="inline-block opacity-0 translate-y-10">${
                c === " " ? "&nbsp;" : c
              }</span>`
          )
          .join("");

        gsap.to(titleRef.current.children, {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.02,
          ease: "power4.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
          },
        });
      }

      gsap.fromTo(
        ".contact-stagger",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          scrollTrigger: {
            trigger: ".contact-grid",
            start: "top 75%",
          },
        }
      );

      gsap.to(".contact-glow", {
        scale: 1.2,
        opacity: 0.6,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formRef.current) return;

    setIsLoading(true);

    const SERVICE_ID = "service_ch3dsgp";
    const TEMPLATE_ID = "template_oa5061s";
    const PUBLIC_KEY = "yipmvuzmsxqxM3Yjb";

    emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, PUBLIC_KEY).then(
      () => {
        setIsLoading(false);
        setIsSubmitted(true);

        // Success Animation
        const tl = gsap.timeline();
        tl.to(".submit-btn", {
          scale: 0.95,
          duration: 0.1,
          yoyo: true,
          repeat: 1,
        }).to(".submit-btn", {
          backgroundColor: "#16a34a",
          color: "#fff",
          duration: 0.3,
        });

        setTimeout(() => {
          setIsSubmitted(false);
          if (formRef.current) formRef.current.reset();
          gsap.to(".submit-btn", {
            backgroundColor: "#fff",
            color: "#000",
            duration: 0.3,
          });
        }, 3000);
      },
      (error) => {
        console.error("FAILED...", error);
        setIsLoading(false);
        alert("Failed to send message. Please check console for details.");
      }
    );
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative bg-zinc-950 py-24 md:py-40 px-6 md:px-12 overflow-hidden"
    >
      {/* Background Ambience */}
      <div className="contact-glow absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto contact-grid grid grid-cols-1 lg:grid-cols-2 gap-20 relative z-10">
        {/* LEFT CONTENT */}
        <div>
          <span className="contact-stagger text-indigo-500 font-bold uppercase tracking-widest text-xs flex items-center gap-2">
            <span className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse" />
            Get in Touch
          </span>

          <h2
            ref={titleRef}
            className="mt-6 text-4xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight text-white max-w-2xl"
          >
            Let's do <span className="text-indigo-500">project</span>.
          </h2>

          <div className="contact-stagger mt-12 space-y-8">
            <div className="group">
              <p className="text-white/40 text-sm uppercase font-bold tracking-widest mb-2">
                Email
              </p>
              <a
                href="mailto:sanskarkthr@gmail.com"
                className="text-xl md:text-3xl font-medium text-white hover:text-indigo-400 transition-colors relative inline-block"
              >
                sanskarkthr@gmail.com
                <span className="absolute bottom-0 left-0 w-full h-[1px] bg-indigo-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              </a>
            </div>

            <div>
              <p className="text-white/40 text-sm uppercase font-bold tracking-widest mb-2">
                Location
              </p>
              <p className="text-xl md:text-3xl font-medium text-white">
                Remote / Rourkela, India (769008)
              </p>
            </div>
          </div>
        </div>

        <div className="contact-stagger">
          <form
            ref={formRef}
            onSubmit={sendEmail}
            className="space-y-6 rounded-3xl border border-white/5 bg-zinc-900/40 p-8 md:p-12 backdrop-blur-xl shadow-2xl relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:2rem_2rem] pointer-events-none" />

            <div className="space-y-6 relative z-10">
              <div className="relative group">
                <input
                  type="text"
                  name="user_name"
                  required
                  placeholder="Your Name"
                  className="w-full bg-transparent border-b border-white/10 py-4 outline-none text-white focus:border-indigo-500 transition-all placeholder:text-white/20 peer"
                />
                <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-indigo-500 transition-all duration-500 peer-focus:w-full" />
              </div>

              <div className="relative group">
                <input
                  type="email"
                  name="user_email"
                  required
                  placeholder="Email Address"
                  className="w-full bg-transparent border-b border-white/10 py-4 outline-none text-white focus:border-indigo-500 transition-all placeholder:text-white/20 peer"
                />
                <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-indigo-500 transition-all duration-500 peer-focus:w-full" />
              </div>

              <div className="relative group">
                <textarea
                  name="message"
                  rows={4}
                  required
                  placeholder="Your Message"
                  className="w-full bg-transparent border-b border-white/10 py-4 outline-none resize-none text-white focus:border-indigo-500 transition-all placeholder:text-white/20 peer"
                />
                <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-indigo-500 transition-all duration-500 peer-focus:w-full" />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading || isSubmitted}
              className="submit-btn relative w-full rounded-full py-5 text-lg font-bold bg-white text-black hover:bg-indigo-500 hover:text-white transition-all duration-300 overflow-hidden group z-10"
            >
              <span className="relative z-10">
                {isLoading
                  ? "Sending..."
                  : isSubmitted
                  ? "Message Sent!"
                  : "Send Message"}
              </span>
              <div className="absolute inset-0 bg-indigo-500 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
