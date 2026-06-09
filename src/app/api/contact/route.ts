import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

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

  const html = `
<!DOCTYPE html>
<html lang="tr">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f0ebf8;font-family:'Segoe UI',Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f0ebf8;padding:32px 0;">
  <tr><td align="center">
    <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;border-radius:16px;overflow:hidden;box-shadow:0 8px 32px rgba(75,0,130,0.18);">

      <!-- Header -->
      <tr>
        <td style="background:linear-gradient(135deg,#1a0033 0%,#4b0082 60%,#7b2fbe 100%);padding:36px 40px 28px;">
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td>
                <div style="display:inline-block;background:rgba(255,255,255,0.12);border:1px solid rgba(255,255,255,0.25);border-radius:8px;padding:6px 16px;margin-bottom:16px;">
                  <span style="color:#e2c9ff;font-size:11px;font-weight:600;letter-spacing:2px;text-transform:uppercase;">Yeni Başvuru Bildirimi</span>
                </div>
                <h1 style="color:#ffffff;margin:0 0 6px;font-size:26px;font-weight:800;letter-spacing:-0.5px;">dijitürk</h1>
                <p style="color:#c4a8e8;margin:0;font-size:14px;">Online Başvuru Formu — Müşteri Bildirimi</p>
              </td>
              <td align="right" valign="top">
                <div style="background:rgba(255,255,255,0.15);border-radius:50%;width:56px;height:56px;display:inline-block;line-height:56px;text-align:center;font-size:26px;">📋</div>
              </td>
            </tr>
          </table>
        </td>
      </tr>

      <!-- Alert bar -->
      <tr>
        <td style="background:#6d28d9;padding:12px 40px;">
          <p style="margin:0;color:#ede9fe;font-size:13px;font-weight:500;">
            ⏰ &nbsp;Başvuru Zamanı: <strong style="color:#fff;">${now}</strong>
          </p>
        </td>
      </tr>

      <!-- Body -->
      <tr>
        <td style="background:#ffffff;padding:36px 40px;">

          <p style="margin:0 0 24px;color:#4b0082;font-size:15px;font-weight:600;">Müşteri Bilgileri</p>

          <!-- Info cards -->
          <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
            <tr>
              <td width="50%" style="padding:0 8px 16px 0;">
                <div style="background:#f5f0ff;border:1px solid #ddd6fe;border-radius:12px;padding:16px 18px;">
                  <p style="margin:0 0 4px;font-size:11px;color:#7c3aed;font-weight:700;letter-spacing:1px;text-transform:uppercase;">Ad Soyad</p>
                  <p style="margin:0;font-size:15px;color:#1e1b4b;font-weight:700;">${name}</p>
                </div>
              </td>
              <td width="50%" style="padding:0 0 16px 8px;">
                <div style="background:#f5f0ff;border:1px solid #ddd6fe;border-radius:12px;padding:16px 18px;">
                  <p style="margin:0 0 4px;font-size:11px;color:#7c3aed;font-weight:700;letter-spacing:1px;text-transform:uppercase;">Telefon</p>
                  <p style="margin:0;font-size:15px;color:#1e1b4b;font-weight:700;">${phone}</p>
                </div>
              </td>
            </tr>
            <tr>
              <td width="50%" style="padding:0 8px 0 0;">
                <div style="background:#f5f0ff;border:1px solid #ddd6fe;border-radius:12px;padding:16px 18px;">
                  <p style="margin:0 0 4px;font-size:11px;color:#7c3aed;font-weight:700;letter-spacing:1px;text-transform:uppercase;">E-posta</p>
                  <p style="margin:0;font-size:15px;color:#1e1b4b;font-weight:600;">${email || "—"}</p>
                </div>
              </td>
              <td width="50%" style="padding:0 0 0 8px;">
                <div style="background:#f5f0ff;border:1px solid #ddd6fe;border-radius:12px;padding:16px 18px;">
                  <p style="margin:0 0 4px;font-size:11px;color:#7c3aed;font-weight:700;letter-spacing:1px;text-transform:uppercase;">Şehir</p>
                  <p style="margin:0;font-size:15px;color:#1e1b4b;font-weight:600;">${city || "—"}</p>
                </div>
              </td>
            </tr>
          </table>

          <!-- Package highlight -->
          <div style="background:linear-gradient(135deg,#4b0082,#7b2fbe);border-radius:12px;padding:20px 24px;margin-bottom:24px;">
            <p style="margin:0 0 6px;font-size:11px;color:#d8b4fe;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;">Seçilen Paket</p>
            <p style="margin:0;font-size:20px;color:#ffffff;font-weight:800;">${pkg || "Belirtilmedi"}</p>
          </div>

          ${message ? `
          <!-- Message -->
          <div style="background:#faf7ff;border-left:4px solid #7b2fbe;border-radius:0 8px 8px 0;padding:16px 20px;margin-bottom:24px;">
            <p style="margin:0 0 6px;font-size:11px;color:#7c3aed;font-weight:700;letter-spacing:1px;text-transform:uppercase;">Mesaj / Not</p>
            <p style="margin:0;font-size:14px;color:#374151;line-height:1.6;">${message}</p>
          </div>
          ` : ""}

          <!-- CTA -->
          <div style="text-align:center;padding:8px 0 4px;">
            <a href="tel:${phone}" style="display:inline-block;background:linear-gradient(135deg,#4b0082,#7b2fbe);color:#fff;text-decoration:none;font-weight:700;font-size:14px;padding:14px 36px;border-radius:50px;letter-spacing:0.5px;">
              📞 Müşteriyi Ara
            </a>
          </div>

        </td>
      </tr>

      <!-- Footer -->
      <tr>
        <td style="background:#1a0033;padding:20px 40px;">
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td>
                <p style="margin:0;color:#7c5faa;font-size:12px;">© 2026 <strong style="color:#a78bca;">Dijitürk</strong> — Otomatik sistem bildirimi</p>
              </td>
              <td align="right">
                <p style="margin:0;color:#7c5faa;font-size:11px;">dijiturkabonelig.com</p>
              </td>
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
