import { ReactNode } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { DraggableSyntheticListeners } from "@dnd-kit/core";
import { cn } from "@/lib/utils";

interface SortableItemProps {
  id: string;
  children: (listeners: DraggableSyntheticListeners) => ReactNode;
  className?: string;
  data?: {
    type: "chapter" | "lesson";
    chapterId?: string; // only revelant for lessons
  };
}
export function SortableItem({
  id,
  children,
  data,
  className,
}: SortableItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: id, data: data });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      className={cn("touch-none", className, isDragging ? "z-10" : "")}
    >
      {children(listeners)}
    </div>
  );
}
