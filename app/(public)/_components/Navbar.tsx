"use client";
import { buttonVariants } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import UserDropdown from "./UserDropdown";
import { ThemeToggle } from "@/components/ui/themeToggle";
import { Session } from "@/lib/auth";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navigationItems = [
  { name: "Home", href: "/" },
  { name: "Courses", href: "/courses" },
  { name: "Dashboard", href: "/dashboard" },
  { name: "About", href: "/about" },
  // { name: "Contact", href: "/contact" },
];
const Navbar = ({ session }: { session: Session | null }) => {
  // const { data: session, isPending } = authClient.useSession();
  const pathname = usePathname();

  return (
    <header className="fixed top-0 left-0 z-10 items-center  w-full  ">
      <div
        className="container mx-auto flex  items-center justify-between py-4 px-4 
      lg:px-0"
      >
        <Link href="/">
          <Image
            src="/logo.svg"
            alt="logo"
            width={100}
            height={50}
            className={cn(
              "w-32 hidden dark:block",
              pathname === "/" && "block"
            )}
          />
          <Image
            src="/logoblack.svg"
            alt="logo"
            width={100}
            height={50}
            className={cn("w-32 dark:hidden", pathname === "/" && "hidden")}
          />
        </Link>
        {/* Desktop Navigation */}
        <nav className="hidden lg:flex ml-0 lg:ml-6  ">
          <div className=" flex items-baseline space-x-8">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "text-md font-medium  hover:text-primary",
                  pathname === "/" && "text-white"
                )}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </nav>
        <div className="flex items-center gap-4  ">
          <ThemeToggle />
          {session ? (
            <UserDropdown session={session} />
          ) : (
            <Link
              href="/login"
              className={buttonVariants({
                variant: "default",
                className:
                  "!rounded-full text-lg lg:text-[17px] w-[150px] lg:w-[200px] h-10 md:h-11 !font-bold ",
                size: "lg",
              })}
            >
              START LEARNING
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
