<template>
  <div class="h-72 w-full flex items-center bg-#1A1B1EB2 px-17 lt-sm:h-50 lt-sm:px-8">
    <TheIcon :icon="title.icon" type="custom" class="mr-7 lt-sm:mr-3" :size="24" />
    {{ title.text }}
  </div>
</template>

<script setup>
const props = defineProps({
  title: { type: Object, default: () => {} },
})
</script>

<style lang="scss" scoped></style>
