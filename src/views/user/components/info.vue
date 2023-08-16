<template>
  <div class="header relative h90 w-full flex items-center pl-18">
    <img src="@/assets/images/avatar.png" h62 w62 alt="" class="avatar" />
    <div class="right ml-10">
      <p class="name text-20 font-700 text-#fff">Mulinmu</p>
      <p class="info mt-5 text-12 text-#fff">北京 加入时间 2023/08</p>
    </div>
    <div
      class="edit absolute right-5 top-5 cursor-pointer b-rd-20 bg-#1A1B1E px-9 py-4 text-13 text-#fff"
      @click="$router.push('/user/info')"
    >
      修改
    </div>
  </div>
  <div class="h-54 w-full flex b-rd-b-10 bg-#6A6D7469">
    <div
      v-for="item in list"
      class="item flex flex-col flex-1 cursor-pointer items-center text-#fff"
    >
      <p class="text-20 font-800">{{ item.num }}</p>
      <span class="text-12 font-500">{{ item.title }}</span>
    </div>
  </div>
  <div
    class="mt-12 h-50 w-full b-rd-6 text-center text-14 line-height-44 text-#fff"
    style="background-color: rgba(26, 27, 30, 0.5)"
  >
    努力就会很幸运，做自己
  </div>
  <div class="rows w-full">
    <div
      v-for="item in rowList"
      class="col mt-10 h-44 w-full flex cursor-pointer items-center justify-between pl-15"
      style="border-bottom: 1px solid #404040"
    >
      <div class="flex items-center">
        <TheIcon :icon="item.icon" type="custom" />
        <span class="ml-10 text-16 text-#fff">{{ item.title }}</span>
      </div>
      <TheIcon icon="arrow" type="custom" />
    </div>
  </div>
  <div class="tagList mt-5 w-full flex flex-wrap lt-sm:max-h-100 lt-sm:overflow-y-auto">
    <div
      v-for="(item, index) in tagList"
      :key="index"
      class="item m-5 flex cursor-pointer items-center justify-center b-rd-8 bg-#000000 px-8 py-2 text-#fff"
    >
      <TheIcon icon="current" type="custom" class="mr-5" />
      {{ item }}
    </div>
  </div>
</template>

<script setup>
const list = ref([
  { num: 0, title: 'Prompts' },
  { num: 0, title: '我的关注' },
  { num: 0, title: '粉丝' },
])
const rowList = ref([
  { icon: 'link', title: '个人链接', link: true },
  { icon: 'xq', title: '兴趣标签' },
])
const tagList = ref([
  'stableDiffusion',
  '生产力',
  '头脑',
  '娱乐',
  '生产力',
  '头脑',
  'stableDiffusion',
  'stableDiffusion',
  '娱乐',
  '头脑',
  '娱乐',
  '生产力',
  '生产力',
])
</script>

<style lang="scss" scoped></style>
