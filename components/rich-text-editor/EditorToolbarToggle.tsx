import { ReactNode } from "react";
import { Toggle } from "../ui/toggle";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { cn } from "@/lib/utils";
interface Props {
  icon: ReactNode;
  content: string;
  handleClick: () => void;
  pressed?: boolean;
  editorCondition?: boolean;
}
const EditorToolbarToggle = ({
  handleClick,
  icon,
  content,
  pressed,
  editorCondition,
}: Props) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Toggle
          size="sm"
          pressed={pressed}
          onPressedChange={handleClick}
          className={cn(
            editorCondition ? "bg-muted text-muted-foreground" : ""
          )}
        >
          {icon}
        </Toggle>
      </TooltipTrigger>
      <TooltipContent>{content}</TooltipContent>
    </Tooltip>
  );
};

export default EditorToolbarToggle;
