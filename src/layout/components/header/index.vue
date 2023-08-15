<template>
  <div flex items-center>
    <Search v-if="false" />
  </div>
  <div ml-auto flex items-center>
    <Create />
    <n-button round size="large" style="background-color: rgba(67, 66, 66, 0.4)" class="btn mr-10">
      <template #icon>
        <TheIcon icon="data" type="custom" />
      </template>
      0.00
    </n-button>
    <UserAvatar />
  </div>
  <!-- mobile -->
  <div class="display-none w-full">
    <UserAvatar />
    <div class="flex-justify-between" w-full flex items-center>
      <Search v-if="false" />
      <div ml-auto flex items-center>
        <Create />
        <n-button
          round
          size="medium"
          style="background-color: rgba(67, 66, 66, 0.4)"
          class="btn mr-10"
        >
          <template #icon>
            <TheIcon icon="data" type="custom" />
          </template>
          0.00
        </n-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import Search from './components/Search.vue'
import Create from './components/Create.vue'
// import BreadCrumb from './components/BreadCrumb.vue'
// import MenuCollapse from './components/MenuCollapse.vue'
// import FullScreen from './components/FullScreen.vue'
import UserAvatar from './components/UserAvatar.vue'
// import ThemeMode from './components/ThemeMode.vue'
// import MessageNotification from './components/MessageNotification.vue'
</script>

<style lang="scss" scoped>
.btn {
  &:hover {
    background-color: rgba(67, 66, 66, 0.4) !important;
    color: #fff;
  }

  &:focus {
    background-color: rgba(67, 66, 66, 0.4) !important;
    color: #fff;
  }
}
</style>
