import { getServerSession } from "next-auth/next";
import Link from "next/link";
import { authOptions } from "../auth";
import { SignOutButton } from "./signout-button";

export default async function Header() {
  const session = await getServerSession(authOptions);
  const isLoggedIn = !!session;

  return (
    <header className="w-full h-16 p-4 flex justify-between items-center border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 anim-transition">
      <div className="flex items-center gap-3 w-60">
        <img
          src="/logo.png"
          alt="App Logo"
          className="h-8 w-auto object-contain dark:invert-100"
        />
        <h1 className="text-lg font-semibold">App Launcher</h1>
      </div>
      <div>
        {isLoggedIn ? (
          <div className="flex items-center gap-3">
            <span className="text-sm text-zinc-600 dark:text-zinc-300">
              {session?.user?.email ?? "ログイン中"}
            </span>
            <SignOutButton className="inline-flex items-center justify-center w-24 h-10 bg-zinc-200 text-zinc-900 hover:bg-zinc-300 dark:bg-zinc-800 dark:text-white dark:hover:bg-zinc-700 p-2 font-semibold rounded-xl" />
          </div>
        ) : (
          <Link
            href="/login"
            className="inline-flex items-center justify-center w-24 h-10 bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100 p-2 font-semibold rounded-xl"
          >
            Log In
          </Link>
        )}
      </div>
    </header>
  );
}
