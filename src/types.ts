export type ScreenId = 'home' | 'directory' | 'assessment' | 'dashboard';
export type TransitionType = 'push' | 'push_back' | 'none';

export interface Booking {
  id: string;
  doctorName: string;
  specialty: string;
  time: string;
  room: string;
  date: string;
  month: string;
  status: 'Verified' | 'Pending';
}

export interface AssessmentState {
  age?: string;
  biologicalSex?: 'Male' | 'Female';
  familyHistory?: string[];
  physicalActivity?: number;
  sleepQuality?: number;
  smokingHabit?: string;
  symptoms?: string[];
  completed?: boolean;
  timestamp?: string;
}
