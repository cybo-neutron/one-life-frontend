import CustomTabs from "@/components/custom/CustomTabs";
import "@excalidraw/excalidraw/index.css";
import TiptapEditor from "./TiptapEditor";
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@/components/ui/resizable";
import Diagram from "./Diagram";
import { useEffect } from "react";
import { usePubSub, useSubscribe } from "@/context/pub_sub/usePubSub";
import { events } from "@/constants/events";

const Notes = () => {
  const { publish } = usePubSub();
  useSubscribe(events.notes.OPEN_FILES, () => {
    console.log("Open files");
  });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "o" && e.metaKey) {
        publish(events.notes.OPEN_FILES, {});
      }
    };

    // listen for command + o key
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="z-20 bg-transparent h-full w-full flex-1">
      <CustomTabs
        tabItems={[
          {
            id: 1,
            value: "notes",
            contentComponent: (
              <div className="border-[1px] border-secondary-100/20 shadow-2xl rounded-sm">
                <TiptapEditor />
              </div>
            ),
          },
          {
            id: 2,
            value: "diagram",
            contentComponent: (
              <div className="border-[1px] border-secondary-100/20 shadow-2xl rounded-sm h-full w-full overflow-hidden">
                <Diagram />
              </div>
            ),
          },

          {
            id: 3,
            value: "both",
            contentComponent: (
              <ResizablePanelGroup
                direction="horizontal"
                className="h-full w-full border-[1px] border-secondary-100/20 shadow-2xl rounded-sm"
              >
                <ResizablePanel maxSize={45} minSize={30}>
                  <TiptapEditor />
                </ResizablePanel>
                <ResizableHandle className="w-[1px] bg-secondary-100/10" />
                <ResizablePanel>
                  <Diagram />
                </ResizablePanel>
              </ResizablePanelGroup>
            ),
          },
        ]}
      />
    </div>
  );
};

export default Notes;
