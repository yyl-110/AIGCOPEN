import { createApp } from 'vue'
import Login from './index.vue'
// 使用vue3的createApp,以及mount,unmount方法创建挂载实例

export default function _Login(options) {
  // 创建一个节点，并将组件挂载上去
  const mountNode = document.createElement('div')
  document.body.appendChild(mountNode)
  const app = createApp(Login, {
    ...options,
    visible: true,
    remove() {
      app.unmount(mountNode) //创建完后要进行销毁
      document.body.removeChild(mountNode)
    },
  })
  return app.mount(mountNode)
}
