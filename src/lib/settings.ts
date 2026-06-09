import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "src/data/settings.json");
const submissionsPath = path.join(process.cwd(), "src/data/submissions.json");

export function getSettings() {
  const raw = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(raw);
}

export function saveSettings(data: unknown) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
}

export interface Submission {
  id: string;
  date: string;
  name: string;
  phone: string;
  email: string;
  city: string;
  package: string;
  message: string;
}

export function getSubmissions(): Submission[] {
  if (!fs.existsSync(submissionsPath)) return [];
  return JSON.parse(fs.readFileSync(submissionsPath, "utf-8"));
}

export function addSubmission(data: Omit<Submission, "id" | "date">) {
  const submissions = getSubmissions();
  submissions.unshift({
    ...data,
    id: Date.now().toString(),
    date: new Date().toLocaleString("tr-TR", { timeZone: "Europe/Istanbul" }),
  });
  fs.writeFileSync(submissionsPath, JSON.stringify(submissions, null, 2), "utf-8");
}
