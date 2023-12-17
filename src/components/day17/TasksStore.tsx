import { create } from 'zustand';
import dummyTasks from './dummyTasks';
import { v4 as uuidv4 } from 'uuid';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type Task = {
  id: string;
  title: string;
  isFinished: boolean;
};

type TasksStore = {
  tasks: Task[];
  addTask: (title: string) => void;

  changeIsFinished: (id: string) => void;
  deleteTask: (id: string) => void;
  getFilteredTasks: (tab: string, searchQuery: string) => Task[];
  numberOfCompletedTasks: () => number;
  numberOfTasks: () => number;
};

export const useTasksStore = create(
  persist<TasksStore>(
    (set, get) => ({
      tasks: dummyTasks,
      numberOfCompletedTasks: () =>
        get((state) => state.tasks).tasks.filter((t) => t.isFinished).length,
      numberOfTasks: () => get((state) => state.tasks).tasks.length,

      // numberOfTasks: ,
      addTask: (title: string) => {
        const newTask: Task = {
          id: uuidv4(), // generate unique ids
          title,
          isFinished: false,
        };
        set((state) => ({ tasks: [...state.tasks, newTask] }));
      },
      deleteTask: (id: string) => {
        set((state) => ({ tasks: state.tasks.filter((t) => t.id !== id) }));
      },

      changeIsFinished: (id: string) => {
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id !== id ? task : { ...task, isFinished: !task.isFinished }
          ),
        }));
      },

      getFilteredTasks: (tab: string, searchQuery: string) => {
        const tasks = get((state) => state.tasks).tasks;
        return tasks.filter((task) => {
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
      },
    }),
    {
      name: 'tasks-store',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
