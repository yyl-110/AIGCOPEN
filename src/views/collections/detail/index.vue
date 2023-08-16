<template>
  <AppPage>
    <div class="h-full px-39 pt-37 lt-sm:px-10 lt-sm:pt-10">
      <div class="h-full w-full flex lt-sm:flex-wrap">
        <div class="h-95% flex-1 overflow-y-auto b-rd-10 bg-#25262B66 lt-sm:h-auto">
          <promptDetail />
        </div>
        <div
          class="ml-30 h-95% w-30% overflow-y-auto b-rd-10 bg-#2C2E3330 lt-sm:ml-10 lt-sm:h-auto lt-sm:w-100%"
        >
          <Special />
        </div>
      </div>
    </div>
  </AppPage>
</template>

<script setup>
import promptDetail from '../components/promptDetail.vue'
import Special from '../components/special.vue'
</script>

<style lang="scss" scoped></style>
