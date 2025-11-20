import * as React from "react";

declare module "@dnd-kit/sortable" {
  interface SortableContextProps {
    children: React.ReactNode;
    items: string[];
    strategy?: "vertical" | "horizontal";
    id?: string;
    disabled?: boolean;
  }

  export function SortableContext(
    props: SortableContextProps
  ): React.ReactElement;
}
