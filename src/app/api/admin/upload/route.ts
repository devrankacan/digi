import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { getSettings, saveSettings } from "@/lib/settings";

const AUTH_TOKEN = "Bearer dijiturkadmin";

export async function POST(req: NextRequest) {
  const auth = req.headers.get("authorization");
  if (auth !== AUTH_TOKEN) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await req.formData();
  const file = formData.get("file") as File;

  if (!file) {
    return NextResponse.json({ error: "Dosya bulunamadı" }, { status: 400 });
  }

  const type = (formData.get("type") as string) || "logo";
  const ext = file.name.split(".").pop() || "png";
  const filename = type === "favicon" ? "favicon.png" : `${type}.${ext}`;
  const uploadsDir = path.join(process.cwd(), "public/uploads");

  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  fs.writeFileSync(path.join(uploadsDir, filename), buffer);

  const url = `/uploads/${filename}`;
  const settings = getSettings();
  if (type === "hero") {
    (settings as Record<string, unknown>).heroImage = url;
  } else if (type === "favicon") {
    (settings as Record<string, unknown>).faviconUrl = url;
  } else {
    settings.logo = url;
  }
  saveSettings(settings);

  return NextResponse.json({ success: true, url, logo: type === "logo" ? url : settings.logo });
}
