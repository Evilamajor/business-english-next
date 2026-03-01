import { ModuleLayoutFrame } from "@/app/components/modules/ModuleLayoutFrame";
import { ModuleVocabularyPage } from "@/app/components/modules/ModuleSectionPages";

export default async function DynamicModuleVocabularyPage({
  params,
}: {
  params: Promise<{ moduleSlug?: string }>;
}) {
  const { moduleSlug } = await params;

  if (!moduleSlug) {
    return <div>Module not found</div>;
  }

  return (
    <ModuleLayoutFrame moduleSlug={moduleSlug}>
      <ModuleVocabularyPage moduleSlug={moduleSlug} />
    </ModuleLayoutFrame>
  );
}
