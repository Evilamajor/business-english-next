"use client";

import { useEffect, useState } from "react";
import { useBusinessUx } from "@/src/components/english/BusinessUxContext";

export default function NotesPanel() {
  const { notesOpen, setNotesOpen, moduleSlug } = useBusinessUx();
  const [noteValue, setNoteValue] = useState("");

  useEffect(() => {
    if (!moduleSlug || typeof window === "undefined") {
      setNoteValue("");
      return;
    }

    const saved = window.localStorage.getItem(`notes-${moduleSlug}`) ?? "";
    setNoteValue(saved);
  }, [moduleSlug]);

  useEffect(() => {
    if (!moduleSlug || typeof window === "undefined") {
      return;
    }

    window.localStorage.setItem(`notes-${moduleSlug}`, noteValue);
  }, [moduleSlug, noteValue]);

  if (!notesOpen) {
    return null;
  }

  return (
    <div aria-label="My Notes" className="flex h-full min-h-0 flex-col rounded-[20px] border border-slate-200 bg-white shadow-md">
      <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3">
        <h2 className="text-sm font-semibold text-slate-800">📝 My Notes</h2>
        <button
          type="button"
          onClick={() => setNotesOpen(false)}
          className="rounded-md border border-slate-300 px-2 py-1 text-xs font-medium text-slate-700 transition-colors hover:bg-slate-100"
        >
          Close
        </button>
      </div>

      <div className="min-h-0 flex-1 p-3">
        <textarea
          value={noteValue}
          onChange={(event) => setNoteValue(event.target.value)}
          placeholder="Write your notes for this module..."
          className="h-full w-full resize-none rounded-xl border border-slate-200 p-3 text-sm leading-6 text-slate-800 outline-none transition-colors focus:border-blue-400"
        />
      </div>
    </div>
  );
}
