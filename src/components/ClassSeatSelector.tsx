import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Target, Info, Check, AlertTriangle, Users, BookOpen } from 'lucide-react';

interface ClassSeatSelectorProps {
  classNameString: string;
  onSeatConfirmed: (platformId: string) => void;
}

export default function ClassSeatSelector({ classNameString, onSeatConfirmed }: ClassSeatSelectorProps) {
  // 16 Platforms layout
  const totalPlatforms = 16;
  const [occupiedSeats, setOccupiedSeats] = useState<number[]>([]);
  const [selectedSeat, setSelectedSeat] = useState<number | null>(null);
  const [bookedSeats, setBookedSeats] = useState<number[]>([]);

  // Simulation: random occupancy for high-fidelity real-time feel
  useEffect(() => {
    // Generate different occupancy based on class name string to keep it stable but realistic
    const numericSeed = classNameString.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const mockOccupied: number[] = [];
    for (let i = 1; i <= totalPlatforms; i++) {
      // Deterministic pseudo-random based on string seed
      const isOccupied = ((numericSeed * i) % 7) < 3; 
      if (isOccupied) {
        mockOccupied.push(i);
      }
    }
    setOccupiedSeats(mockOccupied);
    setSelectedSeat(null);
  }, [classNameString]);

  const handleSeatClick = (seatNum: number) => {
    if (occupiedSeats.includes(seatNum) || bookedSeats.includes(seatNum)) {
      return; // Occupied
    }
    setSelectedSeat(prev => (prev === seatNum ? null : seatNum));
  };

  const handleConfirm = () => {
    if (selectedSeat !== null) {
      setBookedSeats(prev => [...prev, selectedSeat]);
      onSeatConfirmed(`Platform ${selectedSeat.toString().padStart(2, '0')}`);
      setSelectedSeat(null);
    }
  };

  const availableCount = totalPlatforms - occupiedSeats.length - bookedSeats.length;

  return (
    <div className="bg-steel-low border border-steel-border/60 p-6 md:p-8 space-y-6">
      
      {/* Platform selector Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-steel-border/30 pb-4 gap-4">
        <div>
          <span className="font-mono text-[9px] text-neon uppercase block tracking-wider">
            Biomedical Floor Placement System
          </span>
          <h4 className="font-display font-black text-lg text-white uppercase tracking-wider mt-1">
            {classNameString.toUpperCase()} • PLATFORM SPEC SELECTION
          </h4>
        </div>

        <div className="flex items-center gap-4 text-xs font-mono">
          <div className="flex items-center gap-1.5 text-gray-400">
            <Users className="w-4 h-4 text-neon" />
            <span>{availableCount} / {totalPlatforms} Platforms Ready</span>
          </div>
        </div>
      </div>

      {/* Classroom layout map */}
      <div className="max-w-md mx-auto space-y-4">
        {/* Front Screen / Coach Stage Label */}
        <div className="w-full bg-steel-black border border-steel-border/70 text-center py-2 text-[10px] font-mono tracking-[0.2em] text-gray-500 uppercase">
          ✦ COACH GRID TRACK ZONE ✦
        </div>

        {/* 4x4 Grid representation of platforms */}
        <div className="grid grid-cols-4 gap-3 py-4">
          {Array.from({ length: totalPlatforms }, (_, idx) => {
            const seatNum = idx + 1;
            const isOccupied = occupiedSeats.includes(seatNum);
            const isBooked = bookedSeats.includes(seatNum);
            const isSelected = selectedSeat === seatNum;

            let btnClass = "border-steel-border/50 bg-[#0d0e0e]/20 text-gray-400 hover:border-white";
            if (isOccupied) {
              btnClass = "border-steel-border bg-steel-highest text-gray-600 cursor-not-allowed";
            } else if (isBooked) {
              btnClass = "border-neon bg-neon-dark text-neon cursor-not-allowed";
            } else if (isSelected) {
              btnClass = "border-neon bg-neon text-black font-black";
            }

            return (
              <button
                key={idx}
                type="button"
                disabled={isOccupied || isBooked}
                onClick={() => handleSeatClick(seatNum)}
                className={`h-16 flex flex-col items-center justify-between p-2 text-center border font-mono transition-luxury cursor-pointer outline-none relative group ${btnClass}`}
              >
                <span className="text-[9px] text-[#888] group-hover:text-inherit">
                  GRID
                </span>
                
                <span className="text-sm font-bold block leading-none">
                  {seatNum.toString().padStart(2, '0')}
                </span>

                <div className="absolute top-1 right-1">
                  {isBooked && (
                    <div className="w-2 h-2 rounded-full bg-neon" />
                  )}
                  {isOccupied && (
                    <div className="w-1.5 h-1.5 rounded-full bg-steel-highest/50" />
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Legend */}
        <div className="grid grid-cols-3 gap-2 pt-2 border-t border-steel-border/30 text-[9px] font-mono text-center">
          <div className="flex items-center justify-center gap-1.5 text-gray-400">
            <div className="w-3 h-3 bg-zinc-900 border border-steel-border" />
            <span>AVAILABLE</span>
          </div>
          <div className="flex items-center justify-center gap-1.5 text-gray-500">
            <div className="w-3 h-3 bg-steel-highest border border-steel-border" />
            <span>OCCUPIED</span>
          </div>
          <div className="flex items-center justify-center gap-1.5 text-neon">
            <div className="w-3 h-3 bg-neon border border-neon" />
            <span>RESERVED</span>
          </div>
        </div>
      </div>

      {/* Confirmation section */}
      <div className="bg-steel-black/40 border border-steel-border/50 p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-left text-xs space-y-1">
          {selectedSeat !== null ? (
            <>
              <p className="font-mono text-white uppercase font-bold flex items-center gap-1.5">
                <Check className="w-4 h-4 text-neon" /> platform {selectedSeat.toString().padStart(2, '0')} SELECTED
              </p>
              <p className="text-gray-500 font-sans text-xs">Calibration focus parameters are locked into this tracking block.</p>
            </>
          ) : (
            <>
              <p className="font-mono text-gray-400 uppercase">NO SPOT HIGHLIGHTED</p>
              <p className="text-gray-500 font-sans text-xs">Tap any available grid platform from the schematic map above to activate.</p>
            </>
          )}
        </div>

        <button
          type="button"
          disabled={selectedSeat === null}
          onClick={handleConfirm}
          className={`font-mono text-[10px] font-bold uppercase tracking-wider px-5 py-3 transition-luxury select-none ${
            selectedSeat !== null
              ? "bg-neon text-black hover:bg-white cursor-pointer"
              : "bg-steel-border/30 text-gray-500 cursor-not-allowed"
          }`}
        >
          Confirm Platform Slot
        </button>
      </div>

    </div>
  );
}
