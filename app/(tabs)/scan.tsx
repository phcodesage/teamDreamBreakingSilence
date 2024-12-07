import { StyleSheet, View, TouchableOpacity, ImageBackground, Dimensions } from 'react-native';
import { Camera, CameraPermissionStatus, useCameraDevice } from 'react-native-vision-camera';
import { useState, useEffect } from 'react';
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
import { router } from 'expo-router';

const SCREEN_WIDTH = Dimensions.get('window').width;
const RESULT_BOX_SIZE = SCREEN_WIDTH * 0.3;

export default function ScanScreen() {
  const [hasPermission, setHasPermission] = useState<CameraPermissionStatus>('not-determined');
  const [isFront, setIsFront] = useState(false);
  const device = useCameraDevice(isFront ? 'front' : 'back');
  const [showTooltip, setShowTooltip] = useState(true);
  const tooltipOpacity = useSharedValue(1);

  useEffect(() => {
    (async () => {
      const permission = await Camera.requestCameraPermission();
      setHasPermission(permission);
      console.log('Camera permission:', permission);
    })();

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

  if (hasPermission !== 'granted') {
    return (
      <View style={styles.container}>
        <ThemedText>No access to camera</ThemedText>
      </View>
    );
  }

  if (device == null) {
    return (
      <View style={styles.container}>
        <ThemedText>No camera device found</ThemedText>
      </View>
    );
  }

  return (
    <ImageBackground 
      source={require('@/assets/images/background.png')} 
      style={styles.backgroundImage}
    >
      <SafeAreaView style={styles.container} edges={['bottom', 'left', 'right']}>
        <View style={styles.header}>
          <ThemedText style={styles.title}>SCAN</ThemedText>
        </View>

        <View style={styles.cameraContainer}>
          <Camera
            style={StyleSheet.absoluteFill}
            device={device}
            isActive={true}
            photo={true}
          />
          
          <View style={styles.buttonContainer}>
            <TouchableOpacity 
              style={styles.flipButton}
              onPress={() => setIsFront(!isFront)}
            >
              <MaterialIcons name="flip-camera-ios" size={30} color="#00CED1" />
            </TouchableOpacity>
          </View>

          <View style={styles.detectionBox}>
            {showTooltip && (
              <Animated.View style={[styles.tooltip, tooltipStyle]}>
                <ThemedText style={styles.tooltipText}>
                  Position your hand sign in this box
                </ThemedText>
              </Animated.View>
            )}
          </View>

          <View style={styles.resultBox}>
            <ThemedText style={styles.resultText}>Result will appear here</ThemedText>
          </View>
        </View>

        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
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
  },
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: '#00CED1',
    padding: 15,
    alignItems: 'center',
    borderBottomWidth: 3,
    borderBottomColor: '#000',
  },
  title: {
    fontSize: 35,
    fontFamily: 'Koulen',
    color: '#000',
  },
  cameraContainer: {
    flex: 1,
    marginVertical: 20,
  },
  buttonContainer: {
    position: 'absolute',
    top: 20,
    right: 20,
    zIndex: 1,
  },
  flipButton: {
    padding: 10,
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderRadius: 25,
  },
  detectionBox: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: RESULT_BOX_SIZE,
    height: RESULT_BOX_SIZE,
    transform: [
      { translateX: -RESULT_BOX_SIZE / 2 },
      { translateY: -RESULT_BOX_SIZE / 2 }
    ],
    borderWidth: 2,
    borderColor: '#00CED1',
    backgroundColor: 'transparent',
  },
  tooltip: {
    position: 'absolute',
    top: -50,
    width: 200,
    left: -100 + (RESULT_BOX_SIZE / 2),
    backgroundColor: 'rgba(0,0,0,0.7)',
    padding: 10,
    borderRadius: 5,
  },
  tooltipText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 14,
  },
  resultBox: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: 'rgba(0,0,0,0.7)',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  resultText: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'Koulen',
  },
  backButton: {
    backgroundColor: '#00CED1',
    padding: 15,
    alignItems: 'center',
    margin: 20,
    borderWidth: 3,
    borderColor: '#000',
  },
  buttonText: {
    fontSize: 25,
    fontFamily: 'Koulen',
    color: '#000',
  },
});