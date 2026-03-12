import Link from "next/link";

import styles from "./ExerciseCard.module.css";
import type { ExerciseDifficulty } from "@/src/types/exercise";

interface ExerciseCardProps {
  title: string;
  description: string;
  href: string;
  difficulty?: ExerciseDifficulty;
}

function formatDifficultyLabel(difficulty?: ExerciseDifficulty): string | null {
  if (!difficulty) {
    return null;
  }

  return difficulty.charAt(0).toUpperCase() + difficulty.slice(1);
}

export default function ExerciseCard({
  title,
  description,
  href,
  difficulty,
}: ExerciseCardProps) {
  const difficultyLabel = formatDifficultyLabel(difficulty);

  return (
    <article
      className={`flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 text-slate-800 shadow-sm ${styles.card}`}
    >
      <div className="flex-1">
        {difficultyLabel ? (
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-600">{difficultyLabel}</p>
        ) : null}

        <h3 className="mt-2 text-xl font-semibold tracking-tight text-slate-900">{title}</h3>
        <p className="mt-3 text-sm leading-6 text-slate-600">{description}</p>
      </div>

      <div className="mt-6">
        <Link
          href={href}
          className={`inline-flex items-center rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 ${styles.button}`}
        >
          Start Practice →
        </Link>
      </div>
    </article>
  );
}