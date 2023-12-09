import { Redirect, Slot } from 'expo-router';
import { useAuthenticator } from '@aws-amplify/ui-react-native';

export default function AuthLayout() {
  const { authStatus } = useAuthenticator((context) => [context.authStatus]);

  if (authStatus === 'authenticated') {
    return <Redirect href={'/day9/protected'} />;
  }

  return <Slot />;
}
