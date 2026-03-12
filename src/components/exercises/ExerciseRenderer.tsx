"use client";

import { useState } from "react";

import type { Exercise } from "@/src/types/exercise";
import {
  getExerciseProgress,
  saveExerciseProgress,
  type ExerciseProgressEntry,
} from "@/src/lib/exerciseProgress";

import IndirectRequestExercise from "./IndirectRequestExercise";
import type { IndirectRequestExerciseItem } from "./indirectRequestExercises";

interface ExerciseRendererProps {
  exercise: Exercise;
}

interface ExerciseProgressSnapshot {
  completedCount: number;
  totalCount: number;
  score: number;
  isComplete: boolean;
}

function UnsupportedExercise({ exercise }: { exercise: Exercise }) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 text-slate-800 shadow-sm md:p-8">
      <h2 className="text-2xl font-semibold tracking-tight text-slate-900">{exercise.title}</h2>
      <p className="mt-3 text-sm leading-6 text-slate-600">{exercise.description}</p>
      <div className="mt-6 rounded-xl border border-dashed border-slate-300 bg-slate-50 p-5 text-sm leading-6 text-slate-600">
        This exercise uses the <span className="font-semibold text-slate-900">{exercise.component}</span> renderer. The route and card are generated automatically, and the interactive implementation can be plugged in later without adding a new page.
      </div>
    </section>
  );
}

export default function ExerciseRenderer({ exercise }: ExerciseRendererProps) {
  const [savedProgress, setSavedProgress] = useState<ExerciseProgressEntry | null>(() =>
    getExerciseProgress(exercise),
  );

  function handleProgressChange(snapshot: ExerciseProgressSnapshot) {
    const nextState = saveExerciseProgress(exercise, {
      completed: snapshot.isComplete,
      score: snapshot.score,
      total: snapshot.totalCount,
    });

    setSavedProgress(nextState.exercises[`${exercise.module}:${exercise.id}`] ?? null);
  }

  return (
    <div className="space-y-5">
      {savedProgress ? (
        <div className="rounded-xl border border-blue-100 bg-blue-50 px-4 py-3 text-sm text-blue-800">
          Saved progress: {savedProgress.score} / {savedProgress.total}
          {savedProgress.completed ? " completed" : " in progress"}
        </div>
      ) : null}

      {exercise.component === "sentence-rebuild" ? (
        <IndirectRequestExercise
          title={exercise.title}
          exercises={exercise.data as IndirectRequestExerciseItem[]}
          onProgressChange={handleProgressChange}
        />
      ) : (
        <UnsupportedExercise exercise={exercise} />
      )}
    </div>
  );
}