import type { Session } from "next-auth";
import { redirect } from "next/navigation";

export const redirectIfNotSignedIn = (session: Session | null) => {
  if (!session?.user) redirect("/api/auth/signin");
};
