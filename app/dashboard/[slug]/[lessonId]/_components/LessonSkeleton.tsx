import { Skeleton } from "@/components/ui/skeleton";

const LessonSkeleton = () => {
  return (
    <div className="flex flex-col h-full pl-6 gap-2">
      <Skeleton className="w-full h-10" />

      <div className="relative aspect-video bg-muted rounded-lg overflow-hidden">
        <Skeleton className="w-full h-full" />
      </div>
      <div className="flex-1 space-y-6">
        <Skeleton className="w-28 h-10 mt-3" />
      </div>
      <div className="space-y-3">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-4 w-4/5" />
      </div>
      <div className="flex gap-3">
        <Skeleton className="h-10 w-32" />
        <Skeleton className="h-10 w-5/24" />
      </div>
    </div>
  );
};

export default LessonSkeleton;
