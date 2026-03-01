import { ModuleLayoutFrame } from "@/app/components/modules/ModuleLayoutFrame";

export default function TelephoneSkillsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ModuleLayoutFrame moduleSlug="telephone-skills">{children}</ModuleLayoutFrame>;
}
