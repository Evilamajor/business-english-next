"use client";

import { ModuleSectionNav } from "@/app/components/modules/ModuleSectionNav";
import type { ModuleSlug } from "@/app/lib/businessNavigation";
import Breadcrumb from "@/src/components/english/Breadcrumb";
import { useBusinessUx } from "@/src/components/english/BusinessUxContext";
import { usePathname } from "next/navigation";

interface ModuleLayoutFrameProps {
  moduleSlug: ModuleSlug;
  children: React.ReactNode;
}

export function ModuleLayoutFrame({ moduleSlug, children }: ModuleLayoutFrameProps) {
  const { readingMode } = useBusinessUx();
  const pathname = usePathname();

  if (!moduleSlug) {
    return <div>Invalid module</div>;
  }

  return (
    <section className={`space-y-4 transition-all duration-300 ${readingMode ? "md:space-y-3" : "md:space-y-5"}`}>
      <Breadcrumb />
      <ModuleSectionNav moduleSlug={moduleSlug} />
      <div key={pathname} className="module-content-fade">
        {children}
      </div>
    </section>
  );
}
