import { ReactNode } from "react";
import Navbar from "./_components/Navbar";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import Footer from "./_components/Footer";

const LayoutShared = async ({ children }: { children: ReactNode }) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  return (
    <>
      <Navbar session={session} />
      <div className="flex flex-col min-h-screen">{children}</div>
      <Footer />
    </>
  );
};

export default LayoutShared;
