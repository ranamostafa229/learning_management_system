import { buttonVariants } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

const Home = () => {
  return (
    <section className="relative">
      <Image
        src="/bgImg.jpg"
        alt="logo"
        width={100}
        className="w-full h-screen brightness-100 object-cover "
        height={50}
      />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
      bg-background opacity-10 dark:opacity-80 w-full h-full"
      />
      <div className="absolute z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center space-y-10">
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
            size: "lg",
            className: "!rounded-full w-[190px] !text-[16px] !font-semibold",
          })}
          href="/courses"
        >
          View All Courses
        </Link>
      </div>
    </section>
  );
};

export default Home;
