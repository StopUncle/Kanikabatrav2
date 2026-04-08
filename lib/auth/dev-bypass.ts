export function isDevBypass(): boolean {
  return process.env.DEV_BYPASS_AUTH === "true";
}

export function getDevUserId(): string {
  return "dev-admin";
}
