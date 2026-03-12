"use client";

import { useState } from "react";

import styles from "./IndirectRequestExercise.module.css";
import {
  indirectRequestExercises,
  type IndirectRequestExerciseItem,
} from "./indirectRequestExercises";

interface IndirectRequestExerciseProps {
  exercises?: IndirectRequestExerciseItem[];
  title?: string;
}

interface WordToken {
  id: string;
  text: string;
  position: number;
}

interface DragPayload {
  source: "bank" | "answer";
  itemId: string;
  slotIndex?: number;
}

type FeedbackState = "idle" | "correct" | "incorrect" | "revealed";

function createWordTokens(exercise: IndirectRequestExerciseItem): WordToken[] {
  return exercise.words.map((text, index) => ({
    id: `${exercise.id}-${index}-${text}`,
    text,
    position: index,
  }));
}

function shuffleTokens(tokens: WordToken[]): WordToken[] {
  const shuffled = [...tokens];

  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[index]];
  }

  return shuffled;
}

function normalizeAnswer(value: string): string {
  return value
    .toLowerCase()
    .replace(/[?!.,]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function sortBank(tokens: WordToken[]): WordToken[] {
  return [...tokens].sort((left, right) => left.position - right.position);
}

function buildAnswerSlots(exercise: IndirectRequestExerciseItem | null): Array<WordToken | null> {
  if (!exercise) {
    return [];
  }

  return Array.from({ length: exercise.words.length }, () => null);
}

function buildWordBank(exercise: IndirectRequestExerciseItem | null): WordToken[] {
  if (!exercise) {
    return [];
  }

  return shuffleTokens(createWordTokens(exercise));
}

export default function IndirectRequestExercise({
  exercises = indirectRequestExercises,
  title = "Indirect Requests in Business English",
}: IndirectRequestExerciseProps) {
  const initialExercise = exercises[0] ?? null;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answerSlots, setAnswerSlots] = useState<Array<WordToken | null>>(() =>
    buildAnswerSlots(initialExercise),
  );
  const [wordBank, setWordBank] = useState<WordToken[]>(() => buildWordBank(initialExercise));
  const [feedback, setFeedback] = useState<FeedbackState>("idle");
  const [completedIds, setCompletedIds] = useState<number[]>([]);
  const [score, setScore] = useState(0);
  const [dragPayload, setDragPayload] = useState<DragPayload | null>(null);
  const [activeSlotIndex, setActiveSlotIndex] = useState<number | null>(null);
  const [bankDropActive, setBankDropActive] = useState(false);

  const currentExercise = exercises[currentIndex] ?? null;
  const progressPercent = exercises.length === 0 ? 0 : (completedIds.length / exercises.length) * 100;
  const currentCompleted = currentExercise ? completedIds.includes(currentExercise.id) : false;
  const allCompleted = completedIds.length === exercises.length;

  if (!currentExercise) {
    return (
      <section className="rounded-2xl border border-slate-200 bg-white p-6 text-slate-800 shadow-sm md:p-8">
        <h2 className="text-2xl font-semibold tracking-tight text-slate-900">{title}</h2>
        <p className="mt-3 text-sm leading-6 text-slate-600">
          No exercises are available yet. Pass an exercise dataset to render this activity.
        </p>
      </section>
    );
  }

  function clearFeedbackState() {
    if (feedback !== "idle") {
      setFeedback("idle");
    }
  }

  function loadExercise(nextIndex: number) {
    const nextExercise = exercises[nextIndex] ?? null;

    setCurrentIndex(nextIndex);
    setAnswerSlots(buildAnswerSlots(nextExercise));
    setWordBank(buildWordBank(nextExercise));
    setFeedback("idle");
    setDragPayload(null);
    setActiveSlotIndex(null);
    setBankDropActive(false);
  }

  function placeFromBank(tokenId: string, slotIndex: number) {
    const token = wordBank.find((item) => item.id === tokenId);

    if (!token) {
      return;
    }

    const nextAnswerSlots = [...answerSlots];
    const displaced = nextAnswerSlots[slotIndex];
    nextAnswerSlots[slotIndex] = token;

    const remainingBank = wordBank.filter((item) => item.id !== tokenId);
    const nextBank = displaced ? sortBank([...remainingBank, displaced]) : remainingBank;

    setAnswerSlots(nextAnswerSlots);
    setWordBank(nextBank);
    clearFeedbackState();
  }

  function moveInsideAnswer(fromIndex: number, toIndex: number) {
    if (fromIndex === toIndex) {
      return;
    }

    const nextAnswerSlots = [...answerSlots];
    const movingToken = nextAnswerSlots[fromIndex];

    if (!movingToken) {
      return;
    }

    nextAnswerSlots[fromIndex] = nextAnswerSlots[toIndex];
    nextAnswerSlots[toIndex] = movingToken;

    setAnswerSlots(nextAnswerSlots);
    clearFeedbackState();
  }

  function placeInFirstEmptySlot(tokenId: string) {
    const emptySlotIndex = answerSlots.findIndex((slot) => slot === null);

    if (emptySlotIndex === -1) {
      return;
    }

    placeFromBank(tokenId, emptySlotIndex);
  }

  function removeFromAnswer(slotIndex: number) {
    const token = answerSlots[slotIndex];

    if (!token) {
      return;
    }

    const nextAnswerSlots = [...answerSlots];
    nextAnswerSlots[slotIndex] = null;

    setAnswerSlots(nextAnswerSlots);
    setWordBank((currentBank) => sortBank([...currentBank, token]));
    clearFeedbackState();
  }

  function parseDragPayload(data: string): DragPayload | null {
    if (!data) {
      return null;
    }

    try {
      return JSON.parse(data) as DragPayload;
    } catch {
      return null;
    }
  }

  function getDragPayload(event: React.DragEvent<HTMLElement>): DragPayload | null {
    const transferPayload = parseDragPayload(event.dataTransfer.getData("application/json"));
    return transferPayload ?? dragPayload;
  }

  function handleDragStart(event: React.DragEvent<HTMLElement>, payload: DragPayload) {
    setDragPayload(payload);
    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.setData("application/json", JSON.stringify(payload));
    event.dataTransfer.setData("text/plain", payload.itemId);
  }

  function handleSlotDrop(event: React.DragEvent<HTMLButtonElement>, slotIndex: number) {
    event.preventDefault();

    const payload = getDragPayload(event);
    setActiveSlotIndex(null);

    if (!payload) {
      return;
    }

    if (payload.source === "bank") {
      placeFromBank(payload.itemId, slotIndex);
    }

    if (payload.source === "answer" && typeof payload.slotIndex === "number") {
      moveInsideAnswer(payload.slotIndex, slotIndex);
    }
  }

  function handleCheckAnswer() {
    const studentAnswer = answerSlots.map((slot) => slot?.text ?? "").join(" ");
    const expectedAnswer = currentExercise.words.join(" ");
    const isCorrect =
      answerSlots.every((slot) => slot !== null) &&
      normalizeAnswer(studentAnswer) === normalizeAnswer(expectedAnswer);

    if (isCorrect) {
      setFeedback("correct");

      if (!currentCompleted) {
        setCompletedIds((currentIds) => [...currentIds, currentExercise.id]);
        setScore((currentScore) => currentScore + 1);
      }

      return;
    }

    setFeedback("incorrect");
  }

  function handleShowAnswer() {
    const orderedTokens = createWordTokens(currentExercise);
    setAnswerSlots(orderedTokens);
    setWordBank([]);
    setFeedback("revealed");

    if (!currentCompleted) {
      setCompletedIds((currentIds) => [...currentIds, currentExercise.id]);
    }
  }

  function handleRestartExercise() {
    setAnswerSlots(buildAnswerSlots(currentExercise));
    setWordBank(buildWordBank(currentExercise));
    setFeedback("idle");
    setDragPayload(null);
    setActiveSlotIndex(null);
    setBankDropActive(false);
  }

  function handleNextQuestion() {
    const nextIncompleteIndex = exercises.findIndex(
      (exercise, index) => index > currentIndex && !completedIds.includes(exercise.id),
    );

    if (nextIncompleteIndex !== -1) {
      loadExercise(nextIncompleteIndex);
      return;
    }

    const wrappedIncompleteIndex = exercises.findIndex(
      (exercise) => !completedIds.includes(exercise.id),
    );

    if (wrappedIncompleteIndex !== -1) {
      loadExercise(wrappedIncompleteIndex);
      return;
    }

    loadExercise((currentIndex + 1) % exercises.length);
  }

  function feedbackMessage() {
    if (feedback === "correct") {
      return "Correct!";
    }

    if (feedback === "incorrect") {
      return "Try again.";
    }

    if (feedback === "revealed") {
      return "Answer revealed. Review the direct request and continue.";
    }

    return "";
  }

  return (
    <section
      className={`rounded-2xl border border-slate-200 bg-white p-6 text-slate-800 shadow-sm md:p-8 ${styles.exerciseShell} ${
        feedback === "correct" ? styles.successPulse : ""
      }`}
    >
      <div className="flex flex-col gap-6">
        <header className="flex flex-col gap-4 border-b border-slate-200 pb-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">Practice task</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900">{title}</h2>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
              Transform polite indirect requests into direct Business English questions by rebuilding the sentence with the word blocks.
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
            <p className="font-medium text-slate-900">Score: {score}</p>
            <p className="mt-1">{completedIds.length} / {exercises.length} completed</p>
          </div>
        </header>

        <div>
          <div className="mb-3 flex items-center justify-between gap-4 text-sm text-slate-600">
            <span>Question {currentIndex + 1} of {exercises.length}</span>
            <span>{allCompleted ? "All exercises completed" : "Keep going"}</span>
          </div>
          <div className="h-2.5 overflow-hidden rounded-full bg-slate-200">
            <div
              className={`h-full rounded-full bg-blue-600 ${styles.progressFill}`}
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 md:p-6">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">Indirect request</p>
          <p className="mt-3 text-lg font-medium leading-8 text-slate-900 md:text-xl">
            &quot;{currentExercise.indirect}&quot;
          </p>
        </div>

        <div>
          <div className="mb-3 flex items-center justify-between gap-3">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">Build the direct request</p>
            <p className="text-sm text-slate-500">Click a word to place it. Click a filled slot to remove it.</p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {answerSlots.map((slot, slotIndex) => {
              const slotClasses = [
                "flex min-w-[5rem] items-center justify-center rounded-xl border border-dashed px-3 py-3 text-center text-sm font-medium md:min-w-[6rem]",
                slot
                  ? "border-slate-300 bg-white text-slate-900 shadow-sm"
                  : "border-slate-300 bg-slate-50 text-slate-400",
                styles.slot,
                activeSlotIndex === slotIndex ? styles.slotActive : "",
              ]
                .filter(Boolean)
                .join(" ");

              return (
                <button
                  key={`${currentExercise.id}-slot-${slotIndex}`}
                  type="button"
                  onClick={() => removeFromAnswer(slotIndex)}
                  onDragOver={(event) => {
                    event.preventDefault();
                    setActiveSlotIndex(slotIndex);
                  }}
                  onDragLeave={() => setActiveSlotIndex((current) => (current === slotIndex ? null : current))}
                  onDrop={(event) => handleSlotDrop(event, slotIndex)}
                  className={slotClasses}
                  aria-label={slot ? `Remove ${slot.text}` : `Empty answer slot ${slotIndex + 1}`}
                >
                  {slot ? (
                    <span
                      draggable
                      onDragStart={(event) =>
                        handleDragStart(event, {
                          source: "answer",
                          itemId: slot.id,
                          slotIndex,
                        })
                      }
                      onDragEnd={() => {
                        setDragPayload(null);
                        setActiveSlotIndex(null);
                      }}
                      className={`w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-medium text-slate-900 ${styles.wordChip}`}
                    >
                      {slot.text}
                    </span>
                  ) : (
                    <span className="text-slate-400">[ ]</span>
                  )}
                </button>
              );
            })}
            <span className="text-xl font-semibold text-slate-500">?</span>
          </div>
        </div>

        <div>
          <div className="mb-3 flex items-center justify-between gap-3">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">Word bank</p>
            <p className="text-sm text-slate-500">Drag into a slot or click to add the next missing word.</p>
          </div>

          <div
            onDragOver={(event) => {
              event.preventDefault();
              setBankDropActive(true);
            }}
            onDragLeave={() => setBankDropActive(false)}
            onDrop={(event) => {
              event.preventDefault();
              const payload = getDragPayload(event);
              setBankDropActive(false);

              if (payload?.source === "answer" && typeof payload.slotIndex === "number") {
                removeFromAnswer(payload.slotIndex);
              }
            }}
            className={`flex flex-wrap gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 ${styles.bankDock} ${
              bankDropActive ? styles.bankDockActive : ""
            }`}
          >
            {wordBank.length > 0 ? (
              wordBank.map((word) => (
                <button
                  key={word.id}
                  type="button"
                  draggable
                  onClick={() => placeInFirstEmptySlot(word.id)}
                  onDragStart={(event) =>
                    handleDragStart(event, {
                      source: "bank",
                      itemId: word.id,
                    })
                  }
                  onDragEnd={() => {
                    setDragPayload(null);
                    setBankDropActive(false);
                    setActiveSlotIndex(null);
                  }}
                  className={`rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-800 shadow-sm ${styles.wordChip}`}
                >
                  {word.text}
                </button>
              ))
            ) : (
              <p className="text-sm text-slate-500">The word bank is empty for this question.</p>
            )}
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={handleCheckAnswer}
            className="rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-700"
          >
            Check
          </button>
          <button
            type="button"
            onClick={handleShowAnswer}
            className="rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
          >
            Show answer
          </button>
          <button
            type="button"
            onClick={handleRestartExercise}
            className="rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
          >
            Restart exercise
          </button>
          <button
            type="button"
            onClick={handleNextQuestion}
            className="rounded-xl border border-blue-200 bg-blue-50 px-4 py-2.5 text-sm font-semibold text-blue-700 transition-colors hover:bg-blue-100"
          >
            Next question
          </button>
        </div>

        <div
          aria-live="polite"
          className={`rounded-xl border px-4 py-3 text-sm font-medium ${styles.feedbackPop} ${
            feedback === "correct"
              ? "border-emerald-200 bg-emerald-50 text-emerald-700"
              : feedback === "incorrect"
                ? "border-rose-200 bg-rose-50 text-rose-700"
                : feedback === "revealed"
                  ? "border-amber-200 bg-amber-50 text-amber-700"
                  : "border-slate-200 bg-slate-50 text-slate-500"
          }`}
        >
          {feedback === "idle" ? "Check your answer when you are ready." : feedbackMessage()}
        </div>

        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
          <p className="font-medium text-slate-900">Direct request</p>
          <p className="mt-1">{feedback === "revealed" || feedback === "correct" ? currentExercise.direct : "Reveal or solve the answer to compare your sentence."}</p>
        </div>
      </div>
    </section>
  );
}