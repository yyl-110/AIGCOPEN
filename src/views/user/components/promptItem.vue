<template>
  <div
    class="item relative h-122 w-full flex flex-col cursor-pointer b-rd-10 bg-#D3D3D342 px-11 pt-15 hover:bg-#FFFFFF26"
  >
    <div
      class="w-full flex items-center pb-12"
      style="border-bottom: 1px solid rgba(255, 255, 255, 0.15)"
    >
      <div class="imgWrap relative h-60 w-60 flex-shrink-0 overflow-hidden b-rd-10">
        <img
          src="https://image.aigcopen.com/48361f42c8967b677957ab2544a0f084.png"
          class="wh-full"
        />
      </div>
      <div class="ml-12 flex flex-col">
        <div class="ellipsis1 text-15 font-500 text-#fff">LAN最好的老师GPT</div>
        <div class="ellipsis2 mt-2 w-full text-12 text-#CFCFCF">
          LAN GPT -
          为学生简化复杂的概念你是否难以理解复杂的概念？无论你是大学生的啊为学生简化复杂的概念你是否难以理解复杂的概念？无论你是大学生的啊
        </div>
      </div>
    </div>
    <div class="option flex flex-1 items-center justify-between">
      <div
        v-for="item in iconList"
        class="option-item h-full flex flex-items-center text-12 font-700 text-[#9B9B9B]"
      >
        <TheIcon :icon="item" type="custom" class="mr-4 lt-sm:mr-2" />
        10
      </div>
      <div class="name h-full flex items-center">
        <img
          src="https://image.aigcopen.com/4d97ede04cfd23dc5384c11a3740d5bc.png"
          class="h-18 w-18 flex-shrink-0 b-rd-50%"
          alt=""
        />
        <span class="ellipsis1 ml-4 w-40 text-12 font-700 text-#9B9B9B lt-sm:ml-2">Grablierrw</span>
      </div>
    </div>
    <div
      class="tag absolute right-12 top-7 h-16 b-rd-4 bg-[#FF7C81] px-8 text-center text-12 lh-16 text-#fff"
    >
      业务发展
    </div>
  </div>
</template>

<script setup>
const iconList = ref(['fire_o', 'play_o', 'love_o'])
</script>

<style lang="scss" scoped>
.option-item {
  &:not(:first-child) {
    margin-left: 11px;
  }
}
</style>
