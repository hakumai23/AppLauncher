"use client";

import { SessionProvider } from "next-auth/react";
import { withBasePath } from "@/lib/basePath";

export function Providers({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionProvider basePath={withBasePath("/api/auth")}>
      {children}
    </SessionProvider>
  );
}
