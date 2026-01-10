"use client";

import { usePathname, useRouter } from "next/navigation";

type Props = {
  title?: string;
  href?: string;
};

export default function PagesButton({ title, href }: Props) {
  const router = useRouter();
  const pathname = usePathname();

  const isActive = !!href && (pathname === href || pathname === `${href}/`);

  return (
    <div
      onClick={() => {
        if (href) router.push(href);
      }}
      className={[
        "w-full m-2 ml-0 p-2 rounded-xl cursor-pointer transition duration-100 ease-out",
        isActive
          ? "bg-zinc-100 dark:text-white dark:bg-zinc-800 text-black"
          : "bg-zinc-50 dark:bg-zinc-900 hover:bg-zinc-200 dark:hover:bg-zinc-800",
      ].join(" ")}
      aria-current={isActive ? "page" : undefined}
    >
      <span className="font-medium">{title ?? "アプリ一覧"}</span>
    </div>
  );
}
