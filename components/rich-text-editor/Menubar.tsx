import {
  EditorStateSnapshot,
  useEditorState,
  type Editor,
} from "@tiptap/react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Bold,
  Heading1,
  Heading2,
  Heading3,
  Italic,
  ListIcon,
  ListOrderedIcon,
  Redo,
  Strikethrough,
  Undo,
} from "lucide-react";
import { Button } from "../ui/button";
import EditorToolbarButton from "./EditorToolbarToggle";

type Props = {
  editor: Editor | null;
};

const Menubar = ({ editor }: Props) => {
  // Read the current editor's state, and re-render the component when it changes
  const editorState = useEditorState({
    editor,
    selector: (ctx: EditorStateSnapshot<Editor | null>) => {
      return {
        isBold: ctx.editor?.isActive("bold") ?? false,
        canBold: ctx.editor?.can().chain().toggleBold().run() ?? false,
        isItalic: ctx.editor?.isActive("italic") ?? false,
        canItalic: ctx.editor?.can().chain().toggleItalic().run() ?? false,
        isStrike: ctx.editor?.isActive("strike") ?? false,
        canStrike: ctx.editor?.can().chain().toggleStrike().run() ?? false,
        isParagraph: ctx.editor?.isActive("paragraph") ?? false,
        isHeading1: ctx.editor?.isActive("heading", { level: 1 }) ?? false,
        isHeading2: ctx.editor?.isActive("heading", { level: 2 }) ?? false,
        isHeading3: ctx.editor?.isActive("heading", { level: 3 }) ?? false,
        isBulletList: ctx.editor?.isActive("bulletList") ?? false,
        isOrderedList: ctx.editor?.isActive("orderedList") ?? false,
        canUndo: ctx.editor?.can().chain().undo().run() ?? false,
        canRedo: ctx.editor?.can().chain().redo().run() ?? false,
      };
    },
  });
  if (!editor) {
    return null;
  }

  return (
    <div className="flex flex-wrap items-center gap-1 border border-input border-t-0 border-x-0 rounded-t-lg p-2 bg-card">
      <TooltipProvider>
        <div className="flex flex-wrap gap-1">
          <EditorToolbarButton
            handleClick={() => editor.chain().focus().toggleBold().run()}
            pressed={editorState?.canBold}
            editorCondition={editorState?.isBold}
            icon={<Bold />}
            content="Bold"
          />
          <EditorToolbarButton
            handleClick={() => editor.chain().focus().toggleItalic().run()}
            pressed={editorState?.canItalic}
            editorCondition={editorState?.isItalic}
            icon={<Italic />}
            content="Italic"
          />
          <EditorToolbarButton
            handleClick={() => editor.chain().focus().toggleStrike().run()}
            pressed={editorState?.canStrike}
            editorCondition={editorState?.isStrike}
            icon={<Strikethrough />}
            content="Strike"
          />
          <EditorToolbarButton
            handleClick={() =>
              editor.chain().focus().toggleHeading({ level: 1 }).run()
            }
            pressed={editorState?.isHeading1}
            editorCondition={editorState?.isHeading1}
            icon={<Heading1 />}
            content="Heading 1"
          />
          <EditorToolbarButton
            handleClick={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
            pressed={editorState?.isHeading2}
            editorCondition={editorState?.isHeading2}
            icon={<Heading2 />}
            content="Heading 2"
          />
          <EditorToolbarButton
            handleClick={() =>
              editor.chain().focus().toggleHeading({ level: 3 }).run()
            }
            pressed={editorState?.isHeading3}
            editorCondition={editorState?.isHeading3}
            icon={<Heading3 />}
            content="Heading 3"
          />
          <EditorToolbarButton
            handleClick={() => editor.chain().focus().toggleBulletList().run()}
            pressed={editorState?.isBulletList}
            editorCondition={editorState?.isBulletList}
            icon={<ListIcon />}
            content="Bullet List"
          />
          <EditorToolbarButton
            handleClick={() => editor.chain().focus().toggleOrderedList().run()}
            pressed={editorState?.isOrderedList}
            editorCondition={editorState?.isOrderedList}
            icon={<ListOrderedIcon />}
            content="Ordered List"
          />
        </div>

        <div className="w-px h-6 bg-border mx-2" />
        <div className="flex flex-wrap gap-1">
          <EditorToolbarButton
            handleClick={() =>
              editor.chain().focus().setTextAlign("left").run()
            }
            pressed={editor.isActive({ textAlign: "left" })}
            editorCondition={editor.isActive({ textAlign: "left" })}
            icon={<AlignLeft />}
            content="Align Left"
          />
          <EditorToolbarButton
            handleClick={() =>
              editor.chain().focus().setTextAlign("center").run()
            }
            pressed={editor.isActive({ textAlign: "center" })}
            editorCondition={editor.isActive({ textAlign: "center" })}
            icon={<AlignCenter />}
            content="Align Center"
          />
          <EditorToolbarButton
            handleClick={() =>
              editor.chain().focus().setTextAlign("right").run()
            }
            pressed={editor.isActive({ textAlign: "right" })}
            editorCondition={editor.isActive({ textAlign: "right" })}
            icon={<AlignRight />}
            content="Align Right"
          />
        </div>
        <div className="w-px h-6 bg-border mx-2" />
        <div className="flex flex-wrap gap-1">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                type="button"
                variant={"ghost"}
                size="sm"
                onClick={() => editor.chain().focus().undo().run()}
                disabled={!editorState?.canUndo}
              >
                <Undo />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Undo</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                type="button"
                variant={"ghost"}
                size="sm"
                onClick={() => editor.chain().focus().redo().run()}
                disabled={!editorState?.canRedo}
              >
                <Redo />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Redo</TooltipContent>
          </Tooltip>
        </div>
      </TooltipProvider>
    </div>
  );
};

export default Menubar;
