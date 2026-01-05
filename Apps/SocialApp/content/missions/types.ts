// Weekly Mission System Types
// The core retention loop - psychological workouts that unlock weekly

export interface MissionObjective {
  id: string;
  text: string;
  type: 'learn' | 'practice' | 'reflect';
}

export interface FieldExercise {
  id: string;
  task: string;
  context: string;           // Where/when to practice
  successCriteria: string;   // How to know you did it right
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

export interface MissionQuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface MissionQuiz {
  questions: MissionQuizQuestion[];
}

export interface WeeklyMission {
  id: string;
  week: number;
  title: string;
  subtitle: string;
  description: string;
  icon: string;              // Lucide icon name
  color: string;             // Theme color for the mission

  // The tactical knowledge
  tacticalBrief: {
    opening: string;         // Hook - why this matters
    concepts: {
      title: string;
      content: string;
    }[];
    keyTakeaways: string[];
  };

  // What to accomplish this week
  objectives: MissionObjective[];

  // Real-world tasks
  fieldExercises: FieldExercise[];

  // End-of-week reflection
  reflectionPrompts: string[];

  // Knowledge check quiz
  quiz: MissionQuiz;

  // Access control
  tier: 'free' | 'premium' | 'vip';

  // Completion requirements
  requirements: {
    minExercisesCompleted: number;
    reflectionRequired: boolean;
  };
}

export interface MissionProgress {
  missionId: string;
  weekNumber: number;
  status: 'locked' | 'active' | 'completed';
  startedAt?: string;
  completedAt?: string;
  exercisesCompleted: string[];  // Exercise IDs
  reflectionAnswers?: Record<string, string>;
  fieldReportsSubmitted: number;
}

export interface UserMissionState {
  currentWeek: number;
  programStartDate: string;
  completedMissions: string[];
  activeProgram?: string;
}
