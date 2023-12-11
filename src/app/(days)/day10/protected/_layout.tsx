import { Slot } from 'expo-router';
import { useEffect, useState } from 'react';
import * as LocalAuthentication from 'expo-local-authentication';
import { Alert, Text, View } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useBiometrics } from '@/components/day10/BiometricsProvider';

export default function BiometricProtectedLayout() {
  const { isUnlocked, authenticate } = useBiometrics();

  useEffect(() => {
    if (!isUnlocked) {
      authenticate();
    }
  }, []);

  if (!isUnlocked) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'white',
        }}
      >
        <Text style={{ fontFamily: 'Inter', fontSize: 20, marginBottom: 20 }}>
          Use FaceId to Unlock
        </Text>
        <FontAwesome5
          onPress={authenticate}
          name="fingerprint"
          size={75}
          color="gray"
        />
      </View>
    );
  }

  return <Slot />;
}
