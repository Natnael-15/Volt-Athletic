import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Clock, Calendar, MessageSquare, Compass, Send, ShieldCheck, RefreshCw } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    interest: 'strength',
    goals: '',
    experience: 'intermediate'
  });

  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  const [submittedPassCode, setSubmittedPassCode] = useState<string | null>(null);

  const hours = [
    { label: "FACILITY ATHLETE GRIDS", hours: "24 HOURS / 7 DAYS" },
    { label: "CLINICAL PERFORMANCE COACHES", hours: "06:00 AM - 22:00 PM" },
    { label: "CRYOTHERAPY & INFRARED DEPT", hours: "07:00 AM - 21:00 PM" },
    { label: "RECEPTION AND FRONT DESK", hours: "08:00 AM - 20:00 PM" }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: { [key: string]: string } = {};
    if (!formData.name.trim()) errors.name = "Full name is required";
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Provide a valid email";
    }
    if (!formData.phone.trim()) errors.phone = "Phone number is required";

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    // Success code generation
    const intakeCode = 'VT-INT-' + Math.floor(1000 + Math.random() * 9000);
    setSubmittedPassCode(intakeCode);
    setFormErrors({});
  };

  const handleResetForm = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      interest: 'strength',
      goals: '',
      experience: 'intermediate'
    });
    setSubmittedPassCode(null);
  };

  return (
    <section id="join" className="py-24 bg-steel-bg text-gray-200 border-t border-steel-border/20 relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col gap-16">
        
        {/* Header Title */}
        <div className="text-center max-w-2xl mx-auto">
          <span className="font-mono text-xs tracking-widest text-neon uppercase block mb-1">Begin Tactical Induction</span>
          <h2 className="font-display text-4xl sm:text-6xl font-black uppercase tracking-tighter text-white">
            JOIN THE GRID
          </h2>
          <p className="font-sans text-xs sm:text-sm text-gray-500 mt-3 max-w-md mx-auto">
            Experience our 7-Day Performance Induction. Gain full elite training grid and clinical recovery facility access under certified coaches.
          </p>
        </div>

        {/* Info Grid & Form Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Opening Times & Address Coordinates */}
          <div className="lg:col-span-5 space-y-10">
            
            {/* Coordinates and Location Info */}
            <div className="bg-steel-low border border-steel-border/30 p-8 rounded-none relative overflow-hidden">
              <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />
              
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-neon/10 border border-neon/30 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-neon" />
                </div>
                <div>
                  <h4 className="font-display font-bold text-white text-md uppercase leading-none mb-2">Facility Location</h4>
                  <p className="font-sans text-sm text-gray-300">
                    VOLT ATHLETIC HQ
                  </p>
                  <p className="font-mono text-xs text-gray-400 mt-1">
                    247 Power Avenue, London, E1 6PX
                  </p>
                  <p className="font-mono text-[10px] text-neon uppercase mt-2">
                    COORDINATES: 51.5207° N, 0.0726° W
                  </p>
                </div>
              </div>
            </div>

            {/* Opening Hours list */}
            <div className="bg-steel-low border border-steel-border/30 p-8 rounded-none relative overflow-hidden">
              <div className="flex items-center gap-4 border-b border-steel-border/30 pb-4 mb-6">
                <Clock className="w-5 h-5 text-neon" />
                <h4 className="font-display font-medium text-white text-md uppercase leading-none">OPERATION HOURS</h4>
              </div>

              <div className="space-y-4">
                {hours.map((h, i) => (
                  <div key={i} className="flex justify-between items-baseline gap-4 border-b border-steel-border/20 pb-2">
                    <span className="font-mono text-[9px] text-gray-500 uppercase tracking-wider">{h.label}</span>
                    <span className="font-mono text-xs text-white font-bold text-right">{h.hours}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Inquiries email */}
            <div className="p-4 bg-neon/5 border border-neon/30 text-xs text-gray-400">
              <p className="font-mono text-white uppercase tracking-wider mb-1">Secure Grid Hotlines:</p>
              <p>• Emergency Intake Desk: logistics@voltathletic.club</p>
              <p>• Priority Communications: dial +44 207 247 9600</p>
            </div>
          </div>

          {/* Right Column: Dynamic Induction Form / Success Ticket */}
          <div className="lg:col-span-7 bg-steel-low border border-steel-border/50 p-8 rounded-none relative min-h-[500px] flex flex-col justify-between">
            
            <AnimatePresence mode="wait">
              {!submittedPassCode ? (
                <form onSubmit={handleFormSubmit} className="space-y-6">
                  <div>
                    <span className="font-mono text-xs text-neon uppercase block mb-1">Intake Sheet</span>
                    <h3 className="font-display text-2xl font-black text-white uppercase tracking-wider leading-none">
                      7-DAY TACTICAL SEED
                    </h3>
                    <p className="text-xs text-gray-500 mt-1">Initiating assessment of anatomical focus and athletic parameters.</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Full Name */}
                    <div className="space-y-1.5">
                      <label className="block font-mono text-[10px] text-gray-400 uppercase tracking-widest">Athlete Full Name *</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="e.g. Connor Miller"
                        className={`w-full bg-steel-black border p-3 text-sm text-white focus:outline-none focus:border-neon focus:ring-0 rounded-none ${
                          formErrors.name ? 'border-red-500' : 'border-steel-border'
                        }`}
                      />
                      {formErrors.name && <span className="text-[10px] text-red-500 mt-1 block">{formErrors.name}</span>}
                    </div>

                    {/* Email */}
                    <div className="space-y-1.5">
                      <label className="block font-mono text-[10px] text-gray-400 uppercase tracking-widest">Secure Email *</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="e.g. connor@domain.com"
                        className={`w-full bg-steel-black border p-3 text-sm text-white focus:outline-none focus:border-neon focus:ring-0 rounded-none ${
                          formErrors.email ? 'border-red-500' : 'border-steel-border'
                        }`}
                      />
                      {formErrors.email && <span className="text-[10px] text-red-500 mt-1 block">{formErrors.email}</span>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Phone */}
                    <div className="space-y-1.5">
                      <label className="block font-mono text-[10px] text-gray-400 uppercase tracking-widest">Phone Coordinate *</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="e.g. +44 7911 123456"
                        className={`w-full bg-steel-black border p-3 text-sm text-white focus:outline-none focus:border-neon focus:ring-0 rounded-none ${
                          formErrors.phone ? 'border-red-500' : 'border-steel-border'
                        }`}
                      />
                      {formErrors.phone && <span className="text-[10px] text-red-500 mt-1 block">{formErrors.phone}</span>}
                    </div>

                    {/* Preferred Discipline Category */}
                    <div className="space-y-1.5">
                      <label className="block font-mono text-[10px] text-gray-400 uppercase tracking-widest">Primary Objective</label>
                      <select
                        name="interest"
                        value={formData.interest}
                        onChange={handleInputChange}
                        className="w-full bg-steel-black border border-steel-border p-3 text-sm text-white focus:outline-none focus:border-neon focus:ring-0 rounded-none"
                      >
                        <option value="strength">HEAVY COMPOUND STRENGTH</option>
                        <option value="conditioning">METABOLIC VO2 CONDITIONING</option>
                        <option value="combat">TACTICAL COMBO SKRIKING</option>
                        <option value="mobility">KINETIC CHAIN RANGE & RESTORATION</option>
                        <option value="personal">ELITE 1-ON-1 PT ADVISOR</option>
                      </select>
                    </div>
                  </div>

                  {/* Core Experience */}
                  <div className="space-y-1.5">
                    <label className="block font-mono text-[10px] text-gray-400 uppercase tracking-widest">Your Experience Bracket</label>
                    <div className="grid grid-cols-3 gap-2">
                      {['novice', 'intermediate', 'elite_athlete'].map((exp) => (
                        <button
                          type="button"
                          key={exp}
                          onClick={() => setFormData(p => ({ ...p, experience: exp }))}
                          className={`py-2 px-1 text-[9px] font-mono uppercase border rounded-none text-center ${
                            formData.experience === exp
                              ? 'border-neon bg-neon-dark/40 text-white font-bold'
                              : 'border-steel-border text-gray-500 hover:border-gray-400'
                          }`}
                        >
                          {exp.replace('_', ' ')}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Muscle Goals statement */}
                  <div className="space-y-1.5">
                    <label className="block font-mono text-[10px] text-gray-400 uppercase tracking-widest">Biometric Targets Statement</label>
                    <textarea
                      name="goals"
                      rows={2}
                      value={formData.goals}
                      onChange={handleInputChange}
                      placeholder="e.g. Build explosive deadlift power, secure VO2 Max range upwards..."
                      className="w-full bg-steel-black border border-steel-border p-3 text-sm text-white placeholder-gray-700 focus:outline-none focus:border-neon focus:ring-0 rounded-none resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-neon text-steel-black hover:bg-white hover:text-steel-black py-4 font-mono font-bold text-xs uppercase tracking-widest transition-luxury rounded-none text-center flex items-center justify-center gap-2 glow-btn"
                  >
                    Generate Tactical Induction Pass <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              ) : (
                <div className="space-y-6 flex flex-col justify-between h-full py-4 text-center">
                  
                  {/* Top Success Badge */}
                  <div className="flex flex-col items-center">
                    <div className="w-14 h-14 bg-neon/10 rounded-full flex items-center justify-center border border-neon mb-4">
                      <ShieldCheck className="w-7 h-7 text-neon" />
                    </div>
                    <span className="font-mono text-neon text-[10px] uppercase tracking-widest block font-black">VOLT SECURITY SYSTEM SECURED</span>
                    <h3 className="font-display text-2xl font-black text-white uppercase tracking-wider mt-1">7-DAY PASS ACTIVATED</h3>
                  </div>

                  {/* Graphical Voucher Pass */}
                  <div className="border border-dashed border-neon/35 bg-zinc-950 p-6 rounded-none text-left relative overflow-hidden">
                    <div className="absolute top-1/2 -left-3 w-5 h-5 bg-steel-low rounded-full border-r border-dashed border-neon/35" />
                    <div className="absolute top-1/2 -right-3 w-5 h-5 bg-steel-low rounded-full border-l border-dashed border-neon/35" />
                    
                    <div className="border-b border-steel-border/30 pb-3 flex justify-between items-baseline">
                      <span className="font-mono text-[9px] text-neon">PASS NO: {submittedPassCode}</span>
                      <span className="font-mono text-[9px] text-gray-500 uppercase">VOLT 7D</span>
                    </div>

                    <div className="grid grid-cols-2 gap-x-4 gap-y-3 py-4 text-xs font-mono">
                      <div>
                        <span className="text-gray-500 text-[8px] block uppercase">NOMINATED ATHLETE</span>
                        <span className="text-white font-black block truncate">{formData.name}</span>
                      </div>
                      <div>
                        <span className="text-gray-500 text-[8px] block uppercase">TELEPHONE POINT</span>
                        <span className="text-white font-medium block truncate">{formData.phone}</span>
                      </div>
                      <div>
                        <span className="text-gray-500 text-[8px] block uppercase">INDUCTION FOCUS</span>
                        <span className="text-neon font-bold block uppercase">{formData.interest}</span>
                      </div>
                      <div>
                        <span className="text-gray-500 text-[8px] block uppercase">KINETIC RANGE</span>
                        <span className="text-white font-bold block uppercase">{formData.experience.replace('_', ' ')}</span>
                      </div>
                    </div>

                    {/* Sim Barcode of Intake Pass */}
                    <div className="pt-3 border-t border-steel-border/30 text-center">
                      <div className="w-full bg-white h-7 flex items-center justify-center font-mono text-[9px] text-zinc-950 font-bold tracking-[0.45em] leading-none mb-1">
                        ||| {submittedPassCode} |||
                      </div>
                      <span className="text-[8px] text-gray-500">Intelligent front gate barometric sensor trigger</span>
                    </div>
                  </div>

                  {/* Guide and reset */}
                  <div className="space-y-4">
                    <p className="text-xs text-gray-400 max-w-md mx-auto leading-relaxed">
                      Your diagnostic voucher has been compiled. Bring this confirmation barometric credential along with formal photographic ID for physical biometric keycard pairing.
                    </p>
                    
                    <button
                      onClick={handleResetForm}
                      className="inline-flex items-center gap-2 font-mono text-[10px] uppercase text-gray-400 hover:text-neon transition-colors"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      <span>Issue New Athlete Pass</span>
                    </button>
                  </div>

                </div>
              )}
            </AnimatePresence>

          </div>

        </div>

      </div>
    </section>
  );
}
