import { ModuleLayoutFrame } from "@/app/components/modules/ModuleLayoutFrame";

export default function InternalCorrespondenceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ModuleLayoutFrame moduleSlug="internal-correspondence">{children}</ModuleLayoutFrame>;
}
