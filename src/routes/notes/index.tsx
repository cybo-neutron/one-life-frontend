import CustomTabs from "@/components/custom/CustomTabs";
import { Excalidraw } from "@excalidraw/excalidraw";
import "@excalidraw/excalidraw/index.css";
import Notebook from "./Notebook";

const Notes = () => {
  return (
    <div className="z-20 bg-primary-400/20 h-full w-full flex-1">
      {/* <CustomTabs /> */}
      <Notebook />
    </div>
  );
};

export default Notes;
