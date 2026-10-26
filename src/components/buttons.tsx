import Link from "next/link";
import type { ComponentProps } from "react";
import { Magnetic } from "./motion/magnetic";

type LinkProps = ComponentProps<typeof Link> & { tone?: "chene" | "noyer" | "contour" };

// Bouton principal : un seul par écran (DESIGN.md).
export function PrimaryLink({ tone = "chene", className = "", ...props }: LinkProps) {
  const variant = tone === "noyer" ? "bouton-noyer" : tone === "contour" ? "bouton-contour" : "";
  return (
    <Magnetic>
      <Link {...props} className={`bouton ${variant} ${className}`} />
    </Magnetic>
  );
}
