import { Redirect } from 'expo-router';

export default function Index() {
  // Demo mode - go directly to main app
  return <Redirect href="/(tabs)" />;
}
