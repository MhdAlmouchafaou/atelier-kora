"use client";

import { useSyncExternalStore } from "react";
import { site } from "@/content/site";

// « Atelier ouvert » ou « fermé », calculé à l'heure de l'atelier d'après
// les horaires de src/content/site.ts. Mis à jour chaque minute.

const NB = " ";
const { timeZone, days, ranges } = site.openingHours;
const dayIndex: Record<string, number> = { Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6, Sun: 7 };

const toMinutes = (hhmm: string) => {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
};
const label = (minutes: number) => {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m ? `${h}${NB}h${NB}${String(m).padStart(2, "0")}` : `${h}${NB}h`;
};

function read() {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone,
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(new Date());
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? "";
  const day = dayIndex[get("weekday")] ?? 1;
  const now = Number(get("hour")) * 60 + Number(get("minute"));
  const isWorkday = (days as readonly number[]).includes(day);
  const slots = ranges.map(([a, b]) => [toMinutes(a), toMinutes(b)] as const);

  const time = label(now);
  if (isWorkday) {
    const current = slots.find(([a, b]) => now >= a && now < b);
    if (current) return `open|Atelier ouvert|jusqu'à ${label(current[1])}|${time}`;
    const next = slots.find(([a]) => now < a);
    if (next) return `closed|Atelier fermé|réouverture à ${label(next[0])}|${time}`;
  }
  const first = label(slots[0][0]);
  const tomorrowIsWorkday = (days as readonly number[]).includes((day % 7) + 1);
  return tomorrowIsWorkday
    ? `closed|Atelier fermé|réouverture demain à ${first}|${time}`
    : `closed|Atelier fermé|réouverture lundi à ${first}|${time}`;
}

function subscribe(callback: () => void) {
  const id = window.setInterval(callback, 20_000);
  return () => window.clearInterval(id);
}

export function LiveStatus({ className = "" }: { className?: string }) {
  const value = useSyncExternalStore(subscribe, read, () => null);
  const [state, title, detail, time] = value?.split("|") ?? [];

  return (
    <p className={`flex items-center gap-3 ${className}`}>
      <span aria-hidden="true" className="relative flex size-2.5">
        {state === "open" && (
          <span className="absolute inset-0 animate-ping rounded-full bg-chene opacity-60" />
        )}
        <span
          className={`relative size-2.5 rounded-full ${state === "open" ? "bg-chene" : "border border-current"}`}
        />
      </span>
      {value ? (
        <span>
          <span className="font-semibold">{title}</span>, {detail}
          <span className="block text-lin">Il est {time} à l&apos;atelier</span>
        </span>
      ) : (
        <span>
          <span className="font-semibold">{site.hours[0].days}</span>
          <span className="block text-lin">{site.hours[0].time}</span>
        </span>
      )}
    </p>
  );
}
