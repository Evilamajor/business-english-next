"use client";

import Sidebar from "@/src/components/english/Sidebar";
import NotesPanel from "@/src/components/english/NotesPanel";
import {
  BusinessUxProvider,
  useBusinessUx,
} from "@/src/components/english/BusinessUxContext";

function BusinessEnglishLayoutContent({ children }: { children: React.ReactNode }) {
  const {
    sidebarVisible,
    setSidebarVisible,
    notesOpen,
    setNotesOpen,
    readingMode,
    theme,
    setTheme,
  } = useBusinessUx();

  const effectiveSidebarVisible = sidebarVisible && !readingMode;
  const sidebarWidthClass = effectiveSidebarVisible ? "w-[300px] opacity-100" : "w-0 opacity-0";
  const notesWidthClass = notesOpen ? "w-[350px] opacity-100" : "w-0 opacity-0";

  return (
    <div className="min-h-screen w-full px-4 py-6 md:px-6 md:py-8">
      <main className="flex min-h-[calc(100vh-3rem)] w-full gap-6 transition-all duration-300 ease-in-out">
        <aside
          className={`h-full overflow-hidden rounded-[20px] border border-white/15 bg-slate-900/30 transition-all duration-300 ease-in-out ${sidebarWidthClass}`}
          aria-hidden={!effectiveSidebarVisible}
        >
          <div className={`h-full w-[300px] p-1 transition-transform duration-300 ${effectiveSidebarVisible ? "translate-x-0" : "-translate-x-4"}`}>
            <h1 className="px-3 py-2 text-2xl font-bold tracking-tight text-slate-100">Business English</h1>
            <Sidebar />
          </div>
        </aside>

        <section
          className={`min-w-0 flex-1 overflow-hidden rounded-[20px] border border-white/20 shadow-[0_10px_30px_rgba(0,0,0,0.25)] backdrop-blur-sm transition-all duration-300 ${
            theme === "light" ? "bg-slate-50/95" : "bg-white/95"
          }`}
        >
          <div className={`mx-auto w-full ${readingMode ? "max-w-7xl p-5 md:p-6" : "max-w-6xl p-8 md:p-10"}`}>
            <div className="mb-4 flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => setSidebarVisible((prev) => !prev)}
                className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100"
              >
                ☰ {effectiveSidebarVisible ? "Hide Sidebar" : "Show Sidebar"}
              </button>
              <button
                type="button"
                onClick={() => setNotesOpen((prev) => !prev)}
                className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100"
              >
                📝 {notesOpen ? "Hide Notes" : "My Notes"}
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

        <aside
          className={`h-full overflow-hidden border-l border-slate-200 bg-white transition-all duration-300 ease-in-out ${notesWidthClass}`}
          aria-hidden={!notesOpen}
        >
          <div className={`h-full w-[350px] p-2 transition-transform duration-300 ${notesOpen ? "translate-x-0" : "translate-x-4"}`}>
              <NotesPanel />
          </div>
        </aside>
      </main>
    </div>
  );
}

export default function BusinessEnglishLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <BusinessUxProvider>
      <BusinessEnglishLayoutContent>{children}</BusinessEnglishLayoutContent>
    </BusinessUxProvider>
  );
}
