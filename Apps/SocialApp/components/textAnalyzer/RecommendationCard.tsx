// Recommendation Card
// Displays strategic advice based on analysis results

import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import {
  Crown,
  Shield,
  MessageSquare,
  LogOut,
  AlertTriangle,
  CheckCircle,
  Info,
  ChevronRight,
} from 'lucide-react-native';
import { GlassCard } from '../ui/GlassCard';
import { Card } from '../ui/Card';
import { colors, spacing, typography, borderRadius } from '../../lib/theme';
import { haptics } from '../../lib/haptics';
import { Recommendation } from '../../content/powerDynamics/types';
import { priorityColors, categoryIcons } from '../../content/powerDynamics/recommendations';

interface RecommendationCardProps {
  recommendations: Recommendation[];
  onRecommendationPress?: (recommendation: Recommendation) => void;
}

export function RecommendationCard({
  recommendations,
  onRecommendationPress,
}: RecommendationCardProps) {
  if (recommendations.length === 0) {
    return null;
  }

  return (
    <GlassCard variant="medium" style={styles.container}>
      <View style={styles.header}>
        <Shield size={20} color={colors.accent} />
        <Text style={styles.title}>Strategic Recommendations</Text>
      </View>

      <View style={styles.list}>
        {recommendations.map((rec, index) => (
          <RecommendationItem
            key={rec.id}
            recommendation={rec}
            onPress={onRecommendationPress}
            isLast={index === recommendations.length - 1}
          />
        ))}
      </View>
    </GlassCard>
  );
}

interface RecommendationItemProps {
  recommendation: Recommendation;
  onPress?: (recommendation: Recommendation) => void;
  isLast: boolean;
}

function RecommendationItem({ recommendation, onPress, isLast }: RecommendationItemProps) {
  const priorityColor = priorityColors[recommendation.priority];
  const CategoryIcon = getCategoryIcon(recommendation.category);
  const PriorityIcon = getPriorityIcon(recommendation.priority);

  const handlePress = () => {
    haptics.light();
    onPress?.(recommendation);
  };

  return (
    <Pressable
      onPress={handlePress}
      style={({ pressed }) => [
        styles.item,
        !isLast && styles.itemBorder,
        pressed && styles.itemPressed,
      ]}
    >
      <View style={[styles.priorityIndicator, { backgroundColor: priorityColor }]} />

      <View style={styles.itemContent}>
        <View style={styles.itemHeader}>
          <View style={styles.itemTitleRow}>
            <CategoryIcon size={16} color={colors.accent} />
            <Text style={styles.itemTitle}>{recommendation.title}</Text>
          </View>
          <View style={[styles.priorityBadge, { backgroundColor: `${priorityColor}20` }]}>
            <PriorityIcon size={12} color={priorityColor} />
            <Text style={[styles.priorityText, { color: priorityColor }]}>
              {recommendation.priority.toUpperCase()}
            </Text>
          </View>
        </View>

        <Text style={styles.itemDescription}>{recommendation.description}</Text>

        <View style={styles.actionContainer}>
          <Text style={styles.actionLabel}>Action:</Text>
          <Text style={styles.actionText}>{recommendation.action}</Text>
        </View>
      </View>

      <ChevronRight size={18} color={colors.tertiary} />
    </Pressable>
  );
}

// Compact single recommendation for inline use
export function CompactRecommendation({ recommendation }: { recommendation: Recommendation }) {
  const priorityColor = priorityColors[recommendation.priority];

  return (
    <Card variant="glass" style={styles.compactCard}>
      <View style={styles.compactContent}>
        <View style={[styles.compactDot, { backgroundColor: priorityColor }]} />
        <View style={styles.compactTextContainer}>
          <Text style={styles.compactTitle}>{recommendation.title}</Text>
          <Text style={styles.compactAction} numberOfLines={2}>
            {recommendation.action}
          </Text>
        </View>
      </View>
    </Card>
  );
}

// Get icon for category
function getCategoryIcon(category: Recommendation['category']) {
  switch (category) {
    case 'power':
      return Crown;
    case 'boundaries':
      return Shield;
    case 'communication':
      return MessageSquare;
    case 'exit':
      return LogOut;
    default:
      return Info;
  }
}

// Get icon for priority
function getPriorityIcon(priority: Recommendation['priority']) {
  switch (priority) {
    case 'critical':
    case 'high':
      return AlertTriangle;
    case 'medium':
      return Info;
    case 'low':
      return CheckCircle;
    default:
      return Info;
  }
}

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.md,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  title: {
    fontSize: typography.lg,
    fontWeight: typography.semibold,
    color: colors.primary,
  },
  list: {},
  item: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: spacing.md,
  },
  itemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  itemPressed: {
    opacity: 0.7,
  },
  priorityIndicator: {
    width: 4,
    height: '100%',
    minHeight: 60,
    borderRadius: 2,
    marginRight: spacing.sm,
  },
  itemContent: {
    flex: 1,
    marginRight: spacing.sm,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.xs,
  },
  itemTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    flex: 1,
  },
  itemTitle: {
    fontSize: typography.md,
    fontWeight: typography.semibold,
    color: colors.primary,
    flex: 1,
  },
  priorityBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingVertical: 2,
    paddingHorizontal: spacing.xs,
    borderRadius: borderRadius.sm,
  },
  priorityText: {
    fontSize: typography.xs,
    fontWeight: typography.semibold,
  },
  itemDescription: {
    fontSize: typography.sm,
    color: colors.secondary,
    marginBottom: spacing.sm,
    lineHeight: 20,
  },
  actionContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xs,
  },
  actionLabel: {
    fontSize: typography.sm,
    fontWeight: typography.medium,
    color: colors.accent,
  },
  actionText: {
    fontSize: typography.sm,
    color: colors.primary,
    flex: 1,
  },
  compactCard: {
    padding: spacing.sm,
    marginBottom: spacing.xs,
  },
  compactContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  compactDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginTop: 6,
    marginRight: spacing.sm,
  },
  compactTextContainer: {
    flex: 1,
  },
  compactTitle: {
    fontSize: typography.sm,
    fontWeight: typography.medium,
    color: colors.primary,
    marginBottom: 2,
  },
  compactAction: {
    fontSize: typography.xs,
    color: colors.secondary,
    lineHeight: 16,
  },
});
