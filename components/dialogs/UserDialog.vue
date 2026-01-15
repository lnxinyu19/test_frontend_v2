<template>
  <div>
    <div class="text-white text-xl text-center mb-4">{{ title }}</div>
    <div class="flex flex-col gap-y-2">
      <ETextField :label="$t('name')" v-model="name" />
      <ETextField :label="$t('age')" v-model="age" type="number" min="0" />
    </div>
    <div class="mt-10 flex justify-end gap-4">
      <button
        class="px-4 py-2 rounded bg-gray-500 text-white hover:bg-gray-100"
        @click="$emit('close')"
      >
        {{ cancelText }}
      </button>
      <EBtn
        :text="confirmText"
        :color="btnColor"
        :disabled="!name || age === null"
        @click="handleSubmit"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { User } from '~/types/user'

const { userApi } = useApi()
const { t } = useI18n()
const { wrap } = useLoading()

const props = withDefaults(
  defineProps<{
    title: string
    message?: string
    confirmText?: string
    cancelText?: string
    isEdit?: boolean
    user?: User
  }>(),
  {}
)

const emit = defineEmits<{
  confirm: []
  close: []
}>()

const name = ref<string>('')
const age = ref<number | null>(null)

const btnColor = computed(() => (props.isEdit ? 'success' : 'warn'))
const confirmText = computed(() => (props.isEdit ? t('edit') : t('add')))
const cancelText = computed(() => props.cancelText ?? t('cancel'))

const handleSubmit = async () => {
  if (!name.value || age.value === null) return

  if (props.isEdit) {
    if (!props.user?.id) return
    await wrap(() =>
      userApi.updateUserInfo({
        id: props.user!.id,
        name: name.value,
        age: age.value!,
      })
    )
  } else {
    await wrap(() =>
      userApi.createUserInfo({
        name: name.value,
        age: age.value!,
      })
    )
  }

  emit('confirm')
}

watch(
  () => props.isEdit,
  (newType) => {
    if (newType && props.user) {
      name.value = props.user.name
      age.value = props.user.age
    } else {
      name.value = ''
      age.value = null
    }
  },
  { immediate: true }
)
</script>
