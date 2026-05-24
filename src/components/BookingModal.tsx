import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar, Clock, User, Target, Check, ShieldCheck, Mail, ArrowRight } from 'lucide-react';
import { TRAINERS_DATA, CLASSES_DATA } from '../data';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTrainerId?: string;
  initialClassId?: string;
}

export default function BookingModal({ isOpen, onClose, initialTrainerId, initialClassId }: BookingModalProps) {
  const [step, setStep] = useState(1);
  const [trainerId, setTrainerId] = useState(initialTrainerId || TRAINERS_DATA[0].id);
  const [classId, setClassId] = useState(initialClassId || CLASSES_DATA[0].id);
  const [date, setDate] = useState('2026-05-24');
  const [time, setTime] = useState('18:00');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [goals, setGoals] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [ticketNumber, setTicketNumber] = useState('');

  // Reset modal state on close or open
  React.useEffect(() => {
    if (isOpen) {
      setStep(1);
      setErrors({});
      setTicketNumber('');
      if (initialTrainerId) setTrainerId(initialTrainerId);
      if (initialClassId) setClassId(initialClassId);
    }
  }, [isOpen, initialTrainerId, initialClassId]);

  const validateStep2 = () => {
    const errs: { [key: string]: string } = {};
    if (!name.trim()) errs.name = "Full name is required";
    if (!email.trim()) {
      errs.email = "Email address is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errs.email = "Please provide a valid email";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNext = () => {
    if (step === 1) {
      setStep(2);
    } else if (step === 2) {
      if (validateStep2()) {
        const randomCode = 'VT-' + Math.floor(100000 + Math.random() * 900000);
        setTicketNumber(randomCode);
        setStep(3);
      }
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const selectedTrainer = TRAINERS_DATA.find(t => t.id === trainerId) || TRAINERS_DATA[0];
  const selectedClass = CLASSES_DATA.find(c => c.id === classId) || CLASSES_DATA[0];

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/90 backdrop-blur-sm"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: "spring", duration: 0.5 }}
          className="relative w-full max-w-xl bg-steel-low border border-steel-border overflow-hidden rounded-none z-10 flex flex-col max-h-[90vh]"
        >
          {/* Accent Line */}
          <div className="h-1 bg-neon w-full" />

          {/* Header */}
          <div className="p-6 border-b border-steel-border/50 flex justify-between items-center bg-steel-black">
            <div>
              <span className="font-mono text-xs tracking-wider text-neon uppercase">Volt Performance Portal</span>
              <h3 className="font-display text-2xl uppercase tracking-wider text-white mt-1">
                {step === 3 ? "Reservation Confirmed" : "Book Elite Training Session"}
              </h3>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-steel-high/50"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Scrollable Content */}
          <div className="p-6 overflow-y-auto flex-grow bg-steel-bg text-gray-200">
            {/* Steps Indicator */}
            {step < 3 && (
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-steel-border/30">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-none border flex items-center justify-center font-mono text-xs ${
                    step >= 1 ? "border-neon text-neon bg-neon-dark" : "border-steel-border text-gray-500"
                  }`}>
                    01
                  </div>
                  <span className={`text-xs font-mono tracking-wider ${step === 1 ? "text-white" : "text-gray-400"}`}>
                    SELECT DISCIPLINE
                  </span>
                </div>
                <div className="flex-grow h-[1px] bg-steel-border/30 mx-4" />
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-none border flex items-center justify-center font-mono text-xs ${
                    step >= 2 ? "border-neon text-neon bg-neon-dark" : "border-steel-border text-gray-500"
                  }`}>
                    02
                  </div>
                  <span className={`text-xs font-mono tracking-wider ${step === 2 ? "text-white" : "text-gray-400"}`}>
                    BIOMETRIC INFO
                  </span>
                </div>
              </div>
            )}

            {/* STEP 1: SELECT TRAINING DETAILS */}
            {step === 1 && (
              <div className="space-y-6">
                {/* Trainer Selection */}
                <div>
                  <label className="block font-mono text-xs uppercase tracking-wider text-gray-400 mb-2">
                    RESERVE COACH
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {TRAINERS_DATA.map((t) => (
                      <button
                        type="button"
                        key={t.id}
                        onClick={() => setTrainerId(t.id)}
                        className={`p-3 border text-left rounded-none transition-luxury flex flex-col justify-between h-24 ${
                          trainerId === t.id
                            ? "border-neon bg-neon-dark text-white"
                            : "border-steel-border/50 bg-steel-low/30 hover:border-white text-gray-400"
                        }`}
                      >
                        <span className="font-mono text-[10px] tracking-wider block opacity-70">
                          {t.specialty.split(' ')[0]}
                        </span>
                        <div>
                          <p className="font-display font-bold text-md tracking-wider text-white uppercase leading-none">
                            {t.name}
                          </p>
                          <span className="text-[10px] text-neon block mt-1">
                            {t.skills[0]}
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Class Selection */}
                <div>
                  <label className="block font-mono text-xs uppercase tracking-wider text-gray-400 mb-2">
                    TRAINING SYSTEM
                  </label>
                  <select
                    value={classId}
                    onChange={(e) => setClassId(e.target.value)}
                    className="w-full bg-steel-low border border-steel-border/70 p-3 text-white font-sans focus:outline-none focus:border-neon rounded-none focus:ring-0"
                  >
                    {CLASSES_DATA.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name.toUpperCase()} (Intensity: {c.intensity} / {c.duration} MIN)
                      </option>
                    ))}
                  </select>
                </div>

                {/* Date & Time */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-mono text-xs uppercase tracking-wider text-gray-400 mb-2 flex items-center gap-2">
                      <Calendar className="w-3 h-3 text-neon" /> SESSION DATE
                    </label>
                    <input
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full bg-steel-low border border-steel-border/70 p-3 text-white font-mono focus:outline-none focus:border-neon rounded-none focus:ring-0"
                    />
                  </div>
                  <div>
                    <label className="block font-mono text-xs uppercase tracking-wider text-gray-400 mb-2 flex items-center gap-2">
                      <Clock className="w-3 h-3 text-neon" /> TIME SLOT
                    </label>
                    <select
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      className="w-full bg-steel-low border border-steel-border/70 p-3 text-white font-mono focus:outline-none focus:border-neon rounded-none focus:ring-0"
                    >
                      <option value="06:30">06:30 AM (Tactical Open)</option>
                      <option value="09:00">09:00 AM (Elite Morning)</option>
                      <option value="12:00">12:00 PM (Noon Overload)</option>
                      <option value="17:00">17:00 PM (Heavy Metals)</option>
                      <option value="18:00">18:00 PM (Strike Lab)</option>
                      <option value="19:30">19:30 PM (Flow State Peak)</option>
                      <option value="20:30">20:30 PM (Night Conditioning)</option>
                    </select>
                  </div>
                </div>

                <div className="p-4 bg-steel-low/80 border border-steel-border/30 text-xs text-gray-400 space-y-1">
                  <p className="font-mono text-white mb-1 uppercase tracking-wider">Coach Guidelines:</p>
                  <p>• Arrive 15 minutes before the selected time for pre-workout biometric alignment.</p>
                  <p>• Cryotherapy lockers and premium hydration bars are unlocked with this reservation.</p>
                </div>
              </div>
            )}

            {/* STEP 2: PERSONAL INFORMATION & GOALS */}
            {step === 2 && (
              <div className="space-y-4">
                {/* Name */}
                <div>
                  <label className="block font-mono text-xs uppercase tracking-wider text-gray-400 mb-2 flex items-center gap-2">
                    <User className="w-3 h-3 text-neon" /> ATHLETE FULL NAME *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Connor Miller"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={`w-full bg-steel-low border p-3 text-white placeholder-gray-600 focus:outline-none focus:ring-0 focus:border-neon rounded-none ${
                      errors.name ? "border-red-500" : "border-steel-border/70"
                    }`}
                  />
                  {errors.name && <span className="text-xs text-red-500 mt-1 block">{errors.name}</span>}
                </div>

                {/* Email */}
                <div>
                  <label className="block font-mono text-xs uppercase tracking-wider text-gray-400 mb-2 flex items-center gap-2">
                    <Mail className="w-3 h-3 text-neon" /> CLOUD REPORT EMAIL *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="name@domain.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`w-full bg-steel-low border p-3 text-white placeholder-gray-600 focus:outline-none focus:ring-0 focus:border-neon rounded-none ${
                      errors.email ? "border-red-500" : "border-steel-border/70"
                    }`}
                  />
                  {errors.email && <span className="text-xs text-red-500 mt-1 block">{errors.email}</span>}
                </div>

                {/* Performance Goals */}
                <div>
                  <label className="block font-mono text-xs uppercase tracking-wider text-gray-400 mb-2 flex items-center gap-2">
                    <Target className="w-3 h-3 text-neon" /> INTENDED FOCUS & GOALS (OPTIONAL)
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Describe lifting PRs, sports injuries, or physical benchmarks to push..."
                    value={goals}
                    onChange={(e) => setGoals(e.target.value)}
                    className="w-full bg-steel-low border border-steel-border/70 p-3 text-white placeholder-gray-600 focus:outline-none focus:ring-0 focus:border-neon rounded-none resize-none"
                  />
                </div>

                <div className="p-3 bg-neon/5 border-l-2 border-neon text-xs text-gray-300">
                  By submitting this request, you represent that you are clinically cleared for high-performance weightlifting, plyometrics, and physical conditioning. Your custom metrics report will be generated live.
                </div>
              </div>
            )}

            {/* STEP 3: RESERVATION SUCCESS TICKETS */}
            {step === 3 && (
              <div className="space-y-6 py-4">
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-neon/10 rounded-full flex items-center justify-center border border-neon mb-4">
                    <ShieldCheck className="w-8 h-8 text-neon" />
                  </div>
                  <h4 className="font-display text-2xl uppercase tracking-wider text-white">ACCESS GRANTED</h4>
                  <p className="text-xs font-mono text-neon mt-1">VOLT ATHLETIC MEMBER PORTAL VALIDATED</p>
                </div>

                {/* The Ticket Graphic */}
                <div className="relative border border-dashed border-neon/40 bg-zinc-950 p-6 rounded-none overflow-hidden select-none">
                  {/* Faux circular punchouts */}
                  <div className="absolute top-1/2 -left-3 w-6 h-6 bg-steel-bg rounded-full border-r border-dashed border-neon/40 transform -translate-y-1/2" />
                  <div className="absolute top-1/2 -right-3 w-6 h-6 bg-steel-bg rounded-full border-l border-dashed border-neon/40 transform -translate-y-1/2" />

                  <div className="text-center pb-4 border-b border-steel-border/30">
                    <span className="font-mono text-xs tracking-widest text-gray-500">VOLT TRAINING CLUB VIP</span>
                    <h5 className="font-display text-3xl font-black text-white uppercase tracking-tight mt-1">
                      {selectedClass.name}
                    </h5>
                  </div>

                  <div className="grid grid-cols-2 gap-4 py-4 text-xs font-mono">
                    <div>
                      <span className="text-gray-500 block text-[10px] uppercase">ATHLETE</span>
                      <span className="text-white font-bold block truncate">{name}</span>
                    </div>
                    <div>
                      <span className="text-gray-500 block text-[10px] uppercase">COACH SPECIALIST</span>
                      <span className="text-neon block">{selectedTrainer.name}</span>
                    </div>
                    <div>
                      <span className="text-gray-500 block text-[10px] uppercase">SESSION ID</span>
                      <span className="text-white block font-bold">{ticketNumber}</span>
                    </div>
                    <div>
                      <span className="text-gray-500 block text-[10px] uppercase">METRICS DEPT</span>
                      <span className="text-white block uppercase">APPROVED</span>
                    </div>
                    <div>
                      <span className="text-gray-500 block text-[10px] uppercase">DATE SPEC</span>
                      <span className="text-white block">{date}</span>
                    </div>
                    <div>
                      <span className="text-gray-500 block text-[10px] uppercase">TIME SPEC</span>
                      <span className="text-white block">{time}</span>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-steel-border/30 text-center flex flex-col items-center">
                    <div className="w-full bg-white h-8 flex items-center justify-center font-mono text-[10px] text-zinc-950 font-bold tracking-[0.4em] mb-2 leading-none uppercase">
                      * VOLT-{ticketNumber} *
                    </div>
                    <span className="text-[9px] text-gray-500 italic">Present this barcode mockup at front reception for biometric locker key pairing</span>
                  </div>
                </div>

                <button
                  onClick={onClose}
                  className="w-full bg-white text-zinc-950 hover:bg-neon hover:text-zinc-950 font-mono text-xs font-bold py-4 uppercase tracking-widest transition-luxury flex items-center justify-center gap-2"
                >
                  Return To Terminal <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          {/* Footer Navigation Buttons */}
          {step < 3 && (
            <div className="p-6 bg-steel-black border-t border-steel-border/50 flex justify-between items-center">
              {step > 1 ? (
                <button
                  onClick={handleBack}
                  className="font-mono text-xs uppercase tracking-wider text-gray-400 hover:text-white transition-colors"
                >
                  ← BACK
                </button>
              ) : (
                <span className="text-xs font-mono text-gray-600">PREMIUM ACCESS PORTAL</span>
              )}

              <button
                onClick={handleNext}
                className="bg-neon hover:bg-white text-steel-black font-mono font-bold text-xs px-6 py-3 uppercase tracking-wider transition-luxury flex items-center gap-2 glow-btn"
              >
                {step === 1 ? "NEXT SPEC" : "CONFIRM ACCESS"} →
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
