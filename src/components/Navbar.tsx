import React, { useState, useEffect } from 'react';
import { Menu, X, Shield, Activity, Landmark } from 'lucide-react';

interface NavbarProps {
  onJoinClick: () => void;
  activeSection: string;
  setActiveSection: (sec: string) => void;
}

export default function Navbar({ onJoinClick, activeSection, setActiveSection }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'hero', label: 'Home' },
    { id: 'classes', label: 'Classes' },
    { id: 'trainers', label: 'Trainers' },
    { id: 'memberships', label: 'Memberships' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'app-preview', label: 'Volt App' },
    { id: 'join', label: 'Trial & Hours' },
  ];

  const handleNavClick = (id: string) => {
    setActiveSection(id);
    window.scrollTo({
      top: 0,
      behavior: 'auto'
    });
    setIsOpen(false);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 h-20 transition-luxury flex items-center bg-steel-black/80 backdrop-blur-md border-b ${
          scrolled ? 'border-steel-border bg-steel-black/95 shadow-md' : 'border-steel-border/30 bg-steel-black/40'
        }`}
      >
        <div className="w-full max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center h-full">
          {/* Logo Brand */}
          <button
            onClick={() => handleNavClick('hero')}
            className="font-display text-2xl font-black tracking-tighter text-white uppercase outline-none flex items-center gap-2.5 cursor-pointer"
          >
            <div className="w-8 h-8 bg-neon flex items-center justify-center shrink-0">
              <div className="w-1.5 h-5 bg-black rotate-12"></div>
            </div>
            <span>VOLT <span className="text-zinc-500 font-normal">ATHLETIC</span></span>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:gap-4 lg:gap-8 h-full items-center">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`font-mono text-xs uppercase md:tracking-wider lg:tracking-widest relative py-2 outline-none cursor-pointer transition-colors ${
                  activeSection === item.id
                    ? 'text-neon font-bold'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {item.label}
                {activeSection === item.id && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-neon" />
                )}
              </button>
            ))}
          </div>

          {/* Call To Action Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={onJoinClick}
              className="bg-neon text-steel-black hover:bg-white hover:text-steel-black px-6 py-3 font-mono text-xs font-bold uppercase tracking-wider transition-luxury glow-btn active:scale-95 duration-200"
            >
              Start Training
            </button>
          </div>

          {/* Mobile Menu Actions */}
          <div className="flex md:hidden items-center gap-4">
            <button
              onClick={onJoinClick}
              className="bg-neon text-steel-black px-4 py-2 font-mono text-xs font-bold uppercase tracking-wide transition-luxury"
            >
              Join
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:text-neon transition-colors focus:outline-none p-1"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Sidebar Dropdown */}
      <div
        className={`fixed inset-0 z-40 bg-steel-black transition-luxury md:hidden flex flex-col justify-center px-8 border-r border-steel-border/50 ${
          isOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0 pointer-events-none'
        }`}
      >
        {/* Abstract Background Decoration */}
        <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-64 h-64 bg-neon/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="space-y-6 relative z-10 flex flex-col items-start w-full">
          <p className="font-mono text-[10px] tracking-widest text-neon uppercase">Volt Athletic Premium Menu</p>
          {navItems.map((item, index) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className="text-left w-full block focus:outline-none"
              style={{ transitionDelay: `${index * 50}ms` }}
            >
              <span className="font-mono text-xs text-neon mr-4">0{index + 1}</span>
              <span
                className={`font-display text-4xl uppercase tracking-tight duration-300 ${
                  activeSection === item.id ? 'text-white font-black' : 'text-gray-500 hover:text-gray-300'
                }`}
              >
                {item.label}
              </span>
            </button>
          ))}

          <div className="pt-8 w-full border-t border-steel-border/30 flex flex-col gap-4">
            <button
              onClick={() => {
                setIsOpen(false);
                onJoinClick();
              }}
              className="w-full text-center bg-neon text-steel-black font-mono font-bold text-xs py-4 uppercase tracking-widest active:scale-95 transition-transform"
            >
              Schedule Intake Assessment
            </button>
            
            <div className="grid grid-cols-3 gap-2 text-center text-[10px] font-mono text-gray-400 mt-2">
              <div className="p-2 bg-steel-low border border-steel-border/40">
                <Shield className="w-4 h-4 mx-auto mb-1 text-neon" />
                <span className="block">CRYO ACTIVE</span>
              </div>
              <div className="p-2 bg-steel-low border border-steel-border/40">
                <Activity className="w-4 h-4 mx-auto mb-1 text-neon" />
                <span className="block">BIOMETRIC</span>
              </div>
              <div className="p-2 bg-steel-low border border-steel-border/40">
                <Landmark className="w-4 h-4 mx-auto mb-1 text-neon" />
                <span className="block">EST. 2026</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
