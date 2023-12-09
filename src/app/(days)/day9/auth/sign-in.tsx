import { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';
import { signIn } from 'aws-amplify/auth';
import { Link, router } from 'expo-router';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const onSignInPressed = async () => {
    setError('');
    try {
      const { isSignedIn, nextStep } = await signIn({
        username: email,
        password,
      });
      if (isSignedIn) {
        router.push('/(days)/day9/protected');
      } else {
        setError('Something went wrong! ' + nextStep.signInStep);
      }
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign in</Text>

      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="jon@acme.com"
        style={styles.input}
      />
      <TextInput
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        secureTextEntry
      />

      <Button title="Sign in" onPress={onSignInPressed} />
      {error && <Text style={{ color: 'red' }}>{error}</Text>}
      <Link href={'/day9/auth/sign-up'}>New here? Sign up</Link>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    justifyContent: 'center',
    flex: 1,
  },
  title: {
    fontFamily: 'InterSemi',
    fontSize: 24,
    color: 'dimgray',
  },
  input: {
    borderWidth: 1,
    borderColor: 'gainsboro',
    padding: 10,
    marginVertical: 10,
    backgroundColor: 'white',
    borderRadius: 5,
  },
});

export default SignIn;
