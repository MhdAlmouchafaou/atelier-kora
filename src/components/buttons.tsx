import Link from "next/link";
import type { ComponentProps } from "react";

type LinkProps = ComponentProps<typeof Link> & { tone?: "vert" | "blanc" };

// Bouton principal : un seul par écran (DESIGN.md).
export function PrimaryLink({ tone = "vert", className = "", ...props }: LinkProps) {
  const colors =
    tone === "vert"
      ? "bg-vert text-white hover:bg-vert-fonce"
      : "bg-white text-vert hover:bg-papier";
  return (
    <Link
      {...props}
      className={`inline-flex min-h-13 items-center justify-center rounded-[3px] px-6 whitespace-nowrap text-[1.0625rem] font-semibold transition-colors ${colors} ${className}`}
    />
  );
}

export function PhoneLink({
  display,
  href,
  className = "",
}: {
  display: string;
  href: string;
  className?: string;
}) {
  return (
    <a href={href} className={`lien whitespace-nowrap font-semibold ${className}`}>
      {display}
    </a>
  );
}
