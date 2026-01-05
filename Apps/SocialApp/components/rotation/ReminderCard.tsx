// Reminder Card Component
// Displays smart reminders with actionable suggestions

import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import {
  Bell,
  Clock,
  Calendar,
  MessageSquare,
  AlertTriangle,
  ChevronRight,
  X,
} from 'lucide-react-native';
import { GlassCard } from '../ui/GlassCard';
import { colors, spacing, typography, borderRadius } from '../../lib/theme';
import { haptics } from '../../lib/haptics';
import { SmartReminder } from '../../content/rotation/types';

interface ReminderCardProps {
  reminder: SmartReminder;
  onPress: () => void;
  onDismiss: () => void;
}

const REMINDER_ICONS: Record<SmartReminder['type'], typeof Bell> = {
  follow_up: MessageSquare,
  cooling_off: Clock,
  check_in: Bell,
  date_suggestion: Calendar,
  threat_warning: AlertTriangle,
};

const REMINDER_COLORS: Record<SmartReminder['type'], string> = {
  follow_up: colors.accent,
  cooling_off: '#3B82F6', // Blue
  check_in: '#8B5CF6', // Purple
  date_suggestion: '#22C55E', // Green
  threat_warning: '#EF4444', // Red
};

export function ReminderCard({ reminder, onPress, onDismiss }: ReminderCardProps) {
  const Icon = REMINDER_ICONS[reminder.type];
  const color = REMINDER_COLORS[reminder.type];

  const handlePress = () => {
    haptics.light();
    onPress();
  };

  const handleDismiss = () => {
    haptics.light();
    onDismiss();
  };

  return (
    <GlassCard
      variant="medium"
      style={[styles.card, { borderLeftColor: color }]}
    >
      <Pressable onPress={handlePress} style={styles.content}>
        <View style={[styles.iconContainer, { backgroundColor: `${color}20` }]}>
          <Icon size={20} color={color} />
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.prospectName}>{reminder.prospectName}</Text>
          <Text style={styles.message}>{reminder.message}</Text>
          <Text style={styles.suggestion}>{reminder.suggestion}</Text>
        </View>

        <Pressable onPress={handleDismiss} style={styles.dismissButton}>
          <X size={18} color={colors.tertiary} />
        </Pressable>
      </Pressable>
    </GlassCard>
  );
}

// Compact version for list display
export function ReminderBadge({
  reminder,
  onPress,
}: {
  reminder: SmartReminder;
  onPress: () => void;
}) {
  const Icon = REMINDER_ICONS[reminder.type];
  const color = REMINDER_COLORS[reminder.type];

  return (
    <Pressable
      onPress={() => {
        haptics.light();
        onPress();
      }}
      style={[styles.badge, { borderColor: color }]}
    >
      <Icon size={14} color={color} />
      <Text style={[styles.badgeText, { color }]} numberOfLines={1}>
        {reminder.message}
      </Text>
      <ChevronRight size={14} color={color} />
    </Pressable>
  );
}

// Summary card showing all reminders
interface ReminderSummaryProps {
  reminders: SmartReminder[];
  onViewAll: () => void;
  onReminderPress: (reminder: SmartReminder) => void;
  onDismiss: (reminderId: string) => void;
}

export function ReminderSummary({
  reminders,
  onViewAll,
  onReminderPress,
  onDismiss,
}: ReminderSummaryProps) {
  if (reminders.length === 0) return null;

  const displayReminders = reminders.slice(0, 3);
  const hasMore = reminders.length > 3;

  return (
    <GlassCard variant="gold" style={styles.summaryCard}>
      <Pressable onPress={onViewAll} style={styles.summaryHeader}>
        <View style={styles.summaryTitleRow}>
          <Bell size={18} color={colors.accent} />
          <Text style={styles.summaryTitle}>
            {reminders.length} Reminder{reminders.length !== 1 ? 's' : ''}
          </Text>
        </View>
        {hasMore && (
          <View style={styles.viewAllRow}>
            <Text style={styles.viewAllText}>View all</Text>
            <ChevronRight size={16} color={colors.accent} />
          </View>
        )}
      </Pressable>

      <View style={styles.remindersList}>
        {displayReminders.map((reminder) => (
          <ReminderListItem
            key={reminder.id}
            reminder={reminder}
            onPress={() => onReminderPress(reminder)}
            onDismiss={() => onDismiss(reminder.id)}
          />
        ))}
      </View>
    </GlassCard>
  );
}

// Individual reminder in the summary list
function ReminderListItem({
  reminder,
  onPress,
  onDismiss,
}: {
  reminder: SmartReminder;
  onPress: () => void;
  onDismiss: () => void;
}) {
  const Icon = REMINDER_ICONS[reminder.type];
  const color = REMINDER_COLORS[reminder.type];

  return (
    <Pressable onPress={onPress} style={styles.listItem}>
      <View style={[styles.listItemDot, { backgroundColor: color }]} />
      <View style={styles.listItemContent}>
        <Text style={styles.listItemName}>{reminder.prospectName}</Text>
        <Text style={styles.listItemMessage} numberOfLines={1}>
          {reminder.message}
        </Text>
      </View>
      <Pressable
        onPress={(e) => {
          e.stopPropagation?.();
          onDismiss();
        }}
        style={styles.listItemDismiss}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      >
        <X size={14} color={colors.tertiary} />
      </Pressable>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: spacing.sm,
    borderLeftWidth: 3,
    overflow: 'hidden',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.md,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
  },
  prospectName: {
    fontSize: typography.md,
    fontWeight: typography.semibold,
    color: colors.primary,
    marginBottom: 2,
  },
  message: {
    fontSize: typography.sm,
    color: colors.secondary,
    marginBottom: spacing.xs,
  },
  suggestion: {
    fontSize: typography.xs,
    color: colors.accent,
    fontStyle: 'italic',
  },
  dismissButton: {
    padding: spacing.xs,
  },
  // Badge styles
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.sm,
    borderRadius: borderRadius.full,
    backgroundColor: 'rgba(0,0,0,0.2)',
    borderWidth: 1,
  },
  badgeText: {
    fontSize: typography.xs,
    fontWeight: typography.medium,
    flex: 1,
  },
  // Summary card styles
  summaryCard: {
    marginBottom: spacing.md,
  },
  summaryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  summaryTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  summaryTitle: {
    fontSize: typography.md,
    fontWeight: typography.semibold,
    color: colors.primary,
  },
  viewAllRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  viewAllText: {
    fontSize: typography.xs,
    color: colors.accent,
    fontWeight: typography.medium,
  },
  remindersList: {
    gap: spacing.xs,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.2)',
    borderRadius: borderRadius.sm,
    padding: spacing.sm,
    gap: spacing.sm,
  },
  listItemDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  listItemContent: {
    flex: 1,
  },
  listItemName: {
    fontSize: typography.sm,
    fontWeight: typography.medium,
    color: colors.primary,
  },
  listItemMessage: {
    fontSize: typography.xs,
    color: colors.secondary,
  },
  listItemDismiss: {
    padding: spacing.xs,
  },
});
