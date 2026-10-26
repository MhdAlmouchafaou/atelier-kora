import { Resend } from "resend";
import { type ContactInput, validateContact } from "@/lib/contact";
import { site } from "@/content/site";

// Reçoit le formulaire de contact et l'envoie par email avec Resend.
// Variables d'environnement (voir .env.example) :
//   RESEND_API_KEY  clé secrète Resend
//   CONTACT_TO      adresse qui reçoit les demandes
//   CONTACT_FROM    expéditeur vérifié dans Resend (onboarding@resend.dev pour les tests)

const escape = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

export async function POST(request: Request) {
  let body: Partial<ContactInput> & { website?: string };
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Requête illisible." }, { status: 400 });
  }

  // Champ piège rempli : c'est un robot. On répond comme si tout allait bien.
  if (body.website) return Response.json({ ok: true });

  const input: ContactInput = {
    name: String(body.name ?? "").slice(0, 120),
    phone: String(body.phone ?? "").slice(0, 30),
    email: String(body.email ?? "").slice(0, 200),
    kind: String(body.kind ?? ""),
    message: String(body.message ?? ""),
  };

  const errors = validateContact(input);
  if (Object.keys(errors).length > 0) {
    return Response.json({ error: "Certains champs sont incomplets.", errors }, { status: 422 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO;
  if (!apiKey || !to) {
    return Response.json(
      { error: "L'envoi en ligne n'est pas encore activé sur ce site." },
      { status: 503 },
    );
  }

  const resend = new Resend(apiKey);
  const lines = [
    ["Nom", input.name],
    ["Téléphone", input.phone],
    ["Email", input.email || "non renseigné"],
    ["Projet", input.kind],
  ];

  const { error } = await resend.emails.send({
    from: process.env.CONTACT_FROM ?? `${site.name} <onboarding@resend.dev>`,
    to: [to],
    replyTo: input.email || undefined,
    subject: `Demande de devis : ${input.kind}, ${input.name}`,
    text: `${lines.map(([k, v]) => `${k} : ${v}`).join("\n")}\n\n${input.message}`,
    html: `<table>${lines
      .map(([k, v]) => `<tr><td><strong>${k}</strong></td><td>${escape(v)}</td></tr>`)
      .join("")}</table><p style="white-space:pre-wrap">${escape(input.message)}</p>`,
  });

  if (error) {
    console.error("Resend :", error);
    return Response.json({ error: "Le service d'envoi n'a pas répondu." }, { status: 502 });
  }

  return Response.json({ ok: true });
}
