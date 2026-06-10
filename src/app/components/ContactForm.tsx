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

interface ContactFormProps {
  packages: Package[];
  contact: Contact;
  logo: string | null;
  logoText: string;
  heroImage?: string | null;
  campaignBannerImage?: string | null;
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

function PackageForm({ packages, phoneDisplay, textMuted, formBg }: { packages: Package[]; phoneDisplay: string; textMuted: string; formBg: string }) {
  const [success, setSuccess] = useState(false);
  return (
    <div className="form-col-width" style={{ flexShrink: 0, background: formBg, borderRadius: "10px", padding: "24px", border: "1px solid rgba(255,255,255,0.1)" }}>
      <h3 style={{ margin: "0 0 4px", fontSize: "18px", fontWeight: 900, color: "#fff" }}>Hemen Sizi Arayalım</h3>
      <p style={{ margin: "0 0 16px", fontSize: "13px", color: textMuted }}>Hemen üye ol! Sizde en cazip kampanyalardan faydalan!</p>
      {success ? (
        <div style={{ textAlign: "center", padding: "28px 0" }}>
          <div style={{ fontSize: "44px", marginBottom: "10px" }}>🎉</div>
          <h3 style={{ color: "#fff", marginBottom: "8px" }}>Başvurunuz Alındı!</h3>
          <p style={{ color: textMuted, fontSize: "13px", marginBottom: "14px" }}>Müşteri temsilcimiz en kısa sürede sizi arayacak.</p>
          <button onClick={() => setSuccess(false)} style={{ color: "#c084fc", background: "none", border: "none", cursor: "pointer", textDecoration: "underline", fontSize: "13px" }}>Yeni başvuru yap</button>
        </div>
      ) : (
        <BaşvuruFormu packages={packages} onSuccess={() => setSuccess(true)} />
      )}
      {phoneDisplay && (
        <div style={{ marginTop: "12px", background: "rgba(141,29,130,0.25)", borderRadius: "4px", padding: "11px", textAlign: "center", fontWeight: 700, color: "#fff", fontSize: "15px", border: "1px solid rgba(141,29,130,0.5)" }}>
          HEMEN ARA : {phoneDisplay}
        </div>
      )}
    </div>
  );
}

const navLinks = [
  { href: "/", label: "Ana Sayfa" },
  { href: "/sporun-yildizi", label: "Sporun Yıldızı" },
  { href: "/internet-sporun-yildizi", label: "İnternet+Sporun Yıldızı" },
  { href: "/hakkimizda", label: "Hakkımızda" },
  { href: "/iletisim", label: "İletişim" },
];

export default function ContactForm({ packages, contact, logo, logoText, heroImage, campaignBannerImage }: ContactFormProps) {
  const [showPopup, setShowPopup] = useState(false);
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
        .mobile-hamburger { display: flex !important; }
        @media (min-width: 900px) { .mobile-hamburger { display: none !important; } }
        .basvuru-pill-mobile { padding: 7px 14px !important; font-size: 12px !important; }
        @media (min-width: 900px) { .basvuru-pill-mobile { padding: 9px 24px !important; font-size: 14px !important; } }
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
        .nav-a { color: rgba(255,255,255,0.85); text-decoration: none; font-size: 13px; font-weight: 600; }
        .nav-a:hover { color: #fff; }
      `}</style>

      {/* HEADER KAPSAYICI - koyu lacivert arka plan */}
      <div style={{ background: "#111827", position: "sticky", top: 0, zIndex: 100 }}>

        {/* ÜST BİLGİ ÇUBUĞU */}
        <div className="top-bar" style={{ justifyContent: "space-between", alignItems: "center", padding: "6px 20px", fontSize: "12px", color: "rgba(255,255,255,0.6)", maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
            {contact.email && (
              <span style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                <svg width="12" height="12" fill="currentColor" viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
                {contact.email}
              </span>
            )}
            {phoneDisplay && (
              <span style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                <svg width="11" height="11" fill="currentColor" viewBox="0 0 24 24"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>
                {phoneDisplay}
              </span>
            )}
          </div>
          <span>Dijitürk Resmi Satış Ortağıdır</span>
        </div>

        {/* YÜZEN ANA MENÜ ÇUBUĞU - yarısı dışarı taşar */}
        <div style={{ maxWidth: "1160px", margin: "0 auto", padding: "4px 16px 0", transform: "translateY(15%)" }}>
          <div style={{
            background: "linear-gradient(90deg, #3b0764 0%, #6b21a8 40%, #a21caf 75%, #c026d3 100%)",
            borderRadius: "16px",
            padding: "0 24px",
            display: "flex",
            alignItems: "center",
            height: "80px",
            gap: "24px",
            boxShadow: "0 4px 24px rgba(0,0,0,0.4)",
          }}>
            {/* Logo */}
            <a href="/" style={{ flexShrink: 0, textDecoration: "none" }}>
              {logo
                ? <img src={logo} alt={logoText} style={{ maxHeight: "46px", maxWidth: "150px", objectFit: "contain" }} />
                : <span style={{ fontSize: "28px", fontWeight: 900, fontStyle: "italic", color: "#e41738", fontFamily: "'Arial Black', Impact, sans-serif", letterSpacing: "-1px" }}>{logoText}</span>}
            </a>

            {/* Nav (desktop) */}
            <nav className="desktop-nav" style={{ gap: "18px", alignItems: "center", flex: 1 }}>
              {navLinks.map(l => <a key={l.href} href={l.href} className="nav-a">{l.label}</a>)}
            </nav>

            {/* Başvuru Yap */}
            <button onClick={() => setShowPopup(true)} className="basvuru-pill-mobile"
              style={{ background: "#c026d3", color: "#fff", border: "2px solid rgba(255,255,255,0.5)", padding: "9px 24px", borderRadius: "9999px", fontWeight: 700, fontSize: "14px", cursor: "pointer", whiteSpace: "nowrap", flexShrink: 0, boxShadow: "0 2px 10px rgba(0,0,0,0.3)" }}
              onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = "#a21caf"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = "#c026d3"; }}>
              Başvuru Yap
            </button>

            {/* Hamburger (mobile) */}
            <button className="mobile-hamburger" onClick={() => setDrawerOpen(true)}
              style={{ background: "rgba(255,255,255,0.15)", border: "none", borderRadius: "8px", padding: "8px", cursor: "pointer", flexShrink: 0, flexDirection: "column", gap: "5px", alignItems: "center", justifyContent: "center", width: "40px", height: "40px" }}>
              <span style={{ display: "block", width: "20px", height: "2px", background: "#fff", borderRadius: "2px" }} />
              <span style={{ display: "block", width: "20px", height: "2px", background: "#fff", borderRadius: "2px" }} />
              <span style={{ display: "block", width: "20px", height: "2px", background: "#fff", borderRadius: "2px" }} />
            </button>
          </div>
        </div>
      </div>

      {/* HERO */}
      {heroImage && (
        <div style={{ position: "relative", width: "100%", maxHeight: "460px", overflow: "hidden", background: "#0f0a2e" }}>
          {heroImage.includes(".webm")
            ? <video src={heroImage} style={{ width: "100%", maxHeight: "460px", objectFit: "cover", display: "block" }} autoPlay muted loop playsInline />
            : <img src={heroImage} alt="Kampanya" style={{ width: "100%", maxHeight: "460px", objectFit: "cover", display: "block" }} />}
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(26,20,64,0.85) 0%, rgba(26,20,64,0.4) 55%, transparent 100%)" }} />
          <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: "100%", maxWidth: "1200px", padding: "0 20px" }}>
            <div style={{ maxWidth: "480px" }}>
            <p style={{ margin: "0 0 6px", fontSize: "13px", color: "rgba(255,255,255,0.75)" }}>En Güncel Kampanyalarımız</p>
            <h1 style={{ margin: "0 0 14px", fontSize: "38px", fontWeight: 900, color: "#fff", lineHeight: 1.1 }}>Kampanyalar</h1>
            <p style={{ margin: "0 0 6px", fontSize: "14px", color: "rgba(255,255,255,0.85)", lineHeight: 1.6 }}>
              Ailenizle TV keyfini üst düzeye çıkarmak için yıldızlı paketler Dijitürk&apos;te sizi bekliyor!
            </p>
            <p style={{ margin: "0 0 18px", fontSize: "15px", fontWeight: 700, color: "#fff" }}>Hemen Başvuru Yapın Sizi Arayalım!</p>
            <button onClick={() => setShowPopup(true)} className="basvuru-btn">Başvuru Yap</button>
            </div>
          </div>
        </div>
      )}

      {/* PAKET + FORM BÖLÜMÜ */}
      {packages.length > 0 ? packages.map((pkg, idx) => (
        <section key={pkg.id} style={{ borderBottom: "1px solid rgba(255,255,255,0.06)", padding: "40px 20px" }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
            <div className="two-col" style={{ display: "flex", gap: "32px", alignItems: "flex-start" }}>

              {/* SOL: Paket */}
              <div style={{ flex: 1, background: C.cardBg, borderRadius: "10px", overflow: "hidden", border: "1px solid rgba(255,255,255,0.08)" }}>
                {pkg.image && (
                  <img src={pkg.image} alt={pkg.label} style={{ width: "100%", maxHeight: "260px", objectFit: "cover", display: "block" }} />
                )}
                <div style={{ padding: "28px" }}>
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
              </div>

              {/* SAĞ: Form */}
              <PackageForm
                key={pkg.id}
                packages={packages}
                phoneDisplay={phoneDisplay}
                textMuted={C.textMuted}
                formBg={C.formBg}
              />
            </div>
          </div>
        </section>
      )) : (
        /* Paket yoksa sadece form ortada */
        <section style={{ padding: "60px 20px" }}>
          <div style={{ maxWidth: "460px", margin: "0 auto" }}>
            <PackageForm packages={[]} phoneDisplay={phoneDisplay} textMuted={C.textMuted} formBg={C.formBg} />
          </div>
        </section>
      )}

      {/* DİĞER KAMPANYALAR */}
      {packages.length > 1 && (
        <section style={{ position: "relative", padding: "80px 20px", textAlign: "center", overflow: "hidden", background: campaignBannerImage ? "transparent" : "linear-gradient(135deg, #3b1a6e 0%, #8d1d82 100%)" }}>
          {campaignBannerImage && (
            <>
              <img src={campaignBannerImage} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", display: "block" }} onError={e => { (e.currentTarget as HTMLImageElement).style.display = "none"; }} />
              <div style={{ position: "absolute", inset: 0, background: "rgba(26,20,64,0.6)" }} />
            </>
          )}
          <div style={{ position: "relative", zIndex: 1 }}>
            <h2 style={{ color: "#fff", fontSize: "22px", fontWeight: 900, margin: "0 0 10px" }}>Avantajlarla Dolu Diğer Kampanyalar</h2>
            <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "14px", maxWidth: "560px", margin: "0 auto", lineHeight: 1.7 }}>
              İzlemek istediğiniz paketi seçin, aynı gün kurulumunuzu yapalım.
              {phoneDisplay && ` ${phoneDisplay} numaralı hattımızdan canlı destek alabilirsiniz.`}
            </p>
          </div>
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
      <footer style={{ background: "#0d0b2e", borderTop: "1px solid rgba(255,255,255,0.07)" }}>

        {/* Üst kısım */}
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "48px 24px 32px", display: "flex", flexWrap: "wrap", gap: "40px", justifyContent: "space-between" }}>

          {/* Logo + açıklama */}
          <div style={{ flex: "1 1 240px", maxWidth: "300px" }}>
            <a href="/" style={{ textDecoration: "none", display: "inline-block", marginBottom: "16px" }}>
              {logo
                ? <img src={logo} alt={logoText} style={{ maxHeight: "48px", objectFit: "contain", filter: "brightness(0) invert(1)" }} />
                : <span style={{ fontSize: "26px", fontWeight: 900, fontStyle: "italic", color: "#fff", fontFamily: "'Arial Black', Impact, sans-serif" }}>{logoText}</span>}
            </a>
            <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "13px", lineHeight: 1.7, margin: 0 }}>
              Dijitürk yetkili satış ortağı olarak en güncel kampanya ve paketleri sizinle buluşturuyoruz.
            </p>
          </div>

          {/* Hızlı bağlantılar */}
          <div style={{ flex: "1 1 160px" }}>
            <h4 style={{ color: "#fff", fontSize: "13px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "1px", marginBottom: "16px" }}>Sayfalar</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {navLinks.map(l => (
                <a key={l.href} href={l.href} style={{ color: "rgba(255,255,255,0.6)", fontSize: "14px", textDecoration: "none", transition: "color 0.2s" }}
                  onMouseEnter={e => (e.currentTarget.style.color = "#fff")}
                  onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.6)")}>
                  {l.label}
                </a>
              ))}
            </div>
          </div>

          {/* Yasal */}
          <div style={{ flex: "1 1 160px" }}>
            <h4 style={{ color: "#fff", fontSize: "13px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "1px", marginBottom: "16px" }}>Yasal</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {[
                { href: "/aydinlatma-metni", label: "Aydınlatma Metni" },
                { href: "/gizlilik-politikasi", label: "Gizlilik Politikası" },
                { href: "/kvkk", label: "KVKK" },
              ].map(l => (
                <a key={l.href} href={l.href} style={{ color: "rgba(255,255,255,0.6)", fontSize: "14px", textDecoration: "none" }}
                  onMouseEnter={e => (e.currentTarget.style.color = "#fff")}
                  onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.6)")}>
                  {l.label}
                </a>
              ))}
            </div>
          </div>

          {/* İletişim */}
          <div style={{ flex: "1 1 200px" }}>
            <h4 style={{ color: "#fff", fontSize: "13px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "1px", marginBottom: "16px" }}>İletişim</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {contact.email && (
                <a href={`mailto:${contact.email}`} style={{ color: "rgba(255,255,255,0.6)", fontSize: "13px", textDecoration: "none", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ fontSize: "15px" }}>✉</span> {contact.email}
                </a>
              )}
              {phoneDisplay && (
                <a href={`tel:${phoneDisplay}`} style={{ color: "rgba(255,255,255,0.6)", fontSize: "13px", textDecoration: "none", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ fontSize: "15px" }}>📞</span> {phoneDisplay}
                </a>
              )}
              {contact.whatsapp && (
                <a href={`https://wa.me/${contact.whatsapp}`} target="_blank" rel="noopener noreferrer"
                  style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "#25d366", color: "#fff", fontSize: "13px", fontWeight: 700, padding: "8px 16px", borderRadius: "9999px", textDecoration: "none", marginTop: "4px", width: "fit-content" }}>
                  <svg width="16" height="16" fill="white" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.126 1.532 5.858L.054 23.617a.5.5 0 0 0 .609.61l5.88-1.485A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.891 0-3.667-.502-5.2-1.378l-.373-.213-3.865.977.997-3.76-.232-.388A9.96 9.96 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/></svg>
                  WhatsApp
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Alt çizgi */}
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)", padding: "18px 24px" }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto", display: "flex", flexWrap: "wrap", gap: "12px", alignItems: "center", justifyContent: "space-between" }}>
            <p style={{ color: "rgba(255,255,255,0.35)", fontSize: "12px", margin: 0 }}>
              © 2026 {logoText} — Tüm hakları saklıdır. Dijitürk yetkili satış ortağıdır.
            </p>
            <div style={{ display: "flex", gap: "16px" }}>
              <a href="/aydinlatma-metni" style={{ color: "rgba(255,255,255,0.35)", fontSize: "12px", textDecoration: "none" }}>Aydınlatma Metni</a>
              <a href="/kvkk" style={{ color: "rgba(255,255,255,0.35)", fontSize: "12px", textDecoration: "none" }}>KVKK</a>
            </div>
          </div>
        </div>
      </footer>

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
