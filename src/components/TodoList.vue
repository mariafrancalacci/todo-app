<template>
    <div class="items-center h-[100vh] justify-center pt-12 flex-col gap-4 text-gray-300 text-center bg-gray-600 mt-0">
      <section class="w-full max-w-[46rem] mx-auto my-0 px-4 py-0">
        <header class="flex items-center justify-between mb-6">
          <div class="flex items-center gap-[0.8rem]">
            <p class="text-blue text-sm font-bold">Tasks</p>
            <span class="text-gray-200 text-xs font-bold px-[9px] py-[3px] rounded-[999px] bg-gray-400">
              {{ tasks.length }}
            </span>
          </div>
          
          <div class="flex items-center gap-[0.8rem]">
            <button @click="filter = 'all'">All</button>
            <button @click="filter = 'pending'">Pending</button>
            <button @click="filter = 'completed'">Completed</button>
          </div>
          <div class="flex items-center gap-[0.8rem]">
            <p class="text-purple">Done</p>
            <span>{{ completedTodosCount}}  of {{ tasks.length }}</span>
          </div>
        </header>
  

        <div class="flex flex-col gap-3">

          <template v-if="tasks.length === 0">
           <div class="items-center justify-center flex flex-col gap-4 text-[color:var(--gray-300)] text-center mt-16">
            <Icon icon="clarity:list-line" color="#808080" width="40" height="40" />
            <p class="text-gray-300">You don't have any tasks registered yet.</p>
           </div>
          </template>

          <template v-else>
            <div class="flex flex-col gap-3">
              <template v-if="filteredTodos.length === 0">
                <div class="items-center justify-center flex flex-col gap-4 text-[color:var(--gray-300)] text-center mt-16">
                  <Icon icon="clarity:list-line" color="#808080" width="40" height="40" />
                  <p class="text-gray-300">You don't have any tasks registered yet.</p>
                </div>
              </template>
              <template v-else>
               <Todo v-for="task in filteredTodos" :key="task.id" :task="task" />
              </template>
            </div>
          </template>
       </div>

      </section>
    </div>
  </template>
  
  <script lang="ts">
  import Vue from 'vue';
  import { mapState } from 'vuex';
  import Todo from '@/components/Todo.vue';
  import { Task } from '@/store/modules/todos';
  
  export default Vue.extend({
    components: {
      Todo,
    },
    data() {
    return {
      filter: 'all', 
    };
  },
    computed: {
    tasks(): Task[] {
      return (this.$store.state as any).todos.tasks;
    },
    filteredTodos(): Task[] {
      const tasks = this.tasks;

      if (this.filter === 'pending') {
        return tasks.filter((task: Task) => !task.isCompleted);
      } else if (this.filter === 'completed') {
        return tasks.filter((task: Task) => task.isCompleted);
      }

      return tasks;
    },
    completedTodosCount(): number {
      const tasks = this.tasks;
      const completedTodos = tasks.filter((task: Task) => task.isCompleted);
      return completedTodos.length;
    },
  },
  });
  </script>
  