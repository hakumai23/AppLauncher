"use client";

import { signOut } from "next-auth/react";
import { withBasePath } from "@/lib/basePath";

type SignOutButtonProps = {
  className?: string;
};

export function SignOutButton(props: SignOutButtonProps) {
  const { className } = props;

  return (
    <button
      type="button"
      className={className}
      onClick={() => signOut({ callbackUrl: withBasePath("/") })}
    >
      Log Out
    </button>
  );
}
