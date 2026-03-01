import { ModuleLayoutFrame } from "@/app/components/modules/ModuleLayoutFrame";
import { ModuleGrammarPage } from "@/app/components/modules/ModuleSectionPages";

export default async function DynamicModuleGrammarPage({
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
      <ModuleGrammarPage moduleSlug={moduleSlug} />
    </ModuleLayoutFrame>
  );
}
