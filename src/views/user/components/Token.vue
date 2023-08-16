<template>
  <div class="box mt-23 w-full b-rd-10 bg-#25262B99 pb-10 pl-23 pt-15 text-#fff lt-sm:p-8">
    <h2 class="text-19 font-700 lt-sm:text-14">当前token余额</h2>
    <p class="num text-32 font-700 lt-sm:mt-5 lt-sm:text-18">30.8</p>
  </div>
  <div class="task mt-22 w-full lt-sm:mt-10">
    <div class="title flex items-center text-#fff">
      <TheIcon icon="taskIcon" type="custom" class="mr-10 text-22 lt-sm:mr-5" />
      <span text-22 font-700>任务</span>
    </div>
    <div
      class="box mt-16 w-full flex justify-between b-rd-10 bg-#25262BCC px-27 py-20 lt-sm:mt-8 lt-sm:items-center lt-sm:px5 lt-sm:py-5"
    >
      <div class="left flex items-center justify-start">
        <img src="@/assets/images/avatar.png" h69 w69 lt-sm:h40 lt-sm:w40 alt="" class="avatar" />
        <div class="ml-12 h-full flex flex-col justify-center text-#fff lt-sm:ml-4">
          <p text-20 font-700 line-height-28 lt-sm:text-14>每日任务</p>
          <p w-full text-15 lt-sm:text-12 class="ellipsis1">每天登录即可获得50个免费token！</p>
        </div>
      </div>
      <n-button
        type="info"
        :size="largerThanSm ? 'large' : 'medium'"
        class="btn w-115 b-rd-8 text-#fff lt-sm:w-70 hover:text-#fff"
      >
        认领
      </n-button>
    </div>
  </div>
  <div class="record mt-22 w-full pb-30 lt-sm:mt-10">
    <div class="title flex items-center pb-20 text-#fff lt-sm:pb-10">
      <TheIcon icon="time" type="custom" class="mr-10 text-22 lt-sm:mr-5" />
      <span text-22 font-700>token记录</span>
    </div>
    <div
      class="recordItem mt-12 flex justify-between b-rd-10 bg-#1A1B1ECC px-14 px-32 py-15 py-8 text-16 font-bold line-height-23 text-#fff lt-sm:mt-5 lt-sm:px-14 lt-sm:py-8 lt-sm:text-12"
    >
      <span>+50.00</span>
      <span class="ellipsis1 w-50% text-center">Daily Login award</span>
      <span>08/10/2023</span>
    </div>
  </div>
</template>

<script setup>
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'

const breakpoints = useBreakpoints(breakpointsTailwind)
const largerThanSm = breakpoints.greater('sm') // only larger than sm
</script>

<style lang="scss" scoped>
.btn {
  &:hover {
    color: #fff;
  }
  &:focus {
    color: #fff;
    background-color: rgba(197, 25, 31, 1);
  }
}
</style>
