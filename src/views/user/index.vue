<template>
  <AppPage>
    <div h-full overflow-x-hidden>
      <div
        class="h-90% w-full flex flex-items-start overflow-hidden px-50 pt-40 lt-sm:h-full lt-sm:flex-wrap lt-sm:overflow-y-auto lt-sm:px-10 lt-sm:pt-12"
      >
        <div
          class="h-full min-w-280 w-30% b-rd-10 bg-#2C2E33 px-17 pb-20 pt-20 lt-sm:h-auto lt-sm:h-auto lt-sm:w-100%"
        >
          <info />
        </div>
        <div
          class="ml-25 h-full flex-1 b-rd-10 bg-#25262B66 lt-sm:ml-8 lt-sm:mt-10 lt-sm:h-auto lt-sm:min-h-500"
        >
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
