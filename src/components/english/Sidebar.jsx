"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { englishSidebar } from "@/src/config/englishSidebarConfig";
import { useBusinessUx } from "@/src/components/english/BusinessUxContext";

const defaultBasePath = "/english/business";

const getChildHref = (section, child) => {
  if (child.fullSlug) {
    return child.fullSlug.startsWith("/") ? child.fullSlug : `/english/${child.fullSlug}`;
  }

  const basePath = section.basePath ?? defaultBasePath;
  return `${basePath}/${child.slug}`;
};

const getSectionHref = (section) => {
  const basePath = section.basePath ?? defaultBasePath;
  return `${basePath}/${section.slug}`;
};

export default function Sidebar() {
  const pathname = usePathname();
  const { completedModules } = useBusinessUx();
  const [openSection, setOpenSection] = useState(() => {
    const initialSection = englishSidebar.find((section) =>
      section.children.some((child) => {
        const href = getChildHref(section, child);
        return pathname === href || pathname.startsWith(`${href}/`);
      }),
    );

    return initialSection?.slug ?? null;
  });

  const routeMatchedSection = useMemo(
    () =>
      englishSidebar.find((section) =>
        section.children.some((child) => {
          const href = getChildHref(section, child);
          return pathname === href || pathname.startsWith(`${href}/`);
        }),
      )?.slug ?? null,
    [pathname],
  );

  const handleToggle = (slug) => {
    setOpenSection((prev) => (prev === slug ? null : slug));
  };

  return (
    <nav
      aria-label="Business English modules"
      className="rounded-2xl border border-white/15 bg-white/10 p-3 shadow-lg backdrop-blur-sm"
    >
      <div className="space-y-2">
        {englishSidebar.map((section) => {
          const hasChildren = section.children.length > 0;
          const sectionHref = getSectionHref(section);
          const isOpen = openSection === section.slug || (!openSection && routeMatchedSection === section.slug);
          const isCurrentLeaf = !hasChildren && (pathname === sectionHref || pathname.startsWith(`${sectionHref}/`));
          const hasActiveChild = hasChildren
            ? section.children.some((child) => {
                const href = getChildHref(section, child);
                return pathname === href || pathname.startsWith(`${href}/`);
              })
            : false;
          const isMainActive = isOpen || isCurrentLeaf || hasActiveChild;

          return (
            <div key={section.slug} className="rounded-xl">
              {hasChildren ? (
                <button
                  type="button"
                  onClick={() => handleToggle(section.slug)}
                  className={`flex w-full items-center justify-between rounded-xl border-l-4 px-4 py-3 text-left transition-all duration-200 ease-in-out ${
                    isMainActive
                      ? "border-l-blue-400 bg-blue-500/20 text-blue-100"
                      : "border-l-transparent bg-white/5 text-slate-200 hover:bg-white/10 hover:text-white"
                  }`}
                  aria-expanded={isOpen}
                  aria-controls={`section-${section.slug}`}
                >
                  <span className="text-sm font-semibold leading-5">{section.title}</span>
                  <span
                    aria-hidden
                    className={`ml-3 inline-flex h-5 w-5 items-center justify-center text-slate-300 transition-transform duration-200 ${
                      isOpen ? "rotate-180 text-blue-200" : "rotate-0"
                    }`}
                  >
                    ▾
                  </span>
                </button>
              ) : (
                <Link
                  href={sectionHref}
                  className={`flex w-full items-center rounded-xl border-l-4 px-4 py-3 text-left transition-all duration-200 ease-in-out ${
                    isMainActive
                      ? "border-l-blue-400 bg-blue-500/20 text-blue-100"
                      : "border-l-transparent bg-white/5 text-slate-200 hover:bg-white/10 hover:text-white"
                  }`}
                  onClick={() => setOpenSection(null)}
                >
                  <span className="text-sm font-semibold leading-5">{section.title}</span>
                </Link>
              )}

              {hasChildren ? (
                <div
                  id={`section-${section.slug}`}
                  className={`grid overflow-hidden transition-all duration-300 ease-in-out ${
                    isOpen ? "mt-2 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="min-h-0">
                    <ul className="space-y-1 rounded-lg bg-slate-950/20 p-2">
                      {section.children.map((child) => {
                        const childHref = getChildHref(section, child);
                        const isChildActive = pathname === childHref || pathname.startsWith(`${childHref}/`);

                        return (
                          <li key={child.slug}>
                            <Link
                              href={childHref}
                              onClick={() => setOpenSection(section.slug)}
                              className={`flex w-full items-center rounded-lg border-l-2 px-3 py-2 pl-5 text-sm leading-5 transition-all duration-200 ${
                                isChildActive
                                  ? "border-l-blue-300 bg-blue-500/20 text-blue-100"
                                  : "border-l-transparent text-slate-300 hover:border-l-white/30 hover:bg-white/5 hover:text-slate-100"
                              }`}
                            >
                              <span className="flex-1">{child.title}</span>
                              {completedModules[child.slug] ? (
                                <span aria-label="Completed" title="Completed" className="ml-2 text-emerald-300">
                                  ✔
                                </span>
                              ) : null}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
    </nav>
  );
}
