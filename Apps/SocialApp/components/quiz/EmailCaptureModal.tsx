import { useState } from 'react';
import { View, Text, StyleSheet, Modal, Pressable, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Mail, X, Lock, Sparkles, Eye } from 'lucide-react-native';
import { GradientButton } from '../ui/GradientButton';
import { useAuthStore } from '../../stores/authStore';
import { haptics } from '../../lib/haptics';
import { colors, spacing, typography, borderRadius, gradients } from '../../lib/theme';

interface EmailCaptureModalProps {
  visible: boolean;
  onClose: () => void;
  onSuccess: () => void;
  quizTitle: string;
  score: number;
}

export function EmailCaptureModal({
  visible,
  onClose,
  onSuccess,
  quizTitle,
  score,
}: EmailCaptureModalProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [step, setStep] = useState<'email' | 'password'>('email');
  const [error, setError] = useState('');
  const { captureGuestEmail, convertGuestToUser, isLoading } = useAuthStore();

  const handleEmailSubmit = () => {
    if (!email.trim() || !email.includes('@')) {
      haptics.error();
      setError('Please enter a valid email');
      return;
    }
    setError('');
    captureGuestEmail(email);
    setStep('password');
    haptics.light();
  };

  const handleCreateAccount = async () => {
    if (!password.trim() || password.length < 6) {
      haptics.error();
      setError('Password must be at least 6 characters');
      return;
    }

    const result = await convertGuestToUser(email, password);
    if (result.error) {
      haptics.error();
      setError(result.error);
    } else {
      haptics.success();
      onSuccess();
    }
  };

  const handleSkipPassword = () => {
    haptics.light();
    onSuccess();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <LinearGradient
          colors={['rgba(201, 169, 97, 0.1)', 'rgba(10, 10, 10, 1)']}
          style={StyleSheet.absoluteFill}
        />

        {/* Close button */}
        <Pressable
          style={styles.closeButton}
          onPress={() => {
            haptics.light();
            onClose();
          }}
          accessibilityLabel="Close"
          accessibilityRole="button"
        >
          <X size={24} color={colors.primary} strokeWidth={2} />
        </Pressable>

        <View style={styles.content}>
          {/* Score Preview */}
          <View style={styles.scorePreview}>
            <LinearGradient
              colors={gradients.goldVertical}
              style={styles.scoreCircle}
            >
              <Text style={styles.scoreValue}>{score}%</Text>
            </LinearGradient>
            <Text style={styles.quizTitle}>{quizTitle}</Text>
          </View>

          {step === 'email' ? (
            <>
              {/* Email Step */}
              <View style={styles.header}>
                <Text style={styles.title}>Save Your Results</Text>
                <Text style={styles.subtitle}>
                  Enter your email to keep your psychological profile and unlock insights
                </Text>
              </View>

              {/* Blurred Benefits */}
              <View style={styles.benefits}>
                <View style={styles.benefitItem}>
                  <Sparkles size={16} color={colors.accent} />
                  <Text style={styles.benefitText}>See your percentile ranking</Text>
                  <Lock size={12} color={colors.tertiary} />
                </View>
                <View style={styles.benefitItem}>
                  <Sparkles size={16} color={colors.accent} />
                  <Text style={styles.benefitText}>Personalized book insights</Text>
                  <Lock size={12} color={colors.tertiary} />
                </View>
                <View style={styles.benefitItem}>
                  <Sparkles size={16} color={colors.accent} />
                  <Text style={styles.benefitText}>Build your complete profile</Text>
                  <Lock size={12} color={colors.tertiary} />
                </View>
              </View>

              {/* Email Input */}
              <View style={styles.inputContainer}>
                <Mail size={20} color={colors.tertiary} style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Enter your email"
                  placeholderTextColor={colors.tertiary}
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoComplete="email"
                />
              </View>

              {error ? <Text style={styles.error}>{error}</Text> : null}

              <GradientButton
                title="Continue"
                onPress={handleEmailSubmit}
                fullWidth
                glow
              />
            </>
          ) : (
            <>
              {/* Password Step */}
              <View style={styles.header}>
                <Text style={styles.title}>Create Your Account</Text>
                <Text style={styles.subtitle}>
                  Set a password to access your profile anytime
                </Text>
              </View>

              <View style={styles.emailConfirm}>
                <Mail size={16} color={colors.accent} />
                <Text style={styles.emailConfirmText}>{email}</Text>
              </View>

              {/* Password Input */}
              <View style={styles.inputContainer}>
                <Lock size={20} color={colors.tertiary} style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Create a password"
                  placeholderTextColor={colors.tertiary}
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                  autoComplete="new-password"
                />
                <Pressable
                  onPress={() => setShowPassword(!showPassword)}
                  accessibilityLabel={showPassword ? 'Hide password' : 'Show password'}
                  accessibilityRole="button"
                >
                  <Eye size={20} color={colors.tertiary} />
                </Pressable>
              </View>

              {error ? <Text style={styles.error}>{error}</Text> : null}

              <GradientButton
                title="Create Account"
                onPress={handleCreateAccount}
                loading={isLoading}
                fullWidth
                glow
              />

              <Pressable
                onPress={handleSkipPassword}
                style={styles.skipButton}
                accessibilityLabel="Skip creating account for now"
                accessibilityRole="button"
              >
                <Text style={styles.skipText}>Skip for now</Text>
              </Pressable>
            </>
          )}
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  closeButton: {
    position: 'absolute',
    top: spacing.xl,
    right: spacing.lg,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: spacing.xl,
    gap: spacing.lg,
  },
  scorePreview: {
    alignItems: 'center',
    gap: spacing.sm,
  },
  scoreCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scoreValue: {
    fontSize: 28,
    fontWeight: typography.bold,
    color: colors.background,
  },
  quizTitle: {
    fontSize: typography.md,
    color: colors.secondary,
  },
  header: {
    alignItems: 'center',
    gap: spacing.xs,
  },
  title: {
    fontSize: typography.xl,
    fontWeight: typography.bold,
    color: colors.primary,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: typography.md,
    color: colors.secondary,
    textAlign: 'center',
    lineHeight: 22,
  },
  benefits: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    gap: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  benefitText: {
    flex: 1,
    fontSize: typography.sm,
    color: colors.secondary,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    paddingHorizontal: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    height: 56,
  },
  inputIcon: {
    marginRight: spacing.sm,
  },
  input: {
    flex: 1,
    fontSize: typography.md,
    color: colors.primary,
  },
  error: {
    color: colors.error,
    fontSize: typography.sm,
    textAlign: 'center',
  },
  emailConfirm: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xs,
    backgroundColor: colors.accentMuted,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: borderRadius.full,
    alignSelf: 'center',
  },
  emailConfirmText: {
    fontSize: typography.sm,
    color: colors.accent,
  },
  skipButton: {
    alignItems: 'center',
    paddingVertical: spacing.md,
  },
  skipText: {
    fontSize: typography.md,
    color: colors.tertiary,
  },
});
