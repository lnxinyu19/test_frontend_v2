<template>
  <div class="flex flex-col gap-y-0.5">
    <label :for="inputId" class="text-white">{{ props.label }}</label>
    <input
      :id="inputId"
      v-model="value"
      v-bind="$attrs"
      class="text-white border rounded-md bg-transparent outline-none px-2 py-1 text-xl"
    />
  </div>
</template>

<script setup lang="ts">
interface Props {
  id?: string // 若使用者有輸入，以使用者輸入的為主，若沒有請產出一個唯一 ID
  label?: string
  modelValue: string | number | null
}

const props = withDefaults(defineProps<Props>(), {})
const emit = defineEmits<{
  (e: 'update:modelValue', value: string | number): void
}>()

const inputId = computed(() => props.id ?? useId())

const value = computed({
  get: () => props.modelValue ?? '',
  set: (value: string | number) => {
    emit('update:modelValue', value)
  },
})
</script>
