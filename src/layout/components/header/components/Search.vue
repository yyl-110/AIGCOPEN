<template>
  <div class="h-full w-480 lt-sm:w-140">
    <n-input placeholder="搜索" v-model:value="searchVal" :size="largerThanSm ? 'large' : 'medium'"
      class="b-rd-10 text-#47484D" @keydown.enter="search">
      <template #prefix>
        <TheIcon icon="search" type="custom" class="w-30 text-#6D6D6D!important" />
      </template>
    </n-input>
  </div>
</template>

<script setup>
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'
import { useRouter } from 'vue-router';

const router = useRouter()

const breakpoints = useBreakpoints(breakpointsTailwind)
const largerThanSm = breakpoints.greater('sm') // only larger than sm
const searchVal = ref('')
const search = () => {
  router.push({
    path: '/',
    query: { q: searchVal.value }
  })
}
</script>

<style lang="scss" scoped></style>
