import {
  StyleSheet,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Text,
  Button,
  View,
} from 'react-native';
import { useState } from 'react';
import { Stack } from 'expo-router';
import NewTaskInput from '@/components/day15/NewTaskInput';
import { SafeAreaView } from 'react-native-safe-area-context';
import TaskListItem from '@/components/day15/TaskListItem';
import Reanimated, { CurvedTransition } from 'react-native-reanimated';
import { useHeaderHeight } from '@react-navigation/elements';

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
  const [searchQuery, setSearchQuery] = useState('');
  const [tab, setTab] = useState<'All' | 'Todo' | 'Finished'>('All');

  const headerHeight = useHeaderHeight();

  const filteredTasks = tasks.filter((task) => {
    if (task.isFinished && tab === 'Todo') {
      return false;
    }
    if (!task.isFinished && tab === 'Finished') {
      return false;
    }

    if (!searchQuery) {
      return true;
    }

    return task.title
      .toLowerCase()
      .trim()
      .includes(searchQuery.toLowerCase().trim());
  });

  const onItemPressed = (index: number) => {
    setTasks((currentTasks) => {
      const updatedTasks = [...currentTasks];
      updatedTasks[index].isFinished = !updatedTasks[index].isFinished;
      return updatedTasks;
    });
  };

  const deleteTask = (index: number) => {
    setTasks((currentTasks) => {
      const updatedTasks = [...currentTasks];
      updatedTasks.splice(index, 1);
      return updatedTasks;
    });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.page}
    >
      <Stack.Screen
        options={{
          title: 'Todo',
          headerBackTitleVisible: false,
          headerSearchBarOptions: {
            hideWhenScrolling: true,
            onChangeText: (e) => setSearchQuery(e.nativeEvent.text),
          },
        }}
      />

      <SafeAreaView
        edges={['bottom']}
        style={{ flex: 1, paddingTop: headerHeight + 35 }}
      >
        <View
          style={{
            flexDirection: 'row',
            marginTop: 20,
            justifyContent: 'space-around',
          }}
        >
          <Button title="All" onPress={() => setTab('All')} />
          <Button title="Todo" onPress={() => setTab('Todo')} />
          <Button title="Finished" onPress={() => setTab('Finished')} />
        </View>
        <FlatList
          data={filteredTasks}
          contentContainerStyle={{ gap: 5, padding: 10 }}
          keyExtractor={(item) => item.title}
          renderItem={({ item, index }) => (
            <Reanimated.View layout={CurvedTransition}>
              <TaskListItem
                task={item}
                onItemPressed={() => onItemPressed(index)}
                onDelete={() => deleteTask(index)}
              />
            </Reanimated.View>
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
});

export default TodoScreen;
