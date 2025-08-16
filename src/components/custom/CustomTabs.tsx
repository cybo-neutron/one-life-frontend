import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Separator } from "@radix-ui/react-separator";

import { Excalidraw } from "@excalidraw/excalidraw";

const CustomTabs = () => {
  return (
    <Tabs defaultValue="notes" className="h-full w-full  ">

      <TabsList className="flex w-full justify-center items-center rounded-lg bg-transparent gap-2 ">
        <div className="flex gap-1 py-1 bg-secondary-800">
          <TabsTrigger
            value="notes"
            className="text-secondary-300 data-[state=active]:text-secondary-800"
          >
            Notes
          </TabsTrigger>
          <Separator orientation="horizontal" className="h-full" color="white" />
          <TabsTrigger
            value="diagram"
            className="text-secondary-300 data-[state=active]:text-secondary-800"
          >
            Diagram
          </TabsTrigger>
          <Separator orientation="vertical" className="h-full" color="white" />
          <TabsTrigger
            value="both"
            className="text-secondary-300 data-[state=active]:text-secondary-800"
          >
            Both
          </TabsTrigger>
        </div>
      </TabsList>

      <TabsContent
        value="notes"
        className="bg-secondary-800/20 rounded-lg h-full"
      >
        Notes
      </TabsContent>
      <TabsContent value="diagram" className="  rounded-lg h-full p-2">
        <div className="h-full w-full bg-primary-200">
          {/* Excalidraw */}
          <Excalidraw theme="dark" />
        </div>
      </TabsContent>
      <TabsContent
        value="both"
        className="bg-secondary-800/20 rounded-lg h-full"
      >
        Both
      </TabsContent>
    </Tabs>
  );
};

export default CustomTabs;
