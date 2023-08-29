<template>
  <header class="bg-gray-700 flex items-center justify-center h-[12.5rem] relative">
    <h1 class=" text-gray-200">TODO LIST</h1>
    <form @submit.prevent="createTodo"
      class="absolute h-[3.375rem] bottom-[calc(-3.375rem_/_2)] w-full max-w-[46rem] flex gap-2 px-4 py-0 justify-between">
      <div class="flex gap-2">
        <input type="text" v-model="newTodoText" placeholder="Enter a new task" data-testid="new-todo-title"
          :class="[isFailure && newTodoText.length === 0 ? 'h-full w-[430px] placeholder-gray-300 text-gray-100 border text-base px-4 py-0 rounded-lg border-solid border-red-800 bg-gray-500' : 'h-full w-[430px] placeholder-gray-300 text-gray-100 border text-base px-4 py-0 rounded-lg border-solid border-gray-700 bg-gray-500']" />

        <input type="date" v-model="newTodoDueDate" data-testid="new-todo-date"
          :class="[isFailure && newTodoDueDate.length === 0 ? 'h-full w-[160px] text-gray-300 border text-base px-4 py-0 rounded-lg border-solid border-red-800 bg-gray-500' : 'h-full w-[160px] text-gray-300 border text-base px-4 py-0 rounded-lg border-solid border-gray-700 bg-gray-500']" />
      </div>

      <button data-testid="new-todo-submit"
        class="h-full text-gray-100 flex items-center gap-1.5 font-bold text-sm px-4 py-0 rounded-lg border-[none] bg-blue-dark">
        Create
        <Icon icon="clarity:plus-circle-line" color="#f2f2f2" width="18" height="18" />
      </button>
    </form>
  </header>
</template>


<script lang="ts">
import Vue from 'vue';
import { mapActions } from 'vuex';
import { Task } from '@/store/modules/todos';
import { uuid } from 'vue-uuid'

export default Vue.extend({
  data() {
    return {
      newTodoText: '',
      newTodoDueDate: '',
      isFailure: false
    };
  },
  methods: {
    ...mapActions('todos', ['addTodo']),
    createTodo() {
      if (this.newTodoText.trim() !== '' && this.newTodoDueDate !== '') {
        const newTask: Task = {
          id: uuid.v4(),
          text: this.newTodoText,
          isCompleted: false,
          dueDate: new Date(this.newTodoDueDate),
        };
        this.isFailure = false;
        this.addTodo(newTask);
        this.newTodoText = '';
        this.newTodoDueDate = '';
      } else {
        this.isFailure = true
      }


    }
  },
})
</script>


