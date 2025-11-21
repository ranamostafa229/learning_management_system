import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { ThemeToggle } from "../ui/themeToggle";
import Link from "next/link";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function SiteHeader({ pathname }: { pathname: string }) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  return (
    <header
      className="flex h-(--header-height) shrink-0 items-center gap-2 border-b bg-sidebar 
    transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)"
    >
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6 ">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <h1 className="text-base font-semibold">
          <span className="hidden sm:inline-block sm:pr-1 capitalize">
            {pathname.startsWith("/admin") ? "Admin" : "User"}
          </span>
          Dashboard
        </h1>
        <div className="ml-auto flex items-center gap-4">
          {session?.user?.role === "admin" && pathname.startsWith("/admin") && (
            <Link
              href={"/admin/courses/create"}
              className={buttonVariants({
                variant: "default",
                className:
                  "cursor-pointer rounded-sm dark:hover:!bg-primary/90 hover:!bg-accent-foreground",
              })}
            >
              Create New Course
            </Link>
          )}

          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
