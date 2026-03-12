import { notFound } from "next/navigation";

import { getModuleBySlug } from "@/app/lib/businessNavigation";
import ExerciseRenderer from "@/src/components/exercises/ExerciseRenderer";
import { getExercise } from "@/src/lib/exerciseEngine";

interface ModuleExercisePageProps {
  moduleSlug: string;
  exerciseId: string;
}

export async function ModuleExercisePage({
  moduleSlug,
  exerciseId,
}: ModuleExercisePageProps) {
  const exercise = await getExercise(moduleSlug, exerciseId);

  if (!exercise) {
    notFound();
  }

  const moduleTitle = getModuleBySlug(moduleSlug)?.title ?? "Practice";

  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-slate-200 bg-white p-6 text-slate-800 shadow-sm md:p-8">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">{moduleTitle}</p>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900 md:text-3xl">
          {exercise.title}
        </h1>
        <p className="mt-3 max-w-3xl text-base leading-7 text-slate-600">
          {exercise.description}
        </p>
      </section>

      <ExerciseRenderer exercise={exercise} />
    </div>
  );
}