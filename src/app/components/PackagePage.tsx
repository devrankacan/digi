"use client";

import { useState } from "react";

interface Package {
  id: string;
  label: string;
  desc: string;
  price: string;
  image?: string;
}

interface Contact {
  whatsapp: string;
  whatsappDisplay: string;
  navLinks: string[];
  footerText: string;
  phone?: string;
  email?: string;
}

interface PackagePageProps {
  pkg: Package;
  allPackages: Package[];
  contact: Contact;
  logo: string | null;
  logoText: string;
}

const C = {
  pageBg: "#1a1440",
  cardBg: "#241e63",
  formBg: "#2d2470",
  accent: "#8d1d82",
  accentHover: "#6e1565",
  text: "#fff",
  textMuted: "rgba(255,255,255,0.65)",
};

function BaşvuruFormu({ packages, onSuccess }: { packages: Package[]; onSuccess: () => void }) {
  const [form, setForm] = useState({ ad: "", soyad: "", telefon: "", paket: packages[0]?.label || "", kvkk: false, sms: false });
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.ad || !form.soyad || !form.telefon || !form.kvkk) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: `${form.ad} ${form.soyad}`, phone: form.telefon, package: form.paket }),
      });
      if (res.ok) { onSuccess(); setStatus("idle"); }
      else setStatus("error");
    } catch { setStatus("error"); }
  };

  const inp: React.CSSProperties = { width: "100%", background: "#fff", border: "1px solid #ccc", borderRadius: "4px", padding: "9px 12px", fontSize: "14px", color: "#1a1440", marginBottom: "10px", outline: "none", boxSizing: "border-box" };

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ display: "flex", gap: "10px" }}>
        <input style={inp} placeholder="Ad *" value={form.ad} onChange={e => setForm(f => ({ ...f, ad: e.target.value }))} required />
        <input style={inp} placeholder="Soyad *" value={form.soyad} onChange={e => setForm(f => ({ ...f, soyad: e.target.value }))} required />
      </div>
      <input style={inp} placeholder="Telefon Numarası *" value={form.telefon} onChange={e => setForm(f => ({ ...f, telefon: e.target.value }))} required />
      {packages.length > 1 && (
        <select style={{ ...inp, cursor: "pointer" }} value={form.paket} onChange={e => setForm(f => ({ ...f, paket: e.target.value }))}>
          {packages.map(p => <option key={p.id} value={p.label}>{p.label}</option>)}
        </select>
      )}
      <div style={{ marginBottom: "10px" }}>
        <label style={{ display: "flex", alignItems: "flex-start", gap: "8px", cursor: "pointer", fontSize: "12px", color: C.textMuted, lineHeight: 1.5 }}>
          <input type="checkbox" checked={form.kvkk} onChange={e => setForm(f => ({ ...f, kvkk: e.target.checked }))} style={{ marginTop: "2px", flexShrink: 0 }} />
          <span>KVKK kapsamında kişisel verilerimin işlenmesine onay veriyorum. *</span>
        </label>
      </div>
      <div style={{ marginBottom: "14px" }}>
        <label style={{ display: "flex", alignItems: "flex-start", gap: "8px", cursor: "pointer", fontSize: "12px", color: C.textMuted }}>
          <input type="checkbox" checked={form.sms} onChange={e => setForm(f => ({ ...f, sms: e.target.checked }))} style={{ marginTop: "2px", flexShrink: 0 }} />
          <span>SMS ve e-posta ile bilgilendirme almak istiyorum.</span>
        </label>
      </div>
      {status === "error" && <p style={{ color: "#f87171", fontSize: "13px", marginBottom: "8px" }}>Bir hata oluştu, lütfen tekrar deneyin.</p>}
      <button type="submit" disabled={status === "loading"}
        style={{ width: "100%", background: C.accent, color: "#fff", border: "none", padding: "12px", borderRadius: "4px", fontSize: "15px", fontWeight: 700, cursor: "pointer", opacity: status === "loading" ? 0.7 : 1 }}>
        {status === "loading" ? "Gönderiliyor..." : "Gönder"}
      </button>
    </form>
  );
}

