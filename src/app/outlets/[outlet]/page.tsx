import { redirect } from "next/navigation";
import OutletHeader from "@/components/outletHeader/outletHeader";
import MenuItemCard from "@/components/menuItemCard/menuItemCard";
import { getOutlet } from "@/actions/getActions";
import { getMenuCategories } from "@/actions/getActions";
import { getMenuItems } from "@/actions/getActions";

export default async function Outlet({
  params,
}: {
  params: { outlet: string };
}) {
  const [outlet, categories, menuItems] = await Promise.all([
    getOutlet(params.outlet),
    getMenuCategories(params.outlet),
    getMenuItems(params.outlet),
  ]);

  if (outlet === null) {
    redirect("/outlets");
  }

  return (
    <>
      <OutletHeader outlet={outlet} />
      <div>
        {menuItems.map((menuCategoryItems, index) => (
          <div key={Math.random()}>
            <h4>{categories[index].categoryName}</h4>
            {menuCategoryItems.map((item) => (
              <MenuItemCard
                key={Math.random()}
                itemName={item.itemName}
                itemPrice={item.itemPrice}
                itemIsVeg={item.itemIsVeg}
              />
            ))}
          </div>
        ))}
      </div>
    </>
  );
}
