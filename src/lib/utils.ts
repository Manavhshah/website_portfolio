import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(
  input: string,
  opts: Intl.DateTimeFormatOptions = { year: "numeric", month: "long" },
): string {
  // Content dates are written as YYYY-MM-DD; parse as local, not UTC.
  const [y, m, d] = input.split("-").map(Number);
  const date = new Date(y, (m || 1) - 1, d || 1);
  return date.toLocaleDateString("en-US", opts);
}
