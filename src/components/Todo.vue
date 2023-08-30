<template>
  <div
    class="w-full border bg-gray-500 border-gray-400 flex md:items-center md:justify-between gap-3 p-[1rem] rounded-lg border-solid">

    <button data-testid="complete-todo-button" :data-checked="task.isCompleted"
      class="w-[1.125rem] h-[1.125rem] border-none bg-none" @click="handleTodoComplete">
      <Icon :icon="task.isCompleted ? 'mdi:check-circle' : 'mdi:checkbox-blank-circle-outline'"
        :color="task.isCompleted ? '#5e60ce' : '#4ea8de'" />
    </button>

    <template v-if="editing" class="flex p-[0.5rem]">
      <div class="flex flex-col gap-2 md:flex-row">
        <div class="flex justify-between gap-2 md:gap-[0.5rem]">
          <input type="text" v-model="task.text" data-testid="edit-todo-title"
            :class="[isTitleEmpty ? 'border-solid border md:w-[400px] border-red-800 w-[250px] text-gray-100 text-base px-4 py-0 rounded-lg bg-gray-500' : ' placeholder-gray-300 border border-gray-600 w-[250px] md:w-[400px] text-gray-100 text-base pl-1 pr-4 md:px-4 py-0 rounded-lg bg-gray-500']" />

          <input v-if="editing" type="date" v-model="task.dueDate" data-testid="edit-todo-date"
            class="text-gray-300  text-sm border py-[0.1rem] md:py-1 md:pl-1 rounded-lg border-solid border-gray-700 bg-gray-500 w-[25px] md:w-[130px] pr-1" />
        </div>

        <div class="pl-0 flex gap-2 flex justify-end">
          <button data-testid="edit-todo-confirm-button"
            class="text-sm  border-green-700 rounded-lg border py-1 px-1 border-solid " @click="saveEdit">
            Save
          </button>

          <button class="text-sm rounded-lg border py-1 px-1 border-solid border-red-700"
            @click="cancelEdit">Cancel</button>
        </div>
      </div>
    </template>
    <template v-else>
      <p data-testid="todo-element" :class="[task.isCompleted ? 'text-gray-300 line-through text-sm ml-0 leading-[1.18rem] mr-auto' : 'text-sm leading-[1.18rem] text-gray-100 mr-auto',
      isOverdue() && !task.isCompleted ? 'text-red-500' : '']">
        {{ task.text }}
      </p>
    </template>


    <template v-if="!editing">
      <div class="flex items-center gap-1 md:min-w-[170px]">
        <Icon icon="ph:clock-light" color="#808080" width="19" height="19" />
        <span>{{ formatDueDate(task.dueDate) }}</span>
      </div>
      <button data-testid="edit-todo-button" class="text-gray-300 border-none" @click="startEdit">
        <Icon icon="material-symbols:edit-outline" color="#808080" />
      </button>
      <button data-testid="delete-todo-prompt-button" @click="showModal()" class="text-gray-300 border-none">
        <Icon icon="octicon:trash-24" color="#808080" />
      </button>
      <button data-testid="duplicate-todo-button" @click="multiplyTodo" class="text-gray-300 border-none">
        <Icon icon="ion:duplicate-outline" color="#808080" />
      </button>
    </template>


    <template>
      <transition>
        <div data-testid="delete-todo-modal" v-if="showDeleteModal"
          class="fixed inset-0 flex items-center justify-center z-50">
          <div class="fixed inset-0 backdrop-blur-md"></div>
          <div class="bg-gray-500 rounded-lg p-4 relative">
            <p>Are you sure you want to delete this task?</p>
            <div class="flex justify-end mt-4">
              <button data-testid="delete-todo-cancel-button" @click="unShowModal"
                class="text-blue-dark mr-2">Cancel</button>
              <button data-testid="delete-todo-confirm-button" @click="handleRemoveTodo"
                class="text-red-500 ">Delete</button>
            </div>
          </div>
        </div>
      </transition>
    </template>

  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Icon } from '@iconify/vue2';
import dayjs from 'dayjs';
import { mapActions, mapState } from 'vuex';
import { uuid } from 'vue-uuid'
import { Task } from '@/store/modules/todos';

export default Vue.extend({
  props: ['task'],
  data() {
    return {
      editing: false,
      showDeleteModal: false,
      originalTask: null as Task | null,
      isTitleEmpty: false,
    };
  },
  methods: {
    ...mapActions('todos', ['removeTodo', 'editTodo', 'toggleTodo', 'addTodo']),
    startEdit() {
      this.editing = true;
      this.originalTask = { ...this.task };
    },

    saveEdit() {
      if (this.task.text.trim() !== '') {
        this.editTodo(this.task);
        this.editing = false;
        this.isTitleEmpty = false;
      } else {
        this.isTitleEmpty = true;
        console.log(this.isTitleEmpty)
      }
    },

    cancelEdit() {
      if (this.originalTask) {
        this.task.text = this.originalTask.text;
        this.task.dueDate = this.originalTask.dueDate;
        this.originalTask = null;
        this.isTitleEmpty = false;
      }
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
        id: uuid.v4(),
      };

      this.addTodo(duplicatedTodo);
    },
  },
  computed: {
    ...mapState('todos', ['tasks']),
  },
});
</script>