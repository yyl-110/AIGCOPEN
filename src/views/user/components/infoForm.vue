<template>
  <!-- form -->
  <div class="form w-full">
    <div class="item mt-33 px-27 lt-sm:mt-16 lt-sm:px-5">
      <div class="title relative flex items-center pl-16 text-17 font-700 text-#fff lt-sm:text-13">
        名字
      </div>
      <n-input v-model:value="formVal.form.userName" type="text" placeholder="您的名字"
        class="mt-19 b-rd-10 bg-#1B1B1BE0 lt-sm:mt-8" />
    </div>
    <div class="item mt-33 px-27 lt-sm:mt-16 lt-sm:px-5">
      <div class="title relative flex items-center pl-16 text-17 font-700 text-#fff lt-sm:text-13">
        签名
      </div>
      <n-input v-model:value="formVal.form.userTagline" type="text" placeholder="不超过30个字"
        class="mt-19 b-rd-10 bg-#1B1B1BE0 lt-sm:mt-8" />
    </div>
    <div class="item mt-33 px-27 lt-sm:mt-16 lt-sm:px-5">
      <div class="title relative flex items-center pl-16 text-17 font-700 text-#fff lt-sm:text-13">
        个人介绍
      </div>
      <n-input v-model:value="formVal.form.userAbout" type="textarea" :autosize="{
        minRows: 3,
        maxRows: 3,
      }" class="mt-19 h-136 b-rd-10 bg-#1B1B1BE0 lt-sm:mt-8" placeholder="告诉社区你是谁，你的爱好和你的成就，以及你的专业等，不超过200个字" />
    </div>
    <div class="item mt-33 px-27 lt-sm:mt-16 lt-sm:px-5">
      <div class="title relative flex items-center pl-16 text-17 font-700 text-#fff lt-sm:text-13">
        所在区域
      </div>
      <n-input v-model:value="formVal.form.userLocation" type="text" placeholder="北京"
        class="mt-19 b-rd-10 bg-#1B1B1BE0 lt-sm:mt-8" />
    </div>
    <div class="item mt-33 px-27 lt-sm:mt-16 lt-sm:px-5">
      <div class="title relative flex items-center pl-16 text-17 font-700 text-#fff lt-sm:text-13">
        个人资料是否公开?
        <span class="text-#C5191F">*</span>
      </div>
      <div class="radio mt-19 w-full b-rd-10 bg-#1B1B1B px-10 py-7 lt-sm:mt-8">
        <n-radio :checked="formVal.form.userProfilePublic" :value="true" name="basic-demo"
          @change="formVal.form.userProfilePublic = !formVal.form.userProfilePublic">
          是
        </n-radio>
        <n-radio :checked="!formVal.form.userProfilePublic" :value="false" name="basic-demo"
          @change="formVal.form.userProfilePublic = !formVal.form.userProfilePublic">
          否
        </n-radio>
      </div>
    </div>
    <div class="item mt-33 px-27 lt-sm:mt-16 lt-sm:px-5">
      <div class="title relative flex items-center pl-16 text-17 font-700 text-#fff lt-sm:text-13">
        对话内容可见性
        <span class="text-#C5191F">*</span>
      </div>
      <div class="radio mt-19 w-full b-rd-10 bg-#1B1B1B px-10 py-7 lt-sm:mt-8">
        <n-radio :checked="formVal.form.userConversationPublic" :value="true" name="basic-demo"
          @change="formVal.form.userConversationPublic = !formVal.form.userConversationPublic">
          公开
        </n-radio>
        <n-radio :checked="!formVal.form.userConversationPublic" :value="false" name="basic-demo"
          @change="formVal.form.userConversationPublic = !formVal.form.userConversationPublic">
          私有
        </n-radio>
      </div>
    </div>
    <div class="link mt-33 w-full lt-sm:mt-16 lt-sm:mt-16 lt-sm:px-5">
      <div class="main_title w-full pb-18 pl-27 text-30 font-700 line-height-40 text-#fff lt-sm:pb-10 lt-sm:pl-5"
        style="border-bottom: 1px solid #4a4a4a">
        链接
      </div>
      <div class="item mt-24 w-full px-27 lt-sm:px-5">
        <div class="w-full flex items-center b-rd-10 bg-#1B1B1B px-10 py-10 text-#fff lt-sm:mt-8">
          <p class="chakra-text w-200">链接名称</p>
          <p class="chakra-text pl-10">URL</p>
        </div>
        <div v-for="(item, index) in linkList" :key="index" class="mt-10 w-full flex">
          <div w-200 lt-sm:w-100>
            <n-input v-model="linkList[index].linkName" type="text" placeholder="" class="b-rd-10 bg-#1B1B1BE0" />
          </div>
          <div ml-10 flex-1>
            <n-input v-model="linkList[index][url]" type="text" placeholder=""
              class="flex-1 flex-shrink-0 b-rd-10 bg-#1B1B1BE0" />
          </div>
        </div>
        <div class="add mt-14 cursor-pointer text-17 font-500 text-#19BBC5 lt-sm:text-13"
          @click="linkList.push({ linkName: '', url: '' })">
          + 添加链接
        </div>
      </div>
    </div>
    <div class="link mt-33 w-full lt-sm:mt-16 lt-sm:mt-16 lt-sm:px-5">
      <div class="main_title w-full pb-18 pl-27 text-30 font-700 line-height-40 text-#fff lt-sm:pb-10 lt-sm:pl-5"
        style="border-bottom: 1px solid #4a4a4a">
        你的兴趣
      </div>
      <div class="item mt-24 w-full px-27 lt-sm:px-5">
        <div class="w-full text-17 font-700 text-#fff">
          兴趣
          <span class="text-#C5191F">*</span>
        </div>
        <p class="mt-15 text-17 font-700 text-#9B9B9B lt-sm:mt-6">选择感兴趣的标签</p>
        <n-select v-model:value="formVal.form.interestTags" :options="optionList" placeholder="Select..."
          class="lt-sm:-6 mt-15 w-256 b-rd-10 bg-#fff color-#000" @update:value="handelSelect" />
      </div>
      <div class="tagList mt-23 flex flex-wrap gap-15 px-27 lt-sm:mt-16 lt-sm:px-5">
        <div v-for="(item, index) in tagList" :key="item"
          class="tag relative flex-shrink-0 cursor-pointer b-rd-8 bg-#000000 px-10 py-7 text-center text-#fff lt-sm:px-5 lt-sm:py-3"
          @click="delTag(index)">
          <TheIcon icon="roundClose" type="custom" class="absolute right--5 top--10" />
          {{ item }}
        </div>
      </div>
      <n-button type="info" w110 class="btn ml-27 mt-24 b-rd-8 text-#fff lt-sm:ml-5 lt-sm:mt-14" @click="handelSave">
        保存
      </n-button>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  optionList: {
    type: Array,
    default: () => [],
  },
  info: {
    type: Object,
    default: () => { },
  },
})
const emits = defineEmits(['handelSave'])
let formVal = reactive({
  form: {
    userName: '',
    userTagline: '',
    userAbout: '',
    userLocation: '',
    userProfilePublic: false,
    userConversationPublic: false,
    link: [{ linkName: '1342423', url: '1' }],
    interestTags: '',
    userInterests: '',
  },
})
const tagList = ref([])
const select = ref('')
let linkList = ref([])

