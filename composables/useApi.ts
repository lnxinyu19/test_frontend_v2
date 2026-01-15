import { UserApi, Configuration } from '~/generated/api'

export const useApi = () => {
  const { $axios } = useNuxtApp()

  const config = new Configuration({
    basePath: 'https://49890.wu.elitepro.ltd/api',
  })

  const userApi = new UserApi(config, undefined, $axios)

  return {
    userApi,
  }
}
