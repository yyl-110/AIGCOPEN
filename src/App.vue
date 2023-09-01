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
document.cookie =
  'PHPSESSID=9688e40033e5332523789770d8a89a4a; thinkphp_show_page_trace=0|0; mp_a44b0bc977d2c56bbe900386ad3af00a_mixpanel=%7B%22distinct_id%22%3A%20%221613%22%2C%22%24device_id%22%3A%20%2218a4afe52ef3fe-0bf27bfaafd6-19525634-13c680-18a4afe52ef3fe%22%2C%22%24initial_referrer%22%3A%20%22%24direct%22%2C%22%24initial_referring_domain%22%3A%20%22%24direct%22%2C%22%24user_id%22%3A%20%221613%22%7D'
onMounted(() => {
  useAppStore().setDark(true)
})
</script>
