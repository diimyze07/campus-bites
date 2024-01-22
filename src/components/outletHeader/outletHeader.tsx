import type { WithId, Document } from "mongodb";

export default function OutletHeader({ outlet }: { outlet: WithId<Document> }) {
  return (
    <div>
      <h2>{outlet?.outletName}</h2>
      <p>Opens at: {outlet?.outletOpensAt}</p>
      <p>Closes at: {outlet?.outletClosesAt}</p>
    </div>
  );
}
