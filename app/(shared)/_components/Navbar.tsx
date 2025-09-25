import { buttonVariants } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import UserDropdown from "./UserDropdown";
import { ThemeToggle } from "@/components/ui/themeToggle";

const navigationItems = [
  { name: "Home", href: "/" },
  { name: "Courses", href: "/courses" },
  { name: "Dashboard", href: "/dashboard" },
  { name: "About", href: "/about" },
  // { name: "Contact", href: "/contact" },
];
const Navbar = () => {
  return (
    <header className="flex absolute z-10 items-center  w-full  ">
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
            className="w-32"
          />
        </Link>
        {/* Desktop Navigation */}
        <nav className="hidden lg:flex ml-0 lg:ml-36  ">
          <div className=" flex items-baseline space-x-8">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-md font-medium text-white hover:text-primary"
              >
                {item.name}
              </Link>
            ))}
          </div>
        </nav>
        <div className="flex items-center gap-4  ">
          <ThemeToggle />
          <UserDropdown />
          <Link
            href="/"
            className={buttonVariants({
              variant: "default",
              className:
                "!rounded-full text-lg lg:text-[17px] w-[150px] lg:w-[200px] h-10 md:h-11 !font-bold ",
              size: "lg",
            })}
          >
            START LEARNING
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
