"use client";

import { useState } from "react";

interface Package {
  id: string;
  label: string;
  desc: string;
  price: string;
}

interface Contact {
  whatsapp: string;
  whatsappDisplay: string;
  navLinks: string[];
  footerText: string;
  phone?: string;
  email?: string;
}

interface ContactFormProps {
  packages: Package[];
  contact: Contact;
  logo: string | null;
  logoText: string;
  heroImage?: string | null;
}

// Renkler - referans siteyle birebir
const C = {
  pageBg: "#1a1440",       // ana koyu lacivert arka plan
  cardBg: "#241e63",       // paket kartı arka planı
  formBg: "#2d2470",       // form kartı arka planı
  header: "#1a1440",       // header arka plan
  accent: "#8d1d82",       // mor aksan rengi (butonlar)
  accentHover: "#6e1565",
  red: "#e41738",          // başvuru yap kırmızı
  text: "#fff",
  textMuted: "rgba(255,255,255,0.65)",
  inputBg: "#fff",
  inputBorder: "#ccc",
};

function BaşvuruFormu({ packages, onSuccess }: { packages: Package[]; onSuccess: () => void }) {
  const [form, setForm] = useState({ ad: "", soyad: "", telefon: "", paket: "", kvkk: false, sms: false });
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.kvkk) { alert("Aydınlatma metnini onaylamanız gerekmektedir."); return; }
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: `${form.ad} ${form.soyad}`.trim(),
          phone: form.telefon,
          package: packages.find((p) => p.id === form.paket)?.label || form.paket,
        }),
      });
      if (res.ok) { onSuccess(); }
      else { setStatus("error"); }
    } catch { setStatus("error"); }
  };

  const fieldStyle: React.CSSProperties = {
    width: "100%", padding: "10px 12px", border: "1px solid #ccc",
    borderRadius: "4px", fontSize: "14px", outline: "none",
    boxSizing: "border-box", background: C.inputBg, color: "#222",
    marginBottom: "8px", display: "block",
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" required placeholder="Adınız" value={form.ad}
        onChange={e => setForm({ ...form, ad: e.target.value })} style={fieldStyle} />
      <input type="text" required placeholder="Soyadınız" value={form.soyad}
        onChange={e => setForm({ ...form, soyad: e.target.value })} style={fieldStyle} />
      <input type="tel" required placeholder="Telefon Numaranız" value={form.telefon}
        onChange={e => setForm({ ...form, telefon: e.target.value })} style={fieldStyle} />
      {packages.length > 0 && (
        <select value={form.paket} onChange={e => setForm({ ...form, paket: e.target.value })}
          style={{ ...fieldStyle, appearance: "auto" as React.CSSProperties["appearance"] }}>
          <option value="">-- Paket Seçin --</option>
          {packages.map(p => <option key={p.id} value={p.id}>{p.label}</option>)}
        </select>
      )}
      <label style={{ display: "flex", gap: "8px", alignItems: "flex-start", fontSize: "12px", color: C.textMuted, cursor: "pointer", marginBottom: "6px" }}>
        <input type="checkbox" required checked={form.kvkk} onChange={e => setForm({ ...form, kvkk: e.target.checked })}
          style={{ marginTop: "2px", flexShrink: 0 }} />
        <span>Aydınlatma metni&apos;ni okudum, anladım, onaylıyorum.</span>
      </label>
      <label style={{ display: "flex", gap: "8px", alignItems: "flex-start", fontSize: "12px", color: C.textMuted, cursor: "pointer", marginBottom: "12px" }}>
        <input type="checkbox" checked={form.sms} onChange={e => setForm({ ...form, sms: e.target.checked })}
          style={{ marginTop: "2px", flexShrink: 0 }} />
        <span>SMS ve E-Posta Kampanyası almak istiyorum.</span>
      </label>
      {status === "error" && <p style={{ color: "#f87171", fontSize: "13px", marginBottom: "8px" }}>Bir hata oluştu, lütfen tekrar deneyin.</p>}
      <button type="submit" disabled={status === "loading"}
        style={{ width: "100%", background: C.accent, color: "#fff", border: "none", padding: "12px",
          borderRadius: "4px", fontSize: "15px", fontWeight: 700, cursor: "pointer",
          opacity: status === "loading" ? 0.7 : 1 }}>
        {status === "loading" ? "Gönderiliyor..." : "Gönder"}
      </button>
    </form>
  );
}

