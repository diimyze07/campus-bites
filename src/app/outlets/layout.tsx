import Cart from "@/components/cart/cart";
import { auth } from "@/auth";
import { redirectIfNotSignedIn } from "@/actions/routingActions";

export default async function OutletsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  redirectIfNotSignedIn(session);

  return (
    <>
      <header>
        <Cart />
      </header>
      {children}
    </>
  );
}
