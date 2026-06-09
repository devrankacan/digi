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
}

interface ContactFormProps {
  packages: Package[];
  contact: Contact;
  logo: string | null;
  logoText: string;
}

export default function ContactForm({ packages, contact, logo, logoText }: ContactFormProps) {
  const [form, setForm] = useState({ ad: "", soyad: "", telefon: "", eposta: "", sehir: "", paket: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: `${form.ad} ${form.soyad}`,
          phone: form.telefon,
          email: form.eposta,
          city: form.sehir,
          package: packages.find((p) => p.id === form.paket)?.label || form.paket,
        }),
      });
      if (res.ok) {
        setStatus("success");
        setForm({ ad: "", soyad: "", telefon: "", eposta: "", sehir: "", paket: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col relative overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #4e0652 0%, #621e65 45%, #451f46 75%, #400442 100%)",
      }}
    >
      {/* Yatay renk bölgesi: dış koyu, iç açık */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 0,
          background: "linear-gradient(90deg, #400442 0%, #400442 5%, #5a1560 5%, #621e65 50%, #5a1560 95%, #400442 95%, #400442 100%)",
        }}
      />

      {/* Dekoratif dikey çizgiler - sol (z-index 1) */}
      <div className="absolute top-0 bottom-0 pointer-events-none" style={{ left: "22px", zIndex: 1, display: "flex", gap: "5px" }}>
        <div style={{ width: "2px", height: "100%", background: "linear-gradient(180deg, transparent 0%, rgba(255,255,255,0.22) 15%, rgba(255,255,255,0.18) 85%, transparent 100%)" }} />
        <div style={{ width: "2px", height: "100%", background: "linear-gradient(180deg, transparent 0%, rgba(255,255,255,0.10) 15%, rgba(255,255,255,0.08) 85%, transparent 100%)" }} />
      </div>
      {/* Dekoratif dikey çizgiler - sağ (z-index 1) */}
      <div className="absolute top-0 bottom-0 pointer-events-none" style={{ right: "22px", zIndex: 1, display: "flex", gap: "5px" }}>
        <div style={{ width: "2px", height: "100%", background: "linear-gradient(180deg, transparent 0%, rgba(255,255,255,0.10) 15%, rgba(255,255,255,0.08) 85%, transparent 100%)" }} />
        <div style={{ width: "2px", height: "100%", background: "linear-gradient(180deg, transparent 0%, rgba(255,255,255,0.22) 15%, rgba(255,255,255,0.18) 85%, transparent 100%)" }} />
      </div>

      {/* Nav */}
      <nav className="relative" style={{ background: "rgba(0,0,0,0.25)", zIndex: 2 }}>
        <div className="max-w-lg mx-auto px-4 flex justify-center gap-10 py-3">
          <a href="/" className="text-white text-sm font-semibold tracking-wide hover:text-yellow-300 transition-colors">Anasayfa</a>
          <a href="/hakkimizda" className="text-white text-sm font-semibold tracking-wide hover:text-yellow-300 transition-colors">Hakkımızda</a>
          <a href="/iletisim" className="text-white text-sm font-semibold tracking-wide hover:text-yellow-300 transition-colors">İletişim</a>
        </div>
      </nav>

      {/* Main */}
      <main className="flex-1 flex flex-col items-center px-8 pt-8 pb-10 relative" style={{ zIndex: 2 }}>
        {/* Desktop: two-column grid | Mobile: single column */}
        <div className="w-full max-w-xs md:max-w-4xl md:grid md:grid-cols-2 md:gap-14 md:items-start">

          {/* SOL KOLON: Logo + Başlık + WhatsApp */}
          <div className="md:pt-4">
            {/* Logo */}
            <div className="text-center mb-5">
              {logo ? (
                <img src={logo} alt={logoText} className="mx-auto max-h-16 object-contain" />
              ) : (
                <span
                  className="text-5xl font-black italic text-white"
                  style={{ fontFamily: "'Arial Black', 'Impact', sans-serif" }}
                >
                  {logoText}
                </span>
              )}
            </div>

            {/* Title */}
            <h1
              className="text-white text-center font-black tracking-widest mb-5 uppercase"
              style={{ fontSize: "17px", letterSpacing: "0.15em", textShadow: "0 1px 6px rgba(0,0,0,0.3)" }}
            >
              Online Başvuru Formu
            </h1>

            {/* WhatsApp */}
            <a
              href={`https://wa.me/${contact.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center mb-7 transition-all active:scale-95 overflow-hidden"
              style={{ background: "#4caf6e", borderRadius: "14px", boxShadow: "0 4px 18px rgba(0,0,0,0.3)" }}
            >
              <div
                className="flex items-center justify-center flex-shrink-0"
                style={{ width: "64px", height: "64px", background: "#3a9e58", borderRadius: "14px", boxShadow: "2px 0 8px rgba(0,0,0,0.18)" }}
              >
                <svg width="38" height="38" fill="white" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.126 1.532 5.858L.054 23.617a.5.5 0 0 0 .609.61l5.88-1.485A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.891 0-3.667-.502-5.2-1.378l-.373-.213-3.865.977.997-3.76-.232-.388A9.96 9.96 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
                </svg>
              </div>
              <div className="flex-1 px-4">
                <div className="text-white font-black italic text-base leading-tight">WhatsApp Hattı</div>
                <div className="text-white font-black italic text-lg leading-tight tracking-wide">{contact.whatsappDisplay}</div>
              </div>
            </a>

            {/* Desktop'ta paketleri sol kolona taşı */}
            <div className="hidden md:block space-y-2">
              {packages.map((pkg) => (
                <label
                  key={pkg.id}
                  className="flex items-start gap-3 cursor-pointer px-4 py-3 rounded-xl transition-all"
                  style={{
                    background: form.paket === pkg.id ? "rgba(255,255,255,0.18)" : "rgba(255,255,255,0.07)",
                    border: `1.5px solid ${form.paket === pkg.id ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.12)"}`,
                  }}
                >
                  <div className="mt-0.5 flex-shrink-0">
                    <div
                      className="w-5 h-5 rounded-full flex items-center justify-center"
                      style={{ border: `2px solid ${form.paket === pkg.id ? "#fff" : "rgba(255,255,255,0.5)"}` }}
                    >
                      {form.paket === pkg.id && (
                        <div className="w-2.5 h-2.5 rounded-full bg-white" />
                      )}
                    </div>
                  </div>
                  <input
                    type="radio"
                    name="paket"
                    value={pkg.id}
                    checked={form.paket === pkg.id}
                    onChange={(e) => setForm({ ...form, paket: e.target.value })}
                    className="sr-only"
                  />
                  <span className="text-white text-sm leading-snug">
                    <span className="font-bold">{pkg.label}</span>
                    <br />
                    <span className="text-white/65 text-xs">({pkg.desc} {pkg.price})</span>
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* SAĞ KOLON: Form */}
          <div>
            {status === "success" ? (
              <div className="rounded-2xl p-10 text-center" style={{ background: "rgba(255,255,255,0.1)" }}>
                <div className="text-5xl mb-3">🎉</div>
                <h3 className="text-white text-xl font-black mb-2">Başvurunuz Alındı!</h3>
                <p className="text-white/70 text-sm mb-6">Müşteri temsilcimiz en kısa sürede sizi arayacak.</p>
                <button onClick={() => setStatus("idle")} className="text-yellow-300 underline text-sm font-semibold">
                  Yeni başvuru yap
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">

                {/* Ad Soyad yan yana */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-white text-sm font-bold block mb-1.5">Adınız:</label>
                    <input
                      type="text"
                      required
                      value={form.ad}
                      onChange={(e) => setForm({ ...form, ad: e.target.value })}
                      placeholder="Adınızı giriniz"
                      className="w-full text-white placeholder-white/40 text-sm px-4 py-3 rounded-xl outline-none transition-all"
                      style={{ background: "rgba(255,255,255,0.08)", border: "1.5px solid rgba(255,255,255,0.25)", boxShadow: "inset 0 2px 8px rgba(0,0,0,0.25), 0 1px 0 rgba(255,255,255,0.08)" }}
                      onFocus={e => { (e.target as HTMLInputElement).style.borderColor = "rgba(255,255,255,0.7)"; (e.target as HTMLInputElement).style.boxShadow = "inset 0 2px 8px rgba(0,0,0,0.25), 0 0 0 2px rgba(255,255,255,0.1)" }}
                      onBlur={e => { (e.target as HTMLInputElement).style.borderColor = "rgba(255,255,255,0.25)"; (e.target as HTMLInputElement).style.boxShadow = "inset 0 2px 8px rgba(0,0,0,0.25), 0 1px 0 rgba(255,255,255,0.08)" }}
                    />
                  </div>
                  <div>
                    <label className="text-white text-sm font-bold block mb-1.5">Soyadınız:</label>
                    <input
                      type="text"
                      required
                      value={form.soyad}
                      onChange={(e) => setForm({ ...form, soyad: e.target.value })}
                      placeholder="Soyadınızı giriniz"
                      className="w-full text-white placeholder-white/40 text-sm px-4 py-3 rounded-xl outline-none transition-all"
                      style={{ background: "rgba(255,255,255,0.08)", border: "1.5px solid rgba(255,255,255,0.25)", boxShadow: "inset 0 2px 8px rgba(0,0,0,0.25), 0 1px 0 rgba(255,255,255,0.08)" }}
                      onFocus={e => { (e.target as HTMLInputElement).style.borderColor = "rgba(255,255,255,0.7)"; (e.target as HTMLInputElement).style.boxShadow = "inset 0 2px 8px rgba(0,0,0,0.25), 0 0 0 2px rgba(255,255,255,0.1)" }}
                      onBlur={e => { (e.target as HTMLInputElement).style.borderColor = "rgba(255,255,255,0.25)"; (e.target as HTMLInputElement).style.boxShadow = "inset 0 2px 8px rgba(0,0,0,0.25), 0 1px 0 rgba(255,255,255,0.08)" }}
                    />
                  </div>
                </div>

                {/* Telefon */}
                <div>
                  <label className="text-white text-sm font-bold block mb-1.5">Telefon Numarası:</label>
                  <input
                    type="tel"
                    required
                    value={form.telefon}
                    onChange={(e) => setForm({ ...form, telefon: e.target.value })}
                    placeholder="10 Haneli Telefon Numaranız"
                    className="w-full text-white placeholder-white/40 text-sm px-4 py-3 rounded-xl outline-none transition-all"
                    style={{ background: "rgba(255,255,255,0.08)", border: "1.5px solid rgba(255,255,255,0.25)", boxShadow: "inset 0 2px 8px rgba(0,0,0,0.25), 0 1px 0 rgba(255,255,255,0.08)" }}
                    onFocus={e => { (e.target as HTMLInputElement).style.borderColor = "rgba(255,255,255,0.7)"; (e.target as HTMLInputElement).style.boxShadow = "inset 0 2px 8px rgba(0,0,0,0.25), 0 0 0 2px rgba(255,255,255,0.1)" }}
                    onBlur={e => { (e.target as HTMLInputElement).style.borderColor = "rgba(255,255,255,0.25)"; (e.target as HTMLInputElement).style.boxShadow = "inset 0 2px 8px rgba(0,0,0,0.25), 0 1px 0 rgba(255,255,255,0.08)" }}
                  />
                </div>

                {/* E-posta */}
                <div>
                  <label className="text-white text-sm font-bold block mb-1.5">E-posta:</label>
                  <input
                    type="email"
                    value={form.eposta}
                    onChange={(e) => setForm({ ...form, eposta: e.target.value })}
                    placeholder="ornek@email.com"
                    className="w-full text-white placeholder-white/40 text-sm px-4 py-3 rounded-xl outline-none transition-all"
                    style={{ background: "rgba(255,255,255,0.08)", border: "1.5px solid rgba(255,255,255,0.25)", boxShadow: "inset 0 2px 8px rgba(0,0,0,0.25), 0 1px 0 rgba(255,255,255,0.08)" }}
                    onFocus={e => { (e.target as HTMLInputElement).style.borderColor = "rgba(255,255,255,0.7)"; (e.target as HTMLInputElement).style.boxShadow = "inset 0 2px 8px rgba(0,0,0,0.25), 0 0 0 2px rgba(255,255,255,0.1)" }}
                    onBlur={e => { (e.target as HTMLInputElement).style.borderColor = "rgba(255,255,255,0.25)"; (e.target as HTMLInputElement).style.boxShadow = "inset 0 2px 8px rgba(0,0,0,0.25), 0 1px 0 rgba(255,255,255,0.08)" }}
                  />
                </div>

                {/* Şehir */}
                <div>
                  <label className="text-white text-sm font-bold block mb-1.5">Şehir:</label>
                  <input
                    type="text"
                    value={form.sehir}
                    onChange={(e) => setForm({ ...form, sehir: e.target.value })}
                    placeholder="İstanbul"
                    className="w-full text-white placeholder-white/40 text-sm px-4 py-3 rounded-xl outline-none transition-all"
                    style={{ background: "rgba(255,255,255,0.08)", border: "1.5px solid rgba(255,255,255,0.25)", boxShadow: "inset 0 2px 8px rgba(0,0,0,0.25), 0 1px 0 rgba(255,255,255,0.08)" }}
                    onFocus={e => { (e.target as HTMLInputElement).style.borderColor = "rgba(255,255,255,0.7)"; (e.target as HTMLInputElement).style.boxShadow = "inset 0 2px 8px rgba(0,0,0,0.25), 0 0 0 2px rgba(255,255,255,0.1)" }}
                    onBlur={e => { (e.target as HTMLInputElement).style.borderColor = "rgba(255,255,255,0.25)"; (e.target as HTMLInputElement).style.boxShadow = "inset 0 2px 8px rgba(0,0,0,0.25), 0 1px 0 rgba(255,255,255,0.08)" }}
                  />
                </div>

                {/* Paket Seçimi - sadece mobilde burada görünür */}
                <div className="md:hidden space-y-2 pt-1">
                  {packages.map((pkg) => (
                    <label
                      key={pkg.id}
                      className="flex items-start gap-3 cursor-pointer px-4 py-3 rounded-xl transition-all"
                      style={{
                        background: form.paket === pkg.id ? "rgba(255,255,255,0.18)" : "rgba(255,255,255,0.07)",
                        border: `1.5px solid ${form.paket === pkg.id ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.12)"}`,
                      }}
                    >
                      <div className="mt-0.5 flex-shrink-0">
                        <div
                          className="w-5 h-5 rounded-full flex items-center justify-center"
                          style={{ border: `2px solid ${form.paket === pkg.id ? "#fff" : "rgba(255,255,255,0.5)"}` }}
                        >
                          {form.paket === pkg.id && (
                            <div className="w-2.5 h-2.5 rounded-full bg-white" />
                          )}
                        </div>
                      </div>
                      <input
                        type="radio"
                        name="paket"
                        value={pkg.id}
                        checked={form.paket === pkg.id}
                        onChange={(e) => setForm({ ...form, paket: e.target.value })}
                        className="sr-only"
                      />
                      <span className="text-white text-sm leading-snug">
                        <span className="font-bold">{pkg.label}</span>
                        <br />
                        <span className="text-white/65 text-xs">({pkg.desc} {pkg.price})</span>
                      </span>
                    </label>
                  ))}
                </div>

                {status === "error" && (
                  <p className="text-red-300 text-sm text-center font-semibold">Bir hata oluştu, lütfen tekrar deneyin.</p>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full text-white font-black py-4 rounded-2xl transition-all active:scale-95 disabled:opacity-60 text-base tracking-widest uppercase mt-1"
                  style={{
                    background: "linear-gradient(135deg, #25d366 0%, #128c4e 100%)",
                    boxShadow: "0 4px 20px rgba(37,211,102,0.4)",
                    letterSpacing: "0.12em",
                  }}
                >
                  {status === "loading" ? "Gönderiliyor..." : "Başvuru Gönder"}
                </button>

              </form>
            )}
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer
        className="text-white/55 text-center text-xs py-4"
        style={{ background: "rgba(0,0,0,0.3)" }}
      >
        {contact.footerText}
      </footer>
    </div>
  );
}
