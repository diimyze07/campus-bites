export default function MenuItemCard({
  itemName,
  itemPrice,
  itemIsVeg,
}: {
  itemName: string;
  itemPrice: number;
  itemIsVeg: boolean;
}) {
  return (
    <div>
      <h5>{itemName}</h5>
      <p>Rs. {itemPrice}</p>
      <p>{itemIsVeg ? "Veg" : "Non-Veg"}</p>
      <button>Add to Cart</button>
    </div>
  );
}
