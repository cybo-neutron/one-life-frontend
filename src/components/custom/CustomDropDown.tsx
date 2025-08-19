import {
  DropdownMenu,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from "@/components/ui/dropdown-menu";
import { DropdownMenuContent } from "@/components/ui/dropdown-menu";
import { DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";

type CustomDropDownMenuItem = {
  label: string;
  labelComponent?: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  subItems?: CustomDropDownMenuItem[];
};

type CustomDropDownProps = {
  triggerComponent: React.ReactNode;
  items: CustomDropDownMenuItem[];
};

const CustomSubDropDown = ({
  items,
  triggerComponent,
}: CustomDropDownProps) => {
  return (
    <DropdownMenuSub>
      <DropdownMenuSubTrigger>{triggerComponent}</DropdownMenuSubTrigger>
      <DropdownMenuPortal>
        <DropdownMenuSubContent>
          {items?.map((item, index) =>
            item.subItems && item.subItems.length ? (
              <CustomSubDropDown
                key={index}
                items={item.subItems}
                triggerComponent={item.labelComponent || item.label}
              />
            ) : (
              <DropdownMenuItem
                key={index}
                onClick={item.onClick}
                disabled={item.disabled}
              >
                {item.labelComponent || item.label}
              </DropdownMenuItem>
            )
          )}
        </DropdownMenuSubContent>
      </DropdownMenuPortal>
    </DropdownMenuSub>
  );
};

const CustomDropDown = ({ triggerComponent, items }: CustomDropDownProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>{triggerComponent}</DropdownMenuTrigger>
      <DropdownMenuContent className="w-64 rounded-none " align="start">
        {items?.length &&
          items?.map((item, index) =>
            item.subItems && item.subItems.length ? (
              <CustomSubDropDown
                key={index}
                items={item.subItems}
                triggerComponent={item.labelComponent || item.label}
              />
            ) : (
              <DropdownMenuItem
                key={index}
                onClick={item.onClick}
                disabled={item.disabled}
              >
                {item.labelComponent || item.label}
              </DropdownMenuItem>
            )
          )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CustomDropDown;
