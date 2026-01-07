"use client";

import React, { useEffect, useState } from "react";
type AppItem = {
  url: string;
  title: string;
  icon?: string;
  description: string;
};
export default function EditBar() {
  const [apps, setApps] = useState<AppItem[]>([]);
  const [adminApps, setAdminApps] = useState<AppItem[]>([]);

  useEffect(() => {
    const load = async () => {
      const [adminRes, appsRes] = await Promise.all([
        fetch("/api/adminapps", { cache: "no-store" }),
        fetch("/api/apps", { cache: "no-store" }),
      ]);

      if (!adminRes.ok || !appsRes.ok) throw new Error("Failed to fetch data");

      setAdminApps(await adminRes.json());
      setApps(await appsRes.json());
    };

    load().catch(console.error);
  }, []);

  return <div className="flex flex-col w-full h-full">
    <div className="flex flex-row items-center justify-between w-full/95 h-16 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-black dark:text-white p-4 mt-0 m-4">
      <div className="flex flex-row gap-4 items-center">
        <div>
          タイトル：
        </div>
        <input type="text" className="border rounded px-2 py-1 text-black dark:text-white bg-zinc-200/50 dark:bg-zinc-700/30" defaultValue="こんにちは"/>
      </div>
      <div>

      </div>
    </div>
  </div>;
}