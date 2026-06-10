import { getSettings } from "@/lib/settings";
import PackagePage from "@/app/components/PackagePage";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export default function SporunYildizi() {
  const settings = getSettings();
  const pkg = settings.packages.find((p: { label: string }) =>
    p.label.toLowerCase().includes("sporun yıldızı") || p.label.toLowerCase().includes("sporun yildizi")
  );
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
