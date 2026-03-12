import { ModuleLayoutFrame } from "@/app/components/modules/ModuleLayoutFrame";
import { ModuleExercisePage } from "@/app/components/modules/ModuleExercisePage";
import { getAllExercises } from "@/src/lib/exerciseEngine";

export async function generateStaticParams() {
  const exercises = await getAllExercises();

  return exercises.map((exercise) => ({
    moduleSlug: exercise.module,
    exerciseId: exercise.id,
  }));
}

export default async function DynamicPracticeExercisePage({
  params,
}: {
  params: Promise<{ moduleSlug?: string; exerciseId?: string }>;
}) {
  const { moduleSlug, exerciseId } = await params;

  if (!moduleSlug || !exerciseId) {
    return <div>Exercise not found</div>;
  }

  return (
    <ModuleLayoutFrame moduleSlug={moduleSlug}>
      <ModuleExercisePage moduleSlug={moduleSlug} exerciseId={exerciseId} />
    </ModuleLayoutFrame>
  );
}