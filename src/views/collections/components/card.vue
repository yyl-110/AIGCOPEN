<template>
  <div
    w-full
    class="card cursor-pointer overflow-hidden b-rd-10 bg-#D9D9D9 hover:bg-#D9D9D999"
    @click="$router.push('/collections/detail')"
  >
    <img src="@/assets/images/pic.png" class="h-30% w-full" />
    <div class="info px-14 pt-12 lt-sm:px-8">
      <h2 class="ellipsis1 w-full text-18 font-700 text-#000 lt-sm:text-16">
        超级可用性：营销模板
      </h2>
      <p
        class="ellipsis4 mb-10 mt-7 w-full text-13 line-height-18 text-#000 lt-sm:mb-5 lt-sm:mt-3 lt-sm:text-12"
      >
        发掘超级可用性营销模板的潜力！我们收集了广泛的精心制作模板，旨在简化您的工作流程。无论是内容创建还是项目管理，这些模板都提供了无与伦比...
      </p>
      <div class="list w-full b-rd-10 bg-#FFFFFF4D px-10 lt-sm:px-5">
        <div
          v-for="item in 5"
          class="item lt-sm:40 h-50 w-full flex cursor-pointer items-center b-rd-10 lt-sm:h-40"
        >
          <img
            src="https://image.aigcopen.com/744417d34a5915a46d9cb2ee07790dad.png"
            class="h-34 w-34 b-rd-10 lt-sm:h-26 lt-sm:w-26"
          />
          <span class="ellipsis1 ml-9 text-15 font-500 text-#1B1B1B lt-sm:ml-4 lt-sm:text-13">
            造梗神器GPT造梗神器GPT造梗神器GPT
          </span>
        </div>
      </div>
      <p class="tip h-34 w-full flex items-center text-12 text-#9B9B9B">4 more prompts +</p>
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.card {
  &:hover {
    .tip {
      color: #fff;
    }
  }

  .list {
    .item {
      margin-top: 3px;
      position: relative;

      &::before {
        content: '';
        position: absolute;
        width: 100%;
        height: 1px;
        background: #ffffff66;
        bottom: -3px;
      }

      &:hover {
        background: rgba(75, 85, 99, 0.1);
      }

      &:last-child {
        &::before {
          display: none;
        }

        border: none !important;
      }
    }
  }
}
</style>
