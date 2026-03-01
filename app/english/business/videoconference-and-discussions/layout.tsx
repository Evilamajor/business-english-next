import { ModuleLayoutFrame } from "@/app/components/modules/ModuleLayoutFrame";

export default function VideoconferenceAndDiscussionsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ModuleLayoutFrame moduleSlug="videoconference-and-discussions">{children}</ModuleLayoutFrame>;
}
