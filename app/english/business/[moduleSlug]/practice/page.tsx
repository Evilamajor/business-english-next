import { ModuleLayoutFrame } from "@/app/components/modules/ModuleLayoutFrame";
import { ModulePracticePage } from "@/app/components/modules/ModuleSectionPages";

export default async function DynamicModulePracticePage({
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
      <ModulePracticePage moduleSlug={moduleSlug} />
    </ModuleLayoutFrame>
  );
}
