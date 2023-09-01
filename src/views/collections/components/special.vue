<template>
  <div w-full class="px-27 py-25 text-#fff lt-sm:p-10">
    <h2 class="text-22 font-700 lt-sm:text-16">特色集合</h2>
    <div
      v-for="item in specialDetail"
      :key="item.id"
      class="jh mt-19 h-96 w-full flex overflow-hidden b-rd-10 bg-#FFFFFF14 pr-7 lt-sm:mt-10 lt-sm:h-76"
    >
      <img :src="getUrl(item?.thumbnailUrl)" alt="" class="h-full w-82 flex-shrink-0 lt-sm:w-62" />
      <div class="ml-15 flex flex-col flex-1 justify-center overflow-hidden lt-sm:ml-7">
        <p class="ellipsis1 text-18 font-700 lt-sm:text-14">{{ item.title }}</p>
        <p class="ellipsis2 mt-5 text-13 line-height-18 text-#FFFFFFCC">
          {{ item.description }}
        </p>
      </div>
    </div>
  </div>
  <div w-full class="px-27 py-25 text-#fff lt-sm:p-10">
    <h2 class="mb-20 text-22 font-700 lt-sm:mb-10 lt-sm:text-16">类似 Prompts</h2>
    <div v-for="item in likePrompt" :key="item.id" class="mb-18 lt-sm:mb-9">
      <PromptCard :data="item" />
    </div>
  </div>
</template>

<script setup>
import { getUrl } from '~/src/utils'
import PromptCard from './promptCard.vue'

const props = defineProps({
  specialDetail: {
    type: Array,
    default: () => [],
  },
  likePrompt: {
    type: Array,
    default: () => [],
  },
})
</script>

<style lang="scss" scoped></style>
