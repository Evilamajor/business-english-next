interface OverviewSectionProps {
  summary: string;
  objectives: string[];
}

interface VocabularySectionProps {
  terms: Array<{ term: string; definition: string }>;
}

interface GrammarSectionProps {
  title: string;
  points: string[];
}

interface PracticeSectionProps {
  tasks: string[];
}

export function OverviewSection({ summary, objectives }: OverviewSectionProps) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-8 text-slate-800 shadow-sm md:p-10">
      <h2 className="text-2xl font-semibold tracking-tight">Overview</h2>
      <p className="mt-4 text-base leading-8 text-slate-700">{summary}</p>
      <h3 className="mt-8 text-lg font-semibold">Learning objectives</h3>
      <ul className="mt-4 list-disc space-y-3 pl-6 text-base leading-7 text-slate-700">
        {objectives.map((objective) => (
          <li key={objective}>{objective}</li>
        ))}
      </ul>
    </section>
  );
}

export function VocabularySection({ terms }: VocabularySectionProps) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-8 text-slate-800 shadow-sm md:p-10">
      <h2 className="text-2xl font-semibold tracking-tight">Vocabulary</h2>
      <ul className="mt-5 space-y-4">
        {terms.map(({ term, definition }) => (
          <li key={term} className="rounded-xl border border-slate-200 p-5">
            <p className="text-base font-semibold leading-6 text-slate-900">{term}</p>
            <p className="mt-2 text-base leading-7 text-slate-700">{definition}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function GrammarSection({ title, points }: GrammarSectionProps) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-8 text-slate-800 shadow-sm md:p-10">
      <h2 className="text-2xl font-semibold tracking-tight">Grammar</h2>
      <p className="mt-4 text-base font-medium leading-7 text-slate-700">{title}</p>
      <ul className="mt-5 list-disc space-y-3 pl-6 text-base leading-7 text-slate-700">
        {points.map((point) => (
          <li key={point}>{point}</li>
        ))}
      </ul>
    </section>
  );
}

export function PracticeSection({ tasks }: PracticeSectionProps) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-8 text-slate-800 shadow-sm md:p-10">
      <h2 className="text-2xl font-semibold tracking-tight">Practice</h2>
      <ol className="mt-5 list-decimal space-y-4 pl-6 text-base leading-7 text-slate-700">
        {tasks.map((task) => (
          <li key={task}>{task}</li>
        ))}
      </ol>
    </section>
  );
}
