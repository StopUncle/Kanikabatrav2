import { Stack } from 'expo-router';
import { colors } from '../../lib/theme';

export default function SimulatorLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: colors.background },
        animation: 'fade',
      }}
    />
  );
}
