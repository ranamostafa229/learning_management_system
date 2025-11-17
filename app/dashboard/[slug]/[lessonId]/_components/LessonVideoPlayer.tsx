import { constructUrl } from "@/hooks/use-construct-url";
import { BookIcon } from "lucide-react";

interface Props {
  videoKey: string;
  thumbnailKey: string;
}

const LessonVideoPlayer = ({ videoKey, thumbnailKey }: Props) => {
  const videoUrl = constructUrl(videoKey);
  const thumbnailUrl = constructUrl(thumbnailKey);
  if (!videoKey) {
    return (
      <div className="bg-muted aspect-video flex flex-col gap-4 items-center justify-center rounded-lg">
        <BookIcon className="size-16 text-primary mx-auto" />
        <p className="text-muted-foreground ">
          This lesson does not have a video yet
        </p>
      </div>
    );
  }
  return (
    <div className="aspect-video bg-black rounded-lg relative overflow-hidden">
      <video
        poster={thumbnailUrl}
        controls
        className="w-full h-full object-cover"
      >
        <source src={videoUrl} type="video/mp4" />
        <source src={videoUrl} type="video/webm" />
        <source src={videoUrl} type="video/ogg" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default LessonVideoPlayer;
