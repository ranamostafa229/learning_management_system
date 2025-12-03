"use client";
import { buttonVariants } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import UserDropdown from "./UserDropdown";
import { ThemeToggle } from "@/components/ui/themeToggle";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";

const navigationItems = [
  { name: "Home", href: "/" },
  { name: "Courses", href: "/courses" },
  { name: "Dashboard", href: "/dashboard" },
  // { name: "About", href: "/about" },
];
const Navbar = () => {
  const { data: session } = authClient.useSession();

  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 w-full z-50 items-center ",
        scrolled &&
          "dark:bg-gradient-to-b from-secondary to-background/100 dark:shadow-none bg-white shadow-sm "
      )}
    >
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
              pathname === "/" && !scrolled && "block"
            )}
            priority
          />
          <Image
            src="/logoblack.svg"
            alt="logo"
            width={100}
            height={50}
            className={cn(
              "w-32 dark:hidden",
              pathname === "/" && !scrolled ? "hidden" : "block"
            )}
            priority
          />
        </Link>
        {/* Desktop Navigation */}
        <nav
          className={cn(
            "hidden lg:flex ml-0  ",
            session ? "lg:ml-4" : "lg:ml-20"
          )}
        >
          <div className=" flex items-baseline space-x-8">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                href={
                  item.href === "/dashboard" && session?.user.role === "admin"
                    ? "/admin"
                    : item.href
                }
                className={cn(
                  "text-md font-medium  hover:text-primary",
                  pathname === "/" && !scrolled && "text-white"
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
            <UserDropdown />
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
