import { resourcesData } from "@/app/lib/resourcesData";

export default function ResourcesPage() {
  return (
    <section className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold text-slate-900">Resources Hub</h1>
        <p className="mt-1 text-sm text-slate-600">
          Curated external tools for structured English study.
        </p>
      </header>

      <div className="grid gap-6 md:grid-cols-2">
        {resourcesData.map((resource) => (
          <article
            key={resource.slug}
            className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-200 hover:shadow-md"
          >
            <div className="mb-3">
              <span className="rounded-full bg-blue-100 px-2 py-1 text-xs font-semibold text-blue-700">
                {resource.category}
              </span>
            </div>

            <h2 className="mb-2 text-lg font-semibold text-slate-900">{resource.title}</h2>
            <p className="mb-5 text-sm text-slate-600">{resource.description}</p>

            <a
              href={resource.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
            >
              Open Resource ↗
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}
