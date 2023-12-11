import { View, Text, Button } from 'react-native';
import React from 'react';
import { Link, Stack } from 'expo-router';
import MarkdownDisplay from '@/components/day3/MarkdownDisplay';
import { SafeAreaView } from 'react-native-safe-area-context';

const description = `
# Camera app 
Take photos and record videos with React Native Vision Camera`;

const DayDetailsScreen = () => {
  return (
    <SafeAreaView edges={['bottom']} style={{ flex: 1 }}>
      <Stack.Screen options={{ title: 'Day 11: Camera' }} />

      <MarkdownDisplay>{description}</MarkdownDisplay>

      <Link href="/day11/camera" asChild>
        <Button title="Go to Camera" />
      </Link>
    </SafeAreaView>
  );
};

export default DayDetailsScreen;
