import type { Exercise } from "@/src/types/exercise";

export const EXERCISE_PROGRESS_STORAGE_KEY = "business-english-progress";

export interface ExerciseProgressEntry {
  id: string;
  module: string;
  category: string;
  title: string;
  completed: boolean;
  score: number;
  total: number;
  updatedAt: string;
}

export interface ExerciseProgressState {
  exercises: Record<string, ExerciseProgressEntry>;
  completedCount: number;
  totalScore: number;
  updatedAt: string;
}

const emptyProgressState: ExerciseProgressState = {
  exercises: {},
  completedCount: 0,
  totalScore: 0,
  updatedAt: "",
};

function getProgressKey(exercise: Pick<Exercise, "module" | "id">): string {
  return `${exercise.module}:${exercise.id}`;
}

function canUseStorage(): boolean {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

function readState(): ExerciseProgressState {
  if (!canUseStorage()) {
    return emptyProgressState;
  }

  const rawValue = window.localStorage.getItem(EXERCISE_PROGRESS_STORAGE_KEY);

  if (!rawValue) {
    return emptyProgressState;
  }

  try {
    const parsed = JSON.parse(rawValue) as Partial<ExerciseProgressState>;

    return {
      exercises: parsed.exercises ?? {},
      completedCount: typeof parsed.completedCount === "number" ? parsed.completedCount : 0,
      totalScore: typeof parsed.totalScore === "number" ? parsed.totalScore : 0,
      updatedAt: typeof parsed.updatedAt === "string" ? parsed.updatedAt : "",
    };
  } catch {
    return emptyProgressState;
  }
}

function writeState(state: ExerciseProgressState) {
  if (!canUseStorage()) {
    return;
  }

  window.localStorage.setItem(EXERCISE_PROGRESS_STORAGE_KEY, JSON.stringify(state));
}

export function getExerciseProgress(exercise: Pick<Exercise, "module" | "id">): ExerciseProgressEntry | null {
  const state = readState();
  return state.exercises[getProgressKey(exercise)] ?? null;
}

export function saveExerciseProgress(
  exercise: Pick<Exercise, "id" | "module" | "category" | "title">,
  progress: Pick<ExerciseProgressEntry, "completed" | "score" | "total">,
): ExerciseProgressState {
  const state = readState();
  const entryKey = getProgressKey(exercise);
  const updatedAt = new Date().toISOString();

  const nextExercises = {
    ...state.exercises,
    [entryKey]: {
      id: exercise.id,
      module: exercise.module,
      category: exercise.category,
      title: exercise.title,
      completed: progress.completed,
      score: progress.score,
      total: progress.total,
      updatedAt,
    },
  };

  const entries = Object.values(nextExercises);
  const nextState: ExerciseProgressState = {
    exercises: nextExercises,
    completedCount: entries.filter((entry) => entry.completed).length,
    totalScore: entries.reduce((sum, entry) => sum + entry.score, 0),
    updatedAt,
  };

  writeState(nextState);
  return nextState;
}