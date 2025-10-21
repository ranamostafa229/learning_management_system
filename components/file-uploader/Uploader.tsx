import { useCallback, useEffect, useState } from "react";
import { FileRejection, useDropzone } from "react-dropzone";
import { Card, CardContent } from "../ui/card";
import { cn } from "@/lib/utils";
import {
  RenderEmptyState,
  RenderErrorState,
  RenderUploadedState,
  RenderUploadingState,
} from "./RenderState";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";

interface UploaderState {
  id: string | null;
  file: File | null;
  uploading: boolean;
  error: boolean;
  progress: number;
  key?: string;
  isDeleting: boolean;
  objectUrl?: string;
  fileType?: "image" | "video";
}
export default function Uploader() {
  const [fileState, setFileState] = useState<UploaderState>({
    error: false,
    id: null,
    file: null,
    uploading: false,
    progress: 0,
    isDeleting: false,
    fileType: "image",
  });

  async function uploadFile(file: File) {
    setFileState((prev) => ({ ...prev, uploading: true, progress: 0 }));
    try {
      const presignedResponse = await fetch("/api/s3/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fileName: file.name,
          contentType: file.type,
          size: file.size,
          isImage: true,
        }),
      });

      if (!presignedResponse.ok) {
        setFileState((prev) => ({
          ...prev,
          uploading: false,
          error: true,
          progress: 0,
        }));
        const errorData = await presignedResponse.json();
        throw new Error(errorData.details || "Failed to get presigned URL");
      }

      const { presignedUrl, key } = await presignedResponse.json();

      await new Promise<void>((resolve, reject) => {
        const xhr = new XMLHttpRequest();

        xhr.upload.onprogress = (event) => {
          if (event.lengthComputable) {
            const percentCompleted = (event.loaded / event.total) * 100;
            setFileState((prev) => ({
              ...prev,
              progress: Math.round(percentCompleted),
            }));
          }
        };

        xhr.onload = () => {
          if (xhr.status === 200 || xhr.status === 204) {
            setFileState((prev) => ({
              ...prev,
              uploading: false,
              progress: 100,
              key,
              objectUrl: URL.createObjectURL(file),
            }));
            toast.success("File uploaded successfully");
            resolve();
          } else {
            reject(new Error(`Upload failed...`));
          }
        };

        xhr.onerror = () => {
          reject(new Error("Network error occurred"));
        };

        xhr.open("PUT", presignedUrl);
        xhr.setRequestHeader("Content-Type", file.type);
        xhr.send(file);
      });
    } catch (error: any) {
      toast.error("Something went wrong during uploading file.");
      setFileState((prev) => ({
        ...prev,
        uploading: false,
        error: true,
        progress: 0,
      }));
    }
  }

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        // Revoke the object URL if it's already created to avoid memory leaks
        if (fileState.objectUrl && !fileState.objectUrl.startsWith("http")) {
          URL.revokeObjectURL(fileState.objectUrl);
        }
        setFileState({
          id: uuidv4(),
          file: file,
          uploading: false,
          error: false,
          progress: 0,
          isDeleting: false,
          fileType: "image",
          objectUrl: URL.createObjectURL(file),
        });
        uploadFile(file);
      }
    },
    [fileState.objectUrl]
  );

  function rejectedFiles(fileRejections: FileRejection[]) {
    if (fileRejections.length) {
      const tooManyFiles = fileRejections.find(
        (rejection) => rejection.errors[0].code === "too-many-files"
      );
      const fileSizeTooLarge = fileRejections.find(
        (rejection) => rejection.errors[0].code === "file-too-large"
      );
      if (tooManyFiles) {
        toast.error("Too many files selected, max is 1.");
      }
      if (fileSizeTooLarge) {
        toast.error("File size is too large, max is 5MB.");
      }
    }
  }

  function renderContent() {
    if (fileState.uploading) {
      return (
        <RenderUploadingState
          progress={fileState.progress}
          file={fileState.file!}
        />
      );
    }
    if (fileState.error) {
      return <RenderErrorState />;
    }
    if (fileState.objectUrl) {
      return <RenderUploadedState previewUrl={fileState.objectUrl} />;
    }
    return <RenderEmptyState isDragActive={false} />;
  }

  useEffect(() => {
    // Cleanup function to revoke object URL when component unmounts or file changes
    return () => {
      if (fileState.objectUrl && !fileState.objectUrl.startsWith("http")) {
        URL.revokeObjectURL(fileState.objectUrl);
      }
    };
  }, [fileState.objectUrl]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    maxFiles: 1,
    multiple: false,
    maxSize: 1 * 1024 * 1024, // 5 MB
    onDropRejected: rejectedFiles,
  });

  return (
    <Card
      {...getRootProps()}
      className={cn(
        "border-dashed border-2 p-10 text-center cursor-pointer hover:bg-muted/50 transition-colors duration-200 ease-in-out w-full h-64",
        isDragActive
          ? "border-primary bg-primary/10 border-solid"
          : "border-muted hover:border-primary"
      )}
    >
      <CardContent className="relative flex items-center justify-center h-full w-full p-4">
        <input {...getInputProps()} title="upload image" />
        {renderContent()}
      </CardContent>
    </Card>
  );
}
