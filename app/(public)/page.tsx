import { buttonVariants } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

const Home = () => {
  return (
    <section className="relative ">
      <Image
        src="/bgImg.jpg"
        alt="Background Image"
        width={100}
        className="w-full h-screen  object-cover "
        height={50}
        priority
      />
      {/* Overlay */}
      <div
        className="absolute inset-0 
      bg-black opacity-35 dark:opacity-80 w-full h-full "
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
    </section>
  );
};

export default Home;
