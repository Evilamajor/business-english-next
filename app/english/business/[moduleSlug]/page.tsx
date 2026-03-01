import { ModuleLayoutFrame } from "@/app/components/modules/ModuleLayoutFrame";
import { ModuleOverviewPage } from "@/app/components/modules/ModuleSectionPages";
import { englishSidebar } from "@/src/config/englishSidebarConfig";

export default async function BusinessModulePage({
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

export function generateStaticParams() {
  return englishSidebar.flatMap((section) =>
    section.children.map((child) => ({ moduleSlug: child.slug })),
  );
}
