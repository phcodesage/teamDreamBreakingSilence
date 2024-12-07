import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="scan" />
      <Stack.Screen name="translate" />
      <Stack.Screen name="tutorial" />
      <Stack.Screen name="settings" />
    </Stack>
  );
}
