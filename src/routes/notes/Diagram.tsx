import React, { useEffect, useState } from "react";
import { useDiagramStore } from "@/store/useDiagramStore";
import { Excalidraw } from "@excalidraw/excalidraw";
import { ExcalidrawImperativeAPI } from "@excalidraw/excalidraw/types";
import { fileExists, readFileContent } from "@/utils/file_utils";
import { BaseDirectory } from "@tauri-apps/plugin-fs";
import { config } from "@/config/config";

const Diagram = () => {
  const currentDiagram = useDiagramStore((state) => state.currentDiagram);
  const updateCurrentDiagram = useDiagramStore(
    (state) => state.updateCurrentDiagram
  );

  const [excalidrawApi, setExcalidrawApi] =
    useState<ExcalidrawImperativeAPI | null>(null);

  const handleDiagramChangeDone = () => {
    // const elements = excalidrawApi?.getSceneElements() || [];
    // const diagramData = {
    //   elements: [...elements],
    // };
    // updateCurrentDiagram(diagramData);
  };

  useEffect(() => {
    console.log("Here");
    // fileExists({ path:`${config.diagram_path}/d1.excalidraw`, baseDir: BaseDirectory.Home });
    (async () => {
      const fileContent = await readFileContent({
        path: `${config.notes_path}/n1.html`,
        baseDir: BaseDirectory.Home,
      });
      console.log("File Content : ", fileContent);
    })();

    // const diagramPath = path.join(
    //   __dirname,
    //   "../temp/notes/diagram/d1.excalidraw"
    // );
    // const diagramData = fs.readFileSync(diagramPath, "utf-8");
    // updateCurrentDiagram(JSON.parse(diagramData));
  }, []);

  return (
    <>
      <Excalidraw
        theme="dark"
        initialData={currentDiagram}
        // onPointerUp={handleDiagramChangeDone}
        excalidrawAPI={(api) => setExcalidrawApi(api)}
      />
    </>
  );
};

export default Diagram;
