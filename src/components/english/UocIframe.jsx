"use client";

import { useEffect, useState } from "react";
import { useBusinessUx } from "@/src/components/english/BusinessUxContext";

export default function UocIframe({ url, title }) {
  const {
    readingMode,
    setReadingMode,
    setNotesOpen,
    moduleSlug,
    completedModules,
    markCurrentModuleCompleted,
  } = useBusinessUx();
  const [isLoading, setIsLoading] = useState(true);
  const [isBlocked, setIsBlocked] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setIsBlocked(false);

    const timeoutId = setTimeout(() => {
      setIsBlocked(true);
      setIsLoading(false);
    }, 9000);

    return () => clearTimeout(timeoutId);
  }, [url]);

  const handleLoad = () => {
    setIsLoading(false);
    setIsBlocked(false);
  };

  return (
    <div className="w-full overflow-hidden rounded-2xl border border-slate-200 bg-white p-3 shadow-md transition-all duration-300">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2 px-1 pt-1">
        <h2 className="text-lg font-semibold text-slate-800">UOC Materials</h2>
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setReadingMode((prev) => !prev)}
            className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100"
          >
            📖 {readingMode ? "Exit Reading Mode" : "Reading Mode"}
          </button>
          <button
            type="button"
            onClick={() => setNotesOpen((prev) => !prev)}
            className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100"
          >
            📝 My Notes
          </button>
          <button
            type="button"
            onClick={markCurrentModuleCompleted}
            disabled={!moduleSlug || completedModules[moduleSlug]}
            className="rounded-lg border border-emerald-300 px-3 py-1.5 text-sm font-medium text-emerald-700 transition-colors hover:bg-emerald-50 disabled:cursor-default disabled:opacity-70"
          >
            {moduleSlug && completedModules[moduleSlug] ? "✔ Completed" : "✔ Mark as Completed"}
          </button>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100"
          >
            Open Full Page ↗
          </a>
        </div>
      </div>

      <div className="relative min-h-[85vh] w-full overflow-hidden rounded-xl bg-slate-100">
        <div
          aria-hidden={!isLoading}
          className={`absolute inset-0 z-10 transition-opacity duration-300 ${
            isLoading ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
        >
          <div className="h-full w-full animate-pulse bg-gradient-to-b from-slate-100 via-slate-200 to-slate-100" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-slate-300 border-t-blue-500" />
          </div>
        </div>

        <iframe
          src={url}
          title={title}
          loading="lazy"
          onLoad={handleLoad}
          referrerPolicy="no-referrer"
          sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-popups-to-escape-sandbox allow-downloads"
          className={`w-full border-0 transition-all duration-300 ${
            readingMode ? "h-[90vh] min-h-[90vh]" : "h-[86vh] min-h-[85vh]"
          } ${
            isLoading ? "opacity-0" : "opacity-100"
          }`}
        />
      </div>

      {isBlocked ? (
        <div className="mt-3 flex items-center justify-between gap-3 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          <p>This content may be blocked from embedding by the source website.</p>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 rounded-md bg-amber-500 px-3 py-1.5 font-semibold text-white transition-colors hover:bg-amber-600"
          >
            Open in new tab
          </a>
        </div>
      ) : null}
    </div>
  );
}
