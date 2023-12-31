<script lang="ts" setup>
import { ElMessage, ElTable } from 'element-plus'
import { get } from 'lodash-es'
import type { UserPageQuery } from '@/api/modules/system/model/userModel'
import { saveRoleUser, userList } from '@/api/modules/system/role'
import { page } from '@/api/modules/system/user'
import usePagination from '@/util/usePagination'
import type { DataConfig } from '@/types/global'

export interface Props {
  id: string
  modelValue?: boolean
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
const {
  pagination,
  getParams,
  onSizeChange,
  onCurrentChange,
  onSortChange,
} = usePagination()

const data = ref<DataConfig>({
  loading: false,
  tableAutoHeight: true,
  /**
   * 详情展示模式
   * router 路由跳转
   * dialog 对话框
   * drawer 抽屉
   */
  formMode: 'dialog',
  // 详情
  formModeProps: {
    visible: false,
    id: '',
  },
  // 搜索
  search: {
    username: '',
    mobile: '',
    nickName: '',
    scope: '-1',
  },
  searchFold: false,
  current: {},
  // 批量操作
  batch: {
    enable: true,
    selectionDataList: [],
  },
  // 列表数据
  dataList: [],
  bindUsers: [] as string[],
})
const table = ref<InstanceType<typeof ElTable>>()
const myVisible = computed({
  get() {
    return props.modelValue
  },
  set(val) {
    emits('update:modelValue', val)
  },
})

const title = computed(() => props.id === '' ? '绑定用户' : '绑定用户')

function onSubmit() {
  // submit() 为组件内部方法
  emits('success')
  onCancel()
}

function onCancel() {
  myVisible.value = false
  data.value.batch.selectionDataList = []
  data.value.bindUsers = []
  data.value.dataList = []
  data.value.search = {
    username: '',
    mobile: '',
    nickName: '',
    scope: '-1',
  }
}

function handleOpen() {
  // handleOpen() 为组件内部方法
  getDataList(1)
  getBindUsers(props.id)
}

function getDataList(current?: number) {
  if (current && current === 1) {
    pagination.value.page = current
  }
  data.value.loading = true
  const params = getParams<UserPageQuery>({
    ...data.value.search,
    roleId: props.id,
  })
  page(params).then((res) => {
    data.value.dataList = get(res, 'records', [])
    pagination.value.total = Number(res.total)
    pagination.value.page = Number(get(res, 'current', 1))
    // pagination.value.size = res.size
  }).finally(() => {
    setTimeout(() => {
      data.value.loading = false
    }, 100)
  })
}

async function getBindUsers(id: string) {
  const dataList = await userList(id)
  data.value.bindUsers = dataList
}

// 每页数量切换
function sizeChange(size: number) {
  onSizeChange(size).then(() => getDataList())
}

// 当前页码切换（翻页）
function currentChange(page = 1) {
  onCurrentChange(page).then(() => getDataList())
}

// 字段排序
function sortChange({
  prop,
  order,
}: any) {
  onSortChange(prop, order).then(() => getDataList())
}

async function onBindUser(flag: boolean, id?: string) {
  const userIdList = id ? [id] : data.value.batch.selectionDataList.map(item => item.id)
  const res = await saveRoleUser({
    roleId: props.id,
    userIdList,
    flag,
  })
  data.value.bindUsers = res

  ElMessage.success(t('sys.api.operationSuccess'))
}
</script>

<template>
  <ElDialog
    v-model="myVisible" :close-on-click-modal="false" :title="title" append-to-body destroy-on-close
    width="70%" @open="handleOpen"
  >
    <SearchBar :fold="data.searchFold" :show-toggle="false">
      <template #default="{ fold }">
        <ElForm
          :model="data.search" class="search-form" inline inline-message label-suffix="：" label-width="100px"
          size="default"
        >
          <ElFormItem label="用户账号">
            <ElInput
              v-model="data.search.username" clearable placeholder="请输入用户账号，支持模糊查询"
              @clear="currentChange()" @keydown.enter="currentChange()"
            />
          </ElFormItem>
          <ElFormItem label="手机号">
            <ElInput
              v-model="data.search.mobile" clearable placeholder="请输入手机号，支持模糊查询"
              @clear="currentChange()" @keydown.enter="currentChange()"
            />
          </ElFormItem>
          <ElFormItem label="名称">
            <ElInput
              v-model="data.search.nickName" clearable placeholder="请输入名称，支持模糊查询"
              @clear="currentChange()" @keydown.enter="currentChange()"
            />
          </ElFormItem>
          <ElFormItem v-show="!fold" label="范围">
            <ElRadioGroup v-model="data.search.scope" size="large" @change="currentChange()">
              <ElRadioButton :label="-1">
                全部
              </ElRadioButton>
              <ElRadioButton :label="1">
                已绑定
              </ElRadioButton>
              <ElRadioButton :label="2">
                未绑定
              </ElRadioButton>
            </ElRadioGroup>
          </ElFormItem>
          <ElFormItem>
            <ElButton type="primary" @click="currentChange()">
              <template #icon>
                <SvgIcon name="ep:search" />
              </template>
              筛选
            </ElButton>
            <ElButton link type="primary" @click="data.searchFold = !fold">
              <template #icon>
                <SvgIcon :name="fold ? 'i-ep:caret-bottom' : 'i-ep:caret-top'" />
              </template>
              {{ fold ? '展开' : '收起' }}
            </ElButton>
          </ElFormItem>
        </ElForm>
      </template>
    </SearchBar>
    <ElDivider border-style="dashed" />
    <ElSpace wrap>
      <ElButton
        :disabled="!data.batch.selectionDataList.length" size="default" type="danger"
        @click="onBindUser(true)"
      >
        批量绑定
      </ElButton>
      <ElButton
        :disabled="!data.batch.selectionDataList.length" size="default" type="primary"
        @click="onBindUser(false)"
      >
        批量取消
      </ElButton>
    </ElSpace>
    <ElTable
      ref="table" v-loading="data.loading" :data="data.dataList" border class="list-table" height="100%"
      row-key="id" stripe

