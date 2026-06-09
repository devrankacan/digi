import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "src/data/settings.json");

export function getSettings() {
  const raw = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(raw);
}

export function saveSettings(data: unknown) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
}
