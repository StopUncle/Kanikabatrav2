import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Pressable,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import { ChevronLeft, Sparkles, Check } from 'lucide-react-native';
import { Button } from '../../../components/ui/Button';
import { haptics } from '../../../lib/haptics';
import { colors, spacing, typography, borderRadius } from '../../../lib/theme';

export default function EmailCaptureScreen() {
  const { quizId, answers } = useLocalSearchParams<{ quizId: string; answers: string }>();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [isFocused, setIsFocused] = useState<'email' | 'name' | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async () => {
    if (!isValidEmail) {
      haptics.error();
      return;
    }

    haptics.medium();
    setIsLoading(true);

    // Simulate API call to save lead
    await new Promise(resolve => setTimeout(resolve, 1000));

    setIsLoading(false);
    haptics.success();

    // Navigate to results
    router.push({
      pathname: `/(quiz)/${quizId}/result`,
      params: { answers, email, name },
    });
  };

  const handleSkip = () => {
    haptics.light();
    router.push({
      pathname: `/(quiz)/${quizId}/result`,
      params: { answers },
    });
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        {/* Header */}
        <View style={styles.header}>
          <Pressable
            style={styles.backButton}
            onPress={() => {
              haptics.light();
              router.replace(`/(quiz)/${quizId}`);
            }}
          >
            <ChevronLeft size={28} color={colors.primary} strokeWidth={2} />
          </Pressable>
          <Pressable onPress={handleSkip}>
            <Text style={styles.skipText}>Skip</Text>
          </Pressable>
        </View>

        {/* Content */}
        <View style={styles.content}>
          <View style={styles.hero}>
            <View style={styles.heroIconContainer}>
              <Sparkles size={48} color={colors.accent} strokeWidth={1.5} />
            </View>
            <Text style={styles.heroTitle}>Your Results Are Ready</Text>
            <Text style={styles.heroText}>
              Enter your email to receive your personalized insights and unlock
              exclusive content about dark psychology.
            </Text>
          </View>

          {/* Form */}
          <View style={styles.form}>
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Email Address</Text>
              <TextInput
                style={[
                  styles.input,
                  isFocused === 'email' && styles.inputFocused,
                ]}
                placeholder="you@example.com"
                placeholderTextColor={colors.tertiary}
                value={email}
                onChangeText={setEmail}
                onFocus={() => {
                  haptics.light();
                  setIsFocused('email');
                }}
                onBlur={() => setIsFocused(null)}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>First Name (optional)</Text>
              <TextInput
                style={[
                  styles.input,
                  isFocused === 'name' && styles.inputFocused,
                ]}
                placeholder="Your first name"
                placeholderTextColor={colors.tertiary}
                value={name}
                onChangeText={setName}
                onFocus={() => {
                  haptics.light();
                  setIsFocused('name');
                }}
                onBlur={() => setIsFocused(null)}
                autoCapitalize="words"
              />
            </View>
          </View>

          {/* Benefits */}
          <View style={styles.benefits}>
            <View style={styles.benefitItem}>
              <Check size={16} color={colors.accent} strokeWidth={2.5} />
              <Text style={styles.benefitText}>Detailed result breakdown</Text>
            </View>
            <View style={styles.benefitItem}>
              <Check size={16} color={colors.accent} strokeWidth={2.5} />
              <Text style={styles.benefitText}>Weekly psychology insights</Text>
            </View>
            <View style={styles.benefitItem}>
              <Check size={16} color={colors.accent} strokeWidth={2.5} />
              <Text style={styles.benefitText}>Exclusive content & offers</Text>
            </View>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Button
            title="Reveal My Results"
            onPress={handleSubmit}
            disabled={!isValidEmail}
            loading={isLoading}
          />
          <Text style={styles.privacyText}>
            We respect your privacy. Unsubscribe anytime.
          </Text>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  keyboardView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  skipText: {
    fontSize: typography.md,
    color: colors.secondary,
    fontWeight: typography.medium,
  },
  content: {
    flex: 1,
    padding: spacing.lg,
    gap: spacing.xl,
  },
  hero: {
    alignItems: 'center',
    gap: spacing.sm,
  },
  heroIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.accentMuted,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroTitle: {
    fontSize: typography.xl,
    fontWeight: typography.bold,
    color: colors.primary,
    textAlign: 'center',
  },
  heroText: {
    fontSize: typography.md,
    color: colors.secondary,
    textAlign: 'center',
    lineHeight: 24,
  },
  form: {
    gap: spacing.md,
  },
  inputGroup: {
    gap: spacing.xs,
  },
  inputLabel: {
    fontSize: typography.sm,
    color: colors.secondary,
    fontWeight: typography.medium,
  },
  input: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.border,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
    fontSize: typography.md,
    color: colors.primary,
  },
  inputFocused: {
    borderColor: colors.accent,
  },
  benefits: {
    gap: spacing.sm,
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  benefitText: {
    fontSize: typography.sm,
    color: colors.secondary,
  },
  footer: {
    padding: spacing.lg,
    gap: spacing.md,
  },
  privacyText: {
    fontSize: typography.xs,
    color: colors.tertiary,
    textAlign: 'center',
  },
});
