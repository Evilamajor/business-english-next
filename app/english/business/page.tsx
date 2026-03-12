import Link from "next/link";
import { businessEnglishNav, getModuleHref } from "@/app/lib/businessNavigation";

export default function BusinessHome() {
  return (
    <main className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Business English Modules</h1>
        <p className="max-w-2xl text-sm text-slate-600">
          Select a module to start learning business communication skills.
        </p>
      </header>

      <div className="grid gap-4 md:grid-cols-2">
        {businessEnglishNav.map((module) => (
          <Link
            key={module.slug}
            href={getModuleHref(module.slug)}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-colors hover:border-slate-300 hover:bg-slate-50"
          >
            <h2 className="text-lg font-semibold text-slate-900">{module.title}</h2>
            <p className="mt-2 text-sm text-slate-600">{module.description}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}