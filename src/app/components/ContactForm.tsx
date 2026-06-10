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

const inputStyle = {
  width: "100%",
  padding: "12px 16px",
  borderRadius: "8px",
  border: "1.5px solid #ddd",
  fontSize: "14px",
  outline: "none",
  background: "#fff",
  color: "#333",
};

function FormPanel({ packages, onSuccess }: { packages: Package[]; onSuccess: () => void }) {
  const [form, setForm] = useState({ ad: "", soyad: "", telefon: "", paket: "", kvkk: false, sms: false });
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.kvkk) {
      alert("KVKK metnini onaylamanız gerekmektedir.");
      return;
    }
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: `${form.ad} ${form.soyad}`,
          phone: form.telefon,
          package: packages.find((p) => p.id === form.paket)?.label || form.paket,
        }),
      });
      if (res.ok) {
        onSuccess();
        setForm({ ad: "", soyad: "", telefon: "", paket: "", kvkk: false, sms: false });
        setStatus("idle");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Adınız *</label>
          <input
            type="text"
            required
            value={form.ad}
            onChange={(e) => setForm({ ...form, ad: e.target.value })}
            placeholder="Adınız"
            style={inputStyle}
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Soyadınız *</label>
          <input
            type="text"
            required
            value={form.soyad}
            onChange={(e) => setForm({ ...form, soyad: e.target.value })}
            placeholder="Soyadınız"
            style={inputStyle}
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">Telefon Numaranız *</label>
        <input
          type="tel"
          required
          value={form.telefon}
          onChange={(e) => setForm({ ...form, telefon: e.target.value })}
          placeholder="05XX XXX XX XX"
          style={inputStyle}
        />
      </div>

      {packages.length > 0 && (
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Paket Seçiniz</label>
          <select
            value={form.paket}
            onChange={(e) => setForm({ ...form, paket: e.target.value })}
            style={{ ...inputStyle, appearance: "auto" }}
          >
            <option value="">-- Paket Seçin --</option>
            {packages.map((p) => (
              <option key={p.id} value={p.id}>{p.label}</option>
            ))}
          </select>
        </div>
      )}

      <div className="space-y-2 pt-1">
        <label className="flex items-start gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={form.kvkk}
            onChange={(e) => setForm({ ...form, kvkk: e.target.checked })}
            className="mt-0.5 flex-shrink-0"
          />
          <span className="text-xs text-gray-500 leading-relaxed">
            <strong>KVKK Aydınlatma Metni</strong>&apos;ni okudum, kişisel verilerimin işlenmesine onay veriyorum.
          </span>
        </label>
        <label className="flex items-start gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={form.sms}
            onChange={(e) => setForm({ ...form, sms: e.target.checked })}
            className="mt-0.5 flex-shrink-0"
          />
          <span className="text-xs text-gray-500 leading-relaxed">
            Kampanya ve duyurulardan SMS/e-posta ile haberdar olmak istiyorum.
          </span>
        </label>
      </div>

      {status === "error" && (
        <p className="text-red-500 text-sm font-semibold text-center">Bir hata oluştu, lütfen tekrar deneyin.</p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full font-black py-3 rounded-lg text-white text-base tracking-wide transition-all active:scale-95 disabled:opacity-60"
        style={{ background: "linear-gradient(135deg, #5a0a6e 0%, #8b1fa8 100%)", boxShadow: "0 4px 16px rgba(90,10,110,0.35)" }}
      >
        {status === "loading" ? "Gönderiliyor..." : "HEMEN BAŞVUR"}
      </button>
    </form>
  );
}

export default function ContactForm({ packages, contact, logo, logoText, heroImage }: ContactFormProps) {
  const [success, setSuccess] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">

      {/* Top Info Bar - desktop only */}
      <div className="hidden md:block bg-gray-800 text-white text-xs py-2">
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-6">
            {contact.email && (
              <a href={`mailto:${contact.email}`} className="flex items-center gap-1.5 hover:text-yellow-300 transition-colors">
                <svg width="13" height="13" fill="currentColor" viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
                {contact.email}
              </a>
            )}
            {contact.phone && (
              <a href={`tel:${contact.phone}`} className="flex items-center gap-1.5 hover:text-yellow-300 transition-colors">
                <svg width="13" height="13" fill="currentColor" viewBox="0 0 24 24"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>
                {contact.phone}
              </a>
            )}
          </div>
          <span className="text-gray-400">Digitürk Yetkili Satış Ortağı</span>
        </div>
      </div>

      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 md:px-6 flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a href="/" className="flex-shrink-0">
            {logo ? (
              <img src={logo} alt={logoText} className="h-10 md:h-14 object-contain" />
            ) : (
              <span className="text-2xl md:text-3xl font-black italic text-purple-900" style={{ fontFamily: "'Arial Black', Impact, sans-serif" }}>
                {logoText}
              </span>
            )}
          </a>

          {/* Nav - desktop */}
          <nav className="hidden md:flex items-center gap-6">
            <a href="/" className="text-gray-700 text-sm font-semibold hover:text-purple-700 transition-colors">Anasayfa</a>
            <a href="/hakkimizda" className="text-gray-700 text-sm font-semibold hover:text-purple-700 transition-colors">Hakkımızda</a>
            <a href="/iletisim" className="text-gray-700 text-sm font-semibold hover:text-purple-700 transition-colors">İletişim</a>
          </nav>

          {/* CTA */}
          {contact.whatsapp && (
            <a
              href={`https://wa.me/${contact.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-white text-sm font-bold px-4 py-2 md:px-5 md:py-2.5 rounded-lg transition-all hover:opacity-90 active:scale-95"
              style={{ background: "linear-gradient(135deg, #5a0a6e 0%, #8b1fa8 100%)" }}
            >
              <svg width="18" height="18" fill="white" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.126 1.532 5.858L.054 23.617a.5.5 0 0 0 .609.61l5.88-1.485A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.891 0-3.667-.502-5.2-1.378l-.373-.213-3.865.977.997-3.76-.232-.388A9.96 9.96 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/></svg>
              <span className="hidden md:inline">WhatsApp</span>
            </a>
          )}
        </div>
      </header>

      {/* Hero Banner */}
      {heroImage && (
        <div className="w-full relative overflow-hidden" style={{ maxHeight: "420px", background: "#1a0028" }}>
          {heroImage.includes(".webm") ? (
            <video src={heroImage} className="w-full" style={{ maxHeight: "420px", objectFit: "cover" }} autoPlay muted loop playsInline />
          ) : (
            <img src={heroImage} alt="Kampanya" className="w-full" style={{ maxHeight: "420px", objectFit: "cover", objectPosition: "center" }} />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 py-10 px-4">
        <div className="max-w-6xl mx-auto">

          {/* Section title */}
          <div className="text-center mb-8">
            <h1 className="text-2xl md:text-3xl font-black text-gray-800">Kampanya Başvurusu</h1>
            <p className="text-gray-500 mt-2 text-sm">Formu doldurun, sizi arayalım.</p>
          </div>

          <div className="flex flex-col md:flex-row gap-8 items-start">

            {/* Left: Packages */}
            <div className="w-full md:flex-1">
              {packages.length > 0 ? (
                <div className="space-y-5">
                  {packages.map((pkg) => (
                    <div
                      key={pkg.id}
                      className="bg-white rounded-2xl overflow-hidden shadow-md border border-gray-100"
                    >
                      <div className="px-6 py-4" style={{ background: "linear-gradient(135deg, #5a0a6e 0%, #8b1fa8 100%)" }}>
                        <h2 className="text-white text-lg font-black">{pkg.label}</h2>
                      </div>
                      <div className="px-6 py-5">
                        {pkg.desc && (
                          <p className="text-gray-600 text-sm mb-4">{pkg.desc}</p>
                        )}
                        {pkg.price && (
                          <div className="flex items-baseline gap-1">
                            <span className="text-3xl font-black text-purple-800">{pkg.price}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-8 text-center">
                  <div className="text-4xl mb-3">📡</div>
                  <h2 className="text-xl font-black text-gray-800 mb-2">Dijitürk Kampanyaları</h2>
                  <p className="text-gray-500 text-sm">En iyi kampanya fırsatları için hemen başvurun.</p>
                </div>
              )}

              {/* WhatsApp bar */}
              {contact.whatsapp && (
                <a
                  href={`https://wa.me/${contact.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 flex items-center gap-3 rounded-xl px-5 py-4 transition-all hover:opacity-90 active:scale-95"
                  style={{ background: "#25d366", boxShadow: "0 4px 14px rgba(37,211,102,0.35)" }}
                >
                  <svg width="28" height="28" fill="white" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.126 1.532 5.858L.054 23.617a.5.5 0 0 0 .609.61l5.88-1.485A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.891 0-3.667-.502-5.2-1.378l-.373-.213-3.865.977.997-3.76-.232-.388A9.96 9.96 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/></svg>
                  <div>
                    <div className="text-white font-black text-sm">WhatsApp Destek Hattı</div>
                    <div className="text-white font-black text-lg leading-tight">{contact.whatsappDisplay || contact.whatsapp}</div>
                  </div>
                </a>
              )}
            </div>

            {/* Right: Form */}
            <div className="w-full md:w-[420px] md:flex-shrink-0">
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                <div className="px-6 py-4" style={{ background: "linear-gradient(135deg, #5a0a6e 0%, #8b1fa8 100%)" }}>
                  <h2 className="text-white text-lg font-black">Hemen Sizi Arayalım</h2>
                  <p className="text-purple-200 text-xs mt-0.5">Bilgilerinizi bırakın, uzmanımız sizi arasın.</p>
                </div>

                <div className="p-6">
                  {success ? (
                    <div className="text-center py-8">
                      <div className="text-5xl mb-3">🎉</div>
                      <h3 className="text-gray-800 text-xl font-black mb-2">Başvurunuz Alındı!</h3>
                      <p className="text-gray-500 text-sm mb-6">Müşteri temsilcimiz en kısa sürede sizi arayacak.</p>
                      <button
                        onClick={() => setSuccess(false)}
                        className="text-purple-700 underline text-sm font-semibold"
                      >
                        Yeni başvuru yap
                      </button>
                    </div>
                  ) : (
                    <FormPanel packages={packages} onSuccess={() => setSuccess(true)} />
                  )}
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-6 mt-8">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            {logo ? (
              <img src={logo} alt={logoText} className="h-8 object-contain brightness-0 invert" />
            ) : (
              <span className="text-xl font-black italic" style={{ fontFamily: "'Arial Black', Impact, sans-serif" }}>{logoText}</span>
            )}
          </div>
          <div className="flex flex-col md:flex-row items-center gap-4 text-sm text-gray-400">
            <a href="/" className="hover:text-white transition-colors">Anasayfa</a>
            <a href="/hakkimizda" className="hover:text-white transition-colors">Hakkımızda</a>
            <a href="/iletisim" className="hover:text-white transition-colors">İletişim</a>
          </div>
          {contact.footerText && (
            <p className="text-gray-500 text-xs text-center">{contact.footerText}</p>
          )}
        </div>
      </footer>

    </div>
  );
}
