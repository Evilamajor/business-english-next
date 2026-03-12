import { ModuleExercisePage } from "@/app/components/modules/ModuleExercisePage";
import { getExercisesByModule } from "@/src/lib/exerciseEngine";

export async function generateStaticParams() {
  const exercises = await getExercisesByModule("telephone-skills");

  return exercises.map((exercise) => ({
    exerciseId: exercise.id,
  }));
}

export default async function TelephoneSkillsExercisePage({
  params,
}: {
  params: Promise<{ exerciseId?: string }>;
}) {
  const { exerciseId } = await params;

  if (!exerciseId) {
    return <div>Exercise not found</div>;
  }

  return <ModuleExercisePage moduleSlug="telephone-skills" exerciseId={exerciseId} />;
}