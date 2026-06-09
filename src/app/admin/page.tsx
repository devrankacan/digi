"use client";

import { useState, useEffect, useRef } from "react";
import * as XLSX from "xlsx";

interface Submission {
  id: string;
  date: string;
  name: string;
  phone: string;
  email: string;
  city: string;
  package: string;
  message: string;
}

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

interface About {
  title: string;
  content: string;
  address: string;
  email: string;
  phone: string;
}

interface ContactPage {
  title: string;
  description: string;
  address: string;
  email: string;
  phone: string;
  workingHours: string;
}

interface Settings {
  logo: string | null;
  logoText: string;
  contact: Contact;
  packages: Package[];
  about: About;
  contactPage: ContactPage;
}

const AUTH_HEADER = { Authorization: "Bearer dijiturkadmin" };
const ADMIN_PASSWORD = "dijiturkadmin2026";
const STORAGE_KEY = "adminAuth";

export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [pwInput, setPwInput] = useState("");
  const [pwError, setPwError] = useState(false);
  const [settings, setSettings] = useState<Settings | null>(null);
  const [loading, setLoading] = useState(false);
  const [logoText, setLogoText] = useState("");
  const [packages, setPackages] = useState<Package[]>([]);
  const [contact, setContact] = useState<Contact>({
    whatsapp: "",
    whatsappDisplay: "",
    navLinks: [],
    footerText: "",
  });
  const [about, setAbout] = useState<About>({ title: "", content: "", address: "", email: "", phone: "" });
  const [contactPage, setContactPage] = useState<ContactPage>({ title: "", description: "", address: "", email: "", phone: "", workingHours: "" });
  const [saveMsg, setSaveMsg] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [heroImage, setHeroImage] = useState<string | null>(null);
  const heroFileRef = useRef<HTMLInputElement>(null);
  const [heroUploading, setHeroUploading] = useState(false);
  const [heroFileName, setHeroFileName] = useState("");
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [subLoading, setSubLoading] = useState(false);
  const [selectedFileName, setSelectedFileName] = useState("");

  useEffect(() => {
    const token = localStorage.getItem(STORAGE_KEY);
    if (token === ADMIN_PASSWORD) {
      setAuthed(true);
    }
  }, []);

  useEffect(() => {
    if (authed) { fetchSettings(); fetchSubmissions(); }
  }, [authed]);

  async function fetchSettings() {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/settings", { headers: AUTH_HEADER });
      const data: Settings = await res.json();
      setSettings(data);
      setLogoText(data.logoText);
      setPackages(data.packages);
      setContact(data.contact);
      setAbout(data.about);
      setContactPage(data.contactPage);
      setHeroImage((data as unknown as Record<string, unknown>).heroImage as string | null);
    } finally {
      setLoading(false);
    }
  }

  async function fetchSubmissions() {
    setSubLoading(true);
    try {
      const res = await fetch("/api/admin/submissions", { headers: AUTH_HEADER });
      const data: Submission[] = await res.json();
      setSubmissions(data);
    } finally {
      setSubLoading(false);
    }
  }

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (pwInput === ADMIN_PASSWORD) {
      localStorage.setItem(STORAGE_KEY, ADMIN_PASSWORD);
      setAuthed(true);
      setPwError(false);
    } else {
      setPwError(true);
    }
  }

  function handleLogout() {
    localStorage.removeItem(STORAGE_KEY);
    setAuthed(false);
  }

  async function savePackagesAndLogo() {
    if (!settings) return;
    const updated = { ...settings, logoText, packages };
    const res = await fetch("/api/admin/settings", {
      method: "POST",
      headers: { ...AUTH_HEADER, "Content-Type": "application/json" },
      body: JSON.stringify(updated),
    });
    if (res.ok) {
      setSettings(updated);
      showSaveMsg("Kaydedildi!");
    } else {
      showSaveMsg("Hata oluştu.");
    }
  }

  async function saveContact() {
    if (!settings) return;
    const updated = { ...settings, contact };
    const res = await fetch("/api/admin/settings", {
      method: "POST",
      headers: { ...AUTH_HEADER, "Content-Type": "application/json" },
      body: JSON.stringify(updated),
    });
    if (res.ok) {
      setSettings(updated);
      showSaveMsg("İletişim bilgileri kaydedildi!");
    } else {
      showSaveMsg("Hata oluştu.");
    }
  }

  function showSaveMsg(msg: string) {
    setSaveMsg(msg);
    setTimeout(() => setSaveMsg(""), 2500);
  }

  async function handleLogoUpload() {
    const file = fileRef.current?.files?.[0];
    if (!file) return;
    setUploading(true);
    const fd = new FormData();
    fd.append("file", file);
    const res = await fetch("/api/admin/upload", {
      method: "POST",
      headers: AUTH_HEADER,
      body: fd,
    });
    if (res.ok) {
      const data = await res.json();
      const logoWithBust = `${data.logo}?t=${Date.now()}`;
      setSettings((prev) => prev ? { ...prev, logo: logoWithBust } : prev);
      showSaveMsg("Logo yüklendi!");
    } else {
      showSaveMsg("Logo yüklenemedi.");
    }
    setUploading(false);
    if (fileRef.current) fileRef.current.value = "";
    setSelectedFileName("");
  }

  async function handleHeroUpload() {
    const file = heroFileRef.current?.files?.[0];
    if (!file) return;
    setHeroUploading(true);
    const fd = new FormData();
    fd.append("file", file);
    fd.append("type", "hero");
    const res = await fetch("/api/admin/upload", {
      method: "POST",
      headers: AUTH_HEADER,
      body: fd,
    });
    if (res.ok) {
      const data = await res.json();
      setHeroImage(`${data.url}?t=${Date.now()}`);
      showSaveMsg("Kampanya görseli yüklendi!");
    } else {
      showSaveMsg("Görsel yüklenemedi.");
    }
    setHeroUploading(false);
    if (heroFileRef.current) heroFileRef.current.value = "";
    setHeroFileName("");
  }

  function downloadExcel() {
    const headers = ["Tarih", "Ad Soyad", "Telefon", "E-posta", "Şehir", "Paket", "Mesaj"];
    const rows = submissions.map((s) => [s.date, s.name, s.phone, s.email, s.city, s.package, s.message]);

    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.aoa_to_sheet([headers, ...rows]);

    // Header styling: dark purple bg, white bold text
    const headerStyle = {
      fill: { fgColor: { rgb: "400442" } },
      font: { bold: true, color: { rgb: "FFFFFF" } },
      alignment: { horizontal: "center" },
    };
    headers.forEach((_, colIdx) => {
      const cellRef = XLSX.utils.encode_cell({ r: 0, c: colIdx });
      if (!ws[cellRef]) ws[cellRef] = { v: headers[colIdx], t: "s" };
      ws[cellRef].s = headerStyle;
    });

    // Data row alternating colors
    rows.forEach((row, rowIdx) => {
      const bgColor = rowIdx % 2 === 0 ? "f5f0ff" : "ffffff";
      row.forEach((_, colIdx) => {
        const cellRef = XLSX.utils.encode_cell({ r: rowIdx + 1, c: colIdx });
        if (ws[cellRef]) {
          ws[cellRef].s = { fill: { fgColor: { rgb: bgColor } } };
        }
      });
    });

    // Auto column widths
    const allRows = [headers, ...rows];
    ws["!cols"] = headers.map((_, colIdx) => ({
      wch: Math.max(...allRows.map((r) => String(r[colIdx] ?? "").length)) + 2,
    }));

    XLSX.utils.book_append_sheet(wb, ws, "Başvurular");
    const fileName = `dijiturkaboneleri_${new Date().toISOString().slice(0, 10)}.xlsx`;
    XLSX.writeFile(wb, fileName);
  }

  function addPackage() {
    setPackages([
      ...packages,
      { id: `pkg_${Date.now()}`, label: "", desc: "", price: "" },
    ]);
  }

  function removePackage(idx: number) {
    setPackages(packages.filter((_, i) => i !== idx));
  }

  function updatePackage(idx: number, field: keyof Package, value: string) {
    setPackages(packages.map((p, i) => (i === idx ? { ...p, [field]: value } : p)));
  }

  // Login screen
  if (!authed) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ background: "#5c1294" }}
      >
        <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-sm">
          <h1 className="text-2xl font-black text-center mb-6" style={{ color: "#5c1294" }}>
            Admin Girişi
          </h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Şifre</label>
              <input
                type="password"
                value={pwInput}
                onChange={(e) => setPwInput(e.target.value)}
                placeholder="Admin şifresi"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm text-gray-900 focus:outline-none focus:border-purple-500"
              />
            </div>
            {pwError && (
              <p className="text-red-500 text-sm text-center">Şifre hatalı.</p>
            )}
            <button
              type="submit"
              className="w-full text-white font-bold py-3 rounded-xl transition-colors"
              style={{ background: "#5c1294" }}
            >
              Giriş Yap
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: "#5c1294" }}>
      {/* Top bar */}
      <div className="bg-[#4a0e80] border-b border-white/10 px-4 py-3 flex items-center justify-between">
        <h1 className="text-white font-black text-lg tracking-wide">Dijitürk Admin</h1>
        <button
          onClick={handleLogout}
          className="text-white/70 hover:text-white text-sm border border-white/20 px-3 py-1 rounded-lg transition-colors"
        >
          Çıkış
        </button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-24">
          <div className="text-white text-lg">Yükleniyor...</div>
        </div>
      ) : (
        <div className="max-w-2xl mx-auto px-4 py-8 space-y-6">
          {saveMsg && (
            <div className="bg-green-500 text-white text-center font-bold py-2 px-4 rounded-xl shadow">
              {saveMsg}
            </div>
          )}

          {/* Logo Section */}
          <div className="bg-white rounded-2xl shadow p-6">
            <h2 className="text-lg font-black mb-4" style={{ color: "#5c1294" }}>
              Logo
            </h2>
            <div className="flex items-center gap-4 mb-4">
              {settings?.logo ? (
                <img
                  src={settings.logo}
                  alt="Logo"
                  className="max-h-16 object-contain border border-gray-200 rounded-lg p-1"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                />
              ) : (
                <div className="text-gray-400 text-sm border border-dashed border-gray-300 rounded-lg px-4 py-3">
                  Henüz logo yüklenmedi
                </div>
              )}
            </div>
            <div className="flex items-center gap-2 mb-4">
              <label className="flex-1 cursor-pointer">
                <div className="border border-gray-300 rounded-xl px-3 py-2 text-sm text-gray-500 bg-gray-50 hover:bg-gray-100 transition-colors truncate">
                  {selectedFileName || "Resim seçin (PNG, JPG, SVG)"}
                </div>
                <input
                  type="file"
                  accept="image/*"
                  ref={fileRef}
                  className="hidden"
                  onChange={(e) => setSelectedFileName(e.target.files?.[0]?.name || "")}
                />
              </label>
              <button
                onClick={handleLogoUpload}
                disabled={uploading}
                className="text-white font-bold px-4 py-2 rounded-xl text-sm disabled:opacity-50 transition-colors whitespace-nowrap"
                style={{ background: "#5c1294" }}
              >
                {uploading ? "Yükleniyor..." : "Logo Yükle"}
              </button>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Logo Metni</label>
              <input
                type="text"
                value={logoText}
                onChange={(e) => setLogoText(e.target.value)}
                className="w-full border border-gray-300 rounded-xl px-4 py-2 text-sm text-gray-900 focus:outline-none focus:border-purple-500"
              />
            </div>
          </div>

          {/* Hero Görsel Section */}
          <div className="bg-white rounded-2xl shadow p-6">
            <h2 className="text-lg font-black mb-1" style={{ color: "#5c1294" }}>Kampanya Görseli</h2>
            <p className="text-xs text-gray-400 mb-4">Masaüstünde formun solunda görünür. Mobilde gösterilmez.</p>
            {heroImage && (
              heroImage.includes(".webm") ? (
                <video src={heroImage} className="w-full max-h-48 rounded-xl mb-4 border border-gray-200" autoPlay muted loop playsInline />
              ) : (
                <img
                  src={heroImage}
                  alt="Kampanya Görseli"
                  className="w-full max-h-48 object-cover rounded-xl mb-4 border border-gray-200"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                />
              )
            )}
            <div className="flex items-center gap-2">
              <label className="flex-1 cursor-pointer">
                <div className="border border-gray-300 rounded-xl px-3 py-2 text-sm text-gray-500 bg-gray-50 hover:bg-gray-100 transition-colors truncate">
                  {heroFileName || "Görsel veya Video seçin (PNG, JPG, WEBM)"}
                </div>
                <input
                  type="file"
                  accept="image/*,video/webm"
                  ref={heroFileRef}
                  className="hidden"
                  onChange={(e) => setHeroFileName(e.target.files?.[0]?.name || "")}
                />
              </label>
              <button
                onClick={handleHeroUpload}
                disabled={heroUploading}
                className="text-white font-bold px-4 py-2 rounded-xl text-sm disabled:opacity-50 whitespace-nowrap"
                style={{ background: "#5c1294" }}
              >
                {heroUploading ? "Yükleniyor..." : "Görsel Yükle"}
              </button>
            </div>
          </div>

          {/* Packages Section */}
          <div className="bg-white rounded-2xl shadow p-6">
            <h2 className="text-lg font-black mb-4" style={{ color: "#5c1294" }}>
              Paketler
            </h2>
            <div className="space-y-3">
              {packages.map((pkg, idx) => (
                <div
                  key={pkg.id}
                  className="border border-gray-200 rounded-xl p-3 space-y-2"
                >
                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <label className="block text-xs text-gray-500 mb-0.5 font-medium">Paket Adı</label>
                      <input
                        type="text"
                        value={pkg.label}
                        onChange={(e) => updatePackage(idx, "label", e.target.value)}
                        placeholder="Paket adı"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:border-purple-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-500 mb-0.5 font-medium">Açıklama</label>
                      <input
                        type="text"
                        value={pkg.desc}
                        onChange={(e) => updatePackage(idx, "desc", e.target.value)}
                        placeholder="Açıklama"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:border-purple-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-500 mb-0.5 font-medium">Fiyat</label>
                      <input
                        type="text"
                        value={pkg.price}
                        onChange={(e) => updatePackage(idx, "price", e.target.value)}
                        placeholder="549₺"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:border-purple-500"
                      />
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <button
                      onClick={() => removePackage(idx)}
                      className="text-red-500 hover:text-red-700 text-xs font-semibold px-3 py-1 border border-red-200 rounded-lg transition-colors"
                    >
                      Sil
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex gap-2 mt-4">
              <button
                onClick={addPackage}
                className="flex-1 border-2 border-dashed rounded-xl py-2 text-sm font-semibold transition-colors"
                style={{ borderColor: "#5c1294", color: "#5c1294" }}
              >
                + Yeni Paket Ekle
              </button>
              <button
                onClick={savePackagesAndLogo}
                className="flex-1 text-white font-bold py-2 rounded-xl text-sm transition-colors"
                style={{ background: "#5c1294" }}
              >
                Kaydet
              </button>
            </div>
          </div>

          {/* Contact Section */}
          <div className="bg-white rounded-2xl shadow p-6">
            <h2 className="text-lg font-black mb-4" style={{ color: "#5c1294" }}>
              İletişim
            </h2>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  WhatsApp (API formatı — örn. 905453267076)
                </label>
                <input
                  type="text"
                  value={contact.whatsapp}
                  onChange={(e) => setContact({ ...contact, whatsapp: e.target.value })}
                  placeholder="905453267076"
                  className="w-full border border-gray-300 rounded-xl px-4 py-2 text-sm text-gray-900 focus:outline-none focus:border-purple-500"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  WhatsApp Görünen Numara (örn. 0 545 326 70 76)
                </label>
                <input
                  type="text"
                  value={contact.whatsappDisplay}
                  onChange={(e) => setContact({ ...contact, whatsappDisplay: e.target.value })}
                  placeholder="0 545 326 70 76"
                  className="w-full border border-gray-300 rounded-xl px-4 py-2 text-sm text-gray-900 focus:outline-none focus:border-purple-500"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Footer Metni</label>
                <input
                  type="text"
                  value={contact.footerText}
                  onChange={(e) => setContact({ ...contact, footerText: e.target.value })}
                  placeholder="© 2026 Dijitürk — Tüm hakları saklıdır."
                  className="w-full border border-gray-300 rounded-xl px-4 py-2 text-sm text-gray-900 focus:outline-none focus:border-purple-500"
                />
              </div>
            </div>
            <button
              onClick={saveContact}
              className="mt-4 w-full text-white font-bold py-2 rounded-xl text-sm transition-colors"
              style={{ background: "#5c1294" }}
            >
              Kaydet
            </button>
          </div>

          {/* Hakkımızda Sayfası */}
          <div className="bg-white rounded-2xl shadow p-6">
            <h2 className="text-lg font-black mb-4" style={{ color: "#5c1294" }}>
              Hakkımızda Sayfası
            </h2>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Sayfa Başlığı</label>
                <input
                  type="text"
                  value={about.title}
                  onChange={(e) => setAbout({ ...about, title: e.target.value })}
                  className="w-full border border-gray-300 rounded-xl px-4 py-2 text-sm text-gray-900 focus:outline-none focus:border-purple-500"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">İçerik</label>
                <textarea
                  rows={4}
                  value={about.content}
                  onChange={(e) => setAbout({ ...about, content: e.target.value })}
                  className="w-full border border-gray-300 rounded-xl px-4 py-2 text-sm text-gray-900 focus:outline-none focus:border-purple-500"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Adres</label>
                <input
                  type="text"
                  value={about.address}
                  onChange={(e) => setAbout({ ...about, address: e.target.value })}
                  className="w-full border border-gray-300 rounded-xl px-4 py-2 text-sm text-gray-900 focus:outline-none focus:border-purple-500"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">E-posta</label>
                <input
                  type="text"
                  value={about.email}
                  onChange={(e) => setAbout({ ...about, email: e.target.value })}
                  className="w-full border border-gray-300 rounded-xl px-4 py-2 text-sm text-gray-900 focus:outline-none focus:border-purple-500"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Telefon</label>
                <input
                  type="text"
                  value={about.phone}
                  onChange={(e) => setAbout({ ...about, phone: e.target.value })}
                  className="w-full border border-gray-300 rounded-xl px-4 py-2 text-sm text-gray-900 focus:outline-none focus:border-purple-500"
                />
              </div>
            </div>
            <button
              onClick={async () => {
                if (!settings) return;
                const updated = { ...settings, about };
                const res = await fetch("/api/admin/settings", {
                  method: "POST",
                  headers: { ...AUTH_HEADER, "Content-Type": "application/json" },
                  body: JSON.stringify(updated),
                });
                if (res.ok) { setSettings(updated); showSaveMsg("Hakkımızda kaydedildi!"); }
                else showSaveMsg("Hata oluştu.");
              }}
              className="mt-4 w-full text-white font-bold py-2 rounded-xl text-sm transition-colors"
              style={{ background: "#5c1294" }}
            >
              Kaydet
            </button>
          </div>

          {/* İletişim Sayfası */}
          <div className="bg-white rounded-2xl shadow p-6">
            <h2 className="text-lg font-black mb-4" style={{ color: "#5c1294" }}>
              İletişim Sayfası
            </h2>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Sayfa Başlığı</label>
                <input
                  type="text"
                  value={contactPage.title}
                  onChange={(e) => setContactPage({ ...contactPage, title: e.target.value })}
                  className="w-full border border-gray-300 rounded-xl px-4 py-2 text-sm text-gray-900 focus:outline-none focus:border-purple-500"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Açıklama</label>
                <input
                  type="text"
                  value={contactPage.description}
                  onChange={(e) => setContactPage({ ...contactPage, description: e.target.value })}
                  className="w-full border border-gray-300 rounded-xl px-4 py-2 text-sm text-gray-900 focus:outline-none focus:border-purple-500"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Adres</label>
                <input
                  type="text"
                  value={contactPage.address}
                  onChange={(e) => setContactPage({ ...contactPage, address: e.target.value })}
                  className="w-full border border-gray-300 rounded-xl px-4 py-2 text-sm text-gray-900 focus:outline-none focus:border-purple-500"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">E-posta</label>
                <input
                  type="text"
                  value={contactPage.email}
                  onChange={(e) => setContactPage({ ...contactPage, email: e.target.value })}
                  className="w-full border border-gray-300 rounded-xl px-4 py-2 text-sm text-gray-900 focus:outline-none focus:border-purple-500"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Telefon</label>
                <input
                  type="text"
                  value={contactPage.phone}
                  onChange={(e) => setContactPage({ ...contactPage, phone: e.target.value })}
                  className="w-full border border-gray-300 rounded-xl px-4 py-2 text-sm text-gray-900 focus:outline-none focus:border-purple-500"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Çalışma Saatleri</label>
                <input
                  type="text"
                  value={contactPage.workingHours}
                  onChange={(e) => setContactPage({ ...contactPage, workingHours: e.target.value })}
                  className="w-full border border-gray-300 rounded-xl px-4 py-2 text-sm text-gray-900 focus:outline-none focus:border-purple-500"
                />
              </div>
            </div>
            <button
              onClick={async () => {
                if (!settings) return;
                const updated = { ...settings, contactPage };
                const res = await fetch("/api/admin/settings", {
                  method: "POST",
                  headers: { ...AUTH_HEADER, "Content-Type": "application/json" },
                  body: JSON.stringify(updated),
                });
                if (res.ok) { setSettings(updated); showSaveMsg("İletişim sayfası kaydedildi!"); }
                else showSaveMsg("Hata oluştu.");
              }}
              className="mt-4 w-full text-white font-bold py-2 rounded-xl text-sm transition-colors"
              style={{ background: "#5c1294" }}
            >
              Kaydet
            </button>
          </div>

          {/* Başvurular */}
          <div className="bg-white rounded-2xl shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-lg font-black" style={{ color: "#5c1294" }}>Başvurular</h2>
                <p className="text-xs text-gray-400 mt-0.5">{submissions.length} başvuru</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={fetchSubmissions}
                  className="text-xs border border-gray-300 px-3 py-1.5 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors"
                >
                  Yenile
                </button>
                <button
                  onClick={downloadExcel}
                  disabled={submissions.length === 0}
                  className="text-xs text-white font-bold px-3 py-1.5 rounded-lg transition-colors disabled:opacity-40"
                  style={{ background: "#5c1294" }}
                >
                  Excel İndir
                </button>
              </div>
            </div>

            {subLoading ? (
              <p className="text-center text-gray-400 text-sm py-6">Yükleniyor...</p>
            ) : submissions.length === 0 ? (
              <p className="text-center text-gray-400 text-sm py-6">Henüz başvuru yok.</p>
            ) : (
              <div className="overflow-x-auto -mx-2">
                <table className="w-full text-xs min-w-[600px]">
                  <thead>
                    <tr style={{ background: "#f5f0ff" }}>
                      {["Tarih", "Ad Soyad", "Telefon", "E-posta", "Şehir", "Paket"].map((h) => (
                        <th key={h} className="text-left px-3 py-2 font-bold text-gray-600 whitespace-nowrap first:rounded-l-lg last:rounded-r-lg">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {submissions.map((s, i) => (
                      <tr key={s.id} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                        <td className="px-3 py-2 text-gray-500 whitespace-nowrap">{s.date}</td>
                        <td className="px-3 py-2 font-semibold text-gray-800 whitespace-nowrap">{s.name}</td>
                        <td className="px-3 py-2 text-gray-700 whitespace-nowrap">{s.phone}</td>
                        <td className="px-3 py-2 text-gray-600 whitespace-nowrap">{s.email || "—"}</td>
                        <td className="px-3 py-2 text-gray-600 whitespace-nowrap">{s.city || "—"}</td>
                        <td className="px-3 py-2 whitespace-nowrap">
                          <span className="inline-block px-2 py-0.5 rounded-full text-white text-xs font-bold" style={{ background: "#5c1294" }}>
                            {s.package || "—"}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

        </div>
      )}
    </div>
  );
}
