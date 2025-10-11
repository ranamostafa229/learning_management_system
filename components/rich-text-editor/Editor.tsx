"use client";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Menubar from "./Menubar";
import TextAlign from "@tiptap/extension-text-align";

type Props = {
  onChange?: (content: string) => void;
  initialContent?: string;
  placeholder?: string;
};

const RichTextEditor = ({
  onChange,
  initialContent = "",
  placeholder = "Start typing...",
}: Props) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
    ],
    // Editor configuration
    editorProps: {
      attributes: {
        class:
          "min-h-[200px] w-full focus:outline-none prose dark:prose-invert prose-sm sm:prose-base lg:prose-lg xl:prose-xl !w-full !max-w-none ",
      },
    },
    //  Event handlers to capture content changes with react-hook-form
    // onUpdate: ({ editor }) => {
    //   // onChange?.(editor.getText());
    //   onChange?.(JSON.stringify(editor.getJSON()));
    // },
    onUpdate: ({ editor }) => {
      onChange?.(
        JSON.stringify({
          text: editor.getText(),
          json: editor.getJSON(),
        })
      );
    },

    // Initial content (if any)
    content: initialContent?.length > 0 ? JSON.parse(initialContent) : "",
    // Performance optimization
    immediatelyRender: false,
  });

  if (!editor) {
    return null;
  }

  return (
    <div className="w-full border border-input rounded-lg overflow-hidden dark:bg-input/30">
      <Menubar editor={editor} />
      <EditorContent editor={editor} className="p-4" />
    </div>
  );
};

export default RichTextEditor;
