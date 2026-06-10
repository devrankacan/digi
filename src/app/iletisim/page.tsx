import { getSettings } from "@/lib/settings";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default function IletisimPage() {
  const settings = getSettings();
  const cp = settings.contactPage;
  const contact = settings.contact;
  const phoneDisplay = (contact as Record<string, unknown>).phone as string || contact.whatsappDisplay || "";

  return (
    <div style={{ minHeight: "100vh", background: "#1a1440", fontFamily: "'Segoe UI', Arial, sans-serif", color: "#fff", display: "flex", flexDirection: "column" }}>

      <style>{`
        * { box-sizing: border-box; }
        .top-bar { display: none; }
        @media (min-width: 768px) { .top-bar { display: flex !important; } }
        .desktop-nav { display: none !important; }
        @media (min-width: 900px) { .desktop-nav { display: flex !important; } }
        .nav-a { color: rgba(255,255,255,0.85); text-decoration: none; font-size: 13px; font-weight: 600; }
        .nav-a:hover { color: #fff; }
      `}</style>

      {/* HEADER */}
      <div style={{ background: "#111827", position: "sticky", top: 0, zIndex: 100 }}>
        <div className="top-bar" style={{ justifyContent: "space-between", alignItems: "center", padding: "6px 20px", fontSize: "12px", color: "rgba(255,255,255,0.6)", maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ display: "flex", gap: "20px" }}>
            {phoneDisplay && <span>📞 {phoneDisplay}</span>}
          </div>
          <span>Dijitürk Resmi Satış Ortağıdır</span>
        </div>
        <div style={{ maxWidth: "1160px", margin: "0 auto", padding: "4px 16px 0", transform: "translateY(15%)" }}>
          <div style={{ background: "linear-gradient(90deg, #3b0764 0%, #6b21a8 40%, #a21caf 75%, #c026d3 100%)", borderRadius: "16px", padding: "0 24px", display: "flex", alignItems: "center", height: "80px", gap: "24px", boxShadow: "0 4px 24px rgba(0,0,0,0.4)" }}>
            <Link href="/" style={{ flexShrink: 0, textDecoration: "none" }}>
              {settings.logo
                ? <img src={settings.logo} alt={settings.logoText} style={{ maxHeight: "46px", maxWidth: "150px", objectFit: "contain" }} />
                : <span style={{ fontSize: "28px", fontWeight: 900, fontStyle: "italic", color: "#e41738", fontFamily: "'Arial Black', Impact, sans-serif" }}>{settings.logoText}</span>}
            </Link>
            <nav className="desktop-nav" style={{ gap: "18px", alignItems: "center", flex: 1 }}>
              <Link href="/" className="nav-a">Ana Sayfa</Link>
              <Link href="/hakkimizda" className="nav-a">Hakkımızda</Link>
              <Link href="/iletisim" className="nav-a" style={{ color: "#fff" }}>İletişim</Link>
            </nav>
            <Link href="/" style={{ background: "transparent", color: "#fff", border: "2px solid rgba(255,255,255,0.5)", padding: "9px 24px", borderRadius: "9999px", fontWeight: 700, fontSize: "14px", textDecoration: "none", whiteSpace: "nowrap", flexShrink: 0 }}>
              Ana Sayfa
            </Link>
          </div>
        </div>
      </div>

      {/* MAIN */}
      <main style={{ flex: 1, paddingTop: "60px", paddingBottom: "60px" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto", padding: "0 20px" }}>
          <h1 style={{ fontSize: "32px", fontWeight: 900, marginBottom: "8px", color: "#fff" }}>{cp.title}</h1>
          <div style={{ width: "60px", height: "4px", background: "linear-gradient(90deg, #6b21a8, #c026d3)", borderRadius: "2px", marginBottom: "32px" }} />

          {cp.description && (
            <p style={{ fontSize: "15px", color: "rgba(255,255,255,0.75)", marginBottom: "28px", lineHeight: 1.7 }}>{cp.description}</p>
          )}

          <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", marginBottom: "28px" }}>
            {[
              { label: "Adres", value: cp.address, icon: "📍" },
              { label: "Telefon", value: cp.phone, icon: "📞" },
              { label: "E-posta", value: cp.email, icon: "✉️" },
              { label: "Çalışma Saatleri", value: cp.workingHours, icon: "🕐" },
            ].filter(i => i.value).map(item => (
              <div key={item.label} style={{ flex: "1 1 200px", background: "#241e63", borderRadius: "12px", padding: "20px 22px", border: "1px solid rgba(255,255,255,0.08)" }}>
                <div style={{ fontSize: "22px", marginBottom: "8px" }}>{item.icon}</div>
                <div style={{ fontSize: "11px", fontWeight: 700, color: "rgba(255,255,255,0.5)", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "5px" }}>{item.label}</div>
                <div style={{ fontSize: "14px", fontWeight: 600 }}>{item.value}</div>
              </div>
            ))}
          </div>

          {contact.whatsapp && (
            <a href={`https://wa.me/${contact.whatsapp}`} target="_blank" rel="noopener noreferrer"
              style={{ display: "flex", alignItems: "center", gap: "16px", background: "#25d366", borderRadius: "12px", padding: "16px 24px", textDecoration: "none", boxShadow: "0 4px 16px rgba(37,211,102,0.3)" }}>
              <svg width="32" height="32" fill="white" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.126 1.532 5.858L.054 23.617a.5.5 0 0 0 .609.61l5.88-1.485A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.891 0-3.667-.502-5.2-1.378l-.373-.213-3.865.977.997-3.76-.232-.388A9.96 9.96 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
              </svg>
              <div>
                <div style={{ color: "#fff", fontWeight: 800, fontSize: "14px" }}>WhatsApp Destek Hattı</div>
                <div style={{ color: "#fff", fontWeight: 900, fontSize: "18px" }}>{contact.whatsappDisplay}</div>
              </div>
            </a>
          )}
        </div>
      </main>

      {/* FOOTER */}
      <footer style={{ background: "linear-gradient(135deg, #1a1440 0%, #3b1a6e 100%)", padding: "20px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", display: "flex", flexWrap: "wrap", gap: "16px", alignItems: "center", justifyContent: "space-between" }}>
          <Link href="/" style={{ textDecoration: "none" }}>
            {settings.logo
              ? <img src={settings.logo} alt={settings.logoText} style={{ maxHeight: "36px", objectFit: "contain", filter: "brightness(0) invert(1)" }} />
              : <span style={{ fontSize: "20px", fontWeight: 900, fontStyle: "italic", color: "#fff", fontFamily: "'Arial Black', Impact, sans-serif" }}>{settings.logoText}</span>}
          </Link>
          <div style={{ display: "flex", gap: "20px" }}>
            <Link href="/" style={{ color: "rgba(255,255,255,0.7)", fontSize: "13px", textDecoration: "none" }}>Ana Sayfa</Link>
            <Link href="/hakkimizda" style={{ color: "rgba(255,255,255,0.7)", fontSize: "13px", textDecoration: "none" }}>Hakkımızda</Link>
            <Link href="/iletisim" style={{ color: "rgba(255,255,255,0.7)", fontSize: "13px", textDecoration: "none" }}>İletişim</Link>
          </div>
          <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "12px", margin: 0 }}>{contact.footerText || `© 2026 ${settings.logoText}`}</p>
        </div>
      </footer>
    </div>
  );
}
