import CustomTabs from "@/components/custom/CustomTabs";
import "@excalidraw/excalidraw/index.css";
import TiptapEditor from "./TiptapEditor";
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@/components/ui/resizable";
import Diagram from "./Diagram";

const Notes = () => {
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
