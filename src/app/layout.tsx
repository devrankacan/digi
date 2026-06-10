import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";

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
  return (
    <html lang="tr" className={`${nunito.variable} h-full antialiased`}>
      <head>
        <link rel="icon" href="/uploads/favicon.png" />
      </head>
      <body className="min-h-full flex flex-col font-[family-name:var(--font-nunito)]">{children}</body>
    </html>
  );
}
