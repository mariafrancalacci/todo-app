<template>
  <div class="w-full border bg-gray-500 border-gray-400 flex items-center justify-between gap-3 p-4 rounded-lg border-solid">
    
    <button class="w-[1.125rem] h-[1.125rem] border-none bg-none" @click="handleTodoComplete">
      <Icon :icon="task.isCompleted ? 'mdi:check-circle' : 'mdi:checkbox-blank-circle-outline'" :color="task.isCompleted ? '#5e60ce' : '#4ea8de'" />
    </button>

      <template v-if="editing">
        <input
        type="text"
        v-model="task.text"
      />
      <input
      v-if="editing"
      type="date"
      v-model="task.dueDate"
    />
      <button @click="saveEdit">Save</button>
      <button @click="cancelEdit">Cancel</button>
     </template>
    <template v-else>
      <p  :class="task.isCompleted ? 'text-gray-300 line-through text-sm leading-[1.18rem] mr-auto' : 'text-sm leading-[1.18rem] text-gray-100 mr-auto'" >
        {{ task.text }}
      </p>
    </template>
      
      <div class="flex items-center gap-1">
        <Icon icon="ph:clock-light" color="#808080" width="19" height="19"/>
        <span>{{ formatDueDate(task.dueDate) }}</span>
      </div>
      <button class="text-gray-300 border-none" @click="startEdit" >
        <Icon icon="material-symbols:edit-outline" color="#808080" />
      </button>
      <button @click="handleRemove(task.id)" class="text-gray-300 border-none">
        <Icon icon="octicon:trash-24" color="#808080" />   
      </button> 
     
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Icon } from '@iconify/vue2';
import dayjs from 'dayjs';
import { mapActions, mapState } from 'vuex';

export default Vue.extend({
  props: ['task'],
  data() {
    return {
      editing: false,
    };
  },
  methods: {
    ...mapActions('todos', ['removeTodo', 'editTodo', 'toggleTodo']),
    startEdit() {
      this.editing = true;
    },
    saveEdit() {
      if (this.task.text.trim() !== '') {
        this.editTodo(this.task);
        this.editing = false;
    }
    },
    handleTodoComplete() {
      this.toggleTodo(this.task.id); 
    },
    handleRemove(id: number) {
      this.removeTodo(id);
    },
    cancelEdit() {
      this.editing = false;
    },
    formatDueDate(date: Date | null): string {
      if (date) {
        return dayjs(date).format('ddd DD MMM YYYY');
      }
      return '';
    },
  },
  computed: {
    ...mapState('todos', ['tasks'])
  },
});
</script>