<script lang="ts" setup>
import { ElMessage, ElMessageBox, ElTable } from 'element-plus'
import { get } from 'lodash-es'
import FormMode from './components/FormMode/index.vue'
import crudFile from '@/api/modules/system/file'
import type { FileParams } from '@/api/modules/system/model/fileModel'
import type { UploadApiResult } from '@/api/modules/system/model/uploadModel'
import { downloadIds, uploadApi } from '@/api/modules/system/upload'
import type { DataConfig } from '@/types/global'
import { downloadFile } from '@/util'
import eventBus from '@/util/eventBus'
import usePagination from '@/util/usePagination.js'

defineOptions({
  name: 'SystemFileList',
})
const {
  pagination,
  getParams,
  onSizeChange,
  onCurrentChange,
  onSortChange,
} = usePagination()
const router = useRouter()
// const route = useRoute()

const data = ref<DataConfig>({
  loading: false,
  tableAutoHeight: true,
  /**
   * 详情展示模式
   * router 路由跳转
   * dialog 对话框
   * drawer 抽屉
   */
  formMode: 'router',
  // 详情
  formModeProps: {
    visible: false,
    id: '',
  },
  // 搜索
  search: {
    title: '',
    title2: '',
    title3: '',
    title4: '',
  },
  searchFold: false,
  // 批量操作
  batch: {
    enable: true,
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
  const params = getParams<FileParams>({
    ...data.value.search,
  })
  data.value.search.title && (params.model.title = data.value.search.title)
  const res = await crudFile.list(params)
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
function sortChange({
  prop,
  order,
}: any) {
  onSortChange(prop, order).then(() => getDataList())
}

function onCreate() {
  if (data.value.formMode === 'router') {
    router.push({
      name: 'SystemFileCreate',
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
      name: 'SystemFileEdit',
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
      name: 'SystemFileDetail',
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
    crudFile.delete(ids).then(() => {
      getDataList()
      ElMessage.success({
        message: '删除成功',
        center: true,
      })
    })
  }).catch(() => {
  })
}

async function onDownload(row?: any) {
  let ids: string[] = []
  if (row) {
    ids.push(row.id)
  }
  else {
    ids = data.value.batch.selectionDataList.map(item => item.id)
  }
  const res = await downloadIds(ids)
  downloadFile(res)
}

function handleChange(list: UploadApiResult[]) {
  console.log('@')
  ElMessage.info(`已上传文件${JSON.stringify(list.length)}`)
  getDataList()
}
</script>

<template>
  <div :class="{ 'absolute-container': data.tableAutoHeight }">
    <page-header title="文件管理" />
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
            <el-form-item label="标题">
              <el-input
                v-model="data.search.title" clearable placeholder="请输入，支持模糊查询"
                @clear="currentChange()" @keydown.enter="currentChange()"
              />
            </el-form-item>
            <el-form-item v-show="!fold" label="标题2">
              <el-input
                v-model="data.search.title2" clearable placeholder="请输入，支持模糊查询"
                @clear="currentChange()" @keydown.enter="currentChange()"
              />
            </el-form-item>
            <el-form-item v-show="!fold" label="标题3">
              <el-input
                v-model="data.search.title3" clearable placeholder="请输入，支持模糊查询"
                @clear="currentChange()" @keydown.enter="currentChange()"
              />
            </el-form-item>
            <el-form-item v-show="!fold" label="标题4">
              <el-input
                v-model="data.search.title4" clearable placeholder="请输入，支持模糊查询"
                @clear="currentChange()" @keydown.enter="currentChange()"
              />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="currentChange()">
                <template #icon>
                  <svg-icon name="ep:search" />
                </template>
                筛选
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
        <BasicUpload
          :api="uploadApi"
          :max-number="10"
          :max-size="20"
          :show-preview-button="false"
          :upload-params="{ bizType: 'BASE_FILE' }"
          @change="handleChange"
        />
        <el-button :disabled="!data.batch.selectionDataList.length" size="default" @click="onDel()">
          <template #icon>
            <svg-icon name="ep:delete" />
          </template>
          删除
        </el-button>
        <el-button :disabled="!data.batch.selectionDataList.length" size="default" @click="onDownload()">
          <template #icon>
            <svg-icon name="ep:" />
          </template>
          下载
        </el-button>
      </el-space>
      <ElTable
        ref="table" v-loading="data.loading" :data="data.dataList" border class="list-table" height="100%" highlight-current-row
        stripe @sort-change="sortChange" @selection-change="data.batch.selectionDataList = $event"
      >
        <el-table-column v-if="data.batch.enable" align="center" fixed type="selection" />
        <el-table-column align="center" label="文件预览" prop="path">
          <template #default="{ row }">
            <ThumbUrl :file-id="row.id" :file-type="row.fileType" :original-file-name="row.originalFileName" />
          </template>
        </el-table-column>
        <el-table-column align="center" label="原始文件名" prop="originalFileName" />
        <el-table-column align="center" label="桶" prop="bucket" width="100" />
        <el-table-column align="center" label="业务类型" prop="bizType" />
        <el-table-column align="center" label="存储类型" prop="echoMap.storageType" width="100" />
        <el-table-column align="center" label="文件类型" prop="echoMap.fileType" width="100" />
        <el-table-column align="center" label="文件类型" prop="contentType" />
        <el-table-column align="center" label="大小" prop="size" width="100" />
        <el-table-column align="center" label="创建时间" prop="createdTime" sortable="custom" width="180" />
        <el-table-column align="center" fixed="right" label="操作" width="250">
          <template #default="scope">
            <el-button plain size="small" text @click="onDownload(scope.row)">
              下载
            </el-button>
            <el-button plain size="small" text type="danger" @click="onDel(scope.row)">
              删除
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
      v-model="data.formModeProps.visible" :mode="data.formMode" @success="getDataList"
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