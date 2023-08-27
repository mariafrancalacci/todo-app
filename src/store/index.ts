import Vue from 'vue';
import Vuex, { Store } from 'vuex';

Vue.use(Vuex);

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

interface State {
  todos: Todo[];
}

const state: State = {
  todos: [
    {
      id: 1,
      text: 'cozinhar',
      completed: false
    }
  ]
};

const mutations = {
  addTodo: (state: State, todo: Todo) => {
    state.todos.push(todo);
  },
  removeTodo: (state: State, todoId: number) => {
    const index = state.todos.findIndex(todo => todo.id === todoId);
    if (index !== -1) {
      state.todos.splice(index, 1);
    }
  },
  toggleTodoCompletion: (state: State, todoId: number) => {
    const todo = state.todos.find(todo => todo.id === todoId);
    if (todo) {
      todo.completed = !todo.completed;
    }
  }
};

const actions = {
  addTodo: ({ commit }: any, todoText: string) => {
    const newTodo: Todo = {
      id: Date.now(),
      text: todoText,
      completed: false
    };
    commit('addTodo', newTodo);
  },
  removeTodo: ({ commit }: any, todoId: number) => {
    commit('removeTodo', todoId);
  },
  toggleTodoCompletion: ({ commit }: any, todoId: number) => {
    commit('toggleTodoCompletion', todoId);
  }
};

const getters = {
  // Define your getters here
};

const store = new Vuex.Store<State>({
  state,
  mutations,
  actions,
  getters
});

export default store;