/**
 * Where a login form is allowed to send you.
 *
 * Both doors (/login, /register) read a ?redirect= or
 * ?returnTo= param and hand it to router.push. Next performs a HARD
 * navigation for an absolute URL, so an unvalidated param turns the real
 * sign-in page on the real domain into a launcher for somebody else's:
 * /login?returnTo=https://evil.example collects the credentials on our
 * form and delivers the user to them afterwards.
 *
 * The rule is deliberately narrow rather than a host allowlist, because a
 * host allowlist is a thing people extend. Only a same-origin absolute
 * PATH is accepted:
 *   "/app/pact/week"       -> allowed
 *   "//evil.example"       -> refused (protocol-relative, browsers treat
 *                             this as a host)
 *   "https://evil.example" -> refused
 *   "/\evil.example"       -> refused (some browsers normalise the
 *                             backslash to a slash, making it
 *                             protocol-relative)
 *   "app/pact"             -> refused (relative, resolves against
 *                             whatever page it happens to run on)
 *
 * Returns null when the value cannot be trusted, so callers keep their
 * existing `?? fallback` shape and a hostile param degrades to the normal
 * cohort landing rather than to an error.
 */
export function safeRedirect(value: string | null | undefined): string | null {
  if (!value) return null;
  const path = value.trim();
  if (!path.startsWith("/")) return null;
  // Second character decides it: another slash or a backslash means the
  // browser reads what follows as a host, not as a path on this origin.
  if (path.length > 1 && (path[1] === "/" || path[1] === "\\")) return null;
  // Control characters can smuggle a line break past a naive check
  // further down the stack. Checked by code point rather than by regex so
  // the source file carries no literal control bytes.
  for (let i = 0; i < path.length; i++) {
    const code = path.charCodeAt(i);
    if (code < 32 || code === 127) return null;
  }
  return path;
}

/**
 * The two spellings every door accepts. returnTo wins when both are
 * present (explicit beats implicit), matching the rule the login form
 * documented before this helper existed.
 */
export function readSafeRedirect(params: {
  get(key: string): string | null;
}): string | null {
  return (
    safeRedirect(params.get("returnTo")) ?? safeRedirect(params.get("redirect"))
  );
}
