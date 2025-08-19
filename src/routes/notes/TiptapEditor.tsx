// components/TiptapEditor.tsx
"use client";

import React, { useState, useCallback, useRef, useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";
import { Extension } from "@tiptap/core";
import { ReactRenderer } from "@tiptap/react";
import Suggestion from "@tiptap/suggestion";
import tippy from "tippy.js";
import { cn } from "@/lib/utils";
import TiptapToolbar from "./TiptapToolbar";
import {
  Type,
  Quote,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  ListChecks,
} from "lucide-react";
import { LineHeight, TextStyle } from "@tiptap/extension-text-style";

// Command Menu Items
const COMMAND_ITEMS = [
  {
    title: "Text",
    description: "Start writing with plain text",
    icon: <Type size={16} />,
    command: ({ editor, range }: any) => {
      editor.chain().focus().deleteRange(range).setParagraph().run();
    },
  },
  {
    title: "Heading 1",
    description: "Big section heading",
    icon: <Heading1 size={16} />,
    command: ({ editor, range }: any) => {
      editor.chain().focus().deleteRange(range).setHeading({ level: 1 }).run();
    },
  },
  {
    title: "Heading 2",
    description: "Medium section heading",
    icon: <Heading2 size={16} />,
    command: ({ editor, range }: any) => {
      editor.chain().focus().deleteRange(range).setHeading({ level: 2 }).run();
    },
  },
  {
    title: "Heading 3",
    description: "Medium section heading",
    icon: <Heading3 size={16} />,
    command: ({ editor, range }: any) => {
      editor.chain().focus().deleteRange(range).setHeading({ level: 3 }).run();
    },
  },
  {
    title: "Bullet List",
    description: "Create a simple bullet list",
    icon: <List size={16} />,
    command: ({ editor, range }: any) => {
      editor.chain().focus().deleteRange(range).toggleBulletList().run();
    },
  },
  {
    title: "Numbered List",
    description: "Create a numbered list",
    icon: <ListOrdered size={16} />,
    command: ({ editor, range }: any) => {
      editor.chain().focus().deleteRange(range).toggleOrderedList().run();
    },
  },
  {
    title: "Task List",
    description: "Track tasks with a to-do list",
    icon: <ListChecks size={16} />,
    command: ({ editor, range }: any) => {
      editor.chain().focus().deleteRange(range).toggleTaskList().run();
    },
  },
  {
    title: "Quote",
    description: "Capture a quote",
    icon: <Quote size={16} />,
    command: ({ editor, range }: any) => {
      editor.chain().focus().deleteRange(range).toggleBlockquote().run();
    },
  },
];

// Command Menu Component
const CommandsList = React.forwardRef<HTMLDivElement, any>((props, ref) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const selectItem = (index: number) => {
    const item = props.items[index];
    if (item) {
      props.command(item);
    }
  };

  React.useImperativeHandle(ref, () => ({
    onKeyDown: ({ event }: { event: KeyboardEvent }) => {
      if (event.key === "ArrowUp") {
        setSelectedIndex(
          (selectedIndex + props.items.length - 1) % props.items.length
        );
        return true;
      }

      if (event.key === "ArrowDown") {
        setSelectedIndex((selectedIndex + 1) % props.items.length);
        return true;
      }

      if (event.key === "Enter") {
        selectItem(selectedIndex);
        return true;
      }

      return false;
    },
  }));

  useEffect(() => setSelectedIndex(0), [props.items]);

  return (
    <div className="bg-secondary-800 rounded-lg  m-2 p-2 border-[0.5px] border-secondary-200/20 backdrop-blur-xl shadow-md w-[200px] max-h-80 overflow-auto">
      {props.items.length ? (
        props.items.map((item: any, index: number) => (
          <button
            key={index}
            className={cn(
              "flex items-center gap-4 w-full text-left p-1 rounded  transition-colors text-secondary-100",
              index === selectedIndex && "bg-secondary-600"
            )}
            onClick={() => selectItem(index)}
            onMouseOver={() => setSelectedIndex(index)}
          >
            <div className="">{item.icon}</div>
            <div>
              <div className=" font-light font-[Ubuntu] text-sm text-secondary-100">
                {item.title}
              </div>
              {/* <div className="text-xs text-muted-foreground">{item.description}</div> */}
            </div>
          </button>
        ))
      ) : (
        <div className="text-muted-foreground text-sm p-2">No results</div>
      )}
    </div>
  );
});

CommandsList.displayName = "CommandsList";

// Slash Command Extension
const SlashCommand = Extension.create({
  name: "slashCommand",
  addOptions() {
    return {
      suggestion: {
        char: "/",
        command: ({ editor, range, props }: any) => {
          props.command({ editor, range });
        },
      },
    };
  },
  addProseMirrorPlugins() {
    return [
      Suggestion({
        editor: this.editor,
        ...this.options.suggestion,
        items: ({ query }: { query: string }) => {
          return COMMAND_ITEMS.filter((item) =>
            item.title.toLowerCase().includes(query.toLowerCase())
          );
        },
        render: () => {
          let component: ReactRenderer;
          let popup: any;

          return {
            onStart: (props: any) => {
              component = new ReactRenderer(CommandsList, {
                props,
                editor: props.editor,
              });

              if (!props.clientRect) {
                return;
              }

              popup = tippy("body", {
                getReferenceClientRect: props.clientRect,
                appendTo: () => document.body,
                content: component.element,
                showOnCreate: true,
                interactive: true,
                trigger: "manual",
                placement: "bottom-start",
              });
            },

            onUpdate(props: any) {
              component.updateProps(props);

              if (!props.clientRect) {
                return;
              }

              popup[0].setProps({
                getReferenceClientRect: props.clientRect,
              });
            },

            onKeyDown(props: any) {
              if (props.event.key === "Escape") {
                popup[0].hide();
                return true;
              }

              return component.ref?.onKeyDown(props);
            },

            onExit() {
              popup.destroy();
              component.destroy();
            },
          };
        },
      }),
    ];
  },
});

// Main Editor Component
export default function TiptapEditor() {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "text-primary underline",
        },
      }),
      TaskList,
      TaskItem.configure({
        nested: true,
        HTMLAttributes: {
          class: "flex gap-2 bg-secondary-900",
        },
      }),
      SlashCommand,
      TextStyle,
      LineHeight,
    ],
    content: ` `,
    editorProps: {
      attributes: {
        class: "prose prose-invert max-w-none focus:outline-none",
      },
    },
  });



  if (!editor) {
    return null;
  }

  return (
    <div className=" bg-secondary-900 mt-2">
      <div className="">
        <div className=" backdrop-blur-xl  border border-secondary-700/50 shadow-2xl">
          {/* Toolbar */}

          <TiptapToolbar editor={editor} />

          {/* Editor */}
          <div className="p-2 overflow-y-auto max-h-[calc(100vh-90px)]">
            <EditorContent
              editor={editor}
              className="min-h-[calc(100vh-90px)] text-secondary-100"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
