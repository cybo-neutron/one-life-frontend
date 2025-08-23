import CustomTabs from "@/components/custom/CustomTabs";
import "@excalidraw/excalidraw/index.css";
import TiptapEditor from "./TiptapEditor";
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@/components/ui/resizable";
import Diagram from "./Diagram";
import { useEffect, useState } from "react";
import { usePubSub, useSubscribe } from "@/context/pub_sub/usePubSub";
import { events } from "@/constants/events";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

const Notes = () => {
  const { publish } = usePubSub();
  const [fileModalOpen, setFileModalOpen] = useState(false);

  useSubscribe(events.notes.OPEN_FILES, () => {
    console.log("Open files");
    setFileModalOpen(true);
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

      <Dialog open={fileModalOpen} onOpenChange={setFileModalOpen}>
        {/* <DialogTrigger></DialogTrigger> */}
        <DialogContent className="p-2 bg-secondary-900 text-secondary-200 border-secondary-100/20">
          {/* <DialogHeader>
            <DialogTitle>Open Files</DialogTitle>
          </DialogHeader> */}
          <div>
            <div className="flex gap-2">
              <Input
                placeholder="Search files..."
                className="w-[95%] focus-visible:ring-0 border-0"
              />
              {/* <Button>Search</Button> */}
            </div>
            <Separator className="my-2 bg-secondary-100/10" />
            <div>
              <div>Files</div>
            </div>
          </div>
          {/* <DialogFooter>
            <DialogClose>Cancel</DialogClose>
            <DialogClose asChild>
              <Button>Open</Button>
            </DialogClose>
          </DialogFooter> */}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Notes;
