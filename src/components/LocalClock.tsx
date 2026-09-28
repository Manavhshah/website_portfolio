"use client";

import { useEffect, useState } from "react";

/** Live time in San Francisco. Renders a dash until hydrated to avoid mismatches. */
export default function LocalClock({ timeZone = "America/Los_Angeles" }: { timeZone?: string }) {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-US", { hour: "numeric", minute: "2-digit", timeZone });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, [timeZone]);

  return (
    <span className="tabular-nums" suppressHydrationWarning>
      {time ?? "—:—"}
    </span>
  );
}
