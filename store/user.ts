import type { User } from '~/types/user'

export const useUserStore = defineStore('user', () => {
  const userList = ref<User[]>([])

  const setUsers = (users: User[]) => {
    userList.value = users
  }

  return {
    setUsers,
    userList,
  }
})
