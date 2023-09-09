<template>
  <n-layout has-sider wh-full>
    <n-layout-sider
      v-if="largerThanSm"
      bordered
      collapse-mode="width"
      :collapsed-width="172"
      :width="172"
      :native-scrollbar="false"
      :collapsed="appStore.collapsed"
    >
      <SideBar />
    </n-layout-sider>

    <article flex-col flex-1 overflow-hidden>
      <header
        border-b="1 solid #eee"
        class="w-full flex items-center overflow-hidden bg-white px-15"
        dark="bg-dark border-0"
        :style="`height: ${header.height}px;background:${header.background}`"
      >
        <AppHeader />
      </header>
      <section flex-1 overflow-hidden bg-hex-f5f6fb dark:bg-hex-101014>
        <AppMain />
      </section>
    </article>
  </n-layout>
</template>

<script setup>
import AppHeader from './components/header/index.vue'
import SideBar from './components/sidebar/index.vue'
import AppMain from './components/AppMain.vue'
import { useAppStore } from '@/store'
import { header, tags } from '~/settings'
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'

const breakpoints = useBreakpoints(breakpointsTailwind)
const largerThanSm = breakpoints.greater('sm') // only larger than sm

const appStore = useAppStore()
</script>
