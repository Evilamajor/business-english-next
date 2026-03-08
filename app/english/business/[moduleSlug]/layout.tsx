import { englishSidebar } from "@/src/config/englishSidebarConfig";

export const dynamicParams = false;

export function generateStaticParams() {
  return englishSidebar.flatMap((section) =>
    section.children.map((child) => ({ moduleSlug: child.slug })),
  );
}

export default function BusinessModuleSegmentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}