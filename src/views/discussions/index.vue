<template>
  <AppPage>
    <div h-full w-full>
      <div
        class="h-98% flex flex-items-start overflow-hidden px-39 pt-40 lt-sm:h-full lt-sm:flex-wrap lt-sm:overflow-y-auto lt-sm:px-10 lt-sm:pt-12"
      >
        <div class="h-full flex-1 b-rd-10 bg-#25262B66 pb-20 lt-sm:h-auto">
          <discussions-box />
        </div>
        <div
          class="ml-34 h-full w-30% overflow-y-auto pb-15 lt-sm:ml-0 lt-sm:mt-10 lt-sm:h-auto lt-sm:w-full"
        >
          <div class="row1 w-full overflow-hidden b-rd-10 bg-#2C2E3399 pb-15">
            <cardTitle :title="{ text: '主题分类', icon: 'ztfl' }" />
            <div class="content mt-7 px-19 lt-sm:px-8">
              <div
                v-for="item in 5"
                class="item ellipsis1 h-54 w-full flex items-center"
                style="border-bottom: 1px solid #ffffff21"
              >
                1&emsp;提示词工程
              </div>
            </div>
          </div>
          <div class="row1 mt-16 w-full overflow-hidden b-rd-10 bg-#2C2E3399">
            <cardTitle :title="{ text: '角色', icon: 'role' }" />
            <div class="content mt-7 px-19 lt-sm:px-8">
              <div
                v-for="item in 5"
                class="item ellipsis1 h-54 w-full flex items-center"
                style="border-bottom: 1px solid #ffffff21"
              >
                1&emsp;提示词工程
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </AppPage>
</template>

<script setup>
import cardTitle from './components/cardTitle.vue'
import DiscussionsBox from './components/discussionsBox.vue'
</script>

<style lang="scss" scoped></style>
