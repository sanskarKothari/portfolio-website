
import React, { useState, useEffect } from 'react';
import Cursor from './components/Cursor';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { CursorType } from './types';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const App: React.FC = () => {
  const [cursorType, setCursorType] = useState<CursorType>('default');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Hide loader after a delay
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Trigger entrance animation only after content is in the DOM
    if (!loading) {
      gsap.fromTo(".app-container", 
        { opacity: 0 }, 
        { opacity: 1, duration: 1.5, ease: "power2.inOut" }
      );
    }
  }, [loading]);

  const handleCursorChange = (type: CursorType) => {
    setCursorType(type);
  };

  if (loading) {
    return (
      <div className="fixed inset-0 bg-[#050505] flex items-center justify-center z-[1000]">
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 border-2 border-indigo-500/10 rounded-full" />
          <div className="absolute inset-0 border-t-2 border-indigo-500 rounded-full animate-spin" />
          <div className="absolute inset-0 flex items-center justify-center font-bold text-[10px] tracking-tighter">SANSKAR</div>
        </div>
      </div>
    );
  }

  return (
    <main className="app-container opacity-0 selection:bg-indigo-500/30">
      <Cursor type={cursorType} />
      <Header onCursorChange={handleCursorChange} />
      
      <div className="overflow-x-hidden">
        <Hero onCursorChange={handleCursorChange} />
        <About onCursorChange={handleCursorChange} />
        <Projects onCursorChange={handleCursorChange} />
        <Contact onCursorChange={handleCursorChange} />
        <Footer onCursorChange={handleCursorChange} />
      </div>
    </main>
  );
};

export default App;
