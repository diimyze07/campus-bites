import { auth } from "@/auth";
import Link from "next/link";
import OutletCard from "@/components/outletCard/outletCard";
import { addOutlet } from "@/testActions/dbActions";
import { getOutlets } from "@/actions/getActions";
import { redirectIfNotSignedIn } from "@/actions/routingActions";
import styles from "@/app/outlets/page.module.css";
import { addMenuItem } from "@/testActions/dbActions";

export default async function Outlets() {
  const session = await auth();
  redirectIfNotSignedIn(session);

  const outlets = await getOutlets();
  console.log(outlets);

  // addOutlet({
  //   outletName: "Wich Please",
  //   outletOpensAt: "05:00 PM",
  //   outletClosesAt: "02:00 AM",
  // });

  return (
    <main className={styles.outlets}>
      {outlets.map((outlet) => (
        <Link key={Math.random()} href={`outlets/${outlet.outletQueryName}`}>
          <OutletCard outletName={outlet.outletName} />
        </Link>
      ))}
    </main>
  );
}
