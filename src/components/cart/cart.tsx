import { auth } from "@/auth";
import { getUserCart } from "@/actions/getActions";
import { redirectIfNotSignedIn } from "@/actions/routingActions";

export default async function Cart() {
  const session = await auth();
  redirectIfNotSignedIn(session);

  const cartItems =
    session && session?.user && session?.user.email
      ? await getUserCart(session?.user?.email)
      : [];

  let numOfCartItems = cartItems.length;

  return <div>Cart items: {numOfCartItems}</div>;
}
