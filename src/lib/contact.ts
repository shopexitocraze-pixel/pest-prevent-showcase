// Contact form server function: validates the submission, throttles repeat
// attempts, then hands off to the SMTP mailer.
//
// CSRF protection comes from the createCsrfMiddleware configured in src/start.ts.
import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { isSmtpConfigured, sendInquiryEmails, type Inquiry } from "./mailer";
import { PHONE_DISPLAY } from "./site";

export const inquirySchema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(80),
  phone: z
    .string()
    .trim()
    .regex(/^\+?[0-9][0-9\s-]{7,17}$/, "Enter a valid phone number"),
  email: z
    .string()
    .trim()
    .email("Enter a valid email address")
    .max(120)
    .optional()
    .or(z.literal("")),
  location: z.string().trim().max(120).optional().or(z.literal("")),
  service: z.string().trim().min(2, "Choose a service").max(140),
  message: z.string().trim().max(2000, "Message is too long").optional().or(z.literal("")),
  /** Honeypot — real users never fill this hidden field. */
  company: z.string().max(200).optional(),
});

export type InquiryInput = z.infer<typeof inquirySchema>;

export type InquiryResponse = {
  ok: boolean;
  message: string;
  autoReplySent?: boolean;
};

const RATE_WINDOW_MS = 10 * 60 * 1000;
const RATE_MAX_ATTEMPTS = 3;
const attemptsByPhone = new Map<string, number[]>();

function isRateLimited(phone: string): boolean {
  const now = Date.now();
  const key = phone.replace(/\D/g, "").slice(-10);
  const list = (attemptsByPhone.get(key) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  if (list.length >= RATE_MAX_ATTEMPTS) {
    attemptsByPhone.set(key, list);
    return true;
  }
  list.push(now);
  attemptsByPhone.set(key, list);
  if (attemptsByPhone.size > 500) {
    for (const [k, v] of attemptsByPhone) {
      if (v.every((t) => now - t >= RATE_WINDOW_MS)) attemptsByPhone.delete(k);
    }
  }
  return false;
}

export const sendInquiry = createServerFn({ method: "POST" })
  .validator(inquirySchema)
  .handler(async ({ data }): Promise<InquiryResponse> => {
    if (data.company) {
      // Honeypot triggered — pretend success so bots learn nothing.
      return { ok: true, message: "Thanks! We will get back to you shortly." };
    }

    if (isRateLimited(data.phone)) {
      return {
        ok: false,
        message: `Too many submissions from your number. Please call ${PHONE_DISPLAY} directly.`,
      };
    }

    if (!isSmtpConfigured()) {
      console.error(
        "[contact] SMTP is not configured — set SMTP_HOST, SMTP_USER, SMTP_PASS and CONTACT_NOTIFY_TO in .env",
      );
      return {
        ok: false,
        message: `Online booking is temporarily unavailable — please call ${PHONE_DISPLAY} or chat on WhatsApp.`,
      };
    }

    const inquiry: Inquiry = {
      name: data.name,
      phone: data.phone,
      email: data.email || undefined,
      location: data.location || undefined,
      service: data.service,
      message: data.message || undefined,
    };

    try {
      const result = await sendInquiryEmails(inquiry);
      return {
        ok: true,
        autoReplySent: result.autoReplySent,
        message: result.autoReplySent
          ? "Thanks! A confirmation has been emailed to you and our team will call within 30 minutes."
          : "Thanks! Our team will call you within 30 minutes.",
      };
    } catch (error) {
      console.error("[contact] failed to send inquiry email:", error);
      return {
        ok: false,
        message: `We couldn't send your request right now — please call ${PHONE_DISPLAY} or WhatsApp us.`,
      };
    }
  });
