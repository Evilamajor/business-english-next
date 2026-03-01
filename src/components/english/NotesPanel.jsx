"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useBusinessUx } from "@/src/components/english/BusinessUxContext";

export default function NotesPanel() {
  const pathname = usePathname();
  const { notesOpen, setNotesOpen } = useBusinessUx();
  const storageKey = `notes:${pathname}`;
  const [noteValue, setNoteValue] = useState("");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") {
      setNoteValue("");
      return;
    }

    const stored = window.localStorage.getItem(storageKey) ?? "";
    setNoteValue(stored);
    setSaved(false);
  }, [storageKey]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const timeout = window.setTimeout(() => {
      window.localStorage.setItem(storageKey, noteValue);
    }, 800);

    return () => window.clearTimeout(timeout);
  }, [noteValue, storageKey]);

  const handleSave = () => {
    window.localStorage.setItem(storageKey, noteValue);
    setSaved(true);
    window.setTimeout(() => setSaved(false), 2000);
  };

  if (!notesOpen) {
    return null;
  }

  return (
    <div aria-label="My Notes" className="flex h-full min-h-0 flex-col rounded-[20px] border border-slate-200 bg-white shadow-md">
      <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3">
        <h2 className="text-sm font-semibold text-slate-800">📝 My Notes</h2>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleSave}
            className="rounded-md bg-blue-600 px-3 py-1 text-xs font-medium text-white transition-colors hover:bg-blue-700"
          >
            Save Notes
          </button>
          <button
            type="button"
            onClick={() => setNotesOpen(false)}
            className="rounded-md border border-slate-300 px-2 py-1 text-xs font-medium text-slate-700 transition-colors hover:bg-slate-100"
          >
            Close
          </button>
        </div>
      </div>

      <div className="min-h-0 flex-1 p-3">
        <textarea
          value={noteValue}
          onChange={(event) => setNoteValue(event.target.value)}
          placeholder="Write your notes for this module..."
          className="h-full w-full resize-none rounded-xl border border-slate-200 p-3 text-sm leading-6 text-slate-800 outline-none transition-colors focus:border-blue-400"
        />
        {saved ? (
          <p className="mt-2 text-xs font-medium text-emerald-600">
            Notes saved successfully ✔
          </p>
        ) : null}
      </div>
    </div>
  );
}
