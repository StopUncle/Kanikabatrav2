import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Card } from '../../components/ui/Card';
import { SettingsHeader } from '../../components/ui/SettingsHeader';
import { colors, spacing, typography } from '../../lib/theme';

const sections = [
  {
    title: '1. Acceptance of Terms',
    content: 'By accessing and using The Dark Mirror, you agree to be bound by these Terms of Service and all applicable laws and regulations.',
  },
  {
    title: '2. User Accounts',
    content: 'You are responsible for maintaining the confidentiality of your account credentials. You agree to accept responsibility for all activities that occur under your account.',
  },
  {
    title: '3. Subscription & Payments',
    content: 'Subscription fees are billed in advance on a monthly or annual basis. You may cancel your subscription at any time, but no refunds will be provided for partial billing periods.',
  },
  {
    title: '4. Content & Intellectual Property',
    content: 'All content, including courses, quizzes, and materials, is owned by The Dark Mirror. You may not reproduce, distribute, or create derivative works without our permission.',
  },
  {
    title: '5. User Conduct',
    content: 'You agree not to use the service for any unlawful purpose or in any way that could damage, disable, or impair the service.',
  },
  {
    title: '6. Limitation of Liability',
    content: 'The Dark Mirror shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of the service.',
  },
];

export default function TermsScreen() {
  return (
    <View style={styles.container}>
      <SettingsHeader title="Terms of Service" />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Terms */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Terms & Conditions</Text>
          <Card style={styles.termsCard}>
            {sections.map((section, index) => (
              <View key={index} style={styles.termSection}>
                <Text style={styles.termTitle}>{section.title}</Text>
                <Text style={styles.termContent}>{section.content}</Text>
              </View>
            ))}
          </Card>
        </View>

        {/* Last Updated */}
        <View style={styles.footer}>
          <Text style={styles.lastUpdated}>Last updated: December 2024</Text>
          <Text style={styles.footerNote}>
            By using The Dark Mirror, you acknowledge that you have read and understood these terms.
          </Text>
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
  termsCard: {
    gap: spacing.lg,
  },
  termSection: {
    gap: spacing.xs,
  },
  termTitle: {
    fontSize: typography.md,
    fontWeight: typography.semibold,
    color: colors.primary,
  },
  termContent: {
    fontSize: typography.sm,
    color: colors.secondary,
    lineHeight: 20,
  },
  footer: {
    alignItems: 'center',
    gap: spacing.sm,
    paddingVertical: spacing.md,
  },
  lastUpdated: {
    fontSize: typography.sm,
    fontWeight: typography.medium,
    color: colors.accent,
  },
  footerNote: {
    fontSize: typography.xs,
    color: colors.tertiary,
    textAlign: 'center',
    lineHeight: 18,
  },
});
