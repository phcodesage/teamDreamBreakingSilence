import { StyleSheet, View, TouchableOpacity, ImageBackground, Dimensions } from 'react-native';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { useState, useEffect } from 'react';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemedText } from '@/components/ThemedText';
import { MaterialIcons } from '@expo/vector-icons';
import Animated, { 
  useAnimatedStyle, 
  withRepeat, 
  withSequence, 
  withTiming,
  useSharedValue
} from 'react-native-reanimated';

const SCREEN_WIDTH = Dimensions.get('window').width;
const RESULT_BOX_SIZE = SCREEN_WIDTH * 0.3;
const TITLE_WIDTH = 35 * 4;

export default function ScanScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const [facing, setFacing] = useState<CameraType>('back');
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [showTooltip, setShowTooltip] = useState(true);
  const tooltipOpacity = useSharedValue(1);

  useEffect(() => {
    tooltipOpacity.value = withRepeat(
      withSequence(
        withTiming(0.4, { duration: 1000 }),
        withTiming(1, { duration: 1000 })
      ),
      -1,
      true
    );
  }, []);

  const tooltipStyle = useAnimatedStyle(() => ({
    opacity: tooltipOpacity.value,
  }));

  const toggleCameraType = () => {
    setFacing(current => current === 'back' ? 'front' : 'back');
  };

  if (!permission) {
    return (
      <View style={styles.container}>
        <ThemedText>Requesting camera permission...</ThemedText>
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <ThemedText style={styles.text}>We need your permission to show the camera</ThemedText>
        <TouchableOpacity style={styles.button} onPress={requestPermission}>
          <ThemedText style={styles.buttonText}>GRANT PERMISSION</ThemedText>
        </TouchableOpacity>
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
        <View style={styles.header}>
          <ThemedText style={styles.title}>SCAN</ThemedText>
        </View>

        <View style={styles.mainContent}>
          <View style={styles.cameraContainer}>
            {isCameraActive ? (
              <View style={styles.activeCameraContainer}>
                <CameraView
                  style={styles.camera}
                  facing={facing}
                >
                  <View style={styles.detectionBox} />
                </CameraView>
              </View>
            ) : (
              <TouchableOpacity 
                style={styles.cameraPlaceholder}
                onPress={() => {
                  setIsCameraActive(true);
                  setShowTooltip(false);
                }}
              >
                <MaterialIcons 
                  name="camera-alt" 
                  size={80} 
                  color="#00CED1" 
                />
                {showTooltip && (
                  <Animated.View style={[styles.tooltip, tooltipStyle]}>
                    <ThemedText style={styles.tooltipText}>
                      Tap here to activate camera
                    </ThemedText>
                  </Animated.View>
                )}
              </TouchableOpacity>
            )}
            
            <TouchableOpacity 
              style={styles.flipButton}
              onPress={toggleCameraType}
            >
              <MaterialIcons name="flip-camera-ios" size={30} color="#00CED1" />
            </TouchableOpacity>
          </View>

          <View style={styles.bottomContainer}>
            <View style={styles.resultContainer}>
              <View style={styles.resultBox}>
                <ThemedText style={styles.resultText} adjustsFontSizeToFit numberOfLines={1}>
                  A
                </ThemedText>
              </View>
              <ThemedText style={styles.resultLabel}>Hand Sign Result</ThemedText>
            </View>

            <View style={styles.backButtonContainer}>
              <TouchableOpacity 
                style={styles.backButton}
                onPress={() => router.replace("/(tabs)")}
              >
                <ThemedText style={styles.buttonText}>BACK</ThemedText>
              </TouchableOpacity>
            </View>
          </View>
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
  mainContent: {
    flex: 1,
    width: '100%',
  },
  cameraContainer: {
    width: '100%',
    height: '50%',
    backgroundColor: '#000',
    borderBottomWidth: 3,
    borderBottomColor: '#000',
    position: 'relative',
    overflow: 'hidden',
  },
  camera: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  cameraPlaceholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderImage: {
    width: '50%',
    height: '50%',
  },
  flipButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    padding: 10,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 25,
  },
  detectionBox: {
    width: '100%',
    height: '100%',
    borderWidth: 2,
    borderColor: '#00CED1',
    borderStyle: 'dashed',
  },
  bottomContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 20,
  },
  resultContainer: {
    alignItems: 'center',
  },
  resultBox: {
    width: RESULT_BOX_SIZE,
    height: RESULT_BOX_SIZE,
    backgroundColor: 'rgba(0, 206, 209, 0.8)',
    borderWidth: 3,
    borderColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    padding: 5,
  },
  resultText: {
    fontSize: 40,
    fontFamily: 'Koulen',
    color: '#000',
  },
  resultLabel: {
    fontSize: 25,
    fontFamily: 'Koulen',
    color: '#000',
  },
  backButtonContainer: {
    width: '100%',
    alignItems: 'center',
  },
  backButton: {
    backgroundColor: '#00CED1',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: '#000',
    width: TITLE_WIDTH,
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
  text: {
    fontSize: 18,
    color: '#000',
    marginBottom: 20,
  },
  button: {
    backgroundColor: 'rgba(0, 206, 209, 0.8)',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: '#000',
    width: TITLE_WIDTH,
    borderRadius: 0,
  },
  activeCameraContainer: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: '#000',
  },
  tooltip: {
    position: 'absolute',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    padding: 10,
    borderRadius: 5,
    bottom: -40,
  },
  tooltipText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Koulen',
  },
}); 