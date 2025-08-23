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
    updateCurrentNote: (note: string) => {
      console.log("updating note");
      console.log("note : ", note);
      // set({ currentNote: note });
      set((state) => ({
        currentNote: note,
      }));
    },
  })
);
