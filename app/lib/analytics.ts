// app/lib/analytics.ts
// Umami Cloud event tracking. Safe to call anywhere on the client:
// a no-op when Umami isn't configured or is blocked by the visitor.

type EventData = Record<string, string | number | boolean>;

declare global {
  interface Window {
    umami?: { track: (event: string, data?: EventData) => void };
  }
}

/**
 * Track a custom event. The Umami script loads after hydration, so retry
 * briefly in case an event fires (e.g. on the success page) before it's ready.
 */
export function track(event: string, data?: EventData, attemptsLeft = 15) {
  if (typeof window === "undefined") return;
  if (window.umami) {
    window.umami.track(event, data);
    return;
  }
  if (attemptsLeft > 0) {
    setTimeout(() => track(event, data, attemptsLeft - 1), 100);
  }
}
