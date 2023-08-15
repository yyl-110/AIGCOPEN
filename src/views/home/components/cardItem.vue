<template>
  <div class="card relative h-auto w-full cursor-pointer overflow-hidden b-rd-10 bg-[#25262B]">
    <div class="imgWrap relative w-full overflow-hidden pb-100%">
      <img
        src="https://image.aigcopen.com/48361f42c8967b677957ab2544a0f084.png"
        class="absolute left-0 top-0 h-full w-full"
        alt=""
      />
    </div>
    <div class="flex flex-col px-9 pb-8">
      <div class="ellipsis1 mt-10 pl-6 text-22 text-#fff lt-sm:mt-5 lt-sm:pl-3 lt-sm:text-14">
        LAN最好的老师GPT
      </div>
      <div
        class="desc ellipsis3 mt-9 w-full pl-6 text-14 text-#CFCFCF lt-sm:mt-4 lt-sm:pl-3 lt-sm:text-12"
      >
        LAN GPT -为学生简化复杂的概念 你是否难以理解复杂的概念？无论你是大学生、职场人士还是对学
      </div>
      <div class="option mt-20 flex flex-justify-between lt-sm:mt-10">
        <div v-for="item in iconList" class="item flex flex-items-center text-12 text-[#9B9B9B]">
          <TheIcon :icon="item" type="custom" class="mr-4 lt-sm:mr-2" />
          10
        </div>
      </div>
    </div>
    <div
      class="tag absolute right-10 top-10 h-18 b-rd-4 bg-[#FF7C81] px-8 text-center text-12 lh-18 text-#fff"
    >
      业务发展
    </div>
  </div>
</template>

<script setup>
const iconList = ref(['fire', 'play', 'love', ''])
</script>

<style lang="scss" scoped>
.card {
  transition: all 0.3s;
  &:hover {
    background-color: rgb(82 82 91);
  }
}
</style>
