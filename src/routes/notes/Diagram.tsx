import React, { useState } from "react";
import { useDiagramStore } from "@/store/useDiagramStore";
import { Excalidraw } from "@excalidraw/excalidraw";
import { ExcalidrawImperativeAPI } from "@excalidraw/excalidraw/types";

const Diagram = () => {
  const currentDiagram = useDiagramStore((state) => state.currentDiagram);
  const updateCurrentDiagram = useDiagramStore(
    (state) => state.updateCurrentDiagram
  );

  const [excalidrawApi, setExcalidrawApi] =
    useState<ExcalidrawImperativeAPI | null>(null);

  const handleDiagramChangeDone = () => {
    const elements = excalidrawApi?.getSceneElements() || [];
    const diagramData = {
      elements: [...(currentDiagram?.elements || []), ...elements],
    };
    updateCurrentDiagram(diagramData);
  };

  return (
    <>
      <Excalidraw
        theme="dark"
        initialData={currentDiagram}
        onPointerUp={handleDiagramChangeDone}
        excalidrawAPI={(api) => setExcalidrawApi(api)}
      />
    </>
  );
};

export default Diagram;
