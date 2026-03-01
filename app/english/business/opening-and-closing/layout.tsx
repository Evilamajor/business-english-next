import { ModuleLayoutFrame } from "@/app/components/modules/ModuleLayoutFrame";

export default function OpeningAndClosingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ModuleLayoutFrame moduleSlug="opening-and-closing">{children}</ModuleLayoutFrame>;
}
