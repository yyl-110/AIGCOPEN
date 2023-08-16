<template>
  <div w-full class="px-27 py-25 text-#fff lt-sm:p-10">
    <h2 class="text-22 font-700 lt-sm:text-16">特色集合</h2>
    <div
      v-for="item in 3"
      class="jh mt-19 h-96 w-full flex b-rd-10 bg-#FFFFFF14 pr-7 lt-sm:mt-10 lt-sm:h-76"
    >
      <img src="@/assets/images/item.png" alt="" class="h-full w-82 flex-shrink-0 lt-sm:w-62" />
      <div class="ml-15 flex flex-col flex-1 justify-center lt-sm:ml-7">
        <p class="text-18 font-700 lt-sm:text-14">超级可用性：营销模板</p>
        <p class="ellipsis2 mt-5 text-13 line-height-18 text-#FFFFFFCC">
          发掘超级可用性营销模板的潜力！我们收集了广泛的精心制作模板，旨...
        </p>
      </div>
    </div>
  </div>
  <div w-full class="px-27 py-25 text-#fff lt-sm:p-10">
    <h2 class="mb-20 text-22 font-700 lt-sm:mb-10 lt-sm:text-16">类似 Prompts</h2>
    <div v-for="item in 3" class="mb-18 lt-sm:mb-9">
      <PromptCard />
    </div>
  </div>
</template>

<script setup>
import PromptCard from './promptCard.vue'
</script>

<style lang="scss" scoped></style>
