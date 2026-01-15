<template>
  <div class="text-offwhite w-full h-fit border border-offwhite rounded-lg px-3 py-6 sm:px-8">
    <!-- 標頭 -->
    <ul
      class="grid grid-cols-[1.5rem_1fr_2rem_3.5rem] sm:grid-cols-[2.5rem_1fr_3rem_7rem] gap-x-2 sm:gap-x-4 mb-6"
    >
      <li
        v-for="(head, index) in listHeader"
        :key="`listHeadKey__${index}`"
        class="text-center text-sm sm:text-base"
      >
        {{ head }}
      </li>
    </ul>
    <!-- 列表 -->
    <ul class="flex flex-col gap-y-4 max-h-96 overflow-y-auto">
      <li
        v-for="user in list"
        :key="user.id"
        class="grid grid-cols-[1.5rem_1fr_2rem_3.5rem] sm:grid-cols-[2.5rem_1fr_3rem_7rem] gap-x-2 sm:gap-x-4 items-center border-b border-b-gray-500 pb-3"
      >
        <span class="text-center text-sm">{{ user.id }}</span>
        <span class="text-center text-sm truncate">{{ user.name }}</span>
        <span class="text-center text-sm">{{ user.age }}</span>
        <div class="flex flex-col sm:flex-row gap-1 sm:gap-2 items-center">
          <EBtn :text="$t('edit')" :color="'success'" :size="'sm'" @click="handleEdit(user)" />
          <EBtn :text="$t('delete')" :color="'error'" :size="'sm'" @click="handleDelete(user)" />
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import ConfirmDialog from './dialogs/ConfirmDialog.vue'
import UserDialog from './dialogs/UserDialog.vue'
import EBtn from './EBtn.vue'
import type { User } from '~/types/user'

const props = defineProps<{
  list: User[]
}>()

const { t } = useI18n()
const { open } = useDialog()

const listHeader = computed(() => ['#', t('name'), t('age'), t('operate')])

const emit = defineEmits<{
  refresh: []
}>()

const handleEdit = async (user: User) => {
  const result = await open(UserDialog, {
    title: t('operate'),
    user,
    isEdit: true,
  })
  if (result.type === 'confirm') {
    emit('refresh')
  }
}

const handleDelete = async (user: User) => {
  const result = await open(ConfirmDialog, {
    title: t('operate'),
    user: user,
    message: 'test',
  })
  if (result.type === 'confirm') {
    emit('refresh')
  }
}
</script>
