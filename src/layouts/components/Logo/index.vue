<script setup lang="ts">
import useSettingsStore from '@/store/modules/settings'
import imgLogo from '@/assets/images/logo.png'

defineOptions({
  name: 'Logo',
})

withDefaults(
  defineProps<{
    showLogo?: boolean
    showTitle?: boolean
  }>(),
  {
    showLogo: true,
    showTitle: true,
  },
)

const settingsStore = useSettingsStore()

const title = ref(import.meta.env.VITE_APP_TITLE)
const logo = ref(imgLogo)

const to = computed(() => settingsStore.settings.home.enable ? settingsStore.settings.home.fullPath : '')
</script>

<template>
  <RouterLink
    :class="{ 'cursor-pointer': settingsStore.settings.home.enable }"
    :title="title"
    :to="to" class="flex-center gap-2 w-inherit h-[var(--g-sidebar-logo-height)] px-3 text-inherit no-underline"
  >
    <img v-if="showLogo" :src="logo" alt="" class="logo w-[30px] h-[30px] object-contain">
    <span v-if="showTitle" class="block font-bold truncate">{{ title }}</span>
  </RouterLink>
</template>
