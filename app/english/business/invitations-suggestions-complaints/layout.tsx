import { ModuleLayoutFrame } from "@/app/components/modules/ModuleLayoutFrame";

export default function InvitationsSuggestionsComplaintsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ModuleLayoutFrame moduleSlug="invitations-suggestions-complaints">{children}</ModuleLayoutFrame>;
}
