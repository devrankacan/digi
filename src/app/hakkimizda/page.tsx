import { getSettings } from "@/lib/settings";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default function HakkimizdaPage() {
  const settings = getSettings();
  const about = settings.about;
  const contact = settings.contact;

  return (
    <div
      className="min-h-screen flex flex-col relative overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #4e0652 0%, #621e65 45%, #451f46 75%, #400442 100%)",
      }}
    >
      {/* Yatay renk bölgesi */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 0,
          background: "linear-gradient(90deg, #400442 0%, #400442 5%, #5a1560 5%, #621e65 50%, #5a1560 95%, #400442 95%, #400442 100%)",
        }}
      />

      {/* Dekoratif dikey çizgiler - sol */}
      <div className="absolute top-0 bottom-0 pointer-events-none" style={{ left: "22px", zIndex: 1, display: "flex", gap: "5px" }}>
        <div style={{ width: "2px", height: "100%", background: "linear-gradient(180deg, transparent 0%, rgba(255,255,255,0.22) 15%, rgba(255,255,255,0.18) 85%, transparent 100%)" }} />
        <div style={{ width: "2px", height: "100%", background: "linear-gradient(180deg, transparent 0%, rgba(255,255,255,0.10) 15%, rgba(255,255,255,0.08) 85%, transparent 100%)" }} />
      </div>
      {/* Dekoratif dikey çizgiler - sağ */}
      <div className="absolute top-0 bottom-0 pointer-events-none" style={{ right: "22px", zIndex: 1, display: "flex", gap: "5px" }}>
        <div style={{ width: "2px", height: "100%", background: "linear-gradient(180deg, transparent 0%, rgba(255,255,255,0.10) 15%, rgba(255,255,255,0.08) 85%, transparent 100%)" }} />
        <div style={{ width: "2px", height: "100%", background: "linear-gradient(180deg, transparent 0%, rgba(255,255,255,0.22) 15%, rgba(255,255,255,0.18) 85%, transparent 100%)" }} />
      </div>

      {/* Nav */}
      <nav className="relative" style={{ background: "rgba(0,0,0,0.25)", zIndex: 2 }}>
        <div className="max-w-lg mx-auto px-4 flex justify-center gap-10 py-3">
          <Link href="/" className="text-white text-sm font-semibold tracking-wide hover:text-yellow-300 transition-colors">Anasayfa</Link>
          <Link href="/hakkimizda" className="text-white text-sm font-semibold tracking-wide hover:text-yellow-300 transition-colors">Hakkımızda</Link>
          <Link href="/iletisim" className="text-white text-sm font-semibold tracking-wide hover:text-yellow-300 transition-colors">İletişim</Link>
        </div>
      </nav>

      {/* Main */}
      <main className="flex-1 flex flex-col items-center px-8 pt-10 pb-10 relative" style={{ zIndex: 2 }}>
        <div className="w-full max-w-xs">

          {/* Logo */}
          <div className="text-center mb-6">
            {settings.logo ? (
              <img src={settings.logo} alt={settings.logoText} className="mx-auto max-h-16 object-contain" />
            ) : (
              <span
                className="text-5xl font-black italic text-white"
                style={{ fontFamily: "'Arial Black', 'Impact', sans-serif" }}
              >
                {settings.logoText}
              </span>
            )}
          </div>

          {/* Title */}
          <h1
            className="text-white text-center font-black tracking-widest mb-6 uppercase"
            style={{ fontSize: "17px", letterSpacing: "0.15em", textShadow: "0 1px 6px rgba(0,0,0,0.3)" }}
          >
            {about.title}
          </h1>

          {/* Content */}
          <div
            className="rounded-2xl p-5 mb-5"
            style={{ background: "rgba(255,255,255,0.08)", border: "1.5px solid rgba(255,255,255,0.15)" }}
          >
            <p className="text-white/90 text-sm leading-relaxed">{about.content}</p>
          </div>

          {/* Info */}
          <div
            className="rounded-2xl p-5 space-y-3"
            style={{ background: "rgba(255,255,255,0.08)", border: "1.5px solid rgba(255,255,255,0.15)" }}
          >
            {about.address && (
              <div>
                <span className="text-white/60 text-xs font-semibold uppercase tracking-wider">Adres</span>
                <p className="text-white text-sm mt-0.5">{about.address}</p>
              </div>
            )}
            {about.phone && (
              <div>
                <span className="text-white/60 text-xs font-semibold uppercase tracking-wider">Telefon</span>
                <p className="text-white text-sm mt-0.5">{about.phone}</p>
              </div>
            )}
            {about.email && (
              <div>
                <span className="text-white/60 text-xs font-semibold uppercase tracking-wider">E-posta</span>
                <p className="text-white text-sm mt-0.5">{about.email}</p>
              </div>
            )}
          </div>

          {/* Back link */}
          <div className="text-center mt-6">
            <Link
              href="/"
              className="text-white/70 text-sm font-semibold hover:text-yellow-300 transition-colors underline underline-offset-2"
            >
              ← Anasayfa
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer
        className="text-white/55 text-center text-xs py-4"
        style={{ background: "rgba(0,0,0,0.3)", position: "relative", zIndex: 2 }}
      >
        {contact.footerText}
      </footer>
    </div>
  );
}
