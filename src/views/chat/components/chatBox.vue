<template>
  <div w-full class="h-full flex flex-col px-22 pb-26">
    <div class="chat flex-1 overflow-y-auto">2424</div>
    <n-input
      placeholder="在这里输入你的问题"
      size="large"
      class="h-45 flex-shrink-0 b-rd-10 bg-#000000 text-#47484D"
    >
      <template #suffix>
        <n-button quaternary>
          <icon-custom-send size="16"></icon-custom-send>
        </n-button>
      </template>
    </n-input>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped></style>
