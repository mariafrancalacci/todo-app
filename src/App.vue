<template>
  <div id="app">
    <Header />
    <TodoList />
  </div>
</template>

<script setup lang="ts">
import './assets/styles/tailwind.css';
import Header from "./components/Header.vue";
import TodoList from "./components/TodoList.vue";
</script>

