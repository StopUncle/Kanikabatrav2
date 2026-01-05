import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Brain, Vibrate, Sparkles } from 'lucide-react-native';
import { Card } from '../../components/ui/Card';
import { SettingsHeader } from '../../components/ui/SettingsHeader';
import { SettingsToggle } from '../../components/ui/SettingsToggle';
import { colors, spacing, typography } from '../../lib/theme';
import { useSettingsStore, useAppearanceSettings, useSimulatorSettings } from '../../stores/settingsStore';

export default function AppearanceScreen() {
  const appearance = useAppearanceSettings();
  const simulator = useSimulatorSettings();
  const updateAppearance = useSettingsStore((state) => state.updateAppearanceSetting);
  const updateSimulator = useSettingsStore((state) => state.updateSimulatorSetting);
  const innerVoiceEnabled = simulator?.innerVoiceEnabled ?? true;

  return (
    <View style={styles.container}>
      <SettingsHeader title="Appearance" />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Motion & Feedback */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Motion & Feedback</Text>

          <Card style={styles.toggleCard}>
            <SettingsToggle
              icon={<Vibrate size={20} color={colors.secondary} />}
              label="Haptic Feedback"
              description="Vibration on button presses"
              value={appearance.hapticFeedback}
              onValueChange={(value) => updateAppearance('hapticFeedback', value)}
            />
            <SettingsToggle
              icon={<Sparkles size={20} color={colors.secondary} />}
              label="Reduced Motion"
              description="Minimize animations"
              value={appearance.reducedMotion}
              onValueChange={(value) => updateAppearance('reducedMotion', value)}
            />
          </Card>
        </View>

        {/* Simulator Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Dating Simulator</Text>
          <Text style={styles.sectionDescription}>
            Customize your simulator experience
          </Text>

          <Card style={styles.toggleCard}>
            <SettingsToggle
              icon={<Brain size={20} color="#9370DB" />}
              label="Inner Voice Guidance"
              description="Show tactical teaching moments during scenarios"
              value={innerVoiceEnabled}
              onValueChange={(value) => updateSimulator('innerVoiceEnabled', value)}
            />
          </Card>
        </View>

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
    gap: spacing.xl,
  },
  section: {
    gap: spacing.md,
  },
  sectionTitle: {
    fontSize: typography.md,
    fontWeight: typography.semibold,
    color: colors.secondary,
  },
  sectionDescription: {
    fontSize: typography.sm,
    color: colors.tertiary,
  },
  toggleCard: {
    padding: 0,
  },
});
