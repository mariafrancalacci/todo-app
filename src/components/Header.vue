<template>
   <header class="bg-gray-700 flex items-center justify-center h-[12.5rem] relative">
    <h1 class=" text-gray-200">TODO LIST</h1>
      <form class="absolute h-[3.375rem] bottom-[calc(-3.375rem_/_2)] w-full max-w-[46rem] flex gap-2 px-4 py-0">
        <input
          placeholder="Add a new task"
          type="text"
          class="h-full flex-1 placeholder-gray-300 text-gray-100 border text-base px-4 py-0 rounded-lg border-solid border-gray-700 bg-gray-500"
        />
        
        <button class="h-full text-gray-100 flex items-center gap-1.5 font-bold text-sm px-4 py-0 rounded-lg border-[none] bg-blue-dark">
          Create
        </button>
      </form>
   </header>
</template>

<script setup lang="ts">

</script>