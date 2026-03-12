import ExerciseCard from "@/src/components/exercises/ExerciseCard";
import {
  OverviewSection,
} from "@/app/components/sections/SectionTemplates";
import UnderConstructionSection from "@/app/components/UnderConstructionSection";
import {
  businessModuleContent,
  type ModuleContent,
} from "@/app/lib/businessModuleContent";
import { getModuleBySlug, type ModuleSlug } from "@/app/lib/businessNavigation";
import {
  getModulePracticeExercises,
  getPracticeExerciseHref,
} from "@/app/lib/modulePracticeExercises";

function formatModuleTitle(moduleSlug: ModuleSlug): string {
  const moduleMeta = getModuleBySlug(moduleSlug);
  if (moduleMeta?.title) {
    return moduleMeta.title;
  }

  return moduleSlug
    .split("-")
    .filter(Boolean)
    .map((token) => token.charAt(0).toUpperCase() + token.slice(1))
    .join(" ");
}

function createFallbackContent(moduleSlug: ModuleSlug): ModuleContent {
  const moduleMeta = getModuleBySlug(moduleSlug);
  const title = moduleMeta?.title ?? "Untitled Module";

  return {
    summary: `${title} content is being prepared.`,
    objectives: ["Build confidence with this module's communication focus."],
    vocabulary: [{ term: "Content", definition: "Content coming soon." }],
    grammarFocus: {
      title: "Content coming soon",
      points: ["Detailed grammar notes will be added soon."],
    },
    practiceTasks: ["Practice activities for this module will be available soon."],
  };
}

function getContent(moduleSlug: ModuleSlug): ModuleContent {
  return businessModuleContent[moduleSlug] ?? createFallbackContent(moduleSlug);
}

interface ModuleSectionPageProps {
  moduleSlug: ModuleSlug;
}

export function ModuleOverviewPage({ moduleSlug }: ModuleSectionPageProps) {
  const content = getContent(moduleSlug);

  return (
    <OverviewSection
      moduleSlug={moduleSlug}
      summary={content.summary}
      objectives={content.objectives}
    />
  );
}

export function ModuleVocabularyPage({ moduleSlug }: ModuleSectionPageProps) {
  const title = formatModuleTitle(moduleSlug);

  return (
    <UnderConstructionSection
      title={`${title} — Vocabulary`}
      description="This section will contain structured vocabulary lists, collocations, phrasal verbs and usage examples."
    />
  );
}

export function ModuleGrammarPage({ moduleSlug }: ModuleSectionPageProps) {
  const title = formatModuleTitle(moduleSlug);

  return (
    <UnderConstructionSection
      title={`${title} — Grammar`}
      description="This section will include structured grammar explanations, key patterns and contextual examples."
    />
  );
}

export function ModulePracticePage({ moduleSlug }: ModuleSectionPageProps) {
  const title = formatModuleTitle(moduleSlug);
  const practiceExercises = getModulePracticeExercises(moduleSlug);

  if (practiceExercises.length === 0) {
    return (
      <UnderConstructionSection
        title={`${title} — Practice Exercises`}
        description="This practice library is ready for exercise cards, but this module does not have published activities yet. Add a new exercise page and register its card to expand the library."
      />
    );
  }

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-8 text-slate-800 shadow-sm md:p-10">
      <div className="max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">{title}</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">Practice Exercises</h1>
        <p className="mt-3 text-base leading-7 text-slate-600">
          Choose an exercise to practise the language patterns, business situations, and communication strategies from this module.
        </p>
      </div>

      <div className="mt-8 grid gap-5 lg:grid-cols-3">
        {practiceExercises.map((exercise) => (
          <ExerciseCard
            key={exercise.slug}
            title={exercise.title}
            description={exercise.description}
            difficulty={exercise.difficulty}
            href={getPracticeExerciseHref(moduleSlug, exercise.slug)}
          />
        ))}
      </div>
    </section>
  );
}
