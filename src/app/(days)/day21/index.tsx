import { View, Text, Button } from 'react-native';
import React from 'react';
import { Link, Stack } from 'expo-router';
import MarkdownDisplay from '@/components/day3/MarkdownDisplay';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

const description = `
# In-app Subscriptions
In-app Subscriptions with RevenueCat`;

const DayDetailsScreen = () => {
  return (
    <SafeAreaView edges={['bottom']} style={{ flex: 1 }}>
      <Stack.Screen options={{ title: 'Day 21: IAP' }} />

      <MarkdownDisplay>{description}</MarkdownDisplay>

      <Link href="/day21/pro" asChild>
        <Button title="Go to PREMIUM Page" />
      </Link>
    </SafeAreaView>
  );
};

export default DayDetailsScreen;
