import { Text, StyleSheet, Pressable, Animated, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { type Task } from './TasksContextProvider';
import { useTasksStore } from './TasksStore';

const AnimatedView = Animated.createAnimatedComponent(View);

const RightActions = ({
  dragAnimatedValue,
  task,
}: {
  dragAnimatedValue: Animated.AnimatedInterpolation<string | number>;
  task: Task;
}) => {
  const deleteTask = useTasksStore((state) => state.deleteTask);

  const animatedStyles = {
    transform: [
      {
        translateX: dragAnimatedValue.interpolate({
          inputRange: [-40, 0],
          outputRange: [0, 40],
          extrapolate: 'clamp',
        }),
      },
    ],
  };

  return (
    <AnimatedView
      style={[
        {
          backgroundColor: 'crimson',
          alignItems: 'center',
          flexDirection: 'row',
          paddingHorizontal: 10,
        },
        animatedStyles,
      ]}
    >
      <MaterialCommunityIcons
        onPress={() => deleteTask(task.id)}
        name="delete"
        size={20}
        color="white"
      />
    </AnimatedView>
  );
};

type TaskListItem = {
  task: Task;
};

const TaskListItem = ({ task }: TaskListItem) => {
  const changeIsFinished = useTasksStore((state) => state.changeIsFinished);
  return (
    <Swipeable
      renderRightActions={(progressAnimatedValue, dragAnimatedValue) => (
        <RightActions dragAnimatedValue={dragAnimatedValue} task={task} />
      )}
    >
      <Pressable
        onPress={() => changeIsFinished(task.id)}
        style={styles.taskContainer}
      >
        <MaterialCommunityIcons
          name={
            task.isFinished
              ? 'checkbox-marked-circle-outline'
              : 'checkbox-blank-circle-outline'
          }
          size={24}
          color={task.isFinished ? 'gray' : 'dimgray'}
        />
        <Text
          style={[
            styles.taskTitle,
            {
              textDecorationLine: task.isFinished ? 'line-through' : 'none',
              color: task.isFinished ? 'lightgray' : 'dimgray',
            },
          ]}
        >
          {task.title}
        </Text>
      </Pressable>
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  taskContainer: {
    padding: 5,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  taskTitle: {
    fontFamily: 'InterSemi',
    fontSize: 15,
    flex: 1,
  },
});

export default TaskListItem;
