import Vue from 'vue';
import Vuex, { Store } from 'vuex';

Vue.use(Vuex);

interface Todo {
  id: number;
  text: string;
  isCompleted: boolean;
  isEditing: boolean;
}

interface State {
  todos: Todo[];
}

const state: State = {
  todos: [
    {
      id: 1,
      text: 'task',
      isCompleted: false,
      isEditing: false
    }
  ]
};

const mutations = {
  
};

const actions = {
  
};

const getters = {

};

const store = new Vuex.Store<State>({
  state,
  mutations,
  actions,
  getters
});

export default store;