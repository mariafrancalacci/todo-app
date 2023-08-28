import type { ActionTree, Module, MutationTree } from 'vuex';
import type { RootState } from './index';

export interface Task {
  id: string;
  text: string;
  isCompleted: boolean;
  dueDate: Date | null;
}

export interface TodosState {
  tasks: Task[];
}

export const mutations: MutationTree<TodosState> = {
  addTodo: (state, task: Task) => {
    state.tasks.push(task);
  },
  removeTodo: (state, id: Task['id']) => {
    state.tasks = state.tasks.filter(task => task.id !== id);
  },
  toggleTodo: (state, id: Task['id']) => {
    const task = state.tasks.find(task => task.id === id);
    if (task) {
      task.isCompleted = !task.isCompleted;
    }
  },
  editTodo: (state, editedTask: Task) => {
    const taskIndex = state.tasks.findIndex(task => task.id === editedTask.id);
    if (taskIndex !== -1) {
      state.tasks[taskIndex] = editedTask;
    }
  },
}

export const actions: ActionTree<TodosState, RootState> = {
  addTodo: ({ commit }, task: Task) => {
    task.isCompleted = false;
    commit('addTodo', task);
  },
  removeTodo({ commit }, id: Task['id']) {
    commit('removeTodo', id);
  },
  toggleTodo({ commit }, id: Task['id']) {
    commit('toggleTodo', id);
  },
  editTodo({ commit }, editedTask: Task) {
    commit('editTodo', editedTask);
  },
}

const todosModule: Module<TodosState, RootState> = {
  namespaced: true,
  state: {
    tasks: [],
  },
  mutations,
  actions
};

export default todosModule;
