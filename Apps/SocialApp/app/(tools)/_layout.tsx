import { Stack } from 'expo-router';
import { colors } from '../../lib/theme';

export default function ToolsLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: colors.background },
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen name="manipulation-scanner" />
      <Stack.Screen name="text-analyzer" />
      <Stack.Screen name="text-analyzer-history" />
      <Stack.Screen name="rotation/index" options={{ title: 'Rotation' }} />
      <Stack.Screen name="rotation/[prospectId]" options={{ title: 'Prospect' }} />
      <Stack.Screen name="rotation/add" options={{ title: 'Add Prospect' }} />
    </Stack>
  );
}
