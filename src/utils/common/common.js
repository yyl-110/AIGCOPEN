import dayjs from 'dayjs'
import { useUserStore } from '~/src/store'
import Login from '@/components/common/login/login'

/**
 * @desc  格式化时间
 * @param {(Object|string|number)} time
 * @param {string} format
 * @returns {string | null}
 */
export function formatDateTime(time = undefined, format = 'YYYY-MM-DD HH:mm:ss') {
  return dayjs(time).format(format)
}

export function formatDate(date = undefined, format = 'YYYY-MM-DD') {
  return formatDateTime(date, format)
}

/**
 * @desc  函数节流
 * @param {Function} fn
 * @param {Number} wait
 * @returns {Function}
 */
export function throttle(fn, wait) {
  var context, args
  var previous = 0

  return function () {
    var now = +new Date()
    context = this
    args = arguments
    if (now - previous > wait) {
      fn.apply(context, args)
      previous = now
    }
  }
}

/**
 * @desc  函数防抖
 * @param {Function} func
 * @param {number} wait
 * @param {boolean} immediate
 * @return {*}
 */
export function debounce(method, wait, immediate) {
  let timeout
  return function (...args) {
    let context = this
    if (timeout) {
      clearTimeout(timeout)
    }
    // 立即执行需要两个条件，一是immediate为true，二是timeout未被赋值或被置为null
    if (immediate) {
      /**
       * 如果定时器不存在，则立即执行，并设置一个定时器，wait毫秒后将定时器置为null
       * 这样确保立即执行后wait毫秒内不会被再次触发
       */
      let callNow = !timeout
      timeout = setTimeout(() => {
        timeout = null
      }, wait)
      if (callNow) {
        method.apply(context, args)
      }
    } else {
      // 如果immediate为false，则函数wait毫秒后执行
      timeout = setTimeout(() => {
        /**
         * args是一个类数组对象，所以使用fn.apply
         * 也可写作method.call(context, ...args)
         */
        method.apply(context, args)
      }, wait)
    }
  }
}

/**
 *
 * @param {HTMLElement} el
 * @param {Function} cb
 * @return {ResizeObserver}
 */
export function useResize(el, cb) {
  const observer = new ResizeObserver((entries) => {
    cb(entries[0].contentRect)
  })
  observer.observe(el)
  return observer
}

export const getUrl = (url) => {
  if (!url) return ''
  if (url.includes('http')) {
    return url
  }
  return import.meta.env.VITE_BASE_API + url
}

export const copy = async (val) => {
  try {
    await navigator.clipboard.writeText(val)
    $message.success('复制成功')
  } catch (error) {
    // 创建输入框元素
    const input = document.createElement('input') //不会保留文本格式
    //如果要保留文本格式，比如保留换行符，或者多行文本，可以使用  textarea 标签，再配和模板字符串 ` `
    //const input = document.createElement('textarea')
    // 将想要复制的值
    input.value = val
    // 页面底部追加输入框
    document.body.appendChild(input)
    // 选中输入框
    input.select()
    // 执行浏览器复制命令
    document.execCommand('Copy')
    // 弹出复制成功信息
    $message.success('复制成功')
    // 复制后移除输入框
    input.remove()
  }
}

export const authVerifyLink = (url, router) => {
  const userInfo = useUserStore()
  if (!userInfo.userId) {
    Login({ redirect: url })
    return
  }
  router.push(url)
}
