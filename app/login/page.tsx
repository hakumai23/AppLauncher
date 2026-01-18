"use client";
import { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Button from "../button";
import { GoogleButton } from "../googlebutton";
import { signIn } from "next-auth/react";
import { withBasePath } from "@/lib/basePath";
import { toast } from "sonner";
function LoginContent() {
  const router = useRouter();
  const sp = useSearchParams();
  const rawCallbackUrl = sp.get("callbackUrl");
  const callbackUrl =
    !rawCallbackUrl || rawCallbackUrl === "/" ? withBasePath("/") : rawCallbackUrl;
  const getErrorMessage = (error: string | null) => {
    if (!error) return null;
    
    const errorMessages: Record<string, string> = {
      Configuration: "サーバーの設定に問題があります",
      AccessDenied: "アクセスが拒否されました",
      Verification: "認証トークンの有効期限が切れています",
      OAuthSignin: "認証プロバイダーへの接続に失敗しました",
      OAuthCallback: "認証プロバイダーからの応答に問題があります",
      OAuthCreateAccount: "アカウントの作成に失敗しました",
      EmailCreateAccount: "アカウントの作成に失敗しました",
      Callback: "認証コールバックでエラーが発生しました",
      OAuthAccountNotLinked: "別の認証方法で既に登録されているメールアドレスです",
      EmailSignin: "メール送信に失敗しました",
      CredentialsSignin: "認証情報が正しくありません",
      SessionRequired: "このページにアクセスするにはログインが必要です",
      Default: "認証エラーが発生しました",
    };

    return errorMessages[error] || errorMessages.Default;
  };
  const errorMessage = getErrorMessage(sp.get("error"));
  if (errorMessage) {
    toast.error(errorMessage);
  }
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
            router.push("/");
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
