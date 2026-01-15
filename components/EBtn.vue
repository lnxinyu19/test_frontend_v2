<template>
  <button
    class="rounded-md transition duration-200 select-none active:scale-95"
    :class="[btnStyle, btnSize]"
    v-bind="$attrs"
  >
    <span v-if="props.text">{{ props.text }}</span>
    <slot v-else />
  </button>
</template>

<script setup lang="ts">
import type { BtnColor, BtnSize } from '~/types/common'
interface Props {
  text?: string // 若有輸入時以此為主，若沒有就顯示 slot
  color?: BtnColor // 預設為 success
  size?: BtnSize
}

const props = withDefaults(defineProps<Props>(), {})

const btnStyle = computed(() => {
  switch (props.color) {
    case 'success':
      return 'e-btn-success'
    case 'error':
      return 'e-btn-error'
    case 'warn':
      return 'e-btn-warn'
  }
})

const btnSize = computed(() => {
  switch (props.size) {
    case 'sm':
      return 'text-sm px-2 py-1'
    case 'md':
      return 'text-base px-4 py-2'
    case 'lg':
      return 'text-lg'
    default:
      return 'text-base px-4 py-2'
  }
})
</script>

<style scoped lang="scss">
.e-btn {
  // success 綠
  &-success {
    background-color: #0d861c;
    color: #b1debe;
    &:hover {
      background-color: #12a124;
      color: #d6f2de;
    }
    &:active {
      background-color: #0a6d17;
      color: #9fceb0;
    }
  }

  // error 紅
  &-error {
    background-color: #b21d23;
    color: #b1debe;
    &:hover {
      background-color: #cc2329;
      color: #d6f2de;
    }
    &:active {
      background-color: #8a161a;
      color: #9fceb0;
    }
  }

  // warn 黃
  &-warn {
    background-color: #fcbf34;
    color: #4f3c1c;
    &:hover {
      background-color: #ffd24d;
      color: #3f2f14;
    }
    &:active {
      background-color: #e3a91f;
      color: #6a5324;
    }
  }

  &-success,
  &-error,
  &-warn {
    &:disabled {
      background-color: #555555;
      color: #cccccc;
      cursor: not-allowed;
      &:hover {
        background-color: #555555;
        color: #cccccc;
      }
    }
  }
}
</style>
