"use client";

import { useRouter } from "next/navigation";
import Card from "../card";
import apps from "../data/apps.json";
import { APP_BASE_PATH } from "../constant";
export default function Page() {
  const router = useRouter();
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
          src={APP_BASE_PATH + app.icon}
        />
      ))}
    </div>
  );
}
