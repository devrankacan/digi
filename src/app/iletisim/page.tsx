import { getSettings } from "@/lib/settings";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default function IletisimPage() {
  const settings = getSettings();
  const cp = settings.contactPage;
  const contact = settings.contact;

  return (
    <div
      className="min-h-screen flex flex-col relative overflow-hidden"
      style={{ background: "linear-gradient(180deg, #4e0652 0%, #621e65 45%, #451f46 75%, #400442 100%)" }}
    >
      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 0, background: "linear-gradient(90deg, #400442 0%, #400442 5%, #5a1560 5%, #621e65 50%, #5a1560 95%, #400442 95%, #400442 100%)" }} />
      <div className="absolute top-0 bottom-0 pointer-events-none" style={{ left: "22px", zIndex: 1, display: "flex", gap: "5px" }}>
        <div style={{ width: "2px", height: "100%", background: "linear-gradient(180deg, transparent 0%, rgba(255,255,255,0.22) 15%, rgba(255,255,255,0.18) 85%, transparent 100%)" }} />
        <div style={{ width: "2px", height: "100%", background: "linear-gradient(180deg, transparent 0%, rgba(255,255,255,0.10) 15%, rgba(255,255,255,0.08) 85%, transparent 100%)" }} />
      </div>
      <div className="absolute top-0 bottom-0 pointer-events-none" style={{ right: "22px", zIndex: 1, display: "flex", gap: "5px" }}>
        <div style={{ width: "2px", height: "100%", background: "linear-gradient(180deg, transparent 0%, rgba(255,255,255,0.10) 15%, rgba(255,255,255,0.08) 85%, transparent 100%)" }} />
        <div style={{ width: "2px", height: "100%", background: "linear-gradient(180deg, transparent 0%, rgba(255,255,255,0.22) 15%, rgba(255,255,255,0.18) 85%, transparent 100%)" }} />
      </div>

      <nav className="relative" style={{ background: "rgba(0,0,0,0.25)", zIndex: 2 }}>
        <div className="max-w-lg mx-auto px-4 flex justify-center gap-10 py-3">
          <Link href="/" className="text-white text-sm font-semibold tracking-wide hover:text-yellow-300 transition-colors">Anasayfa</Link>
          <Link href="/hakkimizda" className="text-white text-sm font-semibold tracking-wide hover:text-yellow-300 transition-colors">Hakkımızda</Link>
          <Link href="/iletisim" className="text-white text-sm font-semibold tracking-wide hover:text-yellow-300 transition-colors">İletişim</Link>
        </div>
      </nav>

      <main className="flex-1 flex flex-col items-center px-8 pt-10 pb-10 relative" style={{ zIndex: 2 }}>
        <div className="w-full max-w-xs">

          {/* Logo */}
          <div className="text-center mb-6">
            {settings.logo ? (
              <img src={settings.logo} alt={settings.logoText} className="mx-auto max-h-16 object-contain" />
            ) : (
              <span className="text-5xl font-black italic text-white" style={{ fontFamily: "'Arial Black', 'Impact', sans-serif" }}>
                {settings.logoText}
              </span>
            )}
          </div>

          <h1 className="text-white text-center font-black tracking-widest mb-3 uppercase" style={{ fontSize: "17px", letterSpacing: "0.15em" }}>
            {cp.title}
          </h1>
          {cp.description && (
            <p className="text-white/70 text-sm text-center mb-6">{cp.description}</p>
          )}

          {/* Bilgi kartları */}
          <div className="rounded-2xl p-5 space-y-4 mb-5" style={{ background: "rgba(255,255,255,0.08)", border: "1.5px solid rgba(255,255,255,0.15)" }}>
            {[
              { label: "Adres", value: cp.address },
              { label: "Telefon", value: cp.phone },
              { label: "E-posta", value: cp.email },
              { label: "Çalışma Saatleri", value: cp.workingHours },
            ].filter(i => i.value).map((item) => (
              <div key={item.label}>
                <span className="text-white/60 text-xs font-semibold uppercase tracking-wider">{item.label}</span>
                <p className="text-white text-sm mt-0.5 font-semibold">{item.value}</p>
              </div>
            ))}
          </div>

          {/* WhatsApp */}
          <a
            href={`https://wa.me/${contact.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center mb-6 overflow-hidden transition-all active:scale-95"
            style={{ background: "#4caf6e", borderRadius: "14px", boxShadow: "0 4px 18px rgba(0,0,0,0.3)" }}
          >
            <div className="flex items-center justify-center flex-shrink-0" style={{ width: "56px", height: "56px", background: "#3a9e58", borderRadius: "14px" }}>
              <svg width="32" height="32" fill="white" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.126 1.532 5.858L.054 23.617a.5.5 0 0 0 .609.61l5.88-1.485A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.891 0-3.667-.502-5.2-1.378l-.373-.213-3.865.977.997-3.76-.232-.388A9.96 9.96 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
              </svg>
            </div>
            <div className="flex-1 px-4">
              <div className="text-white font-black italic text-sm leading-tight">WhatsApp Hattı</div>
              <div className="text-white font-black italic text-base leading-tight">{contact.whatsappDisplay}</div>
            </div>
          </a>

          <div className="text-center">
            <Link href="/" className="text-white/70 text-sm font-semibold hover:text-yellow-300 transition-colors underline underline-offset-2">
              ← Anasayfa
            </Link>
          </div>
        </div>
      </main>

      <footer className="text-white/55 text-center text-xs py-4" style={{ background: "rgba(0,0,0,0.3)", position: "relative", zIndex: 2 }}>
        {contact.footerText}
      </footer>
    </div>
  );
}
