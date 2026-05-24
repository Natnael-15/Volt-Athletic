import { ClassItem, TrainerItem, MembershipTier, FAQItem, ScheduleItem } from './types';

// Import all local assets
import classStrength from '@/src/assets/class_strength.jpeg';
import classConditioning from '@/src/assets/class_conditioning.jpeg';
import classCombat from '@/src/assets/class_combat.jpeg';
import classMobility from '@/src/assets/class_mobility.jpeg';
import classPt from '@/src/assets/class_pt.jpeg';

import trainerMarcus from '@/src/assets/trainer_marcus.jpeg';
import trainerElena from '@/src/assets/trainer_elena.jpeg';
import trainerJulian from '@/src/assets/trainer_julian.jpeg';

export const CLASSES_DATA: ClassItem[] = [
  {
    id: "class-1",
    name: "Strength Training",
    category: "strength",
    description: "Build raw power and structural resilience through heavy compound movements, mechanical tension, and progressive overload under elite guidance.",
    intensity: "High",
    duration: 45,
    imgUrl: classStrength,
    trainer: "Marcus V."
  },
  {
    id: "class-2",
    name: "Conditioning System",
    category: "conditioning",
    description: "High-intensity metabolic conditioning on curved manual treadmills, air bikes, and rowing systems designed to elevate VO2 max and stamina.",
    intensity: "High",
    duration: 60,
    imgUrl: classConditioning,
    trainer: "Elena S."
  },
  {
    id: "class-3",
    name: "Tactical Combat",
    category: "combat",
    description: "Technical striking, precision footwork, and heavy bag drills combined to merge martial arts agility with extreme athletic endurance.",
    intensity: "High",
    duration: 60,
    imgUrl: classCombat,
    trainer: "Julian K."
  },
  {
    id: "class-4",
    name: "Mobility & Range",
    category: "mobility",
    description: "Focused kinetic flow, active recovery, and deep therapeutic stretching to optimise joint mechanics and repair muscle fibres.",
    intensity: "Low",
    duration: 30,
    imgUrl: classMobility,
    trainer: "Elena S."
  },
  {
    id: "class-5",
    name: "Personal Training",
    category: "personal_training",
    description: "Elite 1-on-1 performance coaching custom-calibrated around your biomechanics. Comprehensive body tracking, custom programming, and deep nutrition support.",
    intensity: "Elite",
    duration: 60,
    imgUrl: classPt,
    trainer: "All Trainers"
  }
];

export const TRAINERS_DATA: TrainerItem[] = [
  {
    id: "trainer-1",
    name: "Marcus V.",
    specialty: "Strength & Conditioning",
    bio: "Ex-military tactical strength specialist. Focuses on explosive power, functional biomechanics, and pushing the human central nervous system to its raw limits.",
    imgUrl: trainerMarcus,
    skills: ["Powerlifting", "Hypertrophy", "Tactical Fitness"]
  },
  {
    id: "trainer-2",
    name: "Elena S.",
    specialty: "Endurance & Mobility",
    bio: "Elite triathlete and kinetic chain anatomy expert. Specialises in building unyielding lung capacity, functional joint range, and bulletproofing soft tissue.",
    imgUrl: trainerElena,
    skills: ["VO2 Max Training", "Kinetic Flow", "Active Recovery"]
  },
  {
    id: "trainer-3",
    name: "Julian K.",
    specialty: "Combat & Agility",
    bio: "Professional striking practitioner. Merges intense combat conditioning with plyometrics to breed blinding speed, deceleration control, and elite reflexes.",
    imgUrl: trainerJulian,
    skills: ["Muay Thai", "Plyometrics", "Reaction Dynamics"]
  }
];

export const MEMBERSHIPS_DATA: MembershipTier[] = [
  {
    id: "member-student",
    name: "Student",
    price: 49,
    period: "mo",
    features: ["Full Facility Access", "Standard Training Turf Grid", "Cardio Platform"],
    omittedFeatures: ["Group Dynamic Classes", "Cryotherapy Recovery Zone", "Interactive App Premium API"],
    highlighted: false
  },
  {
    id: "member-basic",
    name: "Basic",
    price: 89,
    period: "mo",
    features: ["Full Facility Access", "Standard Training Turf Grid", "Cardio Platform", "Locker Room & Smart Lockers"],
    omittedFeatures: ["Group Dynamic Classes", "Cryotherapy Recovery Zone"],
    highlighted: false
  },
  {
    id: "member-elite",
    name: "Elite",
    price: 199,
    period: "mo",
    features: ["Everything in Basic", "Unlimited Group Dynamic Classes", "Full Recovery Zone: Cryo & Infrared", "1 Personal Training Session / Mo", "Priority Booking & Advanced Metric App Integrations"],
    omittedFeatures: [],
    highlighted: true,
    popularLabel: "Most Popular"
  },
  {
    id: "member-performance",
    name: "Performance",
    price: 139,
    period: "mo",
    features: ["Everything in Basic", "4 Group Dynamic Classes / Month", "Basic Recovery Zone Tools Level 1", "Real-time Biometric Logging Access"],
    omittedFeatures: ["Comprehensive Personal Trainer Support"],
    highlighted: false
  }
];

export const FAQS_DATA: FAQItem[] = [
  {
    id: "faq-1",
    question: "Are there initiation fees?",
    answer: "No. We believe in absolute transparency. The price you see is the price you pay monthly. We do not charge hidden maintenance, onboarding, or initiation fees."
  },
  {
    id: "faq-2",
    question: "Can I freeze my membership?",
    answer: "Yes. Elite and Performance members can freeze their accounts for up to 3 months per calendar year at no cost. Basic and Student members incur a nominal £10/mo hold fee to retain their pricing."
  },
  {
    id: "faq-3",
    question: "What is included in the Recovery Zone?",
    answer: "The Full Recovery Zone (Elite tier exclusive) includes dual-capacity high-precision cold plunges, authentic infrared saunas, automated Normatec compression boots, and dedicated therapeutic range-of-motion zones."
  },
  {
    id: "faq-4",
    question: "How do class bookings work?",
    answer: "Classes can be booked up to 7 days in advance through our dedicated app mockup or website dashboard. Priority goes to Elite tier members."
  }
];

export const SCHEDULES_DATA: ScheduleItem[] = [
  {
    id: "sched-1",
    time: "17:00",
    category: "STRENGTH",
    name: "HEAVY METALS",
    duration: "45 MIN",
    instructor: "COACH ALEX"
  },
  {
    id: "sched-2",
    time: "18:00",
    category: "COMBAT",
    name: "STRIKE LAB",
    duration: "60 MIN",
    instructor: "COACH SARAH"
  },
  {
    id: "sched-3",
    time: "19:30",
    category: "MOBILITY",
    name: "FLOW STATE",
    duration: "30 MIN",
    instructor: "COACH MARCUS"
  },
  {
    id: "sched-4",
    time: "20:15",
    category: "CONDITIONING",
    name: "ENGINE BULL",
    duration: "45 MIN",
    instructor: "COACH ELENA"
  }
];
