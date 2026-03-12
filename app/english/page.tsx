import Link from "next/link";

export default function EnglishHome() {
  return (
    <main className="mx-auto flex min-h-screen max-w-4xl flex-col justify-center gap-6 px-6 py-16">
      <div className="space-y-3">
        <h1 className="text-4xl font-bold tracking-tight text-slate-900">English Learning Platform</h1>
        <p className="max-w-2xl text-base text-slate-600">
          Choose a learning area to explore business English modules or browse curated study resources.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Link
          href="/english/business"
          className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-colors hover:border-slate-300 hover:bg-slate-50"
        >
          <h2 className="text-xl font-semibold text-slate-900">Business English</h2>
          <p className="mt-2 text-sm text-slate-600">Open the business modules and continue through each section.</p>
        </Link>

        <Link
          href="/english/resources"
          className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-colors hover:border-slate-300 hover:bg-slate-50"
        >
          <h2 className="text-xl font-semibold text-slate-900">Resources</h2>
          <p className="mt-2 text-sm text-slate-600">Browse external tools and materials for extra practice.</p>
        </Link>
      </div>
    </main>
  );
}