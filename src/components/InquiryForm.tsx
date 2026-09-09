"use client";

import { useState } from "react";

import { FORM_ENDPOINT, isLive } from "@/data/site";

/**
 * Inquiry form used by the apply, donate and sponsor pages.
 *
 * Posts as JSON to `FORM_ENDPOINT` — FormSubmit, which forwards to the club
 * address — so the site stays static with no backend of our own. The underscore
 * keys are FormSubmit's own: `_subject` titles the mail, `_template` renders the
 * answers as a table, `_captcha` turns off the interstitial that an AJAX post
 * cannot show anyone, and `_honey` is a field only a bot fills in.
 *
 * If the endpoint is ever unset the form says so rather than silently
 * swallowing a submission, which is the worst possible outcome for someone who
 * took the time to write one.
 */

export type Field =
  | {
      name: string;
      label: string;
      type: "text" | "email";
      required?: boolean;
      placeholder?: string;
    }
  | {
      name: string;
      label: string;
      type: "textarea";
      required?: boolean;
      placeholder?: string;
    }
  | {
      name: string;
      label: string;
      type: "select";
      options: readonly string[];
      required?: boolean;
    }
  | {
      name: string;
      label: string;
      type: "checkboxes";
      options: readonly string[];
    };

const CONFIGURED = isLive(FORM_ENDPOINT);

const inputClass =
  "w-full rounded-md border border-hairline bg-void px-4 py-3 text-sm text-ink outline-none transition-colors placeholder:text-ink-faint focus:border-gold";

export function InquiryForm({
  fields,
  subject,
  action,
}: {
  fields: readonly Field[];
  /** Marks which form a submission came from. */
  subject: string;
  action: string;
}) {
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!CONFIGURED) return;

    const form = event.currentTarget;
    const data = new FormData(form);
    const payload: Record<string, unknown> = {
      _subject: subject,
      _template: "table",
      _captcha: "false",
      _honey: data.get("_honey") ?? "",
    };

    for (const field of fields) {
      // Checkbox groups arrive as one line rather than a list: the mail reads
      // better, and FormSubmit renders a plain string reliably.
      payload[field.label] =
        field.type === "checkboxes"
          ? data.getAll(field.name).join(", ")
          : data.get(field.name);
    }

    // So a reply goes straight back to whoever wrote in.
    const email = data.get("email");
    if (email) payload._replyto = email;

    setState("sending");
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });
      setState(res.ok ? "sent" : "error");
      if (res.ok) form.reset();
    } catch {
      setState("error");
    }
  };

  if (state === "sent") {
    return (
      <div className="rounded-lg border border-hairline bg-panel/40 p-8">
        <p className="display text-[clamp(1.35rem,2.5vw,1.9rem)]">Thank you.</p>
        <p className="mt-4 text-sm leading-relaxed text-ink-dim">
          Your inquiry is in. We read every one and reply from a Berkeley
          address.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="max-w-[46rem]">
      {/* Bots fill this in; people never see it. */}
      <input
        type="text"
        name="_honey"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden
        className="hidden"
      />

      <div className="grid gap-6 sm:grid-cols-2">
        {fields.map((field) => (
          <div
            key={field.name}
            className={
              field.type === "textarea" || field.type === "checkboxes"
                ? "sm:col-span-2"
                : ""
            }
          >
            <label
              htmlFor={field.name}
              className="tele block text-[0.5625rem] text-ink-faint"
            >
              {field.label}
              {"required" in field && field.required ? " *" : ""}
            </label>

            {field.type === "textarea" ? (
              <textarea
                id={field.name}
                name={field.name}
                rows={5}
                required={field.required}
                placeholder={field.placeholder}
                className={`${inputClass} mt-3 resize-y`}
              />
            ) : field.type === "select" ? (
              <select
                id={field.name}
                name={field.name}
                required={field.required}
                defaultValue=""
                className={`${inputClass} mt-3`}
              >
                <option value="" disabled>
                  Choose one
                </option>
                {field.options.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            ) : field.type === "checkboxes" ? (
              <div className="mt-3 flex flex-wrap gap-x-6 gap-y-3">
                {field.options.map((option) => (
                  <label
                    key={option}
                    className="flex items-center gap-2 text-sm text-ink-dim"
                  >
                    <input
                      type="checkbox"
                      name={field.name}
                      value={option}
                      className="h-4 w-4 accent-[var(--gold)]"
                    />
                    {option}
                  </label>
                ))}
              </div>
            ) : (
              <input
                id={field.name}
                name={field.name}
                type={field.type}
                required={field.required}
                placeholder={field.placeholder}
                className={`${inputClass} mt-3`}
              />
            )}
          </div>
        ))}
      </div>

      {/* Someone reading the site should be told the form is closed, not told
          how to fix it — that half only shows while developing. */}
      {!CONFIGURED ? (
        <p className="mt-8 rounded-md border border-gold/40 bg-gold/5 px-4 py-3 text-sm text-ink-dim">
          This form is not open yet, so nothing sent here would reach us. It
          goes live at the start of the semester — please check back then.
          {process.env.NODE_ENV !== "production" ? (
            <>
              {" "}
              <span className="text-ink-faint">
                (Set <code>FORM_ENDPOINT</code> in <code>src/data/site.ts</code>
                .)
              </span>
            </>
          ) : null}
        </p>
      ) : null}

      {state === "error" ? (
        <p className="mt-8 rounded-md border border-hairline-strong px-4 py-3 text-sm text-ink-dim">
          That did not send. Try again in a moment.
        </p>
      ) : null}

      <button
        type="submit"
        disabled={!CONFIGURED || state === "sending"}
        className="tele group mt-8 inline-flex items-center gap-2 rounded-full bg-gold px-7 py-4 text-void transition-transform duration-300 enabled:hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-40"
      >
        {state === "sending" ? "Sending" : action}
        <span className="transition-transform duration-300 group-enabled:group-hover:translate-x-1">
          →
        </span>
      </button>
    </form>
  );
}