      @sort-change="sortChange"
      @current-change="data.current = $event"
      @selection-change="data.batch.selectionDataList = $event"
    >
      <ElTableColumn v-if="data.batch.enable" align="center" reserve-selection type="selection" />
      <ElTableColumn align="center" label="序号" width="100">
        <template #default="{ $index }">
          {{ (pagination.size * (pagination.page - 1)) + $index + 1 }}
        </template>
      </ElTableColumn>
      <ElTableColumn align="center" label="用户账号" prop="username" />
      <ElTableColumn align="center" label="手机号" prop="mobile" />
      <ElTableColumn align="center" label="名称" prop="nickName" />
      <ElTableColumn align="center" label="状态" prop="state" width="80">
        <template #default="{ row }">
          <ElTag :type="row.state ? 'success' : 'danger'">
            {{ row.state ? '启用' : '禁用' }}
          </ElTag>
        </template>
      </ElTableColumn>
      <ElTableColumn align="center" fixed="right" label="操作" width="200">
        <template #default="scope">
          <ElButton
            bg plain size="small" text type="primary"
            @click="onBindUser(!data.bindUsers.find((item: any) => item === scope.row.id), scope.row.id)"
          >
            {{ data.bindUsers.find((item: any) => item === scope.row.id) ? '取消绑定' : '绑定' }}
          </ElButton>
        </template>
      </ElTableColumn>
    </ElTable>
    <ElPagination
      :current-page="pagination.page" :hide-on-single-page="false" :layout="pagination.layout"
      :page-size="pagination.size" :page-sizes="pagination.sizes" :total="pagination.total" background
      class="pagination" @size-change="sizeChange" @current-change="currentChange"
    />
    <template #footer>
      <ElButton size="large" @click="onCancel">
        取 消
      </ElButton>
      <ElButton size="large" type="primary" @click="onSubmit">
        确 定
      </ElButton>
    </template>
  </ElDialog>
</template>
