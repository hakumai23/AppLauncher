"use client";

import { useRef } from "react";
import type { ChangeEvent } from "react";
import Button from "./button";
import { APP_BASE_PATH } from "./constant";
export type AppItem = {
  url: string;
  title: string;
  icon?: string;
  description: string;
};
type UploadResult = {
  url: string;
};
type EditBarProps = {
  value: AppItem;
  onChange: (next: AppItem) => void;
  onDelete: () => void;
};
export default function EditBar(props: EditBarProps) {
  const { value, onChange, onDelete } = props;
  const inputRef = useRef<HTMLInputElement>(null);
  const openFileDialog = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const OnChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const fd = new FormData();
    fd.append("file", file);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: fd,
    });

    if (!res.ok) {
      throw new Error(await res.text());
    }

    const result = (await res.json()) as UploadResult;
    onChange({ ...value, icon: APP_BASE_PATH + result.url });

    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div className="flex flex-col w-full h-full">
      <div className="flex flex-row items-center justify-between w-full/95 h-16 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-black dark:text-white p-4 mt-0 m-4">
        <div className="flex flex-row gap-4 items-center">
          <div>タイトル：</div>
          <input
            type="text"
            className="border rounded px-2 py-1 text-black dark:text-white bg-zinc-200/50 dark:bg-zinc-700/30"
            value={value.title}
            onChange={(e) => onChange({ ...value, title: e.target.value })}
          />
          <div>説明：</div>
          <textarea
            name="description"
            className="border rounded px-2 py-1 text-black dark:text-white bg-zinc-200/50 dark:bg-zinc-700/30"
            value={value.description}
            onChange={(e) =>
              onChange({ ...value, description: e.target.value })
            }
          />
          <div>リンク：</div>
          <input
            type="text"
            className="border rounded px-2 py-1 text-black dark:text-white bg-zinc-200/50 dark:bg-zinc-700/30"
            value={value.url}
            onChange={(e) => onChange({ ...value, url: e.target.value })}
          />
          <div>アイコン：</div>
          <input
            type="file"
            accept="image/*,.ico"
            hidden
            ref={inputRef}
            onChange={OnChange}
          />
          <img src={APP_BASE_PATH + (value.icon || "/logo.png")} alt="" className="w-10 h-10" />
          <Button title="アイコンを選択" onClick={openFileDialog} />
        </div>
        <div>
          <Button title="削除" onClick={onDelete} />
        </div>
        <div></div>
      </div>
    </div>
  );
}
