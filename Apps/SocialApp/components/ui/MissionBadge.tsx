import React from 'react';
import { View, StyleSheet } from 'react-native';
import {
  Snowflake,
  TrendingUp,
  Eye,
  Crown,
  RefreshCw,
  Building,
  Sparkles,
  ArrowLeftRight,
  Users,
  Ghost,
  Smartphone,
  LucideIcon,
} from 'lucide-react-native';

export type MissionBadgeSize = 'xs' | 'sm' | 'md' | 'lg';

interface MissionBadgeProps {
  weekNumber: number; // 1-12, or 0 for no badge
  size?: MissionBadgeSize;
}

interface MissionBadgeConfig {
  icon: LucideIcon;
  color: string;
}

const MISSION_BADGES: Record<number, MissionBadgeConfig> = {
  1: { icon: Snowflake, color: '#0EA5E9' },
  2: { icon: TrendingUp, color: '#C9A961' },
  3: { icon: Eye, color: '#DC2626' },
  4: { icon: Crown, color: '#7C3AED' },
  5: { icon: RefreshCw, color: '#F59E0B' },
  6: { icon: Building, color: '#EF4444' },
  7: { icon: Sparkles, color: '#14B8A6' },
  8: { icon: ArrowLeftRight, color: '#3B82F6' },
  9: { icon: Users, color: '#7C3AED' },
  10: { icon: Ghost, color: '#64748B' },
  11: { icon: Smartphone, color: '#D946EF' },
  12: { icon: Crown, color: '#C9A961' },
};

const BADGE_SIZES = {
  xs: { container: 14, icon: 8 },
  sm: { container: 16, icon: 10 },
  md: { container: 20, icon: 12 },
  lg: { container: 24, icon: 14 },
};

export function MissionBadge({ weekNumber, size = 'sm' }: MissionBadgeProps) {
  if (weekNumber < 1 || weekNumber > 12) return null;

  const mission = MISSION_BADGES[weekNumber];
  if (!mission) return null;

  const dims = BADGE_SIZES[size];
  const Icon = mission.icon;

  return (
    <View
      style={[
        styles.container,
        {
          width: dims.container,
          height: dims.container,
          borderRadius: dims.container / 2,
          backgroundColor: mission.color + 'CC', // 80% opacity
          borderColor: mission.color,
        },
      ]}
    >
      <Icon size={dims.icon} color="#FFFFFF" strokeWidth={2.5} />
    </View>
  );
}

// Export config for external use
export { MISSION_BADGES };

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 2,
  },
});
