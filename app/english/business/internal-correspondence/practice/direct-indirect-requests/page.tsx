import IndirectRequestExercise from "@/src/components/exercises/IndirectRequestExercise";

export default function DirectIndirectRequestsPracticePage() {
  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-slate-200 bg-white p-6 text-slate-800 shadow-sm md:p-8">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">Internal correspondence</p>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900 md:text-3xl">
          Practice Direct and Indirect Requests
        </h1>
        <p className="mt-3 max-w-3xl text-base leading-7 text-slate-600">
          Transform formal, polite requests into clear direct questions. This exercise focuses on the phrasing commonly used in internal emails, updates, and written requests.
        </p>
      </section>

      <IndirectRequestExercise />
    </div>
  );
}