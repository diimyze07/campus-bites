import mongoClientPromise from "@/lib/mongodb/dbConnect";
import type { FindCursor, WithId } from "mongodb";
import type { Document } from "mongodb";

export const getOutlet = async (outletQueryName: string) => {
  const dbConnection = await mongoClientPromise;
  const db = dbConnection.db("CampusBites");
  const collection = db.collection("outlets");

  const result = collection.findOne({ outletQueryName: outletQueryName });

  return result;
};

const getOutlets = async () => {
  const dbConnection = await mongoClientPromise;
  const db = dbConnection.db("CampusBites");
  const collection = db.collection("outlets");

  const cursor: FindCursor<WithId<Document>> = collection.find({});
  let result: WithId<Document>[] = [];
  for await (const doc of cursor) {
    result.push(doc);
  }

  return result;
};

export const allOutletsPromise = getOutlets();

export const getMenuCategory = async (categoryQueryName: string) => {
  const dbConnection = await mongoClientPromise;
  const db = dbConnection.db("CampusBites");
  const collection = db.collection("menuCategories");

  const result = collection.findOne({ categoryQueryName: categoryQueryName });

  return result;
};

export const getMenuCategories = async (outletQueryName: string) => {
  const dbConnection = await mongoClientPromise;
  const db = dbConnection.db("CampusBites");
  const collectionOutlets = db.collection("outlets");
  const collectionCategories = db.collection("menuCategories");

  const outlet = await collectionOutlets.findOne({
    outletQueryName: outletQueryName,
  });

  let categories: WithId<Document>[] = [];

  if (outlet === null) return categories;
  const cursor: FindCursor<WithId<Document>> = collectionCategories.find({
    outletId: outlet._id,
  });
  for await (const doc of cursor) {
    categories.push(doc);
  }

  return categories;
};

const getAllMenuCategories = async () => {
  let result = [];

  const outlets = await allOutletsPromise;

  for await (const outlet of outlets) {
    const menuCategories = await getMenuCategories(outlet.outletQueryName);

    result.push({ outlet: outlet.outletQueryName, menuCategories });
  }

  return result;
};

export const allMenuCategoriesPromise = getAllMenuCategories();

export const getMenuItems = async (outletQueryName: string) => {
  const dbConnection = await mongoClientPromise;
  const db = dbConnection.db("CampusBites");
  const collectionOutlets = db.collection("outlets");
  const collectionMenuItems = db.collection("menuItems");
  const collectionCategories = db.collection("menuCategories");

  const outlet = await collectionOutlets.findOne({
    outletQueryName: outletQueryName,
  });
  const categorisedMenuItems: WithId<Document>[][] = [];
  if (outlet === null) return categorisedMenuItems;

  const cursor: FindCursor<WithId<Document>> = collectionCategories.find({
    outletId: outlet._id,
  });
  let categories: WithId<Document>[] = [];
  for await (const doc of cursor) {
    categories.push(doc);
  }

  for await (const category of categories) {
    let categoryMenuItems: WithId<Document>[] = [];

    for await (const menuItemId of category.categoryMenuItems) {
      let menuItem = await collectionMenuItems.findOne({ _id: menuItemId });
      if (menuItem !== null) {
        categoryMenuItems.push(menuItem);
      }
    }

    categoryMenuItems.sort(
      (a: WithId<Document>, b: WithId<Document>) =>
        a.itemCategoryIndex - b.itemCategoryIndex
    );

    categorisedMenuItems.push(categoryMenuItems);
  }

  return categorisedMenuItems;
};

const getAllMenuItems = async () => {
  let result = [];

  const outlets = await allOutletsPromise;

  for await (const outlet of outlets) {
    const menuItems = await getMenuItems(outlet.outletQueryName);

    result.push({ outlet: outlet.outletQueryName, menuItems });
  }

  return result;
};

export const allMenuItemsPromise = getAllMenuItems();

export const getUserCart = async (userEmail: string) => {
  const dbConnection = await mongoClientPromise;
  const db = dbConnection.db("CampusBites");
  const collection = db.collection("cartItems");

  const cursor: FindCursor<WithId<Document>> = collection.find({ userEmail });
  let result: WithId<Document>[] = [];
  for await (const doc of cursor) {
    result.push(doc);
  }

  return result;
};
