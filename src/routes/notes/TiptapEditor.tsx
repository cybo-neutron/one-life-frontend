// components/TiptapEditor.tsx
"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";
import TiptapToolbar from "./TiptapToolbar";
import { LineHeight, TextStyle } from "@tiptap/extension-text-style";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SlashCommand } from "./SlashCommand";
import { useNotesStore } from "@/store/useNotesStore";
import { VimMode } from "@prose-motions/core";
import { readFileContent, writeFileContent } from "@/utils/file_utils";
import { config } from "@/config/config";
import { BaseDirectory } from "@tauri-apps/plugin-fs";
import { useEffect } from "react";
import { toast } from "sonner";

// Main Editor Component
export default function TiptapEditor() {
  const currentNote = useNotesStore((state) => state.currentNote);
  const updateCurrentNote = useNotesStore((state) => state.updateCurrentNote);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        codeBlock: {
          HTMLAttributes: {
            class:
              " bg-secondary-800/30 p-2 rounded-md border-[1px] border-secondary-300/20",
          },
        },
        code: {
          HTMLAttributes: {
            class:
              " bg-secondary-700/30 p-1 rounded-md border-[1px] border-secondary-300/20",
          },
        },
      }),
      VimMode,
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
          class: "flex gap-2 ",
        },
      }),
      SlashCommand,
      TextStyle,
      LineHeight,
    ],
    content: currentNote,
    editorProps: {
      attributes: {
        class: "prose prose-invert max-w-none focus:outline-none",
      },
    },
    onUpdate: () => {
      const htmlContent = editor.getHTML();
      // updateCurrentNote(htmlContent);
    },
  });

  const handleSave = () => {
    const htmlContent = editor.getHTML();
    console.log("saving content");
    writeFileContent({
      path: `${config.notes_path}/n1.html`,
      content: htmlContent,
      baseDir: BaseDirectory.Home,
    })
      .then(() => {
        updateCurrentNote(htmlContent);
        toast("Note saved successfully");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleLoad = () => {
    readFileContent({
      path: `${config.notes_path}/n1.html`,
      baseDir: BaseDirectory.Home,
    })
      .then((fileContent) => {
        console.log("file content : ", fileContent);
        updateCurrentNote(fileContent);
        editor.commands.setContent(fileContent);
        editor.commands.focus();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // useEffect(() => {
  //   (async () => {
  //     const fileContent = await readFileContent({
  //       path: `${config.notes_path}/n1.html`,
  //       baseDir: BaseDirectory.Home,
  //     });
  //     updateCurrentNote(fileContent);
  //   })();
  // }, []);
  // useEffect(() => {
  //   async () => {
  //     console.log(currentNote)
  //     await writeFileContent({
  //       path: `${config.notes_path}/n1.html`,
  //       content: currentNote,
  //       baseDir: BaseDirectory.Home,
  //     });
  //     toast("Note saved successfully");
  //   };
  // }, [currentNote]);

  // useEffect(() => {
  //   (async () => {
  //     console.log("loading file content");
  //     const fileContent = await readFileContent({
  //       path: `${config.notes_path}/n1.html`,
  //       baseDir: BaseDirectory.Home,
  //     });
  //     console.log(fileContent)
  //     updateCurrentNote(fileContent);
  //     editor.commands.setContent(fileContent);
  //   })();
  // }, []);

  if (!editor) {
    return null;
  }

  return (
    <div className=" bg-transparent mt-2 w-full">
      <div className="w-full p-2 flex flex-col gap-2">
        <Input
          placeholder="Enter title"
          className="text-secondary-200 font-bold outline-none border-none focus-visible:ring-0 focus-visible:border-b-[1px] focus-visible:outline-1 focus-visible:outline-secondary-200/50 md:text-3xl  "
        />
        <div className="flex items-center justify-between gap-2">
          <TiptapToolbar editor={editor} />
          <div>
            <Button
              onClick={handleLoad}
              variant={"outline"}
              className="rounded-sm m-2"
            >
              Load
            </Button>
            <Button onClick={handleSave} className="rounded-sm m-2">
              Save
            </Button>
          </div>
        </div>

        <div className=" overflow-y-auto max-h-[calc(100vh-190px)]">
          <EditorContent
            editor={editor}
            className="min-h-[calc(100vh-200px)]  text-secondary-100 p-2"
            onClick={() => editor?.commands?.focus()}
          />
        </div>
      </div>
    </div>
  );
}
