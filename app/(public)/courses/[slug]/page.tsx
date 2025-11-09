import { getIndividualCourse } from "@/app/data/course/get-course";
import RenderDescription from "@/components/rich-text-editor/RenderDescription";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { constructUrl } from "@/hooks/use-construct-url";
import { TabsContent } from "@radix-ui/react-tabs";
import { IconBook, IconCategory, IconChartBar } from "@tabler/icons-react";
import { Clock, TvMinimalPlay } from "lucide-react";
import Image from "next/image";

const BoxInfo = ({
  info,
  icon: Icon,
}: {
  info: string;
  icon: React.ComponentType<{ size: number }>;
}) => {
  return (
    <div
      className="flex flex-col w-24 h-20 justify-center items-center bg-accent p-2 
            rounded-md text-primary text-sm"
    >
      <Icon size={20} />
      <span className="">{info} </span>
    </div>
  );
};

type Params = Promise<{ slug: string }>;
const PublicCourseRoute = async ({ params }: { params: Params }) => {
  const { slug } = await params;
  const course = await getIndividualCourse(slug);
  const imageUrl = constructUrl(course.fileKey);
  return (
    <div className="relative top-20">
      <Card className="grid grid-cols-1 lg:grid-cols-3 px-10 border-card  rounded-sm">
        <div className="relative aspect-video w-full overflow-hidden rounded-lg">
          <Image
            src={imageUrl}
            alt={`Thumbnail for course ${course.title}`}
            className="object-cover"
            fill
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent " />
        </div>
        <CardContent className="flex w-full  p-4 ">
          <div className=" space-y-3">
            <h1 className="text-2xl font-bold">{course.title}</h1>
            <p className="text-sm text-muted-foreground">
              {course.smallDescription}
            </p>
            <Separator />
            {/* <div className="space-y-1">
              <div className="flex justify-between text-sm">
                <span className="font-medium">Level:</span>
                <span className="text-muted-foreground">{course.level}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="font-medium">Language:</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="font-medium">Category:</span>
                <span className="text-muted-foreground">{course.category}</span>
              </div>
            </div> */}
            <div className="flex justify-between">
              <h1 className="">Price</h1>
              <span className="font-medium text-xl text-primary">
                {course.price === 0
                  ? "Free"
                  : new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "USD",
                    }).format(course.price)}
              </span>
            </div>
            <div className="space-y-1">
              <Button className="w-full">Enroll Now</Button>
              <span className="text-[12px] ">30-Day Money-Back Guarantee</span>
            </div>
          </div>
        </CardContent>
        <div className="flex flex-col gap-2 justify-center">
          <p>What you will get:</p>
          <div className="flex flex-wrap items-center gap-3 ">
            <BoxInfo icon={Clock} info={`${course.duration} hours`} />
            <BoxInfo icon={IconChartBar} info={course.level} />
            <BoxInfo icon={IconCategory} info={course.category} />
            <BoxInfo
              icon={IconBook}
              info={`${
                course.chapter.reduce(
                  (total, chapter) => total + chapter.lessons.length,
                  0
                ) || 0
              } lessons`}
            />
          </div>
        </div>
      </Card>
      <Tabs defaultValue="About">
        <TabsList
          className="flex w-full justify-center dark:bg-[#242424]
         bg-accent px-16 pt-10 pb-4"
        >
          <TabsTrigger
            value="About"
            className=" pb-5 data-[state=active]:!bg-inherit rounded-sm !shadow-none
            border-t-0 border-x-0 border-b-2 data-[state=active]:!border-b-ring "
          >
            About
          </TabsTrigger>
          <TabsTrigger
            value="Course Content"
            className=" pb-5 data-[state=active]:!bg-inherit rounded-sm !shadow-none
            border-t-0 border-x-0 border-b-2 data-[state=active]:!border-b-ring "
          >
            Course Content
          </TabsTrigger>
        </TabsList>
        {/* About content */}
        <TabsContent value="About" className="ps-6">
          <RenderDescription json={JSON.parse(course.description)} />
        </TabsContent>
        {/* Course content */}
        <TabsContent value="Course Content" className="p-9 ps-16 ">
          <div className="flex justify-between">
            <h1 className="text-xl font-medium">Course content</h1>
            <span className="text-sm text-muted-foreground font-medium">
              {course.chapter.reduce(
                (total, chapter) => total + chapter.lessons.length,
                0
              ) || 0}{" "}
              lessons
            </span>
          </div>
          <div className="space-y-5 pt-5">
            {course.chapter.map((chapter) => (
              <Collapsible key={chapter.id} defaultValue={0}>
                <Card
                  className="p-0 border-0 gap-0 rounded-sm overflow-hidden transition-all duration-200 
                hover:shadow-md "
                >
                  <CollapsibleTrigger>
                    <CardContent className="flex justify-between items-center py-2 text-left font-medium hover:cursor-pointer hover:bg-accent/50 transition-colors">
                      <h3 className="flex items-center gap-2 text-sm sm:text-base">
                        <TvMinimalPlay size={18} />
                        {chapter.title}
                      </h3>
                      <span className="text-muted-foreground text-sm sm:text-base min-w-20 text-center">
                        {chapter.lessons.length} Lesson
                        {chapter.lessons.length > 1 && "s"}
                      </span>
                    </CardContent>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <div className="space-y-2 bg-background border-l border-r ">
                      {chapter.lessons.map((lesson) => (
                        <div className="border-b" key={lesson.id}>
                          <div
                            key={lesson.id}
                            className="px-12 py-2 text-sm sm:text-base "
                          >
                            {lesson.title}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CollapsibleContent>
                </Card>
              </Collapsible>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PublicCourseRoute;
