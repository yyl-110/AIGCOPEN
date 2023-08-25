<template>
  <div class="empty flex flex-col flex-items-center pt-19">
    <img src="@/assets/images/empty.png" alt="" class="h187 w250" />
    <p class="mt- text-16 text-#fff lt-sm:text-12">{{ text }}</p>
    <div
      v-if="showBtn"
      class="btn mt-10 h40 w180 flex cursor-pointer flex-justify-center flex-items-center b-rd-10 bg-#C5191F text-#fff"
    >
      <icon-custom-create class="mr-9 lt-sm:mr-4"></icon-custom-create>

      <span class="text-16 lt-sm:text-12">创建 Prompt</span>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  showBtn: { type: Boolean, default: true },
  text: { type: String, default: '您已经看到了所有内容，没有找到提示，请自己创建一个！' },
})
</script>

<style lang="scss" scoped></style>
