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

        <div class="relative inline-block text-gray-300">
          <select @change="handleFilterChange"
            class="appearance-none bg-transparent border border-gray-300 pl-4 pr-10 py-1 rounded-lg">
            <option value="all">All</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
          <div class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
            <Icon icon="system-uicons:filter" color="#808080" width="30" height="30" />
          </div>
        </div>
        <div class="flex items-center gap-[0.8rem]">
          <p class="text-purple">Done</p>
          <span>{{ completedTodosCount }} of {{ tasks.length }}</span>
        </div>
      </header>


      <div class="flex flex-col gap-3">
        <template v-if="tasks.length === 0">
          <div class="items-center justify-center flex flex-col gap-4 text-[color:var(--gray-300)] text-center mt-16">
            <Icon icon="clarity:list-line" color="#808080" width="40" height="40" />
            <p class="text-gray-300">You don't have any tasks registered yet.</p>
          </div>
        </template>
        <template v-else-if="filteredTodos.length === 0">
          <div class="items-center justify-center flex flex-col gap-4 text-[color:var(--gray-300)] text-center mt-16">
            <Icon icon="ph:x-circle-light" color="#808080" width="40" height="40" />
            <p class="text-gray-300">You don't have completed tasks yet.</p>
          </div>
        </template>
        <template v-else>
          <Todo v-for="task in filteredTodos" :key="task.id" :task="task" />
        </template>
      </div>

    </section>
  </div>
</template>
  
<script lang="ts">
import Vue from 'vue';
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
  methods: {
    handleFilterChange(event: any) {
      this.filter = event.target.value;
    },
  },
});
</script>