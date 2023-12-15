import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Pressable,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useState } from 'react';
import { Stack } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import NewTaskInput from '@/components/day15/NewTaskInput';
import { SafeAreaView } from 'react-native-safe-area-context';

export type Task = {
  title: string;
  isFinished: boolean;
};

const dummyTasks: Task[] = [
  {
    title: 'Setup Day15 structure',
    isFinished: true,
  },
  {
    title: 'Render a list of tasks',
    isFinished: false,
  },
  {
    title: 'Add a new task',
    isFinished: false,
  },
  {
    title: 'Change the status of a task',
    isFinished: false,
  },
  {
    title: 'Separate in 2 tabs: todo, and complete',
    isFinished: false,
  },
];

const TodoScreen = () => {
  const [tasks, setTasks] = useState<Task[]>(dummyTasks);

  const onItemPressed = (index: number) => {
    setTasks((currentTasks) => {
      const updatedTasks = [...currentTasks];
      updatedTasks[index].isFinished = !updatedTasks[index].isFinished;
      return updatedTasks;
    });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.page}
    >
      <Stack.Screen options={{ headerShown: false }} />

      <SafeAreaView>
        <FlatList
          data={tasks}
          contentContainerStyle={{ gap: 5, padding: 10 }}
          renderItem={({ item, index }) => (
            <Pressable
              onPress={() => onItemPressed(index)}
              style={styles.taskContainer}
            >
              <MaterialCommunityIcons
                name={
                  item.isFinished
                    ? 'checkbox-marked-circle-outline'
                    : 'checkbox-blank-circle-outline'
                }
                size={24}
                color="dimgray"
              />
              <Text
                style={[
                  styles.taskTitle,
                  {
                    textDecorationLine: item.isFinished
                      ? 'line-through'
                      : 'none',
                  },
                ]}
              >
                {item.title}
              </Text>
            </Pressable>
          )}
          ListFooterComponent={() => (
            <NewTaskInput
              onAdd={(newTodo: Task) =>
                setTasks((currentTasks) => [...currentTasks, newTodo])
              }
            />
          )}
        />
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  page: {
    backgroundColor: 'white',
    flex: 1,
  },
  taskContainer: {
    padding: 5,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  taskTitle: {
    fontFamily: 'InterSemi',
    fontSize: 15,
    color: 'dimgray',
    flex: 1,
  },
});

export default TodoScreen;
