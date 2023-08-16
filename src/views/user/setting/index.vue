<template>
  <AppPage>
    <div h-full w-full class="px-50 lt-sm:px-10">
      <n-card
        title="我的详细信息"
        :size="largerThanSm ? 'large' : 'medium'"
        class="mt-30 min-h-90% w-75% b-rd-10 bg-#25262B66 text-#fff lt-sm:mt-8 lt-sm:w-100%"
      >
        <div class="wrap mt-24 w-full px-27 lt-sm:px-5">
          <div
            class="avatar w-full flex items-center b-rd-10 bg-#1A1B1E69 py-23 pl-33 lt-sm:mt-10 lt-sm:py-10 lt-sm:pl-10"
          >
            <img
              src="@/assets/images/avatar.png"
              class="h-88 w-88 flex-shrink-0 lt-sm:h-60 lt-sm:w-60"
              alt=""
            />
            <div class="ml-28 flex items-center lt-sm:ml-18">
              <n-button
                type="info"
                :size="largerThanSm ? 'large' : 'medium'"
                class="btn w-110 b-rd-8 text-#fff lt-sm:w-90 hover:text-#fff"
              >
                上传头像
              </n-button>
              <n-button
                :size="largerThanSm ? 'large' : 'medium'"
                class="btn2 ml-13 w-110 b-rd-8 bg-#9B9B9B text-#fff lt-sm:w-90 hover:text-#fff"
              >
                移除
              </n-button>
            </div>
          </div>
          <!-- 表单 -->
        </div>
        <infoForm />
        <div class="h-117"></div>
      </n-card>
    </div>
  </AppPage>
</template>

<script setup>
import infoForm from '../components/infoForm.vue'
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'

const breakpoints = useBreakpoints(breakpointsTailwind)
const largerThanSm = breakpoints.greater('sm') // only larger than sm
</script>

<style lang="scss" scoped>
:deep(.n-card-header) {
  border-bottom: 1px solid #ffffff38;

  .n-card-header__main {
    color: #fff;
  }
}

:deep(.n-card__content) {
  padding-left: 0;
  padding-right: 0;
}

.btn2 {
  &:hover {
    color: #fff;
    background-color: #9b9b9b;
  }

  &:focus {
    color: #fff;
    background-color: #9b9b9b;
  }
}

.btn {
  &:hover {
    color: #fff;
  }

  &:focus {
    color: #fff;
    background-color: rgba(197, 25, 31, 1);
  }
}
</style>
