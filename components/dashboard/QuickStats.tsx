"use client";

import { BookOpen, Calendar, Trophy, TrendingUp } from "lucide-react";

interface QuickStatsProps {
  totalPurchases: number;
  upcomingSessions: number;
  completedSessions: number;
  daysActive: number;
}

const QuickStats = ({
  totalPurchases,
  upcomingSessions,
  completedSessions,
  daysActive,
}: QuickStatsProps) => {
  const stats = [
    {
      label: "Purchases",
      value: totalPurchases,
      icon: BookOpen,
      iconColor: "text-accent-gold",
      valueColor: "text-accent-gold",
      bgColor: "bg-accent-gold/10",
    },
    {
      label: "Upcoming Sessions",
      value: upcomingSessions,
      icon: Calendar,
      iconColor: "text-green-400",
      valueColor: "text-green-400",
      bgColor: "bg-green-500/10",
    },
    {
      label: "Completed",
      value: completedSessions,
      icon: Trophy,
      iconColor: "text-accent-burgundy",
      valueColor: "text-accent-burgundy",
      bgColor: "bg-accent-burgundy/10",
    },
    {
      label: "Days Active",
      value: daysActive,
      icon: TrendingUp,
      iconColor: "text-accent-sapphire",
      valueColor: "text-accent-sapphire",
      bgColor: "bg-accent-sapphire/10",
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="bg-gray-900/50 backdrop-blur-sm rounded-xl border border-gray-800 p-5 hover:border-accent-gold/30 transition-all duration-300 group"
        >
          <div className="flex items-center justify-between mb-3">
            <div
              className={`w-10 h-10 rounded-lg ${stat.bgColor} flex items-center justify-center group-hover:scale-110 transition-transform`}
            >
              <stat.icon
                size={20}
                strokeWidth={1.5}
                className={stat.iconColor}
              />
            </div>
            <span
              className={`text-2xl font-bold ${stat.valueColor}`}
            >
              {stat.value}
            </span>
          </div>
          <p className="text-text-gray text-sm">{stat.label}</p>
        </div>
      ))}
    </div>
  );
};

export default QuickStats;
