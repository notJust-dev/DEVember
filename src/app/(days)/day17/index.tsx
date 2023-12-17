import { View, Text, Button } from 'react-native';
import React from 'react';
import { Link, Stack } from 'expo-router';
import MarkdownDisplay from '@/components/day3/MarkdownDisplay';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

const description = `
# Todo app with Zustand
Ultimate Todo app with Zustand`;

const DayDetailsScreen = () => {
  return (
    <SafeAreaView edges={['bottom']} style={{ flex: 1 }}>
      <Stack.Screen options={{ title: 'Day 17: Zustand' }} />

      <MarkdownDisplay>{description}</MarkdownDisplay>

      <Link href="/day17/todo" asChild>
        <Button title="Go to TODO" />
      </Link>
    </SafeAreaView>
  );
};

export default DayDetailsScreen;
