import CustomTabs from "@/components/custom/CustomTabs";
import { Excalidraw } from "@excalidraw/excalidraw";
import "@excalidraw/excalidraw/index.css";
import TiptapEditor from "./TiptapEditor";
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@/components/ui/resizable";

const Notes = () => {
  return (
    <div className="z-20 bg-transparent h-full w-full flex-1">
      {/* <CustomTabs /> */}
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
            contentComponent: <Excalidraw theme="dark" />,
          },

          {
            id: 3,
            value: "both",
            contentComponent: (
              <div className="flex">
                <ResizablePanelGroup direction="horizontal">
                  <ResizablePanel maxSize={50} minSize={30}>
                    <TiptapEditor />
                  </ResizablePanel>
                  <ResizableHandle className="w-[1px] bg-secondary-100/10" />
                  <ResizablePanel>
                    <Excalidraw theme="dark" />
                  </ResizablePanel>
                </ResizablePanelGroup>
              </div>
            ),
          },
        ]}
      />
    </div>
  );
};

export default Notes;
