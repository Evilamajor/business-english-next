"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { englishSidebar } from "@/src/config/englishSidebarConfig";

const BusinessUxContext = createContext(null);

const getModuleSlugFromPathname = (pathname) => {
  const parts = pathname.split("/").filter(Boolean);

  if (parts[0] === "english" && parts[1] === "business" && parts[2]) {
    return parts[2];
  }

  return null;
};

const getSectionSegmentFromPathname = (pathname) => {
  const parts = pathname.split("/").filter(Boolean);
  return parts[3] ?? "";
};

export function BusinessUxProvider({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const moduleSlug = useMemo(() => getModuleSlugFromPathname(pathname), [pathname]);
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [readingMode, setReadingMode] = useState(false);
  const [notesOpen, setNotesOpen] = useState(false);
  const [theme, setTheme] = useState("dark");
  const [completedModules, setCompletedModules] = useState({});

  const moduleEntries = useMemo(
    () =>
      englishSidebar.flatMap((section) =>
        ((section.basePath ?? "/english/business") === "/english/business"
          ? section.children
          : []
        ).map((child) => ({
          slug: child.slug,
          title: child.title,
          sectionTitle: section.title,
          sectionSlug: section.slug,
          sectionHref: section.children[0] ? `/english/business/${section.children[0].slug}` : "/english/business",
        })),
      ),
    [],
  );

  const moduleIndex = useMemo(
    () => moduleEntries.findIndex((entry) => entry.slug === moduleSlug),
    [moduleEntries, moduleSlug],
  );

  const moduleMeta = useMemo(
    () => moduleEntries.find((entry) => entry.slug === moduleSlug) ?? null,
    [moduleEntries, moduleSlug],
  );

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const storedTheme = window.localStorage.getItem("business-theme");
    if (storedTheme === "dark" || storedTheme === "light") {
      setTheme(storedTheme);
    }

    const completionMap = {};
    moduleEntries.forEach((entry) => {
      const isCompleted = window.localStorage.getItem(`completed-${entry.slug}`) === "true";
      if (isCompleted) {
        completionMap[entry.slug] = true;
      }
    });
    setCompletedModules(completionMap);
  }, [moduleEntries]);

  useEffect(() => {
    if (typeof document === "undefined") {
      return;
    }

    document.documentElement.dataset.businessTheme = theme;
    window.localStorage.setItem("business-theme", theme);
  }, [theme]);

  useEffect(() => {
    if (readingMode) {
      setSidebarVisible(false);
    }
  }, [readingMode]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      const target = event.target;
      const isInputTarget =
        target instanceof HTMLElement &&
        (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable);

      if (isInputTarget) {
        return;
      }

      if (event.key === "s" || event.key === "S") {
        event.preventDefault();
        setSidebarVisible((prev) => !prev);
      }

      if (event.key === "r" || event.key === "R") {
        event.preventDefault();
        setReadingMode((prev) => !prev);
      }

      if (event.key === "n" || event.key === "N") {
        event.preventDefault();
        setNotesOpen((prev) => !prev);
      }

      if (moduleIndex < 0) {
        return;
      }

      const sectionSegment = getSectionSegmentFromPathname(pathname);
      const validSection = ["", "uoc-materials", "vocabulary", "grammar", "practice"].includes(sectionSegment)
        ? sectionSegment
        : "";

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        const previous = moduleEntries[moduleIndex - 1];
        if (previous) {
          const suffix = validSection ? `/${validSection}` : "";
          router.push(`/english/business/${previous.slug}${suffix}`);
        }
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();
        const next = moduleEntries[moduleIndex + 1];
        if (next) {
          const suffix = validSection ? `/${validSection}` : "";
          router.push(`/english/business/${next.slug}${suffix}`);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [moduleEntries, moduleIndex, pathname, router]);

  const markCurrentModuleCompleted = () => {
    if (!moduleSlug) {
      return;
    }

    window.localStorage.setItem(`completed-${moduleSlug}`, "true");
    setCompletedModules((prev) => ({ ...prev, [moduleSlug]: true }));
    window.dispatchEvent(new CustomEvent("business-completion-updated"));
  };

  const value = {
    moduleSlug,
    moduleMeta,
    sidebarVisible,
    setSidebarVisible,
    readingMode,
    setReadingMode,
    notesOpen,
    setNotesOpen,
    theme,
    setTheme,
    completedModules,
    markCurrentModuleCompleted,
  };

  return <BusinessUxContext.Provider value={value}>{children}</BusinessUxContext.Provider>;
}

export function useBusinessUx() {
  const context = useContext(BusinessUxContext);

  if (!context) {
    throw new Error("useBusinessUx must be used within BusinessUxProvider");
  }

  return context;
}
