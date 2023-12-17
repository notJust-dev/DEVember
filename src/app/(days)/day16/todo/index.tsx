import {
  StyleSheet,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Text,
  Button,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack } from 'expo-router';
import NewTaskInput from '@/components/day16/NewTaskInput';
import TaskListItem from '@/components/day16/TaskListItem';
import Reanimated, { CurvedTransition } from 'react-native-reanimated';
import { useHeaderHeight } from '@react-navigation/elements';

import { useState } from 'react';
import { useTasks, type Task } from '@/components/day16/TasksContextProvider';

const TodoScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [tab, setTab] = useState<'All' | 'Todo' | 'Finished'>('All');

  const headerHeight = useHeaderHeight();

  const { getFilteredTasks, numberOfCompletedTasks, numberOfTasks } =
    useTasks();

  const filteredTasks = getFilteredTasks(tab, searchQuery);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.page}
    >
      <Stack.Screen
        options={{
          title: 'Todo',
          headerBackTitleVisible: false,
          headerRight: () => (
            <Text style={{ fontFamily: 'InterBold', color: 'dimgray' }}>
              {numberOfCompletedTasks} / {numberOfTasks}
            </Text>
          ),
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
          renderItem={({ item }) => (
            <Reanimated.View layout={CurvedTransition}>
              <TaskListItem task={item} />
            </Reanimated.View>
          )}
          ListFooterComponent={() => <NewTaskInput />}
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
