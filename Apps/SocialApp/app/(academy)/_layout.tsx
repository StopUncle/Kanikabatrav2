import { Stack } from 'expo-router';
import { colors } from '../../lib/theme';

export default function AcademyLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: colors.background },
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen name="index" options={{ title: 'Academy' }} />
      <Stack.Screen name="skill-tree" options={{ title: 'Skills' }} />
      <Stack.Screen name="quests" options={{ title: 'Quests' }} />
      <Stack.Screen name="challenges" options={{ title: 'Challenges' }} />
    </Stack>
  );
}
