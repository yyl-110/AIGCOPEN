<template>
  <AppProvider>
    <router-view v-slot="{ Component }">
      <component :is="Component" />
    </router-view>
  </AppProvider>
</template>

<script setup>
import AppProvider from '@/components/common/AppProvider.vue'
import { useAppStore } from './store'

onMounted(() => {
  useAppStore().setDark(true)
})
</script>
