// SMTP delivery for the contact form: one notification to the business inbox
// and (optionally) an automatic acknowledgement to the customer.
//
// Server-only — imported exclusively from server functions.
import nodemailer, { type Transporter } from "nodemailer";
import { serverEnv } from "./env";
import { ADDRESS_LINES, PHONE, PHONE_DISPLAY, SITE_NAME, SITE_URL, WHATSAPP } from "./site";

export type Inquiry = {
  name: string;
  phone: string;
  email?: string | undefined;
  location?: string | undefined;
  service: string;
  message?: string | undefined;
};

export type MailResult = {
  notificationSent: boolean;
  autoReplySent: boolean;
};

const BRAND = SITE_NAME;
const BRAND_COLOR = "#0e7490";
const SITE = () => serverEnv("SITE_URL") ?? SITE_URL;
const BUSINESS_PHONE = PHONE_DISPLAY;
const BUSINESS_TEL = PHONE;
const ADDRESS = ADDRESS_LINES;

let transport: Transporter | undefined;

export function isSmtpConfigured(): boolean {
  return Boolean(serverEnv("SMTP_HOST") && serverEnv("SMTP_USER") && serverEnv("SMTP_PASS"));
}

function getTransport(): Transporter {
  if (transport) return transport;
  if (!isSmtpConfigured()) {
    throw new Error("SMTP is not configured (SMTP_HOST / SMTP_USER / SMTP_PASS missing)");
  }
  const port = Number(serverEnv("SMTP_PORT") ?? "587");
  const secure = (serverEnv("SMTP_SECURE") ?? String(port === 465)).toLowerCase() === "true";
  transport = nodemailer.createTransport({
    host: serverEnv("SMTP_HOST"),
    port,
    secure,
    auth: {
      user: serverEnv("SMTP_USER"),
      pass: serverEnv("SMTP_PASS"),
    },
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    socketTimeout: 20_000,
  });
  return transport;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function shell(title: string, body: string): string {
  return `<!doctype html>
<html lang="en">
  <body style="margin:0;padding:0;background:#f4f7f8;font-family:Arial,Helvetica,sans-serif;color:#1f2937;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f4f7f8;padding:24px 12px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border-radius:16px;overflow:hidden;border:1px solid #e5e7eb;">
            <tr>
              <td style="background:${BRAND_COLOR};padding:20px 28px;">
                <div style="font-size:18px;font-weight:bold;color:#ffffff;letter-spacing:0.5px;">${BRAND}</div>
                <div style="font-size:12px;color:#d5f0f5;margin-top:4px;">Professional Pest Control · Chennai</div>
              </td>
            </tr>
            <tr>
              <td style="padding:28px;">
                <h1 style="margin:0 0 16px;font-size:20px;color:#111827;">${title}</h1>
                ${body}
              </td>
            </tr>
            <tr>
              <td style="padding:18px 28px;background:#f9fafb;border-top:1px solid #e5e7eb;font-size:12px;color:#6b7280;line-height:1.7;">
                <div><strong>${BRAND}</strong></div>
                <div>${ADDRESS.join("<br />")}</div>
                <div style="margin-top:6px;">
                  <a href="tel:${BUSINESS_TEL}" style="color:${BRAND_COLOR};text-decoration:none;">${BUSINESS_PHONE}</a>
                  &nbsp;·&nbsp;
                  <a href="${WHATSAPP}" style="color:${BRAND_COLOR};text-decoration:none;">WhatsApp</a>
                  &nbsp;·&nbsp;
                  <a href="${SITE()}" style="color:${BRAND_COLOR};text-decoration:none;">${SITE().replace(/^https?:\/\//, "")}</a>
                </div>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

function detailRow(label: string, value: string): string {
  return `<tr>
    <td style="padding:8px 0;font-size:12px;text-transform:uppercase;letter-spacing:0.5px;color:#6b7280;width:130px;vertical-align:top;">${label}</td>
    <td style="padding:8px 0;font-size:14px;color:#111827;">${escapeHtml(value)}</td>
  </tr>`;
}

function notificationHtml(inquiry: Inquiry): string {
  const rows = [
    detailRow("Name", inquiry.name),
    detailRow("Phone", inquiry.phone),
    inquiry.email ? detailRow("Email", inquiry.email) : "",
    inquiry.location ? detailRow("Location", inquiry.location) : "",
    detailRow("Service", inquiry.service),
    detailRow("Received", new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })),
  ]
    .filter(Boolean)
    .join("");

  const messageBlock = inquiry.message?.trim()
    ? `<p style="margin:16px 0 0;font-size:14px;line-height:1.7;background:#f9fafb;border:1px solid #e5e7eb;border-radius:10px;padding:14px;">${escapeHtml(inquiry.message.trim())}</p>`
    : "";

  const replyBlock = inquiry.email
    ? `<p style="margin:20px 0 0;font-size:13px;color:#6b7280;">A confirmation reply has automatically been sent to ${escapeHtml(inquiry.email)}.</p>`
    : "";

  return shell(
    "New website inquiry",
    `<table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;border-collapse:collapse;">${rows}</table>
     ${messageBlock}
     ${replyBlock}
     <p style="margin:24px 0 0;">
       <a href="${WHATSAPP}?text=${encodeURIComponent(
         `Hi, new inquiry from ${inquiry.name} (${inquiry.phone}) — ${inquiry.service}`,
       )}" style="display:inline-block;background:${BRAND_COLOR};color:#ffffff;text-decoration:none;padding:12px 22px;border-radius:999px;font-size:14px;font-weight:bold;">Reply on WhatsApp</a>
     </p>`,
  );
}

function autoReplyHtml(inquiry: Inquiry): string {
  return shell(
    `Thanks, ${escapeHtml(inquiry.name)} — we received your request`,
    `<p style="margin:0 0 14px;font-size:15px;line-height:1.7;">
       Thank you for contacting <strong>${BRAND}</strong> for
       <strong>${escapeHtml(inquiry.service)}</strong>. Your inquiry has reached our
       team and we will get back to you within <strong>30 minutes</strong> during
       business hours.
     </p>
     <p style="margin:0 0 14px;font-size:15px;line-height:1.7;">
       Need help faster? Call or WhatsApp us — a technician can schedule your
       <strong>free inspection</strong> right away.
     </p>
     <p style="margin:24px 0 0;">
       <a href="tel:${BUSINESS_TEL}" style="display:inline-block;background:${BRAND_COLOR};color:#ffffff;text-decoration:none;padding:12px 22px;border-radius:999px;font-size:14px;font-weight:bold;">Call ${BUSINESS_PHONE}</a>
       <a href="${WHATSAPP}" style="display:inline-block;background:#25d366;color:#ffffff;text-decoration:none;padding:12px 22px;border-radius:999px;font-size:14px;font-weight:bold;margin-left:8px;">WhatsApp Us</a>
     </p>
     <p style="margin:22px 0 0;font-size:13px;color:#6b7280;">
       Reference: ${escapeHtml(inquiry.service)} · ${escapeHtml(inquiry.phone)}
     </p>`,
  );
}

export async function sendInquiryEmails(inquiry: Inquiry): Promise<MailResult> {
  const transport = getTransport();
  const from = serverEnv("SMTP_FROM") || serverEnv("SMTP_USER") || undefined;
  const notifyTo = serverEnv("CONTACT_NOTIFY_TO") || serverEnv("SMTP_USER");

  if (!notifyTo) {
    throw new Error("CONTACT_NOTIFY_TO is not configured");
  }

  const notification = await transport.sendMail({
    from,
    to: notifyTo,
    replyTo: inquiry.email || undefined,
    subject: `[Website Inquiry] ${inquiry.service} — ${inquiry.name}`,
    html: notificationHtml(inquiry),
    text: [
      "New website inquiry",
      `Name: ${inquiry.name}`,
      `Phone: ${inquiry.phone}`,
      inquiry.email ? `Email: ${inquiry.email}` : null,
      inquiry.location ? `Location: ${inquiry.location}` : null,
      `Service: ${inquiry.service}`,
      inquiry.message ? `Message: ${inquiry.message}` : null,
    ]
      .filter(Boolean)
      .join("\n"),
  });

  let autoReplySent = false;
  const autoReplyEnabled = (serverEnv("CONTACT_AUTO_REPLY") ?? "true").toLowerCase() !== "false";
  if (autoReplyEnabled && inquiry.email) {
    try {
      await transport.sendMail({
        from,
        to: inquiry.email,
        subject: `We received your inquiry — ${BRAND}`,
        html: autoReplyHtml(inquiry),
        text: `Hi ${inquiry.name},\n\nThank you for contacting ${BRAND} for ${inquiry.service}. Your inquiry has reached our team and we will get back to you within 30 minutes during business hours.\n\nNeed help faster?\nCall ${BUSINESS_PHONE} or WhatsApp ${WHATSAPP}\n\n— ${BRAND}\n${ADDRESS.join(", ")}`,
      });
      autoReplySent = true;
    } catch (error) {
      // The inquiry itself already reached the inbox — a failed auto-reply
      // must not fail the whole submission.
      console.error("Auto-reply email failed:", error);
    }
  }

  return { notificationSent: Boolean(notification), autoReplySent };
}
