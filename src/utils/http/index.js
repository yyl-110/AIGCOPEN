// 引入axios
import axios from 'axios'
// 引入qs模块，对数据进行序列化
import QS from 'qs'
import { useMessage } from 'naive-ui'
const message = useMessage()

// 请求超时时间
axios.defaults.timeout = 10000
axios.defaults.baseURL = import.meta.env.MODE === 'development' ? '' : import.meta.env.VITE_BASE_API
// 请求拦截器
axios.interceptors.request.use(
  (config) => {
    if (config.method.toUpperCase() === 'POST') {
      config.headers['Content-Type'] = 'application/json;charset=utf-8'
    }
    return config
  },
  (error) => {
    return Promise.error(error)
  }
)
// 响应拦截器
axios.interceptors.response.use(
  (response) => {
    console.log(response)
    if (response.status === 200) {
      return Promise.resolve(response)
    } else {
      return Promise.reject(response)
    }
  },
  // 服务器状态码不是200的情况
  (error) => {
    if (error.response.status) {
      switch (error.response.status) {
        case 500:
          message.error('网错错误，请稍后再试！')
          break
        case 404:
          message.error('网错错误，请稍后再试！')
          break
        // 其他错误，直接抛出错误提示
        default:
          message.error(error.response.data.message)
      }
      return Promise.reject(error.response)
    }
  }
)

/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function get(url, params) {
  return new Promise((resolve, reject) => {
    axios
      .get(url, {
        params: params,
      })
      .then((res) => {
        resolve(res.data)
      })
      .catch((err) => {
        reject(err.data)
      })
  })
}
/**
 * post方法，对应post请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function post(url, params) {
  return new Promise((resolve, reject) => {
    axios
      .post(url, JSON.stringify(params))
      .then((res) => {
        resolve(res.data)
      })
      .catch((err) => {
        reject(err.data)
      })
  })
}
/**
 * get方法，对应get请求,直接在地址后面拼串的形式
 * @param {String} url [请求的url地址]
 * @param {String} params [请求时携带的参数]
 */
export function getDynamicynamic(url, params) {
  return new Promise((resolve, reject) => {
    const completeUrl = `${url}/${params}`
    axios
      .get(completeUrl, {})
      .then((res) => {
        resolve(res.data)
      })
      .catch((err) => {
        reject(err.data)
      })
  })
}
