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
import { validateEmail } from '../../lib/validation';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { signIn, isLoading } = useAuthStore();

  const handleLogin = async () => {
    // Validate email format
    const emailResult = validateEmail(email);
    if (!emailResult.isValid) {
      haptics.error();
      setError(emailResult.error!);
      return;
    }

    if (!password.trim()) {
      haptics.error();
      setError('Password is required');
      return;
    }

    setError('');
    const { error: signInError } = await signIn(email, password);

    if (signInError) {
      haptics.error();
      setError(signInError);
    } else {
      haptics.success();
      router.replace('/(tabs)');
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
            <Text style={styles.title}>Welcome back</Text>
            <Text style={styles.subtitle}>Sign in to continue</Text>
          </View>

          <View style={styles.form}>
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
              placeholder="Enter your password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              autoComplete="password"
            />

            {error ? <Text style={styles.error}>{error}</Text> : null}

            <Button
              title="Sign In"
              onPress={handleLogin}
              loading={isLoading}
              style={styles.button}
            />
          </View>

          <Link href="/(auth)/forgot-password" asChild>
            <Text style={styles.forgotPassword}>Forgot Password?</Text>
          </Link>

          <View style={styles.footer}>
            <Text style={styles.footerText}>Don't have an account? </Text>
            <Link href="/(auth)/signup" asChild>
              <Text style={styles.link}>Sign Up</Text>
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
  forgotPassword: {
    color: colors.secondary,
    fontSize: typography.sm,
    textAlign: 'center',
    marginBottom: spacing.xl,
  },
});
