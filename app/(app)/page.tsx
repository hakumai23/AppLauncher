"use client";

import { useRouter } from "next/navigation";
import Card from "../card";
import apps from "../data/apps.json";

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
          src={app.icon}
        />
      ))}
    </div>
  );
}
