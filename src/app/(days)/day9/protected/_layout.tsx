import { Redirect, Slot } from 'expo-router';
import {
  withAuthenticator,
  useAuthenticator,
} from '@aws-amplify/ui-react-native';

function ProtectedLayout() {
  const { authStatus } = useAuthenticator((context) => [context.authStatus]);

  if (authStatus !== 'authenticated') {
    return <Redirect href={'/day9/auth/sign-in'} />;
  }

  return <Slot />;
}

// export default withAuthenticator(ProtectedLayout);
export default ProtectedLayout;
