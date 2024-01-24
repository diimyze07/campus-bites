"use client";

import { signIn } from "next-auth/react";
import styles from "./signInButton.module.css";

export default function SignInButton() {
  return (
    <button
      className={styles.btnSignIn}
      onClick={() => {
        signIn();
      }}
    >
      Sign In
    </button>
  );
}
