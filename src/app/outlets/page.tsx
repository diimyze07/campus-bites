import Link from "next/link";
import OutletCard from "@/components/outletCard/outletCard";
import styles from "@/app/outlets/page.module.css";
import mongoClientPromise from "@/lib/mongodb/dbConnect";

export const getOutlets = async () => {
  const dbConnection = await mongoClientPromise;
  const collection = dbConnection.db("CampusBites").collection("outlets");

  let result = await collection.find({}).toArray();

  return result;
};

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
