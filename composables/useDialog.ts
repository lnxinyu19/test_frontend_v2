import { markRaw, shallowRef, type Component } from 'vue'

export type DialogResult<T = any> =
  | { type: 'confirm'; payload?: T }
  | { type: 'close'; payload?: T }
  | { type: 'dismiss' }

type DialogState = {
  component: Component
  props: Record<string, any>
  resolve: (result: DialogResult<any>) => void
} | null

const dialogState = shallowRef<DialogState>(null)

export const useDialog = () => {
  const open = <T = any>(
    component: Component,
    props: Record<string, any> = {}
  ): Promise<DialogResult<T>> => {
    if (dialogState.value) {
      dialogState.value.resolve({ type: 'dismiss' })
    }


    return new Promise((resolve) => {
      dialogState.value = {
        component: markRaw(component),
        props: { ...props },
        resolve,
      }
    })
  }

  const close = (result: DialogResult = { type: 'dismiss' }) => {
    if (!dialogState.value) return
    dialogState.value.resolve(result)
    dialogState.value = null
  }

  return {
    dialogState,
    open,
    close,
  }
}
