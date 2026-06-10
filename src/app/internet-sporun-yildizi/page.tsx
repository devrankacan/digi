import { getSettings } from "@/lib/settings";
import PackagePage from "@/app/components/PackagePage";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

function slugify(str: string) {
  return str
    .replace(/İ/g, "i").replace(/I/g, "i").replace(/ı/g, "i")
    .replace(/Ş/g, "s").replace(/ş/g, "s")
    .replace(/Ğ/g, "g").replace(/ğ/g, "g")
    .replace(/Ü/g, "u").replace(/ü/g, "u")
    .replace(/Ö/g, "o").replace(/ö/g, "o")
    .replace(/Ç/g, "c").replace(/ç/g, "c")
    .toLowerCase();
}

export default function InternetSporunYildizi() {
  const settings = getSettings();
  const pkg = settings.packages.find((p: { label: string }) => {
    const s = slugify(p.label);
    return s.includes("internet") && s.includes("sporun yildizi");
  });
  if (!pkg) notFound();
  return (
    <PackagePage
      pkg={pkg}
      allPackages={settings.packages}
      contact={settings.contact}
      logo={settings.logo}
      logoText={settings.logoText}
    />
  );
}
