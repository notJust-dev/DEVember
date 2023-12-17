import { View, TextInput, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useState } from 'react';
import { useTasksStore } from './TasksStore';

type NewTaskInput = {};

const NewTaskInput = ({}: NewTaskInput) => {
  const addTask = useTasksStore((state) => state.addTask);

  const [newTask, setNewTask] = useState('');
  return (
    <View style={styles.taskContainer}>
      <MaterialCommunityIcons
        name="checkbox-blank-circle-outline"
        size={24}
        color="dimgray"
      />
      <TextInput
        value={newTask}
        onChangeText={setNewTask}
        style={styles.input}
        placeholder="Todo..."
        onEndEditing={() => {
          if (!newTask) {
            return;
          }
          addTask(newTask);
          setNewTask('');
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  taskContainer: {
    padding: 5,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  input: {
    fontFamily: 'InterSemi',
    color: 'dimgray',
    fontSize: 15,
    flex: 1,
  },
});

export default NewTaskInput;
