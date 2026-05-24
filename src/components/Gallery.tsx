import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Maximize2, X, ChevronLeft, ChevronRight, LayoutGrid, Flame, Shield, ArrowRight } from 'lucide-react';

interface GalleryItem {
  id: string;
  category: 'facility' | 'recovery' | 'performance';
  title: string;
  subtitle: string;
  description: string;
  imgUrl: string;
  specs: {
    locationCode: string;
    temperature?: string;
    hardware?: string;
    biometrics?: string;
  };
}

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'gal-1',
    category: 'facility',
    title: 'THE COMPOUND GRID',
    subtitle: 'Compound Cage Platform 01-04',
    description: 'Custom-calibrated force plate cages equipped with high-dynamic barometric sensors, integrated 3D posture mapping towers, and premium carbon steel plates.',
    imgUrl: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=1200&auto=format&fit=crop',
    specs: {
      locationCode: 'SECT-01A / GRID-WEST',
      hardware: 'Eleiko Calibrated & Volt 3D Transceiver',
      biometrics: 'Continuous Force Distribution Curve'
    }
  },
  {
    id: 'gal-2',
    category: 'recovery',
    title: 'INFRARED REGENERATION SUITE',
    subtitle: 'High-Density Spectrum Sauna',
    description: 'Therapeutic heat rooms utilising targeted near-to-far infrared wavelengths to excite cellular repair, optimize lymphatic drainage, and reduce joint friction indices.',
    imgUrl: 'https://images.unsplash.com/photo-1518310383802-640c2de311b2?q=80&w=1200&auto=format&fit=crop',
    specs: {
      locationCode: 'RECOV-CHAMBER 02',
      temperature: '85°C Constant',
      hardware: 'Volt Far-Infrared Quartz Tube Grid'
    }
  },
  {
    id: 'gal-3',
    category: 'performance',
    title: 'TACTICAL BOXING RING',
    subtitle: 'High-Impact Strike Octagon',
    description: 'Soundproof shock-absorbent turf grids centering a full-scale heavy combat sparring canvas. Integrated pressure pads measure deceleration & reaction speed indices in milliseconds.',
    imgUrl: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=1200&auto=format&fit=crop',
    specs: {
      locationCode: 'COMBAT-POD 03',
      hardware: 'Cleto-Reyes Custom Gear & Reaction Pads',
      biometrics: 'Neuromuscular Reaction Lag Tracker'
    }
  },
  {
    id: 'gal-4',
    category: 'recovery',
    title: 'CRYO-SUBMERSION VESSEL',
    subtitle: 'Dual High-Precision Cold Plunges',
    description: 'Active chilled continuous circulation water tunnels calibrated to trigger systemic cold shock responses. Secures acute reductions in vascular inflammation and speeds up ATP synthesis.',
    imgUrl: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?q=80&w=1200&auto=format&fit=crop',
    specs: {
      locationCode: 'RECOV-PLUNGE 01',
      temperature: '3°C Continuous Flow',
      hardware: 'Volt Turbo-Chiller Sub-Gate'
    }
  },
  {
    id: 'gal-5',
    category: 'facility',
    title: 'HIGH-ALTITUDE ENDURANCE ZONE',
    subtitle: 'Hypoxic Conditioning Chamber 05',
    description: 'Enclosed aerobic grid running simulated atmospheric air mixtures down to 14.5% O2 (equivalent to 3,000m elevation). Optimises hemoglobin counts and aerobic threshold parameters.',
    imgUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1200&auto=format&fit=crop',
    specs: {
      locationCode: 'SECT-05C / HYPOXIC',
      temperature: '19°C Constant / 14% O2',
      hardware: 'Hypoxico Automated Generator Grid'
    }
  },
  {
    id: 'gal-6',
    category: 'performance',
    title: 'BIOKINETIC ANALYSING LAB',
    subtitle: 'Optical Motion Capture Array',
    description: '8-camera ultra-high frequency optical sensor arrays capturing structural joint translation under sub-maximal loads to capture ligamentous strain beforehand.',
    imgUrl: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=1200&auto=format&fit=crop',
    specs: {
      locationCode: 'DIAG-LAB 01',
      hardware: 'Vicon Optical Sensors & Volt Mesh',
      biometrics: '3D Skeletal Displacement Vector'
    }
  },
  {
    id: 'gal-7',
    category: 'recovery',
    title: 'KINETIC RESTORATION BAR',
    subtitle: 'Compression & Mobility Turf',
    description: 'Equipped with heavy hyperbaric oxygen chambers, automated Normatec pneumatic compression grids, and soft tissue mobilisation platforms led by clinical physiotherapists.',
    imgUrl: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1200&auto=format&fit=crop',
    specs: {
      locationCode: 'RECOV-TURF 04',
      hardware: 'Normatec Pulses & Hyperbaric Pods',
      biometrics: 'Vascular Clearance & Joint Range Rate'
    }
  },
  {
    id: 'gal-8',
    category: 'facility',
    title: 'THE CALIBRATED TURF ROAD',
    subtitle: 'Unidirectional Sprint Grid',
    description: '45-meter high-friction physical sled road formatted with high-contrast positional markings. Continuous load sensors communicate metrics natively to the companion App.',
    imgUrl: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=1200&auto=format&fit=crop',
    specs: {
      locationCode: 'GRID-SOUTH / INT-01',
      hardware: 'Custom High-Density Synthetic Grass',
      biometrics: 'Ground Reactive Force Meter (GRF)'
    }
  }
];

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState<'all' | 'facility' | 'recovery' | 'performance'>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredItems = activeCategory === 'all' 
    ? GALLERY_ITEMS 
    : GALLERY_ITEMS.filter(item => item.category === activeCategory);

  const openLightbox = (id: string) => {
    const originalIndex = GALLERY_ITEMS.findIndex(item => item.id === id);
    if (originalIndex !== -1) {
      setLightboxIndex(originalIndex);
    }
  };

  const closeLightbox = () => setLightboxIndex(null);

  const nextSlide = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((prev) => (prev! + 1) % GALLERY_ITEMS.length);
    }
  };

  const prevSlide = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((prev) => (prev! - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length);
    }
  };

  const lightboxItem = lightboxIndex !== null ? GALLERY_ITEMS[lightboxIndex] : null;

  return (
    <section id="gallery" className="py-24 bg-steel-black text-gray-200 border-t border-b border-steel-border/20 relative overflow-hidden">
      {/* Background radial highlight */}
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-neon/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative flex flex-col gap-16">
        
        {/* Header and Category Filters */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 border-b border-steel-border/50 pb-8">
          <div>
            <span className="font-mono text-xs tracking-widest text-neon uppercase block mb-1">Architectural Visual Blueprint</span>
            <h2 className="font-display text-4xl sm:text-6xl font-black uppercase tracking-tighter text-white leading-none">
              FACILITY GALLERY
            </h2>
            <p className="font-sans text-xs sm:text-sm text-gray-500 mt-2 max-w-md">
              A detailed inspection of Volt Athletic's high-capacity hardware compounds, mechanical diagnostics chambers, and clinical recovery zones.
            </p>
          </div>

          {/* Interactive Filters Grid */}
          <div className="flex flex-wrap gap-2.5 bg-steel-low border border-steel-border/60 p-1.5 rounded-none self-start md:self-auto">
            {(['all', 'facility', 'recovery', 'performance'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 font-mono text-[10px] sm:text-xs uppercase tracking-wider transition-luxury rounded-none cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-neon text-steel-black font-bold border border-neon'
                    : 'text-gray-400 hover:text-white hover:bg-steel-high/25'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Bento Grid Gallery Output */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, index) => {
              // Create dynamic grid span layouts for grid variations
              const isLarge = index === 0 || index === 5;
              const gridSpan = isLarge ? 'sm:col-span-2 lg:col-span-2' : 'sm:col-span-1';

              return (
                <motion.div
                  layout
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.45 }}
                  className={`group relative overflow-hidden bg-steel-low border border-steel-border/40 hover:border-neon transition-luxury ${gridSpan} aspect-square sm:aspect-auto sm:h-[320px] flex flex-col justify-end cursor-pointer`}
                  onClick={() => openLightbox(item.id)}
                >
                  {/* Image Background wrapper */}
                  <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-gradient-to-t from-steel-black via-steel-black/40 to-transparent opacity-95 group-hover:opacity-85 transition-opacity z-10" />
                    <img
                      src={item.imgUrl}
                      alt={item.title}
                      className="w-full h-full object-cover filter grayscale contrast-125 brightness-75 group-hover:scale-105 group-hover:filter group-hover:brightness-90 transition-luxury select-none pointer-events-none"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  {/* Overlaid Data Metrics */}
                  <div className="relative z-20 p-5 space-y-3 flex flex-col justify-end h-full">
                    {/* Top Segment */}
                    <div className="flex justify-between items-start opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute top-4 left-5 right-5">
                      <span className="font-mono text-[8px] bg-zinc-950/80 border border-steel-border/70 px-2 py-1 text-neon tracking-wider uppercase">
                        {item.specs.locationCode}
                      </span>
                      <div className="w-6 h-6 bg-neon/10 border border-neon/30 flex items-center justify-center">
                        <Maximize2 className="w-3 h-3 text-neon" />
                      </div>
                    </div>

                    {/* Meta and Title */}
                    <div>
                      <span className="font-mono text-[9px] text-gray-500 uppercase tracking-widest block leading-none mb-1">
                        [{item.category.toUpperCase()} HUB]
                      </span>
                      <h3 className="font-display text-lg font-black text-white uppercase tracking-wider leading-none group-hover:text-neon transition-colors">
                        {item.title}
                      </h3>
                      <span className="font-mono text-[10px] text-gray-400 block mt-1 line-clamp-1">
                        {item.subtitle}
                      </span>
                    </div>

                    {/* Bottom Micro Metrics info */}
                    <div className="pt-2 border-t border-steel-border/30 flex justify-between items-center text-[8px] font-mono text-gray-500 uppercase">
                      <span>SEC_LEVEL: APPROVED</span>
                      <span className="text-neon flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                        INSPECT GRID <ArrowRight className="w-2.5 h-2.5" />
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Bottom Call to Action for Image Generation */}
        <div className="mt-4 flex flex-col md:flex-row items-center justify-between gap-6 p-6 bg-steel-low border border-dashed border-steel-border">
          <div className="flex gap-4 items-center">
            <div className="w-10 h-10 bg-white/5 border border-steel-border flex items-center justify-center shrink-0">
              <LayoutGrid className="w-4.5 h-4.5 text-neon" />
            </div>
            <div>
              <h4 className="font-display font-bold text-white text-md uppercase leading-none">DO YOU WISH TO CUSTOMISE THESE IMAGES?</h4>
              <p className="font-sans text-xs text-gray-500 mt-1">We compile and supply a list of all Unsplash/Goldsmith image vectors. Generate yours manually inside the flow engine and substitute them.</p>
            </div>
          </div>
          <a
            href="#join"
            className="font-mono text-xs uppercase tracking-widest border border-steel-border py-3 px-6 text-white hover:text-neon hover:border-neon transition-luxury shrink-0"
          >
            Locate System Logs →
          </a>
        </div>

      </div>

      {/* Lightbox Modal System */}
      <AnimatePresence>
        {lightboxItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/98 flex flex-col items-center justify-center p-4 md:p-10 backdrop-blur-sm"
            onClick={closeLightbox}
          >
            {/* Close btn */}
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 text-gray-400 hover:text-neon transition-colors p-2.5 bg-zinc-950 border border-steel-border cursor-pointer select-none outline-none"
              aria-label="Close lightbox"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Slider container */}
            <div 
              className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Left Action Indicator */}
              <button
                onClick={prevSlide}
                className="hidden lg:flex absolute left-8 w-12 h-12 bg-zinc-950/60 border border-steel-border/55 items-center justify-center text-gray-400 hover:text-neon hover:border-neon transition-luxury cursor-pointer"
                aria-label="Previous zone"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              {/* Central Dynamic Image Segment */}
              <div className="lg:col-span-7 flex justify-center relative aspect-video w-full bg-zinc-950 border border-steel-border/80 overflow-hidden shadow-2xl">
                <img
                  src={lightboxItem.imgUrl}
                  alt={lightboxItem.title}
                  className="w-full h-full object-cover filter contrast-110 grayscale brightness-90 animate-fade-in"
                  referrerPolicy="no-referrer"
                />
                
                {/* Mobile Slider Controls */}
                <div className="absolute inset-x-0 bottom-4 flex justify-between px-4 lg:hidden">
                  <button
                    onClick={prevSlide}
                    className="w-10 h-10 bg-zinc-950/80 border border-steel-border flex items-center justify-center text-white"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={nextSlide}
                    className="w-10 h-10 bg-zinc-950/80 border border-steel-border flex items-center justify-center text-white"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Data Specs Sheet Column */}
              <div className="lg:col-span-5 flex flex-col justify-between space-y-6 h-full p-2 text-left">
                <div className="space-y-4">
                  <div>
                    <span className="font-mono text-[9px] bg-neon/15 border border-neon/30 text-neon px-2.5 py-1 uppercase tracking-widest inline-block mb-2">
                      SYSTEM GRID: {lightboxItem.specs.locationCode}
                    </span>
                    <h3 className="font-display text-2xl sm:text-3xl font-black text-white uppercase tracking-wider mt-1 leading-none">
                      {lightboxItem.title}
                    </h3>
                    <p className="font-mono text-xs text-gray-400 mt-1 uppercase">
                      {lightboxItem.subtitle}
                    </p>
                  </div>

                  <p className="font-sans text-xs sm:text-sm text-gray-400 leading-relaxed font-light">
                    {lightboxItem.description}
                  </p>

                  {/* Mechanical specification cards */}
                  <div className="pt-4 border-t border-steel-border/40 space-y-2 text-xs font-mono">
                    <span className="text-[10px] text-gray-500 uppercase block mb-1">SYSTEM SPECIFICATIONS</span>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="bg-steel-low/80 border border-steel-border p-3">
                        <span className="text-[8px] text-gray-500 block">GRID COORDINATE</span>
                        <span className="text-white font-bold text-[10px]">{lightboxItem.specs.locationCode}</span>
                      </div>
                      
                      {lightboxItem.specs.temperature && (
                        <div className="bg-steel-low/80 border border-steel-border p-3">
                          <span className="text-[8px] text-gray-500 block">THERMOSTATS METRICS</span>
                          <span className="text-neon font-bold text-[10px]">{lightboxItem.specs.temperature}</span>
                        </div>
                      )}

                      {lightboxItem.specs.hardware && (
                        <div className="col-span-2 bg-steel-low/80 border border-steel-border p-3">
                          <span className="text-[8px] text-gray-500 block">HARDWARE INTEGRATION LEVEL</span>
                          <span className="text-white font-medium text-[10px] truncate block">{lightboxItem.specs.hardware}</span>
                        </div>
                      )}

                      {lightboxItem.specs.biometrics && (
                        <div className="col-span-2 bg-steel-low/80 border border-steel-border p-3">
                          <span className="text-[8px] text-gray-500 block font-mono">BIOMETRIC TRACKER TELEMETRY</span>
                          <span className="text-neon font-bold text-[10px] truncate block">{lightboxItem.specs.biometrics}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Lightbox Nav Indicators */}
                <div className="pt-6 border-t border-steel-border/30 flex justify-between items-center font-mono text-[10px] text-gray-600">
                  <span>ZONE {lightboxIndex! + 1} OF {GALLERY_ITEMS.length}</span>
                  <div className="flex gap-2.5">
                    <span className="hover:text-neon cursor-pointer" onClick={prevSlide}>[PREV]</span>
                    <span>/</span>
                    <span className="hover:text-neon cursor-pointer" onClick={nextSlide}>[NEXT]</span>
                  </div>
                </div>
              </div>

              {/* Right Action Indicator */}
              <button
                onClick={nextSlide}
                className="hidden lg:flex absolute right-8 w-12 h-12 bg-zinc-950/60 border border-steel-border/55 items-center justify-center text-gray-400 hover:text-neon hover:border-neon transition-luxury cursor-pointer"
                aria-label="Next zone"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
