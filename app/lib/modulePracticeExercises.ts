import {
  getModuleBaseHref,
  getModuleBySlug,
  type ModuleSlug,
} from "@/app/lib/businessNavigation";

export interface PracticeExerciseDefinition {
  slug: string;
  title: string;
  description: string;
  difficulty?: string;
}

const modulePracticeExercises: Partial<Record<ModuleSlug, PracticeExerciseDefinition[]>> = {
  "internal-correspondence": [
    {
      slug: "direct-indirect-requests",
      title: "Practice Direct and Indirect Requests",
      description:
        "Transform polite Business English requests into direct questions by rebuilding the sentence using word blocks.",
      difficulty: "Intermediate",
    },
    {
      slug: "internal-messages",
      title: "Internal Messages Practice",
      description:
        "Review the structure, tone, and clarity of short internal updates, reminders, and action notes.",
      difficulty: "Intermediate",
    },
    {
      slug: "requesting-information",
      title: "Requesting Information",
      description:
        "Practise writing concise information requests with clear context, deadlines, and professional tone.",
      difficulty: "Intermediate",
    },
  ],
};

export function getModulePracticeExercises(moduleSlug: ModuleSlug): PracticeExerciseDefinition[] {
  return modulePracticeExercises[moduleSlug] ?? [];
}

export function getPracticeExerciseHref(moduleSlug: ModuleSlug, exerciseSlug: string): string {
  return `${getModuleBaseHref(moduleSlug)}/practice/${exerciseSlug}`;
}

export function getPracticePageHeading(moduleSlug: ModuleSlug): string {
  return `${getModuleBySlug(moduleSlug)?.title ?? "Module"} Practice Exercises`;
}