const delTag = (index) => {
  tagList.value.splice(index, 1)
}

const handelSelect = (value) => {
  if (tagList.value.some((i) => i === value)) {
    return
  }

  tagList.value.push(props.optionList.find((i) => i.value === value)?.label)
}
const handelSave = () => {
  formVal.form.userInterests = tagList.value.join(' ')
  emits('handelSave', formVal.form)
}

watch(
  () => props.info,
  () => {
    tagList.value = props.info?.interests.split(' ')
    const { name = '', about = '', interests = '', location = '', tagline = '' } = props.info
    formVal.form.userName = name
    formVal.form.userAbout = about
    formVal.form.userInterests = interests
    formVal.form.userLocation = location
    formVal.form.userTagline = tagline
  },
  { deep: true }
)
</script>

<style lang="scss" scoped>
:deep(.n-base-selection-input) {
  color: #000 !important;
}

:deep(.n-base-icon) {
  color: #000 !important;
}

:deep(.n-radio) {
  .n-radio__dot.n-radio__dot--checked {
    box-shadow: inset 0 0 0 1px #aab2c8 !important;
  }

  .n-radio_dot {
    box-shadow: inset 0 0 0 1px #aab2c8 !important;
  }

  .n-radio__dot::before {
    background-color: #c5191f !important;
  }
}

.item {
  .title {
    &::before {
      content: '';
      width: 3px;
      background-color: #c5191f;
      height: 23px;
      position: absolute;
      left: 0;
    }
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