export default function ContactForm({ packages, contact, logo, logoText, heroImage }: ContactFormProps) {
  const [showPopup, setShowPopup] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);
  const [popupSuccess, setPopupSuccess] = useState(false);

  const phoneDisplay = contact.phone || contact.whatsappDisplay || "";

  return (
    <div style={{ minHeight: "100vh", background: C.pageBg, fontFamily: "'Segoe UI', Arial, sans-serif", color: C.text }}>

      <style>{`
        * { box-sizing: border-box; }
        .top-bar { display: none; }
        @media (min-width: 768px) { .top-bar { display: flex !important; } }
        .desktop-nav { display: none !important; }
        @media (min-width: 900px) { .desktop-nav { display: flex !important; } }
        .two-col { flex-direction: column; }
        @media (min-width: 900px) { .two-col { flex-direction: row !important; } }
        .form-col-width { width: 100%; }
        @media (min-width: 900px) { .form-col-width { width: 380px !important; } }
        .basvuru-btn {
          background: ${C.accent}; color: #fff; border: none; padding: 10px 28px;
          border-radius: 4px; font-weight: 700; font-size: 14px; cursor: pointer;
        }
        .basvuru-btn:hover { background: ${C.accentHover}; }
        .pkg-star::before { content: "★"; color: #c084fc; margin-right: 8px; }
        .nav-a { color: rgba(255,255,255,0.85); text-decoration: none; font-size: 14px; font-weight: 600; }
        .nav-a:hover { color: #fff; }
      `}</style>

      {/* TOP BAR */}
      <div className="top-bar" style={{ background: "#f5f5f5", borderBottom: "1px solid #ddd", justifyContent: "space-between", alignItems: "center", padding: "6px 24px", fontSize: "13px", color: "#444" }}>
        <div style={{ display: "flex", gap: "24px" }}>
          {contact.email && <span>✉ {contact.email}</span>}
          {phoneDisplay && <span>📞 {phoneDisplay}</span>}
        </div>
        <span>Dijitürk Resmi Satış Ortağı</span>
      </div>

      {/* HEADER */}
      <header style={{ background: C.header, borderBottom: "1px solid rgba(255,255,255,0.08)", position: "sticky", top: 0, zIndex: 100 }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 20px", display: "flex", alignItems: "center", justifyContent: "space-between", height: "68px" }}>
          <a href="/" style={{ flexShrink: 0, textDecoration: "none" }}>
            {logo
              ? <img src={logo} alt={logoText} style={{ maxHeight: "48px", maxWidth: "150px", objectFit: "contain" }} />
              : <span style={{ fontSize: "26px", fontWeight: 900, fontStyle: "italic", color: "#fff", fontFamily: "'Arial Black', Impact, sans-serif" }}>{logoText}</span>}
          </a>
          <nav className="desktop-nav" style={{ gap: "24px", alignItems: "center" }}>
            <a href="/" className="nav-a">Ana Sayfa</a>
            <a href="/hakkimizda" className="nav-a">Hakkımızda</a>
            <a href="/iletisim" className="nav-a">İletişim</a>
          </nav>
          <button onClick={() => setShowPopup(true)}
            style={{ background: C.red, color: "#fff", border: "none", padding: "10px 22px", borderRadius: "4px", fontWeight: 700, fontSize: "14px", cursor: "pointer", whiteSpace: "nowrap" }}>
            Başvuru Yap
          </button>
        </div>
      </header>

      {/* HERO */}
      {heroImage && (
        <div style={{ position: "relative", width: "100%", maxHeight: "460px", overflow: "hidden", background: "#0f0a2e" }}>
          {heroImage.includes(".webm")
            ? <video src={heroImage} style={{ width: "100%", maxHeight: "460px", objectFit: "cover", display: "block" }} autoPlay muted loop playsInline />
            : <img src={heroImage} alt="Kampanya" style={{ width: "100%", maxHeight: "460px", objectFit: "cover", display: "block" }} />}
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(26,20,64,0.85) 0%, rgba(26,20,64,0.4) 55%, transparent 100%)" }} />
          <div style={{ position: "absolute", top: "50%", left: "5%", transform: "translateY(-50%)", maxWidth: "480px" }}>
            <p style={{ margin: "0 0 6px", fontSize: "13px", color: "rgba(255,255,255,0.75)" }}>En Güncel Kampanyalarımız</p>
            <h1 style={{ margin: "0 0 14px", fontSize: "38px", fontWeight: 900, color: "#fff", lineHeight: 1.1 }}>Kampanyalar</h1>
            <p style={{ margin: "0 0 6px", fontSize: "14px", color: "rgba(255,255,255,0.85)", lineHeight: 1.6 }}>
              Ailenizle TV keyfini üst düzeye çıkarmak için yıldızlı paketler Dijitürk&apos;te sizi bekliyor!
            </p>
            <p style={{ margin: "0 0 18px", fontSize: "15px", fontWeight: 700, color: "#fff" }}>Hemen Başvuru Yapın Sizi Arayalım!</p>
            <button onClick={() => setShowPopup(true)} className="basvuru-btn">Başvuru Yap</button>
          </div>
        </div>
      )}

      {/* PAKET + FORM BÖLÜMÜ */}
      {packages.length > 0 ? packages.map((pkg, idx) => (
        <section key={pkg.id} style={{ borderBottom: "1px solid rgba(255,255,255,0.06)", padding: "40px 20px" }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
            <div className="two-col" style={{ display: "flex", gap: "32px", alignItems: "flex-start" }}>

              {/* SOL: Paket */}
              <div style={{ flex: 1, background: C.cardBg, borderRadius: "10px", padding: "28px", border: "1px solid rgba(255,255,255,0.08)" }}>
                <h2 style={{ margin: "0 0 16px", fontSize: "20px", fontWeight: 900, color: "#fff" }}>{pkg.label}</h2>
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
                <button onClick={() => setShowPopup(true)} className="basvuru-btn">Başvuru Yap</button>
                <hr style={{ border: "none", borderTop: "1px solid rgba(255,255,255,0.1)", marginTop: "20px" }} />
              </div>

              {/* SAĞ: Form (sadece 1. pakette) veya bilgi kutusu */}
              {idx === 0 ? (
                <div className="form-col-width" style={{ flexShrink: 0, background: C.formBg, borderRadius: "10px", padding: "24px", border: "1px solid rgba(255,255,255,0.1)" }}>
                  <h3 style={{ margin: "0 0 4px", fontSize: "18px", fontWeight: 900, color: "#fff" }}>Hemen Sizi Arayalım</h3>
                  <p style={{ margin: "0 0 16px", fontSize: "13px", color: C.textMuted }}>Hemen üye ol! Sizde en cazip kampanyalardan faydalan!</p>
                  {formSuccess ? (
                    <div style={{ textAlign: "center", padding: "28px 0" }}>
                      <div style={{ fontSize: "44px", marginBottom: "10px" }}>🎉</div>
                      <h3 style={{ color: "#fff", marginBottom: "8px" }}>Başvurunuz Alındı!</h3>
                      <p style={{ color: C.textMuted, fontSize: "13px", marginBottom: "14px" }}>Müşteri temsilcimiz en kısa sürede sizi arayacak.</p>
                      <button onClick={() => setFormSuccess(false)}
                        style={{ color: "#c084fc", background: "none", border: "none", cursor: "pointer", textDecoration: "underline", fontSize: "13px" }}>
                        Yeni başvuru yap
                      </button>
                    </div>
                  ) : (
                    <BaşvuruFormu packages={packages} onSuccess={() => setFormSuccess(true)} />
                  )}
                  {phoneDisplay && (
                    <div style={{ marginTop: "12px", background: "rgba(141,29,130,0.25)", borderRadius: "4px", padding: "11px", textAlign: "center", fontWeight: 700, color: "#fff", fontSize: "15px", border: "1px solid rgba(141,29,130,0.5)" }}>
                      HEMEN ARA : {phoneDisplay}
                    </div>
                  )}
                </div>
              ) : (
                <div className="form-col-width" style={{ flexShrink: 0 }}>
                  {phoneDisplay && (
                    <div style={{ background: "#0f0a2e", borderRadius: "10px", padding: "24px", textAlign: "center", border: "1px solid rgba(255,255,255,0.1)" }}>
                      <div style={{ fontSize: "13px", color: C.textMuted, marginBottom: "6px" }}>Bilgi &amp; Başvuru</div>
                      <div style={{ fontSize: "24px", fontWeight: 900, color: "#fff", marginBottom: "14px" }}>{phoneDisplay}</div>
                      <button onClick={() => setShowPopup(true)} className="basvuru-btn">Online Başvuru Yap</button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </section>
      )) : (
        /* Paket yoksa sadece form ortada */
        <section style={{ padding: "60px 20px" }}>
          <div style={{ maxWidth: "460px", margin: "0 auto", background: C.formBg, borderRadius: "10px", padding: "32px", border: "1px solid rgba(255,255,255,0.1)" }}>
            <h3 style={{ margin: "0 0 4px", fontSize: "20px", fontWeight: 900, color: "#fff" }}>Hemen Sizi Arayalım</h3>
            <p style={{ margin: "0 0 16px", fontSize: "13px", color: C.textMuted }}>Hemen üye ol! Sizde en cazip kampanyalardan faydalan!</p>
            {formSuccess ? (
              <div style={{ textAlign: "center", padding: "28px 0" }}>
                <div style={{ fontSize: "44px", marginBottom: "10px" }}>🎉</div>
                <h3 style={{ color: "#fff", marginBottom: "8px" }}>Başvurunuz Alındı!</h3>
                <p style={{ color: C.textMuted, fontSize: "13px", marginBottom: "14px" }}>Müşteri temsilcimiz en kısa sürede sizi arayacak.</p>
                <button onClick={() => setFormSuccess(false)} style={{ color: "#c084fc", background: "none", border: "none", cursor: "pointer", textDecoration: "underline" }}>Yeni başvuru yap</button>
              </div>
            ) : (
              <BaşvuruFormu packages={[]} onSuccess={() => setFormSuccess(true)} />
            )}
          </div>
        </section>
      )}

      {/* DİĞER KAMPANYALAR */}
      {packages.length > 1 && (
        <section style={{ background: "linear-gradient(135deg, #3b1a6e 0%, #8d1d82 100%)", padding: "40px 20px", textAlign: "center" }}>
          <h2 style={{ color: "#fff", fontSize: "22px", fontWeight: 900, margin: "0 0 10px" }}>Avantajlarla Dolu Diğer Kampanyalar</h2>
          <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "14px", maxWidth: "560px", margin: "0 auto", lineHeight: 1.7 }}>
            İzlemek istediğiniz paketi seçin, aynı gün kurulumunuzu yapalım.
            {phoneDisplay && ` ${phoneDisplay} numaralı hattımızdan canlı destek alabilirsiniz.`}
          </p>
        </section>
      )}

      {/* DESTEK HATLARI */}
      {phoneDisplay && (
        <div style={{ background: "#f5f5f5", padding: "28px 20px" }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto", display: "flex", flexWrap: "wrap", gap: "16px", alignItems: "center", justifyContent: "flex-end" }}>
            {[{ label: "Satış Destek Hattı", icon: "📞" }, { label: "Ürün Destek Hattı", icon: "🎧" }].map(item => (
              <div key={item.label} style={{ display: "flex", alignItems: "center", gap: "12px", background: "#fff", border: "1px solid #e5e5e5", borderRadius: "8px", padding: "12px 20px" }}>
                <div style={{ width: "38px", height: "38px", background: C.accent, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px", flexShrink: 0 }}>
                  {item.icon}
                </div>
                <div>
                  <div style={{ fontSize: "11px", fontWeight: 700, color: "#666" }}>{item.label}</div>
                  <div style={{ fontSize: "16px", fontWeight: 900, color: "#1a1440" }}>{phoneDisplay}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer style={{ background: "linear-gradient(135deg, #1a1440 0%, #3b1a6e 100%)", padding: "24px 20px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", display: "flex", flexWrap: "wrap", gap: "20px", alignItems: "center", justifyContent: "space-between" }}>
          <a href="/" style={{ textDecoration: "none" }}>
            {logo
              ? <img src={logo} alt={logoText} style={{ maxHeight: "44px", objectFit: "contain", filter: "brightness(0) invert(1)" }} />
              : <span style={{ fontSize: "22px", fontWeight: 900, fontStyle: "italic", color: "#fff", fontFamily: "'Arial Black', Impact, sans-serif" }}>{logoText}</span>}
          </a>
          <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
            <a href="/" style={{ color: "rgba(255,255,255,0.75)", fontSize: "14px", textDecoration: "none" }}>Ana Sayfa</a>
            <a href="/hakkimizda" style={{ color: "rgba(255,255,255,0.75)", fontSize: "14px", textDecoration: "none" }}>Hakkımızda</a>
            <a href="/iletisim" style={{ color: "rgba(255,255,255,0.75)", fontSize: "14px", textDecoration: "none" }}>İletişim</a>
          </div>
          <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "12px", margin: 0 }}>
            {contact.footerText || `© 2026 ${logoText} — Tüm hakları saklıdır.`}
          </p>
        </div>
      </footer>

      {/* POPUP FORM */}
      {showPopup && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" }}
          onClick={e => { if (e.target === e.currentTarget) setShowPopup(false); }}>
          <div style={{ background: C.formBg, borderRadius: "10px", padding: "32px", width: "100%", maxWidth: "420px", position: "relative", border: "1px solid rgba(255,255,255,0.15)" }}>
            <button onClick={() => setShowPopup(false)}
              style={{ position: "absolute", top: "12px", right: "16px", background: "none", border: "none", fontSize: "24px", cursor: "pointer", color: "rgba(255,255,255,0.6)", lineHeight: 1 }}>×</button>
            <h3 style={{ margin: "0 0 4px", fontSize: "20px", fontWeight: 900, color: "#fff" }}>Hemen Sizi Arayalım</h3>
            <p style={{ margin: "0 0 16px", fontSize: "13px", color: C.textMuted }}>Hemen üye ol! Sizde en cazip kampanyalardan faydalan!</p>
            {popupSuccess ? (
              <div style={{ textAlign: "center", padding: "24px 0" }}>
                <div style={{ fontSize: "44px", marginBottom: "10px" }}>🎉</div>
                <h3 style={{ color: "#fff", marginBottom: "8px" }}>Başvurunuz Alındı!</h3>
                <p style={{ color: C.textMuted, fontSize: "13px", marginBottom: "14px" }}>Müşteri temsilcimiz en kısa sürede sizi arayacak.</p>
                <button onClick={() => { setPopupSuccess(false); setShowPopup(false); }}
                  style={{ color: "#c084fc", background: "none", border: "none", cursor: "pointer", textDecoration: "underline" }}>Kapat</button>
              </div>
            ) : (
              <BaşvuruFormu packages={packages} onSuccess={() => setPopupSuccess(true)} />
            )}
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
