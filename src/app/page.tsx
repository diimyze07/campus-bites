import { auth } from "@/auth";
import SignInButton from "@/components/signInButton/signInButton";
import mongoClientPromise from "@/lib/mongodb/dbConnect";
import { redirect } from "next/navigation";
// import { addOutlet } from "@/testActions/mongo";

export default async function Home() {
  const session = await auth();
  console.log(session);

  // if (db !== undefined) {
  //   db.then(() => {
  //     console.log("CONNECTED!");
  //     addOutlet("Wich Please", "05:30 PM", "02:00 AM", db);
  //   }).catch((error) => console.log(`ERROR: ${error.message}`));
  // } else {
  //   console.log("Database is not defined!");
  // }

  if (session?.user) {
    redirect("/outlets");
  }

  mongoClientPromise
    .then(() => console.log("CONNECTED!"))
    .catch((error) => console.log(`ERROR: ${error}`));

  return (
    <>
      <h1>Welcome to Campus Eats</h1>
      <p>The one place you need to order anything from campus.</p>
      <SignInButton redirectUrl="/api/auth/signin">Sign In</SignInButton>
    </>
  );
}
