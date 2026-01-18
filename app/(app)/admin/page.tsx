"use client";

import { useRouter } from "next/navigation";
import { useState,useEffect } from "react";
import Card from "@/app/card";
type AppItem = {
  url: string;
  title: string;
  icon?: string;
  description: string;
};
export default function AdminPage() {
  const router = useRouter();
  const [adminapps, setadminApps] = useState<AppItem[]>([]);
  useEffect(() => {
    fetch("/apps/api/adminapps")
      .then((res) => res.json())
      .then((data) => setadminApps(data))
      .catch((err) => console.error(err));
  }, []);
  return (
    <div className="p-4 flex flex-wrap flex-col gap-3">
      <h1 className="font-semibold text-3xl text-black dark:text-white mb-4">
        管理者用アプリ一覧
      </h1>
      <div className="flex flex-row flex-wrap gap-3">
        {adminapps.map((app, i) => (
          <Card
            key={i}
            title={app.title}
            description={app.description}
            onClick={() => {
              router.push(app.url);
            }}
            src={app.icon}
          />
        ))}
      </div>
    </div>
  );
}
