import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { promises as fs } from "node:fs";
import path from "node:path";

import { authOptions } from "../../../auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Dataset = "adminapps" | "apps" | "config";

type RouteContext = {
  params: Promise<{
    dataset: string;
  }>;
};

function getDatasetSpec(dataset: Dataset) {
  const basePath = path.join(process.cwd(), "app", "data");

  switch (dataset) {
    case "adminapps":
      return {
        filePath: path.join(basePath, "adminapps.json"),
        validateBody: (body: unknown) => Array.isArray(body),
        invalidMessage: "Body must be an array",
      };
    case "apps":
      return {
        filePath: path.join(basePath, "apps.json"),
        validateBody: (body: unknown) => Array.isArray(body),
        invalidMessage: "Body must be an array",
      };
    case "config":
      return {
        filePath: path.join(basePath, "config.json"),
        validateBody: (body: unknown) =>
          typeof body === "object" && body !== null && !Array.isArray(body),
        invalidMessage: "Body must be an object",
      };
  }
}

function isAllowedDataset(dataset: string): dataset is Dataset {
  return dataset === "adminapps" || dataset === "apps" || dataset === "config";
}

async function readJsonFile(filePath: string): Promise<unknown> {
  const raw = await fs.readFile(filePath, "utf8");
  return JSON.parse(raw);
}

async function writeJsonFileAtomic(filePath: string, data: unknown) {
  const dir = path.dirname(filePath);
  await fs.mkdir(dir, { recursive: true });

  const base = path.basename(filePath);
  const tmpPath = path.join(dir, `.${base}.tmp`);

  const json = JSON.stringify(data, null, 2) + "\n";
  await fs.writeFile(tmpPath, json, "utf8");
  await fs.rename(tmpPath, filePath);
}

export async function GET(_req: Request, ctx: RouteContext) {
  const { dataset } = await ctx.params;
  if (!isAllowedDataset(dataset)) {
    return NextResponse.json({ message: "Not Found" }, { status: 404 });
  }

  try {
    const { filePath } = getDatasetSpec(dataset);
    const data = await readJsonFile(filePath);

    return NextResponse.json(data, {
      status: 200,
      headers: {
        "Cache-Control": "no-store",
      },
    });
  } catch {
    return NextResponse.json(
      { message: `Failed to read ${dataset}.json` },
      { status: 500 },
    );
  }
}

export async function PUT(req: Request, ctx: RouteContext) {
  const { dataset } = await ctx.params;
  if (!isAllowedDataset(dataset)) {
    return NextResponse.json({ message: "Not Found" }, { status: 404 });
  }

  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = (await req.json()) as unknown;

    const spec = getDatasetSpec(dataset);
    if (!spec.validateBody(body)) {
      return NextResponse.json({ message: spec.invalidMessage }, { status: 400 });
    }

    await writeJsonFileAtomic(spec.filePath, body);
    return NextResponse.json({ ok: true }, { status: 200 });
  } catch {
    return NextResponse.json(
      { message: `Failed to write ${dataset}.json` },
      { status: 500 },
    );
  }
}
