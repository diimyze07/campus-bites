"use client";

import { useRouter } from "next/navigation";

export default function SignInButton({
  children,
  redirectUrl,
}: {
  children: string;
  redirectUrl: string;
}) {
  const router = useRouter();

  return (
    <button
      onClick={() => {
        router.push(redirectUrl);
      }}
    >
      {children}
    </button>
  );
}
