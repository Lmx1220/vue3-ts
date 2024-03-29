import './util/baidu'
import './util/system.copyright'

import VXETable from 'vxe-table'
import VXETablePluginElement from 'vxe-table-plugin-element'
import 'vxe-table-plugin-element/dist/style.css'
import 'overlayscrollbars/overlayscrollbars.css'

import FloatingVue from 'floating-vue'
import App from './App.vue'

// 加载 iconify 图标

import errorLog from './util/error.log'
import ui from './ui-provider'
import { downloadAndInstall } from '@/iconify'
import icons from '@/iconify/index.json'

import 'uno.css'

import 'virtual:uno.css'

// 全局样式
import '@/assets/styles/globals.scss'
import pinia from '@/store'
import router from '@/router'

import './permission'
import { i18n, useI18n } from '@/locales'

// 自定义指令
import directive from '@/directive'

// 加载svg图标
import 'virtual:svg-icons-register'
import '@imengyu/vue3-context-menu/lib/vue3-context-menu.css'
import 'floating-vue/dist/style.css'

if (icons.useType === 'offline') {
  for (const info of icons.collections) {
    downloadAndInstall(info)
  }
}
VXETable.setup({
  // 对组件内置的提示语进行国际化翻译
  size: 'medium',
  table: {
    keepSource: !0,
    showOverflow: !0,
    showHeaderOverflow: !0,
    stripe: !0,
    border: !0,
    rowConfig: {
      keyField: 'id',
      isHover: !0,
    },
    columnConfig: {
      resizable: !0,
      minWidth: 100,
    },
    checkboxConfig: {
      labelField: '序号',
      reserve: !0,
      highlight: !0,
      range: !0,
      trigger: 'cell',
    },
    sortConfig: {
      remote: !0,
      trigger: 'cell',
      showIcon: !0,
      orders: ['asc', 'desc', null],
      chronological: !1,
      defaultSort: {
        field: 'createdTime',
        order: 'desc',
      },
    },
    filterConfig: {
      remote: !0,
    },
  },
  grid: {
    editConfig: {
      trigger: 'manual',
      mode: 'row',
      showStatus: !0,
      autoClear: !1,
    },
    toolbarConfig: {
      refresh: !0,
      zoom: !0,
      custom: !0,
    },
    formConfig: {
      titleWidth: 100,
      titleAlign: 'right',
      titleOverflow: 'tooltip',
    },
    pagerConfig: {
      pageSize: 10,
      pageSizes: [5, 10, 15, 20, 50, 100, 200, 500, 1e3],
    },
    proxyConfig: {
      autoLoad: !1,
      seq: !0,
      sort: !0,
      filter: !0,
      form: !0,
      message: !1,
      props: {
        result: 'records',
        total: 'total',
        message: 'msg',
      },
    },
  },
  pager: {
    pageSize: 10,
    pageSizes: [10, 20, 50, 100, 500, 1e3, 5e3],
  },
  // eslint-disable-next-line ts/ban-ts-comment
  // @ts-expect-error
  i18n: (key: any, ...args: any) => i18n.global.t(key, args),
})
async function bootstrap() {
  const app = createApp(App)
  VXETable.use(VXETablePluginElement)

  app.use(pinia)
  app.use(router)
  await useI18n(app)
  app.use(directive)
  errorLog(app)

  app.use(FloatingVue)
  app.use(ui)
  app.use(VXETable)
  app.mount('#app')
}
bootstrap()
