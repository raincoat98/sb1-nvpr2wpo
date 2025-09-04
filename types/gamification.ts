// 게임화 관련 타입 정의

export interface UserProfile {
  id: string;
  name: string;
  level: number;
  currentXP: number;
  totalXP: number;
  avatar?: string;
  joinDate: Date;
  lastActive: Date;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  earnedAt?: Date;
  isEarned: boolean;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  xpReward: number;
  badgeReward?: string;
  isCompleted: boolean;
  completedAt?: Date;
  progress: number;
  maxProgress: number;
}

export interface DailyMission {
  id: string;
  title: string;
  description: string;
  xpReward: number;
  isCompleted: boolean;
  completedAt?: Date;
  type: 'record' | 'health' | 'vaccination' | 'streak';
}

export interface WeeklyChallenge {
  id: string;
  title: string;
  description: string;
  xpReward: number;
  badgeReward?: string;
  isCompleted: boolean;
  completedAt?: Date;
  progress: number;
  maxProgress: number;
  startDate: Date;
  endDate: Date;
}

export interface XPHistory {
  id: string;
  userId: string;
  amount: number;
  source:
    | 'period_record'
    | 'symptom_record'
    | 'health_check'
    | 'vaccination'
    | 'streak'
    | 'mission'
    | 'challenge';
  description: string;
  timestamp: Date;
}

export interface GamificationState {
  userProfile: UserProfile;
  badges: Badge[];
  achievements: Achievement[];
  dailyMissions: DailyMission[];
  weeklyChallenges: WeeklyChallenge[];
  xpHistory: XPHistory[];
  currentStreak: number;
  longestStreak: number;
}

export interface CycleRecord {
  id: string;
  userId: string;
  date: Date;
  type: 'period' | 'symptom' | 'mood' | 'health';
  data: any;
  xpEarned: number;
  timestamp: Date;
}

export interface HealthRecord {
  id: string;
  userId: string;
  date: Date;
  type: 'vaccination' | 'temperature' | 'weight' | 'mood' | 'symptoms';
  data: any;
  xpEarned: number;
  timestamp: Date;
}

export interface VaccinationRecord {
  id: string;
  userId: string;
  vaccineType: 'hpv' | 'cervical_cancer' | 'other';
  dose: number;
  totalDoses: number;
  date: Date;
  nextDueDate?: Date;
  isCompleted: boolean;
  xpEarned: number;
}
