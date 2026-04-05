export function getAdminHeaders(): HeadersInit {
  return {
    "Content-Type": "application/json",
    "x-admin-secret": process.env.NEXT_PUBLIC_ADMIN_SECRET || "",
  };
}
