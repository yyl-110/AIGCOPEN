<template>
  <div wh-full>
    <div
      class="h-75 flex items-center pl-32 text-24 font-700 text-#fff lt-sm:h-50 lt-sm:pl-12 lt-sm:text-16"
      style="border-bottom: 1px solid #ffffff38"
    >
      {{ detail?.title }}
    </div>
    <div class="px-32 lt-sm:px-12">
      <div class="head mt-14 flex items-center lt-sm:mt-7">
        <img src="@/assets/images/avatar.png" class="h48 w48 flex-shrink-0" alt="" />
        <div class="info ml-9 mt-2 text-#fff">
          <p class="text-16 font-500 lt-sm:text-14">Mulinmu</p>
          <p class="text-14 lt-sm:text-12">0 粉丝&emsp;0 我的关注</p>
        </div>
      </div>
      <div
        class="desc mt-16 min-h-96 w-full flex flex-wrap items-center justify-start b-rd-10 bg-#FFFFFF14 pl-24 text-15 line-height-21 text-#fff lt-sm:mt-8 lt-sm:pl-12 lt-sm:text-13"
      >
        <p class="ellipsis2 w-full">
          {{ detail?.description }}
        </p>
      </div>
      <div class="tags mt-6 w-full flex flex-wrap">
        <div
          v-for="item in 12"
          class="mr-12 mt-14 w-auto flex flex-nowrap items-center justify-center b-rd-8 bg-#9B9B9B33 px-25 py-9 text-15 lt-sm:mr-6 lt-sm:px-12 lt-sm:py-4 lt-sm:text-14"
        >
          有创意的{{ item }}
        </div>
      </div>
      <div
        class="list mt-21 w-full b-rd-10 bg-#FFFFFF14 px-30 py-30 lt-sm:mt-10 lt-sm:px-10 lt-sm:py-10"
      >
        <div v-for="item in detail?.Prompt" :key="item.id" class="mb-20 lt-sm:mb-10">
          <promptCard :data="item" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import promptCard from './promptCard.vue'
const props = defineProps({
  detail: {
    type: Object,
    default: () => {},
  },
})
</script>
