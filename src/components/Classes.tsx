import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Filter, Clock, Dumbbell, Award, ArrowRight, BookOpen, CalendarCheck, CheckCircle2, ShieldCheck } from 'lucide-react';
import { CLASSES_DATA, SCHEDULES_DATA, TRAINERS_DATA } from '../data';
import { ClassItem } from '../types';
import ClassSeatSelector from './ClassSeatSelector';

interface ClassesProps {
  onBookClass: (trainerId?: string, classId?: string) => void;
}

export default function Classes({ onBookClass }: ClassesProps) {
  const [intensity, setIntensity] = useState<string>('all');
  const [duration, setDuration] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedClassVisual, setSelectedClassVisual] = useState<string>(CLASSES_DATA[0].name);
  const [confirmedPlatformMsg, setConfirmedPlatformMsg] = useState<string | null>(null);

  // Map categories to descriptions and filters
  const filteredClasses = CLASSES_DATA.filter((c) => {
    const matchIntensity =
      intensity === 'all' ||
      c.intensity.toLowerCase() === intensity.toLowerCase() ||
      (intensity === 'high' && c.intensity === 'Elite'); // Elite counts as high

    const matchDuration =
      duration === 'all' ||
      (duration === '30' && c.duration === 30) ||
      (duration === '45' && c.duration === 45) ||
      (duration === '60' && c.duration >= 60);

    return matchIntensity && matchDuration;
  });

  const getTrainerIdByName = (name: string) => {
    const found = TRAINERS_DATA.find((t) => t.name.toLowerCase().includes(name.split(' ')[0].toLowerCase()));
    return found ? found.id : undefined;
  };

  return (
    <section id="classes" className="py-24 bg-steel-bg text-gray-200 border-t border-steel-border/20">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col gap-12">
        
        {/* Header with Aggressive Title and Filters */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-steel-border/50 pb-8">
          <div>
            <span className="font-mono text-xs tracking-[0.2em] text-neon uppercase block mb-1">Elite Disciplines</span>
            <h2 className="font-display text-4xl sm:text-6xl font-black uppercase tracking-tighter text-white">
              DISCIPLINE AWAITS
            </h2>
          </div>

          {/* Interactive Filters Panel */}
          <div className="flex flex-wrap items-center gap-4 w-full md:w-auto bg-steel-low border border-steel-border/60 p-3 sm:p-4 rounded-none">
            <div className="flex items-center gap-2 text-gray-400 text-xs font-mono uppercase tracking-widest">
              <Filter className="w-3 h-3 text-neon" />
              <span>Filter:</span>
            </div>

            {/* Intensity Selector */}
            <select
              value={intensity}
              onChange={(e) => setIntensity(e.target.value)}
              className="bg-steel-black border border-steel-border text-white font-mono text-xs py-1.5 px-3 rounded-none focus:outline-none focus:border-neon focus:ring-1 focus:ring-neon"
            >
              <option value="all">ALL INTENSITIES</option>
              <option value="high">HIGH / ELITE</option>
              <option value="medium">MEDIUM INTENSITY</option>
              <option value="low">LOW RANGE (MOBILITY)</option>
            </select>

            {/* Duration Selector */}
            <select
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="bg-steel-black border border-steel-border text-white font-mono text-xs py-1.5 px-3 rounded-none focus:outline-none focus:border-neon focus:ring-1 focus:ring-neon"
            >
              <option value="all">ANY DURATION</option>
              <option value="30">30 MIN RECOVERY</option>
              <option value="45">45 MIN HEAVY</option>
              <option value="60">60+ MIN OVERLOAD</option>
            </select>
          </div>
        </div>

        {/* Bento Grid Classes Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-[320px] md:auto-rows-[380px]">
          {filteredClasses.length === 0 ? (
            <div className="col-span-12 flex flex-col items-center justify-center p-12 text-center border border-dashed border-steel-border">
              <Dumbbell className="w-12 h-12 text-gray-600 mb-4 animate-bounce" />
              <p className="font-mono text-gray-400 text-sm tracking-wider uppercase">NO MATCHING DISCIPLINE FOUND</p>
              <span className="text-xs text-gray-500 mt-2">Adjust your intensity/duration selectors above to reload</span>
            </div>
          ) : (
            filteredClasses.map((c, index) => {
              // We'll give different widths representing high-end premium layout (bento grid layout)
              // index 0: Strength (8 cols)
              // index 1: Conditioning (4 cols)
              // index 2: Combat (4 cols)
              // index 3: Mobility (4 cols)
              // index 4: Personal Training (4 cols)
              let gridSpan = "md:col-span-4";
              if (index === 0) gridSpan = "md:col-span-8";
              
              const isPt = c.category === 'personal_training';
              
              return (
                <div
                  key={c.id}
                  className={`group relative overflow-hidden bg-steel-low border border-steel-border/40 hover:border-neon transition-luxury ${gridSpan} flex flex-col justify-end`}
                >
                  {/* Photo Background */}
                  {!isPt ? (
                    <div className="absolute inset-0 z-0">
                      <div className="absolute inset-0 bg-gradient-to-t from-steel-black via-steel-black/40 to-transparent opacity-90 z-10" />
                      <img
                        src={c.imgUrl}
                        alt={c.name}
                        className="w-full h-full object-cover filter grayscale contrast-125 brightness-75 group-hover:scale-105 group-hover:filter group-hover:brightness-90 transition-luxury select-none pointer-events-none"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  ) : (
                    // Specialised design for Personal Training
                    <div className="absolute inset-0 z-0 bg-steel-low flex flex-col justify-center items-center text-center p-8">
                      <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none" />
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-neon/5 rounded-full blur-[80px]" />
                    </div>
                  )}

                  {/* Content Overlay */}
                  <div className="relative z-20 p-6 md:p-8 flex flex-col h-full justify-between">
                    {/* Top tags */}
                    <div className="flex justify-between items-start">
                      <span className="font-mono text-[9px] bg-zinc-950/80 border border-steel-border px-2 py-1 text-neon tracking-widest uppercase">
                        {c.category.replace('_', ' ')}
                      </span>
                      <span className="font-mono text-[9px] text-gray-400 flex items-center gap-1 bg-zinc-950/40 px-2 py-1">
                        <Clock className="w-3 h-3 text-neon" /> {c.duration} MIN
                      </span>
                    </div>

                    {/* Bottom Title & Specs */}
                    <div className="space-y-3">
                      <div>
                        <h3 className="font-display text-2xl md:text-3xl font-black text-white uppercase tracking-tight leading-none">
                          {c.name}
                        </h3>
                        <p className="font-mono text-[10px] text-neon uppercase mt-1">
                          INTENSITY: {c.intensity}
                        </p>
                      </div>

                      <p className="font-sans text-xs text-gray-400 max-w-md line-clamp-2 md:line-clamp-3 leading-relaxed">
                        {c.description}
                      </p>

                      <div className="pt-2 flex items-center justify-between border-t border-steel-border/40">
                        <span className="font-mono text-[10px] text-gray-500 uppercase">
                          Coach: {c.trainer}
                        </span>
                        
                        <button
                          onClick={() => onBookClass(getTrainerIdByName(c.trainer), c.id)}
                          className="font-mono text-[10px] font-bold text-neon uppercase hover:text-white transition-colors flex items-center gap-1"
                        >
                          Book Discipline <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Live Platform Reservation Section */}
        <div className="mt-16 border-t border-steel-border/50 pt-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-4 space-y-6">
            <div>
              <span className="font-mono text-xs tracking-widest text-neon uppercase block mb-1">Interactive Floor Dynamics</span>
              <h3 className="font-display text-2xl md:text-3xl font-black uppercase text-white tracking-tight">
                PLATFORM ASSIGNMENT
              </h3>
              <p className="font-sans text-xs text-gray-500 mt-3 leading-relaxed">
                Rather than standard open booking, reserve your exact physical turf space. Each heavy platform features integrated clinical weight recording grids and telemetry plates.
              </p>
            </div>

            <div className="space-y-3">
              <label className="block font-mono text-[10px] uppercase text-gray-400">SELECT TARGET DISCIPLINE:</label>
              <div className="flex flex-col gap-1.5">
                {CLASSES_DATA.map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => {
                      setSelectedClassVisual(c.name);
                      setConfirmedPlatformMsg(null);
                    }}
                    className={`p-3 text-left border font-mono text-xs uppercase duration-200 cursor-pointer ${
                      selectedClassVisual === c.name
                        ? "border-neon text-neon bg-neon-dark-dense border-neon/70 font-bold"
                        : "border-steel-border/50 text-gray-400 hover:border-gray-500 hover:text-white"
                    }`}
                  >
                    {c.name}
                  </button>
                ))}
              </div>
            </div>

            {confirmedPlatformMsg && (
              <div className="p-4 bg-neon/10 border border-neon/30 text-xs font-mono text-white flex gap-2 items-start">
                <CheckCircle2 className="w-4 h-4 text-neon shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-neon uppercase">RESERVATION LOGGED IN TERMINAL</p>
                  <p className="text-gray-400 text-[10px] mt-1 pr-1">{confirmedPlatformMsg}</p>
                </div>
              </div>
            )}
          </div>

          <div className="lg:col-span-8">
            <ClassSeatSelector
              classNameString={selectedClassVisual}
              onSeatConfirmed={(pId) => {
                setConfirmedPlatformMsg(`CONFIRMED: ${pId.toUpperCase()} locked for ${selectedClassVisual.toUpperCase()}. NFC locker gate synchronization token generated.`);
              }}
            />
          </div>
        </div>

        {/* Schedule Preview Section */}
        <div className="mt-16 border-t border-steel-border/50 pt-16 flex flex-col gap-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
            <div>
              <span className="font-mono text-xs tracking-widest text-neon uppercase block mb-1">Today's Live Intake</span>
              <h3 className="font-display text-2xl md:text-3xl font-black uppercase text-white tracking-widest">
                REAL-TIME SCHEDULE
              </h3>
            </div>
            <button
              onClick={() => onBookClass()}
              className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-neon hover:text-white transition-colors border border-neon/30 hover:border-neon px-4 py-2 bg-neon/5"
            >
              <CalendarCheck className="w-4 h-4" />
              <span>Request Custom Slot Booking</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {SCHEDULES_DATA.map((item) => (
              <div
                key={item.id}
                onClick={() => onBookClass(undefined, CLASSES_DATA.find(c => c.name.toUpperCase().includes(item.category))?.id)}
                className="bg-steel-low border border-steel-border/40 hover:border-neon p-6 flex flex-col justify-between h-44 transition-luxury group cursor-pointer"
              >
                <div className="flex justify-between items-start border-b border-steel-border/30 pb-3">
                  <span className="font-mono text-3xl font-black text-white italic tracking-tighter leading-none pt-1">
                    {item.time}
                  </span>
                  <span className="font-mono text-[9px] bg-neon/10 text-neon px-2.5 py-1 uppercase font-bold tracking-widest">
                    {item.category}
                  </span>
                </div>

                <div className="mt-4">
                  <h4 className="font-display text-lg font-bold text-white uppercase tracking-wider group-hover:text-neon transition-colors leading-none">
                    {item.name}
                  </h4>
                  <p className="font-mono text-[9px] text-gray-500 mt-1 uppercase tracking-widest leading-none">
                    {item.duration} • {item.instructor}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
