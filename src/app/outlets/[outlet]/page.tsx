// import { getOutlet } from "@/actions/getActions";
import { redirect } from "next/navigation";
import OutletHeader from "@/components/outletHeader/outletHeader";
import MenuItemCard from "@/components/menuItemCard/menuItemCard";
import type { WithId, Document } from "mongodb";

// import { addMenuCategory } from "@/testActions/dbActions";
// import { addMenuItem } from "@/testActions/dbActions";
// import { createQueryName } from "@/lib/utils/utilFunctions";
// import { getMenuCategory } from "@/actions/getActions";
// import { getMenuCategories } from "@/actions/getActions";
// import { getMenuItems } from "@/actions/getActions";

import { allOutletsPromise } from "@/lib/mongodb/data";
import { allMenuItemsPromise } from "@/lib/mongodb/data";
import { allMenuCategoriesPromise } from "@/lib/mongodb/data";

export default async function Outlet({
  params,
}: {
  params: { outlet: string };
}) {
  const allOutlets = await allOutletsPromise;
  let outlet: any;
  allOutlets.forEach((item) => {
    if (item.outletQueryName === params.outlet) {
      outlet = item;
    }
  });

  if (outlet === null) {
    redirect("/outlets");
  }

  // // addMenuCategory("Chinese", outlet._id);
  // const menuCategory = await getMenuCategory(createQueryName("Chinese"));
  // if (menuCategory !== null)
  //   addMenuItem("Chicken Fried Rice", 90, false, menuCategory._id, outlet._id);

  const allCategories = await allMenuCategoriesPromise;
  const allMenuItems = await allMenuItemsPromise;

  let categories: WithId<Document>[] = [];
  let menuItems: WithId<Document>[][] = [];
  allCategories.forEach((item) => {
    if (item.outlet === outlet.outletQueryName) {
      categories = item.menuCategories;
    }
  });
  allMenuItems.forEach((item) => {
    if (item.outlet === outlet.outletQueryName) {
      menuItems = item.menuItems;
    }
  });
  console.log(menuItems);

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
