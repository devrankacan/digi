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
  const baseUrl = process.env.SITE_URL || "http://158.220.115.16";
  const logoHtml = settings.logo
    ? `<img src="${baseUrl}${settings.logo}" alt="${settings.logoText || "dijitürk"}" style="max-height:48px;max-width:160px;object-fit:contain;display:block;" />`
    : `<span style="font-size:26px;font-weight:900;font-style:italic;color:#ffffff;font-family:Arial Black,Arial,sans-serif;">${settings.logoText || "dijitürk"}</span>`;

  const html = `
<!DOCTYPE html>
<html lang="tr" xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <meta name="color-scheme" content="light">
  <meta name="supported-color-schemes" content="light">
  <style>
    :root { color-scheme: light only; }
    body { background-color: #f0f0f0 !important; color: #111111 !important; }
  </style>
</head>
<body style="margin:0;padding:0;background-color:#f0f0f0 !important;font-family:'Segoe UI',Arial,sans-serif;color:#111111 !important;" bgcolor="#f0f0f0">
<table width="100%" cellpadding="0" cellspacing="0" bgcolor="#f0f0f0" style="background-color:#f0f0f0 !important;padding:28px 0;">
  <tr><td align="center">
    <table width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;border-radius:14px;overflow:hidden;box-shadow:0 6px 30px rgba(0,0,0,0.18);">

      <!-- Header (mor - her zaman renkli) -->
      <tr>
        <td bgcolor="#400442" style="background-color:#400442 !important;padding:28px 32px 20px;">
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td valign="middle">${logoHtml}</td>
              <td align="right" valign="middle">
                <span style="display:inline-block;background-color:#ffffff;border-radius:20px;padding:5px 14px;font-size:11px;font-weight:800;color:#400442;letter-spacing:1px;text-transform:uppercase;">YENİ BAŞVURU</span>
              </td>
            </tr>
            <tr>
              <td colspan="2" style="padding-top:12px;">
                <p style="margin:0;font-size:12px;color:#ddbbff;">Online Başvuru Formu — Müşteri Bildirimi</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>

      <!-- Zaman barı -->
      <tr>
        <td bgcolor="#621e65" style="background-color:#621e65 !important;padding:9px 32px;">
          <p style="margin:0;font-size:12px;color:#ffffff !important;">⏰ &nbsp;Başvuru Zamanı: <strong style="color:#ffffff !important;">${now}</strong></p>
        </td>
      </tr>

      <!-- Gövde — açık arka plan, koyu yazı -->
      <tr>
        <td bgcolor="#ffffff" style="background-color:#ffffff !important;padding:28px 32px;">

          <p style="margin:0 0 18px;font-size:13px;font-weight:800;color:#400442 !important;text-transform:uppercase;letter-spacing:1.5px;border-bottom:2px solid #ddd6fe;padding-bottom:10px;">Müşteri Bilgileri</p>

          <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:18px;">
            <tr>
              <td width="50%" style="padding:0 6px 10px 0;">
                <table width="100%" cellpadding="0" cellspacing="0">
                  <tr><td bgcolor="#f3e8ff" style="background-color:#f3e8ff !important;border-radius:10px;padding:12px 14px;">
                    <p style="margin:0 0 4px;font-size:10px;font-weight:800;color:#6b21a8 !important;letter-spacing:1px;text-transform:uppercase;">AD SOYAD</p>
                    <p style="margin:0;font-size:15px;font-weight:800;color:#1a0033 !important;">${name}</p>
                  </td></tr>
                </table>
              </td>
              <td width="50%" style="padding:0 0 10px 6px;">
                <table width="100%" cellpadding="0" cellspacing="0">
                  <tr><td bgcolor="#f3e8ff" style="background-color:#f3e8ff !important;border-radius:10px;padding:12px 14px;">
                    <p style="margin:0 0 4px;font-size:10px;font-weight:800;color:#6b21a8 !important;letter-spacing:1px;text-transform:uppercase;">TELEFON</p>
                    <p style="margin:0;font-size:15px;font-weight:800;color:#1a0033 !important;">${phone}</p>
                  </td></tr>
                </table>
              </td>
            </tr>
            <tr>
              <td width="50%" style="padding:0 6px 0 0;">
                <table width="100%" cellpadding="0" cellspacing="0">
                  <tr><td bgcolor="#f3e8ff" style="background-color:#f3e8ff !important;border-radius:10px;padding:12px 14px;">
                    <p style="margin:0 0 4px;font-size:10px;font-weight:800;color:#6b21a8 !important;letter-spacing:1px;text-transform:uppercase;">E-POSTA</p>
                    <p style="margin:0;font-size:14px;font-weight:700;color:#1a0033 !important;">${email || "—"}</p>
                  </td></tr>
                </table>
              </td>
              <td width="50%" style="padding:0 0 0 6px;">
                <table width="100%" cellpadding="0" cellspacing="0">
                  <tr><td bgcolor="#f3e8ff" style="background-color:#f3e8ff !important;border-radius:10px;padding:12px 14px;">
                    <p style="margin:0 0 4px;font-size:10px;font-weight:800;color:#6b21a8 !important;letter-spacing:1px;text-transform:uppercase;">ŞEHİR</p>
                    <p style="margin:0;font-size:14px;font-weight:700;color:#1a0033 !important;">${city || "—"}</p>
                  </td></tr>
                </table>
              </td>
            </tr>
          </table>

          <!-- Paket -->
          <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:18px;">
            <tr>
              <td bgcolor="#400442" style="background-color:#400442 !important;border-radius:12px;padding:16px 20px;">
                <p style="margin:0 0 4px;font-size:10px;font-weight:800;color:#ddbbff !important;letter-spacing:2px;text-transform:uppercase;">SEÇİLEN PAKET</p>
                <p style="margin:0;font-size:20px;font-weight:900;color:#ffffff !important;">${pkg || "Belirtilmedi"}</p>
              </td>
            </tr>
          </table>

          ${message ? `
          <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:18px;">
            <tr>
              <td bgcolor="#fdf4ff" style="background-color:#fdf4ff !important;border-left:4px solid #9333ea;border-radius:0 10px 10px 0;padding:12px 16px;">
                <p style="margin:0 0 4px;font-size:10px;font-weight:800;color:#6b21a8 !important;letter-spacing:1px;text-transform:uppercase;">MESAJ / NOT</p>
                <p style="margin:0;font-size:14px;color:#111111 !important;line-height:1.6;">${message}</p>
              </td>
            </tr>
          </table>
          ` : ""}

          <!-- CTA -->
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td align="center" style="padding-top:6px;">
                <a href="tel:${phone}" style="display:inline-block;background-color:#400442;color:#ffffff !important;text-decoration:none;font-weight:800;font-size:15px;padding:13px 38px;border-radius:50px;">
                  📞 Müşteriyi Ara
                </a>
              </td>
            </tr>
          </table>

        </td>
      </tr>

      <!-- Footer -->
      <tr>
        <td bgcolor="#1a0028" style="background-color:#1a0028 !important;padding:16px 32px;">
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td><p style="margin:0;font-size:12px;color:#c4b5fd !important;">© 2026 <strong style="color:#e9d5ff !important;">Dijitürk</strong> — Otomatik sistem bildirimi</p></td>
              <td align="right"><p style="margin:0;font-size:11px;color:#9d7fc0 !important;">dijiturkabonelig.com</p></td>
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
