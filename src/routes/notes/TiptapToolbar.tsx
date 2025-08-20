import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Bold,
  Italic,
  Strikethrough,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  ListChecks,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";

const toolbarOptions = (editor: any) => [
  {
    title: "bold",
    icon: <Bold size={20} strokeWidth={4} />,
    command: () => editor.chain().focus().toggleBold().run(),
  },
  {
    title: "italic",
    icon: <Italic size={20} strokeWidth={4} />,
    command: () => editor.chain().focus().toggleItalic().run(),
  },
  {
    title: "strikethrough",
    icon: <Strikethrough size={20} strokeWidth={4} />,
    command: () => editor.chain().focus().toggleStrike().run(),
  },
  {
    title: "heading 1",
    icon: <Heading1 size={24} strokeWidth={3} />,
    command: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
  },
  {
    title: "heading 2",
    icon: <Heading2 size={24} strokeWidth={3} />,
    command: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
  },
  {
    title: "heading 3",
    icon: <Heading3 size={24} strokeWidth={3} />,
    command: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
  },
  {
    title: "bullet list",
    icon: <List size={16} />,
    command: () => editor.chain().focus().toggleBulletList().run(),
  },
  {
    title: "numbered list",
    icon: <ListOrdered size={16} />,
    command: () => editor.chain().focus().toggleOrderedList().run(),
  },
  {
    title: "task list",
    icon: <ListChecks size={16} />,
    command: () => editor.chain().focus().toggleTaskList().run(),
  },
];

const TiptapToolbar = ({ editor }: { editor: any }) => {
  return (
    <div className="flex items-center gap-2  border-slate-700/50">
      <div className="flex border-[1px] border-secondary-200/20 p-1 rounded-sm ">
        {toolbarOptions(editor).map((option) => {
          return (
            <Button
              key={option.title}
              variant="ghost"
              size="sm"
              onClick={option.command}
              className={cn(
                editor.isActive(option.title) && "bg-secondary-200",
                "text-secondary-100 hover:bg-secondary-700/30 hover:text-secondary-100"
              )}
            >
              {option.icon}
            </Button>
          );
        })}

        {/* <Button
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={cn(
            editor.isActive("bold") && "bg-secondary-200",
            "text-secondary-100  "
          )}
        >
          <Bold size={20} strokeWidth={4} />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={cn(
            editor.isActive("italic") && "bg-secondary-200",
            "text-secondary-100"
          )}
        >
          <Italic size={20} strokeWidth={4} />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={cn(
            editor.isActive("strike") && "bg-secondary-200",
            "text-secondary-100 "
          )}
        >
          <Strikethrough size={20} strokeWidth={4} />
        </Button>
        <Separator orientation="vertical" className="h-6" />
        <Button
          variant="ghost"
          size="sm"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          className={cn(
            editor.isActive("heading", { level: 1 }) && "bg-secondary-200",
            "text-secondary-100"
          )}
        >
          <Heading1 size={24} strokeWidth={3} />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className={cn(
            editor.isActive("heading", { level: 2 }) && "bg-secondary-200",
            "text-secondary-100 "
          )}
        >
          <Heading2 size={24} strokeWidth={3} />
        </Button>

        <Separator orientation="vertical" />

        <Button
          variant="ghost"
          size="sm"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          className={cn(
            editor.isActive("heading", { level: 3 }) && "bg-secondary-200",
            "text-secondary-100 hover:bg-secondary-400"
          )}
        >
          <Heading3 size={24} strokeWidth={3} />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={cn(
            editor.isActive("bulletList") && "bg-secondary-200",
            "text-secondary-100 "
          )}
        >
          <List size={16} />
        </Button>

        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={cn(
            editor.isActive("orderedList") && "bg-secondary-200",
            "text-secondary-100 "
          )}
        >
          <ListOrdered size={16} />
        </Button>

        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleTaskList().run()}
          className={cn(
            editor.isActive("taskList") && "bg-secondary-200",
            "text-secondary-100 "
          )}
        >
          <ListChecks size={16} />
        </Button> */}
      </div>
    </div>
  );
};

export default TiptapToolbar;
