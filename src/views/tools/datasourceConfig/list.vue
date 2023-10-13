<script lang="ts" setup>
import { ElMessage, ElMessageBox, ElTable } from 'element-plus'
import { get } from 'lodash-es'
import FormMode from './components/FormMode/index.vue'
import crudDatasourceConfig, { testConnect } from '@/api/modules/tools/datasourceConfig'
import type { DatasourceConfigParams } from '@/api/modules/tools/model/datasourceConfigModel'
import type { DataConfig } from '@/types/global'
import eventBus from '@/util/eventBus'
import usePagination from '@/util/usePagination.js'

defineOptions({
  name: 'ToolsDatasourceConfigList',
})
const {
  pagination,
  search,
  getParams,
  onSizeChange,
  onCurrentChange,
  onSortChange,
  resetQuery,
} = usePagination()
const router = useRouter()
// const route = useRoute()

const defaultQuery = {
  name: '',
  username: '',
  url: '',
  daterange: [],
}
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
  search,
  searchFold: false,
  // 批量操作
  batch: {
    enable: false,
    selectionDataList: [],
  },
  // 列表数据
  dataList: [],
})

const table = ref<InstanceType<typeof ElTable>>()

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

async function getDataList(current?: number) {
  if (current && current === 1) {
    pagination.value.page = current
  }
  data.value.loading = true
  const params = getParams<DatasourceConfigParams>({
    ...data.value.search,
  })
  data.value.search.title && (params.model.title = data.value.search.title)
  const res = await crudDatasourceConfig.list(params)
  data.value.dataList = get(res, 'records', [])
  pagination.value.total = Number(res.total)
  pagination.value.page = Number(get(res, 'current', 1))
  // pagination.value.size = res.size
  setTimeout(() => {
    data.value.loading = false
  }, 100)
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
function sortChange({ prop, order }: any) {
  onSortChange(prop, order).then(() => getDataList())
}

function onCreate() {
  if (data.value.formMode === 'router') {
    router.push({
      name: 'ToolsDatasourceConfigCreate',
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
      name: 'ToolsDatasourceConfigEdit',
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
      name: 'ToolsDatasourceConfigDetail',
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
    crudDatasourceConfig.delete(ids).then(() => {
      getDataList()
      ElMessage.success({
        message: '删除成功',
        center: true,
      })
    })
  }).catch(() => {
  })
}

async function onTestConnect(row: any) {
  await testConnect(row.id)
  ElMessage.success('测试连接成功')
}
</script>

<template>
  <div :class="{ 'absolute-container': data.tableAutoHeight }">
    <page-header title="数据源管理" />
    <page-main>
      <search-bar
        :fold="data.searchFold"
        :show-toggle="false"
      >
        <template #default="{ fold }">
          <el-form
            :model="data.search" class="search-form" inline inline-message label-suffix="：" label-width="100px"
            size="default"
          >
            <el-form-item label="名称">
              <el-input
                v-model="data.search.name" clearable placeholder="请输入，支持模糊查询"
                @clear="currentChange()" @keydown.enter="currentChange()"
              />
            </el-form-item>
            <el-form-item v-show="!fold" label="账号">
              <el-input
                v-model="data.search.username" clearable placeholder="请输入，支持模糊查询"
                @clear="currentChange()" @keydown.enter="currentChange()"
              />
            </el-form-item>
            <el-form-item v-show="!fold" label="链接">
              <el-input
                v-model="data.search.url" clearable placeholder="请输入，支持模糊查询"
                @clear="currentChange()" @keydown.enter="currentChange()"
              />
            </el-form-item>
            <el-form-item v-show="!fold" label="创建时间">
              <el-date-picker
                v-model="data.search.daterange"
                :default-time="[
                  new Date(2000, 1, 1, 0, 0, 0),
                  new Date(2000, 2, 1, 23, 59, 59),
                ]"
                end-placeholder="结束时间"
                range-separator=":"
                start-placeholder="开始时间"
                style="width: 250px;"
                type="daterange"
                value-format="YYYY-MM-DD HH:mm:ss"
              />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="currentChange()">
                <template #icon>
                  <svg-icon name="ep:search" />
                </template>
                筛选
              </el-button>
              <el-button type="primary" @click="resetQuery(defaultQuery)">
                重置
              </el-button>
              <el-button link type="primary" @click="data.searchFold = !fold">
                <template #icon>
                  <svg-icon :name="fold ? 'i-ep:caret-bottom' : 'i-ep:caret-top'" />
                </template>
                {{ fold ? '展开' : '收起' }}
              </el-button>
            </el-form-item>
          </el-form>
        </template>
      </search-bar>
      <el-divider border-style="dashed" />
      <el-space wrap>
        <el-button size="default" type="primary" @click="onCreate">
          <template #icon>
            <svg-icon name="ep:plus" />
          </template>
          新增
        </el-button>
        <el-button :disabled="!data.batch.selectionDataList.length" size="default" type="danger" @click="onDel()">
          <template #icon>
            <svg-icon name="ep:delete" />
          </template>
          删除
        </el-button>
      </el-space>
      <ElTable
        ref="table" v-loading="data.loading" :data="data.dataList" border class="list-table" height="100%" highlight-current-row
        stripe @sort-change="sortChange" @selection-change="data.batch.selectionDataList = $event"
      >
        <el-table-column v-if="data.batch.enable" align="center" fixed type="selection" />
        <el-table-column label="名称" prop="name" />
        <el-table-column label="账号" prop="username" />
        <el-table-column label="密码" prop="password">
          ***
        </el-table-column>
        <el-table-column label="驱动" min-width="160" prop="driverClassName" show-overflow-tooltip />
        <el-table-column label="链接" min-width="200" prop="url" show-overflow-tooltip />
        <el-table-column label="创建时间" prop="createdTime" sortable="custom" width="180" />
        <el-table-column align="center" fixed="right" label="操作" width="250">
          <template #default="scope">
            <!--            <el-button plain size="small" type="primary" @click="onView(scope.row)"> -->
            <!--              查 看 -->
            <!--            </el-button> -->
            <el-button plain size="default" text title="修改" type="primary" @click="onEdit(scope.row)">
              <svg-icon name="ep:edit" />
            </el-button>
            <el-button plain size="small" text title="测试" type="primary" @click="onTestConnect(scope.row)">
              <svg-icon name="ant-design:bug-outlined" />
            </el-button>
            <el-button plain size="default" text title="删除" type="danger" @click="onDel(scope.row)">
              <svg-icon name="ep:delete" />
            </el-button>
          </template>
        </el-table-column>
      </ElTable>
      <el-pagination
        :current-page="pagination.page" :hide-on-single-page="false" :layout="pagination.layout"
        :page-size="pagination.size" :page-sizes="pagination.sizes" :total="pagination.total"
        background class="pagination" @size-change="sizeChange" @current-change="currentChange"
      />
    </page-main>
    <FormMode
      v-if="['dialog', 'drawer'].includes(data.formMode)" :id="data.formModeProps.id"
      v-model="data.formModeProps.visible" :mode="data.formMode" :type="data.formModeProps.type"
      @success="getDataList"
    />
  </div>
</template>

<style lang="scss" scoped>
.el-pagination {
  margin-top: 20px;
}

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

    .search-container {
      margin-bottom: 0;
    }
  }
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

  .el-divider {
    margin-inline: -20px;
    width: calc(100% + 40px);
  }
}
</style>