import { StyleSheet, View, TouchableOpacity, ImageBackground, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemedText } from '@/components/ThemedText';
import { Camera, CameraType } from 'expo-camera';
import { useState, useRef, useEffect } from 'react';

const BUTTON_WIDTH = 170;
const SCREEN_WIDTH = Dimensions.get('window').width;
const CAMERA_HEIGHT = 400;

export default function ScanScreen() {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [type, setType] = useState<'front' | 'back'>('back');
  const cameraRef = useRef<Camera | null>(null);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const toggleCameraType = () => {
    setType(current => 
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  };

  if (hasPermission === null) {
    return (
      <View style={styles.container}>
        <ThemedText>Requesting camera permission...</ThemedText>
      </View>
    );
  }

  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <ThemedText>No access to camera</ThemedText>
      </View>
    );
  }

  return (
    <ImageBackground 
      source={require('@/assets/images/background.png')} 
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.container} edges={['bottom', 'left', 'right']}>
        {/* Header */}
        <View style={styles.header}>
          <ThemedText style={styles.title}>SCAN</ThemedText>
        </View>

        {/* Camera Container */}
        <View style={styles.cameraContainer}>
          <Camera
            ref={cameraRef}
            style={styles.camera}
            type={type}
          >
            <View style={styles.detectionBox} />
          </Camera>
        </View>

        {/* Result Box */}
        <View style={styles.resultBox}>
          <ThemedText style={styles.resultText}>Open Sign</ThemedText>
        </View>

        {/* Back Button */}
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.push("/(tabs)")}
        >
          <ThemedText style={styles.buttonText}>BACK</ThemedText>
        </TouchableOpacity>
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
  cameraContainer: {
    width: SCREEN_WIDTH - 40,
    height: CAMERA_HEIGHT,
    marginTop: 20,
    borderWidth: 3,
    borderColor: '#000',
    overflow: 'hidden',
  },
  camera: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  detectionBox: {
    width: 200,
    height: 200,
    borderWidth: 2,
    borderColor: '#00CED1',
    backgroundColor: 'transparent',
  },
  resultBox: {
    backgroundColor: 'rgba(0, 206, 209, 0.8)',
    width: SCREEN_WIDTH - 40,
    height: 65,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: '#000',
    marginTop: 20,
  },
  resultText: {
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
  backButton: {
    backgroundColor: 'rgba(0, 206, 209, 0.8)',
    height: 65,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: '#000',
    width: BUTTON_WIDTH,
    borderRadius: 0,
    marginTop: 20,
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