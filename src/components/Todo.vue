<template>
  <div class="w-full border bg-gray-500 border-gray-400 flex items-center justify-between gap-3 p-4 rounded-lg border-solid">
    
    <button class="w-[1.125rem] h-[1.125rem] border-none bg-none" @click="toggleComplete">
      <Icon :icon="task.isCompleted ? 'mdi:check-circle' : 'mdi:checkbox-blank-circle-outline'" :color="task.isCompleted ? '#5e60ce' : '#4ea8de'" />
    </button>

      <template v-if="editing">
        <input
        type="text"
        v-model="task.text"
      />
      <button @click="saveEdit">Save</button>
      <button @click="cancelEdit">Cancel</button>
    </template>
    <template v-else>
      <p  :class="task.isCompleted ? 'text-gray-300 line-through text-sm leading-[1.18rem] text-gray-100 mr-auto' : 'text-sm leading-[1.18rem] text-gray-100 mr-auto'" >
        {{ task.text }}
      </p>
    </template>
      
    
      <button class="text-gray-300 border-none" @click="startEdit" >
        <Icon icon="material-symbols:edit-outline" color="gray" />
      </button>
      <button @click="handleRemove(task.id)" class="text-gray-300 border-none">
        <Icon icon="octicon:trash-24" color="gray" />   
      </button> 
     
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Icon } from '@iconify/vue2';
import { mapActions } from 'vuex';

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
    toggleComplete() {
      this.toggleTodo(this.task.id); // Call the store action to toggle task completion
    },
    handleRemove(id: number) {
    this.removeTodo(id);
  },
    cancelEdit() {
      this.editing = false;
    },
  },
});
</script>