import { create } from "zustand";

interface DiagramStoreState {
  currentDiagram: object | null;
}

interface DiagramStoreActions {
  updateCurrentDiagram: (diagram: object) => void;
}

export const useDiagramStore = create<DiagramStoreState & DiagramStoreActions>(
  (set) => ({
    currentDiagram: null,
    updateCurrentDiagram: (diagram: object) => set({ currentDiagram: diagram }),
  })
);
