<template>
  <AppPage>
    <div class="h-full px-39 pt-37 lt-sm:px-10 lt-sm:pt-10">
      <div class="h-full w-full flex lt-sm:flex-wrap">
        <div
          class="relative h-95% flex flex-col flex-1 overflow-x-hidden overflow-y-auto b-rd-10 bg-#2C2E3399 px-20 lt-sm:h-300 lt-sm:w-full lt-sm:px-10"
        >
          <leftForm />
        </div>
        <div
          class="ml-23 h-95% w-40% overflow-hidden b-rd-10 bg-#25262B66 lt-sm:ml-10 lt-sm:h-auto lt-sm:w-100%"
        >
          <Chat />
        </div>
      </div>
    </div>
  </AppPage>
</template>

<script setup>
import leftForm from '../components/leftForm.vue'
import Chat from '../components/chat.vue'
</script>

<style lang="scss" scoped></style>
