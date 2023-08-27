<template>
    <div class="items-center h-[100vh] justify-center  pt-12 flex-col gap-4 text-gray-300 text-center bg-gray-600 mt-0">
        <section class="w-full max-w-[46rem]  mx-auto my-0 px-4 py-0">
            <header class="flex items-center justify-between mb-6">
                <div class="flex items-center gap-[0.8rem]">
                <p class="text-blue text-sm font-bold">Tasks</p>
                <span class="text-[color:var(--gray-200)] text-xs font-bold px-[9px] py-[3px] rounded-[999px] bg-gray-400">10</span>
                </div>

                <div class="flex items-center gap-[0.8rem]">
                    <p class="text-purple">Done</p>
                    <span> 
                        2 of 10
                    </span>
                </div>
            </header>

            <div class="flex flex-col gap-3">
                
                <Todo/>
                <Todo/>
                <Todo/>
            
            </div>
        </section>
    </div>
  </template>
  
<script setup lang="ts">
  import Todo from './Todo.vue';
  
</script>
  