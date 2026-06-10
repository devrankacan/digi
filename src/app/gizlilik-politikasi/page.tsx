import { getSettings } from "@/lib/settings";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default function GizlilikPolitikasiPage() {
  const settings = getSettings();

  return (
    <div style={{ minHeight: "100vh", background: "#0d0b2e", fontFamily: "'Segoe UI', Arial, sans-serif", color: "#fff", display: "flex", flexDirection: "column" }}>
      <style>{`* { box-sizing: border-box; } .desktop-nav { display: none !important; } @media (min-width: 900px) { .desktop-nav { display: flex !important; } } .nav-a { color: rgba(255,255,255,0.85); text-decoration: none; font-size: 13px; font-weight: 600; }`}</style>

      <div style={{ background: "#111827", position: "sticky", top: 0, zIndex: 100 }}>
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

      <main style={{ flex: 1, paddingTop: "70px", paddingBottom: "60px" }}>
        <div style={{ maxWidth: "820px", margin: "0 auto", padding: "0 24px" }}>
          <h1 style={{ fontSize: "30px", fontWeight: 900, marginBottom: "6px" }}>Gizlilik Politikası</h1>
          <div style={{ width: "50px", height: "4px", background: "linear-gradient(90deg, #6b21a8, #c026d3)", borderRadius: "2px", marginBottom: "36px" }} />
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            {[
              { title: "Çerez Kullanımı", content: "Sitemizde deneyiminizi iyileştirmek amacıyla çerezler kullanılmaktadır. Tarayıcı ayarlarınızdan çerezleri devre dışı bırakabilirsiniz; ancak bu durumda bazı özellikler çalışmayabilir." },
              { title: "Veri Güvenliği", content: "Kişisel verileriniz yetkisiz erişime karşı endüstri standardı güvenlik önlemleriyle korunmaktadır. Verilerinize yalnızca yetkili personel erişebilir." },
              { title: "Üçüncü Taraf Bağlantıları", content: "Sitemizde üçüncü taraf web sitelerine bağlantılar bulunabilir. Bu sitelerin gizlilik uygulamalarından sorumluluğumuz bulunmamaktadır." },
              { title: "Politika Güncellemeleri", content: "Bu gizlilik politikası zaman zaman güncellenebilir. Önemli değişiklikler olması durumunda sizi bilgilendireceğiz." },
            ].map(s => (
              <div key={s.title} style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "12px", padding: "24px" }}>
                <h2 style={{ fontSize: "16px", fontWeight: 800, color: "#c084fc", marginBottom: "12px" }}>{s.title}</h2>
                <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.75)", lineHeight: 1.8, margin: 0 }}>{s.content}</p>
              </div>
            ))}
          </div>
        </div>
      </main>

      <footer style={{ background: "#080618", borderTop: "1px solid rgba(255,255,255,0.07)", padding: "20px 24px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", display: "flex", flexWrap: "wrap", gap: "12px", alignItems: "center", justifyContent: "space-between" }}>
          <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "12px", margin: 0 }}>© 2026 {settings.logoText}</p>
          <div style={{ display: "flex", gap: "20px" }}>
            <Link href="/aydinlatma-metni" style={{ color: "rgba(255,255,255,0.5)", fontSize: "13px", textDecoration: "none" }}>Aydınlatma Metni</Link>
            <Link href="/kvkk" style={{ color: "rgba(255,255,255,0.5)", fontSize: "13px", textDecoration: "none" }}>KVKK</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
