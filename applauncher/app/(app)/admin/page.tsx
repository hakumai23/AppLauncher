"use client";

import { useRouter } from "next/navigation";
import Card from "@/app/card";
import adminapps from "@/app/data/adminapps.json";
export default function AdminPage() {
  const router = useRouter();
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
