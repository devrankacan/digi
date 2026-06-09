import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "src/data/settings.json");
const submissionsPath = path.join(process.cwd(), "src/data/submissions.json");

const defaultSettings = {
  logo: null,
  logoText: "dijitürk",
  contact: { whatsapp: "", whatsappDisplay: "", navLinks: [], footerText: "" },
  packages: [],
  about: { title: "Hakkımızda", content: "", address: "", email: "", phone: "" },
  contactPage: { title: "İletişim", description: "", address: "", email: "", phone: "", workingHours: "" },
};

export function getSettings() {
  const raw = fs.readFileSync(filePath, "utf-8");
  const data = JSON.parse(raw);
  return {
    ...defaultSettings,
    ...data,
    about: { ...defaultSettings.about, ...data.about },
    contactPage: { ...defaultSettings.contactPage, ...data.contactPage },
  };
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
