<template>
  <AppPage>
    <div class="flex-1">
      <div class="px-39 text-#fff lt-sm:px-10">
        <div class="title mt-35 text-18 lt-sm:mt-15">分类集合</div>
        <div class="list mt-25 lt-sm:mt-10">
          <n-grid cols="2 s:3 m:4 l:4 xl:4 2xl:5" :x-gap="12" :y-gap="22" responsive="screen">
            <n-grid-item v-for="item in 20">
              <card />
            </n-grid-item>
          </n-grid>
        </div>
      </div>
    </div>
  </AppPage>
</template>

<script setup>
import card from './components/card.vue'
</script>

<style scoped></style>
