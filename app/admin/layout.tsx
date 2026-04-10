import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import jwt from "jsonwebtoken";
import AdminSidebar from "@/components/admin/AdminSidebar";

export const metadata = {
  title: "Admin Panel | Kanika Batra",
};

function getJwtSecret(): string {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    if (process.env.NODE_ENV === "production") {
      throw new Error("CRITICAL: JWT_SECRET is required in production");
    }
    return "dev-only-secret-do-not-use-in-production";
  }
  return secret;
}

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session")?.value;

  if (!session) {
    redirect("/admin-login");
  }

  try {
    const payload = jwt.verify(session, getJwtSecret()) as { role?: string };
    if (payload.role !== "admin") {
      redirect("/admin-login");
    }
  } catch {
    redirect("/admin-login");
  }

  return (
    <div className="min-h-screen bg-deep-black lg:flex">
      <AdminSidebar />
      <main className="flex-1 p-4 pt-16 lg:p-8 lg:pt-8 overflow-auto min-w-0">
        {children}
      </main>
    </div>
  );
}
