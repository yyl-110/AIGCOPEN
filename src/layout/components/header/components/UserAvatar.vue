<template>
  <n-dropdown
    :options="options"
    size="medium"
    class="b-rd-10 bg-#fff color-#434242"
    trigger="click"
    @select="handleSelect"
  >
    <div flex cursor-pointer items-center>
      <img :src="userStore.avatar" mr10 h-35 w-35 rounded-full />
      <span>{{ userStore.name }}</span>
    </div>
  </n-dropdown>
</template>

<script setup>
import { useUserStore } from '@/store'
import { renderCustomIcon, renderIcon } from '@/utils'

const userStore = useUserStore()

const options = [
  {
    label: '简介',
    key: 'introduction',
    icon: renderCustomIcon('jj', { size: '14px' }),
  },
  {
    label: '建议反馈',
    key: 'feedback',
    icon: renderCustomIcon('feedback', { size: '14px' }),
  },
  {
    label: '退出',
    key: 'logout',
    icon: renderCustomIcon('exit', { size: '14px' }),
  },
]

function handleSelect(key) {
  if (key === 'logout') {
    $dialog.confirm({
      title: '提示',
      type: 'info',
      content: '确认退出？',
      confirm() {
        userStore.logout()
        $message.success('已退出登录')
      },
    })
  }
}
</script>

<style lang="scss">
.n-dropdown-option-body__label {
  color: #434242;
}
</style>
