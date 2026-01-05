import { useState, useEffect } from 'react';
import { logger } from '../../lib/logger';
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Pressable,
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Lock, CheckCircle, AlertCircle, ArrowLeft } from 'lucide-react-native';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { haptics } from '../../lib/haptics';
import { colors, spacing, typography, borderRadius } from '../../lib/theme';
import { supabase, isSupabaseConfigured } from '../../lib/supabase';

type ResetState = 'form' | 'success' | 'error' | 'expired';

export default function ResetPasswordScreen() {
  // Token comes from deep link: darkmirror://reset-password?token=xxx
  const { token, access_token, refresh_token } = useLocalSearchParams<{
    token?: string;
    access_token?: string;
    refresh_token?: string;
  }>();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [resetState, setResetState] = useState<ResetState>('form');

  // Set session from tokens if provided (Supabase password reset flow)
  useEffect(() => {
    const setupSession = async () => {
      if (!isSupabaseConfigured) return;

      // Supabase sends access_token and refresh_token via URL
      if (access_token && refresh_token) {
        const { error } = await supabase.auth.setSession({
          access_token,
          refresh_token,
        });

        if (error) {
          logger.error('Error setting session:', error);
          setResetState('expired');
        }
      }
    };

    void setupSession();
  }, [access_token, refresh_token]);

  const validatePassword = (): boolean => {
    if (!password.trim() || !confirmPassword.trim()) {
      setError('Please fill in all fields');
      return false;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters');
      return false;
    }

    if (!/[A-Z]/.test(password)) {
      setError('Password must contain at least one uppercase letter');
      return false;
    }

    if (!/[a-z]/.test(password)) {
      setError('Password must contain at least one lowercase letter');
      return false;
    }

    if (!/[0-9]/.test(password)) {
      setError('Password must contain at least one number');
      return false;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return false;
    }

    return true;
  };

  const handleResetPassword = async () => {
    setError('');

    if (!validatePassword()) {
      haptics.error();
      return;
    }

    setIsLoading(true);
    haptics.light();

    if (!isSupabaseConfigured) {
      // Demo mode
      await new Promise(resolve => setTimeout(resolve, 1500));
      setIsLoading(false);
      setResetState('success');
      haptics.success();
      return;
    }

    const { error: updateError } = await supabase.auth.updateUser({
      password: password,
    });

    setIsLoading(false);

    if (updateError) {
      haptics.error();
      if (updateError.message.includes('expired')) {
        setResetState('expired');
      } else {
        setError(updateError.message);
      }
    } else {
      haptics.success();
      setResetState('success');
    }
  };

  // Success state
  if (resetState === 'success') {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.stateContainer}>
          <View style={styles.successIcon}>
            <CheckCircle size={56} color={colors.success} />
          </View>
          <Text style={styles.stateTitle}>Password Updated!</Text>
          <Text style={styles.stateText}>
            Your password has been successfully changed. You can now sign in with your new password.
          </Text>
          <Button
            title="Sign In"
            onPress={() => router.replace('/(auth)/login')}
            style={styles.stateButton}
          />
        </View>
      </SafeAreaView>
    );
  }

  // Expired/Error state
  if (resetState === 'expired') {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.stateContainer}>
          <View style={styles.errorIcon}>
            <AlertCircle size={56} color={colors.error} />
          </View>
          <Text style={styles.stateTitle}>Link Expired</Text>
          <Text style={styles.stateText}>
            This password reset link has expired or is invalid. Please request a new one.
          </Text>
          <Button
            title="Request New Link"
            onPress={() => router.replace('/(auth)/forgot-password')}
            style={styles.stateButton}
          />
          <Pressable
            style={styles.secondaryAction}
            onPress={() => router.replace('/(auth)/login')}
          >
            <Text style={styles.secondaryText}>Back to Sign In</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  // Form state
  return (
    <SafeAreaView style={styles.container}>
      <Pressable
        style={styles.backButton}
        onPress={() => {
          haptics.light();
          router.replace('/(auth)/login');
        }}
      >
        <ArrowLeft size={24} color={colors.primary} />
      </Pressable>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.iconContainer}>
            <Lock size={48} color={colors.accent} strokeWidth={1.5} />
          </View>

          <View style={styles.header}>
            <Text style={styles.title}>Set new password</Text>
            <Text style={styles.subtitle}>
              Create a strong password for your account
            </Text>
          </View>

          <View style={styles.requirements}>
            <Text style={styles.requirementsTitle}>Password must include:</Text>
            <View style={styles.requirementRow}>
              <View style={[styles.bullet, password.length >= 8 && styles.bulletActive]} />
              <Text style={[styles.requirementText, password.length >= 8 && styles.requirementMet]}>
                At least 8 characters
              </Text>
            </View>
            <View style={styles.requirementRow}>
              <View style={[styles.bullet, /[A-Z]/.test(password) && styles.bulletActive]} />
              <Text style={[styles.requirementText, /[A-Z]/.test(password) && styles.requirementMet]}>
                One uppercase letter
              </Text>
            </View>
            <View style={styles.requirementRow}>
              <View style={[styles.bullet, /[a-z]/.test(password) && styles.bulletActive]} />
              <Text style={[styles.requirementText, /[a-z]/.test(password) && styles.requirementMet]}>
                One lowercase letter
              </Text>
            </View>
            <View style={styles.requirementRow}>
              <View style={[styles.bullet, /[0-9]/.test(password) && styles.bulletActive]} />
              <Text style={[styles.requirementText, /[0-9]/.test(password) && styles.requirementMet]}>
                One number
              </Text>
            </View>
          </View>

          <View style={styles.form}>
            <Input
              label="New Password"
              placeholder="Enter new password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              autoComplete="new-password"
            />

            <Input
              label="Confirm Password"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
              autoComplete="new-password"
            />

            {error ? <Text style={styles.error}>{error}</Text> : null}

            <Button
              title="Update Password"
              onPress={handleResetPassword}
              loading={isLoading}
              style={styles.button}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
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
  keyboardView: {
    flex: 1,
  },
  scroll: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: spacing.lg,
  },
  iconContainer: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: colors.accentMuted,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: spacing.lg,
  },
  header: {
    marginBottom: spacing.lg,
    alignItems: 'center',
  },
  title: {
    fontSize: typography.xxl,
    fontWeight: typography.bold,
    color: colors.primary,
    marginBottom: spacing.xs,
  },
  subtitle: {
    fontSize: typography.md,
    color: colors.secondary,
    textAlign: 'center',
  },
  requirements: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    marginBottom: spacing.lg,
  },
  requirementsTitle: {
    fontSize: typography.sm,
    fontWeight: typography.semibold,
    color: colors.primary,
    marginBottom: spacing.sm,
  },
  requirementRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingVertical: 4,
  },
  bullet: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.tertiary,
  },
  bulletActive: {
    backgroundColor: colors.success,
  },
  requirementText: {
    fontSize: typography.sm,
    color: colors.tertiary,
  },
  requirementMet: {
    color: colors.success,
  },
  form: {
    marginBottom: spacing.xl,
  },
  error: {
    color: colors.error,
    fontSize: typography.sm,
    marginBottom: spacing.md,
  },
  button: {
    marginTop: spacing.md,
  },
  // State screens
  stateContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.lg,
  },
  successIcon: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: colors.success + '20',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.lg,
  },
  errorIcon: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: colors.error + '20',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.lg,
  },
  stateTitle: {
    fontSize: typography.xxl,
    fontWeight: typography.bold,
    color: colors.primary,
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  stateText: {
    fontSize: typography.md,
    color: colors.secondary,
    textAlign: 'center',
    marginBottom: spacing.xl,
    lineHeight: 24,
  },
  stateButton: {
    width: '100%',
  },
  secondaryAction: {
    marginTop: spacing.lg,
  },
  secondaryText: {
    fontSize: typography.md,
    color: colors.secondary,
  },
});
