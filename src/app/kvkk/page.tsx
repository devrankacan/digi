import { getSettings } from "@/lib/settings";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default function KvkkPage() {
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
              <Link href="/sporun-yildizi" className="nav-a">Sporun Yıldızı</Link>
              <Link href="/internet-sporun-yildizi" className="nav-a">İnternet+Sporun Yıldızı</Link>
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
          <h1 style={{ fontSize: "30px", fontWeight: 900, marginBottom: "6px" }}>KVKK Bilgilendirmesi</h1>
          <div style={{ width: "50px", height: "4px", background: "linear-gradient(90deg, #6b21a8, #c026d3)", borderRadius: "2px", marginBottom: "10px" }} />
          <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "13px", marginBottom: "36px" }}>6698 Sayılı Kişisel Verilerin Korunması Kanunu</p>

          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            {[
              { title: "Kapsam", content: "Bu metin, 6698 sayılı Kişisel Verilerin Korunması Kanunu (KVKK) kapsamında kişisel verilerinizin korunmasına ilişkin haklarınızı ve şirketimizin yükümlülüklerini açıklamaktadır." },
              { title: "Temel İlkeler", content: "Kişisel verileriniz;\n• Hukuka ve dürüstlük kuralına uygun olarak,\n• Belirli, açık ve meşru amaçlar için,\n• İşlendikleri amaçla bağlantılı ve ölçülü biçimde,\n• Doğru ve güncel şekilde,\n• Gerektiği süre kadar saklanarak işlenmektedir." },
              { title: "Haklarınız", content: "KVKK madde 11 kapsamında;\n• Verilerinizin işlenip işlenmediğini öğrenme,\n• İşlenmişse bilgi talep etme,\n• Amacını öğrenme ve amaca uygunluğunu sorgulama,\n• Aktarıldığı kişileri öğrenme,\n• Düzeltme, silme veya yok edilmesini talep etme,\n• İşlemenin sonuçlarına itiraz etme,\n• Zararın giderilmesini talep etme haklarına sahipsiniz." },
              { title: "Başvuru", content: "Haklarınızı kullanmak için İletişim sayfamızdaki kanallar üzerinden bize yazılı olarak başvurabilirsiniz. Başvurularınız 30 gün içinde sonuçlandırılır." },
            ].map(s => (
              <div key={s.title} style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "12px", padding: "24px" }}>
                <h2 style={{ fontSize: "16px", fontWeight: 800, color: "#c084fc", marginBottom: "12px" }}>{s.title}</h2>
                <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.75)", lineHeight: 1.8, whiteSpace: "pre-line", margin: 0 }}>{s.content}</p>
              </div>
            ))}
          </div>

          <div style={{ marginTop: "28px", textAlign: "center" }}>
            <Link href="/aydinlatma-metni" style={{ color: "#c084fc", fontSize: "14px", textDecoration: "underline" }}>
              Aydınlatma Metnini görüntüle →
            </Link>
          </div>
        </div>
      </main>

      <footer style={{ background: "#080618", borderTop: "1px solid rgba(255,255,255,0.07)", padding: "20px 24px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", display: "flex", flexWrap: "wrap", gap: "12px", alignItems: "center", justifyContent: "space-between" }}>
          <Link href="/" style={{ textDecoration: "none" }}>
            {settings.logo ? <img src={settings.logo} alt={settings.logoText} style={{ maxHeight: "32px", objectFit: "contain", filter: "brightness(0) invert(1)" }} /> : <span style={{ fontSize: "18px", fontWeight: 900, fontStyle: "italic", color: "#fff", fontFamily: "'Arial Black', Impact, sans-serif" }}>{settings.logoText}</span>}
          </Link>
          <div style={{ display: "flex", gap: "20px" }}>
            <Link href="/" style={{ color: "rgba(255,255,255,0.5)", fontSize: "13px", textDecoration: "none" }}>Ana Sayfa</Link>
            <Link href="/aydinlatma-metni" style={{ color: "rgba(255,255,255,0.5)", fontSize: "13px", textDecoration: "none" }}>Aydınlatma Metni</Link>
          </div>
          <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "12px", margin: 0 }}>© 2026 {settings.logoText}</p>
        </div>
      </footer>
    </div>
  );
}
