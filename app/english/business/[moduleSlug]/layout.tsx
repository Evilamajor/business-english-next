import { englishSidebar } from "@/src/config/englishSidebarConfig";
import { businessEnglishNav } from "@/app/lib/businessNavigation";

const moduleSlugAliases = ["writing", "meetings"];

export function generateStaticParams() {
  const moduleSlugs = new Set<string>(moduleSlugAliases);

  for (const item of businessEnglishNav) {
    moduleSlugs.add(item.slug);
  }

  for (const section of englishSidebar) {
    moduleSlugs.add(section.slug);

    for (const child of section.children) {
      moduleSlugs.add(child.slug);
    }
  }

  return Array.from(moduleSlugs).map((moduleSlug) => ({ moduleSlug }));
}

export default function BusinessModuleSegmentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}