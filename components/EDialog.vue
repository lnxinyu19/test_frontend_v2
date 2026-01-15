<template>
  <ClientOnly>
    <Teleport to="body">
      <dialog
        ref="dialogRef"
        class="border border-offwhite rounded-lg w-fit sm:w-lg px-3 py-6 sm:px-8"
        @close="onNativeClose"
        @click="onBackdropClick"
      >
        <div v-if="dialogState" @click.stop>
          <component
            :is="dialogState.component"
            v-bind="dialogState.props"
            @confirm="(payload: any) => close({ type: 'confirm', payload })"
            @close="(payload: any) => close({ type: 'close', payload })"
          />
        </div>
      </dialog>
    </Teleport>
  </ClientOnly>
</template>

<script setup lang="ts">
import { watch } from 'vue'
import { useDialog } from '~/composables/useDialog'

const { dialogState, close } = useDialog()
const dialogRef = useTemplateRef('dialogRef')

watch(dialogState, (state) => {
  if (state) {
    dialogRef.value?.showModal()
  } else {
    dialogRef.value?.close()
  }
})

function onNativeClose() {
  close({ type: 'dismiss' })
}

function onBackdropClick(e: MouseEvent) {
  if (e.target === dialogRef.value) {
    close({ type: 'dismiss' })
  }
}
</script>
