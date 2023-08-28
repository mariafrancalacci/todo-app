<template>
   <header class="bg-gray-700 flex items-center justify-center h-[12.5rem] relative">
    <h1 class=" text-gray-200">TODO LIST</h1>
      <form @submit.prevent="createTodo" class="absolute h-[3.375rem] bottom-[calc(-3.375rem_/_2)] w-full max-w-[46rem] flex gap-2 px-4 py-0">
        <input
          type="text"
          v-model="newTodo" 
          placeholder="Enter a new task" 
          class="h-full flex-1 placeholder-gray-300 text-gray-100 border text-base px-4 py-0 rounded-lg border-solid border-gray-700 bg-gray-500"
        />
        
        <button class="h-full text-gray-100 flex items-center gap-1.5 font-bold text-sm px-4 py-0 rounded-lg border-[none] bg-blue-dark">
          Create
          <Icon icon="clarity:plus-circle-line" color="#f2f2f2" width="18" height="18" />
        </button>
      </form>
   </header>
</template>


<script lang="ts">
import Vue from 'vue';
import { mapActions } from 'vuex';

export default Vue.extend({
  data() {
    return {
      newTodo: '',
    };
  },
  methods: {
    ...mapActions('todos', ['addTodo']),
    createTodo() {
      if (this.newTodo.trim() !== '') {
      this.addTodo({ text: this.newTodo, isCompleted: false, dueDate: null });
      this.newTodo = '';
    }
    },
  },
});
</script>


