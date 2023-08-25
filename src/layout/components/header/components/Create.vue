<template>
  <n-dropdown
    :options="options"
    size="medium"
    class="b-rd-10 bg-#fff color-#434242"
    trigger="click"
    @select="handleSelect"
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
  </n-dropdown>
</template>

<script setup>
import { watch } from 'vue'
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'
import { useRouter } from 'vue-router'

const router = useRouter()

const breakpoints = useBreakpoints(breakpointsTailwind)
const largerThanSm = breakpoints.greater('sm') // only larger than sm
const value = ref(-1)
const options = [
  {
    label: 'Prompt提词板',
    key: 1,
  },
  {
    label: 'Prompt格式化模板',
    key: 2,
  },
]
const handleSelect = (val) => {
  if (val === 1) {
    router.push('/create')
  }
  if (val === 2) {
    router.push('/create/template')
  }
}
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
