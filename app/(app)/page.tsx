"use client";

import { useRouter } from "next/navigation";
import { useState,useEffect } from "react";
import Card from "../card";
type AppItem = {
  url: string;
  title: string;
  icon?: string;
  description: string;
};
export default function Page() {
  const router = useRouter();
  const [apps, setApps] = useState<AppItem[]>([]);
  useEffect(() => {
    fetch("/apps/api/apps")
      .then((res) => res.json())
      .then((data) => setApps(data))
      .catch((err) => console.error(err));
  }, []);
  return (
    <div className="flex flex-row flex-wrap gap-3 p-4">
      {apps.map((app, i) => (
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
  );
}
