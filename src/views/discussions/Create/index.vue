<template>
  <AppPage>
    <n-spin :show="loading">
      <div h-full w-full>
        <div class="h-full overflow-y-scroll px-39 pt-20 text-#fff lt-sm:px-8 lt-sm:pt-10">
          <div class="h-90% w-65% flex flex-col lt-sm:h-100% lt-sm:w-100%">
            <div class="flex cursor-pointer items-center text-14" @click="$router.back()">
              <TheIcon icon="back" type="custom" class="mr-11 lt-sm:mr-4" />
              返回讨论区
            </div>
            <div
              class="content mt-18 w-full flex-1 b-rd-10 bg-#25262B66 p-30 lt-sm:mt-9 lt-sm:p-10"
            >
              <div class="title pl-15 text-18 font-bold lt-sm:ml-7 lt-sm:text-13">创建新的讨论</div>
              <div class="zt mt-18 lt-sm:mt-9">
                <n-input
                  v-model:value="themeVal"
                  type="text"
                  size="large"
                  class="b-rd-10 bg-#1B1B1BE0"
                  placeholder="输入讨论主题"
                />
              </div>
              <div class="mt-13 overflow-hidden b-rd-10 lt-sm:mt-6">
                <QuillEditor
                  ref="quillRef"
                  v-model:content="html"
                  content-type="html"
                  :options="quillOptions"
                />
              </div>
              <div class="push mt-38 flex justify-between gap-11 lt-sm:mt-18">
                <n-select
                  v-model:value="selectVal"
                  size="large"
                  :options="options"
                  placeholder="选择一个话题"
                  class="overflow-hidden b-rd-10 bg-#1B1B1B text-#fff"
                />
                <n-button
                  type="primary"
                  size="large"
                  class="btn b-rd-10 text-#fff hover:bg-#1B1B1B"
                  @click="create"
                >
                  <template #icon>
                    <TheIcon icon="addFull" type="custom" />
                  </template>
                  创建
                </n-button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </n-spin>
  </AppPage>
</template>

<script setup>
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import api from '@/api'
import { useRouter } from 'vue-router'
const router = useRouter()

const toolbarOptions = [
  ['bold', 'italic', 'underline', 'strike'], // 加粗 斜体 下划线 删除线
  [{ script: 'sub' }, { script: 'super' }], // 上标/下标
  [{ indent: '-1' }, { indent: '+1' }], // 缩进
  [{ direction: 'rtl' }], // 文本方向
  [{ size: ['small', false, 'large', 'huge'] }], // 字体大小
  [{ header: [1, 2, 3, 4, 5, 6, false] }], // 标题
  [{ color: [] }, { background: [] }], // 字体颜色、字体背景颜色
  [{ align: [] }], // 对齐方式
  ['clean'], // 清除文本格式
  ['link', 'image'], // 链接、图片、视频
]
const themeVal = ref('')
const options = computed(() => {
  try {
    const selectTag = JSON.parse(sessionStorage.getItem('selectTag'))
    return selectTag.map((i) => {
      return { ...i, label: i.name, value: i.slug }
    })
  } catch (error) {
    return []
  }
})
const selectVal = ref(null)
const loading = ref(false)
const html = ref('')
const quillRef = ref(null)
const quillOptions = ref({
  modules: {
    toolbar: toolbarOptions,
  },
  placeholder: '输入内容',
  theme: 'snow',
})
const create = async () => {
  loading.value = true
  console.log(html.value, 23424)
  const params = {
    0: { json: { title: themeVal.value, description: html.value, category: selectVal.value } },
  }
  try {
    const res = await api.createDiscussion(params)
    router.go(-1)
  } catch (error) {
  } finally {
    loading.value = false
  }
}
</script>

<style lang="scss" scoped>
:deep(.ql-toolbar) {
  border-radius: 10px 10px 0 0;
}

:deep(.ql-container) {
  height: 300px !important;
  border-radius: 0 0 10px 10px;
}

.content {
  :deep(.n-base-selection-tags) {
    background-color: #1b1b1b;
    color: #fff;
    border-radius: 10px;
    color: #fff;
  }

  .btn {
    &:hover {
      background-color: #1b1b1b;
      color: #fff;
    }

    &:focus {
      background-color: #1b1b1b;
      color: #fff;
    }
  }

  .title {
    position: relative;

    &::before {
      content: '';
      position: absolute;
      left: 0;
      width: 4px;
      height: 24px;
      top: 50%;
      margin-top: -12px;
      background-color: #c5191f;
    }
  }
}
</style>
