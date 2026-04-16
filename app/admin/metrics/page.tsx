"use client";

import { useState, useEffect, useCallback } from "react";
import { Loader2, DollarSign, Users, TrendingUp, Activity, AlertTriangle } from "lucide-react";

interface MonthlyPoint {
  month: string;
  revenue: number;
  count: number;
}

interface MetricsData {
  generatedAt: string;
  lifetime: {
    revenue: number;
    purchaseCount: number;
  };
  monthly: {
    revenue: MonthlyPoint[];
  };
  revenueByType: Array<{
    type: string;
    revenue: number;
    count: number;
  }>;
  members: {
    active: number;
    breakdown: Array<{ status: string; count: number }>;
  };
  activity: {
    bookSales30d: number;
    quizSubmissions7d: number;
    quizTaken30d: number;
    applicationsSubmitted30d: number;
    membershipsActivated30d: number;
    cancellations30d: number;
    churnRatePct: number;
  };
  recentPurchases: Array<{
    id: string;
    type: string;
    productVariant: string | null;
    amount: number;
    customerEmail: string;
    customerName: string;
    createdAt: string;
  }>;
}

function formatCurrency(n: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n);
}

function formatMonth(ym: string): string {
  const [year, month] = ym.split("-");
  return new Date(parseInt(year), parseInt(month) - 1).toLocaleDateString(
    "en-US",
    { month: "short", year: "2-digit" },
  );
}

