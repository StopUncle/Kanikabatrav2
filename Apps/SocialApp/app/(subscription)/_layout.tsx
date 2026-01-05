import { Stack } from 'expo-router';
import { colors } from '../../lib/theme';

export default function SubscriptionLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: colors.background },
        animation: 'slide_from_bottom',
        presentation: 'modal',
      }}
    />
  );
}
