import { useEffect } from 'react';
import { Stack, useRouter, useSegments } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { StripeProvider } from '@stripe/stripe-react-native';
import { useAuthStore } from '../stores/authStore';
import { useGamificationStore } from '../stores/gamificationStore';
import { notificationService } from '../services/notificationService';
import { gamificationService } from '../services/gamificationService';
import { chatService } from '../services/chatService';
import { analytics } from '../services/analyticsService';
import { colors } from '../lib/theme';
import { OfflineBanner } from '../components/ui/OfflineBanner';
import { ThemeProvider, useTheme } from '../lib/ThemeContext';
import { ErrorBoundary } from '../components/ErrorBoundary';

const STRIPE_PUBLISHABLE_KEY = process.env.EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY || '';

function AppContent() {
  const { isInitialized, initialize, user } = useAuthStore();
  const segments = useSegments();
  const router = useRouter();
  const { colors: themeColors, isDark } = useTheme();

  useEffect(() => {
    void initialize();
    void analytics.init();
  }, []);

  // Track user for analytics
  useEffect(() => {
    analytics.setUser(user?.id || null);
  }, [user?.id]);

  // Track screen views
  useEffect(() => {
    if (segments.length > 0) {
      const screenName = segments.join('/');
      analytics.trackScreen(screenName);
    }
  }, [segments]);

  // Auth-based routing
  useEffect(() => {
    if (!isInitialized) return;

    const inAuthGroup = segments[0] === '(auth)';
    const inQuizGroup = segments[0] === '(quiz)';
    const isAuthenticated = user !== null;
    const { hasSeenWelcome, isGuest } = useAuthStore.getState();

    // First time user - show welcome screen
    if (!isAuthenticated && !hasSeenWelcome && !inAuthGroup) {
      router.replace('/(auth)/welcome');
      return;
    }

    // Guest users can access quizzes
    if (isGuest && inQuizGroup) {
      return; // Allow guest access to quizzes
    }

    // Non-authenticated users (not guest) trying to access protected routes
    if (!isAuthenticated && !inAuthGroup && !inQuizGroup) {
      router.replace('/(auth)/login');
    } else if (isAuthenticated && !isGuest && inAuthGroup) {
      // Fully authenticated user on auth screen - redirect to main app
      router.replace('/(tabs)');
    }
  }, [isInitialized, user, segments]);

  // Initialize notifications and gamification after auth
  useEffect(() => {
    const initServices = async () => {
      // Initialize notifications
      await notificationService.initialize();

      if (user?.id) {
        // Save push token
        await notificationService.savePushToken(user.id);

        // Reset win-back notification timers (reschedules for 3/7/14 days from now)
        await notificationService.resetWinBackTimers();

        // Check and update streak
        await useGamificationStore.getState().checkStreak();

        // Handle daily login bonus
        await gamificationService.handleDailyLogin(user.id);
      }
    };

    if (isInitialized && user) {
      void initServices();
    }

    return () => {
      notificationService.cleanup();
      chatService.cleanup();
    };
  }, [isInitialized, user?.id]);

  // Show loading screen while auth initializes
  if (!isInitialized) {
    return (
      <View style={[styles.loading, { backgroundColor: themeColors.background }]}>
        <ActivityIndicator size="large" color={themeColors.accent} />
        <StatusBar style={isDark ? 'light' : 'dark'} />
      </View>
    );
  }

  return (
    <StripeProvider
      publishableKey={STRIPE_PUBLISHABLE_KEY}
      merchantIdentifier="merchant.com.kanikabatra.darkmirror"
      urlScheme="darkmirror"
    >
      <ErrorBoundary>
        <OfflineBanner />
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: themeColors.background },
            animation: 'fade',
          }}
        />
        <StatusBar style={isDark ? 'light' : 'dark'} />
      </ErrorBoundary>
    </StripeProvider>
  );
}

function RootLayout() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default RootLayout;

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
});
