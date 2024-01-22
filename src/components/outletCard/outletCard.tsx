import styles from "@/components/outletCard/outletCard.module.css";

export default function OutletCard({ outletName }: { outletName: string }) {
  return <div className={styles.outletCard}>{outletName}</div>;
}
