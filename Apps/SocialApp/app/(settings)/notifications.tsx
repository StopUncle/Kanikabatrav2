import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Bell, MessageCircle, BookOpen, Calendar, Crown, Megaphone, Flame, Brain } from 'lucide-react-native';
import { Card } from '../../components/ui/Card';
import { SettingsHeader } from '../../components/ui/SettingsHeader';
import { SettingsToggle } from '../../components/ui/SettingsToggle';
import { colors, spacing, typography } from '../../lib/theme';
import { useSettingsStore, useNotificationSettings } from '../../stores/settingsStore';
import { notificationService } from '../../services/notificationService';
import { useEffect } from 'react';

export default function NotificationsScreen() {
  const notifications = useNotificationSettings();
  const updateSetting = useSettingsStore((state) => state.updateNotificationSetting);

  // Handle tactical brief toggle
  const handleTacticalBriefToggle = async (value: boolean) => {
    updateSetting('dailyTacticalBrief', value);
    if (value) {
      await notificationService.scheduleDailyTacticalBrief(9, 0); // 9 AM
    } else {
      await notificationService.cancelDailyTacticalBrief();
    }
  };

  // Handle streak reminder toggle
  const handleStreakReminderToggle = async (value: boolean) => {
    updateSetting('streakReminders', value);
    if (value) {
      await notificationService.scheduleDailyReminder(20, 0); // 8 PM
    } else {
      await notificationService.cancelDailyReminder();
    }
  };

  // Sync notification schedules on mount
  useEffect(() => {
    const syncNotifications = async () => {
      if (notifications.dailyTacticalBrief) {
        await notificationService.scheduleDailyTacticalBrief(9, 0);
      }
      if (notifications.streakReminders) {
        await notificationService.scheduleDailyReminder(20, 0);
      }
    };
    void syncNotifications();
  }, []);

  return (
    <View style={styles.container}>
      <SettingsHeader title="Notifications" />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Main Toggle */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>General</Text>
          <Card style={styles.card}>
            <SettingsToggle
              icon={<Bell size={20} color={colors.primary} strokeWidth={2} />}
              label="Push Notifications"
              description="Enable all push notifications"
              value={notifications.pushEnabled}
              onValueChange={(value) => updateSetting('pushEnabled', value)}
            />
          </Card>
        </View>

        {/* Notification Types */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Activity</Text>
          <Card style={styles.card}>
            <SettingsToggle
              icon={<MessageCircle size={20} color={colors.primary} strokeWidth={2} />}
              label="Messages"
              description="New direct messages and replies"
              value={notifications.messages}
              onValueChange={(value) => updateSetting('messages', value)}
              disabled={!notifications.pushEnabled}
            />
            <SettingsToggle
              icon={<BookOpen size={20} color={colors.primary} strokeWidth={2} />}
              label="Course Updates"
              description="New lessons and content"
              value={notifications.courseUpdates}
              onValueChange={(value) => updateSetting('courseUpdates', value)}
              disabled={!notifications.pushEnabled}
            />
            <SettingsToggle
              icon={<Calendar size={20} color={colors.primary} strokeWidth={2} />}
              label="Coaching Reminders"
              description="Upcoming session notifications"
              value={notifications.coachingReminders}
              onValueChange={(value) => updateSetting('coachingReminders', value)}
              disabled={!notifications.pushEnabled}
            />
          </Card>
        </View>

        {/* Daily Learning */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Daily Learning</Text>
          <Card style={styles.card}>
            <SettingsToggle
              icon={<Brain size={20} color={colors.accent} strokeWidth={2} />}
              label="Daily Tactical Brief"
              description="Morning psychology insights at 9 AM"
              value={notifications.dailyTacticalBrief}
              onValueChange={handleTacticalBriefToggle}
              disabled={!notifications.pushEnabled}
            />
            <SettingsToggle
              icon={<Flame size={20} color="#FF6B6B" strokeWidth={2} />}
              label="Streak Reminders"
              description="Evening reminder to maintain your streak"
              value={notifications.streakReminders}
              onValueChange={handleStreakReminderToggle}
              disabled={!notifications.pushEnabled}
            />
          </Card>
        </View>

        {/* Marketing */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Marketing</Text>
          <Card style={styles.card}>
            <SettingsToggle
              icon={<Crown size={20} color={colors.primary} strokeWidth={2} />}
              label="Promotions"
              description="Special offers and discounts"
              value={notifications.promotions}
              onValueChange={(value) => updateSetting('promotions', value)}
              disabled={!notifications.pushEnabled}
            />
            <SettingsToggle
              icon={<Megaphone size={20} color={colors.primary} strokeWidth={2} />}
              label="Announcements"
              description="Product updates and news"
              value={notifications.announcements}
              onValueChange={(value) => updateSetting('announcements', value)}
              disabled={!notifications.pushEnabled}
            />
          </Card>
        </View>

        <Text style={styles.disclaimer}>
          You can change these preferences at any time. Some notifications may still be sent for important account updates.
        </Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    padding: spacing.md,
    gap: spacing.lg,
  },
  section: {
    gap: spacing.sm,
  },
  sectionTitle: {
    fontSize: typography.md,
    fontWeight: typography.semibold,
    color: colors.secondary,
    paddingHorizontal: spacing.xs,
  },
  card: {
    padding: 0,
    overflow: 'hidden',
  },
  disclaimer: {
    fontSize: typography.xs,
    color: colors.tertiary,
    textAlign: 'center',
    lineHeight: 18,
  },
});
