import { Stack } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { ThemedText } from '@/components/ThemedText';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        // Pre-load fonts, images, etc.
        await Font.loadAsync({
          'Koulen': require('@/assets/fonts/Koulen-Regular.ttf'),
          // Add any other fonts you need to load
        });

        // Add artificial delay to show loading screen (optional)
        await new Promise(resolve => setTimeout(resolve, 1000));
      } catch (e) {
        console.warn(e);
      } finally {
        setIsReady(true);
        await SplashScreen.hideAsync();
      }
    }

    prepare();
  }, []);

  if (!isReady) {
    return (
      <View style={styles.loadingContainer}>
        <Image 
          source={require('@/assets/images/inner-logo.png')}
          style={styles.loadingLogo}
        />
        <ThemedText style={styles.loadingText}>BREAKING SILENCE</ThemedText>
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <StatusBar hidden />
      <Stack>
        <Stack.Screen 
          name="(tabs)" 
          options={{ 
            headerShown: false,
          }} 
        />
      </Stack>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    backgroundColor: '#00CED1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingLogo: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  loadingText: {
    fontSize: 35,
    fontFamily: 'Koulen',
    color: '#000',
    textAlign: 'center',
    includeFontPadding: false,
    lineHeight: 45,
    letterSpacing: 1,
  },
});
