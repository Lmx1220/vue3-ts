<script lang="ts" setup>
withDefaults(
  defineProps<{
    text: string
  }>(),
  {
    text: '',
  },
)
</script>

<template>
  <VTooltip v-bind="$attrs">
    <slot />
    <template #popper>
      <slot name="text">
        {{ text }}
      </slot>
    </template>
  </VTooltip>
</template>
