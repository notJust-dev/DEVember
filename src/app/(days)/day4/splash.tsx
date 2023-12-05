import { View, Text, Button } from 'react-native';
import LottieView from 'lottie-react-native';
import { useRef } from 'react';
import { Stack } from 'expo-router';
import AnimatedSplashScreen from '@/components/day4/AnimatedSplashScreen';

const AnimationScreen = () => {
  const animation = useRef<LottieView>(null);

  return <AnimatedSplashScreen />;
};

export default AnimationScreen;
