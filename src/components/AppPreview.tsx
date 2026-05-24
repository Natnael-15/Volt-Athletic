import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Smartphone, Activity, Heart, Flame, ShieldAlert, Cpu, Sparkles, 
  Play, Pause, RefreshCw, BarChart2, Bell, Dumbbell, Award, Plus, Trash2, CheckCircle2 
} from 'lucide-react';

interface PRLog {
  id: string;
  date: string;
  lift: string;
  weight: number;
}

export default function AppPreview() {
  const [activeTab, setActiveTab] = useState<'biometrics' | 'workouts' | 'booking'>('biometrics');

  // Biometrics form states
  const [weight, setWeight] = useState<number>(82); // kg
  const [height, setHeight] = useState<number>(180);  // cm
  const [rhr, setRhr] = useState<number>(60);       // resting heart rate
  const [trainingFreq, setTrainingFreq] = useState<number>(5); // hours/week
  
  // Real-time calculated telemetry values
  const [vo2Max, setVo2Max] = useState<number>(49.0);
  const [bmr, setBmr] = useState<number>(1840);
  const [nutriRegime, setNutriRegime] = useState<'hypertrophy' | 'endurance' | 'metabolic'>('hypertrophy');
  const [syncAlert, setSyncAlert] = useState<boolean>(false);
  
  // PR list states
  const [prs, setPrs] = useState<PRLog[]>([
    { id: '1', date: 'May 10', lift: 'Squat', weight: 140 },
    { id: '2', date: 'May 14', lift: 'Bench', weight: 100 },
    { id: '3', date: 'May 18', lift: 'Deadlift', weight: 180 },
    { id: '4', date: 'May 22', lift: 'Squat', weight: 150 }
  ]);
  const [newLift, setNewLift] = useState<string>('Squat');
  const [newWeight, setNewWeight] = useState<number>(140);
  const [newDate, setNewDate] = useState<string>('May 23');

  // Interactive Workout Timer States inside Phone
  const [timerVal, setTimerVal] = useState(270); // 4m 30s initial state
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  // Interactive Heart Rate state inside Phone
  const [heartRate, setHeartRate] = useState(128);
  const [simulationSpeed, setSimulationSpeed] = useState('medium');

  // Recalculate BMR & VO2 Max on input changes
  useEffect(() => {
    // Estimating VO2 Max using Cooper formula heuristic for Resting Heart Rate
    // VO2 Max ≈ 15.3 * (HRmax / HRrest). Assume HRmax is 194.
    const hrmax = 194;
    const estVo2 = 15.3 * (hrmax / rhr) + (trainingFreq * 0.4);
    setVo2Max(parseFloat(estVo2.toFixed(1)));

    // BMR (Harris-Benedict metric formula)
    // Men: BMR = 66.5 + (13.75 * Weight in kg) + (5.003 * Height in cm) - (6.75 * age 28)
    const estBmr = Math.floor(66.5 + (13.75 * weight) + (5.003 * height) - (6.75 * 28));
    setBmr(estBmr);
  }, [weight, height, rhr, trainingFreq]);

  // Sync animation
  const handleSyncToPhone = () => {
    setSyncAlert(true);
    setTimeout(() => setSyncAlert(false), 3000);
  };

  // Add a new personal record lift
  const handleAddPR = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newWeight) return;
    const item: PRLog = {
      id: Math.random().toString(),
      date: newDate,
      lift: newLift,
      weight: newWeight
    };
    setPrs(prev => [...prev, item]);
    setNewWeight(0);
  };

  const handleDeletePR = (id: string) => {
    setPrs(prev => prev.filter(p => p.id !== id));
  };

  // Cycle simulation heart rate
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (simulationSpeed !== 'off') {
      const baseHz = simulationSpeed === 'high' ? 162 : simulationSpeed === 'low' ? 74 : 124;
      interval = setInterval(() => {
        // add small random walk matching real physiological curves
        const delta = Math.floor(Math.random() * 5) - 2;
        setHeartRate(prev => {
          const newVal = prev + delta;
          const minLimit = baseHz - 8;
          const maxLimit = baseHz + 8;
          if (newVal < minLimit) return minLimit;
          if (newVal > maxLimit) return maxLimit;
          return newVal;
        });
      }, 700);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [simulationSpeed]);

  // Interval timer count down
  useEffect(() => {
    let timerInter: NodeJS.Timeout | null = null;
    if (isTimerRunning) {
      timerInter = setInterval(() => {
        setTimerVal(prev => {
          if (prev <= 1) {
            setIsTimerRunning(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (timerInter) clearInterval(timerInter);
    };
  }, [isTimerRunning]);

  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Macros target calculation
  const getMacros = () => {
    switch (nutriRegime) {
      case 'endurance':
        return {
          carbs: Math.floor((bmr * 0.60) / 4),
          protein: Math.floor((bmr * 0.20) / 4),
          fats: Math.floor((bmr * 0.20) / 9)
        };
      case 'metabolic':
        return {
          carbs: Math.floor((bmr * 0.15) / 4),
          protein: Math.floor((bmr * 0.45) / 4),
          fats: Math.floor((bmr * 0.40) / 9)
        };
      default: // hypertrophy
        return {
          carbs: Math.floor((bmr * 0.45) / 4),
          protein: Math.floor((bmr * 0.35) / 4),
          fats: Math.floor((bmr * 0.20) / 9)
        };
    }
  };

  const macros = getMacros();

  // Create SVG points coordinates for the PR log chart
  const getPrChartDataPoints = () => {
    if (prs.length === 0) return '';
    const width = 360;
    const height = 120;
    const padding = 20;

    const maxWeight = Math.max(...prs.map(p => p.weight), 100);
    const minWeight = Math.min(...prs.map(p => p.weight), 0);

    const range = maxWeight - minWeight || 1;

    return prs.map((pr, i) => {
      const x = padding + (i / (prs.length - 1 || 1)) * (width - padding * 2);
      const y = height - padding - ((pr.weight - minWeight) / range) * (height - padding * 2);
      return `${x},${y}`;
    }).join(' ');
  };

  const pointsStr = getPrChartDataPoints();

  return (
    <section id="app-preview" className="py-24 bg-steel-bg text-gray-200 relative overflow-hidden border-t border-steel-border/20">
      
      {/* Background radial gradient decoration */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-80 h-80 bg-neon/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 space-y-16">
        
        {/* Intro Header */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="font-mono text-xs tracking-widest text-neon uppercase block mb-1">Interactive Telemetry Suite</span>
          <h2 className="font-display text-4xl sm:text-6xl font-black uppercase tracking-tighter text-white">
            BIOMETRIC TELEMETRY ENVIRONMENT
          </h2>
          <p className="font-sans text-sm text-gray-400 mt-4 leading-relaxed mx-auto max-w-2xl">
            Volt's V-LOG architecture connects directly to your physical biokinetics. Use the Diagnostic panel below to input your medical data, check performance curves, and witness direct synchronizations inside the companion mockup.
          </p>
        </div>

        {/* Sync Status Toast Alert */}
        <AnimatePresence>
          {syncAlert && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="fixed top-24 left-1/2 -translate-x-1/2 z-100 bg-neon border border-neon text-black font-mono font-bold text-xs px-6 py-3 shadow-lg flex items-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4 text-black shrink-0" />
              <span>V-LOG TRANSCEIVER UPDATE: MOBILE VAULT METRICS SYNCED</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 3 Content Blocks Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          
          {/* PANEL 1: Diagnostic inputs (Left side / 4 columns) */}
          <div className="lg:col-span-4 bg-steel-low border border-steel-border/50 p-6 flex flex-col justify-between space-y-6">
            <div className="space-y-6">
              <div className="flex items-center gap-2 pb-4 border-b border-steel-border/30">
                <Cpu className="w-5 h-5 text-neon" />
                <h3 className="font-display font-bold text-white uppercase text-base">
                  BIOMETRIC DIAGNOSTATIC LAB
                </h3>
              </div>

              {/* Input Forms */}
              <div className="space-y-4 text-xs font-mono">
                <div>
                  <label className="text-gray-400 block mb-1.5 uppercase">ATHLETIC WEIGHT (KG):</label>
                  <input
                    type="number"
                    value={weight}
                    onChange={(e) => setWeight(parseInt(e.target.value) || 0)}
                    className="w-full bg-steel-black border border-steel-border/70 p-2.5 text-white font-mono focus:outline-none focus:border-neon focus:ring-1 focus:ring-neon rounded-none"
                    min="35"
                    max="220"
                  />
                </div>

                <div>
                  <label className="text-gray-400 block mb-1.5 uppercase">HEIGHT SPEC (CM):</label>
                  <input
                    type="number"
                    value={height}
                    onChange={(e) => setHeight(parseInt(e.target.value) || 0)}
                    className="w-full bg-steel-black border border-steel-border/70 p-2.5 text-white font-mono focus:outline-none focus:border-neon focus:ring-1 focus:ring-neon rounded-none"
                    min="100"
                    max="250"
                  />
                </div>

                <div>
                  <label className="text-gray-400 block mb-1.5 uppercase">RESTING HEART RATE (BPM):</label>
                  <input
                    type="number"
                    value={rhr}
                    onChange={(e) => setRhr(parseInt(e.target.value) || 0)}
                    className="w-full bg-steel-black border border-steel-border/70 p-2.5 text-white font-mono focus:outline-none focus:border-neon focus:ring-1 focus:ring-neon rounded-none"
                    min="35"
                    max="110"
                  />
                </div>

                <div>
                  <label className="text-gray-400 block mb-1.5 uppercase">TRAINING INTENSITY (HRS/WEEK):</label>
                  <input
                    type="number"
                    value={trainingFreq}
                    onChange={(e) => setTrainingFreq(parseInt(e.target.value) || 0)}
                    className="w-full bg-steel-black border border-steel-border/70 p-2.5 text-white font-mono focus:outline-none focus:border-neon focus:ring-1 focus:ring-neon rounded-none"
                    min="1"
                    max="30"
                  />
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-steel-border/30 space-y-4">
              <div className="bg-steel-black/50 border border-steel-border/40 p-4 text-xs font-mono space-y-2">
                <span className="text-gray-500 block uppercase text-[10px]">Real-time Calculation Index</span>
                <div className="flex justify-between">
                  <span className="text-gray-400">ESTIMATED VO2 MAX:</span>
                  <span className="text-neon">{vo2Max} ml/kg</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">DAILY METABOLIC BMR:</span>
                  <span className="text-white">{bmr} KCAL</span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleSyncToPhone}
                className="w-full bg-neon hover:bg-white text-black font-mono font-bold text-xs py-3.5 uppercase tracking-wider transition-luxury flex items-center justify-center gap-2"
              >
                <Activity className="w-4 h-4 animate-pulse" />
                <span>Save & Sync To Phone</span>
              </button>
            </div>
          </div>

          {/* PANEL 2: Interactive Faux Phone Simulator (Center / 4 columns) */}
          <div className="lg:col-span-4 flex justify-center">
            
            <div className="relative w-full max-w-[340px] bg-zinc-950 rounded-[44px] p-3.5 border-4 border-zinc-900 shadow-2xl overflow-hidden aspect-[9/19] h-[580px]">
              
              {/* Speaker Grille/Camera Notch cutout */}
              <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-32 h-5 bg-black rounded-full z-30 flex justify-center items-center">
                <div className="w-10 h-1 bg-zinc-800 rounded-full" />
                <div className="w-2 h-2 bg-zinc-900 rounded-full ml-3 border border-zinc-800" />
              </div>

              {/* Simulated Live Interface inside screen */}
              <div className="relative bg-[#050505] w-full h-full rounded-[34px] overflow-hidden p-4 flex flex-col justify-between pt-6 text-white border border-zinc-900">
                
                {/* Dynamic Header */}
                <div className="flex justify-between items-center border-b border-steel-border/20 pb-2.5 mb-3">
                  <div>
                    <span className="font-mono text-[8px] text-gray-500 block leading-none">MEMBER PORTAL</span>
                    <p className="font-display font-black text-xs tracking-widest text-white leading-none mt-1">VOLT MONITOR</p>
                  </div>
                  <div className="flex gap-2">
                    <div className="w-6 h-6 bg-zinc-900 border border-steel-border/50 rounded-full flex items-center justify-center relative">
                      <Bell className="w-3 h-3 text-neon" />
                      <span className="absolute top-0 right-0 w-1 h-1 bg-neon rounded-full" />
                    </div>
                  </div>
                </div>

                {/* Tab Selector Links */}
                <div className="grid grid-cols-3 gap-1 bg-zinc-900/60 border border-steel-border/30 p-1 mb-3">
                  <button
                    type="button"
                    onClick={() => setActiveTab('biometrics')}
                    className={`py-1 text-[8px] font-mono uppercase tracking-wider text-center transition-luxury cursor-pointer ${
                      activeTab === 'biometrics' ? 'bg-steel-high text-white' : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    TELEM
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('workouts')}
                    className={`py-1 text-[8px] font-mono uppercase tracking-wider text-center transition-luxury cursor-pointer ${
                      activeTab === 'workouts' ? 'bg-steel-high text-white' : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    TRACKER
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('booking')}
                    className={`py-1 text-[8px] font-mono uppercase tracking-wider text-center transition-luxury cursor-pointer ${
                      activeTab === 'booking' ? 'bg-steel-high text-white' : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    CABIN
                  </button>
                </div>

                {/* Tab Views content area */}
                <div className="flex-grow flex flex-col justify-between mb-3 overflow-y-auto scrollbar-hidden">
                  
                  {/* 1. BIOMETRIC TAB */}
                  {activeTab === 'biometrics' && (
                    <div className="space-y-4 flex-grow flex flex-col justify-between text-left">
                      {/* Live Heart Grid */}
                      <div className="p-3 bg-zinc-900/60 border border-steel-border/40 rounded-none flex items-center justify-between">
                        <div>
                          <span className="font-mono text-[7px] text-gray-500 uppercase">HEART RATE SYSTEM</span>
                          <div className="flex items-baseline gap-1 mt-1">
                            <span className="font-mono text-2xl font-black text-white leading-none">
                              {heartRate}
                            </span>
                            <span className="font-mono text-[8px] text-red-500 uppercase leading-none">BPM</span>
                          </div>
                        </div>
                        <div className="flex flex-col items-center">
                          <Heart className="w-5 h-5 text-red-500 fill-red-500 animate-pulse" />
                          <span className="font-mono text-[7px] text-red-400 mt-1 uppercase">HYPER FLUX</span>
                        </div>
                      </div>

                      {/* Simulation Controllers */}
                      <div className="p-2.5 bg-zinc-900/30 border border-steel-border/30 rounded-none">
                        <span className="font-mono text-[7px] text-gray-400 uppercase tracking-wider block mb-1.5">
                          Simulate Workout Strain:
                        </span>
                        <div className="grid grid-cols-3 gap-1">
                          {['low', 'medium', 'high'].map((speed) => (
                            <button
                              key={speed}
                              onClick={() => setSimulationSpeed(speed)}
                              className={`py-1 text-[7px] font-mono uppercase rounded-none border cursor-pointer ${
                                simulationSpeed === speed
                                  ? 'bg-neon text-black border-neon font-bold'
                                  : 'bg-transparent border-steel-border text-gray-400'
                              }`}
                            >
                              {speed}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* VO2 Max stats */}
                      <div className="p-3 bg-zinc-900/50 border border-steel-border/40 rounded-none space-y-2">
                        <div className="flex justify-between text-[8px] font-mono">
                          <span className="text-gray-500">VO2 METRICS PEAK</span>
                          <span className="text-neon">{vo2Max} ml/kg/m</span>
                        </div>
                        <div className="w-full bg-zinc-800 h-1 rounded-none overflow-hidden">
                          <div className="bg-neon h-full transition-all duration-300" style={{ width: `${Math.min(vo2Max * 1.5, 100)}%` }} />
                        </div>
                        <p className="text-[8px] font-sans text-gray-500 italic leading-snug">
                          Your calculated aerobic threshold represents top {Math.max(1, 15 - Math.floor(vo2Max / 4))}% classification globally.
                        </p>
                      </div>
                    </div>
                  )}

                  {/* 2. WORKOUT TRACKERS TAB */}
                  {activeTab === 'workouts' && (
                    <div className="space-y-4 flex-grow flex flex-col justify-between text-left">
                      
                      {/* Calories Grid Progress Rings */}
                      <div className="p-3 bg-zinc-900/60 border border-steel-border/40 rounded-none flex items-center justify-around text-center">
                        <div>
                          <span className="font-mono text-[7px] text-gray-500 uppercase block">ACTIVE BMR TARGET</span>
                          <div className="flex items-baseline justify-center gap-0.5 mt-1">
                            <span className="font-mono text-xl font-black text-white leading-none">
                              {bmr}
                            </span>
                            <span className="font-mono text-[8px] text-neon uppercase leading-none">KCAL</span>
                          </div>
                        </div>

                        <div className="w-10 h-10 rounded-full border-2 border-steel-border flex items-center justify-center relative">
                          <div className="absolute inset-0 rounded-full border-2 border-neon border-t-transparent animate-spin-slow" />
                          <span className="font-mono text-[8px] text-white">100%</span>
                        </div>
                      </div>

                      {/* Interactive Active Interval Timer */}
                      <div className="p-3 bg-zinc-900 border border-steel-border/60 rounded-none flex flex-col items-center">
                        <span className="font-mono text-[8px] text-neon uppercase tracking-wider mb-1">
                          SPRINT RUNNER INTERVALS
                        </span>
                        <div className="font-mono text-2xl font-black text-white tracking-widest leading-none my-1.5 font-black">
                          {formatTime(timerVal)}
                        </div>

                        {/* Timer controls */}
                        <div className="flex gap-1.5 mt-1.5 w-full">
                          <button
                            onClick={() => setIsTimerRunning(!isTimerRunning)}
                            className={`flex-grow py-1 text-[8px] font-mono uppercase bg-neon text-black font-bold flex items-center justify-center gap-1 cursor-pointer`}
                          >
                            {isTimerRunning ? <Pause className="w-2.5 h-2.5 fill-black" /> : <Play className="w-2.5 h-2.5 fill-black" />}
                            <span>{isTimerRunning ? 'PAUSE' : 'START CLK'}</span>
                          </button>
                          <button
                            onClick={() => {
                              setIsTimerRunning(false);
                              setTimerVal(270);
                            }}
                            className="p-1.5 bg-zinc-800 text-gray-400 hover:text-white cursor-pointer"
                            aria-label="Reset timer"
                          >
                            <RefreshCw className="w-2.5 h-2.5" />
                          </button>
                        </div>
                      </div>

                      {/* Historical logs list */}
                      <div className="p-2.5 bg-zinc-900/30 rounded-none border border-steel-border/30 text-[7px] font-mono space-y-1">
                        <p className="text-gray-400 uppercase tracking-widest font-black mb-1">SYNC DIET PROFILE:</p>
                        <p className="flex justify-between text-gray-400">
                          <span>• CARB LOADING REGIME</span>
                          <span className="text-white font-bold">{macros.carbs}G</span>
                        </p>
                        <p className="flex justify-between text-gray-400">
                          <span>• AMINO ACID MATRIX</span>
                          <span className="text-neon">{macros.protein}G</span>
                        </p>
                      </div>
                    </div>
                  )}

                  {/* 3. BOOKING TAB */}
                  {activeTab === 'booking' && (
                    <div className="space-y-4 flex-grow flex flex-col justify-between text-left">
                      <span className="font-mono text-[7px] text-gray-500 uppercase block text-center">UPCOMING ACCESS TRACKER</span>
                      
                      <div className="p-3 bg-zinc-900/80 border-l-2 border-neon text-left space-y-1">
                        <span className="font-mono text-[7px] text-neon bg-neon-dark px-1.5 py-0.5">VAULT SYNC</span>
                        <h5 className="font-display font-black text-white text-xs uppercase leading-tight">HEAVY METALS COHORT</h5>
                        <p className="font-mono text-[7px] text-gray-400">COACH ALEX S. • S-GRID 02</p>
                      </div>

                      {/* Static Quick Locks state */}
                      <div className="p-3 bg-zinc-900/40 border border-steel-border/50 text-left space-y-1.5 text-[8px] font-mono">
                        <p className="text-white uppercase tracking-wider font-bold">SMART LOCKER STATUS:</p>
                        <div className="flex justify-between text-gray-400">
                          <span>• CABIN LOCKER 048</span>
                          <span className="text-neon">[PAIRED & VACANT]</span>
                        </div>
                        <div className="flex justify-between text-gray-400">
                          <span>• RECOVERY CHAMBER</span>
                          <span className="text-neon">[UNLOCKED AT 18:45]</span>
                        </div>
                      </div>
                    </div>
                  )}

                </div>

                {/* Bottom Faux iOS Bar */}
                <div className="w-full bg-zinc-900 h-8 border-t border-steel-border/20 flex items-center justify-around shrink-0">
                  <div className="w-1.5 h-1.5 bg-neon rounded-full" />
                  <div className="w-8 h-1 bg-zinc-700 rounded-full" />
                  <div className="w-1.5 h-1.5 bg-zinc-800 rounded-full" />
                </div>

              </div>

            </div>

          </div>

          {/* PANEL 3: Nutrition & Fuel customiser (Right side / 4 columns) */}
          <div className="lg:col-span-4 bg-steel-low border border-steel-border/50 p-6 flex flex-col justify-between space-y-6">
            <div className="space-y-6">
              <div className="flex items-center gap-2 pb-4 border-b border-steel-border/30">
                <Flame className="w-5 h-5 text-neon" />
                <h3 className="font-display font-bold text-white uppercase text-base">
                  PERFORMANCE FUEL PLANNER
                </h3>
              </div>

              {/* Nutrition Mode Toggles */}
              <div className="space-y-3">
                <label className="block text-[10px] font-mono text-gray-400 uppercase">SPECIFY METABOLIC TARGET:</label>
                <div className="grid grid-cols-1 gap-2">
                  <button
                    type="button"
                    onClick={() => setNutriRegime('hypertrophy')}
                    className={`p-3 text-left border font-mono text-[11px] uppercase duration-200 cursor-pointer ${
                      nutriRegime === 'hypertrophy'
                        ? "border-neon text-neon bg-neon-dark/30"
                        : "border-steel-border/40 text-gray-400 hover:border-gray-500"
                    }`}
                  >
                    <span>ANABOLIC MASS HYPERPLASIA</span>
                    <span className="block text-[8px] text-gray-500 mt-1">High glycogen loaders & complex proteins.</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setNutriRegime('endurance')}
                    className={`p-3 text-left border font-mono text-[11px] uppercase duration-200 cursor-pointer ${
                      nutriRegime === 'endurance'
                        ? "border-neon text-neon bg-neon-dark/30"
                        : "border-steel-border/40 text-gray-400 hover:border-gray-500"
                    }`}
                  >
                    <span>VO2 ENDURO-CARB DRIFT</span>
                    <span className="block text-[8px] text-gray-500 mt-1">60% high-burn carbohydrate energy clusters.</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setNutriRegime('metabolic')}
                    className={`p-3 text-left border font-mono text-[11px] uppercase duration-200 cursor-pointer ${
                      nutriRegime === 'metabolic'
                        ? "border-neon text-neon bg-neon-dark/30"
                        : "border-steel-border/40 text-gray-400 hover:border-gray-500"
                    }`}
                  >
                    <span>METABOLIC STRIP & KETOGENESIS</span>
                    <span className="block text-[8px] text-gray-500 mt-1">Lean protein spikes combined with healthy lipid chains.</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Calculations outputs */}
            <div className="pt-4 border-t border-steel-border/30 text-xs font-mono space-y-3">
              <span className="text-gray-500 block uppercase text-[10px]">Macro Allocation targets</span>
              
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="p-2.5 bg-steel-black/40 border border-steel-border/55">
                  <span className="text-neon font-black block text-sm leading-none">{macros.carbs}G</span>
                  <span className="text-[7.5px] text-gray-500 block mt-1 uppercase">CARBS</span>
                </div>
                <div className="p-2.5 bg-steel-black/40 border border-steel-border/55">
                  <span className="text-white font-black block text-sm leading-none">{macros.protein}G</span>
                  <span className="text-[7.5px] text-gray-500 block mt-1 uppercase">PROTEIN</span>
                </div>
                <div className="p-2.5 bg-steel-black/40 border border-steel-border/55">
                  <span className="text-white font-black block text-sm leading-none">{macros.fats}G</span>
                  <span className="text-[7.5px] text-gray-500 block mt-1 uppercase">LIPIDS</span>
                </div>
              </div>

              <div className="text-[10px] text-gray-500 leading-snug font-sans p-1">
                * Syncing this profile locks dietary variables directly inside your V-Log Tracker tab under historical dietary data.
              </div>
            </div>
          </div>

        </div>

        {/* Dynamic PR Progression Logger & SVG Graph Below */}
        <div className="pt-12 border-t border-steel-border/30">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
            
            {/* Form list Left */}
            <div className="md:col-span-5 space-y-6">
              <div>
                <span className="font-mono text-xs text-neon uppercase block">Continuous progression logs</span>
                <h3 className="font-display font-black text-white text-xl uppercase tracking-wider mt-1">
                  HISTORICAL LIFT tracker
                </h3>
                <p className="font-sans text-xs text-gray-500 mt-2">
                  Input your heaviest successfully completed sets below to populate the kinetic growth progression curve.
                </p>
              </div>

              {/* Form Input */}
              <form onSubmit={handleAddPR} className="p-4 bg-steel-low border border-steel-border/50 grid grid-cols-3 gap-2 items-end">
                <div>
                  <label className="block text-[8px] font-mono text-gray-400 uppercase mb-1">LIFT TYPE:</label>
                  <select
                    value={newLift}
                    onChange={(e) => setNewLift(e.target.value)}
                    className="w-full bg-steel-black border border-steel-border text-white font-mono text-xs p-2 focus:outline-none focus:border-neon rounded-none"
                  >
                    <option value="Squat">SQUAT</option>
                    <option value="Bench">BENCH</option>
                    <option value="Deadlift">DEADLIFT</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[8px] font-mono text-gray-400 uppercase mb-1">WT (KG):</label>
                  <input
                    type="number"
                    value={newWeight || ''}
                    onChange={(e) => setNewWeight(parseInt(e.target.value) || 0)}
                    placeholder="kg"
                    className="w-full bg-steel-black border border-steel-border text-white font-mono text-xs p-2 focus:outline-none focus:border-neon rounded-none"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="bg-neon h-9 text-black hover:bg-white font-serif italic text-xs font-bold uppercase transition-luxury flex items-center justify-center cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </form>

              {/* Personal Records logs list */}
              <div className="max-h-48 overflow-y-auto space-y-1.5 scrollbar-hidden">
                {prs.map((pr) => (
                  <div
                    key={pr.id}
                    className="p-3 bg-steel-black/30 border border-steel-border/40 hover:border-gray-600 transition-colors flex justify-between items-center text-xs font-mono"
                  >
                    <div className="flex gap-4">
                      <span className="text-gray-500">{pr.date}</span>
                      <span className="text-white font-bold uppercase">{pr.lift}</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-neon font-black">{pr.weight} KG</span>
                      <button
                        type="button"
                        onClick={() => handleDeletePR(pr.id)}
                        className="text-gray-600 hover:text-red-400 transition-colors p-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Custom Interactive SVG progression chart Right */}
            <div className="md:col-span-7 bg-steel-low border border-steel-border/50 p-6 flex flex-col justify-between h-[360px]">
              <div>
                <span className="font-mono text-[9px] text-neon uppercase">Tactical load metrics visualizer</span>
                <h4 className="font-display font-bold text-white uppercase text-base mt-1">
                  KINETIC GROWTH PROGRESSION
                </h4>
              </div>

              {/* Dynamic SVG graph container */}
              <div className="w-full bg-steel-black border border-steel-border/40 h-48 py-4 relative flex items-center justify-center">
                
                {prs.length < 2 ? (
                  <div className="font-mono text-xs text-gray-500 tracking-wider">
                    INPUT 2 OR MORE RECORDS TO ACTIVATE CHART GRAPH
                  </div>
                ) : (
                  <div className="w-full h-full px-4">
                    <svg
                      viewBox="0 0 360 120"
                      className="w-full h-full overflow-visible"
                    >
                      {/* Grid background lines */}
                      <line x1="20" y1="20" x2="340" y2="20" stroke="#1c1c1e" strokeWidth="1" />
                      <line x1="20" y1="60" x2="340" y2="60" stroke="#1c1c1e" strokeWidth="1" />
                      <line x1="20" y1="100" x2="340" y2="100" stroke="#1c1c1e" strokeWidth="1" />

                      {/* Line graph line */}
                      <polyline
                        fill="none"
                        stroke="#ccff00"
                        strokeWidth="2.5"
                        points={pointsStr}
                        className="transition-all duration-300"
                      />

                      {/* Data Dots */}
                      {prs.map((pr, idx) => {
                        const widthObj = 360;
                        const heightObj = 120;
                        const paddingObj = 20;
                        const maxWeight = Math.max(...prs.map(p => p.weight), 100);
                        const minWeight = Math.min(...prs.map(p => p.weight), 0);
                        const range = maxWeight - minWeight || 1;
                        const x = paddingObj + (idx / (prs.length - 1 || 1)) * (widthObj - paddingObj * 2);
                        const y = heightObj - paddingObj - ((pr.weight - minWeight) / range) * (heightObj - paddingObj * 2);

                        return (
                          <g key={idx} className="group-hover:scale-125 transition-transform duration-200">
                            <circle
                              cx={x}
                              cy={y}
                              r="4.5"
                              fill="#ccff00"
                            />
                            <circle
                              cx={x}
                              cy={y}
                              r="8"
                              fill="transparent"
                              stroke="#ccff00"
                              strokeWidth="1.5"
                              className="animate-ping opacity-25"
                            />
                            {/* Hover tooltip */}
                            <text
                              x={x}
                              y={y - 10}
                              fill="#ffffff"
                              fontSize="8"
                              fontFamily="monospace"
                              textAnchor="middle"
                              className="font-bold opacity-0 hover:opacity-100 transition-opacity bg-zinc-950 px-1 py-0.5"
                            >
                              {pr.weight}kg
                            </text>
                          </g>
                        );
                      })}
                    </svg>
                  </div>
                )}
              </div>

              {/* Chart metadata legend */}
              <div className="grid grid-cols-2 gap-4 text-[10px] font-mono border-t border-steel-border/30 pt-4 text-gray-500">
                <div>
                  <span className="text-white block uppercase">COACH TIP (MARCUS V.):</span>
                  <span className="font-sans leading-relaxed block mt-0.5">
                    "Consistent force generation triggers neurological myofibril recruitment. Avoid plateaus by forcing load spikes of 2.5% every 14 workout loops."
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-white block uppercase">METRICS INDEX STATUS:</span>
                  <span className="text-neon block mt-0.5 font-bold">[VAULT RECORD DEPT UNLOCKED - CONTINUOUS SYNC ON]</span>
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
