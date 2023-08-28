import type { Module } from 'vuex';
import type { RootState } from './index';

interface Task {
  id: number;
  text: string;
  isCompleted: boolean;
  dueDate: Date | null;
}

interface TodosState {
  tasks: Task[];
  nextTaskId: number; 
}

const todosModule: Module<TodosState, RootState> = {
  namespaced: true,
  state: {
    tasks: [],
    nextTaskId: 1,
  },
  mutations: {
    addTodo(state, task: Task) {
      task.isCompleted = false;
      task.id = state.nextTaskId; 
      state.nextTaskId++; 
      state.tasks.push(task);
    },
    removeTodo(state, id: number) {
      state.tasks = state.tasks.filter(task => task.id !== id);
    },
    toggleTodo(state, id: number) {
      const task = state.tasks.find(task => task.id === id);
      if (task) {
        task.isCompleted = !task.isCompleted;
      }
    },
    editTodo(state, editedTask: Task) {
      const taskIndex = state.tasks.findIndex(task => task.id === editedTask.id);
      if (taskIndex !== -1) {
        state.tasks[taskIndex] = editedTask;
      }
    },
  },
  actions: {
    addTodo({ commit }, task: Task) {
      task.isCompleted = false;
      commit('addTodo', task);
    },
    removeTodo({ commit }, id: number) {
      commit('removeTodo', id);
    },
    toggleTodo({ commit }, id: number) {
      commit('toggleTodo', id);
    },
    editTodo({ commit }, editedTask: Task) {
      commit('editTodo', editedTask);
    },
  },
};

export default todosModule;
