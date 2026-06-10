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
    width: "100%", padding: "10px 14px", border: "1px solid #ddd",
    borderRadius: "4px", fontSize: "14px", outline: "none", boxSizing: "border-box",
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
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
      <label style={{ display: "flex", gap: "8px", alignItems: "flex-start", fontSize: "13px", color: "#444", cursor: "pointer" }}>
        <input type="checkbox" required checked={form.kvkk} onChange={e => setForm({ ...form, kvkk: e.target.checked })}
          style={{ marginTop: "3px", flexShrink: 0 }} />
        <span>Aydınlatma metni'ni okudum, anladım, onaylıyorum.</span>
      </label>
      <label style={{ display: "flex", gap: "8px", alignItems: "flex-start", fontSize: "13px", color: "#444", cursor: "pointer" }}>
        <input type="checkbox" checked={form.sms} onChange={e => setForm({ ...form, sms: e.target.checked })}
          style={{ marginTop: "3px", flexShrink: 0 }} />
        <span>SMS ve E-Posta Kampanyası almak istiyorum.</span>
      </label>
      {status === "error" && <p style={{ color: "red", fontSize: "13px", textAlign: "center" }}>Bir hata oluştu, lütfen tekrar deneyin.</p>}
      <button type="submit" disabled={status === "loading"}
        style={{ background: "#8d1d82", color: "#fff", border: "none", padding: "12px", borderRadius: "4px",
          fontSize: "15px", fontWeight: 700, cursor: "pointer", opacity: status === "loading" ? 0.7 : 1 }}>
        {status === "loading" ? "Gönderiliyor..." : "Gönder"}
      </button>
    </form>
  );
}

