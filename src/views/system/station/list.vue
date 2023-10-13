<script lang="ts" setup>
import { ElMessage, ElMessageBox, ElTable } from 'element-plus'
import { get } from 'lodash-es'
import FormMode from './components/FormMode/index.vue'
import type { StationParams } from '@/api/modules/system/model/stationModel'
import crudStation from '@/api/modules/system/station'
import type { DataConfig } from '@/types/global'
import eventBus from '@/util/eventBus'
import usePagination from '@/util/usePagination'
import OrgManagement from '@/views/system/org/components/OrgManagement/index.vue'

defineOptions({
  name: 'SystemStationList',
})
const router = useRouter()
// const route = useRoute()

const {
  pagination,
  getParams,
  onSizeChange,
  onCurrentChange,
  onSortChange,
} = usePagination()

const data = ref<DataConfig>({
  loading: false,
  formMode: 'dialog',
  tableAutoHeight: true,
  // 详情
  formModeProps: {
    visible: false,
    id: '',

  },
  // 搜索
  search: {
    name: '',
  },
  searchFold: false,

  current: {},
  // 批量操作
  batch: {
    enable: true,
    selectionDataList: [],
  },
  dataList: [],
})

onMounted(() => {
  getDataList()
  if (data.value.formMode === 'router') {
    eventBus.on('get-data-list', () => {
      getDataList()
    })
  }
})

onBeforeUnmount(() => {
  if (data.value.formMode === 'router') {
    eventBus.off('get-data-list')
  }
})

const table = ref<InstanceType<typeof ElTable>>()
const orgIds = ref<any>([])

