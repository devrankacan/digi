import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import { getSettings } from "@/lib/settings";

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800", "900"],
  variable: "--font-nunito",
});

export const metadata: Metadata = {
  title: "Digitürk — Kampanya Başvurusu",
  description: "İlk 3 ay %50 indirimli Digitürk paketleri için hemen başvurun.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = getSettings();
  const faviconUrl = (settings as Record<string, unknown>).faviconUrl as string | null;
  return (
    <html lang="tr" className={`${nunito.variable} h-full antialiased`}>
      <head>
        {faviconUrl && <link rel="icon" href={faviconUrl} />}
      </head>
      <body className="min-h-full flex flex-col font-[family-name:var(--font-nunito)]">{children}</body>
    </html>
  );
}
