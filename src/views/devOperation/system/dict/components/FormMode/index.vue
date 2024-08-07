<script lang="ts" setup>
import type { Props as DetailFormProps } from '../DetailForm/index.vue'
import DetailForm from '../DetailForm/index.vue'

export interface Props extends DetailFormProps {
  modelValue?: boolean
  mode?: 'dialog' | 'drawer' | string
}

const props = withDefaults(defineProps<Props>(), {
  id: '',
  parentId: '',
  modelValue: false,
  mode: 'dialog',
})

const emits = defineEmits<{
  'update:modelValue': [
    value: boolean,
  ]
  'success': []
}>()

const myVisible = computed({
  get() {
    return props.modelValue
  },
  set(val) {
    emits('update:modelValue', val)
  },
})

const form = ref<InstanceType<typeof DetailForm>>()

const title = computed(() => props.id === '' ? '新增字典' : '编辑字典')

function onSubmit() {
  // submit() 为组件内部方法
  form.value?.submit(() => {
    emits('success')
    onCancel()
  })
}

function onCancel() {
  myVisible.value = false
}
</script>

<template>
  <div>
    <ElDialog
      v-if="props.mode === 'dialog'" v-model="myVisible" :close-on-click-modal="false" :title="title"
      append-to-body destroy-on-close width="600px"
    >
      <DetailForm ref="form" v-bind="$props" />
      <template #footer>
        <ElButton size="large" @click="onCancel">
          取 消
        </ElButton>
        <ElButton size="large" type="primary" @click="onSubmit">
          确 定
        </ElButton>
      </template>
    </ElDialog>
    <ElDrawer
      v-else-if="props.mode === 'drawer'" v-model="myVisible" :close-on-click-modal="false"
      :direction="props.parentId ? 'rtl' : 'ltr'" :size="600" :title="title" destroy-on-close
    >
      <DetailForm ref="form" v-bind="$props" />
      <template #footer>
        <ElButton size="large" @click="onCancel">
          取 消
        </ElButton>
        <ElButton size="large" type="primary" @click="onSubmit">
          确 定
        </ElButton>
      </template>
    </ElDrawer>
  </div>
</template>
