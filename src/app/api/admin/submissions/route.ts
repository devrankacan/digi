import { NextRequest, NextResponse } from "next/server";
import { getSubmissions } from "@/lib/settings";

const AUTH_TOKEN = "Bearer dijiturkadmin";

export async function GET(req: NextRequest) {
  if (req.headers.get("authorization") !== AUTH_TOKEN)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  return NextResponse.json(getSubmissions());
}
