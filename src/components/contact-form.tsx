"use client";

import * as React from "react";
import { useFormState, useFormStatus } from "react-dom";
import { Mail, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { submitContactForm, type ContactFormState } from "@/lib/actions";
import { siteConfig } from "@/content/site";

const initialState: ContactFormState = { status: "idle", message: "" };

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary-600 px-6 py-3.5 text-[14px] font-medium text-white transition-colors hover:bg-primary-700 disabled:opacity-60 sm:w-auto"
    >
      {pending ? <Loader2 size={15} className="animate-spin" /> : <Mail size={15} />}
      {pending ? "Sending..." : "Send message"}
    </button>
  );
}

const fieldClass =
  "w-full rounded-lg border border-line bg-canvas px-4 py-3 text-[14px] text-ink placeholder:text-ink-faint focus:border-primary-400 dark:border-line-dark dark:bg-canvas-dark dark:text-ink-inverse";

export function ContactForm() {
  const [state, formAction] = useFormState(submitContactForm, initialState);
  const formRef = React.useRef<HTMLFormElement>(null);

  React.useEffect(() => {
    if (state.status === "success") {
      formRef.current?.reset();
    }
  }, [state.status]);

  return (
    <form ref={formRef} action={formAction} className="space-y-5" noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-1.5 block text-[13px] font-medium text-ink-soft dark:text-ink-inverse/75">
            Name
          </label>
          <input id="name" name="name" type="text" required autoComplete="name" className={fieldClass} />
        </div>
        <div>
          <label htmlFor="email" className="mb-1.5 block text-[13px] font-medium text-ink-soft dark:text-ink-inverse/75">
            Email
          </label>
          <input id="email" name="email" type="email" required autoComplete="email" className={fieldClass} />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="company" className="mb-1.5 block text-[13px] font-medium text-ink-soft dark:text-ink-inverse/75">
            Company / organization <span className="text-ink-faint">(optional)</span>
          </label>
          <input id="company" name="company" type="text" autoComplete="organization" className={fieldClass} />
        </div>
        <div>
          <label htmlFor="reason" className="mb-1.5 block text-[13px] font-medium text-ink-soft dark:text-ink-inverse/75">
            Reason for contact
          </label>
          <select id="reason" name="reason" required defaultValue="" className={fieldClass}>
            <option value="" disabled>
              Select a reason
            </option>
            {siteConfig.contactReasons.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="message" className="mb-1.5 block text-[13px] font-medium text-ink-soft dark:text-ink-inverse/75">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className={fieldClass}
          placeholder="Tell me a bit about what you're working on."
        />
      </div>

      <SubmitButton />

      {state.status !== "idle" && (
        <div
          role="status"
          className={`flex items-start gap-2.5 rounded-lg border p-4 text-[13.5px] leading-relaxed ${
            state.status === "success"
              ? "border-accent-300 bg-accent-50 text-accent-800 dark:border-accent-700 dark:bg-accent-900/20 dark:text-accent-200"
              : state.status === "not-configured"
                ? "border-primary-200 bg-primary-50 text-primary-800 dark:border-primary-800 dark:bg-primary-900/20 dark:text-primary-200"
                : "border-red-200 bg-red-50 text-red-800 dark:border-red-900 dark:bg-red-950/30 dark:text-red-300"
          }`}
        >
          {state.status === "success" ? (
            <CheckCircle2 size={16} className="mt-0.5 flex-shrink-0" />
          ) : (
            <AlertCircle size={16} className="mt-0.5 flex-shrink-0" />
          )}
          <div>
            <p>{state.message}</p>
            {state.status === "not-configured" && (
              <a
                href={`mailto:${siteConfig.email}`}
                className="mt-2 inline-flex items-center gap-1.5 font-medium underline underline-offset-2"
              >
                Email {siteConfig.email}
              </a>
            )}
          </div>
        </div>
      )}
    </form>
  );
}
