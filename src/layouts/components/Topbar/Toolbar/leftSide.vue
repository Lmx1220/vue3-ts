<script setup lang="ts">
import Tools from './tools.vue'
import useSettingsStore from '@/store/modules/settings'

defineOptions({
  name: 'ToolbarLeftSide',
})

const settingsStore = useSettingsStore()
</script>

<template>
  <div class="flex items-center">
    <div v-if="settingsStore.mode === 'mobile'" class="flex-center cursor-pointer px-2 py-1 -rotate-z-180" @click="settingsStore.toggleSidebarCollapse()">
      <SvgIcon name="toolbar-collapse" />
    </div>
    <Tools v-else model="left-side" />
  </div>
</template>
