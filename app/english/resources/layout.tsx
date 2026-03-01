"use client";

import type { Dispatch, SetStateAction } from "react";
import Sidebar from "@/src/components/english/Sidebar";
import {
  BusinessUxProvider,
  useBusinessUx,
} from "@/src/components/english/BusinessUxContext";

function ResourcesLayoutContent({ children }: { children: React.ReactNode }) {
  const {
    sidebarVisible,
    setSidebarVisible,
    theme,
    setTheme,
  } = useBusinessUx() as {
    sidebarVisible: boolean;
    setSidebarVisible: Dispatch<SetStateAction<boolean>>;
    theme: "dark" | "light";
    setTheme: Dispatch<SetStateAction<"dark" | "light">>;
  };

  return (
    <div className="min-h-screen w-full px-4 py-6 md:px-6 md:py-8">
      <main
        className={`grid min-h-[calc(100vh-3rem)] w-full gap-6 transition-all duration-300 ease-in-out ${
          sidebarVisible ? "grid-cols-[300px_1fr]" : "grid-cols-[1fr]"
        }`}
      >
        {sidebarVisible ? (
          <aside className="h-full overflow-auto rounded-[20px] border-r border-white/15 bg-slate-900/30 p-1">
            <h1 className="px-3 py-2 text-2xl font-bold tracking-tight text-slate-100">English Platform</h1>
            <Sidebar />
          </aside>
        ) : null}

        <section
          className={`overflow-hidden rounded-[20px] border border-white/20 shadow-[0_10px_30px_rgba(0,0,0,0.25)] backdrop-blur-sm transition-all duration-300 ${
            theme === "light" ? "bg-slate-50/95" : "bg-white/95"
          }`}
        >
          <div className="mx-auto w-full max-w-6xl p-8 md:p-10">
            <div className="mb-4 flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => setSidebarVisible((prev) => !prev)}
                className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100"
              >
                ☰ {sidebarVisible ? "Hide Sidebar" : "Show Sidebar"}
              </button>
              <button
                type="button"
                onClick={() => setTheme((prev) => (prev === "dark" ? "light" : "dark"))}
                className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100"
              >
                {theme === "dark" ? "☀ Light Mode" : "🌙 Dark Mode"}
              </button>
            </div>
            {children}
          </div>
        </section>
      </main>
    </div>
  );
}

export default function ResourcesLayout({ children }: { children: React.ReactNode }) {
  return (
    <BusinessUxProvider>
      <ResourcesLayoutContent>{children}</ResourcesLayoutContent>
    </BusinessUxProvider>
  );
}
