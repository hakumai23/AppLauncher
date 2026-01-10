import { NextResponse} from "next/server";  
import {mkdir,writeFile} from "fs/promises";
import path from "path";
import crypto from "crypto";
export const runtime = "nodejs";
const extFromMime = (mime: string) => {
  if (mime === "image/png") return ".png";
  if (mime === "image/jpeg") return ".jpg";
  if (mime === "image/webp") return ".webp";
  if (mime === "image/svg+xml") return ".svg";
  if (mime === "image/x-icon") return ".ico";
  return "";
};
export async function POST(req: Request) {
  const form = await req.formData();
  const file = form.get("file");
  if (!file || !(file instanceof File)) {
    return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
  }
    if (!file.type.startsWith("image/")) {
    return NextResponse.json({ error: "image only" }, { status: 400 });
  }

  const ext = extFromMime(file.type);
  if (!ext) {
    return NextResponse.json({ error: "unsupported type" }, { status: 400 });
  }

  const maxBytes = 2 * 1024 * 1024;
  if (file.size > maxBytes) {
    return NextResponse.json({ error: "too large" }, { status: 413 });
  }
    const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const dir = path.join(process.cwd(), "public", "uploads");
  await mkdir(dir, { recursive: true });

  const filename = `${crypto.randomUUID()}${ext}`;
  await writeFile(path.join(dir, filename), buffer);

  return NextResponse.json({ url: `/uploads/${filename}` });
}