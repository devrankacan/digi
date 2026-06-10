import { getSettings } from "@/lib/settings";
import Link from "next/link";

export const dynamic = "force-dynamic";

const sections = [
  {
    title: "1. Veri Sorumlusu",
    content: `Bu aydınlatma metni, 6698 sayılı Kişisel Verilerin Korunması Kanunu ("KVKK") kapsamında veri sorumlusu sıfatıyla hareket eden şirketimiz tarafından hazırlanmıştır. Şirketimiz, Dijitürk yetkili satış ortağı olarak faaliyet göstermektedir.`,
  },
  {
    title: "2. İşlenen Kişisel Veriler",
    content: `Sitemiz üzerinden başvuru formunu doldurduğunuzda aşağıdaki kişisel verileriniz işlenmektedir:\n• Ad ve Soyadı\n• Telefon Numarası\n• E-posta Adresi (varsa)\n• Seçilen Paket Bilgisi\n• İletişim Tercihleri`,
  },
  {
    title: "3. Kişisel Verilerin İşlenme Amaçları",
    content: `Toplanan kişisel verileriniz;\n• Dijitürk abonelik başvurunuzun oluşturulması ve takibi,\n• Talep ettiğiniz hizmetlere ilişkin bilgilendirme yapılması,\n• Müşteri temsilcisi tarafından sizi araması,\n• Yasal yükümlülüklerin yerine getirilmesi\namaçlarıyla işlenmektedir.`,
  },
  {
    title: "4. Kişisel Verilerin Aktarılması",
    content: `Kişisel verileriniz; Dijitürk (D-Smart) ana bayi ve yetkili kurumlarla, yasal zorunluluk hâlinde kamu kurum ve kuruluşlarıyla paylaşılabilir. Üçüncü taraf reklam veya pazarlama şirketleriyle açık rızanız olmaksızın paylaşılmaz.`,
  },
  {
    title: "5. Kişisel Verilerin Toplanma Yöntemi ve Hukuki Sebebi",
    content: `Kişisel verileriniz, web sitemizde yer alan başvuru formu aracılığıyla elektronik ortamda toplanmaktadır. İşlemenin hukuki dayanağı; sözleşmenin kurulması ve ifası ile meşru menfaat ilkesidir.`,
  },
  {
    title: "6. Veri Sahibinin Hakları",
    content: `KVKK'nın 11. maddesi uyarınca aşağıdaki haklara sahipsiniz:\n• Kişisel verilerinizin işlenip işlenmediğini öğrenme,\n• İşlenmişse bilgi talep etme,\n• İşlenme amacını ve amacına uygun kullanılıp kullanılmadığını öğrenme,\n• Yurt içinde veya yurt dışında aktarıldığı üçüncü kişileri bilme,\n• Eksik veya yanlış işlenmişse düzeltilmesini isteme,\n• Silinmesini veya yok edilmesini isteme,\n• İşlemenin otomatik sistemle gerçekleşmesi durumunda aleyhe çıkan sonuca itiraz etme,\n• Zararınızın tazminini talep etme.`,
  },
  {
    title: "7. İletişim",
    content: `Haklarınızı kullanmak veya daha fazla bilgi almak için iletişim sayfamızdan bize ulaşabilirsiniz. Başvurularınız en geç 30 gün içinde yanıtlanacaktır.`,
  },
];

