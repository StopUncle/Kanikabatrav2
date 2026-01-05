import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import {
  Clock,
  Star,
  Briefcase,
  Heart,
  Users,
  HandshakeIcon,
  Swords,
  Home,
  HelpCircle,
  ChevronRight,
  Eye,
  EyeOff,
} from 'lucide-react-native';
import { Card } from '../ui/Card';
import { colors, spacing, typography, borderRadius } from '../../lib/theme';
import { haptics } from '../../lib/haptics';
import {
  type FieldReport,
  type ReportSituation,
  SITUATION_LABELS,
} from '../../content/fieldReports/types';

interface FieldReportCardProps {
  report: FieldReport;
  onPress?: () => void;
  compact?: boolean;
  showMission?: boolean;
}

const SITUATION_ICONS: Record<ReportSituation, React.ComponentType<{ size: number; color: string }>> = {
  work: Briefcase,
  relationship: Heart,
  social: Users,
  negotiation: HandshakeIcon,
  conflict: Swords,
  family: Home,
  other: HelpCircle,
};

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) {
    return 'Today';
  } else if (diffDays === 1) {
    return 'Yesterday';
  } else if (diffDays < 7) {
    return `${diffDays} days ago`;
  } else {
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  }
}

function RatingStars({ rating }: { rating: number }) {
  return (
    <View style={styles.starsContainer}>
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={12}
          color={star <= rating ? colors.accent : colors.border}
          fill={star <= rating ? colors.accent : 'transparent'}
        />
      ))}
    </View>
  );
}

export function FieldReportCard({
  report,
  onPress,
  compact = false,
  showMission = false,
}: FieldReportCardProps) {
  const SituationIcon = SITUATION_ICONS[report.situation];

  const handlePress = () => {
    if (onPress) {
      haptics.light();
      onPress();
    }
  };

  if (compact) {
    return (
      <Pressable onPress={handlePress} disabled={!onPress}>
        <Card style={styles.compactCard}>
          <View style={styles.compactIconContainer}>
            <SituationIcon size={18} color={colors.accent} />
          </View>
          <View style={styles.compactContent}>
            <Text style={styles.compactTactic} numberOfLines={1}>
              {report.tacticUsed}
            </Text>
            <View style={styles.compactMeta}>
              <Text style={styles.compactSituation}>
                {SITUATION_LABELS[report.situation]}
              </Text>
              <RatingStars rating={report.successRating} />
            </View>
          </View>
          {onPress && <ChevronRight size={18} color={colors.tertiary} />}
        </Card>
      </Pressable>
    );
  }

  return (
    <Pressable onPress={handlePress} disabled={!onPress}>
      <Card style={styles.card}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <View style={styles.situationBadge}>
              <SituationIcon size={14} color={colors.accent} />
              <Text style={styles.situationText}>
                {SITUATION_LABELS[report.situation]}
              </Text>
            </View>
            {showMission && report.missionWeek && (
              <Text style={styles.missionWeek}>Week {report.missionWeek}</Text>
            )}
          </View>
          <View style={styles.headerRight}>
            <Clock size={12} color={colors.tertiary} />
            <Text style={styles.dateText}>{formatDate(report.createdAt)}</Text>
          </View>
        </View>

        {/* Tactic Used */}
        <View style={styles.tacticSection}>
          <Text style={styles.tacticLabel}>Tactic Applied</Text>
          <Text style={styles.tacticText}>{report.tacticUsed}</Text>
        </View>

        {/* What Happened */}
        <Text style={styles.storyText} numberOfLines={3}>
          {report.whatHappened}
        </Text>

        {/* Footer */}
        <View style={styles.footer}>
          <View style={styles.ratingSection}>
            <Text style={styles.ratingLabel}>Result:</Text>
            <RatingStars rating={report.successRating} />
          </View>
          <View style={styles.visibilityBadge}>
            {report.isPublic ? (
              <>
                <Eye size={12} color={colors.tertiary} />
                <Text style={styles.visibilityText}>
                  {report.isAnonymous ? 'Anonymous' : 'Public'}
                </Text>
              </>
            ) : (
              <>
                <EyeOff size={12} color={colors.tertiary} />
                <Text style={styles.visibilityText}>Private</Text>
              </>
            )}
          </View>
        </View>
      </Card>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    gap: spacing.sm,
  },
  compactCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    padding: spacing.md,
  },
  compactIconContainer: {
    width: 36,
    height: 36,
    borderRadius: borderRadius.md,
    backgroundColor: colors.accentMuted,
    alignItems: 'center',
    justifyContent: 'center',
  },
  compactContent: {
    flex: 1,
    gap: 2,
  },
  compactTactic: {
    fontSize: typography.md,
    fontWeight: typography.semibold,
    color: colors.primary,
  },
  compactMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  compactSituation: {
    fontSize: typography.xs,
    color: colors.secondary,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  situationBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: colors.accentMuted,
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: borderRadius.full,
  },
  situationText: {
    fontSize: typography.xs,
    fontWeight: typography.medium,
    color: colors.accent,
  },
  missionWeek: {
    fontSize: typography.xs,
    color: colors.tertiary,
  },
  dateText: {
    fontSize: typography.xs,
    color: colors.tertiary,
  },
  tacticSection: {
    gap: 2,
  },
  tacticLabel: {
    fontSize: typography.xs,
    color: colors.tertiary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  tacticText: {
    fontSize: typography.lg,
    fontWeight: typography.semibold,
    color: colors.primary,
  },
  storyText: {
    fontSize: typography.sm,
    color: colors.secondary,
    lineHeight: 20,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  ratingSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  ratingLabel: {
    fontSize: typography.xs,
    color: colors.tertiary,
  },
  starsContainer: {
    flexDirection: 'row',
    gap: 2,
  },
  visibilityBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  visibilityText: {
    fontSize: typography.xs,
    color: colors.tertiary,
  },
});
