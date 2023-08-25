export function createPageLoadingGuard(router) {
  router.beforeEach(() => {
    // localStorage.setItem('vueuse-color-scheme', 'dark')
    window.$loadingBar?.start()
  })

  router.afterEach(() => {
    setTimeout(() => {
      window.$loadingBar?.finish()
    }, 200)
  })

  router.onError(() => {
    window.$loadingBar?.error()
  })
}
