"use client";

import Link from "next/link";
import { type FormEvent, useEffect, useRef, useState } from "react";
import { type ContactErrors, type ContactInput, projectKinds, validateContact } from "@/lib/contact";
import { site } from "@/content/site";

type Status = "idle" | "sending" | "sent" | "error";

const fieldClass =
  "mt-2 block w-full rounded-[3px] border border-graphite bg-white px-4 py-3 text-[1.0625rem] text-encre aria-invalid:border-erreur";

function ErrorText({ field, errors }: { field: keyof ContactInput; errors: ContactErrors }) {
  if (!errors[field]) return null;
  return (
    <p id={`${field}-erreur`} className="mt-2 text-[0.9375rem] font-medium text-erreur">
      {errors[field]}
    </p>
  );
}

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<ContactErrors>({});
  const [serverError, setServerError] = useState("");
  const [sentName, setSentName] = useState("");
  const formRef = useRef<HTMLFormElement>(null);
  const sentRef = useRef<HTMLHeadingElement>(null);

  // Après l'envoi, le focus va sur le message de confirmation.
  useEffect(() => {
    if (status === "sent") sentRef.current?.focus();
  }, [status]);

  // Une erreur disparaît dès que le visiteur corrige le champ.
  function onInput(event: FormEvent<HTMLFormElement>) {
    const name = (event.target as HTMLInputElement).name as keyof ContactInput;
    if (errors[name]) {
      setErrors((current) => {
        const next = { ...current };
        delete next[name];
        return next;
      });
    }
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "sending") return;
    const data = new FormData(event.currentTarget);
    const input: ContactInput = {
      name: String(data.get("name") ?? ""),
      phone: String(data.get("phone") ?? ""),
      email: String(data.get("email") ?? ""),
      kind: String(data.get("kind") ?? ""),
      message: String(data.get("message") ?? ""),
    };

    const found = validateContact(input);
    setErrors(found);
    setServerError("");
    if (Object.keys(found).length > 0) {
      const first = Object.keys(found)[0];
      formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }

    setStatus("sending");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...input, website: data.get("website") ?? "" }),
      });
      const body = (await response.json().catch(() => ({}))) as { error?: string };
      if (!response.ok) {
        setServerError(body.error ?? "La demande n'est pas partie.");
        setStatus("error");
        return;
      }
      setSentName(input.name.trim().split(" ")[0]);
      setStatus("sent");
    } catch {
      setServerError("La demande n'est pas partie : la connexion semble coupée.");
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="border-t-2 border-vert bg-ivoire p-8 lg:p-10">
        <h2 ref={sentRef} tabIndex={-1} className="titre-3 outline-none">
          Demande envoyée
        </h2>
        <p className="mt-4 max-w-[48ch]">
          Merci {sentName}. Léa ou Daniel vous rappelle sous deux jours ouvrés pour convenir de la
          visite. Si c&apos;est urgent, appelez l&apos;atelier au{" "}
          <a href={site.phone.href} className="lien font-semibold whitespace-nowrap">
            {site.phone.display}
          </a>
          .
        </p>
      </div>
    );
  }

  const describedBy = (field: keyof ContactInput, hint?: string) =>
    [hint, errors[field] ? `${field}-erreur` : null].filter(Boolean).join(" ") || undefined;

  return (
    <form
      ref={formRef}
      onSubmit={onSubmit}
      onInput={onInput}
      onChange={onInput}
      noValidate
      aria-labelledby="formulaire-titre"
      className="bg-ivoire p-6 sm:p-8 lg:p-10"
    >
      <h2 id="formulaire-titre" className="titre-3">
        Votre projet
      </h2>
      <p className="mt-2 text-[0.9375rem] text-graphite">Tous les champs sont obligatoires, sauf l&apos;email.</p>

      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label htmlFor="name" className="font-medium">
            Nom et prénom
          </label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            required
            aria-invalid={Boolean(errors.name) || undefined}
            aria-describedby={describedBy("name")}
            className={fieldClass}
          />
          <ErrorText field="name" errors={errors} />
        </div>

        <div>
          <label htmlFor="phone" className="font-medium">
            Téléphone
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            required
            aria-invalid={Boolean(errors.phone) || undefined}
            aria-describedby={describedBy("phone")}
            className={fieldClass}
          />
          <ErrorText field="phone" errors={errors} />
        </div>

        <div>
          <label htmlFor="email" className="font-medium">
            Email <span className="font-normal text-graphite">(facultatif)</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            aria-invalid={Boolean(errors.email) || undefined}
            aria-describedby={describedBy("email")}
            className={fieldClass}
          />
          <ErrorText field="email" errors={errors} />
        </div>

        <fieldset className="sm:col-span-2" aria-describedby={describedBy("kind")}>
          <legend className="font-medium">Type de projet</legend>
          <div className="mt-3 flex flex-wrap gap-2">
            {projectKinds.map((kind) => (
              <label
                key={kind}
                className="relative inline-flex min-h-11 cursor-pointer items-center rounded-[3px] border border-graphite bg-white px-4 text-[0.9375rem] has-checked:border-encre has-checked:bg-encre has-checked:text-papier has-focus-visible:outline-2 has-focus-visible:outline-offset-3 has-focus-visible:outline-vert"
              >
                <input type="radio" name="kind" value={kind} className="sr-only" />
                {kind}
              </label>
            ))}
          </div>
          <ErrorText field="kind" errors={errors} />
        </fieldset>

        <div className="sm:col-span-2">
          <label htmlFor="message" className="font-medium">
            Votre projet en quelques lignes
          </label>
          <p id="message-aide" className="mt-1 text-[0.9375rem] text-graphite">
            La pièce, les dimensions si vous les avez, le bois qui vous plaît, le délai souhaité.
          </p>
          <textarea
            id="message"
            name="message"
            rows={6}
            required
            maxLength={3000}
            aria-invalid={Boolean(errors.message) || undefined}
            aria-describedby={describedBy("message", "message-aide")}
            className={`${fieldClass} resize-y`}
          />
          <ErrorText field="message" errors={errors} />
        </div>

        {/* Champ piège : invisible pour les visiteurs, rempli par les robots. */}
        <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
          <label htmlFor="website">Ne pas remplir</label>
          <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
        </div>
      </div>

      {status === "error" && (
        <div role="alert" className="mt-8 border-l-2 border-erreur bg-white p-4">
          <p className="font-medium">{serverError}</p>
          <p className="mt-1 text-graphite">
            Appelez l&apos;atelier au{" "}
            <a href={site.phone.href} className="lien font-semibold whitespace-nowrap text-encre">
              {site.phone.display}
            </a>{" "}
            ou réessayez dans quelques minutes.
          </p>
        </div>
      )}

      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          aria-disabled={status === "sending" || undefined}
          className="inline-flex min-h-13 items-center justify-center rounded-[3px] bg-vert px-7 font-semibold text-white transition-colors hover:bg-vert-fonce aria-disabled:cursor-wait aria-disabled:bg-vert-fonce"
        >
          {status === "sending" ? "Envoi en cours" : "Envoyer la demande"}
        </button>
        <p className="max-w-[36ch] text-[0.9375rem] text-graphite">
          Vos coordonnées servent uniquement à vous répondre.{" "}
          <Link href="/mentions-legales#donnees" className="lien">
            En savoir plus
          </Link>
        </p>
      </div>
    </form>
  );
}
