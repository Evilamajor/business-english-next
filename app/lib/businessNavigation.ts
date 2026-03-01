export type ModuleSlug =
  | "meeting-and-presentations"
  | "telephone-skills"
  | "videoconference-and-discussions"
  | "internal-correspondence"
  | "invitations-suggestions-complaints"
  | "opening-and-closing";

export type ModuleSectionKey = "overview" | "vocabulary" | "grammar" | "practice";

export interface BusinessNavigationItem {
  slug: ModuleSlug;
  title: string;
  description: string;
}

export interface ModuleSectionItem {
  key: ModuleSectionKey;
  label: string;
  pathSegment: "" | "vocabulary" | "grammar" | "practice";
}

export const businessEnglishNav: readonly BusinessNavigationItem[] = [
  {
    slug: "meeting-and-presentations",
    title: "Meeting and Presentations",
    description: "Lead meetings, structure ideas, and deliver clear presentations.",
  },
  {
    slug: "telephone-skills",
    title: "Telephone Skills",
    description: "Handle calls professionally with confident and concise language.",
  },
  {
    slug: "videoconference-and-discussions",
    title: "Videoconference and Discussions",
    description: "Facilitate online discussions and manage remote collaboration.",
  },
  {
    slug: "internal-correspondence",
    title: "Internal Correspondence",
    description: "Write effective internal emails, updates, and action notes.",
  },
  {
    slug: "invitations-suggestions-complaints",
    title: "Invitations, Suggestions, and Complaints",
    description: "Use tactful language for requests, feedback, and difficult messages.",
  },
  {
    slug: "opening-and-closing",
    title: "Opening and Closing",
    description: "Open interactions confidently and close conversations professionally.",
  },
] as const;

export const moduleSectionNav: readonly ModuleSectionItem[] = [
  { key: "overview", label: "Overview", pathSegment: "" },
  { key: "vocabulary", label: "Vocabulary", pathSegment: "vocabulary" },
  { key: "grammar", label: "Grammar", pathSegment: "grammar" },
  { key: "practice", label: "Practice", pathSegment: "practice" },
] as const;

export function getModuleBySlug(slug: ModuleSlug): BusinessNavigationItem {
  return businessEnglishNav.find((item) => item.slug === slug) ?? businessEnglishNav[0];
}

export function getModuleHref(slug: ModuleSlug): string {
  return `/english/business/${slug}`;
}

export function getModuleSectionHref(slug: ModuleSlug, pathSegment: ModuleSectionItem["pathSegment"]): string {
  const moduleHref = getModuleHref(slug);
  return pathSegment ? `${moduleHref}/${pathSegment}` : moduleHref;
}
