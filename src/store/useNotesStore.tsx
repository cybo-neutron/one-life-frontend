import { create } from "zustand";

interface NoteStoreState {
  currentNote: string;
}

interface NoteStoreActions {
  updateCurrentNote: (note: string) => void;
}

export const useNotesStore = create<NoteStoreState & NoteStoreActions>(
  (set) => ({
    currentNote: "",
    updateCurrentNote: (note: string) => set({ currentNote: note }),
  })
);
