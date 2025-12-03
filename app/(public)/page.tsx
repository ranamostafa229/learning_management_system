import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Globe, TabletSmartphone, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const featureInfo = [
  {
    icon: <TabletSmartphone size={40} />,
    title: "Mobile Learning",
    description: "Access your courses from anywhere, on any device.",
  },
  {
    icon: <Users size={40} />,
    title: "Academic Material",
    description: "Have access to a wide range of academic materials.",
  },
  {
    icon: <Globe size={40} />,
    title: "An Inclusive Experience",
    description: "Get the best learning experience from anywhere",
  },
];
const Home = () => {
  return (
    <main>
      <div className="relative ">
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
      </div>
      <div className="relative w-full h-52 flex items-center justify-center">
        <div
          className="absolute opacity-25 dark:opacity-15 bg-[url('/title_bg.jpg')] 
          bg-repeat-x bg-[center_bottom] bg-contain inset-0"
        />
        {/*content inside */}
        <h2 className="text-2xl font-semibold relative ">
          Improving Lives Through Learning
        </h2>
      </div>
      {/* Features section */}
      <div className="flex flex-col items-center  px-10 py-20 gap-4 bg-secondary dark:bg-black ">
        <h2 className="text-2xl font-semibold">Our Features</h2>
        <p className="text-muted-foreground">On Cursus, you have access to:</p>
        <Separator className="bg-primary !w-14 !h-1 rounded-sm" />
        <div className="flex flex-wrap justify-center gap-4 pt-4">
          {featureInfo.map((feature) => (
            <div
              className="flex flex-col gap-4 items-center"
              key={feature.title}
            >
              {feature.icon}
              <h3 className="text-lg font-semibold">{feature.title}</h3>
              <p className="text-muted-foreground w-96">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
      {/* Story Section*/}
      <div className=" flex flex-wrap justify-between max-w-6xl mx-auto items-center pt-16 px-5 ">
        <div className="flex flex-col gap-5 w-full md:w-3/5 ">
          <h2 className="font-semibold text-2xl">Our Story</h2>
          <Separator className="bg-primary !w-14 !h-1 rounded-sm" />
          <p className="">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Placeat,
            hic mollitia. Magnam, aspernatur assumenda! Iusto laudantium
            corporis nesciunt repudiandae deleniti ex tempora commodi aliquam
            officiis, iure quos dolorum dolorem praesentium. Lorem ipsum dolor
            sit amet, consectetur adipisicing elit. Placeat, hic mollitia.
            Magnam, aspernatur assumenda! Iusto laudantium corporis nesciunt
            repudiandae deleniti ex tempora commodi aliquam officiis, iure quos
            dolorum dolorem praesentium.
          </p>
        </div>
        <div className="w-full md:w-2/5">
          <Image
            src={"/stroy_img.png"}
            height={200}
            width={600}
            alt="story image"
            className=""
          />
        </div>
      </div>
    </main>
  );
};

export default Home;
