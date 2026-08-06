"use server";

import { siteConfig } from "@/content/site";

export type ContactFormState = {
  status: "idle" | "success" | "error" | "not-configured";
  message: string;
};

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function submitContactForm(
  _prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const name = String(formData.get("name") || "").trim();
  const email = String(formData.get("email") || "").trim();
  const company = String(formData.get("company") || "").trim();
  const reason = String(formData.get("reason") || "").trim();
  const message = String(formData.get("message") || "").trim();

  if (!name || !email || !reason || !message) {
    return { status: "error", message: "Please fill in your name, email, reason, and message." };
  }

  if (!isValidEmail(email)) {
    return { status: "error", message: "Please enter a valid email address." };
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL || siteConfig.email;

  // No email provider configured yet — validate and let the client offer a
  // mailto fallback instead of silently pretending the message was sent.
  if (!apiKey) {
    return {
      status: "not-configured",
      message:
        "Thanks — your message looks good. Email delivery isn't configured on this deployment yet, so please send it directly using the button below.",
    };
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Portfolio Contact <onboarding@resend.dev>",
        to: [to],
        reply_to: email,
        subject: `New inquiry: ${reason} — ${name}`,
        text: `Name: ${name}\nEmail: ${email}\nCompany: ${company || "—"}\nReason: ${reason}\n\n${message}`,
      }),
    });

    if (!res.ok) {
      return {
        status: "error",
        message: "Something went wrong sending your message. Please try again or email directly.",
      };
    }

    return { status: "success", message: "Message sent — thank you. I'll get back to you soon." };
  } catch {
    return {
      status: "error",
      message: "Something went wrong sending your message. Please try again or email directly.",
    };
  }
}
