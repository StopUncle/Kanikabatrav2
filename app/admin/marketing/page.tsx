import { listCampaigns } from "@/lib/email-campaigns";
import MarketingClient from "./MarketingClient";

// Auth is handled by the admin layout. This page just renders UI
// and the underlying /api/admin/marketing/* endpoints enforce
// requireAdminSession on every fetch.
export const dynamic = "force-dynamic";

export default function AdminMarketingPage() {
  const campaigns = listCampaigns().map((c) => ({
    id: c.id,
    label: c.label,
    hook: c.hook,
  }));
  return <MarketingClient campaigns={campaigns} />;
}

export const metadata = {
  title: "Marketing. Admin | Kanika Batra",
  robots: { index: false, follow: false },
};
