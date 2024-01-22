import NextAuth, { NextAuthConfig } from "next-auth";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import Google from "next-auth/providers/google";
import mongoClientPromise from "./lib/mongodb/dbConnect";

export const authConfig = {
  adapter: MongoDBAdapter(mongoClientPromise),
  providers: [Google],
} satisfies NextAuthConfig;

export const { handlers, auth } = NextAuth(authConfig);
