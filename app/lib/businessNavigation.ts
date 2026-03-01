export type ModuleSlug = string;

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

function formatSlugToTitle(slug?: string): string {
  if (!slug) {
    return "Untitled Module";
  }

  return slug
    .split("-")
    .filter(Boolean)
    .map((token) => token.charAt(0).toUpperCase() + token.slice(1))
    .join(" ");
}

export const moduleSectionNav: readonly ModuleSectionItem[] = [
  { key: "overview", label: "UOC Materials", pathSegment: "" },
  { key: "vocabulary", label: "Vocabulary", pathSegment: "vocabulary" },
  { key: "grammar", label: "Grammar", pathSegment: "grammar" },
  { key: "practice", label: "Practice", pathSegment: "practice" },
] as const;

export function getModuleBySlug(slug?: ModuleSlug): BusinessNavigationItem | null {
  if (!slug) {
    return null;
  }

  const existing = businessEnglishNav.find((item) => item.slug === slug);

  if (existing) {
    return existing;
  }

  return {
    slug,
    title: formatSlugToTitle(slug),
    description: "Business English module overview and practice resources.",
  };
}

export function getModuleHref(slug: ModuleSlug): string {
  return `/english/business/${slug}`;
}

export function getModuleSectionHref(slug: ModuleSlug, pathSegment: ModuleSectionItem["pathSegment"]): string {
  const moduleHref = getModuleHref(slug);
  return pathSegment ? `${moduleHref}/${pathSegment}` : moduleHref;
}
