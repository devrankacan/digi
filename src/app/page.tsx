"use client";

import { useState } from "react";

const packages = [
  { id: "internet", label: "Dijitürk İnternet", desc: "İnternet + Taraftar Paketi", price: "549₺" },
  { id: "spor", label: "Sporun Yıldızı", desc: "Sporun Yıldızı", price: "459₺" },
  { id: "bayi", label: "Bayilere Özel", desc: "100 MBPS", price: "399₺" },
];

export default function Home() {
  const [form, setForm] = useState({ ad: "", soyad: "", telefon: "", paket: "" });
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
          package: packages.find((p) => p.id === form.paket)?.label || form.paket,
        }),
      });
      if (res.ok) {
        setStatus("success");
        setForm({ ad: "", soyad: "", telefon: "", paket: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "linear-gradient(180deg, #3b0764 0%, #4c1d95 40%, #5b21b6 100%)" }}>
      {/* Nav */}
      <nav className="bg-[#2e0652] border-b border-white/10">
        <div className="max-w-2xl mx-auto px-4 flex justify-center gap-8 py-3">
          {["Anasayfa", "Hakkımızda", "İletişim"].map((item) => (
            <a key={item} href="#" className="text-white text-sm font-medium hover:text-yellow-300 transition-colors">
              {item}
            </a>
          ))}
        </div>
      </nav>

      {/* Main */}
      <main className="flex-1 flex flex-col items-center px-4 py-8">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-1 mb-1">
              <span className="text-4xl font-black italic" style={{ color: "#e60026", fontFamily: "Arial Black, sans-serif" }}>
                <span className="text-white">D</span>igiturc
              </span>
              <span className="text-4xl font-black italic text-white">k</span>
            </div>
            <div className="w-6 h-6 bg-red-600 rounded-full mx-auto -mt-2" style={{ width: "12px", height: "12px" }} />
          </div>

          {/* Title */}
          <h1 className="text-white text-center text-xl font-black tracking-widest mb-6 uppercase">
            Online Başvuru Formu
          </h1>

          {/* WhatsApp */}
          <a
            href="https://wa.me/905453267076"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-xl mb-8 transition-colors shadow-lg"
          >
            <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.126 1.532 5.858L.054 23.617a.5.5 0 0 0 .609.61l5.88-1.485A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.891 0-3.667-.502-5.2-1.378l-.373-.213-3.865.977.997-3.76-.232-.388A9.96 9.96 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
            </svg>
            <div>
              <div className="text-xs font-semibold opacity-90">WhatsApp Hattı</div>
              <div className="text-lg font-black tracking-wide">0 545 326 70 76</div>
            </div>
          </a>

          {status === "success" ? (
            <div className="bg-white/10 rounded-2xl p-10 text-center">
              <div className="text-5xl mb-4">🎉</div>
              <h3 className="text-white text-xl font-bold mb-2">Başvurunuz Alındı!</h3>
              <p className="text-white/70 text-sm mb-6">Müşteri temsilcimiz en kısa sürede sizi arayacak.</p>
              <button onClick={() => setStatus("idle")} className="text-yellow-300 underline text-sm">
                Yeni başvuru yap
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Ad */}
              <div>
                <label className="text-white text-sm font-semibold block mb-1">Adınız:</label>
                <input
                  type="text"
                  required
                  value={form.ad}
                  onChange={(e) => setForm({ ...form, ad: e.target.value })}
                  placeholder="Adınızı giriniz"
                  className="w-full bg-white/10 border border-white/20 text-white placeholder-white/40 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-white/60 focus:bg-white/15"
                />
              </div>

              {/* Soyad */}
              <div>
                <label className="text-white text-sm font-semibold block mb-1">Soyadınız:</label>
                <input
                  type="text"
                  required
                  value={form.soyad}
                  onChange={(e) => setForm({ ...form, soyad: e.target.value })}
                  placeholder="Soyadınızı giriniz"
                  className="w-full bg-white/10 border border-white/20 text-white placeholder-white/40 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-white/60 focus:bg-white/15"
                />
              </div>

              {/* Telefon */}
              <div>
                <label className="text-white text-sm font-semibold block mb-1">Telefon Numarası:</label>
                <input
                  type="tel"
                  required
                  value={form.telefon}
                  onChange={(e) => setForm({ ...form, telefon: e.target.value })}
                  placeholder="10 Haneli Telefon Numaranız"
                  className="w-full bg-white/10 border border-white/20 text-white placeholder-white/40 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-white/60 focus:bg-white/15"
                />
              </div>

              {/* Paket Seçimi */}
              <div className="space-y-3 pt-2">
                {packages.map((pkg) => (
                  <label
                    key={pkg.id}
                    className={`flex items-start gap-3 cursor-pointer p-3 rounded-xl transition-colors ${
                      form.paket === pkg.id ? "bg-white/15" : "hover:bg-white/10"
                    }`}
                  >
                    <div className="mt-0.5">
                      <div
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                          form.paket === pkg.id ? "border-white" : "border-white/50"
                        }`}
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
                    <span className="text-white text-sm">
                      <span className="font-semibold">{pkg.label}</span>
                      <br />
                      <span className="text-white/70">({pkg.desc} {pkg.price})</span>
                    </span>
                  </label>
                ))}
              </div>

              {status === "error" && (
                <p className="text-red-300 text-sm text-center">Bir hata oluştu, lütfen tekrar deneyin.</p>
              )}

              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full bg-green-500 hover:bg-green-600 text-white font-black py-4 rounded-xl transition-colors disabled:opacity-60 text-base tracking-widest uppercase shadow-lg mt-2"
              >
                {status === "loading" ? "Gönderiliyor..." : "Başvuru Gönder"}
              </button>
            </form>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#2e0652] text-white/60 text-center text-xs py-4 border-t border-white/10">
        Copyright© 2026 Dijitürk — Tüm hakları saklıdır.
      </footer>
    </div>
  );
}
