import { ModuleHeader } from "@/app/components/modules/ModuleHeader";
import { ModuleSectionNav } from "@/app/components/modules/ModuleSectionNav";
import { getModuleBySlug, type ModuleSlug } from "@/app/lib/businessNavigation";

interface ModuleLayoutFrameProps {
  moduleSlug: ModuleSlug;
  children: React.ReactNode;
}

export function ModuleLayoutFrame({ moduleSlug, children }: ModuleLayoutFrameProps) {
  const moduleMeta = getModuleBySlug(moduleSlug);

  return (
    <section className="space-y-8">
      <ModuleHeader title={moduleMeta.title} description={moduleMeta.description} />
      <ModuleSectionNav moduleSlug={moduleSlug} />
      <div className="pt-1">{children}</div>
    </section>
  );
}
