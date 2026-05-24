import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ChevronRight, Award, Shield, Cpu, Flame, Target } from 'lucide-react';
import { TRAINERS_DATA } from '../data';
import TrainerMatcher from './TrainerMatcher';

interface TrainersProps {
  onBookTrainer: (trainerId: string) => void;
}

export default function Trainers({ onBookTrainer }: TrainersProps) {
  const [hoveredTrainer, setHoveredTrainer] = useState<string | null>(null);

  return (
    <section id="trainers" className="py-24 bg-steel-black text-gray-200 relative overflow-hidden">
      {/* Abstract Background Design */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-neon/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 flex flex-col gap-16">
        
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto">
          <span className="font-mono text-xs tracking-[0.2em] text-neon uppercase block mb-1">Human Architecture Specialists</span>
          <h2 className="font-display text-4xl sm:text-6xl font-black uppercase tracking-tighter text-white">
            ARCHITECTS OF APEX
          </h2>
          <p className="font-sans text-sm text-gray-500 mt-3 max-w-xl mx-auto">
            Not local weights coaches. Our performance developers hold advanced kinesiology degrees, tactical operational backgrounds, and active national weightlifting titles.
          </p>
        </div>

        {/* Trainers Cards Listing */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TRAINERS_DATA.map((t) => (
            <div
              key={t.id}
              onMouseEnter={() => setHoveredTrainer(t.id)}
              onMouseLeave={() => setHoveredTrainer(null)}
              className="bg-steel-low/85 border border-steel-border/50 hover:border-neon transition-luxury flex flex-col h-[520px] justify-between relative group"
            >
              {/* Image Frame */}
              <div className="relative h-72 w-full overflow-hidden border-b border-steel-border/50">
                <div className="absolute inset-0 bg-gradient-to-t from-steel-low via-transparent to-transparent z-10" />
                <img
                  src={t.imgUrl}
                  alt={t.name}
                  className="w-full h-full object-cover grayscale contrast-125 filter group-hover:grayscale-0 group-hover:scale-105 transition-luxury select-none pointer-events-none object-top"
                  referrerPolicy="no-referrer"
                />
                
                {/* Floating Skill Badges */}
                <div className="absolute top-4 left-4 z-20 flex flex-wrap gap-1 max-w-[85%]">
                  {t.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="font-mono text-[8px] bg-zinc-950/90 text-white border border-steel-border px-2 py-0.5 tracking-wider uppercase"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bio Details */}
              <div className="p-6 md:p-8 flex-grow flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="font-display text-2xl font-black uppercase tracking-wider text-white">
                      {t.name}
                    </h3>
                    <span className="font-mono text-[9px] text-neon uppercase tracking-widest block">
                      DEPT: PRO
                    </span>
                  </div>
                  <span className="font-mono text-xs text-neon uppercase block tracking-wider leading-none mb-4">
                    {t.specialty}
                  </span>
                  
                  <p className="font-sans text-xs text-gray-400 leading-relaxed max-w-md line-clamp-3">
                    {t.bio}
                  </p>
                </div>

                {/* Interactive Booking Action and Stats */}
                <div className="pt-6 border-t border-steel-border/30 flex items-center justify-between">
                  {/* Dynamic indicator */}
                  <div className="flex items-center gap-1.5 font-mono text-[9px] text-gray-500">
                    <div className="w-1.5 h-1.5 bg-neon rounded-full animate-ping" />
                    <span>AVALABLE TODAY</span>
                  </div>

                  <button
                    onClick={() => onBookTrainer(t.id)}
                    className="bg-neon text-steel-black hover:bg-white hover:text-steel-black font-mono font-bold text-[10px] uppercase tracking-wider px-5 py-3 transition-luxury flex items-center gap-1 glow-btn"
                  >
                    Schedule Coaching <ChevronRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Dynamic Trainer Matcher Quiz */}
        <TrainerMatcher onBookTrainer={onBookTrainer} />

        {/* Dynamic Coach Proof Benchmarks */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4 p-6 bg-steel-low border border-steel-border/30">
          <div className="text-center p-4">
            <Award className="w-5 h-5 text-neon mx-auto mb-2" />
            <h5 className="font-display font-black text-white text-lg leading-none uppercase">100% Certified</h5>
            <span className="font-mono text-[8px] text-gray-500 block mt-1 tracking-widest uppercase">ACCREDITATION</span>
          </div>
          <div className="text-center p-4">
            <Shield className="w-5 h-5 text-neon mx-auto mb-2" />
            <h5 className="font-display font-black text-white text-lg leading-none uppercase">Military Grads</h5>
            <span className="font-mono text-[8px] text-gray-500 block mt-1 tracking-widest uppercase">TACTICAL DEPTS</span>
          </div>
          <div className="text-center p-4">
            <Cpu className="w-5 h-5 text-neon mx-auto mb-2" />
            <h5 className="font-display font-black text-white text-lg leading-none uppercase">Biometric Tracked</h5>
            <span className="font-mono text-[8px] text-gray-500 block mt-1 tracking-widest uppercase">KPI HARVESTING</span>
          </div>
          <div className="text-center p-4">
            <Flame className="w-5 h-5 text-neon mx-auto mb-2" />
            <h5 className="font-display font-black text-white text-lg leading-none uppercase">12K+ Total Session</h5>
            <span className="font-mono text-[8px] text-gray-500 block mt-1 tracking-widest uppercase">PROVEN EXCELLENCE</span>
          </div>
        </div>

      </div>
    </section>
  );
}
