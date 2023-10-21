import type { AxiosRequestConfig } from 'axios'
import type { DatasourceConfigPageQuery, DatasourceConfigResultVO, DatasourceConfigSaveVO, DatasourceConfigUpdateVO } from './model/datasourceConfigModel'
import defHttp from '@/api'
import { ContentTypeEnum, RequestEnum } from '@/enums/httpEnum'
import type { PageParams, PageResult } from '@/api/model/baseModel'

const MODULAR = 'datasourceConfig'
const ServicePrefix = ''

export const Api = {
  Page: { url: `${ServicePrefix}/${MODULAR}/page`, method: RequestEnum.POST } as AxiosRequestConfig,
  Save: { url: `${ServicePrefix}/${MODULAR}`, method: RequestEnum.POST } as AxiosRequestConfig,
  Update: { url: `${ServicePrefix}/${MODULAR}`, method: RequestEnum.PUT },
  Delete: { url: `${ServicePrefix}/${MODULAR}`, method: RequestEnum.DELETE } as AxiosRequestConfig,
  Query: { url: `${ServicePrefix}/${MODULAR}/query`, method: RequestEnum.POST } as AxiosRequestConfig,
  Detail: { url: `${ServicePrefix}/${MODULAR}/detail`, method: RequestEnum.GET } as AxiosRequestConfig,
  Copy: { url: `${ServicePrefix}/${MODULAR}/copy`, method: RequestEnum.POST } as AxiosRequestConfig,
  TestConnect: {
    url: `${ServicePrefix}/${MODULAR}/testConnect`,
    method: RequestEnum.POST,
    headers: {
      'Content-Type': ContentTypeEnum.FORM_URLENCODED,
    },
  } as AxiosRequestConfig,
}

export function page(params: PageParams<DatasourceConfigPageQuery>) {
  return defHttp.request<PageResult<DatasourceConfigResultVO>>({ ...Api.Page, params })
}
export function save(params: DatasourceConfigSaveVO) {
  return defHttp.request<DatasourceConfigResultVO>({ ...Api.Save, params })
}
export function update(params: DatasourceConfigUpdateVO) {
  return defHttp.request<DatasourceConfigResultVO>({ ...Api.Update, params })
}
export function remove(params: string[]) {
  return defHttp.request<boolean>({ ...Api.Delete, params })
}
export function query(params: DatasourceConfigPageQuery) {
  return defHttp.request<DatasourceConfigResultVO[]>({ ...Api.Query, params })
}
export function detail(id: string) {
  return defHttp.request<DatasourceConfigResultVO>({ ...Api.Detail, params: { id } })
}
export function copy(id: string) {
  return defHttp.request<DatasourceConfigResultVO>({ ...Api.Copy, params: { id } })
}

export function testConnect(id: string) {
  return defHttp.request({
    ...Api.TestConnect,
    params: { id },
  })
}
export default {
  list: page,
  detail,
  create: save,
  edit: update,
  delete: remove,
}
