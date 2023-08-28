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
        <p 
          :class="[ task.isCompleted ? 'text-gray-300 line-through text-sm leading-[1.18rem] mr-auto' : 'text-sm leading-[1.18rem] text-gray-100 mr-auto',
          isOverdue() && !task.isCompleted ? 'text-red-500' : '']"
          >
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
      <button @click="showModal()" class="text-gray-300 border-none">
        <Icon icon="octicon:trash-24" color="#808080" />   
      </button> 
      <button @click="multiplyTodo" class="text-gray-300 border-none">
       <Icon icon="ion:duplicate-outline" color="#808080"  />
      </button>


      <div v-if="showDeleteModal" class="fixed inset-0 flex items-center justify-center z-50">
      <div class=" bg-gray-500 rounded-lg p-4">
        <p>Are you sure you want to delete this task?</p>
        <div class="flex justify-end mt-4">
          <button @click="unShowModal" class="text-gray-500 mr-2">Cancel</button>
          <button @click="handleRemoveTodo" class="text-red-500">Delete</button>
        </div>
      </div>
    </div>
     
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
      showDeleteModal: false
    };
  },
  methods: {
    ...mapActions('todos', ['removeTodo', 'editTodo', 'toggleTodo', 'addTodo']),
    startEdit() {
      this.editing = true;
    },
    saveEdit() {
      if (this.task.text.trim() !== '') {
        this.editTodo(this.task);
        this.editing = false;
      }
    },
    cancelEdit() {
      this.editing = false;
    },
    handleTodoComplete() {
      this.toggleTodo(this.task.id);
    },
    showModal() {
      this.showDeleteModal = true;
    },
    handleRemoveTodo() {
      this.removeTodo(this.task.id);
      this.showDeleteModal = false;
    },
    unShowModal() {
      this.showDeleteModal = false;
    },
    formatDueDate(date: Date | null): string {
      if (date) {
        return dayjs(date).format('ddd DD MMM YYYY');
      }
      return '';
    },
    isOverdue(): boolean {
      if (this.task.dueDate && !this.task.isCompleted) {
        const today = dayjs();
        const dueDate = dayjs(this.task.dueDate);
        return dueDate.isBefore(today, 'day');
      }
      return false;
    },
    multiplyTodo() {
      const duplicatedTodo = {
        ...this.task,
        text: this.task.text,
        id: Date.now(),
      };

      this.addTodo(duplicatedTodo);
    },
  },
  computed: {
    ...mapState('todos', ['tasks']),
  },
});
</script>