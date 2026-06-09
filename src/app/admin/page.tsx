"use client";

import { useState, useEffect, useRef } from "react";

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

interface Settings {
  logo: string | null;
  logoText: string;
  contact: Contact;
  packages: Package[];
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
  const [saveMsg, setSaveMsg] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [selectedFileName, setSelectedFileName] = useState("");

  useEffect(() => {
    const token = localStorage.getItem(STORAGE_KEY);
    if (token === ADMIN_PASSWORD) {
      setAuthed(true);
    }
  }, []);

  useEffect(() => {
    if (authed) fetchSettings();
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
    } finally {
      setLoading(false);
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
        </div>
      )}
    </div>
  );
}
