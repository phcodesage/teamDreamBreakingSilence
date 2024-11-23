import { Stack } from 'expo-router';

export default function TabLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="tutorial" />
      <Stack.Screen name="translate" />
      <Stack.Screen name="settings" />
      <Stack.Screen name="about" />
      <Stack.Screen name="scan" />
      <Stack.Screen name="contact" />
    </Stack>
  );
}
