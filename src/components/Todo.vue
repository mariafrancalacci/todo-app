<template>
  <div class="w-full border bg-gray-500 border-gray-400 flex items-center justify-between gap-3 p-4 rounded-lg border-solid">
      <button
        class="w-[1.125rem] h-[1.125rem] border-none bg-none"
      >
      <Icon icon="mdi:checkbox-blank-circle-outline" color="#4ea8de" />
      </button>

      <p class="text-sm leading-[1.18rem] text-gray-100 mr-auto">
        Task
      </p>

      <button class="text-gray-300 border-none">
        <Icon icon="material-symbols:edit-outline" color="gray" />
      </button>
      <button class="text-gray-300 border-none">
        <Icon icon="octicon:trash-24" color="gray" />   
      </button>
     
  </div>
</template>

<script setup lang="ts">
 import { Icon } from '@iconify/vue2';
</script>


