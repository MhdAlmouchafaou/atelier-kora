import { ViewTransition } from "react";
import { Footer } from "@/components/footer";
import { MotionRoot } from "@/components/motion/motion-root";

// Remonté à chaque changement de page : la nouvelle page se découvre de bas
// en haut (transition de vue du navigateur), puis ses animations se lancent.
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <ViewTransition enter="page" exit="page" default="none">
      <div data-page className="flex flex-1 flex-col">
        <main id="contenu" className="flex-1">
          {children}
        </main>
        <Footer />
        <MotionRoot />
      </div>
    </ViewTransition>
  );
}
