export const useLoading = () => {
  const isLoading = useState<boolean>('__loading_state__', () => false)

  const show = () => {
    isLoading.value = true
  }

  const hide = () => {
    isLoading.value = false
  }

  // 包裝 async 函式，自動顯示/隱藏 loading
  const wrap = async <T>(fn: () => Promise<T>): Promise<T> => {
    try {
      show()
      return await fn()
    } finally {
      hide()
    }
  }

  return {
    isLoading,
    show,
    hide,
    wrap,
  }
}
