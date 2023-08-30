<template>
  <header class="bg-gray-700 flex items-center justify-center h-[12.5rem] relative">
    <div class="flex gap-2">
      <h1 class=" text-blue font-weight: 700 text-xl ">TODO</h1>
      <h1 class=" text-purple font-weight: 700 text-xl ">LIST</h1>
      <Icon icon="lucide:list" color="#FFFFFF" width="30" height="30" />
    </div>
    <form @submit.prevent="createTodo"
      class="absolute h-[3.375rem] bottom-[calc(-3.375rem_/_2)] w-full max-w-[46rem] flex flex-col md:flex-row md:gap-2 px-4 py-0 justify-between">
      <div class="flex gap-[1.5rem] md:gap-2">
        <input type="text" v-model="newTodoText" placeholder="Enter a new task" data-testid="new-todo-title"
          :class="[isFailure && newTodoText.length === 0 ? 'h-full w-[300px] sm:w-[430px] placeholder-gray-300 text-gray-100 border text-base px-4 py-0 rounded-lg border-solid border-red-800 bg-gray-500' : 'h-full w-[300px] sm:w-[430px] placeholder-gray-300 text-gray-100 border text-base px-4 py-0 rounded-lg border-solid border-gray-700 bg-gray-500']" />

        <input type="date" v-model="newTodoDueDate" data-testid="new-todo-date"
          :class="[isFailure && newTodoDueDate.length === 0 ? 'h-full  w-[55px] sm:w-[160px] text-gray-300 border text-base px-4 py-0 rounded-lg border-solid border-red-800 bg-gray-500' : 'h-full  w-[55px] sm:w-[160px] text-gray-500  sm:text-gray-300 border text-base px-4 py-0 rounded-lg border-solid border-gray-700 bg-gray-500']" />
      </div>

      <div class="flex justify-end">
        <button data-testid="new-todo-submit"
          class="h-full text-gray-100 w-[100px] flex items-center gap-1.5  mt-2 md:mt-0 font-bold text-sm px-4 py-0 rounded-lg border-[none] bg-blue-dark">
          Create
          <Icon icon="clarity:plus-circle-line" color="#f2f2f2" width="18" height="18" />
        </button>
      </div>
    </form>
  </header>
</template>


<script lang="ts">
import Vue from 'vue';
import { mapActions } from 'vuex';
import { Task } from '@/store/modules/todos';
import { v4 as uuidv4 } from 'uuid';

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
          id: uuidv4(),
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


