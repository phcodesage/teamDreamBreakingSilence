import { StyleSheet, View, TouchableOpacity, ImageBackground } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemedText } from '@/components/ThemedText';
import { Link } from 'expo-router';

const BUTTON_WIDTH = 170;

export default function SettingsScreen() {
  return (
    <ImageBackground 
      source={require('@/assets/images/background.png')} 
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.container} edges={['bottom', 'left', 'right']}>
        {/* Header */}
        <View style={styles.header}>
          <ThemedText style={styles.title}>SETTINGS</ThemedText>
        </View>

        {/* Content Container */}
        <View style={styles.contentContainer}>
          {/* Main Buttons Group */}
          <View style={styles.mainButtonContainer}>
            <Link href="/about" asChild>
              <TouchableOpacity style={styles.button}>
                <ThemedText style={styles.buttonText}>ABOUT US</ThemedText>
              </TouchableOpacity>
            </Link>
            
            <Link href="/contact" asChild>
              <TouchableOpacity style={styles.button}>
                <ThemedText style={styles.buttonText}>CONTACT US</ThemedText>
              </TouchableOpacity>
            </Link>
          </View>
          
          {/* Back Button */}
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <ThemedText style={styles.buttonText}>BACK</ThemedText>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    alignItems: 'center',
  },
  header: {
    backgroundColor: '#00CED1',
    width: '100%',
    borderBottomWidth: 3,
    borderBottomColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    height: 80,
    minHeight: 80,
    paddingTop: 20,
    paddingBottom: 10,
  },
  title: {
    fontSize: 35,
    fontFamily: 'Koulen',
    color: '#000',
    textAlign: 'center',
    includeFontPadding: false,
    lineHeight: 45,
    letterSpacing: 1,
  },
  contentContainer: {
    flex: 1,
    width: BUTTON_WIDTH,
    justifyContent: 'space-between',
    paddingVertical: 20,
  },
  mainButtonContainer: {
    alignItems: 'center',
    width: '100%',
    gap: 20,
    flex: 1,
    justifyContent: 'center',
    marginTop: 0,
  },
  button: {
    backgroundColor: 'rgba(0, 206, 209, 0.8)',
    height: 65,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: '#000',
    width: '100%',
    borderRadius: 0,
  },
  backButton: {
    backgroundColor: 'rgba(0, 206, 209, 0.8)',
    height: 65,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: '#000',
    width: '70%',
    borderRadius: 0,
    marginTop: 20,
    alignSelf: 'center',
  },
  buttonText: {
    fontSize: 25,
    fontFamily: 'Koulen',
    fontWeight: '900',
    color: '#000',
    letterSpacing: 0,
    lineHeight: 32,
    textAlign: 'center',
    textAlignVertical: 'center',
    marginTop: 8,
  },
}); 