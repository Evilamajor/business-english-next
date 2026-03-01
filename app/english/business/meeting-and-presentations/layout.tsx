import { ModuleLayoutFrame } from "@/app/components/modules/ModuleLayoutFrame";

export default function MeetingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ModuleLayoutFrame moduleSlug="meeting-and-presentations">{children}</ModuleLayoutFrame>;
}