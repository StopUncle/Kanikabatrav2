/**
 * Escape user-supplied strings before interpolating into HTML email templates.
 *
 * Without this, a customer name like `<img src=x onerror=alert()>` coming
 * from Stripe checkout (or a job title pasted into an application form, or a
 * free-text whyJoin field) would execute in some email clients. Use this
 * around every user-data interpolation in lib/email.ts — admin-authored
 * content can remain raw where Kanika genuinely needs HTML control.
 */
export function escapeHtml(value: unknown): string {
  if (value == null) return "";
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
