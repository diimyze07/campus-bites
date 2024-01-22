import { MongoClient } from "mongodb";

if (!process.env.MONGODB_URI) {
  throw new Error(`Invalid/Missing environment variable: "MONGODB_URI"`);
}

const URI = process.env.MONGODB_URI;
let mongoClient = new MongoClient(URI);
let mongoClientPromise = mongoClient.connect();

export default mongoClientPromise;
