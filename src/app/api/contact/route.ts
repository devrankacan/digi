import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { getSettings } from "@/lib/settings";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, phone, email, city, package: pkg, message } = body;

  if (!name || !phone) {
    return NextResponse.json({ error: "Ad ve telefon zorunludur." }, { status: 400 });
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const now = new Date().toLocaleString("tr-TR", { timeZone: "Europe/Istanbul" });
  const settings = getSettings();
  const logoHtml = settings.logo
    ? `<img src="https://158.220.115.16${settings.logo}" alt="Logo" style="max-height:52px;object-fit:contain;display:block;" />`
    : `<span style="font-size:28px;font-weight:900;font-style:italic;color:#fff;font-family:Arial Black,sans-serif;">${settings.logoText || "dijitürk"}</span>`;

  const html = `
<!DOCTYPE html>
<html lang="tr">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f3f4f6;font-family:'Segoe UI',Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f3f4f6;padding:32px 0;">
  <tr><td align="center">
    <table width="580" cellpadding="0" cellspacing="0" style="max-width:580px;width:100%;border-radius:16px;overflow:hidden;box-shadow:0 8px 40px rgba(0,0,0,0.15);">

      <!-- Header -->
      <tr>
        <td style="background:linear-gradient(135deg,#400442 0%,#621e65 60%,#7b2fbe 100%);padding:32px 36px 24px;">
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td valign="middle">${logoHtml}</td>
              <td align="right" valign="middle">
                <div style="background:rgba(255,255,255,0.15);border:1px solid rgba(255,255,255,0.3);border-radius:20px;padding:6px 14px;display:inline-block;">
                  <span style="color:#fff;font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;">Yeni Başvuru</span>
                </div>
              </td>
            </tr>
            <tr><td colspan="2" style="padding-top:16px;">
              <p style="margin:0;color:#e9d5ff;font-size:13px;">Online Başvuru Formu — Müşteri Bildirimi</p>
            </td></tr>
          </table>
        </td>
      </tr>

      <!-- Zaman barı -->
      <tr>
        <td style="background:#451f46;padding:10px 36px;">
          <p style="margin:0;color:#e9d5ff;font-size:12px;">⏰ &nbsp;Başvuru Zamanı: <strong style="color:#fff;">${now}</strong></p>
        </td>
      </tr>

      <!-- Gövde -->
      <tr>
        <td style="background:#ffffff;padding:32px 36px;">

          <p style="margin:0 0 20px;color:#400442;font-size:14px;font-weight:700;text-transform:uppercase;letter-spacing:1px;border-bottom:2px solid #f0e6ff;padding-bottom:10px;">Müşteri Bilgileri</p>

          <!-- Kartlar -->
          <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:20px;">
            <tr>
              <td width="50%" style="padding:0 8px 12px 0;">
                <div style="background:#faf5ff;border:1.5px solid #e9d5ff;border-radius:10px;padding:14px 16px;">
                  <p style="margin:0 0 3px;font-size:10px;color:#9333ea;font-weight:700;letter-spacing:1px;text-transform:uppercase;">Ad Soyad</p>
                  <p style="margin:0;font-size:16px;color:#1a0033;font-weight:800;">${name}</p>
                </div>
              </td>
              <td width="50%" style="padding:0 0 12px 8px;">
                <div style="background:#faf5ff;border:1.5px solid #e9d5ff;border-radius:10px;padding:14px 16px;">
                  <p style="margin:0 0 3px;font-size:10px;color:#9333ea;font-weight:700;letter-spacing:1px;text-transform:uppercase;">Telefon</p>
                  <p style="margin:0;font-size:16px;color:#1a0033;font-weight:800;">${phone}</p>
                </div>
              </td>
            </tr>
            <tr>
              <td width="50%" style="padding:0 8px 0 0;">
                <div style="background:#faf5ff;border:1.5px solid #e9d5ff;border-radius:10px;padding:14px 16px;">
                  <p style="margin:0 0 3px;font-size:10px;color:#9333ea;font-weight:700;letter-spacing:1px;text-transform:uppercase;">E-posta</p>
                  <p style="margin:0;font-size:15px;color:#1a0033;font-weight:700;">${email || "—"}</p>
                </div>
              </td>
              <td width="50%" style="padding:0 0 0 8px;">
                <div style="background:#faf5ff;border:1.5px solid #e9d5ff;border-radius:10px;padding:14px 16px;">
                  <p style="margin:0 0 3px;font-size:10px;color:#9333ea;font-weight:700;letter-spacing:1px;text-transform:uppercase;">Şehir</p>
                  <p style="margin:0;font-size:15px;color:#1a0033;font-weight:700;">${city || "—"}</p>
                </div>
              </td>
            </tr>
          </table>

          <!-- Paket -->
          <div style="background:linear-gradient(135deg,#400442 0%,#621e65 100%);border-radius:12px;padding:18px 22px;margin-bottom:20px;">
            <p style="margin:0 0 4px;font-size:10px;color:#e9d5ff;font-weight:700;letter-spacing:2px;text-transform:uppercase;">Seçilen Paket</p>
            <p style="margin:0;font-size:22px;color:#ffffff;font-weight:900;">${pkg || "Belirtilmedi"}</p>
          </div>

          ${message ? `
          <div style="background:#fdfcff;border-left:4px solid #9333ea;border-radius:0 10px 10px 0;padding:14px 18px;margin-bottom:20px;">
            <p style="margin:0 0 4px;font-size:10px;color:#9333ea;font-weight:700;letter-spacing:1px;text-transform:uppercase;">Mesaj / Not</p>
            <p style="margin:0;font-size:14px;color:#1f2937;line-height:1.7;">${message}</p>
          </div>
          ` : ""}

          <!-- CTA -->
          <div style="text-align:center;padding-top:8px;">
            <a href="tel:${phone}" style="display:inline-block;background:linear-gradient(135deg,#400442,#621e65);color:#fff;text-decoration:none;font-weight:800;font-size:15px;padding:14px 40px;border-radius:50px;letter-spacing:0.5px;">
              📞 Müşteriyi Ara
            </a>
          </div>

        </td>
      </tr>

      <!-- Footer -->
      <tr>
        <td style="background:#1a0028;padding:18px 36px;">
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td><p style="margin:0;color:#a78bca;font-size:12px;">© 2026 <strong style="color:#d8b4fe;">Dijitürk</strong> — Otomatik sistem bildirimi</p></td>
              <td align="right"><p style="margin:0;color:#7c5faa;font-size:11px;">dijiturkabonelig.com</p></td>
            </tr>
          </table>
        </td>
      </tr>

    </table>
  </td></tr>
</table>
</body>
</html>
  `;

  await transporter.sendMail({
    from: `"Dijitürk Kampanya" <${process.env.SMTP_USER}>`,
    to: process.env.TO_EMAIL || process.env.SMTP_USER,
    subject: `🔔 Yeni Dijitürk Başvurusu — ${name} | ${pkg || "Paket Seçilmedi"}`,
    html,
  });

  return NextResponse.json({ success: true });
}
