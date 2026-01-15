<template>
  <div class="w-full max-w-xl mx-auto flex flex-col gap-4 px-3 py-4 sm:px-6 sm:gap-6">
    <div class="flex items-center justify-between gap-2">
      <!-- 語系切換 -->
      <div
        class="text-white border border-gray-200 rounded-md hover:bg-offwhite hover:text-gray-800 shrink-0"
      >
        <EBtn :text="`${$t('lang')}: ${currentLangName}`" @click="toggleLocale" />
      </div>
      <!-- 新增 -->
      <EBtn :text="$t('add')" color="warn" @click="handleAdd" />
    </div>
    <!-- 列表 -->
    <EList :list="userList" @refresh="fetchUsers" />
  </div>
</template>

<script setup lang="ts">
import EList from '~/components/EList.vue'
import UserDialog from '~/components/dialogs/UserDialog.vue'

import { useUserStore } from '~/store/user'

const { open } = useDialog()
const { userApi } = useApi()

const { t, locale, setLocale } = useI18n()
const userStore = useUserStore()

const fetchUsers = async () => {
  const response = await userApi.getUserInfo()
  const users = (response.data.data ?? [])
    .filter((u) => u.id !== undefined && u.name !== undefined && u.age !== undefined)
    .map((u) => ({ id: u.id!, name: u.name!, age: u.age! }))
  userStore.setUsers(users)
  return users
}

await useAsyncData('userList', fetchUsers)

const { userList } = storeToRefs(userStore)

const currentLangName = computed(() => {
  return locale.value === 'zh-TW' ? '繁體中文' : 'English'
})

const toggleLocale = () => {
  const newLocale = locale.value === 'zh-TW' ? 'en-US' : 'zh-TW'
  setLocale(newLocale)
}

// 新增
const handleAdd = async () => {
  const result = await open(UserDialog, {
    title: t('operate'),
    isEdit: false,
  })
  if (result.type === 'confirm') {
    await fetchUsers()
  }
}
</script>
