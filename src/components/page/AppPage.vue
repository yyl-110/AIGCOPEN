<template>
  <transition name="fade-slide" mode="out-in" appear>
    <section class="cus-scroll-y main_container wh-full flex-col bg-[#f5f6fb] dark:bg-hex-1A1B1E">
      <slot />
      <AppFooter v-if="showFooter" mt-15 />
      <n-back-top :bottom="20" />
    </section>
  </transition>
</template>

<script setup>
defineProps({
  showFooter: {
    type: Boolean,
    default: false,
  },
})
</script>

<style lang="scss" scoped>
@media (max-width: 639.9px) {
  section {
    &::-webkit-scrollbar {
      display: none;
    }
  }
}
</style>
