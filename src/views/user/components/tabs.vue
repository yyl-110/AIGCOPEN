<template>
  <div w-full>
    <div
      class="tabs w-full flex pb-20 pl-30 pt-30 lt-sm:pb-5 lt-sm:pl-8 lt-sm:pt-8"
      style="border-bottom: 1px solid #ffffff38"
    >
      <div
        v-for="(item, index) in tabs"
        class="tabItem h-38 w-180 flex cursor-pointer items-center justify-center b-rd-6 text-center text-16 font-700 text-#FFFFFFB2 lt-sm:w-80 lt-sm:text-12"
        :class="tabIndex === index ? 'active' : ''"
        @click="tabIndex = index"
      >
        {{ item }}
      </div>
    </div>
    <div class="list w-full">
      <Empty />
    </div>
  </div>
</template>

<script setup>
import Empty from '@/components/common/empty.vue'
const tabIndex = ref(0)
const tabs = ref(['我的提示词(Prompts)', '已收藏 Prompts', '点赞 Prompts', '获得token'])
</script>

<style lang="scss" scoped>
.tabItem {
  &.active {
    background-color: #c5191f;
    color: #fff;
  }
}
</style>
