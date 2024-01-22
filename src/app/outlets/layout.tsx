import Cart from "@/components/cart/cart";

export default function OutletsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <header>
        <Cart />
      </header>
      {children}
    </>
  );
}
