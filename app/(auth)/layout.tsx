import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex min-h-svh items-center justify-center ">
      {/* Background Image */}
      <Image
        src="/signbg.svg"
        alt="Background"
        width={100}
        height={100}
        className="absolute top-0 left-0 w-screen h-screen object-cover opacity-5 dark:opacity-20 "
      />
      {/* Content */}
      <div className="flex flex-col w-full max-w-lg mx-10 md:mx-auto z-10 ">
        <Link
          href="/"
          className="hidden dark:flex absolute top-24  self-center mr-5 "
        >
          <Image src={"/logo.svg"} alt="logo" width={135} height={30} />
        </Link>
        <Link
          href="/"
          className="flex dark:hidden absolute top-24  self-center mr-5 "
        >
          <Image src="/logoblack.svg" alt="logo" width={135} height={30} />
        </Link>
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
