import axios, { type AxiosInstance } from 'axios'

declare module '#app' {
  interface NuxtApp {
    $axios: AxiosInstance
  }
}

export default defineNuxtPlugin({
  name: 'axios',
  enforce: 'pre', // 確保在其他 plugin 之前載入
  setup() {
    const instance = axios.create({
      baseURL: 'https://49890.wu.elitepro.ltd',
      timeout: 15000,
    })

    instance.interceptors.request.use(
      (request) => {
        return request
      },
      (error) => {
        return Promise.reject(error)
      }
    )

    instance.interceptors.response.use(
      (response) => {
        return response
      },
      (error) => {
        return Promise.reject(error)
      }
    )

    return {
      provide: {
        axios: instance,
      },
    }
  },
})
