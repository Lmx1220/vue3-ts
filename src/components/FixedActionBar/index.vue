<script lang="ts" setup>
defineOptions({
  name: 'FixedActionBar',
})

const isBottom = ref(false)

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
})

function onScroll() {
  // 变量scrollTop是滚动条滚动时，滚动条上端距离顶部的距离
  const scrollTop = document.documentElement.scrollTop || document.body.scrollTop
  // 变量windowHeight是可视区的高度
  const windowHeight = document.documentElement.clientHeight || document.body.clientHeight
  // 变量scrollHeight是滚动条的总高度（当前可滚动的页面的总高度）
  const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight
  // 滚动条到底部
  isBottom.value = Math.ceil(scrollTop + windowHeight) >= scrollHeight
}
</script>

<template>
  <div
    :class="[
      isBottom ? 'shadow-[0_0_1px_0_var(--g-box-shadow-color)]' : 'shadow-[0_-10px_10px_-10px_var(--g-box-shadow-color)]',
    ]" class="z-4 bottom-0 p-5 text-center bg-[var(--g-container-bg)] transition" data-fixed-calc-width
  >
    <slot />
  </div>
</template>
