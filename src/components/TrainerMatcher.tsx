import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Target, Shield, Flame, Activity, Brain, Compass, HelpCircle, CornerDownRight, Check, CheckCircle2, ChevronRight, UserCheck } from 'lucide-react';
import { TRAINERS_DATA } from '../data';

interface TrainerMatcherProps {
  onBookTrainer: (trainerId: string) => void;
}

export default function TrainerMatcher({ onBookTrainer }: TrainerMatcherProps) {
  const [step, setStep] = useState(1);
  const [goal, setGoal] = useState<string>('');
  const [stress, setStress] = useState<string>('');
  const [personality, setPersonality] = useState<string>('');
  const [isComputing, setIsComputing] = useState(false);
  const [computationMessage, setComputationMessage] = useState('');
  const [matchedId, setMatchedId] = useState<string | null>(null);
  const [compatibility, setCompatibility] = useState(0);

  const stepsCount = 3;

  const handleGoalSelect = (id: string) => {
    setGoal(id);
    setStep(2);
  };

  const handleStressSelect = (id: string) => {
    setStress(id);
    setStep(3);
  };

  const handlePersonalitySelect = (id: string) => {
    setPersonality(id);
    triggerComputation();
  };

  const triggerComputation = () => {
    setIsComputing(true);
    setStep(4);

    const messages = [
      "ACQUIRING BIOMEDICAL GOAL VECTOR...",
      "MAPPING MUSCLE FIBRE TYPE COMPOSITION...",
      "CALCULATING ANATOMICAL COMPATIBILITY RATIOS...",
      "SYNERGY OPTIMIZED."
    ];

    let msgIndex = 0;
    const interval = setInterval(() => {
      if (msgIndex < messages.length) {
        setComputationMessage(messages[msgIndex]);
        msgIndex++;
      } else {
        clearInterval(interval);
        determineMatch();
      }
    }, 600);
  };

  const determineMatch = () => {
    // Basic heuristic matcher
    let targetId = 'trainer-1'; // Default Marcus

    if (goal === 'endurance' || stress === 'recovery' || personality === 'scientific') {
      targetId = 'trainer-2'; // Elena
    } else if (goal === 'combat' || stress === 'plyo' || personality === 'speed') {
      targetId = 'trainer-3'; // Julian
    } else if (goal === 'strength' || stress === 'overload' || personality === 'military') {
      targetId = 'trainer-1'; // Marcus
    }

    // Generate high matching score (94% - 99%)
    const score = Math.floor(94 + Math.random() * 6);
    setMatchedId(targetId);
    setCompatibility(score);
    setIsComputing(false);
  };

  const resetMatcher = () => {
    setStep(1);
    setGoal('');
    setStress('');
    setPersonality('');
    setMatchedId(null);
    setCompatibility(0);
  };

  const matchedTrainer = TRAINERS_DATA.find(t => t.id === matchedId) || TRAINERS_DATA[0];

  return (
    <div className="bg-steel-low border border-steel-border/70 p-6 md:p-8 max-w-4xl mx-auto mt-16 relative overflow-hidden">
      
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-neon/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none" />

      {/* Header Info */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-steel-border/50 pb-6 mb-8 gap-4">
        <div>
          <span className="font-mono text-[9px] bg-neon-dark text-neon border border-neon/30 px-2 py-0.5 tracking-widest uppercase">
            Biokinetic Matching Engine V1.4
          </span>
          <h3 className="font-display text-2xl font-black uppercase tracking-wider text-white mt-2">
            COACH SYNERGY CALIBRATOR
          </h3>
        </div>
        
        {step <= stepsCount && (
          <div className="flex items-center gap-2">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className={`w-2.5 h-2.5 rotate-45 border transition-all duration-300 ${
                  s === step 
                    ? "bg-neon border-neon" 
                    : s < step 
                      ? "bg-steel-highest border-steel-border" 
                      : "bg-transparent border-steel-border"
                }`}
              />
            ))}
            <span className="font-mono text-[10px] text-gray-400 ml-2">STEP 0{step} OF 03</span>
          </div>
        )}
      </div>

      <AnimatePresence mode="wait">
        
        {/* STEP 1: SELECT PRIMARY TARGET GOAL */}
        {step === 1 && (
          <motion.div
            key="step-1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div>
              <h4 className="font-display text-lg font-bold text-white uppercase tracking-wide">
                1. SELECT YOUR DOMINANT PHYSICAL FOCUS TARGET:
              </h4>
              <p className="font-sans text-xs text-gray-500 mt-1">
                Your primary biomechanical objective guides the matching weights matrix.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button
                type="button"
                onClick={() => handleGoalSelect('strength')}
                className="group border border-steel-border/50 bg-[#0d0e0e]/40 p-5 text-left hover:border-neon transition-luxury flex flex-col justify-between h-42 cursor-pointer"
              >
                <div className="p-2 bg-neon-dark border border-neon/30 w-fit">
                  <Flame className="w-5 h-5 text-neon" />
                </div>
                <div>
                  <h5 className="font-display font-black text-white text-base uppercase group-hover:text-neon transition-colors leading-none mb-1.5">
                    RAW CNS POWER
                  </h5>
                  <p className="font-sans text-[11px] text-gray-400 leading-relaxed">
                    Heavy compound compression. Progressive absolute loads, mechanical hyperplasia, CNS conditioning.
                  </p>
                </div>
              </button>

              <button
                type="button"
                onClick={() => handleGoalSelect('endurance')}
                className="group border border-steel-border/50 bg-[#0d0e0e]/40 p-5 text-left hover:border-neon transition-luxury flex flex-col justify-between h-42 cursor-pointer"
              >
                <div className="p-2 bg-neon-dark border border-neon/30 w-fit">
                  <Activity className="w-5 h-5 text-neon" />
                </div>
                <div>
                  <h5 className="font-display font-black text-white text-base uppercase group-hover:text-neon transition-colors leading-none mb-1.5">
                    VO2 PEAK & RANGE
                  </h5>
                  <p className="font-sans text-[11px] text-gray-400 leading-relaxed">
                    Unyielding gas exchange, metabolic conditioning, structural joint restoration, anatomical length.
                  </p>
                </div>
              </button>

              <button
                type="button"
                onClick={() => handleGoalSelect('combat')}
                className="group border border-steel-border/50 bg-[#0d0e0e]/40 p-5 text-left hover:border-neon transition-luxury flex flex-col justify-between h-42 cursor-pointer"
              >
                <div className="p-2 bg-neon-dark border border-neon/30 w-fit">
                  <Brain className="w-5 h-5 text-neon" />
                </div>
                <div>
                  <h5 className="font-display font-black text-white text-base uppercase group-hover:text-neon transition-colors leading-none mb-1.5">
                    REFLEX & PLYOMETRIC
                  </h5>
                  <p className="font-sans text-[11px] text-gray-400 leading-relaxed">
                    Plyometric agility, reactive impact speed, deceleration control, striking mechanics.
                  </p>
                </div>
              </button>
            </div>
          </motion.div>
        )}

        {/* STEP 2: SELECT INTENDED TRAINING MODE */}
        {step === 2 && (
          <motion.div
            key="step-2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div>
              <h4 className="font-display text-lg font-bold text-white uppercase tracking-wide">
                2. SPECIFY CALIBRATION STRESS INTENSITY:
              </h4>
              <p className="font-sans text-xs text-gray-500 mt-1">
                Establish the physical threshold load coefficient you feel prepared to sustain.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button
                type="button"
                onClick={() => handleStressSelect('recovery')}
                className="group border border-steel-border/50 bg-[#0d0e0e]/40 p-5 text-left hover:border-neon transition-luxury flex flex-col justify-between h-42 cursor-pointer"
              >
                <span className="font-mono text-[9px] text-[#888] tracking-widest uppercase">LEVEL 01</span>
                <div>
                  <h5 className="font-display font-black text-white text-base uppercase group-hover:text-neon transition-colors leading-none mb-1.5">
                    KINETIC RESTORATION
                  </h5>
                  <p className="font-sans text-[11px] text-gray-400 leading-relaxed">
                    Kinesiological rehab. Controlled mechanical therapy, active tissue decompression, range enhancement.
                  </p>
                </div>
              </button>

              <button
                type="button"
                onClick={() => handleStressSelect('plyo')}
                className="group border border-steel-border/50 bg-[#0d0e0e]/40 p-5 text-left hover:border-neon transition-luxury flex flex-col justify-between h-42 cursor-pointer"
              >
                <span className="font-mono text-[9px] text-neon tracking-widest uppercase">LEVEL 02</span>
                <div>
                  <h5 className="font-display font-black text-white text-base uppercase group-hover:text-neon transition-colors leading-none mb-1.5">
                    METABOLIC OVERFLOW
                  </h5>
                  <p className="font-sans text-[11px] text-gray-400 leading-relaxed">
                    High metabolic fatigue. Controlled tempo blocks, interval heart spike conditioning formats.
                  </p>
                </div>
              </button>

              <button
                type="button"
                onClick={() => handleStressSelect('overload')}
                className="group border border-steel-border/50 bg-[#0d0e0e]/40 p-5 text-left hover:border-neon transition-luxury flex flex-col justify-between h-42 cursor-pointer"
              >
                <span className="font-mono text-[9px] text-volt-orange tracking-widest uppercase">LEVEL 03</span>
                <div>
                  <h5 className="font-display font-black text-white text-base uppercase group-hover:text-volt-orange transition-colors leading-none mb-1.5">
                    CENTRAL OVERLOAD
                  </h5>
                  <p className="font-sans text-[11px] text-gray-400 leading-relaxed">
                    Unyielding absolute overload. Exhaustive strength systems, operational pressure drills.
                  </p>
                </div>
              </button>
            </div>

            <button
              onClick={() => setStep(1)}
              className="text-xs font-mono text-gray-500 hover:text-white transition-colors"
            >
              ← RETURN TO GOALS
            </button>
          </motion.div>
        )}

        {/* STEP 3: DEMEANOR/PERSONALITY PREFERENCE */}
        {step === 3 && (
          <motion.div
            key="step-3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div>
              <h4 className="font-display text-lg font-bold text-white uppercase tracking-wide">
                3. PREFERRED COACHING ALIGNMENT DEMEANOR:
              </h4>
              <p className="font-sans text-xs text-gray-500 mt-1">
                Our specialists utilise distinct pedagogical styles. Choose your cognitive driver.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button
                type="button"
                onClick={() => handlePersonalitySelect('military')}
                className="group border border-steel-border/50 bg-[#0d0e0e]/40 p-5 text-left hover:border-neon transition-luxury flex flex-col justify-between h-42 cursor-pointer"
              >
                <div className="p-1.5 border border-steel-border bg-steel-low font-mono text-[8px] tracking-wider text-gray-400 w-fit">
                  DRILL TARGETING
                </div>
                <div>
                  <h5 className="font-display font-black text-white text-base uppercase group-hover:text-neon transition-colors leading-none mb-1.5">
                    TACTICAL DISCIPLINE
                  </h5>
                  <p className="font-sans text-[11px] text-gray-400 leading-relaxed">
                    Direct, unrelenting, tactical operational focus. Strict mechanical execution, no excuses structure.
                  </p>
                </div>
              </button>

              <button
                type="button"
                onClick={() => handlePersonalitySelect('scientific')}
                className="group border border-steel-border/50 bg-[#0d0e0e]/40 p-5 text-left hover:border-neon transition-luxury flex flex-col justify-between h-42 cursor-pointer"
              >
                <div className="p-1.5 border border-steel-border bg-steel-low font-mono text-[8px] tracking-wider text-gray-400 w-fit">
                  ANATOMICAL SCI
                </div>
                <div>
                  <h5 className="font-display font-black text-white text-base uppercase group-hover:text-neon transition-colors leading-none mb-1.5">
                    CLINICAL DEGREE BIOMECH
                  </h5>
                  <p className="font-sans text-[11px] text-gray-400 leading-relaxed">
                    Educational kinetic breakdown, heart rate zone science emphasis, injury-proofing kinesiology.
                  </p>
                </div>
              </button>

              <button
                type="button"
                onClick={() => handlePersonalitySelect('speed')}
                className="group border border-steel-border/50 bg-[#0d0e0e]/40 p-5 text-left hover:border-neon transition-luxury flex flex-col justify-between h-42 cursor-pointer"
              >
                <div className="p-1.5 border border-steel-border bg-steel-low font-mono text-[8px] tracking-wider text-gray-400 w-fit">
                  NEURAL IMPULSE
                </div>
                <div>
                  <h5 className="font-display font-black text-white text-base uppercase group-hover:text-neon transition-colors leading-none mb-1.5">
                    REACTION & DRIVES
                  </h5>
                  <p className="font-sans text-[11px] text-gray-400 leading-relaxed">
                    High speed rhythms, explosive feedback loops, agility mechanics, constant physical pacing.
                  </p>
                </div>
              </button>
            </div>

            <button
              onClick={() => setStep(2)}
              className="text-xs font-mono text-gray-500 hover:text-white transition-colors"
            >
              ← RETURN TO INTENSITY
            </button>
          </motion.div>
        )}

        {/* STEP 4: MATCHER GENERATING REPORT */}
        {step === 4 && (
          <motion.div
            key="step-4"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center py-10 text-center"
          >
            {isComputing ? (
              <div className="space-y-6">
                <div className="relative w-16 h-16 mx-auto">
                  <div className="absolute inset-0 rounded-full border-2 border-neon/20" />
                  <div className="absolute inset-0 rounded-full border-2 border-t-neon animate-spin" />
                </div>
                
                <div className="space-y-2">
                  <p className="font-mono text-xs text-neon tracking-widest uppercase animate-pulse">
                    {computationMessage}
                  </p>
                  <p className="text-[10px] font-mono text-gray-500">
                    MATCHING BIOENGINEERING MATRIX CORRELATION INDEX...
                  </p>
                </div>
              </div>
            ) : (
              // MATCH OUTPUT DISPLAYED beautifully
              <div className="w-full space-y-8">
                
                {/* Visual success banner */}
                <div className="bg-neon/10 border border-neon/30 p-4 max-w-xl mx-auto flex items-center justify-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-neon" />
                  <span className="font-mono text-xs font-bold text-white uppercase tracking-wider">
                    COMPUTATION SUCCESSFUL: ATHLETIC COHORT CALIBRATED
                  </span>
                </div>

                {/* Match Card Grid Detail */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 bg-steel-black/40 border border-steel-border p-6 text-left max-w-3xl mx-auto items-stretch">
                  
                  {/* Photo Left */}
                  <div className="md:col-span-4 h-64 md:h-auto overflow-hidden relative border border-steel-border/50 bg-steel-low">
                    <img
                      src={matchedTrainer.imgUrl}
                      alt={matchedTrainer.name}
                      className="w-full h-full object-cover filter grayscale contrast-115 object-top"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute bottom-4 left-4 z-20">
                      <span className="font-mono text-[9px] bg-neon text-black px-2 py-0.5 font-bold">
                        MATCH SCORE: {compatibility}%
                      </span>
                    </div>
                  </div>

                  {/* Info Right */}
                  <div className="md:col-span-8 flex flex-col justify-between space-y-4 pt-2 md:pt-0">
                    <div>
                      <div className="flex justify-between items-baseline mb-1">
                        <h4 className="font-display text-2xl font-black text-white uppercase tracking-wider">
                          {matchedTrainer.name}
                        </h4>
                        <span className="font-mono text-[9px] text-neon uppercase">OPTIMIZED COHORT</span>
                      </div>
                      <span className="font-mono text-xs text-neon uppercase block tracking-wider leading-none mb-3">
                        {matchedTrainer.specialty}
                      </span>
                      
                      <p className="font-sans text-xs text-gray-400 leading-relaxed">
                        {matchedTrainer.bio}
                      </p>

                      <div className="flex flex-wrap gap-1 mt-4">
                        {matchedTrainer.skills.map((skill, si) => (
                          <div
                            key={si}
                            className="bg-zinc-950 px-2 py-1 border border-steel-border text-[9px] font-mono text-gray-300 uppercase flex items-center gap-1.5"
                          >
                            <span className="w-1 h-1 bg-neon rounded-full" />
                            {skill}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-4 border-t border-steel-border/30 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                      <div className="text-[10px] font-mono text-gray-500">
                        <CornerDownRight className="w-3.5 h-3.5 inline mr-1 text-neon" />
                        <span>PRE-CALED SYSTEM IN TAKE READY</span>
                      </div>

                      <div className="flex gap-2 w-full sm:w-auto">
                        <button
                          type="button"
                          onClick={resetMatcher}
                          className="px-4 py-2 bg-transparent hover:bg-steel-high border border-steel-border text-gray-400 hover:text-white font-mono text-[10px] uppercase duration-200 cursor-pointer"
                        >
                          Retry Quiz
                        </button>
                        <button
                          type="button"
                          onClick={() => onBookTrainer(matchedTrainer.id)}
                          className="px-5 py-2 bg-neon text-black font-mono font-bold text-[10px] uppercase hover:bg-white tracking-wider duration-200 cursor-pointer"
                        >
                          Book Coach Session
                        </button>
                      </div>
                    </div>

                  </div>
                </div>

              </div>
            )}
          </motion.div>
        )}

      </AnimatePresence>

    </div>
  );
}
