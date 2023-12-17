import { Stack } from 'expo-router';
import TasksContextProvider from '@/components/day16/TasksContextProvider';

export default function TodoLayout() {
  return (
    <TasksContextProvider>
      <Stack.Screen options={{ headerShown: false }} />
      <Stack />
    </TasksContextProvider>
  );
}
