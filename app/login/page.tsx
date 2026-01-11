"use client";
import { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Button from "../button";
import { GoogleButton } from "../googlebutton";
import { signIn } from "next-auth/react";
import { withBasePath } from "@/lib/basePath";

function LoginContent() {
  const router = useRouter();
  const sp = useSearchParams();
  const rawCallbackUrl = sp.get("callbackUrl");
  const callbackUrl =
    !rawCallbackUrl || rawCallbackUrl === "/" ? withBasePath("/") : rawCallbackUrl;
  return (
    <div className="flex flex-box flex-col flex-wrap justify-center items-center min-h-dvh w-full text-black dark:text-white bg-white gap-10 dark:bg-zinc-900 p-4">
      <h1 className="text-3xl font-bold">ログイン(admin)</h1>
      <div className="mt-2 flex flex-box gap-6">
        <GoogleButton
          onClick={() => {
            signIn("google", { callbackUrl });
          }}
        />
        <Button
          onClick={() => {
            router.push(withBasePath("/"));
          }}
          title="トップページに戻る"
        />
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <Suspense>
      <LoginContent />
    </Suspense>
  );
}
