<template>
  <AppPage>
    <div h-full overflow-x-hidden>
      <div
        class="h-98% w-full flex flex-items-start overflow-hidden px-50 pt-40 lt-sm:h-full lt-sm:flex-wrap lt-sm:overflow-y-auto lt-sm:px-10 lt-sm:pt-12"
      >
        <div
          class="h-full min-w-280 w-30% b-rd-10 bg-#2C2E3399 pb-20 pt-20 lt-sm:h-auto lt-sm:h-auto lt-sm:w-100%"
        >
          <div
            class="inner px-17 pb-16 lt-sm:px-9 lt-sm:pb-8"
            style="border-bottom: 1px solid #404040"
          >
            <div
              class="addChat h-48 w-full flex cursor-pointer items-center justify-center b-rd-10 bg-#1A1B1E text-15 text-#fff hover:bg-#1A1B1ECC lt-sm:text-13"
            >
              <TheIcon icon="addFull" type="custom" size="24" class="mr-6 lt-sm:mr-3" />
              新的对话
            </div>
          </div>
          <!-- prompts -->
          <Prompts />
        </div>
        <div
          class="chat relative ml-23 h-full flex-1 b-rd-10 bg-#25262B66 lt-sm:ml-0 lt-sm:mt-10 lt-sm:h-auto lt-sm:min-h-500"
        >
          <img src="@/assets/images/logo_text.png" class="logoText absolute w-348" alt="" />
          <!-- 设置 -->
          <Setting />
          <chatBox />
        </div>
      </div>
    </div>
  </AppPage>
</template>

<script setup>
import Prompts from './components/prompts.vue'
import Setting from './components/setting.vue'
import chatBox from './components/chatBox.vue'
</script>

<style scoped>
.logoText {
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  opacity: 0.1;
}
</style>
