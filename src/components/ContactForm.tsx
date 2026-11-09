"use client";

import { useState } from "react";
import { site } from "@/content/site";

const ENDPOINT = process.env.NEXT_PUBLIC_FORM_ENDPOINT;
const subjects = ["Proposition de poste", "Projet freelance", "Collaboration", "Autre"];

type Status = "idle" | "sending" | "sent" | "error";

/**
 * Formulaire de contact.
 * — Avec NEXT_PUBLIC_FORM_ENDPOINT (Formspree, Getform…) : envoi direct.
 * — Sans : ouvre la messagerie avec le message pré-rempli.
 */
export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    if (data.get("_gotcha")) return; // anti-spam

    if (!ENDPOINT) {
      const body = `${data.get("message")}\n\n— ${data.get("name")} (${data.get("email")})`;
      window.location.href = `mailto:${site.contact.email}?subject=${encodeURIComponent(String(data.get("subject")))}&body=${encodeURIComponent(body)}`;
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch(ENDPOINT, { method: "POST", body: data, headers: { Accept: "application/json" } });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div role="status" className="border-t border-line pt-6">
        <p className="display text-[clamp(48px,6vw,96px)]">Merci !</p>
        <p className="serif-i mt-2 text-[clamp(22px,2vw,30px)]">Votre message est bien arrivé. Je vous réponds très vite.</p>
        <button type="button" className="pill pill-ghost mt-8" onClick={() => setStatus("idle")}>
          Nouveau message
        </button>
      </div>
    );
  }

  const field =
    "peer w-full border-0 border-b border-line bg-transparent pb-3 pt-7 text-[clamp(20px,1.8vw,26px)] outline-none transition-colors duration-300 placeholder:text-transparent focus:border-paper focus-visible:outline-none";
  const lab =
    "label pointer-events-none absolute left-0 top-7 origin-left text-mute transition-all duration-300 peer-focus:top-0 peer-[:not(:placeholder-shown)]:top-0";

  return (
    <form onSubmit={onSubmit} className="space-y-6" noValidate={false}>
      <div className="grid gap-6 md:grid-cols-2">
        <div className="relative">
          <input id="name" name="name" required autoComplete="name" placeholder="Nom" className={field} />
          <label htmlFor="name" className={lab}>Nom *</label>
        </div>
        <div className="relative">
          <input id="email" name="email" type="email" required autoComplete="email" placeholder="E-mail" className={field} />
          <label htmlFor="email" className={lab}>E-mail *</label>
        </div>
      </div>

      <fieldset>
        <legend className="label mb-3 text-mute">Objet</legend>
        <div className="flex flex-wrap gap-2">
          {subjects.map((s, i) => (
            <label key={s} className="cursor-pointer">
              <input type="radio" name="subject" value={s} defaultChecked={i === 0} className="peer sr-only" />
              <span className="label inline-block rounded-full px-3.5 py-2 shadow-[inset_0_0_0_1px_var(--color-line)] transition-colors peer-checked:bg-paper peer-checked:text-ink peer-focus-visible:outline peer-focus-visible:outline-1 peer-focus-visible:outline-signal">
                {s}
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="relative">
        <textarea id="message" name="message" required rows={5} placeholder="Message" className={`${field} resize-none`} />
        <label htmlFor="message" className={lab}>Message *</label>
      </div>

      <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />

      <div className="flex flex-wrap items-center gap-6 pt-4">
        <button type="submit" className="pill" disabled={status === "sending"}>
          {status === "sending" ? "Envoi…" : "Envoyer"} <span aria-hidden>→</span>
        </button>
        {status === "error" && (
          <p role="alert" className="text-signal">
            L&apos;envoi a échoué. Écrivez-moi directement à{" "}
            <a className="underline" href={`mailto:${site.contact.email}`}>
              {site.contact.email}
            </a>
            .
          </p>
        )}
      </div>
    </form>
  );
}
