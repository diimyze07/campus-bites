import mongoClientPromise from "@/lib/mongodb/dbConnect";
import type { WithId, Document, MongoClient } from "mongodb";

export const getOutlet = async (
  outletQueryName: string,
  dbConnection: MongoClient | null = null
) => {
  dbConnection =
    dbConnection === null ? await mongoClientPromise : dbConnection;
  const db = dbConnection.db("CampusBites");
  const collection = db.collection("outlets");

  const result = await collection.findOne({ outletQueryName: outletQueryName });

  return result;
};

export const getOutlets = async (dbConnection: MongoClient | null = null) => {
  dbConnection =
    dbConnection === null ? await mongoClientPromise : dbConnection;
  const db = dbConnection.db("CampusBites");
  const collection = db.collection("outlets");

  const result = collection.find({}).toArray();

  return result;
};

export const getMenuCategory = async (
  categoryQueryName: string,
  dbConnection: MongoClient | null = null
) => {
  dbConnection =
    dbConnection === null ? await mongoClientPromise : dbConnection;
  const db = dbConnection.db("CampusBites");
  const collection = db.collection("menuCategories");

  const result = await collection.findOne({
    categoryQueryName: categoryQueryName,
  });

  return result;
};

export const getMenuCategories = async (
  outletQueryName: string,
  dbConnection: MongoClient | null = null
) => {
  dbConnection =
    dbConnection === null ? await mongoClientPromise : dbConnection;
  const db = dbConnection.db("CampusBites");
  const collectionOutlets = db.collection("outlets");
  const collectionCategories = db.collection("menuCategories");

  const outlet = await collectionOutlets.findOne({
    outletQueryName: outletQueryName,
  });

  let categories: WithId<Document>[] = [];

  if (outlet === null) return categories;

  categories = await collectionCategories
    .find({
      outletId: outlet._id,
    })
    .toArray();

  return categories;
};

export const getMenuItems = async (
  outletQueryName: string,
  dbConnection: MongoClient | null = null
) => {
  dbConnection =
    dbConnection === null ? await mongoClientPromise : dbConnection;
  const db = dbConnection.db("CampusBites");
  const collectionOutlets = db.collection("outlets");
  const collectionMenuItems = db.collection("menuItems");
  const collectionCategories = db.collection("menuCategories");

  const outlet = await collectionOutlets.findOne({
    outletQueryName: outletQueryName,
  });
  const categorisedMenuItems: WithId<Document>[][] = [];
  if (outlet === null) return categorisedMenuItems;

  let categories: WithId<Document>[] = [];

  categories = await collectionCategories
    .find({
      outletId: outlet._id,
    })
    .toArray();

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

// export const getUserCart = async (userEmail: string) => {
//   const dbConnection = await mongoClientPromise;
//   const db = dbConnection.db("CampusBites");
//   const collection = db.collection("cartItems");

//   const cursor: FindCursor<WithId<Document>> = collection.find({ userEmail });
//   let result: WithId<Document>[] = [];
//   for await (const doc of cursor) {
//     result.push(doc);
//   }

//   return result;
// };
