import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Separator } from "@radix-ui/react-separator";

import { Excalidraw } from "@excalidraw/excalidraw";
import { capitalize } from "@/utils/capitalize";

export type TabItem = {
  id: string | number;
  value: string;
  tabComponent?: React.ReactNode;
  contentComponent?: React.ReactNode;
};

type CustomTabsProps = {
  tabItems: TabItem[];
};

const CustomTabs = ({ tabItems }: CustomTabsProps) => {
  return (
    <Tabs defaultValue="notes" className="h-full w-full  ">
      <TabsList className="flex w-full justify-center items-center  bg-transparent gap-2">
        <div className="flex gap-0 bg-transparent border-[1px] border-secondary-100/20 rounded-sm  overflow-hidden  ">
          {tabItems.map((item, index) => (
            <TabsTrigger
              value={item.value}
              className="text-secondary-300 data-[state=active]:text-secondary-800  "
            >
              {capitalize(item.value)}
            </TabsTrigger>
          ))}
        </div>
      </TabsList>

      {tabItems.map((item) => (
        <TabsContent value={item.value} className="bg-secondary-800/20 h-full">
          {item.contentComponent}
        </TabsContent>
      ))}
    </Tabs>
  );
};

export default CustomTabs;
