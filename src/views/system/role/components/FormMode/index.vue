<script lang="ts" setup>
import type { Props as DetailFormProps } from '../DetailForm/index.vue'
import DetailForm from '../DetailForm/index.vue'

export interface Props extends DetailFormProps {
  modelValue?: boolean
  mode: 'dialog' | 'drawer' | 'router'
}
const props = withDefaults(defineProps<Props>(),
  {
    modelValue: false,
  })

const emits = defineEmits<{
  'update:modelValue': [
    value: boolean,
  ]
  success: []
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
const title = computed(() => {
  switch (props.type) {
    case 'add':
      return '新增角色'
    case 'edit':
      return '编辑角色'
    case 'view':
      return '查看角色'
    default:
      return '查看角色'
  }
})

function onSubmit() {
  // submit() 为组件内部方法
  form.value?.submit((success = true) => {
    if (success) {
      emits('success')
    }
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
        <ElButton type="primary" size="large" @click="onSubmit">
          确 定
        </ElButton>
      </template>
    </ElDialog>
    <ElDrawer v-else-if="props.mode === 'drawer'" v-model="myVisible" :title="title" size="600px" :close-on-click-modal="false" destroy-on-close>
      <DetailForm ref="form" v-bind="$props" />
      <template #footer>
        <ElButton size="large" @click="onCancel">
          取 消
        </ElButton>
        <ElButton type="primary" size="large" @click="onSubmit">
          确 定
        </ElButton>
      </template>
    </ElDrawer>
  </div>
</template>