async function getDataList(current?: number) {
  if (current && current === 1) {
    pagination.value.page = current
  }
  data.value.loading = true
  try {
    const params = getParams<StationParams>({
      ...data.value.search,
    },
    {
      type: 'daterange',
      name: 'daterange',
      prop: 'createdTime',
    })
    params.model.orgIdList = orgIds.value
    const res = await crudStation.list(params)
    data.value.dataList = get(res, 'records', [])
    pagination.value.total = Number(res.total)
    pagination.value.page = Number(get(res, 'current', 1))
  }
  finally {
    setTimeout(() => {
      data.value.loading = false
    }, 100)
  }
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

function onCreate() {
  if (data.value.formMode === 'router') {
    router.push({
      name: 'SystemStationCreate',
      params: {
        type: 'add',
      },
    })
  }
  else {
    data.value.formModeProps.id = ''
    data.value.formModeProps.visible = true
    data.value.formModeProps.type = 'add'
  }
}

function onEdit(row: any) {
  if (data.value.formMode === 'router') {
    router.push({
      name: 'SystemStationEdit',
      params: {
        id: row.id,
        type: 'edit',
      },
    })
  }
  else {
    data.value.formModeProps.id = row.id
    data.value.formModeProps.visible = true
    data.value.formModeProps.type = 'edit'
  }
}

function onView(row: any) {
  if (data.value.formMode === 'router') {
    router.push({
      name: 'SystemStationDetail',
      params: {
        id: row.id,
        type: 'view',
      },
    })
  }
  else {
    data.value.formModeProps.id = row.id
    data.value.formModeProps.visible = true
    data.value.formModeProps.type = 'view'
    data.value.formModeProps.data = row
  }
}

function onDel(row?: any) {
  let ids: string[] = []
  if (row) {
    ids.push(row.id)
  }
  else {
    ids = data.value.batch.selectionDataList.map(item => item.id)
  }
  ElMessageBox.confirm(`确认删除数量「${ids.length}」吗？`, '确认信息').then(() => {
    crudStation.delete(ids).then(() => {
      getDataList()
      ElMessage.success({
        message: '删除成功',
        center: true,
      })
    })
  }).catch(() => {
  })
}

function onTreeSelect(node: any, ids: any[] = []) {
  orgIds.value = ids
  getDataList(1)
}

function onReset() {
  orgIds.value = []
  getDataList(1)
}
</script>

<template>
  <div :class="{ 'absolute-container': data.tableAutoHeight }">
    <page-header title="组织" />
    <div class="page-main">
      <LayoutContainer hide-left-side-toggle left-side-width="300px">
        <template #leftSide>
          <OrgManagement :query="true" @reset="onReset" @select="onTreeSelect" />
        </template>
        <template #default>
          <div class="container">
            <search-bar :fold="data.searchFold" :show-toggle="false">
              <template #default>
                <el-form
                  :model="data.search" class="search-form" inline inline-message label-suffix="："
                  label-width="100px" size="default"
                >
                  <el-form-item label="名称">
                    <el-input
                      v-model="data.search.name" clearable placeholder="支持模糊查询" @clear="currentChange()"
                      @keydown.enter="currentChange()"
                    />
                  </el-form-item>
                  <el-form-item label="创建时间">
                    <el-date-picker
                      v-model="data.search.daterange" :default-time="[
                        new Date(2000, 1, 1, 0, 0, 0),
                        new Date(2000, 2, 1, 23, 59, 59),
                      ]" end-placeholder="结束时间" range-separator=":" start-placeholder="开始时间"
                      style="width: 250px;"
                      type="daterange" value-format="YYYY-MM-DD HH:mm:ss"
                    />
                  </el-form-item>
                  <el-form-item>
                    <el-button type="primary" @click="currentChange()">
                      <template #icon>
                        <svg-icon name="ep:search" />
                      </template>
                      筛选
                    </el-button>
                  </el-form-item>
                </el-form>
              </template>
            </search-bar>
            <el-space wrap>
              <el-button size="default" type="primary" @click="onCreate">
                <template #icon>
                  <svg-icon name="ep:plus" />
                </template>
                新增
              </el-button>
              <el-button :disabled="!data.batch.selectionDataList.length" size="default" @click="onDel()">
                <template #icon>
                  <svg-icon name="ep:delete" />
                </template>
                删除
              </el-button>
            </el-space>
            <ElTable
              ref="table" v-loading="data.loading" :data="data.dataList" border class="list-table" height="100%"
              highlight-current-row stripe @sort-change="sortChange"
              @selection-change="data.batch.selectionDataList = $event"
            >
              <el-table-column v-if="data.batch.enable" align="center" fixed type="selection" />
              <el-table-column align="center" label="序号" width="100">
                <template #default="{ $index }">
                  {{ (pagination.size * (pagination.page - 1)) + $index + 1 }}
                </template>
              </el-table-column>
              <el-table-column align="center" label="名称" prop="name" />
              <el-table-column align="center" label="所属机构" prop="echoMap.orgId.name" />
              <el-table-column align="center" label="状态" prop="state" width="80">
                <template #default="{ row }">
                  <el-tag :type="row.state ? 'success' : 'danger'">
                    {{ row.state ? '启用' : '禁用' }}
                  </el-tag>
                </template>
              </el-table-column>
              <el-table-column align="center" label="备注" prop="remarks" show-overflow-tooltip width="180" />
              <el-table-column align="center" label="创建时间" prop="createdTime" sortable="custom" width="180" />
              <el-table-column align="center" fixed="right" label="操作" width="150">
                <template #default="scope">
                  <el-button plain size="small" type="primary" @click="onEdit(scope.row)">
                    编 辑
                  </el-button>
                  <el-button plain size="small" type="danger" @click="onDel(scope.row)">
                    删 除
                  </el-button>
                </template>
              </el-table-column>
            </ElTable>
            <el-pagination
              :current-page="pagination.page" :hide-on-single-page="false" :layout="pagination.layout"
              :page-size="pagination.size" :page-sizes="pagination.sizes" :total="pagination.total" background
              class="pagination" @size-change="sizeChange" @current-change="currentChange"
            />
            <FormMode
              v-if="['dialog', 'drawer'].includes(data.formMode)" :id="data.formModeProps.id"
              v-model="data.formModeProps.visible" :mode="data.formMode" :type="data.formModeProps.type"
              @success="getDataList"
            />
          </div>
        </template>
      </LayoutContainer>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.absolute-container {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  .page-header {
    margin-bottom: 0;
  }

  .page-main {
    flex: 1;
    overflow: auto;
    display: flex;
    flex-direction: column;

    .flex-container {
      position: static;
    }
  }
}

.flex-container {
  :deep(.left-side) {
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  :deep(.main) {
    display: flex;
    justify-content: center;
  }

  .container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    height: 100%;

    .empty {
      text-align: center;
      font-size: 32px;
      color: var(--el-text-color-placeholder);
    }
  }
}

.search-form {
  display: flex;
  flex-wrap: wrap;
  margin-bottom: -18px
}

.page-main {
  .search-form {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: -18px;

    :deep(.el-form-item) {
      flex: 1 1 300px;

      &:last-child {
        margin-left: auto;

        .el-form-item__content {
          justify-content: flex-end;
        }
      }
    }

  }
}
</style>