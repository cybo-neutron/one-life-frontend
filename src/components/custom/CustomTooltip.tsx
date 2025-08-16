import React from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

const CustomTooltip = ({
  children,
  title,
  side,
}: {
  children: React.ReactNode;
  title: string;
  side?: "top" | "right" | "bottom" | "left";
}) => {
  return (
    <Tooltip>
      <TooltipTrigger>{children}</TooltipTrigger>
      <TooltipContent side={side} >
        {title}
      </TooltipContent>
    </Tooltip>
  );
};

export default CustomTooltip;
