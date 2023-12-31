<script lang="ts" setup>
import SubMenu from './sub.vue'
import Item from './item.vue'
import type { MenuInjection, MenuProps } from './types'
import { rootMenuInjectionKey } from './types'

defineOptions({
  name: 'MainMenu',
})

const props = withDefaults(
  defineProps<MenuProps>(),
  {
    accordion: true,
    defaultOpeneds: () => [],
    mode: 'vertical',
    collapse: false,
    showCollapseName: false,
    rounded: false,
  },
)

const router = useRouter()

const activeIndex = ref<MenuInjection['activeIndex']>(props.value)
const items = ref<MenuInjection['items']>({})
const subMenus = ref<MenuInjection['subMenus']>({})
const openedMenus = ref<MenuInjection['openedMenus']>(props.defaultOpeneds.slice(0))
const mouseInMenu = ref<MenuInjection['mouseInMenu']>([])
const isMenuPopup = computed<MenuInjection['isMenuPopup']>(() => {
  return props.mode === 'horizontal' || (props.mode === 'vertical' && props.collapse)
})

// 解析传入的 menu 数据，并保存到 items 和 subMenus 对象中
function initItems(menu: MenuProps['menu'], parentPaths: string[] = []) {
  menu.forEach((item) => {
    const index = item.path ?? JSON.stringify(item)
    if (item.children) {
      const indexPath = [...parentPaths, index]
      subMenus.value[index] = {
        index,
        indexPath,
        active: false,
      }
      initItems(item.children, indexPath)
    }
    else {
      items.value[index] = {
        index,
        indexPath: parentPaths,
      }
    }
  })
}

const openMenu: MenuInjection['openMenu'] = (index, indexPath) => {
  if (openedMenus.value.includes(index)) {
    return
  }
  if (props.accordion) {
    openedMenus.value = openedMenus.value.filter(key => indexPath.includes(key))
  }
  openedMenus.value.push(index)
}
const closeMenu: MenuInjection['closeMenu'] = (index) => {
  if (Array.isArray(index)) {
    nextTick(() => {
      closeMenu(index.at(-1)!)
      if (index.length > 1) {
        closeMenu(index.slice(0, -1))
      }
    })
    return
  }
  Object.keys(subMenus.value).forEach((item) => {
    if (subMenus.value[item].indexPath.includes(index)) {
      openedMenus.value = openedMenus.value.filter(item => item !== index)
    }
  })
}

function setSubMenusActive(index: string) {
  Object.keys(subMenus.value).forEach((index) => {
    subMenus.value[index].active = false
  })
  items.value[index]?.indexPath.forEach((index) => {
    subMenus.value[index].active = true
  })
}

const handleMenuItemClick: MenuInjection['handleMenuItemClick'] = (index, meta) => {
  if (props.mode === 'horizontal' || props.collapse) {
    openedMenus.value = []
  }
  activeIndex.value = index
  setSubMenusActive(index)
  if (meta?.link) {
    window.open(meta.link)
    return
  }
  router.push(index)
}
const handleSubMenuClick: MenuInjection['handleSubMenuClick'] = (index, indexPath) => {
  if (openedMenus.value.includes(index)) {
    closeMenu(index)
  }
  else {
    openMenu(index, indexPath)
  }
}

function initMenu() {
  const activeItem = activeIndex.value && items.value[activeIndex.value]
  setSubMenusActive(activeIndex.value)
  if (!activeItem || props.collapse) {
    return
  }
  // 展开该菜单项的路径上所有子菜单
  activeItem.indexPath.forEach((index) => {
    const subMenu = subMenus.value[index]
    subMenu && openMenu(index, subMenu.indexPath)
  })
}

watch(() => props.menu, (val) => {
  initItems(val)
  initMenu()
}, {
  deep: true,
  immediate: true,
})

watch(() => props.value, (currentValue) => {
  if (!items.value[currentValue]) {
    activeIndex.value = ''
  }
  const item = items.value[currentValue] || (activeIndex.value && items.value[activeIndex.value]) || items.value[props.value]
  if (item) {
    activeIndex.value = item.index
  }
  else {
    activeIndex.value = currentValue
  }
  initMenu()
})

watch(() => props.collapse, (value) => {
  if (value) {
    openedMenus.value = []
  }
  initMenu()
})

provide(rootMenuInjectionKey, reactive({
  props,
  items,
  subMenus,
  activeIndex,
  openedMenus,
  mouseInMenu,
  isMenuPopup,
  openMenu,
  closeMenu,
  handleMenuItemClick,
  handleSubMenuClick,
}))
</script>

<template>
  <div
    :class="{
      'w-[200px]': !isMenuPopup && props.mode === 'vertical',
      'w-[64px]': isMenuPopup && props.mode === 'vertical',
      'h-[80px]': props.mode === 'horizontal',
      'flex-row! w-auto': isMenuPopup && props.mode === 'horizontal',
    }" class="flex flex-col of-hidden transition-all"
  >
    <template v-for="(item, index) in menu" :key="index">
      <SubMenu v-if="item.children?.length" :menu="item" :unique-key="[item.path ?? JSON.stringify(item)]" />
      <Item v-else :item="item" :unique-key="[item.path ?? JSON.stringify(item)]" @click="handleMenuItemClick(item.path ?? JSON.stringify(item), item.meta)" />
    </template>
  </div>
</template>
