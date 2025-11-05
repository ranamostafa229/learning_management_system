import { cn } from "@/lib/utils";
import { CloudUploadIcon, ImageIcon, Loader2, XIcon } from "lucide-react";
import { Button } from "../ui/button";

export function RenderEmptyState({
  isDragActive,
  fileType,
}: {
  isDragActive: boolean;
  fileType?: "image" | "video";
}) {
  return (
    <div>
      <div
        className="flex items-center justify-center mx-auto bg-muted 
      rounded-full size-12 mb-4"
      >
        <CloudUploadIcon
          className={cn(
            "size-6 text-muted-foreground",
            isDragActive && "text-primary"
          )}
        />
      </div>
      <p className="text-base text-foreground font-semibold">
        Drop your files here or{" "}
        <span className="text-primary font-bold cursor-pointer">
          click to upload
        </span>
      </p>
      <Button
        type="button"
        variant="outline"
        size={"lg"}
        className="cursor-pointer text-primary bg-base border-dashed border-primary mt-4 hover:text-primary"
      >
        {fileType === "image" ? "CHOOSE IMAGE" : "UPLOAD VIDEO"}
      </Button>
    </div>
  );
}
export function RenderErrorState() {
  return (
    <div>
      <div className="flex items-center justify-center mx-auto bg-destructive/30 rounded-full size-12 mb-4">
        <ImageIcon className={cn("size-6 text-destructive")} />
      </div>
      <p className="text-base font-semibold">Upload Failed</p>
      <p className="text-muted-foreground text-xs mt-1">Something went wrong</p>
      <Button type="button" className="mt-4 cursor-pointer">
        Retry File Uploading
      </Button>
    </div>
  );
}
import React from "react";
import Image from "next/image";

export function RenderUploadedState({
  previewUrl,
  isDeleting,
  handleRemoveFile,
  fileType,
}: {
  previewUrl: string;
  isDeleting: boolean;
  handleRemoveFile: React.MouseEventHandler<HTMLButtonElement>;
  fileType: "image" | "video";
}) {
  return (
    <div
      className={cn(
        "relative group  h-full flex items-center justify-center",
        fileType === "image" ? "min-w-40" : "w-full"
      )}
    >
      {fileType === "video" ? (
        <video
          src={previewUrl}
          controls
          className="rounded-md w-full h-full "
        />
      ) : (
        <Image
          src={previewUrl}
          alt="uploaded image"
          fill
          className="object-contain p-2 "
        />
      )}
      <Button
        variant={"destructive"}
        size={"icon"}
        className={cn("absolute top-2 right-2")}
        title="Delete uploaded image"
        disabled={isDeleting}
        onClick={handleRemoveFile}
      >
        {isDeleting ? (
          <Loader2 className="size-4 animate-spin" />
        ) : (
          <XIcon className="size-4 cursor-pointer" />
        )}
      </Button>
    </div>
  );
}

export function RenderUploadingState({
  progress,
  file,
}: {
  progress: number;
  file: File;
}) {
  return (
    <div className="flex flex-col justify-center items-center">
      <p>{`${progress}%`}</p>
      <p className="text-sm text-foreground font-medium mt-2">Uploading...</p>
      <p className="text-sm text-muted-foreground truncate  max-w-40 mt-1">
        {file.name}
      </p>
    </div>
  );
}
