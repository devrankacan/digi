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

  const ext = file.name.split(".").pop() || "png";
  const filename = `logo.${ext}`;
  const uploadsDir = path.join(process.cwd(), "public/uploads");

  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  fs.writeFileSync(path.join(uploadsDir, filename), buffer);

  const logoUrl = `/uploads/${filename}`;
  const settings = getSettings();
  settings.logo = logoUrl;
  saveSettings(settings);

  return NextResponse.json({ success: true, logo: logoUrl });
}
