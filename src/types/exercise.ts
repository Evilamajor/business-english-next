export type ExerciseDifficulty = "beginner" | "intermediate" | "advanced";

export type Exercise = {
  id: string;
  module: string;
  category: string;
  title: string;
  description: string;
  difficulty?: ExerciseDifficulty;
  component: string;
  data: any;
};