export default function MetricsPage() {
  const [data, setData] = useState<MetricsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMetrics = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/metrics");
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = await res.json();
      setData(json);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMetrics();
  }, [fetchMetrics]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="animate-spin text-accent-gold" size={32} />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="glass-card rounded-lg p-8 text-center">
        <AlertTriangle className="w-8 h-8 text-red-400 mx-auto mb-3" />
        <p className="text-text-gray">{error || "No data"}</p>
      </div>
    );
  }

  // Max revenue for chart scaling
  const maxRevenue = Math.max(
    ...data.monthly.revenue.map((m) => m.revenue),
    1,
  );

  // Funnel conversion rates
  const quiz = data.activity.quizTaken30d;
  const apps = data.activity.applicationsSubmitted30d;
  const active = data.activity.membershipsActivated30d;
  const quizToApp = quiz > 0 ? (apps / quiz) * 100 : 0;
  const appToActive = apps > 0 ? (active / apps) * 100 : 0;

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-light uppercase tracking-[0.15em] text-text-light">
          Metrics
        </h1>
        <button
          onClick={fetchMetrics}
          className="text-xs text-text-gray hover:text-accent-gold transition-colors"
        >
          Refresh
        </button>
      </div>

      {/* Top-line KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard
          label="Lifetime Revenue"
          value={formatCurrency(data.lifetime.revenue)}
          sub={`${data.lifetime.purchaseCount} purchases`}
          icon={DollarSign}
        />
        <StatCard
          label="Active Members"
          value={data.members.active.toString()}
          sub={`Consilium`}
          icon={Users}
        />
        <StatCard
          label="Book Sales (30d)"
          value={data.activity.bookSales30d.toString()}
          sub={`${formatCurrency(
            data.revenueByType.find((r) => r.type === "BOOK")?.revenue ?? 0,
          )} revenue`}
          icon={TrendingUp}
        />
        <StatCard
          label="Churn Rate (30d)"
          value={`${data.activity.churnRatePct}%`}
          sub={`${data.activity.cancellations30d} cancellations`}
          icon={Activity}
          warn={data.activity.churnRatePct > 10}
        />
      </div>

      {/* Monthly revenue bar chart */}
      <div className="glass-card rounded-lg p-6">
        <h2 className="text-sm uppercase tracking-wider text-accent-gold mb-6">
          Monthly Revenue (last 12 months)
        </h2>
        {data.monthly.revenue.length === 0 ? (
          <p className="text-text-gray text-sm text-center py-8">
            No purchases in the last 12 months
          </p>
        ) : (
          <div className="flex items-end gap-2 h-48">
            {data.monthly.revenue.map((point) => {
              const height = (point.revenue / maxRevenue) * 100;
              return (
                <div
                  key={point.month}
                  className="flex-1 flex flex-col items-center gap-1 group"
                >
                  <div className="text-[10px] text-text-gray/60 opacity-0 group-hover:opacity-100 transition-opacity">
                    {formatCurrency(point.revenue)}
                  </div>
                  <div
                    className="w-full bg-accent-gold/30 hover:bg-accent-gold/60 transition-colors rounded-t"
                    style={{ height: `${Math.max(height, 2)}%` }}
                  />
                  <div className="text-[10px] text-text-gray/70 truncate w-full text-center">
                    {formatMonth(point.month)}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* 30-day conversion funnel */}
      <div className="glass-card rounded-lg p-6">
        <h2 className="text-sm uppercase tracking-wider text-accent-gold mb-6">
          Conversion Funnel (last 30 days)
        </h2>
        <div className="space-y-3">
          <FunnelRow label="Quiz taken" value={quiz} maxValue={Math.max(quiz, 1)} />
          <FunnelRow
            label="Applied to Consilium"
            value={apps}
            maxValue={Math.max(quiz, 1)}
            rate={quizToApp}
          />
          <FunnelRow
            label="Activated (paid)"
            value={active}
            maxValue={Math.max(quiz, 1)}
            rate={appToActive}
            isEnd
          />
        </div>
      </div>

      {/* Revenue by product + membership breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-card rounded-lg p-6">
          <h2 className="text-sm uppercase tracking-wider text-accent-gold mb-4">
            Revenue by Product (30d)
          </h2>
          {data.revenueByType.length === 0 ? (
            <p className="text-text-gray text-sm">No purchases</p>
          ) : (
            <div className="space-y-2">
              {data.revenueByType
                .sort((a, b) => b.revenue - a.revenue)
                .map((row) => (
                  <div
                    key={row.type}
                    className="flex items-center justify-between py-2 border-b border-white/5 last:border-0"
                  >
                    <span className="text-sm text-text-light">{row.type}</span>
                    <div className="text-right">
                      <span className="text-sm text-accent-gold font-medium">
                        {formatCurrency(row.revenue)}
                      </span>
                      <span className="text-xs text-text-gray/60 ml-2">
                        ({row.count})
                      </span>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>

        <div className="glass-card rounded-lg p-6">
          <h2 className="text-sm uppercase tracking-wider text-accent-gold mb-4">
            Membership Status
          </h2>
          <div className="space-y-2">
            {data.members.breakdown
              .sort((a, b) => b.count - a.count)
              .map((row) => (
                <div
                  key={row.status}
                  className="flex items-center justify-between py-2 border-b border-white/5 last:border-0"
                >
                  <span className="text-sm text-text-light capitalize">
                    {row.status.toLowerCase()}
                  </span>
                  <span className="text-sm text-text-gray">{row.count}</span>
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* Recent purchases */}
      <div className="glass-card rounded-lg p-6">
        <h2 className="text-sm uppercase tracking-wider text-accent-gold mb-4">
          Recent Purchases
        </h2>
        <div className="space-y-2">
          {data.recentPurchases.map((p) => (
            <div
              key={p.id}
              className="flex items-center justify-between py-2 border-b border-white/5 last:border-0 text-sm"
            >
              <div className="flex-1 min-w-0">
                <p className="text-text-light truncate">
                  {p.customerName} <span className="text-text-gray/60">{p.customerEmail}</span>
                </p>
                <p className="text-xs text-text-gray/60">
                  {p.type}
                  {p.productVariant ? ` • ${p.productVariant}` : ""} •{" "}
                  {new Date(p.createdAt).toLocaleDateString()}
                </p>
              </div>
              <span className="text-accent-gold font-medium">
                {formatCurrency(p.amount)}
              </span>
            </div>
          ))}
        </div>
      </div>

      <p className="text-xs text-text-gray/40 text-center">
        Generated {new Date(data.generatedAt).toLocaleString()}
      </p>
    </div>
  );
}

function StatCard({
  label,
  value,
  sub,
  icon: Icon,
  warn = false,
}: {
  label: string;
  value: string;
  sub: string;
  icon: typeof DollarSign;
  warn?: boolean;
}) {
  return (
    <div className="glass-card rounded-lg p-4">
      <div className="flex items-center gap-2 mb-2">
        <Icon
          size={14}
          className={warn ? "text-amber-400" : "text-accent-gold/60"}
        />
        <span className="text-xs uppercase tracking-wider text-text-gray">
          {label}
        </span>
      </div>
      <p
        className={`text-2xl font-light ${warn ? "text-amber-400" : "text-text-light"}`}
      >
        {value}
      </p>
      <p className="text-xs text-text-gray/60 mt-1">{sub}</p>
    </div>
  );
}

function FunnelRow({
  label,
  value,
  maxValue,
  rate,
  isEnd = false,
}: {
  label: string;
  value: number;
  maxValue: number;
  rate?: number;
  isEnd?: boolean;
}) {
  const pct = (value / maxValue) * 100;
  return (
    <div>
      <div className="flex items-baseline justify-between mb-1">
        <span className="text-sm text-text-gray">{label}</span>
        <div className="flex items-baseline gap-2">
          {rate !== undefined && (
            <span className="text-xs text-text-gray/60">
              {rate.toFixed(1)}%
            </span>
          )}
          <span
            className={`text-sm tabular-nums ${isEnd ? "text-accent-gold font-medium" : "text-text-light"}`}
          >
            {value}
          </span>
        </div>
      </div>
      <div className="h-2 bg-white/5 rounded overflow-hidden">
        <div
          className={`h-full rounded ${isEnd ? "bg-accent-gold" : "bg-accent-gold/40"}`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
