import { ClassItem, TrainerItem, MembershipTier, FAQItem, ScheduleItem } from './types';

export const CLASSES_DATA: ClassItem[] = [
  {
    id: "class-1",
    name: "Strength Training",
    category: "strength",
    description: "Build raw power and structural resilience through heavy compound movements, mechanical tension, and progressive overload under elite guidance.",
    intensity: "High",
    duration: 45,
    imgUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBKg52pBLpnAG6aGl0BGzRiDzoNCE6mB4pGUlQtl7RJazGhKYwK9JN5yTcK1F19-RXpkst0koZkD-I2KIlHd7Y2WT-j04F6MFcCi4b2HACWZtURL68f8le0CpYe1YBQ92MTNpFkpwOVGivK8F9VOWXCz_TU6XOT6hmDTEhMpDUvAwA6XmgZgVXFLUhF78XCE3i61kN48K1i4T-E3DOcbfkgEbogS-JqIRmTSP05kZiHpYHxCOWuBOaxIzOsICMgwvpM1o89vGH770Q",
    trainer: "Marcus V."
  },
  {
    id: "class-2",
    name: "Conditioning System",
    category: "conditioning",
    description: "High-intensity metabolic conditioning on curved manual treadmills, air bikes, and rowing systems designed to elevate VO2 max and stamina.",
    intensity: "High",
    duration: 60,
    imgUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuB05_-79yEKQFaXJG-nTqHJqcFNDYmMvEEvNRlfardIxd8IB3atJIril3JFMQeOn2O_SL8DbBWVZZ60YzJLflg9APulAXyMwdMC026MPJLmTGucACxnKzv60XGuOQMAyJrucAZMXr2sJ0fTE2fjij0HVYNztvg-Am7EvqTMXCZl-2ntnPZEsnclYzvhEwi974aICno6B0aDg2JHxYxnxtksfBDLB23Te3MlSQH5MZc2pj5b9VPlsnGU__frgmaRYGJ-EGBuWGDgHQw",
    trainer: "Elena S."
  },
  {
    id: "class-3",
    name: "Tactical Combat",
    category: "combat",
    description: "Technical striking, precision footwork, and heavy bag drills combined to merge martial arts agility with extreme athletic endurance.",
    intensity: "High",
    duration: 60,
    imgUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuA4KBZWPGA4bf3Jd97ovoOJ1jTbq7chEvZVMRj4YAIN6Sv3MpXh_ZlnDuedxLBYnLnh3Cdo9U-LVei4WVHQD6uyojLnvBpAN63ZmUjaeYgDpKScVsKEb6UkWr139m0duImScTYUpXSar-_UIjGPeSHP_0ZALORGobPE0ogpTb-b__fTFj_dieccIoTonAjKZFQ-ZRf3FEPPrV6kBwqChw01488DG4Wzx_rLTfQfaHv-lM_nQDOwHYPbQxsyiU3npOMfwhytghPNPg4",
    trainer: "Julian K."
  },
  {
    id: "class-4",
    name: "Mobility & Range",
    category: "mobility",
    description: "Focused kinetic flow, active recovery, and deep therapeutic stretching to optimise joint mechanics and repair muscle fibres.",
    intensity: "Low",
    duration: 30,
    imgUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDDMrLurBLjE_285gzsrVLaAvUaJC8QIjMREyI33W33PZegIdp5t-Qsp4pDicS1-H4waztupYSJrxg1EVLUlY67Uxj7YV10KhN8-ejLvH53fhT14bcvz98q4kQNp5h9zQyuYOuyhG50b1SBRuvSmhn-tOvxpEFahgVQ-AHlB-J3ghjivbftLjF4pEBZXZ4rEV_vSRPptco_sEMUNqE7qUKyJ2rvoI0ArRihaR1sYVegGEr83JlQK5Rs7cUuwvoc83Xn4EL5hMoZPFs",
    trainer: "Elena S."
  },
  {
    id: "class-5",
    name: "Personal Training",
    category: "personal_training",
    description: "Elite 1-on-1 performance coaching custom-calibrated around your biomechanics. Comprehensive body tracking, custom programming, and deep nutrition support.",
    intensity: "Elite",
    duration: 60,
    imgUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAy8NpWiBy5lLlMU33QYcVkirMTUb_MS730OtLK76uvQ8_YBkSPkJYv5Tz9K68Osmcp1uxJisB3eI6txt26Ug-lsCayXzWFCrndMev8uLS387xeM8hMSy42JG6T8XcxPCM-TCZzVY32OIDXVyaPymKF-ZKSN3ruUbINz8otXxRmfYC-3KsrFUHZQapjcv3vQt8oB1IOIOxfJwgD8z2AXpxBd1hP_L_EsLVjAAgWlbxvuqMOQf1UoZSXfpDbjVpWQZLDmwkd6Ofi98Y",
    trainer: "All Trainers"
  }
];

