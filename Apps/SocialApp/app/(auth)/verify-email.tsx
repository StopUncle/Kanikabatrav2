import { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Mail, CheckCircle, RefreshCw, ArrowLeft } from 'lucide-react-native';
import { Button } from '../../components/ui/Button';
import { haptics } from '../../lib/haptics';
import { colors, spacing, typography, borderRadius } from '../../lib/theme';
import { supabase, isSupabaseConfigured } from '../../lib/supabase';

export default function VerifyEmailScreen() {
  const { email } = useLocalSearchParams<{ email: string }>();
  const [isResending, setIsResending] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);
  const [isVerified, setIsVerified] = useState(false);

  // Countdown timer for resend cooldown
  useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendCooldown]);

  // Check for verification status periodically
  useEffect(() => {
    // Stop polling if already verified or missing config
    if (!isSupabaseConfigured || !email || isVerified) return;

    const checkVerification = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user?.email_confirmed_at) {
        setIsVerified(true);
        haptics.success();
      }
    };

    // Check every 3 seconds
    const interval = setInterval(() => {
      void checkVerification();
    }, 3000);
    return () => clearInterval(interval);
  }, [email, isVerified]);

  const handleResendEmail = async () => {
    if (resendCooldown > 0 || !email) return;

    setIsResending(true);
    haptics.light();

    if (!isSupabaseConfigured) {
      // Demo mode
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsResending(false);
      setResendCooldown(60);
      haptics.success();
      return;
    }

    const { error } = await supabase.auth.resend({
      type: 'signup',
      email: email,
    });

    setIsResending(false);

    if (error) {
      haptics.error();
    } else {
      haptics.success();
      setResendCooldown(60); // 60 second cooldown
    }
  };

  const handleContinue = () => {
    haptics.medium();
    router.replace('/(tabs)');
  };

  const handleOpenEmail = () => {
    haptics.light();
    // In a real app, this could use Linking to open the email app
  };

  if (isVerified) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          <View style={styles.verifiedIcon}>
            <CheckCircle size={56} color={colors.success} />
          </View>
          <Text style={styles.title}>Email Verified!</Text>
          <Text style={styles.subtitle}>
            Your email has been successfully verified. You're all set!
          </Text>
          <Button
            title="Continue to App"
            onPress={handleContinue}
            style={styles.button}
          />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Pressable
        style={styles.backButton}
        onPress={() => {
          haptics.light();
          router.replace('/(auth)/signup');
        }}
      >
        <ArrowLeft size={24} color={colors.primary} />
      </Pressable>

      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <Mail size={56} color={colors.accent} strokeWidth={1.5} />
        </View>

        <Text style={styles.title}>Verify your email</Text>
        <Text style={styles.subtitle}>
          We've sent a verification link to
        </Text>
        <Text style={styles.email}>{email || 'your email'}</Text>

        <View style={styles.instructions}>
          <View style={styles.step}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>1</Text>
            </View>
            <Text style={styles.stepText}>Check your inbox</Text>
          </View>
          <View style={styles.step}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>2</Text>
            </View>
            <Text style={styles.stepText}>Click the verification link</Text>
          </View>
          <View style={styles.step}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>3</Text>
            </View>
            <Text style={styles.stepText}>Return to the app</Text>
          </View>
        </View>

        <View style={styles.actions}>
          <Button
            title="Open Email App"
            onPress={handleOpenEmail}
            style={styles.button}
          />

          <Pressable
            style={[
              styles.resendButton,
              (isResending || resendCooldown > 0) && styles.resendButtonDisabled,
            ]}
            onPress={handleResendEmail}
            disabled={isResending || resendCooldown > 0}
          >
            <RefreshCw
              size={16}
              color={resendCooldown > 0 ? colors.tertiary : colors.accent}
            />
            <Text
              style={[
                styles.resendText,
                resendCooldown > 0 && styles.resendTextDisabled,
              ]}
            >
              {isResending
                ? 'Sending...'
                : resendCooldown > 0
                ? `Resend in ${resendCooldown}s`
                : 'Resend verification email'}
            </Text>
          </Pressable>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Didn't receive the email? </Text>
          <Text style={styles.footerText}>
            Check your spam folder or{' '}
          </Text>
          <Pressable onPress={() => router.push('/(auth)/signup')}>
            <Text style={styles.link}>try a different email</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  backButton: {
    position: 'absolute',
    top: 60,
    left: spacing.md,
    zIndex: 10,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.lg,
  },
  iconContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: colors.accentMuted,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.lg,
  },
  verifiedIcon: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: colors.success + '20',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.lg,
  },
  title: {
    fontSize: typography.xxl,
    fontWeight: typography.bold,
    color: colors.primary,
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: typography.md,
    color: colors.secondary,
    textAlign: 'center',
  },
  email: {
    fontSize: typography.md,
    fontWeight: typography.semibold,
    color: colors.accent,
    marginBottom: spacing.xl,
  },
  instructions: {
    width: '100%',
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    marginBottom: spacing.xl,
    gap: spacing.md,
  },
  step: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  stepNumber: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.accentMuted,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepNumberText: {
    fontSize: typography.sm,
    fontWeight: typography.bold,
    color: colors.accent,
  },
  stepText: {
    fontSize: typography.md,
    color: colors.primary,
  },
  actions: {
    width: '100%',
    gap: spacing.md,
    marginBottom: spacing.xl,
  },
  button: {
    width: '100%',
  },
  resendButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    paddingVertical: spacing.md,
  },
  resendButtonDisabled: {
    opacity: 0.6,
  },
  resendText: {
    fontSize: typography.md,
    color: colors.accent,
    fontWeight: typography.medium,
  },
  resendTextDisabled: {
    color: colors.tertiary,
  },
  footer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  footerText: {
    fontSize: typography.sm,
    color: colors.tertiary,
    textAlign: 'center',
  },
  link: {
    fontSize: typography.sm,
    color: colors.accent,
    fontWeight: typography.medium,
  },
});
