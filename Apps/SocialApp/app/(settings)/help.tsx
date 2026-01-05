import { View, Text, StyleSheet, ScrollView, Pressable, Linking } from 'react-native';
import {
  MessageCircle,
  Mail,
  ChevronRight,
  FileQuestion,
  ExternalLink,
} from 'lucide-react-native';
import { Card } from '../../components/ui/Card';
import { SettingsHeader } from '../../components/ui/SettingsHeader';
import { haptics } from '../../lib/haptics';
import { colors, spacing, typography } from '../../lib/theme';

interface HelpItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  onPress: () => void;
  external?: boolean;
}

function HelpItem({ icon, title, description, onPress, external }: HelpItemProps) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.helpItem,
        pressed && styles.helpItemPressed,
      ]}
      onPress={() => {
        haptics.light();
        onPress();
      }}
    >
      <View style={styles.helpIconContainer}>{icon}</View>
      <View style={styles.helpContent}>
        <Text style={styles.helpTitle}>{title}</Text>
        <Text style={styles.helpDescription}>{description}</Text>
      </View>
      {external ? (
        <ExternalLink size={18} color={colors.tertiary} strokeWidth={2} />
      ) : (
        <ChevronRight size={18} color={colors.tertiary} strokeWidth={2} />
      )}
    </Pressable>
  );
}

interface FAQItemProps {
  question: string;
  answer: string;
}

function FAQItem({ question, answer }: FAQItemProps) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.faqItem,
        pressed && styles.faqItemPressed,
      ]}
      onPress={() => haptics.light()}
    >
      <View style={styles.faqQuestion}>
        <FileQuestion size={18} color={colors.accent} strokeWidth={2} />
        <Text style={styles.faqQuestionText}>{question}</Text>
      </View>
      <Text style={styles.faqAnswer}>{answer}</Text>
    </Pressable>
  );
}

const faqs = [
  {
    question: 'How do I upgrade my subscription?',
    answer: 'Go to Profile > Subscription and select the plan you want. You can upgrade, downgrade, or cancel at any time.',
  },
  {
    question: 'Can I download courses offline?',
    answer: 'Offline downloads are available for Premium and VIP members. Look for the download icon on any lesson.',
  },
  {
    question: 'How do coaching sessions work?',
    answer: 'Book a session through the Coach tab. Premium members get 1 session/month, VIP members get weekly sessions.',
  },
  {
    question: 'Is my data secure?',
    answer: 'Yes, we use industry-standard encryption and never share your personal data with third parties.',
  },
];

export default function HelpScreen() {
  const handleContact = (method: string) => {
    if (method === 'email') {
      void Linking.openURL('mailto:support@thedarkmmirror.com');
    } else if (method === 'chat') {
      // Open in-app chat
    }
  };

  return (
    <View style={styles.container}>
      <SettingsHeader title="Help & Support" />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Contact Options */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contact Us</Text>
          <Card style={styles.card}>
            <HelpItem
              icon={<MessageCircle size={20} color={colors.primary} strokeWidth={2} />}
              title="Live Chat"
              description="Chat with our support team"
              onPress={() => handleContact('chat')}
            />
            <HelpItem
              icon={<Mail size={20} color={colors.primary} strokeWidth={2} />}
              title="Email Support"
              description="support@thedarkmirror.com"
              onPress={() => handleContact('email')}
              external
            />
          </Card>
        </View>

        {/* FAQs */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>
          <Card style={styles.faqCard}>
            {faqs.map((faq, index) => (
              <FAQItem key={index} question={faq.question} answer={faq.answer} />
            ))}
          </Card>
        </View>

        {/* Response Time */}
        <Card style={styles.responseCard}>
          <Text style={styles.responseTitle}>Average Response Time</Text>
          <Text style={styles.responseTime}>Under 24 hours</Text>
          <Text style={styles.responseNote}>
            VIP members receive priority support with faster response times.
          </Text>
        </Card>
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
  helpItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    gap: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  helpItemPressed: {
    backgroundColor: colors.surfaceElevated,
  },
  helpIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: colors.surfaceElevated,
    alignItems: 'center',
    justifyContent: 'center',
  },
  helpContent: {
    flex: 1,
    gap: 2,
  },
  helpTitle: {
    fontSize: typography.md,
    fontWeight: typography.medium,
    color: colors.primary,
  },
  helpDescription: {
    fontSize: typography.sm,
    color: colors.tertiary,
  },
  faqCard: {
    padding: 0,
    overflow: 'hidden',
  },
  faqItem: {
    padding: spacing.md,
    gap: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  faqItemPressed: {
    backgroundColor: colors.surfaceElevated,
  },
  faqQuestion: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  faqQuestionText: {
    fontSize: typography.md,
    fontWeight: typography.medium,
    color: colors.primary,
    flex: 1,
  },
  faqAnswer: {
    fontSize: typography.sm,
    color: colors.secondary,
    lineHeight: 20,
    paddingLeft: 26,
  },
  responseCard: {
    alignItems: 'center',
    gap: spacing.sm,
    backgroundColor: colors.accentMuted,
    borderColor: colors.accent,
    borderWidth: 1,
  },
  responseTitle: {
    fontSize: typography.sm,
    color: colors.secondary,
  },
  responseTime: {
    fontSize: typography.xxl,
    fontWeight: typography.bold,
    color: colors.accent,
  },
  responseNote: {
    fontSize: typography.xs,
    color: colors.tertiary,
    textAlign: 'center',
  },
});
