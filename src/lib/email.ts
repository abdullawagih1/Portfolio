import nodemailer from "nodemailer";
import { siteConfig } from "@/content/site";

export type ContactPayload = {
  name: string;
  email: string;
  company: string;
  reason: string;
  message: string;
};

export type SendResult = { ok: true } | { ok: false; error: string };

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function buildEmailContent(payload: ContactPayload) {
  const { name, email, company, reason, message } = payload;

  const text = `Name: ${name}\nEmail: ${email}\nCompany: ${company || "—"}\nReason: ${reason}\n\n${message}`;

  const html = `
    <div style="font-family: -apple-system, sans-serif; font-size: 14px; color: #11162A; line-height: 1.6;">
      <p><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      <p><strong>Company:</strong> ${escapeHtml(company || "—")}</p>
      <p><strong>Reason:</strong> ${escapeHtml(reason)}</p>
      <p><strong>Message:</strong></p>
      <p style="white-space: pre-wrap;">${escapeHtml(message)}</p>
    </div>
  `;

  const subject = `New inquiry: ${reason} — ${name}`;

  return { text, html, subject };
}

/**
 * Sends via Gmail SMTP using an App Password. Works immediately with no
 * domain or DNS setup — the trade-off is the email arrives "from" your own
 * Gmail address rather than a branded domain address.
 * Requires: GMAIL_USER, GMAIL_APP_PASSWORD
 */
async function sendViaGmail(payload: ContactPayload, to: string): Promise<SendResult> {
  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;

  if (!user || !pass) {
    return { ok: false, error: "Gmail credentials not configured" };
  }

  const { text, html, subject } = buildEmailContent(payload);

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user, pass },
      // Fail fast rather than hang the request if Gmail's SMTP servers are
      // unreachable or slow to respond — better UX than an indefinite spinner.
      connectionTimeout: 8000,
      greetingTimeout: 8000,
      socketTimeout: 10000,
    });

    await transporter.sendMail({
      from: `"Portfolio Contact" <${user}>`,
      to,
      replyTo: payload.email,
      subject,
      text,
      html,
    });

    return { ok: true };
  } catch (err) {
    console.error("Gmail SMTP error:", err);
    return { ok: false, error: err instanceof Error ? err.message : "Unknown Gmail SMTP error" };
  }
}

/**
 * Sends via the Resend API. Requires a verified sending domain for reliable
 * delivery (Resend's shared onboarding@resend.dev address is restricted and
 * will fail for most recipients — see README).
 * Requires: RESEND_API_KEY. Optional: EMAIL_FROM.
 */
async function sendViaResend(payload: ContactPayload, to: string): Promise<SendResult> {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    return { ok: false, error: "Resend API key not configured" };
  }

  const from = process.env.EMAIL_FROM || "Portfolio Contact <onboarding@resend.dev>";
  const { text, html, subject } = buildEmailContent(payload);

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: payload.email,
        subject,
        text,
        html,
      }),
      // Fail fast rather than hang the request if Resend is unreachable or slow.
      signal: AbortSignal.timeout(10000),
    });

    if (!res.ok) {
      const errorBody = await res.text().catch(() => "");
      console.error("Resend API error:", res.status, errorBody);
      return { ok: false, error: `Resend API responded with ${res.status}` };
    }

    return { ok: true };
  } catch (err) {
    console.error("Resend request error:", err);
    return { ok: false, error: err instanceof Error ? err.message : "Unknown Resend error" };
  }
}

export type EmailProvider = "gmail" | "resend" | "none";

export function getConfiguredProvider(): EmailProvider {
  if (process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD) return "gmail";
  if (process.env.RESEND_API_KEY) return "resend";
  return "none";
}

/**
 * Sends the contact form email through whichever provider is configured.
 * Gmail SMTP is checked first since it needs no domain/DNS setup — see
 * README §5 for how to configure either provider.
 */
export async function sendContactEmail(payload: ContactPayload): Promise<SendResult> {
  const to = process.env.CONTACT_TO_EMAIL || siteConfig.email;
  const provider = getConfiguredProvider();

  if (provider === "gmail") return sendViaGmail(payload, to);
  if (provider === "resend") return sendViaResend(payload, to);

  return { ok: false, error: "No email provider configured" };
}
