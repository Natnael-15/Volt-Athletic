import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, TrendingUp, Users, Target, Shield, Award, Zap, X, ChevronDown } from 'lucide-react';
import heroImage from '@/src/assets/hero.jpeg';

interface HeroProps {
  onStartTraining: () => void;
  onViewMemberships: () => void;
  onViewClasses?: () => void;
}

export default function Hero({ onStartTraining, onViewMemberships, onViewClasses }: HeroProps) {
  const [showVideo, setShowVideo] = useState(false);

  // Quick statistics for luxury proof
  const stats = [
    { label: "Elite Athletes", value: "1,200+", icon: <Users className="w-4 h-4 text-neon" /> },
    { label: "PR Benchmark", value: "98.7%", icon: <TrendingUp className="w-4 h-4 text-neon" /> },
    { label: "Custom Programs", value: "24/7", icon: <Target className="w-4 h-4 text-neon" /> }
  ];

  const handleLearnMore = () => {
    if (onViewClasses) {
      onViewClasses();
    }
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-steel-black pt-20">
      
      {/* Background Cinematic Image - grayscale mix-blend-luminosity high contrast */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black/60 z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-steel-bg via-transparent to-black/80 z-10" />
        <img
          src={heroImage}
          alt="Athlete doing deadlifts"
          className="w-full h-full object-cover filter brightness-90 contrast-125 object-center grayscale select-none scale-105 pointer-events-none transition-all duration-1000"
          referrerPolicy="no-referrer"
        />
      </div>

      {/* Grid Pattern overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-15 pointer-events-none z-10" />

      {/* Content Container */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-6 md:px-12 py-20 flex flex-col justify-between items-center text-center">
        
        {/* Top Floating Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 bg-neon/10 border border-neon/30 px-4 py-1.5 uppercase font-mono text-[10px] tracking-[0.2em] text-neon mb-6"
        >
          <Zap className="w-3 h-3 text-neon fill-neon animate-pulse" />
          <span>Membership Access Program Unlocked</span>
        </motion.div>

        {/* Big Aggressive Typography Headings */}
        <div className="max-w-4xl space-y-4">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-display text-5xl sm:text-7xl md:text-8xl font-black uppercase tracking-tighter text-white leading-[0.9] text-center"
          >
            TRAIN WITH INTENT.
            <br />
            <span className="text-neon pointer-events-none italic drop-shadow-[0_0_20px_rgba(195,244,0,0.3)]">
              MOVE WITH POWER.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="font-sans text-gray-400 text-sm sm:text-base md:text-lg max-w-xl mx-auto tracking-wide font-normal"
          >
            A high-performance training club built for uncompromising athletes. Engineered biomechanics, elite personnel, clinical recovery standards.
          </motion.p>
        </div>

        {/* Call To Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto"
        >
          <button
            onClick={onStartTraining}
            className="w-full sm:w-auto bg-neon text-steel-black hover:bg-white hover:text-steel-black font-mono font-bold text-xs uppercase tracking-widest px-8 py-5 transition-luxury shadow-lg active:scale-95 duration-200"
          >
            Start Training Now
          </button>
          <button
            onClick={onViewMemberships}
            className="w-full sm:w-auto bg-transparent border border-gray-600 hover:border-white text-white font-mono font-semibold text-xs uppercase tracking-widest px-8 py-5 transition-luxury active:scale-95 duration-200"
          >
            View Memberships
          </button>
        </motion.div>

        {/* Floating Quick Feature Tickers */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="mt-16 w-full max-w-4xl grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-steel-border/30 pt-8"
        >
          {stats.map((stat, i) => (
            <div
              key={i}
              className="flex items-center gap-3 justify-center sm:justify-start p-4 hover:bg-steel-low/40 border border-transparent hover:border-steel-border/30 transition-luxury"
            >
              <div className="w-8 h-8 rounded-none border border-steel-border/50 flex items-center justify-center bg-steel-low/30">
                {stat.icon}
              </div>
              <div className="text-left">
                <p className="font-display font-black text-xl text-white tracking-widest uppercase mb-0.5 leading-none">
                  {stat.value}
                </p>
                <span className="font-mono text-[9px] text-gray-500 uppercase tracking-widest block leading-none">
                  {stat.label}
                </span>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Scroll indicator */}
        <motion.button
          onClick={handleLearnMore}
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="mt-12 text-gray-500 hover:text-neon transition-colors p-2 outline-none flex flex-col items-center gap-2 cursor-pointer"
        >
          <span className="font-mono text-[9px] uppercase tracking-widest">DISCOVER TRAINING CLASSES</span>
          <ChevronDown className="w-4 h-4" />
        </motion.button>
      </div>

      {/* Cinematic Teaser Video Frame Overlay */}
      <AnimatePresence>
        {showVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-6"
          >
            <button
              onClick={() => setShowVideo(false)}
              className="absolute top-6 right-6 text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-8 h-8" />
            </button>
            <div className="w-full max-w-4xl aspect-video border border-neon/50 bg-black flex flex-col items-center justify-center">
              <Zap className="w-12 h-12 text-neon animate-pulse mb-4" />
              <p className="font-mono text-neon text-sm tracking-widest">STREAMING CINEMATIC TEASER FEED LIVE</p>
              <p className="text-xs text-gray-500 mt-2">Simulated streaming secure server - 4K resolution benchmark</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
