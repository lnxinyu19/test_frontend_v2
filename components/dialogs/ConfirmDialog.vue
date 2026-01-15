<template>
  <div>
    <div class="text-white text-xl text-center mb-4">{{ title }}</div>
    <p class="text-white font-bold text-center">{{ $t('deleteConfirm', { name: user.name }) }}</p>
    <div class="mt-10 flex justify-end gap-4">
      <button
        class="px-4 py-2 rounded bg-gray-500 text-white hover:bg-gray-100"
        @click="$emit('close')"
      >
        {{ cancelText }}
      </button>
      <EBtn :text="$t('confirm')" :color="'error'" @click="handleSubmit" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { User } from '~/types/user'

const { wrap } = useLoading()
const { userApi } = useApi()
const { t } = useI18n()

const props = withDefaults(
  defineProps<{
    title: string
    message?: string
    confirmText?: string
    cancelText?: string
    user: User
  }>(),
  {}
)

const emit = defineEmits<{
  confirm: []
  close: []
}>()

const cancelText = computed(() => props.cancelText ?? t('cancel'))

const handleSubmit = async () => {
  await wrap(() => userApi.deleteUserInfo({ id: props.user.id }))
  emit('confirm')
}
</script>
