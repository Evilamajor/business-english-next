interface UnderConstructionSectionProps {
  title: string;
  description?: string;
}

export default function UnderConstructionSection({
  title,
  description,
}: UnderConstructionSectionProps) {
  return (
    <section className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
      <h1 className="mb-4 text-2xl font-bold text-slate-900">{title}</h1>

      <p className="mb-6 text-sm leading-7 text-slate-600">
        {description ||
          "This section is currently under development and will be expanded with structured learning materials."}
      </p>

      <div className="rounded-lg border-2 border-dashed border-slate-300 p-6 text-center">
        <p className="text-lg font-medium text-slate-800">🚧 Under Construction</p>
        <p className="mt-2 text-sm text-slate-600">
          Content will be generated and structured in future iterations.
        </p>
      </div>
    </section>
  );
}
