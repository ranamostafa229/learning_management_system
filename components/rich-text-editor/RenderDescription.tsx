"use client";
import TextAlign from "@tiptap/extension-text-align";
import StarterKit from "@tiptap/starter-kit";
import { useMemo } from "react";
import { type JSONContent } from "@tiptap/react";
import { generateHTML } from "@tiptap/html";
import parse from "html-react-parser";

const RenderDescription = ({ json }: { json: JSONContent }) => {
  const output = useMemo(() => {
    return generateHTML(json, [
      StarterKit,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
    ]);
  }, [json]);
  return (
    <div className="prose dark:prose-invert prose-li:marker:text-primary p-9 max-w-full">
      {parse(output)}
    </div>
  );
};

export default RenderDescription;
