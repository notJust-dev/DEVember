import { View, Text, Button } from 'react-native';
import React from 'react';
import { Link, Stack } from 'expo-router';
import MarkdownDisplay from '@/components/day3/MarkdownDisplay';
import { SafeAreaView } from 'react-native-safe-area-context';

const description = `
# Push Notifications
Send and Receive Push Notifications`;

const DayDetailsScreen = () => {
  return (
    <SafeAreaView edges={['bottom']} style={{ flex: 1 }}>
      <Stack.Screen options={{ title: 'Day 14: Notifications' }} />

      <MarkdownDisplay>{description}</MarkdownDisplay>

      <Link href="/day14/notifications" asChild>
        <Button title="Go to Notifications" />
      </Link>
    </SafeAreaView>
  );
};

export default DayDetailsScreen;
