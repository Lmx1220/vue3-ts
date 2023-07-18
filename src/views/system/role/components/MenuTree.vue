<script lang="ts" setup>
import { ElMessage, ElTree } from 'element-plus'
import { intersection, uniq, without } from 'lodash-es'
import { menuResourceTree } from '@/api/modules/system/menu'
import crudRole from '@/api/modules/system/role'

export interface Props {
  data: any
}

const props = withDefaults(defineProps<Props>(), {})
const emits = defineEmits<{
  'update:modelValue': [
    value: boolean,
  ]
  'success': []
}>()
const treeRef = ref<InstanceType<typeof ElTree>>()
// 监听props变化
watch(() => props.data.id, () => {
  if (props.data.id) {
    getDate(props.data.id)
  }
}, { immediate: true })
const loading = ref(false)

async function getDate(id: string) {
  loading.value = true
  const ids = await crudRole.resourceList(id)
  treeRef.value?.setCheckedKeys(ids)
  setTimeout(() => {
    loading.value = false
  }, 100)
}

onMounted(() => {
  getThreeData()
})

interface Tree {
  [key: string]: any
}

export interface MenuResourceTreeRes extends Tree {
  code: string
  createTime: Record<string, unknown>
  createdBy: number
  describe: string
  icon: string
  id: number
  isDef: boolean
  label: string
  parentId: number
  sortValue: number
  type: string
  updateTime: Record<string, unknown>
  updatedBy: number
  children: MenuResourceTreeRes[]
  disabled: boolean
}

const three = ref<MenuResourceTreeRes[]>([])
const defaultProps = {
  children: 'children',
  label: 'label',
}
const filterText = ref('')

function filterNode(value: string, data: any) {
  if (!value) {
    return true
  }
  return data.label.includes(value)
}

watch(filterText, (val) => {
  treeRef.value!.filter(val)
})

function getThreeData() {
  menuResourceTree<MenuResourceTreeRes[]>(false).then((res) => {
    three.value = res
    cpe(three.value, (item: MenuResourceTreeRes, options = { keyLinks: [] }) => {
      item.key = item.id
      item.keyLinks = [...options.keyLinks || [], item.id]
      return item
    })
  })
}

function cpe(data: any, func: Function, options = {}) {
  data.forEach((item: any) => {
    const a = func(item, options) || item
    item.children && cpe(item.children, func, a)
  })
}

function getResourceTagColor(resourceType: string) {
  switch (resourceType) {
    case '10':
      return 'success'
    case '20':
      return 'info'
    case '30':
      return 'warning'
    case '40':
      return 'danger'
    case '50':
      return 'danger'
    default:
      return 'success'
  }
}

function handleCommand(command: string) {
  switch (command) {
    case 'expand':
      expandHandle(true)
      break
    case 'fold':
      expandHandle(false)
      break
    case 'checkAll':
      treeRef.value?.setCheckedKeys(three.value.map(item => getAllChildIds(item)).flat())
      break
    case 'uncheckAll':
      treeRef.value?.setCheckedKeys([])
      break
    default:
      break
  }
}

function expandHandle(isExpand: boolean) {
  const nodes = treeRef?.value?.store.nodesMap
  for (const node in nodes) {
    nodes[node].expanded = isExpand
  }
}

async function handleSubmit() {
  const checkedKeys = treeRef.value?.getCheckedKeys() as string[]
  await crudRole.saveResource({
    roleId: props.data.id,
    menuIdList: checkedKeys,
  })
  // 提交成功
  ElMessage.success('保存成功')
}

function getAllChildIds(node: any, result: string[] = []) {
  result.push(node.id)
  if (node.children) {
    for (const child of node.children) {
      getAllChildIds(child, result)
    }
  }
  return result
}

