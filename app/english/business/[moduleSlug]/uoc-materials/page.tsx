import { ModuleLayoutFrame } from "@/app/components/modules/ModuleLayoutFrame";
import { ModuleOverviewPage } from "@/app/components/modules/ModuleSectionPages";

export default async function DynamicModuleUocMaterialsPage({
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
      <ModuleOverviewPage moduleSlug={moduleSlug} />
    </ModuleLayoutFrame>
  );
}