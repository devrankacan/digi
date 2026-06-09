import { NextRequest, NextResponse } from "next/server";
import { getSettings, saveSettings } from "@/lib/settings";

const AUTH_TOKEN = "Bearer dijiturkadmin";

export async function GET(req: NextRequest) {
  const auth = req.headers.get("authorization");
  if (auth !== AUTH_TOKEN) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const settings = getSettings();
  return NextResponse.json(settings);
}

export async function POST(req: NextRequest) {
  const auth = req.headers.get("authorization");
  if (auth !== AUTH_TOKEN) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = await req.json();
  saveSettings(body);
  return NextResponse.json({ success: true });
}
