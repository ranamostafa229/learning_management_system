import { ReactNode } from "react";
import Navbar from "./_components/Navbar";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";

const LayoutShared = async ({ children }: { children: ReactNode }) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  console.log("Shared layout session:", session?.user);
  return (
    <div>
      <Navbar session={session} />
      {children}
    </div>
  );
};

export default LayoutShared;
