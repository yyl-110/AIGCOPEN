<template>
  <div h-full w-full flex flex-col>
    <div
      class="tabs w-full flex flex-shrink-0 pb-20 pl-30 pt-30 lt-sm:pb-5 lt-sm:pl-8 lt-sm:pt-8"
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
    <div class="list w-full flex-1 overflow-y-auto">
      <!-- Prompts list -->
      <div v-if="tabIndex !== 3" class="list h-full w-full flex overflow-y-auto px-30 lt-sm:px-10">
        <n-grid cols="1 s:1 m:2 l:2 xl:2 2xl:2" :x-gap="16" :y-gap="12" responsive="screen" mt-25>
          <n-grid-item v-for="item in 15">
            <promptItem />
          </n-grid-item>
        </n-grid>
      </div>
      <!-- 获得token -->
      <div v-else class="h-full w-full overflow-y-auto px-30 lt-sm:px-10">
        <Token :task="task" :user-credit-num="userCreditNum" />
      </div>
      <Empty v-if="false" />
    </div>
  </div>
</template>

<script setup>
import Empty from '@/components/common/empty.vue'
import promptItem from './promptItem.vue'
import Token from './Token.vue'
const tabIndex = ref(0)
const tabs = ref(['我的提示词(Prompts)', '已收藏 Prompts', '点赞 Prompts', '获得token'])
const props = defineProps({
  task: {
    type: Object,
    default: () => {},
  },
  userCreditNum: {
    type: String,
    default: '',
  },
})
</script>

<style lang="scss" scoped>
.tabItem {
  &.active {
    background-color: #c5191f;
    color: #fff;
  }
}
</style>