export default function AydinlatmaMetniPage() {
  const settings = getSettings();
  const phoneDisplay = (settings.contact as Record<string, unknown>).phone as string || settings.contact.whatsappDisplay || "";

  return (
    <div style={{ minHeight: "100vh", background: "#0d0b2e", fontFamily: "'Segoe UI', Arial, sans-serif", color: "#fff", display: "flex", flexDirection: "column" }}>
      <style>{`* { box-sizing: border-box; } .top-bar { display: none; } @media (min-width: 768px) { .top-bar { display: flex !important; } } .desktop-nav { display: none !important; } @media (min-width: 900px) { .desktop-nav { display: flex !important; } } .nav-a { color: rgba(255,255,255,0.85); text-decoration: none; font-size: 13px; font-weight: 600; } .nav-a:hover { color: #fff; }`}</style>

      {/* HEADER */}
      <div style={{ background: "#111827", position: "sticky", top: 0, zIndex: 100 }}>
        <div className="top-bar" style={{ justifyContent: "space-between", alignItems: "center", padding: "6px 20px", fontSize: "12px", color: "rgba(255,255,255,0.6)", maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ display: "flex", gap: "20px" }}>{phoneDisplay && <span>📞 {phoneDisplay}</span>}</div>
          <span>Dijitürk Resmi Satış Ortağıdır</span>
        </div>
        <div style={{ maxWidth: "1160px", margin: "0 auto", padding: "4px 16px 0", transform: "translateY(15%)" }}>
          <div style={{ background: "linear-gradient(90deg, #3b0764 0%, #6b21a8 40%, #a21caf 75%, #c026d3 100%)", borderRadius: "16px", padding: "0 24px", display: "flex", alignItems: "center", height: "80px", gap: "24px", boxShadow: "0 4px 24px rgba(0,0,0,0.4)" }}>
            <Link href="/" style={{ flexShrink: 0, textDecoration: "none" }}>
              {settings.logo ? <img src={settings.logo} alt={settings.logoText} style={{ maxHeight: "46px", maxWidth: "150px", objectFit: "contain" }} /> : <span style={{ fontSize: "28px", fontWeight: 900, fontStyle: "italic", color: "#e41738", fontFamily: "'Arial Black', Impact, sans-serif" }}>{settings.logoText}</span>}
            </Link>
            <nav className="desktop-nav" style={{ gap: "18px", alignItems: "center", flex: 1 }}>
              <Link href="/" className="nav-a">Ana Sayfa</Link>
              <Link href="/hakkimizda" className="nav-a">Hakkımızda</Link>
              <Link href="/iletisim" className="nav-a">İletişim</Link>
            </nav>
            <Link href="/" style={{ background: "transparent", color: "#fff", border: "2px solid rgba(255,255,255,0.5)", padding: "9px 24px", borderRadius: "9999px", fontWeight: 700, fontSize: "14px", textDecoration: "none", whiteSpace: "nowrap", flexShrink: 0 }}>Ana Sayfa</Link>
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <main style={{ flex: 1, paddingTop: "70px", paddingBottom: "60px" }}>
        <div style={{ maxWidth: "820px", margin: "0 auto", padding: "0 24px" }}>
          <h1 style={{ fontSize: "30px", fontWeight: 900, marginBottom: "6px" }}>Aydınlatma Metni</h1>
          <div style={{ width: "50px", height: "4px", background: "linear-gradient(90deg, #6b21a8, #c026d3)", borderRadius: "2px", marginBottom: "10px" }} />
          <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "13px", marginBottom: "36px" }}>Son güncelleme: Ocak 2026</p>

          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            {sections.map((s) => (
              <div key={s.title} style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "12px", padding: "24px" }}>
                <h2 style={{ fontSize: "16px", fontWeight: 800, color: "#c084fc", marginBottom: "12px" }}>{s.title}</h2>
                <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.75)", lineHeight: 1.8, whiteSpace: "pre-line", margin: 0 }}>{s.content}</p>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* FOOTER */}
      <footer style={{ background: "#080618", borderTop: "1px solid rgba(255,255,255,0.07)", padding: "20px 24px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", display: "flex", flexWrap: "wrap", gap: "12px", alignItems: "center", justifyContent: "space-between" }}>
          <Link href="/" style={{ textDecoration: "none" }}>
            {settings.logo ? <img src={settings.logo} alt={settings.logoText} style={{ maxHeight: "32px", objectFit: "contain", filter: "brightness(0) invert(1)" }} /> : <span style={{ fontSize: "18px", fontWeight: 900, fontStyle: "italic", color: "#fff", fontFamily: "'Arial Black', Impact, sans-serif" }}>{settings.logoText}</span>}
          </Link>
          <div style={{ display: "flex", gap: "20px" }}>
            <Link href="/" style={{ color: "rgba(255,255,255,0.5)", fontSize: "13px", textDecoration: "none" }}>Ana Sayfa</Link>
            <Link href="/iletisim" style={{ color: "rgba(255,255,255,0.5)", fontSize: "13px", textDecoration: "none" }}>İletişim</Link>
            <Link href="/kvkk" style={{ color: "rgba(255,255,255,0.5)", fontSize: "13px", textDecoration: "none" }}>KVKK</Link>
          </div>
          <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "12px", margin: 0 }}>© 2026 {settings.logoText}</p>
        </div>
      </footer>
    </div>
  );
}
