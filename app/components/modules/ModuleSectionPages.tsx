import {
  OverviewSection,
} from "@/app/components/sections/SectionTemplates";
import UnderConstructionSection from "@/app/components/UnderConstructionSection";
import {
  businessModuleContent,
  type ModuleContent,
} from "@/app/lib/businessModuleContent";
import { getModuleBySlug, type ModuleSlug } from "@/app/lib/businessNavigation";

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

  return (
    <UnderConstructionSection
      title={`${title} — Practice`}
      description="This section will include exercises, quizzes and interactive tasks to reinforce learning."
    />
  );
}
