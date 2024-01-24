import NextAuth from "next-auth";
import Google from "@auth/core/providers/google";
import { FirestoreAdapter, initFirestore } from "@auth/firebase-adapter";
import { cert } from "firebase-admin/app";

export const { auth, handlers } = NextAuth({
  providers: [Google],
  adapter: FirestoreAdapter(
    initFirestore({
      credential: cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY,
      }),
    })
  ),
});
