import { buttonVariants } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

const NotFound = () => {
  return (
    <section
      className="flex flex-col items-center justify-center h-screen gap-14 
   bg-[radial-gradient(circle_at_center,#ffffff,#aaaeb5_100%)!important]
    dark:bg-[radial-gradient(circle_at_center,#333333,#0d1218_100%)!important]"
    >
      <Image
        src="/logo.svg"
        alt="404"
        width={150}
        height={100}
        className="hidden dark:block"
      />
      <Image
        src="/logoblack.svg"
        alt="404"
        width={150}
        height={100}
        className="block dark:hidden"
      />
      <div className="flex  flex-col items-center justify-center mb-10">
        <h1 className="text-[196px] font-semibold">404</h1>
        <p className="text-2xl">
          The page you were looking for could not be found.
        </p>
        <Link
          href="/"
          className={buttonVariants({
            variant: "default",
            className: "mt-10 rounded-xs py-4 w-40",
          })}
        >
          Go to Homepage
        </Link>
      </div>
    </section>
  );
};

export default NotFound;
