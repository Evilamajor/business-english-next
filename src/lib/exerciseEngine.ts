import "server-only";

import { readdirSync } from "node:fs";
import path from "node:path";

import type { Exercise } from "@/src/types/exercise";

const exercisesRoot = path.join(process.cwd(), "src/exercises");

function collectExerciseFiles(directory: string, parentPath = ""): string[] {
  const entries = readdirSync(directory, { withFileTypes: true });

  return entries.flatMap((entry) => {
    const absolutePath = path.join(directory, entry.name);
    const relativePath = parentPath ? `${parentPath}/${entry.name}` : entry.name;

    if (entry.isDirectory()) {
      return collectExerciseFiles(absolutePath, relativePath);
    }

    if (!entry.isFile() || !entry.name.endsWith(".ts") || entry.name.endsWith(".d.ts")) {
      return [];
    }

    return [relativePath];
  });
}

function isExercise(candidate: unknown): candidate is Exercise {
  if (!candidate || typeof candidate !== "object") {
    return false;
  }

  const exercise = candidate as Partial<Exercise>;

  return (
    typeof exercise.id === "string" &&
    typeof exercise.module === "string" &&
    typeof exercise.category === "string" &&
    typeof exercise.title === "string" &&
    typeof exercise.description === "string" &&
    typeof exercise.component === "string"
  );
}

async function importExercise(filePath: string): Promise<Exercise | null> {
  const normalizedFilePath = filePath.replace(/\.ts$/, "");
  const loadedModule = await import(
    /* webpackInclude: /src\/exercises\/.*\.(ts|tsx)$/ */
    `@/src/exercises/${normalizedFilePath}`
  );

  const candidate = loadedModule.exercise ?? loadedModule.default?.exercise ?? loadedModule.default;
  return isExercise(candidate) ? candidate : null;
}

let exercisesPromise: Promise<Exercise[]> | null = null;

async function loadExercises(): Promise<Exercise[]> {
  const filePaths = collectExerciseFiles(exercisesRoot);
  const loadedExercises = await Promise.all(filePaths.map((filePath) => importExercise(filePath)));

  return loadedExercises
    .filter((exercise): exercise is Exercise => exercise !== null)
    .sort((left, right) => left.title.localeCompare(right.title));
}

export async function getAllExercises(): Promise<Exercise[]> {
  if (!exercisesPromise) {
    exercisesPromise = loadExercises();
  }

  return exercisesPromise;
}

export async function getExercisesByModule(moduleSlug: string): Promise<Exercise[]> {
  const exercises = await getAllExercises();
  return exercises.filter((exercise) => exercise.module === moduleSlug);
}

export async function getExercise(moduleSlug: string, exerciseId: string): Promise<Exercise | null> {
  const exercises = await getAllExercises();

  return (
    exercises.find(
      (exercise) => exercise.module === moduleSlug && exercise.id === exerciseId,
    ) ?? null
  );
}