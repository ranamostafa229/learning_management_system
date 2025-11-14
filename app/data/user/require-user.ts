import "server-only";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { cache } from "react";

// will cache the result of this function for 1 render pass(- when multiple components call requireUser at the same time)
// - it will get the user session once and then it will cache the result for the remaining queries
// that exist in the same render page - On a new page render or request, the cache does not persist, so the session will be fetched again.
export const requireUser = cache(async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return redirect("/login");
  }
  return session.user;
});
