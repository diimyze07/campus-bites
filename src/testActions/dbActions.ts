import mongoClientPromise from "@/lib/mongodb/dbConnect";
import type { ObjectId } from "mongodb";
import type { FindCursor } from "mongodb";
import type { WithId } from "mongodb";
import type { Document } from "mongodb";
import { createQueryName } from "@/lib/utils/utilFunctions";

interface Outlet {
  outletName: string;
  outletOpensAt: string;
  outletClosesAt: string;
}

// const createQueryName = (name: string) =>
//   name.toLowerCase().replaceAll(" ", "-");

// const generateMenuItemIndex = (categoryMenuItems: WithId<Document>[]) => {
//   let maxId = 0;

//   categoryMenuItems.forEach((item) => {
//     if (item.itemIndex > maxId) maxId = item.itemIndex;
//   });

//   return maxId + 1;
// };

// TODO: Check if outlet already exists
export const addOutlet = async ({
  outletName,
  outletOpensAt,
  outletClosesAt,
}: Outlet) => {
  const dbConnection = await mongoClientPromise;
  const db = dbConnection.db("CampusBites");
  const collection = db.collection("outlets");

  const newOutlet = {
    outletName,
    outletQueryName: createQueryName(outletName),
    outletOpensAt,
    outletClosesAt,
    outletMenu: [],
  };

  await collection.insertOne(newOutlet);
};

export const addMenuCategory = async (
  categoryName: string,
  outletId: ObjectId
) => {
  const dbConnection = await mongoClientPromise;
  const db = dbConnection.db("CampusBites");
  const collection = db.collection("menuCategories");

  const cursor: FindCursor<WithId<Document>> = collection.find({
    outletId: outletId,
  });
  let categories: WithId<Document>[] = [];
  for await (const doc of cursor) {
    categories.push(doc);
  }

  const newMenuCategory = {
    categoryName,
    categoryQueryName: createQueryName(categoryName),
    categoryIndex: categories.length,
    categoryMenuItems: [],
    outletId,
  };

  collection.insertOne(newMenuCategory);
};

export const addMenuItem = async (
  itemName: string,
  itemPrice: number,
  itemIsVeg: boolean,
  categoryId: ObjectId,
  outletId: ObjectId
) => {
  const dbConnection = await mongoClientPromise;
  const db = dbConnection.db("CampusBites");
  const collectionMenuItems = db.collection("menuItems");
  const collectionMenuCategories = db.collection("menuCategories");

  // const cursor: FindCursor<WithId<Document>> = collectionMenuCategories.find({
  //   _id: categoryId,
  //   outletId: outletId,
  // });
  // let categoryMenuItems: WithId<Document>[] = [];
  // for await (const doc of cursor) {
  //   categoryMenuItems.push(doc);
  // }

  const category = await collectionMenuCategories.findOne({
    _id: categoryId,
    outletId: outletId,
  });
  if (category === null)
    return console.log("Entered category for the menu item does not exist");

  const newMenuItem = {
    itemName,
    itemPrice,
    itemIsVeg,
    itemCategoryIndex: category.categoryMenuItems.length,
    categoryId,
    outletId,
  };

  const addedMenuItem = await collectionMenuItems.insertOne(newMenuItem);

  collectionMenuCategories.updateOne(
    { _id: categoryId },
    { $push: { categoryMenuItems: addedMenuItem.insertedId } }
  );
};
