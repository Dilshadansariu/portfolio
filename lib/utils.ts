import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * The same `cn()` helper shadcn/ui, Aceternity UI and Magic UI components all
 * depend on: merges conditional class names and resolves conflicting Tailwind
 * utilities (e.g. "px-4 px-6" -> "px-6") instead of leaving both in the DOM.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
