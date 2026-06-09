"use client";

import { useState } from "react";

const packages = [
  {
    name: "DijiTV Başlangıç",
    price: "₺199",
    period: "/ay",
    channels: "150+ Kanal",
    features: ["HD Yayın", "7 Gün Geriye Sarma", "1 Ekran"],
    badge: null,
  },
  {
    name: "DijiTV Plus",
    price: "₺299",
    period: "/ay",
    channels: "250+ Kanal",
    features: ["Full HD Yayın", "30 Gün Geriye Sarma", "3 Ekran", "DijiPlay Erişimi"],
    badge: "Çok Satan",
  },
  {
    name: "DijiTV Premium",
    price: "₺399",
    period: "/ay",
    channels: "400+ Kanal",
    features: ["4K Ultra HD", "30 Gün Geriye Sarma", "5 Ekran", "DijiPlay + Spor Paketi", "Ebeveyn Kilidi"],
    badge: "En İyi",
  },
];

export default function Home() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    city: "",
    package: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus("success");
        setForm({ name: "", phone: "", email: "", city: "", package: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#001f5b] via-[#003399] to-[#0055cc]">
      {/* Header */}
      <header className="px-6 py-4 flex items-center justify-between bg-black/20 backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
            <span className="text-[#003399] font-black text-sm">D</span>
          </div>
          <span className="text-white font-bold text-xl tracking-wide">dijitürk</span>
        </div>
        <div className="hidden md:flex gap-6 text-white/80 text-sm">
          <a href="#kampanya" className="hover:text-white transition-colors">Kampanya</a>
          <a href="#paketler" className="hover:text-white transition-colors">Paketler</a>
          <a href="#form" className="hover:text-white transition-colors">Başvur</a>
        </div>
      </header>

      {/* Hero Section */}
      <section className="px-6 py-12 text-center" id="kampanya">
        <div className="inline-block bg-yellow-400 text-black text-xs font-bold px-3 py-1 rounded-full mb-4 tracking-wider uppercase">
          Sınırlı Süre Kampanyası
        </div>
        <h1 className="text-white text-4xl md:text-5xl font-extrabold leading-tight mb-4">
          İlk 3 Ay <span className="text-yellow-400">%50 İndirim</span>
          <br />Dijital TV Keyfini Yaşa!
        </h1>
        <p className="text-white/80 text-lg max-w-xl mx-auto mb-2">
          Türkiye&apos;nin en kapsamlı dijital yayın platformu ile 400&apos;den fazla kanala anında erişin.
        </p>
        <p className="text-yellow-300 text-sm font-semibold">
          Kampanya 30 Haziran 2026&apos;ya kadar geçerlidir.
        </p>
      </section>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-4 pb-16">
        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Left: Packages */}
          <div id="paketler">
            <h2 className="text-white text-2xl font-bold mb-6">Kampanyalı Paketler</h2>
            <div className="space-y-4">
              {packages.map((pkg) => (
                <div
                  key={pkg.name}
                  onClick={() => setForm({ ...form, package: pkg.name })}
                  className={`relative cursor-pointer rounded-2xl p-5 transition-all border-2 ${
                    form.package === pkg.name
                      ? "bg-white border-yellow-400 shadow-xl shadow-yellow-400/20"
                      : "bg-white/10 border-white/20 hover:bg-white/20"
                  }`}
                >
                  {pkg.badge && (
                    <span className="absolute top-4 right-4 bg-yellow-400 text-black text-xs font-bold px-2 py-0.5 rounded-full">
                      {pkg.badge}
                    </span>
                  )}
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3
                        className={`font-bold text-lg ${
                          form.package === pkg.name ? "text-[#003399]" : "text-white"
                        }`}
                      >
                        {pkg.name}
                      </h3>
                      <p
                        className={`text-sm ${
                          form.package === pkg.name ? "text-gray-500" : "text-white/60"
                        }`}
                      >
                        {pkg.channels}
                      </p>
                    </div>
                    <div className="text-right">
                      <span
                        className={`text-2xl font-extrabold ${
                          form.package === pkg.name ? "text-[#003399]" : "text-yellow-400"
                        }`}
                      >
                        {pkg.price}
                      </span>
                      <span
                        className={`text-sm ${
                          form.package === pkg.name ? "text-gray-500" : "text-white/60"
                        }`}
                      >
                        {pkg.period}
                      </span>
                    </div>
                  </div>
                  <ul className="space-y-1">
                    {pkg.features.map((f) => (
                      <li
                        key={f}
                        className={`text-sm flex items-center gap-2 ${
                          form.package === pkg.name ? "text-gray-700" : "text-white/80"
                        }`}
                      >
                        <span className="text-green-400 text-base">✓</span> {f}
                      </li>
                    ))}
                  </ul>
                  {form.package === pkg.name && (
                    <div className="mt-3 text-[#003399] text-xs font-semibold">
                      ✔ Seçildi — aşağıdaki formu doldurun
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Why Dijitürk */}
            <div className="mt-8 grid grid-cols-2 gap-3">
              {[
                { icon: "📡", title: "Kesintisiz Yayın", desc: "Yüksek hızlı altyapı" },
                { icon: "🔒", title: "Güvenli Ödeme", desc: "SSL korumalı işlemler" },
                { icon: "📱", title: "Her Cihazda", desc: "TV, tablet, telefon" },
                { icon: "🎧", title: "7/24 Destek", desc: "Müşteri hizmetleri" },
              ].map((item) => (
                <div key={item.title} className="bg-white/10 rounded-xl p-4 text-white">
                  <div className="text-2xl mb-1">{item.icon}</div>
                  <div className="font-semibold text-sm">{item.title}</div>
                  <div className="text-white/60 text-xs">{item.desc}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Form */}
          <div id="form" className="bg-white rounded-3xl shadow-2xl p-8">
            <div className="mb-6">
              <h2 className="text-[#003399] text-2xl font-bold">Hemen Başvur</h2>
              <p className="text-gray-500 text-sm mt-1">
                Temsilcimiz en kısa sürede sizi arayacaktır.
              </p>
            </div>

            {status === "success" ? (
              <div className="text-center py-12">
                <div className="text-5xl mb-4">🎉</div>
                <h3 className="text-[#003399] text-xl font-bold mb-2">Başvurunuz Alındı!</h3>
                <p className="text-gray-500 text-sm">
                  Müşteri temsilcimiz en kısa sürede sizi arayacak.
                </p>
                <button
                  onClick={() => setStatus("idle")}
                  className="mt-6 text-[#003399] underline text-sm"
                >
                  Yeni başvuru yap
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Ad Soyad *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Adınız Soyadınız"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#003399] focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Telefon *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="05XX XXX XX XX"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#003399] focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">E-posta</label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="ornek@email.com"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#003399] focus:border-transparent"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Şehir</label>
                    <input
                      type="text"
                      name="city"
                      value={form.city}
                      onChange={handleChange}
                      placeholder="İstanbul"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#003399] focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      İlgili Paket
                    </label>
                    <select
                      name="package"
                      value={form.package}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#003399] focus:border-transparent bg-white"
                    >
                      <option value="">Seçiniz</option>
                      {packages.map((p) => (
                        <option key={p.name} value={p.name}>
                          {p.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Mesaj / Notunuz
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={3}
                    placeholder="Eklemek istediğiniz bilgiler..."
                    className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#003399] focus:border-transparent resize-none"
                  />
                </div>

                {status === "error" && (
                  <p className="text-red-500 text-sm">Bir hata oluştu, lütfen tekrar deneyin.</p>
                )}

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full bg-[#003399] hover:bg-[#002277] text-white font-bold py-3 rounded-xl transition-colors disabled:opacity-60 text-sm tracking-wide"
                >
                  {status === "loading" ? "Gönderiliyor..." : "Başvuruyu Gönder"}
                </button>

                <p className="text-center text-xs text-gray-400">
                  Başvurunuz güvenli bir şekilde iletilecektir. Kişisel verileriniz üçüncü
                  şahıslarla paylaşılmaz.
                </p>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black/30 text-white/50 text-center text-xs py-6">
        © 2026 Dijitürk. Tüm hakları saklıdır.
      </footer>
    </main>
  );
}
