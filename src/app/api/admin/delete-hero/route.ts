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

  const uploadsDir = path.join(process.cwd(), "public/uploads");
  ["hero.png", "hero.jpg", "hero.jpeg", "hero.webm", "hero.gif"].forEach((f) => {
    const fp = path.join(uploadsDir, f);
    if (fs.existsSync(fp)) fs.unlinkSync(fp);
  });

  const settings = getSettings();
  (settings as Record<string, unknown>).heroImage = null;
  saveSettings(settings);

  return NextResponse.json({ success: true });
}