function handleCheck(nodeData: any, checked: any) {
  if (checked.checkedKeys.includes(nodeData.key)) {
    const checkedkeys = uniq([...nodeData.keyLinks, ...checked.checkedKeys])
    treeRef.value?.setCheckedKeys(checkedkeys)
  }
  else {
    const checkedkeys = checked.checkedKeys

    // 获取当前节点的所有子节点 nodeData

    const oldCheckedkeys = getAllChildIds(nodeData)
    const newCheckedkeys = without(checkedkeys, ...oldCheckedkeys)
    treeRef.value?.setCheckedKeys(uniq(newCheckedkeys))
  }
}

// 全选方法
function handleCheckAllChange(data: any, $event: any) {
  // a event 取消
  $event?.stopPropagation()
  $event?.preventDefault()
  const a = getAllChildIds(data)
  if (isCheckAll(a)) {
    treeRef.value?.setCheckedKeys(without(treeRef.value?.getCheckedKeys(), ...a))
  }
  else {
    treeRef.value?.setCheckedKeys(uniq([...treeRef.value?.getCheckedKeys(), ...a]))
  }
}

// 长度比较选择和子节点的长度
function isCheckAll(data: string[]) {
  return intersection(treeRef.value?.getCheckedKeys(), data).length === data.length
}

function isAllCheckedByKey(node: any) {
  return isCheckAll(getAllChildIds(node))
}
</script>

<template>
  <div v-if="data.id" class="flex flex-col h-full">
    <page-header :title="`【${data?.name || ''}】拥有的应用资源`">
      <el-button round type="primary" @click="handleSubmit()">
        保存
      </el-button>
    </page-header>
    <div v-loading="loading" class="flex flex-col" style="min-height:0;flex: 1;">
      <div class="title flex items-center">
        <div class="flex-1 flex items-center cursor-pointer">
          <el-input v-model="filterText" class="mr-1 ml-5 " placeholder="搜素">
            <template #append>
              <svg-icon name="i-ep:search" />
            </template>
          </el-input>
          <el-dropdown class="inline" @command="handleCommand">
            <el-icon class="mr-1 ml-1" size="26">
              <svg-icon name="i-ant-design:more-outlined" />
            </el-icon>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item command="checkAll">
                  全部选择
                </el-dropdown-item>
                <el-dropdown-item command="uncheckAll">
                  取消选择
                </el-dropdown-item>
                <el-dropdown-item command="expand" divided>
                  展开全部
                </el-dropdown-item>
                <el-dropdown-item command="fold">
                  折叠全部
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </div>
      <el-divider />
      <el-scrollbar>
        <ElTree
          ref="treeRef" :data="three" :expand-on-click-node="false" :filter-node-method="filterNode"
          :props="defaultProps"
          check-strictly
          class="filter-tree"
          node-key="key"
          show-checkbox
          @check="handleCheck"
        >
          <template #default="{ node, data }">
            <div
              class="custom-tree-node"
            >
              <el-icon class="mr-1 ml-1" size="16">
                <svg-icon :name="data.icon" />
              </el-icon>
              <el-tag :type="getResourceTagColor(data.resourceType)" class="mr-1">
                {{ data?.echoMap?.resourceType }}
              </el-tag>
              <span>{{ node.label }}</span>
              <span><a
                v-if="data.children" style="margin-left: 30px;color: #0084f4;"
                @click="$event => handleCheckAllChange(data, $event)"
              >{{ isAllCheckedByKey(data) ? '取消全选' : '全选' }}</a></span>
            </div>
          </template>
        </ElTree>
      </el-scrollbar>
    </div>
  </div>
  <div v-else class="empty">
    请在左侧点击一行表格
  </div>
</template>

<style lang="scss" scoped>
.page-header {
  background-color: var(--el-disabled-bg-color);
  margin-inline: -15px;
  margin-top: -15px;
}

.el-tree :deep(.el-tree-node__content) {
  > .custom-tree-node {
    width: 100%;
    height: 26px;
    line-height: 26px;
    display: flex;
    align-items: center;
  }
}

.el-tree {
  font-size: 14px;
}
</style>