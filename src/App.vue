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
import { useCookies } from "@vueuse/integrations/useCookies"
// const cookie = useCookies();
// cookie.set("PHPSESSID", "c5b43cf6b3d44daf2bb55211b159d6be")
// cookie.set("thinkphp_show_page_trace", "0|0")
// cookie.set("mp_a44b0bc977d2c56bbe900386ad3af00a_mixpanel", "%7B%22distinct_id%22%3A%20%221550%22%2C%22%24device_id%22%3A%20%2218a080679bc374-0f3be08b0dd669-1a525634-13c680-18a080679bc374%22%2C%22%24initial_referrer%22%3A%20%22%24direct%22%2C%22%24initial_referring_domain%22%3A%20%22%24direct%22%2C%22%24user_id%22%3A%20%221550%22%7D")
document.cookie = 'PHPSESSID=599f4138eb5970931e27aa1a368e5005; thinkphp_show_page_trace=0|0; mp_a44b0bc977d2c56bbe900386ad3af00a_mixpanel=%7B%22distinct_id%22%3A%20%221550%22%2C%22%24device_id%22%3A%20%2218a5a0545661a3-0352e9f834c28a-19525634-13c680-18a5a0545661a3%22%2C%22%24initial_referrer%22%3A%20%22https%3A%2F%2Ftest.aigcopen.com%2F%22%2C%22%24initial_referring_domain%22%3A%20%22test.aigcopen.com%22%2C%22%24user_id%22%3A%20%221550%22%7D'

onMounted(() => {
  useAppStore().setDark(true)
})
</script>
