import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Classes from './components/Classes';
import Trainers from './components/Trainers';
import Memberships from './components/Memberships';
import Gallery from './components/Gallery';
import AppPreview from './components/AppPreview';
import Contact from './components/Contact';
import Footer from './components/Footer';
import BookingModal from './components/BookingModal';
import { Sparkles, HelpCircle, ChevronDown, Award } from 'lucide-react';
import { FAQS_DATA } from './data';

export default function App() {
  const [activeSection, setActiveSection] = useState('hero');
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Modal parameter states
  const [selectedTrainerId, setSelectedTrainerId] = useState<string | undefined>(undefined);
  const [selectedClassId, setSelectedClassId] = useState<string | undefined>(undefined);

  // FAQ Expand state
  const [expandedFaq, setExpandedFaq] = useState<string | null>(null);

  // Handle opening modal with custom initial parameters
  const handleOpenBooking = (trainerId?: string, classId?: string) => {
    setSelectedTrainerId(trainerId);
    setSelectedClassId(classId);
    setIsModalOpen(true);
  };

  const handleCloseBooking = () => {
    setIsModalOpen(false);
    setSelectedTrainerId(undefined);
    setSelectedClassId(undefined);
  };

  const handleJoinClick = (tierId?: string) => {
    setActiveSection('join');
    window.scrollTo({
      top: 0,
      behavior: 'auto'
    });
  };

  // Switch FAQ toggle
  const toggleFaq = (id: string) => {
    setExpandedFaq(prev => (prev === id ? null : id));
  };

  return (
    <div className="bg-steel-bg text-gray-200 min-h-screen font-sans selection:bg-neon selection:text-steel-black relative">
      
      {/* Top Header Navigation */}
      <Navbar
        onJoinClick={() => handleJoinClick()}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />

      {/* Main Core Landing Presentation Sections */}
      <main className="relative z-10">
        <AnimatePresence mode="wait">
          {activeSection === 'hero' && (
            <motion.div
              key="hero"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
            >
              {/* Unit 1: Cinematic Splash Hero */}
              <Hero
                onStartTraining={() => handleOpenBooking()}
                onViewMemberships={() => {
                  setActiveSection('memberships');
                  window.scrollTo({ top: 0, behavior: 'auto' });
                }}
                onViewClasses={() => {
                  setActiveSection('classes');
                  window.scrollTo({ top: 0, behavior: 'auto' });
                }}
              />

              {/* Unit 6: FAQ Collapsible Accordions (Additional High-Fidelity Information Touchpoint) */}
              <section className="py-24 bg-steel-low border-t border-b border-steel-border/20 relative">
                <div className="max-w-4xl mx-auto px-6 md:px-12 flex flex-col gap-12">
                  <div className="text-center">
                    <span className="font-mono text-xs tracking-widest text-neon uppercase block mb-1">Anatomical & Logistics Intel</span>
                    <h3 className="font-display text-3xl sm:text-5xl font-black uppercase tracking-tighter text-white">
                      FACILITY FREQUENT INQUIRIES
                    </h3>
                  </div>

                  {/* Accordion List */}
                  <div className="space-y-4">
                    {FAQS_DATA.map((faq) => {
                      const isExpanded = expandedFaq === faq.id;
                      return (
                        <div
                          key={faq.id}
                          className="border border-steel-border/50 bg-[#0d0e0e]/50 hover:border-neon/40 transition-luxury overflow-hidden"
                        >
                          <button
                            type="button"
                            onClick={() => toggleFaq(faq.id)}
                            className="w-full text-left p-6 flex justify-between items-center transition-colors focus:outline-none cursor-pointer"
                          >
                            <span className="font-display text-base md:text-lg font-bold text-white uppercase tracking-wider">
                              {faq.question}
                            </span>
                            <ChevronDown
                              className={`w-5 h-5 text-neon transition-transform duration-300 shrink-0 ml-4 ${
                                isExpanded ? 'rotate-180 text-volt-orange' : ''
                              }`}
                            />
                          </button>

                          <div
                            className={`transition-all duration-300 ease-in-out ${
                              isExpanded ? 'max-h-52 border-t border-steel-border/30 opacity-100 p-6' : 'max-h-0 opacity-0 pointer-events-none'
                            }`}
                          >
                            <p className="font-sans text-xs sm:text-sm text-gray-400 leading-relaxed font-normal">
                              {faq.answer}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Subtle orange accent indicator banner */}
                  <div className="flex items-center gap-3 justify-center text-[10px] font-mono text-volt-orange-glow bg-volt-orange/10 border border-volt-orange/30 p-3">
                    <Award className="w-4 h-4 text-volt-orange scale-95" />
                    <span>LOGISTIC DEPT WARNING: ELITE SLOTS FILL 48 HOURS IN ADVANCE DURING SPRING INTAKECYCLE</span>
                  </div>
                </div>
              </section>
            </motion.div>
          )}

          {activeSection === 'classes' && (
            <motion.div
              key="classes"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
            >
              {/* Unit 2: Core Exercise Classes Categories Bento Grid & Schedule */}
              <Classes onBookClass={handleOpenBooking} />
            </motion.div>
          )}

          {activeSection === 'trainers' && (
            <motion.div
              key="trainers"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
            >
              {/* Unit 3: Certified Performance Coaches Cards */}
              <Trainers onBookTrainer={(trainerId) => handleOpenBooking(trainerId)} />
            </motion.div>
          )}

          {activeSection === 'memberships' && (
            <motion.div
              key="memberships"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
            >
              {/* Unit 4: Membership Pricing Cycles */}
              <Memberships onJoinClick={(tierId) => handleJoinClick(tierId)} />
            </motion.div>
          )}

          {activeSection === 'gallery' && (
            <motion.div
              key="gallery"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
            >
              <Gallery />
            </motion.div>
          )}

          {activeSection === 'app-preview' && (
            <motion.div
              key="app-preview"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
            >
              {/* Unit 5: Proprietary Live Tablet/Phone Companion Diagnostics Preview */}
              <AppPreview />
            </motion.div>
          )}

          {activeSection === 'join' && (
            <motion.div
              key="join"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="py-12"
            >
              {/* Unit 7: Physical Coordinates, Opening Saunas Hours Grid, Induction Sign-up Sheet */}
              <Contact />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer Navigation */}
      <Footer onNavClick={setActiveSection} />

      {/* Floating Modal System Overlay */}
      <BookingModal
        isOpen={isModalOpen}
        onClose={handleCloseBooking}
        initialTrainerId={selectedTrainerId}
        initialClassId={selectedClassId}
      />
    </div>
  );
}