const navLinks = [
  { href: "/", label: "Ana Sayfa" },
  { href: "/sporun-yildizi", label: "Sporun Yıldızı" },
  { href: "/internet-sporun-yildizi", label: "İnternet+Sporun Yıldızı" },
  { href: "/hakkimizda", label: "Hakkımızda" },
  { href: "/iletisim", label: "İletişim" },
];

export default function PackagePage({ pkg, allPackages, contact, logo, logoText }: PackagePageProps) {
  const [showPopup, setShowPopup] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);
  const [popupSuccess, setPopupSuccess] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const phoneDisplay = contact.phone || contact.whatsappDisplay || "";

  return (
    <div style={{ minHeight: "100vh", background: C.pageBg, fontFamily: "'Segoe UI', Arial, sans-serif", color: C.text }}>
      <style>{`
        * { box-sizing: border-box; }
        .top-bar { display: none; }
        @media (min-width: 768px) { .top-bar { display: flex !important; } }
        .desktop-nav { display: none !important; }
        @media (min-width: 900px) { .desktop-nav { display: flex !important; } }
        .mobile-header-btns { display: flex !important; }
        @media (min-width: 900px) { .mobile-header-btns { display: none !important; } }
        .two-col { flex-direction: column; }
        @media (min-width: 900px) { .two-col { flex-direction: row !important; } }
        .form-col-width { width: 100%; }
        @media (min-width: 900px) { .form-col-width { width: 380px !important; } }
        .pkg-star::before { content: "★"; color: #c084fc; margin-right: 8px; }
        .nav-a { color: rgba(255,255,255,0.85); text-decoration: none; font-size: 13px; font-weight: 600; }
        .nav-a:hover { color: #fff; }
      `}</style>

      {/* HEADER */}
      <div style={{ background: "#111827", position: "sticky", top: 0, zIndex: 100 }}>
        <div className="top-bar" style={{ justifyContent: "space-between", alignItems: "center", padding: "6px 20px", fontSize: "12px", color: "rgba(255,255,255,0.6)", maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
            {contact.email && <span>✉ {contact.email}</span>}
            {phoneDisplay && <span>📞 {phoneDisplay}</span>}
          </div>
          <span>Dijitürk Resmi Satış Ortağıdır</span>
        </div>
        <div style={{ maxWidth: "1160px", margin: "0 auto", padding: "4px 16px 0", transform: "translateY(15%)" }}>
          <div style={{ background: "linear-gradient(90deg, #3b0764 0%, #6b21a8 40%, #a21caf 75%, #c026d3 100%)", borderRadius: "16px", padding: "0 24px", display: "flex", alignItems: "center", height: "80px", gap: "24px", boxShadow: "0 4px 24px rgba(0,0,0,0.4)" }}>
            <a href="/" style={{ flexShrink: 0, textDecoration: "none" }}>
              {logo
                ? <img src={logo} alt={logoText} style={{ maxHeight: "46px", maxWidth: "150px", objectFit: "contain" }} />
                : <span style={{ fontSize: "28px", fontWeight: 900, fontStyle: "italic", color: "#e41738", fontFamily: "'Arial Black', Impact, sans-serif", letterSpacing: "-1px" }}>{logoText}</span>}
            </a>

            <nav className="desktop-nav" style={{ gap: "18px", alignItems: "center", flex: 1 }}>
              {navLinks.map(l => <a key={l.href} href={l.href} className="nav-a">{l.label}</a>)}
            </nav>

            <button onClick={() => setShowPopup(true)}
              style={{ background: "#c026d3", color: "#fff", border: "2px solid rgba(255,255,255,0.5)", padding: "9px 24px", borderRadius: "9999px", fontWeight: 700, fontSize: "14px", cursor: "pointer", whiteSpace: "nowrap", flexShrink: 0, boxShadow: "0 2px 10px rgba(0,0,0,0.3)" }}
              onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = "#a21caf"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = "#c026d3"; }}>
              Başvuru Yap
            </button>

            {/* Mobile: hamburger */}
            <button className="mobile-header-btns" onClick={() => setDrawerOpen(true)}
              style={{ background: "rgba(255,255,255,0.15)", border: "none", borderRadius: "8px", padding: "8px", cursor: "pointer", flexShrink: 0, display: "flex", flexDirection: "column", gap: "5px", alignItems: "center", justifyContent: "center", width: "40px", height: "40px" }}>
              <span style={{ display: "block", width: "20px", height: "2px", background: "#fff", borderRadius: "2px" }} />
              <span style={{ display: "block", width: "20px", height: "2px", background: "#fff", borderRadius: "2px" }} />
              <span style={{ display: "block", width: "20px", height: "2px", background: "#fff", borderRadius: "2px" }} />
            </button>
          </div>
        </div>
      </div>

      {/* PAKET + FORM */}
      <main style={{ paddingTop: "60px", paddingBottom: "60px" }}>
        <section style={{ padding: "40px 20px" }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
            <div className="two-col" style={{ display: "flex", gap: "32px", alignItems: "flex-start" }}>

              {/* SOL: Paket kartı */}
              <div style={{ flex: 1, background: C.cardBg, borderRadius: "10px", overflow: "hidden", border: "1px solid rgba(255,255,255,0.08)" }}>
                {pkg.image && (
                  <img src={pkg.image} alt={pkg.label} style={{ width: "100%", maxHeight: "260px", objectFit: "cover", display: "block" }} />
                )}
                <div style={{ padding: "28px" }}>
                  <h1 style={{ margin: "0 0 16px", fontSize: "24px", fontWeight: 900, color: "#fff" }}>{pkg.label}</h1>
                  {pkg.desc && (
                    <ul style={{ margin: "0 0 18px", padding: 0, listStyle: "none" }}>
                      {pkg.desc.split("\n").map((line, i) =>
                        line.trim() ? (
                          <li key={i} className="pkg-star" style={{ marginBottom: "8px", fontSize: "14px", color: "rgba(255,255,255,0.85)" }}>
                            {line.trim()}
                          </li>
                        ) : null
                      )}
                    </ul>
                  )}
                  {pkg.price && (
                    <div style={{ marginBottom: "18px" }}>
                      <span style={{ fontSize: "38px", fontWeight: 900, color: "#c084fc" }}>{pkg.price}</span>
                    </div>
                  )}
                  <button onClick={() => setShowPopup(true)}
                    style={{ background: C.accent, color: "#fff", border: "none", padding: "10px 28px", borderRadius: "4px", fontWeight: 700, fontSize: "14px", cursor: "pointer" }}>
                    Başvuru Yap
                  </button>
                </div>
              </div>

              {/* SAĞ: Form */}
              <div className="form-col-width" style={{ flexShrink: 0, background: C.formBg, borderRadius: "10px", padding: "24px", border: "1px solid rgba(255,255,255,0.1)" }}>
                <h3 style={{ margin: "0 0 4px", fontSize: "18px", fontWeight: 900, color: "#fff" }}>Hemen Sizi Arayalım</h3>
                <p style={{ margin: "0 0 16px", fontSize: "13px", color: C.textMuted }}>Hemen üye ol! Sizde en cazip kampanyalardan faydalan!</p>
                {formSuccess ? (
                  <div style={{ textAlign: "center", padding: "28px 0" }}>
                    <div style={{ fontSize: "44px", marginBottom: "10px" }}>🎉</div>
                    <h3 style={{ color: "#fff", marginBottom: "8px" }}>Başvurunuz Alındı!</h3>
                    <p style={{ color: C.textMuted, fontSize: "13px", marginBottom: "14px" }}>Müşteri temsilcimiz en kısa sürede sizi arayacak.</p>
                    <button onClick={() => setFormSuccess(false)} style={{ color: "#c084fc", background: "none", border: "none", cursor: "pointer", textDecoration: "underline", fontSize: "13px" }}>Yeni başvuru yap</button>
                  </div>
                ) : (
                  <BaşvuruFormu packages={allPackages} onSuccess={() => setFormSuccess(true)} />
                )}
                {phoneDisplay && (
                  <div style={{ marginTop: "12px", background: "rgba(141,29,130,0.25)", borderRadius: "4px", padding: "11px", textAlign: "center", fontWeight: 700, color: "#fff", fontSize: "15px", border: "1px solid rgba(141,29,130,0.5)" }}>
                    HEMEN ARA : {phoneDisplay}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer style={{ background: "#0d0b2e", borderTop: "1px solid rgba(255,255,255,0.07)" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "36px 24px 24px", display: "flex", flexWrap: "wrap", gap: "32px", justifyContent: "space-between" }}>
          <div style={{ flex: "1 1 200px" }}>
            <a href="/" style={{ textDecoration: "none", display: "inline-block", marginBottom: "12px" }}>
              {logo ? <img src={logo} alt={logoText} style={{ maxHeight: "40px", objectFit: "contain", filter: "brightness(0) invert(1)" }} /> : <span style={{ fontSize: "22px", fontWeight: 900, fontStyle: "italic", color: "#fff" }}>{logoText}</span>}
            </a>
            <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "13px", lineHeight: 1.7, margin: 0 }}>Dijitürk yetkili satış ortağı olarak en güncel kampanya ve paketleri sizinle buluşturuyoruz.</p>
          </div>
          <div style={{ flex: "1 1 140px" }}>
            <h4 style={{ color: "#fff", fontSize: "12px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "1px", marginBottom: "14px" }}>Sayfalar</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "9px" }}>
              {navLinks.map(l => <a key={l.href} href={l.href} style={{ color: "rgba(255,255,255,0.6)", fontSize: "13px", textDecoration: "none" }}>{l.label}</a>)}
            </div>
          </div>
          <div style={{ flex: "1 1 140px" }}>
            <h4 style={{ color: "#fff", fontSize: "12px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "1px", marginBottom: "14px" }}>Yasal</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "9px" }}>
              {[{ href: "/aydinlatma-metni", label: "Aydınlatma Metni" }, { href: "/gizlilik-politikasi", label: "Gizlilik Politikası" }, { href: "/kvkk", label: "KVKK" }].map(l => (
                <a key={l.href} href={l.href} style={{ color: "rgba(255,255,255,0.6)", fontSize: "13px", textDecoration: "none" }}>{l.label}</a>
              ))}
            </div>
          </div>
          {(contact.email || phoneDisplay) && (
            <div style={{ flex: "1 1 180px" }}>
              <h4 style={{ color: "#fff", fontSize: "12px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "1px", marginBottom: "14px" }}>İletişim</h4>
              <div style={{ display: "flex", flexDirection: "column", gap: "9px" }}>
                {contact.email && <a href={`mailto:${contact.email}`} style={{ color: "rgba(255,255,255,0.6)", fontSize: "13px", textDecoration: "none" }}>✉ {contact.email}</a>}
                {phoneDisplay && <a href={`tel:${phoneDisplay}`} style={{ color: "rgba(255,255,255,0.6)", fontSize: "13px", textDecoration: "none" }}>📞 {phoneDisplay}</a>}
              </div>
            </div>
          )}
        </div>
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)", padding: "16px 24px" }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto", display: "flex", flexWrap: "wrap", gap: "12px", alignItems: "center", justifyContent: "space-between" }}>
            <p style={{ color: "rgba(255,255,255,0.35)", fontSize: "12px", margin: 0 }}>© 2026 {logoText} — Tüm hakları saklıdır.</p>
            <div style={{ display: "flex", gap: "16px" }}>
              <a href="/aydinlatma-metni" style={{ color: "rgba(255,255,255,0.35)", fontSize: "12px", textDecoration: "none" }}>Aydınlatma Metni</a>
              <a href="/kvkk" style={{ color: "rgba(255,255,255,0.35)", fontSize: "12px", textDecoration: "none" }}>KVKK</a>
            </div>
          </div>
        </div>
      </footer>

      {/* POPUP FORM */}
      {showPopup && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" }}
          onClick={e => { if (e.target === e.currentTarget) setShowPopup(false); }}>
          <div style={{ background: C.formBg, borderRadius: "10px", padding: "32px", width: "100%", maxWidth: "420px", position: "relative", border: "1px solid rgba(255,255,255,0.15)" }}>
            <button onClick={() => setShowPopup(false)} style={{ position: "absolute", top: "12px", right: "16px", background: "none", border: "none", fontSize: "24px", cursor: "pointer", color: "rgba(255,255,255,0.6)" }}>×</button>
            <h3 style={{ margin: "0 0 4px", fontSize: "20px", fontWeight: 900, color: "#fff" }}>Hemen Sizi Arayalım</h3>
            <p style={{ margin: "0 0 16px", fontSize: "13px", color: C.textMuted }}>Hemen üye ol! Sizde en cazip kampanyalardan faydalan!</p>
            {popupSuccess ? (
              <div style={{ textAlign: "center", padding: "24px 0" }}>
                <div style={{ fontSize: "44px", marginBottom: "10px" }}>🎉</div>
                <h3 style={{ color: "#fff", marginBottom: "8px" }}>Başvurunuz Alındı!</h3>
                <p style={{ color: C.textMuted, fontSize: "13px", marginBottom: "14px" }}>Müşteri temsilcimiz en kısa sürede sizi arayacak.</p>
                <button onClick={() => { setPopupSuccess(false); setShowPopup(false); }} style={{ color: "#c084fc", background: "none", border: "none", cursor: "pointer", textDecoration: "underline" }}>Kapat</button>
              </div>
            ) : (
              <BaşvuruFormu packages={allPackages} onSuccess={() => setPopupSuccess(true)} />
            )}
          </div>
        </div>
      )}

      {/* MOBİL DRAWER */}
      {drawerOpen && (
        <div style={{ position: "fixed", inset: 0, zIndex: 9998 }} onClick={() => setDrawerOpen(false)}>
          <div style={{ position: "absolute", top: 0, right: 0, width: "280px", height: "100%", background: "#1e1252", boxShadow: "-4px 0 24px rgba(0,0,0,0.5)", display: "flex", flexDirection: "column", padding: "24px" }}
            onClick={e => e.stopPropagation()}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "32px" }}>
              <span style={{ fontSize: "16px", fontWeight: 700, color: "#fff" }}>Menü</span>
              <button onClick={() => setDrawerOpen(false)} style={{ background: "none", border: "none", fontSize: "24px", cursor: "pointer", color: "rgba(255,255,255,0.6)", lineHeight: 1 }}>×</button>
            </div>
            <nav style={{ display: "flex", flexDirection: "column", gap: "4px", flex: 1 }}>
              {navLinks.map(l => (
                <a key={l.href} href={l.href} style={{ color: "rgba(255,255,255,0.85)", textDecoration: "none", fontSize: "15px", fontWeight: 600, padding: "12px 16px", borderRadius: "8px", display: "block" }}
                  onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.08)")}
                  onMouseLeave={e => (e.currentTarget.style.background = "transparent")}>
                  {l.label}
                </a>
              ))}
            </nav>
            <button onClick={() => { setDrawerOpen(false); setShowPopup(true); }}
              style={{ background: "#c026d3", color: "#fff", border: "none", padding: "13px", borderRadius: "9999px", fontWeight: 700, fontSize: "15px", cursor: "pointer", marginTop: "16px" }}>
              Başvuru Yap
            </button>
          </div>
        </div>
      )}

      {/* WhatsApp floating */}
      {contact.whatsapp && (
        <a href={`https://wa.me/${contact.whatsapp}`} target="_blank" rel="noopener noreferrer"
          style={{ position: "fixed", bottom: "24px", right: "24px", zIndex: 1000, background: "#25d366", borderRadius: "50%", width: "58px", height: "58px", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 16px rgba(0,0,0,0.35)", textDecoration: "none" }}>
          <svg width="30" height="30" fill="white" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
            <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.126 1.532 5.858L.054 23.617a.5.5 0 0 0 .609.61l5.88-1.485A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.891 0-3.667-.502-5.2-1.378l-.373-.213-3.865.977.997-3.76-.232-.388A9.96 9.96 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
          </svg>
        </a>
      )}
    </div>
  );
}
