"use client";
import EditBar from "@/app/editbar";
import React, { useEffect, useState } from "react";
import Button from "@/app/button";
type AppItem = {
  url: string;
  title: string;
  icon?: string;
  description: string;
};
const emptyItem = (): AppItem => ({
  title: "",
  description: "",
  url: "",
  icon: "/logo.png",
});

export default function AdminEditPage() {
  const [apps, setApps] = useState<AppItem[]>([emptyItem()]);
  const [adminApps, setAdminApps] = useState<AppItem[]>([emptyItem()]);
  const updateAt = (index: number, next: AppItem, isAdmin: boolean) => {
    if (!isAdmin)
      setApps((prev) => prev.map((v, i) => (i === index ? next : v)));
    else setAdminApps((prev) => prev.map((v, i) => (i === index ? next : v)));
  };

  const removeAt = (index: number, isAdmin: boolean) => {
    if (!isAdmin) setApps((prev) => prev.filter((_, i) => i !== index));
    else setAdminApps((prev) => prev.filter((_, i) => i !== index));
  };

  const addOne = (isAdmin: boolean) => {
    if (!isAdmin) setApps((prev) => [...prev, emptyItem()]);
    else setAdminApps((prev) => [...prev, emptyItem()]);
  };
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
  const saveAll = async (isAdmin: boolean) => {
    const payload = isAdmin ? adminApps : apps;

    const res = await fetch(isAdmin ? "/api/adminapps" : "/api/apps", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) throw new Error(await res.text());
  };
  return (
    <div className="flex flex-col gap-3">
      <div className="flex justify-between">
        <span className="font-semibold text-3xl p-4 text-black dark:text-white mb-4">
          編集画面
        </span>
        <div className="flex flex-row">
          <Button
            onClick={() => {
              saveAll(false);
            }}
            title="保存"
          />
          <div className="w-2"></div>
          <Button onClick={() => addOne(false)} title="追加" />
        </div>
      </div>
      <div className="flex flex-col">
        {apps.map((item, index) => (
          <EditBar
            key={index}
            value={item}
            onChange={(next) => updateAt(index, next, false)}
            onDelete={() => removeAt(index, false)}
          />
        ))}
        <div className="flex flex-row justify-between">
          <span className="font-semibold text-3xl p-4 text-black dark:text-white mb-4">
            管理者用アプリ編集
          </span>{" "}
          <div className="flex flex-row">
            <Button onClick={() => addOne(true)} title="追加" />{" "}
            <div className="w-2"></div>{" "}
            <Button onClick={() => saveAll(true)} title="保存" />
          </div>
        </div>
        {adminApps.map((item, index) => (
          <EditBar
            key={index}
            value={item}
            onChange={(next) => updateAt(index, next, true)}
            onDelete={() => removeAt(index, true)}
          />
        ))}
      </div>
    </div>
  );
}
