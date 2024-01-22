import Link from "next/link";
import OutletCard from "@/components/outletCard/outletCard";
import styles from "@/app/outlets/page.module.css";
import mongoClientPromise from "@/lib/mongodb/dbConnect";
import { getOutlets } from "@/actions/getActions";

export default async function Outlets() {
  const outlets = await getOutlets();

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
