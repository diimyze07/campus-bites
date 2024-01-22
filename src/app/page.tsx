import { auth } from "@/auth";
import SignInButton from "@/components/signInButton/signInButton";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth();

  if (session?.user) {
    redirect("/outlets");
  }

  return (
    <>
      <h1>Welcome to Campus Eats</h1>
      <p>The one place you need to order anything from campus.</p>
      <SignInButton redirectUrl="/api/auth/signin">Sign In</SignInButton>
    </>
  );
}
