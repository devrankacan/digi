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

  const html = `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#f4f4f4;padding:20px;border-radius:8px;">
      <div style="background:#0066cc;padding:16px 20px;border-radius:6px 6px 0 0;">
        <h2 style="color:#fff;margin:0;">Yeni Dijitürk Başvurusu</h2>
      </div>
      <div style="background:#fff;padding:24px;border-radius:0 0 6px 6px;">
        <table style="width:100%;border-collapse:collapse;">
          <tr><td style="padding:8px 0;font-weight:bold;color:#555;width:140px;">Ad Soyad</td><td style="padding:8px 0;">${name}</td></tr>
          <tr style="background:#f9f9f9;"><td style="padding:8px 0;font-weight:bold;color:#555;">Telefon</td><td style="padding:8px 0;">${phone}</td></tr>
          <tr><td style="padding:8px 0;font-weight:bold;color:#555;">E-posta</td><td style="padding:8px 0;">${email || "-"}</td></tr>
          <tr style="background:#f9f9f9;"><td style="padding:8px 0;font-weight:bold;color:#555;">Şehir</td><td style="padding:8px 0;">${city || "-"}</td></tr>
          <tr><td style="padding:8px 0;font-weight:bold;color:#555;">İlgili Paket</td><td style="padding:8px 0;">${pkg || "-"}</td></tr>
          <tr style="background:#f9f9f9;"><td style="padding:8px 0;font-weight:bold;color:#555;">Mesaj</td><td style="padding:8px 0;">${message || "-"}</td></tr>
        </table>
      </div>
    </div>
  `;

  await transporter.sendMail({
    from: `"Dijitürk Kampanya" <${process.env.SMTP_USER}>`,
    to: process.env.TO_EMAIL || process.env.SMTP_USER,
    subject: `Yeni Başvuru: ${name} - ${pkg || "Belirtilmedi"}`,
    html,
  });

  return NextResponse.json({ success: true });
}
