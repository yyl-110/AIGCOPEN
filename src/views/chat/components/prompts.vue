<template>
  <div class="mt-17 h-full w-full flex flex-col px-20 lt-sm:mt-8 lt-sm:px-10">
    <div class="nav flex items-center justify-between px-20 lt-sm:px-10">
      <div
        v-for="(item, index) in navList"
        :key="index"
        :class="activeIndex === index ? 'active' : ''"
        class="flex cursor-pointer items-center justify-center b-rd-10 p-6 text-16 font-700 text-#fff hover:bg-#C5191F lt-sm:text-13"
        @click="activeIndex = index"
      >
        {{ item }}
      </div>
    </div>
    <div class="search mt-18 w-full lt-sm:mt-9">
      <n-input
        placeholder="搜索"
        :size="largerThanSm ? 'large' : 'medium'"
        class="input b-rd-10 bg-#FFFFFFA6 text-#47484D"
      >
        <template #prefix>
          <TheIcon icon="search" class="text-#6D6D6D" type="custom" size="18" />
        </template>
      </n-input>
    </div>
    <div class="flex-1 overflow-y-auto">
      <empty v-if="false" :type="activeIndex" />
      <!-- 我的对话 -->
      <div v-if="activeIndex === 0" class="chat">
        <div
          v-for="item in 30"
          class="mychart mb-7 h-48 w-full flex cursor-pointer items-center justify-between b-rd-6 bg-#D9D9D90F px-8 hover:bg-#FFFFFF61"
        >
          <p class="ellipsis1 w-80% text-16">
            从现在开始，你就是哈佛的一员从现在开始，你就是哈佛的一员
          </p>
          <TheIcon icon="del" size="18" type="custom" />
        </div>
      </div>
      <!-- prompts -->
      <div v-else class="pro">
        <div
          v-for="item in 10"
          class="myprompts mb-12 h-74 w-full flex cursor-pointer items-center justify-between b-rd-6 bg-#38353E px-10 lt-sm:h-50 hover:bg-#FFFFFF61 lt-sm:px-5"
        >
          <div class="w-88% flex items-center justify-start text-#fff">
            <img src="@/assets/images/pic.png" class="h-50 w-50 flex-shrink-0 b-rd-6" alt="" />
            <div ml-5 flex-1 overflow-hidden>
              <p class="ellipsis1 w-full text-14 font-700">
                自动为特定主体的内容自动为特定主体的内容
              </p>
              <p class="ellipsis1 mt-4 w-full text-12 line-height-17">
                自动配图的话，这里就是自动配图的话，这里就是示
              </p>
            </div>
          </div>
          <TheIcon icon="share" size="14" type="custom" class="self" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import empty from './empty.vue'
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'

const breakpoints = useBreakpoints(breakpointsTailwind)
const largerThanSm = breakpoints.greater('sm') // only larger than sm
const navList = ref(['我的对话', '我的Prompts', '已保存'])
const activeIndex = ref(1)
</script>

<style lang="scss" scoped>
.mychart {
  &:first-child {
    margin-top: 10px;
  }

  &:last-child {
    margin-bottom: 80px;
  }
}
.myprompts {
  &:first-child {
    margin-top: 10px;
  }

  &:last-child {
    margin-bottom: 80px;
  }
}

.self {
  align-self: flex-start;
  margin-top: 15px;
}
.active {
  background: #c5191f;
}
</style>
