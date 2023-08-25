<template>
  <div wh-full class="discussionsBox flex flex-col">
    <div
      class="h-72 w-full flex items-center justify-between bg-#1A1B1EB2 px-13 lt-sm:h-50 lt-sm:px-5"
      style="border-radius: 10px 10px 0 0"
    >
      <div
        class="h-42 w-142 flex flex-shrink-0 flex-nowrap cursor-pointer items-center justify-center b-rd-10 bg-#1B1B1B text-15 text-#fff lt-sm:h-38 lt-sm:w-110 lt-sm:text-12"
        @click="$router.push('/discussions/create')"
      >
        <TheIcon icon="addFull" type="custom" size="15" class="mr-6 lt-sm:mr-3" />
        创建新的讨论
      </div>
      <div class="flex items-center filter">
        <n-button
          type="primary"
          class="btn mr-15 b-rd-10 text-#fff lt-sm:mr-5 hover:text-#000"
          :size="largerThanSm ? 'large' : 'medium'"
          :class="selectIndex === 0 ? 'active' : ''"
          @click="selectIndex = 0"
        >
          最新
        </n-button>
        <n-button
          type="primary"
          class="btn mr-15 b-rd-10 text-#fff lt-sm:mr-5 hover:text-#000"
          :size="largerThanSm ? 'large' : 'medium'"
          :class="selectIndex === 1 ? 'active' : ''"
          @click="selectIndex = 1"
        >
          热门
        </n-button>
        <n-select
          v-model:value="selectVal"
          :size="largerThanSm ? 'large' : 'medium'"
          :options="options"
          class="w-102 flex-shrink-0 b-rd-10 bg-#1B1B1B lt-sm:w-80"
        />
      </div>
    </div>
    <div class="list w-full flex-1 overflow-y-auto pl-13 pr-27 lt-sm:px-6">
      <div class="mt-18 h-83 w-full flex items-center gap-7 lt-sm:mt-9">
        <div class="h-full flex-1 overflow-hidden b-rd-10 bg-#1B1B1B80">
          <div
            class="h-39 w-full bg-#1B1B1B px-23 text-15 font-700 line-height-39 text-#fff lt-sm:px-8 lt-sm:text-13"
          >
            AIGC开放社区
          </div>
          <div
            class="h-44 w-full flex items-center justify-between px-26 text-12 text-#fff lt-sm:px-8"
          >
            <div class="flex items-center">
              <img
                src="@/assets/images/avatar.png"
                class="h-22 w-22 flex-shrink-0 b-rd-50%"
                alt=""
              />
              <span ml-9 text-12 class="lt-sm:ml-4">Wangyufeng</span>
            </div>
            <div class="cursor-pointer">in衣服</div>
            <div>0 回复</div>
            <div>2月前</div>
          </div>
        </div>
        <div
          class="pointActive h-full w-69 flex flex-col flex-shrink-0 cursor-pointer items-center justify-center b-rd-10 bg-#1B1B1B lt-sm:w-52"
        >
          <TheIcon icon="point" type="custom" size="24" class="mr-6 lt-sm:mr-3" />
          <span class="mt-8 text-13 font-700 line-height-18 text-#fff">2</span>
        </div>
      </div>
      <p class="hint mt-50 text-center text-16 lt-sm:mt-25">已展示所有讨论主题</p>
    </div>
  </div>
</template>

<script setup name="discussionsBox">
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'

const breakpoints = useBreakpoints(breakpointsTailwind)
const largerThanSm = breakpoints.greater('sm') // only larger than sm
const options = ref([
  {
    label: '所以',
    value: 0,
  },
  {
    label: '天',
    value: 1,
  },
  {
    label: '周',
    value: 2,
  },
  {
    label: '月',
    value: 3,
  },
  {
    label: '年',
    value: 4,
  },
])
const selectVal = ref(1)
const selectIndex = ref(0)
</script>

<style lang="scss" scoped>
.btn {
  &.active {
    background-color: #fff !important;
    color: #000 !important;
  }

  &:hover {
    background-color: #fff;
  }

  &:focus {
    background-color: auto;
    color: auto !important;
  }
}

:deep(.n-base-selection-label) {
  background-color: #1b1b1b;
  color: #fff;
  border-radius: 10px;
  color: #fff;
}

.pointActive {
  background-color: #c5191f;
}
</style>
