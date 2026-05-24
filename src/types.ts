export interface ClassItem {
  id: string;
  name: string;
  category: 'strength' | 'conditioning' | 'mobility' | 'combat' | 'personal_training';
  description: string;
  intensity: 'High' | 'Medium' | 'Low' | 'Elite' | 'All';
  duration: number; // in minutes
  imgUrl: string;
  trainer: string;
}

export interface TrainerItem {
  id: string;
  name: string;
  specialty: string;
  bio: string;
  imgUrl: string;
  skills: string[];
}

export interface MembershipTier {
  id: string;
  name: string;
  price: number;
  period: string;
  features: string[];
  omittedFeatures: string[];
  highlighted: boolean;
  popularLabel?: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface ScheduleItem {
  id: string;
  time: string;
  category: 'STRENGTH' | 'COMBAT' | 'MOBILITY' | 'CONDITIONING';
  name: string;
  duration: string;
  instructor: string;
}
