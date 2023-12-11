import { PropsWithChildren, createContext, useContext, useState } from 'react';
import * as LocalAuthentication from 'expo-local-authentication';
import { Alert } from 'react-native';

type BiometricsContext = {
  isUnlocked: boolean;
  authenticate: () => Promise<void>;
};

const BiometricsContext = createContext<BiometricsContext>({
  isUnlocked: false,
  authenticate: async () => {},
});

const BiometricProvider = ({ children }: PropsWithChildren) => {
  const [isUnlocked, setIsUnlocked] = useState(false);

  const authenticate = async () => {
    const hasHardware = await LocalAuthentication.hasHardwareAsync();

    if (!hasHardware) {
      Alert.alert('Not supported');
      return;
    }

    const res = await LocalAuthentication.authenticateAsync();
    if (res.success) {
      setIsUnlocked(true);
    }
  };

  return (
    <BiometricsContext.Provider value={{ isUnlocked, authenticate }}>
      {children}
    </BiometricsContext.Provider>
  );
};

export default BiometricProvider;

export const useBiometrics = () => useContext(BiometricsContext);
