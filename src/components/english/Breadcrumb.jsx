"use client";

import Link from "next/link";
import { useBusinessUx } from "@/src/components/english/BusinessUxContext";

const formatFallbackTitle = (slug) =>
  (slug ?? "")
    .split("-")
    .filter(Boolean)
    .map((token) => token.charAt(0).toUpperCase() + token.slice(1))
    .join(" ");

export default function Breadcrumb() {
  const { moduleSlug, moduleMeta } = useBusinessUx();

  if (!moduleSlug) {
    return null;
  }

  const moduleTitle = moduleMeta?.title ?? formatFallbackTitle(moduleSlug);
  const sectionTitle = moduleMeta?.sectionTitle ?? "Modules";
  const sectionHref = moduleMeta?.sectionHref ?? "/english/business";

  return (
    <nav aria-label="Breadcrumb" className="text-sm text-slate-500">
      <ol className="flex flex-wrap items-center gap-1.5">
        <li>
          <Link href="/english/business" className="transition-colors hover:text-slate-700">
            Business English
          </Link>
        </li>
        <li aria-hidden className="text-slate-400">
          &gt;
        </li>
        <li>
          <Link href={sectionHref} className="transition-colors hover:text-slate-700">
            {sectionTitle}
          </Link>
        </li>
        <li aria-hidden className="text-slate-400">
          &gt;
        </li>
        <li className="font-medium text-slate-700">{moduleTitle}</li>
      </ol>
    </nav>
  );
}
