import { View, Text, Button } from 'react-native';
import React from 'react';
import { Link, Stack } from 'expo-router';
import MarkdownDisplay from '@/components/day3/MarkdownDisplay';
import { SafeAreaView } from 'react-native-safe-area-context';

const description = `
# Todo app with React Context
Ultimate Todo app with React Context`;

const DayDetailsScreen = () => {
  return (
    <SafeAreaView edges={['bottom']} style={{ flex: 1 }}>
      <Stack.Screen options={{ title: 'Day 16: Todo' }} />

      <MarkdownDisplay>{description}</MarkdownDisplay>

      <Link href="/day16/todo" asChild>
        <Button title="Go to TODO" />
      </Link>
    </SafeAreaView>
  );
};

export default DayDetailsScreen;
