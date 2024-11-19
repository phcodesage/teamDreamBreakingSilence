import { StyleSheet, View, TouchableOpacity, ImageBackground, ScrollView, Dimensions } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemedText } from '@/components/ThemedText';
import { BlurView } from 'expo-blur';

const { width, height } = Dimensions.get('window');
const BUTTON_WIDTH = 170;
const SCREEN_HEIGHT = height;

export default function AboutScreen() {
  return (
    <ImageBackground 
      source={require('@/assets/images/background.png')} 
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <BlurView intensity={50} style={StyleSheet.absoluteFill} />
      <SafeAreaView style={styles.container} edges={['bottom', 'left', 'right']}>
        {/* Header */}
        <View style={styles.header}>
          <ThemedText style={styles.title}>ABOUT US</ThemedText>
        </View>

        <ScrollView 
          style={styles.scrollView}
          pagingEnabled
          showsVerticalScrollIndicator={false}
        >
          {/* First Screen */}
          <View style={styles.screenContainer}>
            <View style={styles.textBox}>
              <ThemedText style={styles.paragraph}>
                Our group is dedicated to creating a creative sign linguistic app that encourages both accessibility and exclusivity. By means of interactive guides and actual characteristics for time translation, our goal to close gaps in communication and enable users everywhere. With continuous user input and a dedication to our goal, Not only are we developing an app; We're making the globe more welcoming.
              </ThemedText>
            </View>
          </View>

          {/* Second Screen */}
          <View style={styles.screenContainer}>
            <View style={styles.titleBox}>
              <ThemedText style={styles.sectionTitle}>WHO WE ARE</ThemedText>
            </View>
            <View style={styles.textBox}>
              <ThemedText style={styles.paragraph}>
                Our group of developers is enthusiastic about accessibility. Our objectives are to increase accessibility to sign language, empower the deaf population, and close communication barriers.
              </ThemedText>
            </View>
          </View>

          {/* Third Screen */}
          <View style={styles.screenContainer}>
            <View style={styles.titleBox}>
              <ThemedText style={styles.sectionTitle}>OUR MISSION</ThemedText>
            </View>
            <View style={styles.textBox}>
              <ThemedText style={styles.paragraph}>
                Our goal is to break down barriers and promote inclusive by means of technology. We picture in a world where dialogue is genuinely global, where each and every has the resources necessary for connection, learn and give their complete expression.
              </ThemedText>
            </View>
            
            {/* Back Button */}
            <TouchableOpacity 
              style={styles.backButton}
              onPress={() => router.back()}
            >
              <ThemedText style={styles.buttonText}>BACK</ThemedText>
            </TouchableOpacity>
          </View>
        </ScrollView>
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
  scrollView: {
    flex: 1,
  },
  screenContainer: {
    height: SCREEN_HEIGHT - 80,
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
    justifyContent: 'center',
  },
  titleBox: {
    backgroundColor: 'rgba(0, 206, 209, 0.8)',
    width: BUTTON_WIDTH,
    height: 65,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: '#000',
    marginBottom: 20,
  },
  textBox: {
    width: '90%',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderWidth: 2,
    borderColor: '#000',
    padding: 20,
    justifyContent: 'center',
    marginVertical: 20,
  },
  sectionTitle: {
    fontSize: 25,
    fontFamily: 'Koulen',
    fontWeight: '900',
    color: '#000',
    textAlign: 'center',
    lineHeight: 32,
    marginTop: 8,
  },
  paragraph: {
    fontSize: 22,
    fontFamily: 'Koulen',
    color: '#000',
    textAlign: 'center',
    lineHeight: 30,
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
    marginTop: 40,
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