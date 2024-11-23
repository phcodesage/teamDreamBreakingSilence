import { StyleSheet, View, TouchableOpacity, ImageBackground } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemedText } from '@/components/ThemedText';
import { Image } from 'react-native';

const BUTTON_WIDTH = 170;

export default function ContactScreen() {
  return (
    <ImageBackground 
      source={require('@/assets/images/background.png')} 
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.container} edges={['bottom', 'left', 'right']}>
        {/* Header */}
        <View style={styles.header}>
          <ThemedText style={styles.title}>CONTACT US</ThemedText>
        </View>

        <View style={styles.contentContainer}>
          {/* Upper Section */}
          <View style={styles.section}>
            <View style={styles.box}>
              <ThemedText style={styles.boxText}>MESSAGE US</ThemedText>
            </View>
            
            <View style={styles.box}>
              <ThemedText style={styles.boxText}>TEAMDREAM@GMAIL.COM</ThemedText>
            </View>
          </View>

          {/* Lower Section */}
          <View style={styles.section}>
            <View style={styles.box}>
              <ThemedText style={styles.boxText}>OUR SOCIALS:</ThemedText>
            </View>
            
            <View style={styles.socialBox}>
              <Image 
                source={require('@/assets/images/fb-logo.svg')} 
                style={styles.fbLogo}
              />
              <ThemedText style={styles.boxText}>@teamdream</ThemedText>
            </View>
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
    width: '90%',
    justifyContent: 'space-between',
    paddingVertical: 20,
    alignItems: 'center',
  },
  section: {
    width: '100%',
    alignItems: 'center',
    gap: 20,
  },
  box: {
    backgroundColor: 'rgba(0, 206, 209, 0.8)',
    width: '100%',
    height: 65,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: '#000',
  },
  socialBox: {
    backgroundColor: 'rgba(0, 206, 209, 0.8)',
    width: '100%',
    height: 65,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: '#000',
    gap: 10,
  },
  boxText: {
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
  fbLogo: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  backButton: {
    backgroundColor: 'rgba(0, 206, 209, 0.8)',
    height: 65,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: '#000',
    width: BUTTON_WIDTH,
    borderRadius: 0,
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