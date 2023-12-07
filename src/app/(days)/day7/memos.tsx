import { useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Button,
  FlatList,
  Pressable,
} from 'react-native';
import { Audio } from 'expo-av';
import { Recording } from 'expo-av/build/Audio';
import Animated, {
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import MemoListItem from '@/components/day7/MemoListItem';

export default function MemosScreen() {
  const [recording, setRecording] = useState<Recording>();
  const [memos, setMemos] = useState<string[]>([]);

  async function startRecording() {
    try {
      console.log('Requesting permissions..');
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      console.log('Starting recording..');
      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      setRecording(recording);
      console.log('Recording started');
    } catch (err) {
      console.error('Failed to start recording', err);
    }
  }

  async function stopRecording() {
    if (!recording) {
      return;
    }

    console.log('Stopping recording..');
    setRecording(undefined);
    await recording.stopAndUnloadAsync();
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
    });
    const uri = recording.getURI();
    console.log('Recording stopped and stored at', uri);

    if (uri) {
      setMemos((existingMemos) => [uri, ...existingMemos]);
    }
  }

  const animatedRedCircle = useAnimatedStyle(() => ({
    width: withTiming(recording ? '60%' : '100%'),
    borderRadius: withTiming(recording ? 5 : 35),
  }));

  return (
    <View style={styles.container}>
      <FlatList
        data={memos}
        renderItem={({ item }) => <MemoListItem uri={item} />}
      />

      <View style={styles.footer}>
        <Pressable
          style={styles.recordButton}
          onPress={recording ? stopRecording : startRecording}
        >
          <Animated.View style={[styles.redCircle, animatedRedCircle]} />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
  },
  footer: {
    backgroundColor: 'white',
    height: 150,
    alignItems: 'center',
    justifyContent: 'center',
  },
  recordButton: {
    width: 60,
    height: 60,
    borderRadius: 60,

    borderWidth: 3,
    borderColor: 'gray',
    padding: 3,

    alignItems: 'center',
    justifyContent: 'center',
  },
  redCircle: {
    backgroundColor: 'orangered',
    aspectRatio: 1,
    borderRadius: 30,
  },
});
