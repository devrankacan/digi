import { getSettings } from "@/lib/settings";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default function HakkimizdaPage() {
  const settings = getSettings();
  const about = settings.about;
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
            {contact.whatsappDisplay && <span>📞 {phoneDisplay}</span>}
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
              <Link href="/hakkimizda" className="nav-a" style={{ color: "#fff" }}>Hakkımızda</Link>
              <Link href="/iletisim" className="nav-a">İletişim</Link>
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
          <h1 style={{ fontSize: "32px", fontWeight: 900, marginBottom: "8px", color: "#fff" }}>{about.title}</h1>
          <div style={{ width: "60px", height: "4px", background: "linear-gradient(90deg, #6b21a8, #c026d3)", borderRadius: "2px", marginBottom: "32px" }} />

          {about.content && (
            <div style={{ background: "#241e63", borderRadius: "12px", padding: "28px", marginBottom: "24px", border: "1px solid rgba(255,255,255,0.08)", lineHeight: 1.8, fontSize: "15px", color: "rgba(255,255,255,0.85)" }}>
              {about.content}
            </div>
          )}

          {(about.address || about.phone || about.email) && (
            <div style={{ background: "#241e63", borderRadius: "12px", padding: "28px", border: "1px solid rgba(255,255,255,0.08)", display: "flex", flexWrap: "wrap", gap: "24px" }}>
              {about.address && (
                <div style={{ flex: "1 1 200px" }}>
                  <div style={{ fontSize: "11px", fontWeight: 700, color: "rgba(255,255,255,0.5)", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "6px" }}>Adres</div>
                  <div style={{ fontSize: "14px" }}>{about.address}</div>
                </div>
              )}
              {about.phone && (
                <div style={{ flex: "1 1 150px" }}>
                  <div style={{ fontSize: "11px", fontWeight: 700, color: "rgba(255,255,255,0.5)", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "6px" }}>Telefon</div>
                  <div style={{ fontSize: "14px" }}>{about.phone}</div>
                </div>
              )}
              {about.email && (
                <div style={{ flex: "1 1 150px" }}>
                  <div style={{ fontSize: "11px", fontWeight: 700, color: "rgba(255,255,255,0.5)", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "6px" }}>E-posta</div>
                  <div style={{ fontSize: "14px" }}>{about.email}</div>
                </div>
              )}
            </div>
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
