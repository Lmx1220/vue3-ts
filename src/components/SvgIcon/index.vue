<script lang="ts" setup>
import { Icon } from '@iconify/vue'
import { useType } from '@/iconify/index.json'

defineOptions({
  name: 'SvgIcon',
})
const props = withDefaults(
  defineProps<{
    name: string
    async?: boolean
    flip?: 'horizontal' | 'vertical' | 'both'
    rotate?: number
    color?: string
    size?: string | number
  }>(),
  {
    async: false,
  })
const outputType = computed(() => {
  if (props.name.indexOf('i-') === 0) {
    return (props.async || useType === 'offline') ? 'svg' : 'css'
  }
  else if (props.name.includes(':')) {
    return 'svg'
  }
  else {
    return 'custom'
  }
})
const outputName = computed(() => {
  if (props.name.indexOf('i-') === 0) {
    let conversionName = props.name
    if (props.async || useType === 'offline') {
      conversionName = conversionName.replace('i-', '')
    }
    return conversionName
  }
  else {
    return props.name
  }
})

const style = computed(() => {
  const transform = []
  if (props.flip) {
    switch (props.flip) {
      case 'horizontal':
        transform.push('rotateY(180deg)')
        break
      case 'vertical':
        transform.push('rotateX(180deg)')
        break
      case 'both':
        transform.push('rotateX(180deg)')
        transform.push('rotateY(180deg)')
        break
    }
  }
  if (props.rotate) {
    transform.push(`rotate(${props.rotate % 360}deg)`)
  }
  return {
    ...(props.color && { color: props.color }),
    ...(props.size && { 'font-size': typeof props.size === 'number' ? `${props.size}px` : props.size }),
    ...(transform.length && { transform: transform.join(' ') }),
  }
})
</script>

<template>
  <i :style="style" class="h-[1em] w-[1em] leading-[1em] flex-inline justify-center items-center relative fill-current">
    <i v-if="outputType === 'css'" :class="outputName" />
    <Icon v-else-if="outputType === 'svg'" :icon="outputName" />
    <svg v-else aria-hidden="true">
      <use :xlink:href="`#icon-${outputName}`" />
    </svg>
  </i>
</template>

<style lang="scss" scoped>
// scss
</style>
