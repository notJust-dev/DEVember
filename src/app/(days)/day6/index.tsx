import { View, Text, Button } from 'react-native';
import React from 'react';
import { Link, Stack } from 'expo-router';
import MarkdownDisplay from '@/components/day3/MarkdownDisplay';
import { SafeAreaView } from 'react-native-safe-area-context';

const description = `
# Tinder Swipe Animation

Let's build the Tinder Swipe Animation in React Native using Reanimated
`;

const DayDetailsScreen = () => {
  return (
    <SafeAreaView edges={['bottom']} style={{ flex: 1 }}>
      <Stack.Screen options={{ title: 'Day 6: Tinder' }} />

      <MarkdownDisplay>{description}</MarkdownDisplay>

      <Link href="/day6/tinder" asChild>
        <Button title="Go to Tinder" />
      </Link>
    </SafeAreaView>
  );
};

export default DayDetailsScreen;
