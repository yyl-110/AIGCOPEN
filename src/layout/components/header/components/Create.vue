<template>
  <n-popselect
    v-model="value"
    :options="options"
    size="medium"
    scrollable
    trigger="click"
    class="b-rd-10 bg-#fff"
  >
    <n-button
      round
      :size="!largerThanSm ? 'medium' : 'large'"
      style="background-color: rgba(67, 66, 66, 0.4)"
      class="btnCreate mr-10"
    >
      <template #icon>
        <TheIcon icon="roundAdd" type="custom" />
      </template>
      创建
    </n-button>
  </n-popselect>
</template>

<script setup>
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'

const breakpoints = useBreakpoints(breakpointsTailwind)
const largerThanSm = breakpoints.greater('sm') // only larger than sm
const value = ref(1)
const options = [
  {
    label: 'Prompt提词板',
    value: 1,
  },
  {
    label: 'Prompt格式化模板',
    value: 2,
  },
]
</script>
<style lang="scss">
.n-base-select-option {
  color: #434242 !important;
}
.n-base-select-menu .n-base-select-option:hover {
  &::before {
    background-color: #efefef;
  }
}
</style>

<style lang="scss" scoped>
.btnCreate {
  &:hover {
    background-color: rgba(67, 66, 66, 0.4) !important;
    color: #fff;
  }

  &:focus {
    background-color: rgba(67, 66, 66, 0.4) !important;
    color: #fff;
  }
}
</style>
