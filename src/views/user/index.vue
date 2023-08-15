<template>
  <AppPage>
    <div h-full overflow-x-hidden>
      <div
        class="wh-full flex flex-items-start px-50 pt-40 lt-sm:flex-wrap lt-sm:px-20 lt-sm:pt-12"
      >
        <div
          class="min-h-500 min-w-280 w-30% b-rd-10 bg-#2C2E33 px-17 pb-20 pt-20 lt-sm:h-auto lt-sm:min-h-auto lt-sm:w-100%"
        >
          <info />
        </div>
        <div class="ml-25 min-h-500 flex-1 b-rd-10 bg-#25262B66 lt-sm:ml-8 lt-sm:mt-10">
          <Tabs />
        </div>
      </div>
    </div>
  </AppPage>
</template>

<script setup>
import info from './components/info.vue'
import Tabs from './components/tabs.vue'
</script>

<style scoped>
.item {
  position: relative;

  &:not(:first-child) {
    &::before {
      content: '';
      background: #fff;
      position: absolute;
      width: 1px;
      height: 34px;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
    }
  }
}
</style>
