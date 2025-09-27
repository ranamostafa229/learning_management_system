import { buttonVariants } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

const Home = () => {
  return (
    <section className="relative ">
      <Image
        src="/bgImg.jpg"
        alt="logo"
        width={100}
        className="w-full h-screen brightness-100 object-cover "
        height={50}
      />
      {/* Overlay */}
      <div
        className="absolute inset-0 
      bg-background opacity-10 dark:opacity-80 w-full h-full "
      />
      {/* content */}
      <div
        className="absolute  inset-0 flex flex-col items-center justify-center text-center 
      space-y-10 "
      >
        <div>
          <h1 className="text-4xl md:text-6xl font-bold text-primary-foreground mb-4">
            Welcome to Our Learning Platform
          </h1>
          <p className="text-lg md:text-xl text-primary-foreground ">
            Discover a world of knowledge and skills
          </p>
        </div>
        <Link
          className={buttonVariants({
            variant: "default",
            size: "lg",
            className:
              "!rounded-full w-[190px] h-10 !text-[16px] !font-semibold hover:bg-primary/90",
          })}
          href="/courses"
        >
          VIEW ALL COURSES
        </Link>
      </div>
      {/* <div className="flex gap-7 bottom-10 absolute">
        <Card className="w-[300px] md:w-[350px] lg:w-[400px] bg-background/70 backdrop-blur-sm border-2 border-primary/20">
          <CardHeader>
            <CardTitle>
              New Courses Coming Soon! Stay Tuned for Exciting Updates.
            </CardTitle>
          </CardHeader>
          <CardContent>
            We are constantly adding new courses to our platform. Check back
            regularly to explore the latest offerings and expand your knowledge!
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>
              New Courses Coming Soon! Stay Tuned for Exciting Updates.
            </CardTitle>
          </CardHeader>
          <CardContent>
            We are constantly adding new courses to our platform. Check back
            regularly to explore the latest offerings and expand your knowledge!
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>
              New Courses Coming Soon! Stay Tuned for Exciting Updates.
            </CardTitle>
          </CardHeader>
          <CardContent>
            We are constantly adding new courses to our platform. Check back
            regularly to explore the latest offerings and expand your knowledge!
          </CardContent>
        </Card>
      </div> */}
    </section>
  );
};

export default Home;
