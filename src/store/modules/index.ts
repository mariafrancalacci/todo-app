import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';
import todosModule from './todos';

Vue.use(Vuex);

export interface RootState {}

const store: StoreOptions<RootState> = {
  modules: {
    todos: todosModule,
  },
};

export default new Vuex.Store<RootState>(store);
