import React from 'react';
import { Shield, Sparkles } from 'lucide-react';

interface FooterProps {
  onNavClick: (sec: string) => void;
}

export default function Footer({ onNavClick }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const handleLink = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    onNavClick(id);
    window.scrollTo({ top: 0, behavior: 'auto' });
  };

  return (
    <footer className="bg-steel-black border-t border-steel-border/50 text-gray-400 text-xs py-16 relative overflow-hidden">
      
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 flex flex-col gap-12">
        
        {/* Top Segment */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
          
          {/* Brand Col */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 bg-neon flex items-center justify-center shrink-0">
                <div className="w-1.5 h-5 bg-black rotate-12"></div>
              </div>
              <h3 className="font-display text-2xl font-black tracking-tighter text-white uppercase leading-none">
                VOLT <span className="text-zinc-500 font-normal">ATHLETIC</span>
              </h3>
            </div>
            <p className="font-sans text-xs text-gray-500 max-w-sm leading-relaxed">
              Establishing elite biomechanics, premium hardware grids, and clinical-level kinetic restoration systems for corporate leaders and uncompromising athletes.
            </p>
            <div className="flex items-center gap-2 font-mono text-[9px] text-neon bg-neon-dark/30 border border-neon/30 px-3 py-1.5 w-max">
              <Shield className="w-3.5 h-3.5" />
              <span>FACILITY REGISTERED SECURITY STATUS: ACTIVE</span>
            </div>
          </div>

          {/* Links Directories */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="font-mono text-[10px] uppercase text-white tracking-widest block border-b border-steel-border/30 pb-2">
              DISCIPLINE PORTALS
            </h4>
            <ul className="space-y-2 font-sans text-xs">
              <li>
                <a href="#classes" onClick={(e) => handleLink(e, 'classes')} className="hover:text-neon transition-colors block">
                  Athletic Classes
                </a>
              </li>
              <li>
                <a href="#trainers" onClick={(e) => handleLink(e, 'trainers')} className="hover:text-neon transition-colors block">
                  Performance Coaches
                </a>
              </li>
              <li>
                <a href="#memberships" onClick={(e) => handleLink(e, 'memberships')} className="hover:text-neon transition-colors block">
                  Membership Schemes
                </a>
              </li>
              <li>
                <a href="#gallery" onClick={(e) => handleLink(e, 'gallery')} className="hover:text-neon transition-colors block">
                  Interactive Gallery
                </a>
              </li>
              <li>
                <a href="#app-preview" onClick={(e) => handleLink(e, 'app-preview')} className="hover:text-neon transition-colors block">
                  Volt Monitoring App
                </a>
              </li>
            </ul>
          </div>

          <div className="md:col-span-4 space-y-3">
            <h4 className="font-mono text-[10px] uppercase text-white tracking-widest block border-b border-steel-border/30 pb-2">
              CLINICAL COMPLIANCE DEPT
            </h4>
            <p className="text-gray-500 font-sans text-xs leading-relaxed max-w-xs">
              This terminal site models state-of-the-art interactive reservation systems. Registered athletic advisors conform strictly to UK national physical guidelines and elite clinical standards. No financial data is processed on this preview.
            </p>
          </div>

        </div>

        {/* Bottom Credits / Legal items */}
        <div className="border-t border-steel-border/30 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] font-mono text-gray-600">
          <div className="flex flex-wrap items-center gap-4 justify-center sm:justify-start">
            <span>© {currentYear} VOLT ATHLETIC TRAINING CLUB LTD.</span>
            <span>•</span>
            <span className="hover:text-white transition-colors cursor-pointer">PRIVACY PROTOCOL</span>
            <span>•</span>
            <span className="hover:text-white transition-colors cursor-pointer">FACILITY LICENSE RULES</span>
          </div>

          <div className="flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-neon" />
            <span className="text-gray-500 font-bold uppercase tracking-widest text-[9px]">ENGINEERED WITH INTENT</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
