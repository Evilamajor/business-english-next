import { indirectRequestExercises } from "@/src/components/exercises/indirectRequestExercises";
import type { Exercise } from "@/src/types/exercise";

export const exercise: Exercise = {
  id: "direct-indirect-requests",
  module: "internal-correspondence",
  category: "writing",
  title: "Direct and Indirect Requests",
  description: "Transform polite Business English requests into direct questions.",
  difficulty: "intermediate",
  component: "sentence-rebuild",
  data: indirectRequestExercises,
};