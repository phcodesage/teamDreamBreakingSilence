import { StyleSheet, Image, View, TouchableOpacity, ImageBackground, Dimensions } from 'react-native';
import { Link } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemedText } from '@/components/ThemedText';
import { LinearGradient } from 'expo-linear-gradient';

const LOGO_SIZE = 150;
const BUTTON_WIDTH = LOGO_SIZE + 20;
const SCREEN_WIDTH = Dimensions.get('window').width;

export default function HomeScreen() {
  return (
    <ImageBackground 
      source={require('@/assets/images/background.png')} 
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.container} edges={['bottom', 'left', 'right']}>
        {/* Header */}
        <View style={styles.header}>
          <ThemedText style={styles.title}>Breaking Silence</ThemedText>
        </View>

        {/* Logo Section */}
        <View style={styles.logoContainer}>
          <View style={styles.logoWrapper}>
            <LinearGradient
              colors={['#00CED1', '#FFFFFF']}
              style={styles.logo}
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
            />
            <Image 
              source={require('@/assets/images/inner-logo.png')} 
              style={styles.innerLogo}
            />
          </View>
        </View>
        
        {/* Navigation Buttons */}
        <View style={styles.buttonContainer}>
          <Link href="/(tabs)/tutorial" asChild>
            <TouchableOpacity style={styles.button}>
              <ThemedText style={styles.buttonText}>TUTORIAL</ThemedText>
            </TouchableOpacity>
          </Link>
          
          <Link href="/(tabs)/translate" asChild>
            <TouchableOpacity style={styles.button}>
              <ThemedText style={styles.buttonText}>TRANSLATE</ThemedText>
            </TouchableOpacity>
          </Link>
          
          <Link href="/(tabs)/scan" asChild>
            <TouchableOpacity style={styles.button}>
              <ThemedText style={styles.buttonText}>SCAN</ThemedText>
            </TouchableOpacity>
          </Link>
          
          <Link href="/(tabs)/settings" asChild>
            <TouchableOpacity style={styles.button}>
              <ThemedText style={styles.buttonText}>SETTINGS</ThemedText>
            </TouchableOpacity>
          </Link>
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
    justifyContent: 'flex-end',
    paddingTop: 45,
    paddingBottom: 15,
    height: 50,
    minHeight: 50,
  },
  title: {
    fontSize: 38,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    includeFontPadding: false,
    lineHeight: 45,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 40,
    width: BUTTON_WIDTH,
  },
  logoWrapper: {
    width: LOGO_SIZE,
    height: LOGO_SIZE,
    borderRadius: LOGO_SIZE / 2,
    borderWidth: 3,
    borderColor: '#000',
    overflow: 'hidden',
    position: 'relative',
  },
  logo: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  innerLogo: {
    position: 'absolute',
    width: '80%',
    height: '80%',
    resizeMode: 'contain',
    top: '10%',
    left: '10%',
  },
  buttonContainer: {
    alignItems: 'center',
    width: BUTTON_WIDTH,
    gap: 25,
  },
  button: {
    backgroundColor: 'rgba(0, 226, 230, 0.8)', // #00CED1 with 80% opacity
    padding: 10,
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#000',
    width: '100%',
  },
  buttonText: {
    fontSize: 25,
    fontWeight: '900',
    color: '#000',
  },
});