export const TRAINERS_DATA: TrainerItem[] = [
  {
    id: "trainer-1",
    name: "Marcus V.",
    specialty: "Strength & Conditioning",
    bio: "Ex-military tactical strength specialist. Focuses on explosive power, functional biomechanics, and pushing the human central nervous system to its raw limits.",
    imgUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuA9xkexEpCdukUQZGlYS2iCMJYCj-mHnVssBA8GpnkSqmzA0h_9DbJlRJoARKFA3Wki3gk0Atw6NlD0jV5nCOH7eZxck4bwlZfHqGvaYimnCn1SR2K3eApLi2VZsw42LmWha8h5kIt5FJZtANeItKlJIOKaQZF9Pxnarl0FjADKoQl8TgTTTb6FzWlk1ozB9k3Y5w_ct-ApUL6k2NCd-hnrBveBtJ8sRtOkYo9i4ACEu9LwunVn7REYnxMXrzqhb-HYU8JrMK09qKw",
    skills: ["Powerlifting", "Hypertrophy", "Tactical Fitness"]
  },
  {
    id: "trainer-2",
    name: "Elena S.",
    specialty: "Endurance & Mobility",
    bio: "Elite triathlete and kinetic chain anatomy expert. Specialises in building unyielding lung capacity, functional joint range, and bulletproofing soft tissue.",
    imgUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBqUHPN6s1jr-YWmEn21BkR2LckUsfEkG6-GKZU-qzH9s2jAmFm0hUTu1ifD-pwLAMr2BnYP70_GsIldy2QNrl5wPHi2hlbrnBKxzZTeHHs0KvD_RKO69TbEGEiNO-1c8PZRrUCxjVU0YPnMOf4sqIHvgCe3ON4GYPO4KcYAJXzdLHmISXfqD0iwh24NVhN_NESq6NZKSmLDqTgaTcakDOkSVtsmX95WT7qCauajtbFgvsVYp_75hG0phr0briWGw23BTGUTzUutNI",
    skills: ["VO2 Max Training", "Kinetic Flow", "Active Recovery"]
  },
  {
    id: "trainer-3",
    name: "Julian K.",
    specialty: "Combat & Agility",
    bio: "Professional striking practitioner. Merges intense combat conditioning with plyometrics to breed blinding speed, deceleration control, and elite reflexes.",
    imgUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuC-9dPmQawkiHC7jFjc9JGbO1X7c7GqiBq7plw0WgnvycPKGlHtXfHjYpiYJv-Z2p8ZtNYGl5cDZCUP7W-UDuDRc4bCgL8JXuQPR9abOdHpCMdYqQrif6Kv4MOynOa8JwQdVpAwRu3_dWExxKiTy2e7VmXJ5EAxLAWB1nvdNc9WwuwdzXg5qsinzZuksamZpmTLFmvELeqcuC07LyXmfBRywoA8wCZEKpq8A7shdR-By9xVE4lzmirfLGBSB6PGDBhAxlmTaZ6XIiU",
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
