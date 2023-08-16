<template>
  <div ref="setDom" class="absolute left-23 top-28">
    <n-button
      type="info"
      size="large"
      class="btn w-135 b-rd-10 text-16 font-700 text-#fff lt-sm:w-70 lt-sm:text-14 hover:text-#fff"
      @click="showModal = true"
    >
      <icon-custom-setting size="19" class="mr-5 lt-sm:mr-4"></icon-custom-setting>
      设置
    </n-button>
    <div
      v-if="showModal"
      class="mask fixed left-0 top-0 z-1 h-full w-full"
      @click.self="showModal = false"
    ></div>
    <div
      v-if="showModal"
      class="absolute top-50 z-2 h-580 w-354 b-rd-10 bg-#262729 px-28 pt-12 pt-24 text-#fff lt-sm:px-14"
    >
      <p class="font-#fff text-16">Models</p>
      <div class="mt-12 flex justify-between">
        <div
          v-for="item in 3"
          class="h-92 w-80 flex flex-col items-center justify-center b-rd-10 bg-#515254 hover:bg-#939394"
        >
          <img src="@/assets/images/gpt_logo.png" class="h-40 w-40 b-rd-10" alt="" />
          <p class="mt-5 text-16 line-height-23 text-#fff">ChatGPT</p>
        </div>
      </div>
      <div v-for="item in sliderList" class="row mt-26 lt-sm:mt-16">
        <div class="flex items-center justify-between">
          <n-popover trigger="hover" placement="bottom">
            <template #trigger>
              <p class="flex cursor-pointer items-center">
                {{ item.name }}
                <icon-custom-hint size="19" class="ml-3"></icon-custom-hint>
              </p>
            </template>
            <span>{{ item.desc }}</span>
          </n-popover>

          <span>0.4</span>
        </div>
        <n-slider v-model:value="value" :step="10" class="mt-8"></n-slider>
      </div>
    </div>
  </div>
</template>

<script setup>
const showModal = ref(false)
const setDom = ref(null)
const value = ref(1)
const sliderList = ref([
  { name: 'Temperature', step: 10, value: 10, desc: 'hhhhhh' },
  { name: 'Top P', step: 10, value: 10, desc: 'hhhhhh' },
  { name: 'Max Tokens', step: 10, value: 10, desc: 'hhhhhh' },
  { name: 'Frequency Penalty', step: 10, value: 10, desc: 'hhhhhh' },
  { name: 'Presence Penalty', step: 10, value: 10, desc: 'hhhhhh' },
])
</script>

<style lang="scss" scoped>
.btn {
  &:hover {
    color: #fff;
  }

  &:focus {
    color: #fff;
    background-color: rgba(197, 25, 31, 1);
  }
}

.active {
  background-color: #939394;
}
</style>
