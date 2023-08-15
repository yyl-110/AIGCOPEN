<template>
  <div class="h-full w-480 lt-sm:w-140">
    <n-input
      placeholder="搜索"
      :size="largerThanSm ? 'large' : 'medium'"
      class="b-rd-10 text-#47484D"
    >
      <template #prefix>
        <TheIcon icon="search" type="custom" class="w-30 text-#6D6D6D!important" />
      </template>
    </n-input>
  </div>
</template>

<script setup>
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'

const breakpoints = useBreakpoints(breakpointsTailwind)
const largerThanSm = breakpoints.greater('sm') // only larger than sm
</script>

<style lang="scss" scoped></style>
