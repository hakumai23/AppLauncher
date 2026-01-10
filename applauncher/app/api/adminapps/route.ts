import { NextResponse } from "next/server";
import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";
export const runtime = "nodejs";

type AppItem = {
  url: string;
  title: string;
  icon?: string;
  description: string;
};

const appsFilePath = () => path.join(process.cwd(), "app", "data", "adminapps.json");

const isAppItem = (value: unknown): value is AppItem => {
  if (!value || typeof value !== "object") return false;
  const v = value as Record<string, unknown>;
  if (typeof v.url !== "string") return false;
  if (typeof v.title !== "string") return false;
  if (typeof v.description !== "string") return false;
  if ("icon" in v && typeof v.icon !== "string" && typeof v.icon !== "undefined") return false;
  return true;
};

export async function GET() {
  try {
    const json = await readFile(appsFilePath(), "utf-8");
    const data = JSON.parse(json);
    if (!Array.isArray(data)) {
      return NextResponse.json({ error: "Invalid apps.json" }, { status: 500 });
    }
    return NextResponse.json(data);
  } catch {
    return NextResponse.json([]);
  }
}

export async function POST(req: Request) {
  const contentType = req.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) {
    return NextResponse.json({ error: "application/json only" }, { status: 415 });
  }

  const payload = await req.json();
  if (!Array.isArray(payload) || !payload.every(isAppItem)) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const dir = path.join(process.cwd(), "app", "data");
  await mkdir(dir, { recursive: true });
  await writeFile(appsFilePath(), JSON.stringify(payload, null, 2) + "\n", "utf-8");

  return NextResponse.json({ message: "saved" });
}