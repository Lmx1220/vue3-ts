<script lang="ts" setup>
const props = defineProps<{
  items: {
    label: string
    disabled?: boolean
    hide?: boolean
    handle?: () => void
  }[][]
}>()

const myItems = computed(() => {
  return props.items.map((item) => {
    return item.filter(v => !v.hide)
  }).filter(v => v.length)
})
</script>

<template>
  <VMenu :show-triggers="['hover']" :auto-hide="false" :popper-triggers="['hover', 'click']" :delay="200" v-bind="$attrs">
    <slot />
    <template #popper>
      <div
        v-for="(item, index) in myItems" :key="index" border-b="~ solid stone-2 dark:stone-7 last:size-0"
        class="p-1"
      >
        <button
          v-for="(v, i) in item" :key="i" :disabled="v.disabled"
          class="flex items-center gap-2 w-full px-2 py-1.5 border-size-0 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 text-sm rounded-md text-dark dark:text-white bg-inherit hover:not-disabled:bg-stone-1 dark:hover:not-disabled:bg-stone-9"
          @click="v.handle"
        >
          {{ v.label }}
        </button>
      </div>
    </template>
  </VMenu>
</template>
