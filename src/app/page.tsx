import { getSettings } from "@/lib/settings";
import ContactForm from "./components/ContactForm";

export const dynamic = "force-dynamic";

export default function Home() {
  const settings = getSettings();
  return (
    <ContactForm
      packages={settings.packages}
      contact={settings.contact}
      logo={settings.logo}
      logoText={settings.logoText}
      heroImage={(settings as Record<string, unknown>).heroImage as string | null}
      campaignBannerImage={(settings as Record<string, unknown>).campaignBannerImage as string | null}
    />
  );
}
