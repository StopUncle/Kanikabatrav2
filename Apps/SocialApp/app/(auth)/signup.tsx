import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { Link, router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { useAuthStore } from '../../stores/authStore';
import { haptics } from '../../lib/haptics';
import { colors, spacing, typography } from '../../lib/theme';
import { validateEmail, validatePassword, validatePasswordMatch, validateRequired } from '../../lib/validation';

export default function SignUpScreen() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const { signUp, isLoading } = useAuthStore();

  const handleSignUp = async () => {
    // Trim and validate name
    const trimmedName = fullName.trim();
    const nameResult = validateRequired(trimmedName, 'Full name');
    if (!nameResult.isValid) {
      haptics.error();
      setError(nameResult.error!);
      return;
    }

    // Validate email format
    const emailResult = validateEmail(email);
    if (!emailResult.isValid) {
      haptics.error();
      setError(emailResult.error!);
      return;
    }

    // Validate password strength
    const passwordResult = validatePassword(password);
    if (!passwordResult.isValid) {
      haptics.error();
      setError(passwordResult.error!);
      return;
    }

    // Validate passwords match
    const matchResult = validatePasswordMatch(password, confirmPassword);
    if (!matchResult.isValid) {
      haptics.error();
      setError(matchResult.error!);
      return;
    }

    setError('');
    const { error: signUpError } = await signUp(email.trim(), password, trimmedName);

    if (signUpError) {
      haptics.error();
      setError(signUpError);
    } else {
      haptics.success();
      // Redirect to email verification screen
      router.replace({
        pathname: '/(auth)/verify-email',
        params: { email },
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.header}>
            <Text style={styles.title}>Create account</Text>
            <Text style={styles.subtitle}>Join the community</Text>
          </View>

          <View style={styles.form}>
            <Input
              label="Full Name"
              placeholder="Enter your name"
              value={fullName}
              onChangeText={setFullName}
              autoCapitalize="words"
              autoComplete="name"
            />

            <Input
              label="Email"
              placeholder="Enter your email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
            />

            <Input
              label="Password"
              placeholder="Create a password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              autoComplete="new-password"
            />

            <Input
              label="Confirm Password"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
              autoComplete="new-password"
            />

            {error ? <Text style={styles.error}>{error}</Text> : null}

            <Button
              title="Create Account"
              onPress={handleSignUp}
              loading={isLoading}
              style={styles.button}
            />
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>Already have an account? </Text>
            <Link href="/(auth)/login" asChild>
              <Text style={styles.link}>Sign In</Text>
            </Link>
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
  keyboardView: {
    flex: 1,
  },
  scroll: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: spacing.lg,
  },
  header: {
    marginBottom: spacing.xl,
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
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  footerText: {
    color: colors.secondary,
    fontSize: typography.md,
  },
  link: {
    color: colors.accent,
    fontSize: typography.md,
    fontWeight: typography.semibold,
  },
});
