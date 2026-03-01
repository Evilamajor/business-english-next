"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  getModuleSectionHref,
  moduleSectionNav,
  type ModuleSlug,
} from "@/app/lib/businessNavigation";

interface ModuleSectionNavProps {
  moduleSlug: ModuleSlug;
}

export function ModuleSectionNav({ moduleSlug }: ModuleSectionNavProps) {
  const pathname = usePathname();

  return (
    <nav aria-label="Module sections" className="flex flex-wrap gap-3">
      {moduleSectionNav.map((section) => {
        const href = getModuleSectionHref(moduleSlug, section.pathSegment);
        const isActive = pathname === href;

        return (
          <Link
            key={section.key}
            href={href}
            className={`rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-200 ease-in-out ${
              isActive
                ? "bg-blue-600 text-white shadow-md shadow-blue-300/50"
                : "border border-slate-200 bg-white text-slate-700 hover:-translate-y-0.5 hover:border-slate-300 hover:bg-slate-100 hover:text-slate-900"
            }`}
          >
            {section.label}
          </Link>
        );
      })}
    </nav>
  );
}
