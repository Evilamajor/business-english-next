import {
  GrammarSection,
  OverviewSection,
  PracticeSection,
  VocabularySection,
} from "@/app/components/sections/SectionTemplates";
import {
  businessModuleContent,
  type ModuleContent,
} from "@/app/lib/businessModuleContent";
import type { ModuleSlug } from "@/app/lib/businessNavigation";

function getContent(moduleSlug: ModuleSlug): ModuleContent {
  return businessModuleContent[moduleSlug];
}

interface ModuleSectionPageProps {
  moduleSlug: ModuleSlug;
}

export function ModuleOverviewPage({ moduleSlug }: ModuleSectionPageProps) {
  const content = getContent(moduleSlug);

  return (
    <OverviewSection summary={content.summary} objectives={content.objectives} />
  );
}

export function ModuleVocabularyPage({ moduleSlug }: ModuleSectionPageProps) {
  const content = getContent(moduleSlug);

  return <VocabularySection terms={content.vocabulary} />;
}

export function ModuleGrammarPage({ moduleSlug }: ModuleSectionPageProps) {
  const content = getContent(moduleSlug);

  return (
    <GrammarSection
      title={content.grammarFocus.title}
      points={content.grammarFocus.points}
    />
  );
}

export function ModulePracticePage({ moduleSlug }: ModuleSectionPageProps) {
  const content = getContent(moduleSlug);

  return <PracticeSection tasks={content.practiceTasks} />;
}
