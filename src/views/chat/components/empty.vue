<template>
  <div w-full flex flex-col items-center pt-29>
    <img src="@/assets/images/noprompts.png" class="h-118 w-150" alt="" />
    <p
      v-if="type === 0 || type === 1"
      class="mt-26 text-center text-16 font-700 text-#fff lt-sm:mt-13 lt-sm:text-13"
    >
      还没有聊天。开始对话
    </p>
    <p v-else class="mt-26 text-center text-16 font-700 text-#fff lt-sm:mt-13 lt-sm:text-13">
      您尚未保存任何提示，单击下面的按钮 以浏览新提示
    </p>
    <div
      v-if="type === 2"
      class="btn mt-17 h50 w230 flex cursor-pointer flex-justify-center flex-items-center b-rd-10 bg-#C5191F text-#fff"
    >
      <icon-custom-save size="16" class="mr-9 lt-sm:mr-4"></icon-custom-save>

      <span class="text-16 lt-sm:text-12">保存 Prompt</span>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  type: {
    type: Number,
    default: 2,
  },
})
</script>

<style lang="scss" scoped></style>