export default function ContactForm({ packages, contact, logo, logoText, heroImage }: ContactFormProps) {
  const [showForm, setShowForm] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);

  const phoneDisplay = contact.phone || contact.whatsappDisplay || "";

  return (
    <div style={{ minHeight: "100vh", background: "#fff", fontFamily: "'Segoe UI', Arial, sans-serif" }}>

      {/* TOP INFO BAR - masaüstü */}
      <div style={{ background: "#f8f8f8", borderBottom: "1px solid #e5e5e5", display: "none" }} className="top-bar-desktop">
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "6px 20px", display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "13px", color: "#555" }}>
          <div style={{ display: "flex", gap: "24px" }}>
            {contact.email && (
              <span>✉ {contact.email}</span>
            )}
            {phoneDisplay && <span>📞 {phoneDisplay}</span>}
          </div>
          <span>Dijitürk Resmi Satış Ortağı</span>
        </div>
      </div>

      <style>{`
        @media (min-width: 768px) {
          .top-bar-desktop { display: block !important; }
        }
        .nav-link { color: #fff; text-decoration: none; font-size: 14px; font-weight: 600; padding: 6px 2px; transition: opacity 0.2s; }
        .nav-link:hover { opacity: 0.75; }
        .pkg-bullet { display: flex; align-items: flex-start; gap: 8px; margin-bottom: 8px; font-size: 14px; color: #333; }
        .pkg-bullet::before { content: "★"; color: #8d1d82; flex-shrink: 0; font-size: 13px; margin-top: 1px; }
        .pkg-gift::before { content: "🎁"; flex-shrink: 0; font-size: 13px; margin-top: 1px; }
        .pkg-gift { display: flex; align-items: flex-start; gap: 8px; margin-bottom: 8px; font-size: 14px; color: #333; }
        .basvuru-btn { background: #8d1d82; color: #fff; border: none; padding: 10px 28px; border-radius: 4px; font-weight: 700; font-size: 14px; cursor: pointer; }
        .basvuru-btn:hover { background: #6e1565; }
        .section-title { font-size: 22px; font-weight: 900; color: #222; margin: 0 0 6px 0; }
        .divider { border: none; border-top: 1px solid #e5e5e5; margin: 20px 0; }
        @media (max-width: 767px) {
          .two-col { flex-direction: column !important; }
          .form-col { width: 100% !important; }
        }
      `}</style>

      {/* HEADER */}
      <header style={{ background: "linear-gradient(135deg, #241e53 0%, #8d1d82 100%)", position: "sticky", top: 0, zIndex: 100, boxShadow: "0 2px 8px rgba(0,0,0,0.3)" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 20px", display: "flex", alignItems: "center", justifyContent: "space-between", height: "70px" }}>
          {/* Logo */}
          <a href="/" style={{ flexShrink: 0 }}>
            {logo
              ? <img src={logo} alt={logoText} style={{ maxHeight: "50px", maxWidth: "160px", objectFit: "contain" }} />
              : <span style={{ fontSize: "28px", fontWeight: 900, fontStyle: "italic", color: "#fff", fontFamily: "'Arial Black', Impact, sans-serif" }}>{logoText}</span>}
          </a>

          {/* Nav - desktop */}
          <nav style={{ display: "flex", gap: "20px", alignItems: "center" }} className="desktop-nav">
            <style>{`@media (max-width: 900px) { .desktop-nav { display: none !important; } }`}</style>
            <a href="/" className="nav-link">Ana Sayfa</a>
            <a href="/hakkimizda" className="nav-link">Hakkımızda</a>
            <a href="/iletisim" className="nav-link">İletişim</a>
          </nav>

          {/* Başvuru Yap */}
          <button onClick={() => setShowForm(true)}
            style={{ background: "#e41738", color: "#fff", border: "none", padding: "10px 20px", borderRadius: "4px", fontWeight: 700, fontSize: "14px", cursor: "pointer", whiteSpace: "nowrap" }}>
            Başvuru Yap
          </button>
        </div>
      </header>

      {/* HERO */}
      {heroImage && (
        <div style={{ position: "relative", width: "100%", maxHeight: "460px", overflow: "hidden", background: "#241e53" }}>
          {heroImage.includes(".webm")
            ? <video src={heroImage} style={{ width: "100%", maxHeight: "460px", objectFit: "cover", display: "block" }} autoPlay muted loop playsInline />
            : <img src={heroImage} alt="Kampanya" style={{ width: "100%", maxHeight: "460px", objectFit: "cover", display: "block" }} />}
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(36,30,83,0.75) 0%, rgba(36,30,83,0.2) 60%, transparent 100%)" }} />
          <div style={{ position: "absolute", top: "50%", left: "6%", transform: "translateY(-50%)", color: "#fff" }}>
            <p style={{ margin: "0 0 4px", fontSize: "14px", color: "#ddd" }}>En Güncel kampanyalarımız</p>
            <h1 style={{ margin: "0 0 12px", fontSize: "36px", fontWeight: 900 }}>Kampanyalar</h1>
            <p style={{ margin: "0 0 6px", fontSize: "15px", maxWidth: "480px", lineHeight: 1.6 }}>
              Ailenizle TV keyfini üst düzeye çıkarmak için yıldızlı paketler Dijitürk&apos;te sizi bekliyor!
            </p>
            <p style={{ margin: "0 0 16px", fontSize: "15px", fontWeight: 600 }}>Hemen Başvuru Yapın Sizi Arayalım!</p>
            <button onClick={() => setShowForm(true)} className="basvuru-btn">Başvuru Yap</button>
          </div>
        </div>
      )}

      {/* ANA İÇERİK — her paket için bir satır */}
      {packages.length > 0 ? packages.map((pkg, idx) => (
        <section key={pkg.id} style={{ background: idx % 2 === 0 ? "#fff" : "#fafafa", borderBottom: "1px solid #eee" }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "48px 20px" }}>
            <div className="two-col" style={{ display: "flex", gap: "40px", alignItems: "flex-start" }}>

              {/* SOL: Paket detay */}
              <div style={{ flex: 1 }}>
                <h2 className="section-title">{pkg.label}</h2>
                {pkg.desc && (
                  <div style={{ marginBottom: "20px" }}>
                    {pkg.desc.split("\n").map((line, i) => (
                      line.trim() ? <div key={i} className="pkg-bullet"><span>{line.trim()}</span></div> : null
                    ))}
                  </div>
                )}
                {pkg.price && (
                  <div style={{ marginBottom: "16px" }}>
                    <span style={{ fontSize: "36px", fontWeight: 900, color: "#8d1d82" }}>{pkg.price}</span>
                  </div>
                )}
                <button onClick={() => setShowForm(true)} className="basvuru-btn">Başvuru Yap</button>
                <hr className="divider" />
              </div>

              {/* SAĞ: Form (sadece ilk pakette göster, diğerlerinde sadece "ara" bannerı) */}
              {idx === 0 ? (
                <div className="form-col" style={{ width: "380px", flexShrink: 0, background: "#fff", border: "1px solid #e5e5e5", borderRadius: "6px", padding: "24px", boxShadow: "0 2px 10px rgba(0,0,0,0.08)" }}>
                  <h3 style={{ margin: "0 0 4px", fontSize: "18px", fontWeight: 900, color: "#241e53" }}>Hemen Sizi Arayalım</h3>
                  <p style={{ margin: "0 0 16px", fontSize: "13px", color: "#777" }}>Hemen üye ol! Sizde en cazip kampanyalardan faydalan!</p>
                  {formSuccess ? (
                    <div style={{ textAlign: "center", padding: "32px 0" }}>
                      <div style={{ fontSize: "48px", marginBottom: "12px" }}>🎉</div>
                      <h3 style={{ color: "#241e53", marginBottom: "8px" }}>Başvurunuz Alındı!</h3>
                      <p style={{ color: "#777", fontSize: "14px", marginBottom: "16px" }}>Müşteri temsilcimiz en kısa sürede sizi arayacak.</p>
                      <button onClick={() => setFormSuccess(false)} style={{ color: "#8d1d82", background: "none", border: "none", cursor: "pointer", textDecoration: "underline" }}>
                        Yeni başvuru yap
                      </button>
                    </div>
                  ) : (
                    <BaşvuruFormu packages={packages} onSuccess={() => setFormSuccess(true)} />
                  )}
                  {phoneDisplay && (
                    <div style={{ marginTop: "16px", background: "#f3e8ff", borderRadius: "4px", padding: "12px", textAlign: "center", fontWeight: 700, color: "#241e53" }}>
                      Hemen ara: {phoneDisplay}
                    </div>
                  )}
                </div>
              ) : (
                <div className="form-col" style={{ width: "380px", flexShrink: 0 }}>
                  {phoneDisplay && (
                    <div style={{ background: "#241e53", color: "#fff", borderRadius: "6px", padding: "18px 24px", textAlign: "center" }}>
                      <div style={{ fontSize: "14px", marginBottom: "4px" }}>Bilgi & Başvuru</div>
                      <div style={{ fontSize: "22px", fontWeight: 900 }}>{phoneDisplay}</div>
                      <button onClick={() => setShowForm(true)} className="basvuru-btn" style={{ marginTop: "12px" }}>
                        Online Başvuru Yap
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </section>
      )) : (
        /* Paket yoksa sadece form */
        <section style={{ background: "#fff" }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "48px 20px" }}>
            <div className="two-col" style={{ display: "flex", gap: "40px", alignItems: "flex-start", justifyContent: "center" }}>
              <div style={{ width: "420px", background: "#fff", border: "1px solid #e5e5e5", borderRadius: "6px", padding: "28px", boxShadow: "0 2px 10px rgba(0,0,0,0.08)" }}>
                <h3 style={{ margin: "0 0 4px", fontSize: "20px", fontWeight: 900, color: "#241e53" }}>Hemen Sizi Arayalım</h3>
                <p style={{ margin: "0 0 16px", fontSize: "13px", color: "#777" }}>Hemen üye ol! Sizde en cazip kampanyalardan faydalan!</p>
                {formSuccess ? (
                  <div style={{ textAlign: "center", padding: "32px 0" }}>
                    <div style={{ fontSize: "48px", marginBottom: "12px" }}>🎉</div>
                    <h3 style={{ color: "#241e53", marginBottom: "8px" }}>Başvurunuz Alındı!</h3>
                    <p style={{ color: "#777", fontSize: "14px", marginBottom: "16px" }}>Müşteri temsilcimiz en kısa sürede sizi arayacak.</p>
                    <button onClick={() => setFormSuccess(false)} style={{ color: "#8d1d82", background: "none", border: "none", cursor: "pointer", textDecoration: "underline" }}>Yeni başvuru yap</button>
                  </div>
                ) : (
                  <BaşvuruFormu packages={[]} onSuccess={() => setFormSuccess(true)} />
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* DİĞER KAMPANYALAR BAŞLIĞI */}
      {packages.length > 1 && (
        <section style={{ background: "linear-gradient(135deg, #241e53 0%, #8d1d82 100%)", padding: "36px 20px", textAlign: "center" }}>
          <h2 style={{ color: "#fff", fontSize: "24px", fontWeight: 900, margin: "0 0 10px" }}>Avantajlarla Dolu Diğer Kampanyalar</h2>
          <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "14px", maxWidth: "600px", margin: "0 auto" }}>
            İzlemek istediğiniz paketi seçin, aynı gün kurulumunuzu yapalım.
            {phoneDisplay && ` ${phoneDisplay} numaralı hattımızdan canlı destek alabilirsiniz.`}
          </p>
        </section>
      )}

      {/* FOOTER - Destek barı */}
      {phoneDisplay && (
        <div style={{ background: "#f8f8f8", borderTop: "1px solid #e5e5e5", padding: "24px 20px" }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto", display: "flex", flexWrap: "wrap", gap: "20px", alignItems: "center", justifyContent: "flex-end" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", background: "#fff", border: "1px solid #e5e5e5", borderRadius: "6px", padding: "12px 20px" }}>
              <div style={{ width: "40px", height: "40px", background: "#8d1d82", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <span style={{ color: "#fff", fontSize: "18px" }}>📞</span>
              </div>
              <div>
                <div style={{ fontSize: "12px", fontWeight: 700, color: "#555" }}>Satış Destek Hattı</div>
                <div style={{ fontSize: "16px", fontWeight: 900, color: "#241e53" }}>{phoneDisplay}</div>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", background: "#fff", border: "1px solid #e5e5e5", borderRadius: "6px", padding: "12px 20px" }}>
              <div style={{ width: "40px", height: "40px", background: "#8d1d82", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <span style={{ color: "#fff", fontSize: "18px" }}>🎧</span>
              </div>
              <div>
                <div style={{ fontSize: "12px", fontWeight: 700, color: "#555" }}>Ürün Destek Hattı</div>
                <div style={{ fontSize: "16px", fontWeight: 900, color: "#241e53" }}>{phoneDisplay}</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer style={{ background: "linear-gradient(135deg, #241e53 0%, #8d1d82 100%)", padding: "24px 20px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", display: "flex", flexWrap: "wrap", gap: "20px", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            {logo
              ? <img src={logo} alt={logoText} style={{ maxHeight: "50px", objectFit: "contain", filter: "brightness(0) invert(1)" }} />
              : <span style={{ fontSize: "24px", fontWeight: 900, fontStyle: "italic", color: "#fff", fontFamily: "'Arial Black', Impact, sans-serif" }}>{logoText}</span>}
          </div>
          <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
            <a href="/" style={{ color: "rgba(255,255,255,0.8)", fontSize: "14px", textDecoration: "none" }}>Ana Sayfa</a>
            <a href="/hakkimizda" style={{ color: "rgba(255,255,255,0.8)", fontSize: "14px", textDecoration: "none" }}>Hakkımızda</a>
            <a href="/iletisim" style={{ color: "rgba(255,255,255,0.8)", fontSize: "14px", textDecoration: "none" }}>İletişim</a>
          </div>
          {contact.footerText && (
            <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "12px", margin: 0 }}>{contact.footerText}</p>
          )}
        </div>
      </footer>

      {/* POPUP FORM */}
      {showForm && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" }}
          onClick={e => { if (e.target === e.currentTarget) setShowForm(false); }}>
          <div style={{ background: "#fff", borderRadius: "8px", padding: "32px", width: "100%", maxWidth: "420px", position: "relative" }}>
            <button onClick={() => setShowForm(false)}
              style={{ position: "absolute", top: "12px", right: "16px", background: "none", border: "none", fontSize: "22px", cursor: "pointer", color: "#888" }}>×</button>
            <h3 style={{ margin: "0 0 4px", fontSize: "20px", fontWeight: 900, color: "#241e53" }}>Hemen Sizi Arayalım</h3>
            <p style={{ margin: "0 0 16px", fontSize: "13px", color: "#777" }}>Hemen üye ol! Sizde en cazip kampanyalardan faydalan!</p>
            {formSuccess ? (
              <div style={{ textAlign: "center", padding: "24px 0" }}>
                <div style={{ fontSize: "48px", marginBottom: "12px" }}>🎉</div>
                <h3 style={{ color: "#241e53", marginBottom: "8px" }}>Başvurunuz Alındı!</h3>
                <p style={{ color: "#777", fontSize: "14px", marginBottom: "16px" }}>Müşteri temsilcimiz en kısa sürede sizi arayacak.</p>
                <button onClick={() => { setFormSuccess(false); setShowForm(false); }}
                  style={{ color: "#8d1d82", background: "none", border: "none", cursor: "pointer", textDecoration: "underline" }}>Kapat</button>
              </div>
            ) : (
              <BaşvuruFormu packages={packages} onSuccess={() => setFormSuccess(true)} />
            )}
          </div>
        </div>
      )}

      {/* WhatsApp floating */}
      {contact.whatsapp && (
        <a href={`https://wa.me/${contact.whatsapp}`} target="_blank" rel="noopener noreferrer"
          style={{ position: "fixed", bottom: "24px", right: "24px", zIndex: 1000, background: "#25d366", borderRadius: "50%", width: "60px", height: "60px", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 16px rgba(0,0,0,0.25)", textDecoration: "none" }}>
          <svg width="32" height="32" fill="white" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
            <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.126 1.532 5.858L.054 23.617a.5.5 0 0 0 .609.61l5.88-1.485A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.891 0-3.667-.502-5.2-1.378l-.373-.213-3.865.977.997-3.76-.232-.388A9.96 9.96 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
          </svg>
        </a>
      )}
    </div>
  );
}
